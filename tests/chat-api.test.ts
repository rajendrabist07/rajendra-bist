import { describe, expect, it, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '../app/api/chat/route'
import { resetLocalRateLimits } from '../lib/rate-limit'

// Mock GoogleGenerativeAI
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        startChat: vi.fn().mockReturnValue({
          sendMessageStream: vi.fn().mockResolvedValue({
            stream: (async function* () {
              yield { text: () => 'Rajendra Bist is a full-stack developer ' }
              yield { text: () => 'with expertise in Next.js and PostgreSQL.' }
            })(),
          }),
        }),
      }),
    })),
  }
})

describe('Chat API Hardening & Verification', () => {
  beforeEach(() => {
    resetLocalRateLimits()
    vi.stubEnv('GEMINI_API_KEY', 'test_gemini_key_12345')
  })

  function makeRequest(body: Record<string, unknown> | string, headers: Record<string, string> = {}) {
    const rawBody = typeof body === 'string' ? body : JSON.stringify(body)
    return new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'host': 'localhost:3000',
        'x-forwarded-for': '198.51.100.99',
        ...headers,
      },
      body: rawBody,
    })
  }

  it('1. Offline handling: returns 503 if GEMINI_API_KEY is not configured', async () => {
    vi.stubEnv('GEMINI_API_KEY', '')
    const req = makeRequest({ message: 'What is his stack?', history: [] })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(503)
    expect(json.code).toBe('ASSISTANT_OFFLINE')
  })

  it('2. Input cap: rejects message exceeding 600 characters', async () => {
    const req = makeRequest({
      message: 'A'.repeat(601),
      history: [],
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.code).toBe('INVALID_INPUT')
    expect(json.error).toContain('600')
  })

  it('3. History cap: rejects chat history exceeding 6 turns', async () => {
    const req = makeRequest({
      message: 'Follow-up question',
      history: Array.from({ length: 7 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Turn ${i + 1}`,
      })),
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(400)
    expect(json.code).toBe('INVALID_INPUT')
    expect(json.error).toContain('6')
  })

  it('4. Payload cap: rejects body exceeding 10 KB', async () => {
    const giantPayload = 'X'.repeat(10245)
    const req = makeRequest(giantPayload, {
      'content-length': '10245',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(413)
    expect(json.code).toBe('INVALID_INPUT')
  })

  it('5. Rate limiting: caps requests at 30/hour per IP', async () => {
    const ip = '203.0.113.88'
    const makeChatReq = () =>
      makeRequest(
        { message: 'What is Sovereign?', history: [] },
        { 'x-forwarded-for': ip },
      )

    // First 30 requests succeed
    for (let i = 0; i < 30; i++) {
      const res = await POST(makeChatReq())
      expect(res.status).toBe(200)
    }

    // 31st request triggers rate limit
    const blockedRes = await POST(makeChatReq())
    const json = await blockedRes.json()
    expect(blockedRes.status).toBe(429)
    expect(json.code).toBe('RATE_LIMITED')
  })

  it('6. Streaming response: streams model output with correct Content-Type', async () => {
    const req = makeRequest({
      message: 'Tell me about Sovereign architecture.',
      history: [],
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/plain')

    const reader = res.body?.getReader()
    expect(reader).toBeDefined()
    let streamText = ''
    const decoder = new TextDecoder()
    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        streamText += decoder.decode(value)
      }
    }
    expect(streamText).toContain('Rajendra Bist is a full-stack developer')
  })
})
