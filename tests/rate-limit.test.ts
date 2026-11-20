import { describe, expect, it } from 'vitest'
import { checkRateLimit, hashIdentifier } from '../lib/rate-limit'

describe('Rate Limiter & IP Privacy', () => {
  it('computes deterministic HMAC-SHA256 hex string slice', () => {
    const hash1 = hashIdentifier('192.168.1.1')
    const hash2 = hashIdentifier('192.168.1.1')
    const hash3 = hashIdentifier('192.168.1.2')

    expect(hash1).toBe(hash2)
    expect(hash1).not.toBe(hash3)
    expect(hash1).toHaveLength(32)
    expect(hash1).toMatch(/^[0-9a-f]{32}$/)
  })

  it('fails closed in production if IP_HASH_SECRET is missing', () => {
    const origNodeEnv = process.env.NODE_ENV
    const origVercelEnv = process.env.VERCEL_ENV
    const origSecret = process.env.IP_HASH_SECRET

    try {
      (process.env as Record<string, string | undefined>).NODE_ENV = 'production'
      process.env.VERCEL_ENV = 'production'
      delete process.env.IP_HASH_SECRET

      expect(() => hashIdentifier('127.0.0.1')).toThrow(
        'IP_HASH_SECRET environment variable is missing in production environment.'
      )
    } finally {
      (process.env as Record<string, string | undefined>).NODE_ENV = origNodeEnv
      process.env.VERCEL_ENV = origVercelEnv
      if (origSecret) process.env.IP_HASH_SECRET = origSecret
    }
  })

  it('allows requests within limit and throttles excess requests', async () => {
    const testIp = `test-ip-${Date.now()}`
    
    // First 3 requests should pass with limit 3
    const r1 = await checkRateLimit('unit-test', testIp, 3, '1 m')
    expect(r1.success).toBe(true)
    expect(r1.remaining).toBe(2)

    const r2 = await checkRateLimit('unit-test', testIp, 3, '1 m')
    expect(r2.success).toBe(true)
    expect(r2.remaining).toBe(1)

    const r3 = await checkRateLimit('unit-test', testIp, 3, '1 m')
    expect(r3.success).toBe(true)
    expect(r3.remaining).toBe(0)

    // 4th request should fail rate limit
    const r4 = await checkRateLimit('unit-test', testIp, 3, '1 m')
    expect(r4.success).toBe(false)
    expect(r4.remaining).toBe(0)
    expect(r4.reset).toBeGreaterThan(Date.now())
  })
})
