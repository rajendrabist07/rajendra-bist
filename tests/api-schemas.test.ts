import { describe, expect, it } from 'vitest'
import { chatRequestSchema, contactRequestSchema } from '../lib/api-schemas'

describe('API request schemas', () => {
  it('accepts a valid contact request and trims values', () => {
    const result = contactRequestSchema.safeParse({
      name: '  Rajendra  ',
      email: '  person@gmail.com ',
      message: '  Hello this is a detailed inquiry reaching 20 characters minimum  ',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Rajendra')
      expect(result.data.email).toBe('person@gmail.com')
      expect(result.data.message.length).toBeGreaterThanOrEqual(20)
    }
  })

  it('rejects invalid contact input (too short, bad email, empty name, control characters)', () => {
    expect(contactRequestSchema.safeParse({ name: '', email: 'bad', message: '' }).success).toBe(false)
    expect(contactRequestSchema.safeParse({ name: 'R', email: 'good@gmail.com', message: 'too short' }).success).toBe(false)
    expect(contactRequestSchema.safeParse({ name: 'Bad\x00Name', email: 'good@gmail.com', message: 'Valid message exceeding twenty characters' }).success).toBe(false)
  })

  it('limits chat history to 6 turns and message size to max 600 characters', () => {
    expect(chatRequestSchema.safeParse({ message: 'hello', history: [] }).success).toBe(true)
    expect(chatRequestSchema.safeParse({ message: 'hello', history: Array.from({ length: 7 }, () => ({ role: 'user', content: 'x' })) }).success).toBe(false)
    expect(chatRequestSchema.safeParse({ message: 'x'.repeat(600), history: [] }).success).toBe(true)
    expect(chatRequestSchema.safeParse({ message: 'x'.repeat(601), history: [] }).success).toBe(false)
  })

  it('accepts question or prompt keys and filters out empty history placeholders', () => {
    const qResult = chatRequestSchema.safeParse({ question: 'What projects has Rajendra built?' })
    expect(qResult.success).toBe(true)
    if (qResult.success) {
      expect(qResult.data.message).toBe('What projects has Rajendra built?')
    }

    const pResult = chatRequestSchema.safeParse({ prompt: 'What is his tech stack?' })
    expect(pResult.success).toBe(true)
    if (pResult.success) {
      expect(pResult.data.message).toBe('What is his tech stack?')
    }

    const hResult = chatRequestSchema.safeParse({
      message: 'Hello',
      history: [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: '' }, // empty placeholder should be safely filtered out
      ],
    })
    expect(hResult.success).toBe(true)
    if (hResult.success) {
      expect(hResult.data.history).toHaveLength(1)
      expect(hResult.data.history[0].content).toBe('Hi')
    }
  })
})
