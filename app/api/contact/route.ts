import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'
import { contactRequestSchema } from '@/lib/api-schemas'
import { getServerEnv } from '@/lib/env'
import { checkRateLimit } from '@/lib/rate-limit'

function getClientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string)
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)

    const rateLimit = await checkRateLimit('contact', ip, 5, '1 h')

    if (!rateLimit.success) {
      return Response.json(
        { error: 'Rate limit exceeded. Please wait before sending another message.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimit.reset - Date.now()) / 1000)) } },
      )
    }

    const body = await req.json().catch(() => null)

    // Honeypot spam trap check
    if (body?._hp || body?.company_url) {
      // Silently accept without inserting spam into database
      return Response.json({ ok: true, message: 'Message received.' })
    }

    const parsed = contactRequestSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    }

    const { name, email, message } = parsed.data
    const env = getServerEnv()

    let emailSent = false
    let dbSaved = false

    // 1. Try sending email notification via Resend if RESEND_API_KEY is configured
    const resendApiKey = env.RESEND_API_KEY
    const notificationRecipient = env.CONTACT_NOTIFICATION_EMAIL || 'bistrajendra07@gmail.com'

    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [notificationRecipient],
            reply_to: email,
            subject: `[rajendra.dev] New Message from ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace; max-width: 600px; margin: 0 auto; background: #050608; color: #edeff2; padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <span style="font-weight: 800; font-size: 18px; color: #ff7a33; letter-spacing: -0.5px;">RB &bull; rajendra.dev</span>
                </div>
                <h2 style="color: #edeff2; margin-top: 0; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">New Contact Submission</h2>
                <div style="background: #10131a; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06);">
                  <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Sender:</strong> ${escapeHtml(name)}</p>
                  <p style="margin: 0 0 8px 0; font-size: 13px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #ff7a33;">${escapeHtml(email)}</a></p>
                  <p style="margin: 0; font-size: 12px; color: #8e97a3;"><strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })} (Nepal Time)</p>
                </div>
                <h3 style="color: #8e97a3; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Message Content:</h3>
                <div style="background: #0b0d11; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #edeff2; border: 1px solid rgba(255, 122, 51, 0.2); font-size: 14px;">
${escapeHtml(message)}
                </div>
                <p style="margin-top: 24px; font-size: 11px; color: #5a6270; text-align: center;">
                  Delivered securely from Rajendra Bist Portfolio &bull; bistrajendra.com.np
                </p>
              </div>
            `,
          }),
        })

        if (resendRes.ok) {
          emailSent = true
        } else {
          const errData = await resendRes.json().catch(() => null)
          console.warn('Resend email dispatch warning:', errData)
        }
      } catch (err) {
        console.warn('Resend email dispatch error:', err)
      }
    }

    // 2. Save message record to MongoDB
    try {
      if (env.MONGODB_URI) {
        await connectToDatabase()
        await ContactMessage.create({ name, email, message })
        dbSaved = true
      }
    } catch (err) {
      console.warn('MongoDB save warning:', err)
    }

    // Honest delivery check: If neither service is configured / connected, reject with 503 instead of false success
    if (!emailSent && !dbSaved) {
      console.log(`[Contact Form Fallback] Message received from ${name} (${email}): ${message}`)
      return Response.json(
        {
          ok: false,
          error: 'Live message forwarding is currently offline. Please send your email directly to rajendrabist396@gmail.com.',
          delivered: { email: false, db: false },
        },
        { status: 503 }
      )
    }

    return Response.json({
      ok: true,
      message: 'Message delivered successfully.',
      delivered: { email: emailSent, db: dbSaved },
    })
  } catch (error) {
    console.error('Contact API failed', {
      message: error instanceof Error ? error.message : 'Unknown error',
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      hasResendKey: Boolean(process.env.RESEND_API_KEY),
    })

    return Response.json({ error: 'Could not send message right now.' }, { status: 500 })
  }
}
