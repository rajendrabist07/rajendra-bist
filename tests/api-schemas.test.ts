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

  it('rejects invalid contact input (too short, bad email, empty name)', () => {
    expect(contactRequestSchema.safeParse({ name: '', email: 'bad', message: '' }).success).toBe(false)
    expect(contactRequestSchema.safeParse({ name: 'R', email: 'good@gmail.com', message: 'too short' }).success).toBe(false)
  })

  it('limits chat history and message size to max 500 characters', () => {
    expect(chatRequestSchema.safeParse({ message: 'hello', history: [] }).success).toBe(true)
    expect(chatRequestSchema.safeParse({ message: 'hello', history: Array.from({ length: 15 }, () => ({ role: 'user', content: 'x' })) }).success).toBe(false)
    expect(chatRequestSchema.safeParse({ message: 'x'.repeat(501), history: [] }).success).toBe(false)
  })
})