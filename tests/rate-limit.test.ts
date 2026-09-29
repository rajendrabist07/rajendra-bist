import { describe, expect, it } from 'vitest'
import { checkRateLimit } from '../lib/rate-limit'

describe('Rate Limiter', () => {
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
