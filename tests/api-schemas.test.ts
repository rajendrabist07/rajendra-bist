import { describe, expect, it } from 'vitest'
import { chatRequestSchema, contactRequestSchema } from '../lib/api-schemas'

describe('API request schemas', () => {
  it('accepts a valid contact request and trims values', () => {
    const result = contactRequestSchema.safeParse({
      name: '  Rajendra  ',
      email: '  person@example.com ',
      message: '  Hello  ',
    })

    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toMatchObject({ name: 'Rajendra', email: 'person@example.com', message: 'Hello' })
  })

  it('rejects invalid contact input', () => {
    expect(contactRequestSchema.safeParse({ name: '', email: 'bad', message: '' }).success).toBe(false)
  })

  it('limits chat history and message size', () => {
    expect(chatRequestSchema.safeParse({ message: 'hello', history: [] }).success).toBe(true)
    expect(chatRequestSchema.safeParse({ message: 'hello', history: Array.from({ length: 21 }, () => ({ role: 'user', content: 'x' })) }).success).toBe(false)
    expect(chatRequestSchema.safeParse({ message: 'x'.repeat(1001), history: [] }).success).toBe(false)
  })
})