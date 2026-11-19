import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import { contactRequestSchema } from '@/lib/api-schemas'
import { getServerEnv } from '@/lib/env'
import { checkRateLimit } from '@/lib/rate-limit'

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return '127.0.0.1'
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string)
}

function isOriginAllowed(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  if (!origin) {
    // If no origin header (e.g. server-side test or same-site navigation), check referer
    const referer = req.headers.get('referer')
    if (!referer) return true // allow when neither is sent (e.g. standard curl or non-browser client)
    try {
      const refererHost = new URL(referer).host
      const host = req.headers.get('host')
      return !host || refererHost === host
    } catch {
      return false
    }
  }

  try {
    const originHost = new URL(origin).host
    const host = req.headers.get('host')
    if (!host) return true
    return originHost === host
  } catch {
    return false
  }
}

async function sendEmailWithRetry(
  apiKey: string,
  payload: {
    from: string
    to: string[]
    reply_to: string
    subject: string
    html: string
  },
  maxAttempts = 3,
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        return true
      }

      // If client-side error (e.g. 401 unauth, 403, 422), do not retry
      if (res.status >= 400 && res.status < 500) {
        break
      }
    } catch {
      // Network failure; retry on subsequent iteration
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 150))
    }
  }
  return false
}

export async function POST(req: NextRequest) {
  try {
    // 1. Same-Origin Check
    if (!isOriginAllowed(req)) {
      return Response.json(
        {
          ok: false,
          code: 'FORBIDDEN',
          message: 'Cross-origin requests are not allowed.',
        },
        { status: 403 },
      )
    }

    // 2. Body Size Limit (10 KB = 10,240 bytes)
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return Response.json(
        {
          ok: false,
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Request payload exceeds 10 KB limit.',
        },
        { status: 413 },
      )
    }

    // 3. Rate Limiting (5 requests per hour per IP hash)
    const ip = getClientIp(req)
    const rateLimit = await checkRateLimit('contact', ip, 5, '1 h')

    if (!rateLimit.success) {
      return Response.json(
        {
          ok: false,
          code: 'RATE_LIMITED',
          message: 'Rate limit exceeded. Please wait before sending another message.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.reset - Date.now()) / 1000)),
          },
        },
      )
    }

    // 4. Parse JSON Body
    const rawBody = await req.text()
    if (rawBody.length > 10240) {
      return Response.json(
        {
          ok: false,
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Request payload exceeds 10 KB limit.',
        },
        { status: 413 },
      )
    }

    let body: unknown = null
    try {
      body = JSON.parse(rawBody)
    } catch {
      return Response.json(
        {
          ok: false,
          code: 'VALIDATION_FAILED',
          message: 'Malformed JSON payload.',
        },
        { status: 400 },
      )
    }

    // 5. Honeypot Check (_hp or company_url)
    const maybeHoneypot = body as { _hp?: string; company_url?: string } | null
    if (maybeHoneypot?._hp || maybeHoneypot?.company_url) {
      // Silently accept without dispatching email or saving to DB
      return Response.json(
        {
          ok: true,
          code: 'DELIVERED',
          message: 'Message received.',
        },
        { status: 200 },
      )
    }

    // 6. Zod Schema Validation
    const parsed = contactRequestSchema.safeParse(body)
    if (!parsed.success) {
      const issueMessage =
        parsed.error.issues[0]?.message ||
        'Please provide a valid name, email, and message (min 20 characters).'
      return Response.json(
        {
          ok: false,
          code: 'VALIDATION_FAILED',
          message: issueMessage,
        },
        { status: 400 },
      )
    }

    const { name, email, message } = parsed.data
    const env = getServerEnv()

    let emailSent = false
    let dbSaved = false

    // 7. Email Dispatch with 3 Retries
    const resendApiKey = env.RESEND_API_KEY
    const notificationRecipient =
      env.CONTACT_NOTIFICATION_EMAIL || 'bistrajendra07@gmail.com'

    if (resendApiKey) {
      emailSent = await sendEmailWithRetry(resendApiKey, {
        from:
          env.RESEND_FROM_EMAIL ||
          'Portfolio Contact <onboarding@resend.dev>',
        to: [notificationRecipient],
        reply_to: email,
        subject: `[bistrajendra.com.np] New Message from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace; max-width: 600px; margin: 0 auto; background: #0B1220; color: #E8EEFB; padding: 28px; border-radius: 12px; border: 1px solid rgba(148,178,255,0.14);">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
              <span style="font-weight: 800; font-size: 18px; color: #38D0F0; letter-spacing: -0.5px;">RB &bull; bistrajendra.com.np</span>
            </div>
            <h2 style="color: #E8EEFB; margin-top: 0; font-size: 18px; border-bottom: 1px solid rgba(148,178,255,0.14); padding-bottom: 12px;">New Contact Submission</h2>
            <div style="background: #101A2E; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(148,178,255,0.14);">
              <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Sender:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #38D0F0;">${escapeHtml(email)}</a></p>
              <p style="margin: 0; font-size: 12px; color: #A9B6D3;"><strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)</p>
            </div>
            <h3 style="color: #A9B6D3; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Message Content:</h3>
            <div style="background: #16233B; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #E8EEFB; border: 1px solid rgba(56, 208, 240, 0.2); font-size: 14px;">
${escapeHtml(message)}
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #8A98B8; text-align: center;">
              Delivered securely from Rajendra Bist Portfolio &bull; bistrajendra.com.np
            </p>
          </div>
        `,
      })
    }

    // 8. Save to Database
    try {
      if (env.MONGODB_URI) {
        await connectToDatabase()
        await ContactMessage.create({ name, email, message })
        dbSaved = true
      }
    } catch {
      // Log silently without crashing
    }

    // 9. Uniform Result Check
    if (!emailSent && !dbSaved) {
      return Response.json(
        {
          ok: false,
          code: 'SERVICE_UNAVAILABLE',
          message:
            'Live message forwarding is currently offline. Please reach out directly to rajendrabist396@gmail.com.',
        },
        { status: 503 },
      )
    }

    return Response.json(
      {
        ok: true,
        code: 'SUCCESS',
        message: 'Message delivered successfully.',
      },
      { status: 200 },
    )
  } catch {
    return Response.json(
      {
        ok: false,
        code: 'INTERNAL_ERROR',
        message: 'Could not send message right now. Please try again shortly.',
      },
      { status: 500 },
    )
  }
}
