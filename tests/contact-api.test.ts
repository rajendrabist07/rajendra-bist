import { describe, expect, it, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../app/api/contact/route'
import { resetLocalRateLimits } from '../lib/rate-limit'

describe('Contact API Hardening & Verification', () => {
  beforeEach(() => {
    resetLocalRateLimits()
  })

  function makeRequest(body: Record<string, unknown> | string, headers: Record<string, string> = {}) {
    const rawBody = typeof body === 'string' ? body : JSON.stringify(body)
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'host': 'localhost:3000',
        'x-forwarded-for': '203.0.113.195',
        ...headers,
      },
      body: rawBody,
    })
  }

  it('1. Validation: rejects control characters in name', async () => {
    const req = makeRequest({
      name: 'Rajendra\x00Bist',
      email: 'valid@example.com',
      message: 'This is a genuine inquiry reaching the twenty character mark.',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('VALIDATION_FAILED')
    expect(json.message).toContain('control characters')
  })

  it('2. Validation: rejects message under 20 characters', async () => {
    const req = makeRequest({
      name: 'Valid Name',
      email: 'valid@example.com',
      message: 'Short message',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('VALIDATION_FAILED')
    expect(json.message).toContain('20 characters')
  })

  it('3. Validation: rejects email over 254 characters', async () => {
    const longDomain = 'a'.repeat(250) + '@example.com'
    const req = makeRequest({
      name: 'Valid Name',
      email: longDomain,
      message: 'This is a genuine inquiry reaching the twenty character mark.',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('VALIDATION_FAILED')
  })

  it('4. Honeypot: silently accepts _hp payload without sending', async () => {
    const req = makeRequest({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      message: 'Buy cheap watches online now 1234567890 20 chars',
      _hp: 'honey_trap_triggered',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.ok).toBe(true)
    expect(json.code).toBe('DELIVERED')
    expect(json.message).toBe('Message received.')
  })

  it('5. Same-Origin Check: blocks cross-origin requests', async () => {
    const req = makeRequest(
      {
        name: 'Valid Sender',
        email: 'sender@example.com',
        message: 'This is a genuine inquiry reaching the twenty character mark.',
      },
      {
        origin: 'https://malicious-attacker.com',
        host: 'bistrajendra.com.np',
      },
    )
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(403)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('FORBIDDEN')
    expect(json.message).toContain('Cross-origin')
  })

  it('6. Body Size Cap: rejects body exceeding 10 KB limit', async () => {
    const giantPayload = 'A'.repeat(10241)
    const req = makeRequest(giantPayload, {
      'content-length': '10241',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(413)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('PAYLOAD_TOO_LARGE')
  })

  it('7. Rate Limiting: rejects requests exceeding 5 per hour per IP hash', async () => {
    const ip = '198.51.100.42'
    const makeValidReq = () =>
      makeRequest(
        {
          name: 'Rate Limit Tester',
          email: 'ratelimit@example.com',
          message: 'This is a genuine inquiry reaching the twenty character mark.',
          _hp: 'test-honeypot-to-bypass-external-dispatch',
        },
        { 'x-forwarded-for': ip },
      )

    // Send 5 valid requests (allowed)
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeValidReq())
      expect(res.status).toBe(200)
    }

    // 6th request must be rate limited (429)
    const blockedRes = await POST(makeValidReq())
    const json = await blockedRes.json()
    expect(blockedRes.status).toBe(429)
    expect(json.ok).toBe(false)
    expect(json.code).toBe('RATE_LIMITED')
    expect(blockedRes.headers.get('Retry-After')).toBeDefined()
  })
})
