#!/usr/bin/env node

/**
 * Idempotent script to ensure MongoDB TTL and secondary indexes exist in Atlas.
 * Safe to execute during deployment or manually:
 *   MONGODB_URI="mongodb+srv://..." node scripts/ensure-indexes.mjs
 */

import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.ts';
import ChatMessage from '../models/ChatMessage.ts';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[ensure-indexes] MONGODB_URI not set. Skipping live index creation (offline mode).');
    process.exit(0);
  }

  console.log('[ensure-indexes] Connecting to MongoDB...');
  await mongoose.connect(uri, {
    bufferCommands: false,
  });

  console.log('[ensure-indexes] Synchronizing indexes for ContactMessage (90-day TTL)...');
  await ContactMessage.syncIndexes();

  console.log('[ensure-indexes] Synchronizing indexes for ChatMessage (30-day TTL)...');
  await ChatMessage.syncIndexes();

  console.log('[ensure-indexes] Verifying indexes...');
  const contactIndexes = await ContactMessage.collection.indexes();
  console.log('ContactMessage indexes:', contactIndexes);

  const chatIndexes = await ChatMessage.collection.indexes();
  console.log('ChatMessage indexes:', chatIndexes);

  await mongoose.disconnect();
  console.log('[ensure-indexes] Complete. All TTL indexes synced successfully.');
}

main().catch((err) => {
  console.error('[ensure-indexes] Error synchronizing indexes:', err);
  process.exit(1);
});
