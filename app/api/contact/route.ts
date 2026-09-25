import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_CONTACT_PER_WINDOW = 5
const contactRateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function checkContactRateLimit(ip: string) {
  const now = Date.now()
  const existing = contactRateLimitMap.get(ip)

  if (!existing || existing.resetAt < now) {
    contactRateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (existing.count >= MAX_CONTACT_PER_WINDOW) {
    return false
  }

  contactRateLimitMap.set(ip, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  })
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)

    if (!checkContactRateLimit(ip)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please wait before sending another message.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)

    // Honeypot spam trap check
    if (body?._hp || body?.company_url) {
      // Silently accept without inserting spam into database
      return Response.json({ ok: true, message: 'Message received.' })
    }

    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!name || !emailPattern.test(email) || !message) {
      return Response.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    }

    if (name.length > 120 || email.length > 180 || message.length > 3000) {
      return Response.json({ error: 'Message details are too long.' }, { status: 400 })
    }

    let emailSent = false
    let dbSaved = false

    // 1. Try sending email notification via Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY
    const notificationRecipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'bistrajendra07@gmail.com'

    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [notificationRecipient],
            reply_to: email,
            subject: `🚀 New Portfolio Message from ${name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000c1e; color: #d6e8ee; padding: 28px; border-radius: 12px; border: 1px solid #02457a;">
                <h2 style="color: #018abe; margin-top: 0; font-size: 20px;">New Message from Portfolio</h2>
                <div style="background: rgba(2, 69, 122, 0.3); padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #018abe;">
                  <p style="margin: 0 0 8px 0;"><strong>Sender Name:</strong> ${name}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
                  <p style="margin: 0;"><strong>Sent At:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })} (Nepal Time)</p>
                </div>
                <h3 style="color: #97cadb; font-size: 15px; margin-bottom: 8px;">Message Content:</h3>
                <div style="background: #01142e; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap; color: #f0f7fb; border: 1px solid rgba(1, 138, 190, 0.2);">
${message}
                </div>
                <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
                  Delivered securely from Rajendra Bist Portfolio (bistrajendra.com.np)
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
      if (process.env.MONGODB_URI) {
        await connectToDatabase()
        await ContactMessage.create({ name, email, message })
        dbSaved = true
      }
    } catch (err) {
      console.warn('MongoDB save warning:', err)
    }

    // If neither service is configured, log warning in server logs
    if (!emailSent && !dbSaved) {
      console.log(`[Contact Form Fallback] Message received from ${name} (${email}): ${message}`)
    }

    return Response.json({
      ok: true,
      message: 'Message sent successfully.',
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
