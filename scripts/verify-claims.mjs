import fs from 'node:fs';
import path from 'node:path';
import { SKILL_PROOFS, ARCHITECTURAL_CLAIMS } from '../content/proofs.ts';

const DOCS_DIR = path.resolve(process.cwd(), 'docs');
const OUT_FILE = path.join(DOCS_DIR, 'proofs.generated.json');

async function fetchSource(url) {
  if (!url.startsWith('http')) {
    const localPath = path.resolve(process.cwd(), url);
    return fs.readFileSync(localPath, 'utf8');
  }

  // Handle local portfolio package.json reference if pointing to repo
  if (url.includes('rajendrabist07/rajendra-bist/main/package.json')) {
    const localPkg = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(localPkg)) {
      return fs.readFileSync(localPkg, 'utf8');
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    return await res.text();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function verifyAll() {
  console.log('================================================================');
  console.log('VERIFYING EVIDENCE & ARCHITECTURAL CLAIMS AGAINST SOURCE REPOS');
  console.log('================================================================\n');

  const results = {
    generatedAt: new Date().toISOString(),
    skills: [],
    architecturalClaims: [],
    summary: { total: 0, passed: 0, failed: 0 },
  };

  let failures = 0;

  // 1. Verify Core and Working Skills
  console.log('--- 1. VERIFYING SKILL TIERS (CORE & WORKING) ---');
  for (const item of SKILL_PROOFS) {
    results.summary.total++;
    const re = new RegExp(item.regex);
    try {
      const text = await fetchSource(item.proofUrl);
      const lines = text.split('\n');
      const matched = lines.find((l) => re.test(l));
      if (!matched) {
        console.error(`❌ [FAIL] ${item.name} (${item.tier}): No line matching regex /${item.regex}/ in ${item.proofUrl}`);
        failures++;
        results.skills.push({
          name: item.name,
          tier: item.tier,
          proofUrl: item.proofUrl,
          regex: item.regex,
          status: 'FAILED',
          matchedLine: null,
        });
      } else {
        console.log(`✅ [PASS] ${item.name.padEnd(16)} | ${item.tier.padEnd(8)} | Matched: "${matched.trim()}"`);
        results.summary.passed++;
        results.skills.push({
          name: item.name,
          tier: item.tier,
          proofUrl: item.proofUrl,
          regex: item.regex,
          status: 'VERIFIED',
          matchedLine: matched.trim(),
        });
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${item.name}: ${err.message} (${item.proofUrl})`);
      failures++;
      results.skills.push({
        name: item.name,
        tier: item.tier,
        proofUrl: item.proofUrl,
        regex: item.regex,
        status: 'FETCH_ERROR',
        error: err.message,
      });
    }
  }

  // 2. Verify Sovereign Architectural Claims
  console.log('\n--- 2. VERIFYING SOVEREIGN ARCHITECTURAL CLAIMS ---');
  for (const item of ARCHITECTURAL_CLAIMS) {
    results.summary.total++;
    const re = new RegExp(item.regex);
    try {
      const text = await fetchSource(item.proofUrl);
      const lines = text.split('\n');
      const matched = lines.find((l) => re.test(l));
      if (!matched) {
        console.error(`❌ [FAIL] ${item.name}: No line matching regex /${item.regex}/ in ${item.proofUrl}`);
        failures++;
        results.architecturalClaims.push({
          name: item.name,
          claim: item.claim,
          proofUrl: item.proofUrl,
          regex: item.regex,
          status: 'FAILED',
          matchedLine: null,
        });
      } else {
        console.log(`✅ [PASS] ${item.name.padEnd(36)} | Matched: "${matched.trim()}"`);
        results.summary.passed++;
        results.architecturalClaims.push({
          name: item.name,
          claim: item.claim,
          proofUrl: item.proofUrl,
          regex: item.regex,
          status: 'VERIFIED',
          matchedLine: matched.trim(),
        });
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${item.name}: ${err.message} (${item.proofUrl})`);
      failures++;
      results.architecturalClaims.push({
        name: item.name,
        claim: item.claim,
        proofUrl: item.proofUrl,
        regex: item.regex,
        status: 'FETCH_ERROR',
        error: err.message,
      });
    }
  }

  results.summary.failed = failures;

  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n📄 Generated machine-verified proofs output written to: ${OUT_FILE}`);
  console.log(`Summary: ${results.summary.passed}/${results.summary.total} claims verified. Failures: ${results.summary.failed}\n`);

  if (failures > 0) {
    console.error('🚨 Claims verification failed: Not all claims could be proven against raw repository evidence.');
    process.exit(1);
  }

  console.log('✅ ALL CLAIMS & SKILL TIERS VERIFIED AGAINST SOURCE CODE.');
  process.exit(0);
}

verifyAll();
