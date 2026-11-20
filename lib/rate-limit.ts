import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { createHmac } from 'node:crypto'

type LocalLimit = { count: number; resetAt: number }

const localLimits = new Map<string, LocalLimit>()
const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
)
const redis = hasUpstash ? Redis.fromEnv() : null
const limiters = new Map<string, Ratelimit>()

export function hashIdentifier(id: string): string {
  const secret = process.env.IP_HASH_SECRET
  if (!secret && process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
    // Non-blocking fallback: warn once rather than throwing fatal exception
    console.warn('[SECURITY] IP_HASH_SECRET is unconfigured in production. Using derived runtime salt.');
  }
  const key = secret || process.env.RESEND_API_KEY || process.env.GEMINI_API_KEY || 'rb-portfolio-fallback-salt-2026'
  return createHmac('sha256', key).update(id || 'unknown').digest('hex').slice(0, 32)
}

export function resetLocalRateLimits(): void {
  localLimits.clear()
}

function getLimiter(limit: number, window: `${number} ${'m' | 'h' | 'd'}`) {
  const key = `${limit}:${window}`
  const existing = limiters.get(key)
  if (existing) return existing

  const limiter = new Ratelimit({
    redis: redis!,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: 'rajendra-portfolio',
  })
  limiters.set(key, limiter)
  return limiter
}

export async function checkRateLimit(
  namespace: string,
  identifier: string,
  limit: number,
  window: `${number} ${'m' | 'h' | 'd'}`,
) {
  const hashedId = hashIdentifier(identifier)
  const key = `${namespace}:${hashedId}`

  if (redis) {
    const result = await getLimiter(limit, window).limit(key)
    return { success: result.success, remaining: result.remaining, reset: result.reset }
  }

  const now = Date.now()
  const windowMs = Number(window.split(' ')[0]) * ({ m: 60_000, h: 3_600_000, d: 86_400_000 } as const)[window.split(' ')[1] as 'm' | 'h' | 'd']
  const current = localLimits.get(key)

  if (!current || current.resetAt <= now) {
    localLimits.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1, reset: now + windowMs }
  }

  if (current.count >= limit) {
    return { success: false, remaining: 0, reset: current.resetAt }
  }

  current.count += 1
  return { success: true, remaining: limit - current.count, reset: current.resetAt }
}
