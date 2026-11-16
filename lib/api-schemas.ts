import { z } from 'zod'

export const contactRequestSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name cannot exceed 80 characters"),
    email: z.string().trim().email("Please provide a valid email address").max(180),
    message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000, "Message cannot exceed 2000 characters"),
    _hp: z.string().optional(),
    company_url: z.string().optional(),
})

export const chatRequestSchema = z.object({
    message: z.string().trim().min(1, "Message cannot be empty").max(500, "Message length capped at 500 characters"),
    history: z.array(
        z.object({
            role: z.enum(['user', 'assistant']),
            content: z.string().trim().min(1).max(1000),
        }),
    ).max(10).default([]),
    sessionId: z.string().trim().min(1).max(120).optional(),
})