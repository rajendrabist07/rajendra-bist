import { z } from 'zod'

// Reject control characters (0x00-0x1F and 0x7F)
const noControlCharsRegex = /^[^\x00-\x1F\x7F]+$/
// For multiline text, allow \r, \n, and \t
const multilineNoControlCharsRegex = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+$/

export const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters')
    .regex(noControlCharsRegex, 'Name must not contain control characters'),
  email: z
    .string()
    .trim()
    .email('Please provide a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .regex(multilineNoControlCharsRegex, 'Message must not contain control characters'),
  _hp: z.string().optional(),
  company_url: z.string().optional(),
  isTest: z.boolean().optional(),
})

export const chatRequestSchema = z.preprocess((val) => {
  if (val && typeof val === 'object') {
    const rawMsg = (val as any).message ?? (val as any).question ?? (val as any).prompt;
    const msg = typeof rawMsg === 'string' ? rawMsg.trim() : rawMsg;
    const rawHistory = (val as any).history;
    // Filter out empty placeholder entries from history (e.g., initial assistant message with content: '')
    const cleanHistory = Array.isArray(rawHistory)
      ? rawHistory.filter(
          (h) =>
            h &&
            typeof h === 'object' &&
            typeof h.content === 'string' &&
            h.content.trim().length > 0
        )
      : rawHistory;
    return {
      ...(val as any),
      message: msg,
      history: cleanHistory,
    };
  }
  return val;
}, z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(600, 'Message length capped at 600 characters')
    .regex(multilineNoControlCharsRegex, 'Message must not contain control characters'),
  question: z.string().trim().max(600).optional(),
  prompt: z.string().trim().max(600).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1, 'History content cannot be empty').max(2000),
      }),
    )
    .max(6, 'Chat history capped at last 6 turns')
    .default([]),
  sessionId: z.string().trim().min(1).max(120).optional(),
}))
