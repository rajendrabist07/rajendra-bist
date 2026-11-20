import { describe, it, expect } from 'vitest';
import ContactMessage from '../models/ContactMessage';
import ChatMessage from '../models/ChatMessage';

describe('Database TTL & Retention Contracts', () => {
  it('ContactMessage declares a 90-day (7,776,000s) TTL index on timestamp', () => {
    const indexes = ContactMessage.schema.indexes();
    const ttlIndex = indexes.find(
      (entry) =>
        entry[0].timestamp === 1 && typeof entry[1]?.expireAfterSeconds === 'number'
    );

    expect(ttlIndex, 'ContactMessage must declare a TTL index on timestamp').toBeDefined();
    expect(ttlIndex![1].expireAfterSeconds).toBe(7776000); // 90 days in seconds
  });

  it('ChatMessage declares a 30-day (2,592,000s) TTL index on timestamp', () => {
    const indexes = ChatMessage.schema.indexes();
    const ttlIndex = indexes.find(
      (entry) =>
        entry[0].timestamp === 1 && typeof entry[1]?.expireAfterSeconds === 'number'
    );

    expect(ttlIndex, 'ChatMessage must declare a TTL index on timestamp').toBeDefined();
    expect(ttlIndex![1].expireAfterSeconds).toBe(2592000); // 30 days in seconds
  });
});
