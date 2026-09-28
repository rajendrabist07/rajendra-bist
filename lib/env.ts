import { z } from 'zod'

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().url().optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
})

export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env)
  return parsed.success ? parsed.data : {}
}