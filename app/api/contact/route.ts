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

    await connectToDatabase()
    await ContactMessage.create({ name, email, message })

    return Response.json({ ok: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Contact API failed', {
      message: error instanceof Error ? error.message : 'Unknown error',
      hasMongoUri: Boolean(process.env.MONGODB_URI),
    })

    return Response.json({ error: 'Could not send message right now.' }, { status: 500 })
  }
}
