import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { contactRequestSchema } from '@/lib/api-schemas';
import { getServerEnv } from '@/lib/env';
import { checkRateLimit } from '@/lib/rate-limit';
import { isRequestOriginAllowed } from '@/lib/origin-check';

export const maxDuration = 30;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] as string);
}

async function sendEmailWithRetry(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    reply_to: string;
    subject: string;
    html: string;
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
      });

      if (res.ok) {
        return true;
      }

      // If client-side error (e.g. 401 unauth, 403, 422), do not retry
      if (res.status >= 400 && res.status < 500) {
        break;
      }
    } catch {
      // Network failure; retry on subsequent iteration
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 150));
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    // 1. Same-Origin Check
    if (!isRequestOriginAllowed(req)) {
      console.error(`[CONTACT_ERROR] code=FORBIDDEN_ORIGIN status=403 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'FORBIDDEN_ORIGIN',
          message: 'Cross-origin requests are not allowed.',
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 403 },
      );
    }

    // 2. Body Size Limit (10 KB = 10,240 bytes)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      console.error(`[CONTACT_ERROR] code=INVALID_INPUT status=413 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'INVALID_INPUT',
          message: 'Request payload exceeds 10 KB limit.',
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 413 },
      );
    }

    // 3. Rate Limiting (5 requests per hour per IP hash)
    const ip = getClientIp(req);
    try {
      const rateLimit = await checkRateLimit('contact', ip, 5, '1 h');
      if (!rateLimit.success) {
        const retryAfterSec = Math.ceil((rateLimit.reset - Date.now()) / 1000);
        console.warn(`[CONTACT_WARN] code=RATE_LIMITED status=429 requestId=${requestId}`);
        return Response.json(
          {
            ok: false,
            code: 'RATE_LIMITED',
            message: 'Rate limit exceeded (5 submissions / hour). Please email directly.',
            contactEmail: 'rajendrabist396@gmail.com',
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.max(1, retryAfterSec)),
            },
          },
        );
      }
    } catch (rateLimitErr) {
      console.warn(`[CONTACT_WARN] Rate limiter error requestId=${requestId}:`, rateLimitErr);
    }

    // 4. Parse JSON Body
    const rawBody = await req.text();
    if (rawBody.length > 10240) {
      console.error(`[CONTACT_ERROR] code=INVALID_INPUT status=413 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'INVALID_INPUT',
          message: 'Request payload exceeds 10 KB limit.',
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 413 },
      );
    }

    let body: unknown = null;
    try {
      body = JSON.parse(rawBody);
    } catch {
      console.error(`[CONTACT_ERROR] code=INVALID_INPUT status=400 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'INVALID_INPUT',
          message: 'Malformed JSON payload.',
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 400 },
      );
    }

    // 5. Honeypot Check (_hp or company_url)
    const maybeHoneypot = body as { _hp?: string; company_url?: string } | null;
    if (maybeHoneypot?._hp || maybeHoneypot?.company_url) {
      return Response.json(
        {
          ok: true,
          code: 'DELIVERED',
          message: 'Message delivered.',
        },
        { status: 200 },
      );
    }

    // 6. Zod Schema Validation
    const parsed = contactRequestSchema.safeParse(body);
    if (!parsed.success) {
      const issueMessage =
        parsed.error.issues[0]?.message ||
        'Please provide a valid name, email, and message (min 20 characters).';
      console.error(`[CONTACT_ERROR] code=INVALID_INPUT status=400 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'INVALID_INPUT',
          message: issueMessage,
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 400 },
      );
    }

    const { name, email, message, isTest } = parsed.data;

    // Handle test / smoke test validation dispatches without sending live email
    if (isTest) {
      return Response.json(
        {
          ok: true,
          code: 'DELIVERED',
          message: 'Test message validated successfully.',
        },
        { status: 200 },
      );
    }
    const env = getServerEnv();

    let emailSent = false;
    let dbSaved = false;

    // 7. Email Dispatch via Resend
    const resendApiKey = env.RESEND_API_KEY;
    const notificationRecipient =
      process.env.CONTACT_TO_EMAIL ||
      env.CONTACT_NOTIFICATION_EMAIL ||
      'bistrajendra07@gmail.com';
    const senderFrom =
      process.env.CONTACT_FROM ||
      env.RESEND_FROM_EMAIL ||
      'Portfolio Contact <contact@bistrajendra.com.np>';

    if (resendApiKey) {
      emailSent = await sendEmailWithRetry(resendApiKey, {
        from: senderFrom,
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
      });
    }

    // 8. Best-effort non-blocking database write with 2-second timeout
    if (env.MONGODB_URI) {
      try {
        const dbPromise = async () => {
          await connectToDatabase();
          await ContactMessage.create({ name, email, message });
        };

        await Promise.race([
          dbPromise(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('DB_TIMEOUT')), 2000)),
        ]);
        dbSaved = true;
      } catch (dbErr: any) {
        console.warn(`[CONTACT_WARN] Non-blocking DB write failed:`, dbErr?.message || dbErr);
      }
    }

    // 9. Delivery Verification
    if (!emailSent && !dbSaved) {
      console.error(`[CONTACT_ERROR] code=SERVICE_UNAVAILABLE status=503 requestId=${requestId}`);
      return Response.json(
        {
          ok: false,
          code: 'SERVICE_UNAVAILABLE',
          message:
            'Message forwarding is currently unavailable. Please reach out directly to rajendrabist396@gmail.com.',
          contactEmail: 'rajendrabist396@gmail.com',
        },
        { status: 503 },
      );
    }

    return Response.json(
      {
        ok: true,
        code: 'DELIVERED',
        message: 'Message delivered. Rajendra will respond to your email shortly.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(`[CONTACT_ERROR] code=INTERNAL status=500 requestId=${requestId}:`, error);
    return Response.json(
      {
        ok: false,
        code: 'SERVICE_UNAVAILABLE',
        message:
          'Could not send message right now. Please email directly to rajendrabist396@gmail.com.',
        contactEmail: 'rajendrabist396@gmail.com',
      },
      { status: 503 },
    );
  }
}
