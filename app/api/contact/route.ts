import { NextRequest } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
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
