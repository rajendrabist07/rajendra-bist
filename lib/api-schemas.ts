import { z } from 'zod'

export const contactRequestSchema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(180),
    message: z.string().trim().min(1).max(3000),
    _hp: z.string().optional(),
    company_url: z.string().optional(),
})

export const chatRequestSchema = z.object({
    message: z.string().trim().min(1).max(1000),
    history: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().trim().min(1).max(2000),
        }),
    ).max(20).default([]),
    sessionId: z.string().trim().min(1).max(120).optional(),
})