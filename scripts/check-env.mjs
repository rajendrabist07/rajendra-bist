#!/usr/bin/env node

/**
 * scripts/check-env.mjs
 * Validates presence of required environment variables without ever printing secret values.
 * Safe for CI and local pre-release checks.
 */

import fs from 'fs';
import path from 'path';

const REQUIRED_ENV_VARS = [
  'MONGODB_URI',
  'GEMINI_API_KEY',
  'RESEND_API_KEY',
  'CONTACT_NOTIFICATION_EMAIL',
  'RESEND_FROM_EMAIL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
];

// Load .env.local if present and not in process.env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const localVars = new Set();

if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
    if (match) {
      localVars.add(match[1]);
    }
  }
}

console.log('🔍 Checking environment variables configuration (secret values redacted)...\n');

const missing = [];
for (const varName of REQUIRED_ENV_VARS) {
  const hasInProcess = Boolean(process.env[varName] && process.env[varName].trim().length > 0);
  const hasInLocal = localVars.has(varName);

  if (hasInProcess || hasInLocal) {
    const source = hasInProcess ? 'process.env' : '.env.local';
    console.log(`  ✓ [CONFIGURED] ${varName} (source: ${source})`);
  } else {
    console.log(`  ✗ [MISSING]    ${varName}`);
    missing.push(varName);
  }
}

console.log('');
if (missing.length > 0) {
  console.error(`⚠️  Warning: ${missing.length} required variable(s) not found in local environment:`);
  missing.forEach((v) => console.error(`    - ${v}`));
  console.error('\nEnsure these are configured in Vercel Production Project Settings prior to release.');
  // Do not fail CI if env vars are production-only, but report accurately
  process.exit(0);
} else {
  console.log('✅ All required environment variables are present and accounted for.');
  process.exit(0);
}
