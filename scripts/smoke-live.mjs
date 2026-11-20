#!/usr/bin/env node

/**
 * scripts/smoke-live.mjs <baseUrl> [--contact]
 * Production & Preview Live Smoke Verification
 * - Checks /api/health -> asserts 200, parses JSON, prints latency.
 * - Checks /api/chat with 'hello' -> asserts 200, asserts reply non-empty, prints latency, prints first 120 chars of answer.
 * - If --contact is passed: sends a test payload to /api/contact -> asserts 200, prints latency.
 * - Exits non-zero on failure.
 */

const args = process.argv.slice(2);
const baseUrlArg = args.find((a) => !a.startsWith('--'));
const testContact = args.includes('--contact');

if (!baseUrlArg) {
  console.error('Usage: node scripts/smoke-live.mjs <baseUrl> [--contact]');
  console.error('Example: node scripts/smoke-live.mjs http://127.0.0.1:3005 --contact');
  process.exit(1);
}

const baseUrl = baseUrlArg.replace(/\/+$/, '');

async function runSmokeTests() {
  console.log(`====================================================`);
  console.log(`LIVE ENDPOINT SMOKE AUDIT`);
  console.log(`Target: ${baseUrl}`);
  console.log(`====================================================\n`);

  let failures = 0;

  // 1. Check /api/health
  console.log('1. Checking /api/health ...');
  const t0Health = performance.now();
  try {
    const res = await fetch(`${baseUrl}/api/health`, { method: 'GET' });
    const elapsedHealth = (performance.now() - t0Health).toFixed(1);
    const data = await res.json().catch(() => null);
    if (res.status === 200 && data?.ok === true) {
      console.log(`   ✓ [PASS] /api/health status=${res.status} latency=${elapsedHealth}ms body=${JSON.stringify(data)}`);
    } else {
      console.error(`   ✗ [FAIL] /api/health status=${res.status} latency=${elapsedHealth}ms body=${JSON.stringify(data)}`);
      failures++;
    }
  } catch (err) {
    const elapsedHealth = (performance.now() - t0Health).toFixed(1);
    console.error(`   ✗ [FAIL] /api/health connection failed: ${err.message} (${elapsedHealth}ms)`);
    failures++;
  }

  // 2. Check /api/chat
  console.log('\n2. Checking /api/chat (query: "hello") ...');
  const t0Chat = performance.now();
  try {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': baseUrl,
      },
      body: JSON.stringify({
        message: 'hello',
        history: [],
        sessionId: 'smoke-test-' + Date.now(),
      }),
    });

    const elapsedChat = (performance.now() - t0Chat).toFixed(1);
    const status = res.status;
    const modelUsed = res.headers.get('x-model-used') || 'default';

    if (status === 200) {
      const text = await res.text();
      if (!text || text.trim().length === 0) {
        console.error(`   ✗ [FAIL] /api/chat status=200 but response body was empty (${elapsedChat}ms)`);
        failures++;
      } else {
        const snippet = text.slice(0, 120).replace(/\n/g, ' ');
        console.log(`   ✓ [PASS] /api/chat status=200 latency=${elapsedChat}ms model=${modelUsed}`);
        console.log(`     Response (first 120 chars): "${snippet}..."`);
      }
    } else {
      const data = await res.json().catch(() => null);
      console.error(`   ✗ [FAIL] /api/chat status=${status} latency=${elapsedChat}ms code=${data?.code || 'UNKNOWN'}`);
      console.error(`     Error details: "${data?.error || data?.message || 'No detail'}"`);
      failures++;
    }
  } catch (err) {
    const elapsedChat = (performance.now() - t0Chat).toFixed(1);
    console.error(`   ✗ [FAIL] /api/chat connection failed: ${err.message} (${elapsedChat}ms)`);
    failures++;
  }

  // 3. Optional /api/contact
  if (testContact) {
    console.log('\n3. Checking /api/contact ([SMOKE TEST] dispatch) ...');
    const t0Contact = performance.now();
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': baseUrl,
        },
        body: JSON.stringify({
          name: 'Live Smoke Runner',
          email: 'smoke-test@bistrajendra.com.np',
          message: '[SMOKE TEST] Automated release verification check. Ignore message.',
          isTest: true,
          _hp: '',
        }),
      });

      const elapsedContact = (performance.now() - t0Contact).toFixed(1);
      const data = await res.json().catch(() => null);
      if (res.status === 200 && data?.ok === true) {
        console.log(`   ✓ [PASS] /api/contact status=200 latency=${elapsedContact}ms response: ok=true`);
      } else {
        console.error(`   ✗ [FAIL] /api/contact status=${res.status} latency=${elapsedContact}ms code=${data?.code || 'UNKNOWN'}`);
        console.error(`     Feedback: "${data?.message || data?.error || 'No detail'}"`);
        failures++;
      }
    } catch (err) {
      const elapsedContact = (performance.now() - t0Contact).toFixed(1);
      console.error(`   ✗ [FAIL] /api/contact connection failed: ${err.message} (${elapsedContact}ms)`);
      failures++;
    }
  }

  console.log(`\n====================================================`);
  if (failures > 0) {
    console.error(`❌ SMOKE AUDIT FAILED with ${failures} critical error(s).`);
    process.exit(1);
  } else {
    console.log(`✅ SMOKE AUDIT COMPLETE: endpoints responding as expected.`);
    process.exit(0);
  }
}

runSmokeTests();
