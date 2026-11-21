#!/usr/bin/env node
/**
 * scripts/ci-status.mjs
 * Fetches recent GitHub Actions workflow runs and prints a machine-generated status table.
 * Caches responses for 5 minutes in gitignored .status-cache/
 * Handles rate limits by printing remaining quota and reset time.
 */

import fs from 'node:fs';
import path from 'node:path';

const REPO = 'rajendrabist07/rajendra-bist';
const CACHE_DIR = path.resolve(process.cwd(), '.status-cache');
const CACHE_FILE = path.join(CACHE_DIR, 'ci-runs.json');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const HEADERS = {
  'User-Agent': 'node-ci-status',
  Accept: 'application/vnd.github.v3+json',
};
if (token) {
  HEADERS.Authorization = `token ${token}`;
}

async function fetchWithCache(url, cacheKey) {
  const itemCacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
  if (fs.existsSync(itemCacheFile)) {
    const stats = fs.statSync(itemCacheFile);
    if (Date.now() - stats.mtimeMs < CACHE_TTL_MS) {
      return JSON.parse(fs.readFileSync(itemCacheFile, 'utf8'));
    }
  }

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const remaining = res.headers.get('x-ratelimit-remaining');
    const reset = res.headers.get('x-ratelimit-reset');
    const resetDate = reset ? new Date(parseInt(reset, 10) * 1000).toISOString() : 'unknown';

    if (res.status === 403 && (remaining === '0' || !remaining)) {
      console.error(`⚠️ GitHub API rate limit reached (remaining: 0, resets at: ${resetDate})`);
      if (fs.existsSync(itemCacheFile)) {
        console.error(`ℹ️ Using cached data from ${new Date(fs.statSync(itemCacheFile).mtimeMs).toISOString()}`);
        return JSON.parse(fs.readFileSync(itemCacheFile, 'utf8'));
      }
    }

    const text = await res.text();
    throw new Error(`HTTP ${res.status} (remaining: ${remaining}, reset: ${resetDate}): ${text}`);
  }

  const data = await res.json();
  try {
    fs.writeFileSync(itemCacheFile, JSON.stringify(data, null, 2), 'utf8');
  } catch {}
  return data;
}

async function main() {
  console.log('| Run # | Branch | Event | Commit | Created (UTC) | Conclusion | Validate | Browser | Lighthouse | Source / Note |');
  console.log('| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |');

  try {
    const runsData = await fetchWithCache(`https://api.github.com/repos/${REPO}/actions/runs?per_page=10`, 'ci-runs');
    const runs = runsData.workflow_runs || [];

    for (const run of runs) {
      const runNum = run.run_number;
      const branch = run.head_branch;
      const event = run.event;
      const sha = run.head_sha.slice(0, 7);
      const created = run.created_at.replace('T', ' ').replace('Z', '');
      const overall = run.conclusion || run.status;

      let jobs = [];
      try {
        const jobsData = await fetchWithCache(run.jobs_url, `jobs-${run.id}`);
        jobs = jobsData.jobs || [];
      } catch {}

      const validateJob = jobs.find((j) => j.name === 'validate');
      const browserJob = jobs.find((j) => j.name === 'browser');
      const lighthouseJob = jobs.find((j) => j.name === 'lighthouse');

      const vStatus = validateJob ? (validateJob.conclusion || validateJob.status) : '-';
      const bStatus = browserJob ? (browserJob.conclusion || browserJob.status) : '-';
      const lStatus = lighthouseJob ? (lighthouseJob.conclusion || lighthouseJob.status) : '-';

      let note = '-';
      for (const job of [validateJob, browserJob, lighthouseJob]) {
        if (job && job.conclusion === 'failure') {
          const failedStep = (job.steps || []).find((s) => s.conclusion === 'failure');
          note = `${job.name}: ${failedStep ? failedStep.name : 'failed'}`;
          break;
        }
      }

      console.log(`| #${runNum} | \`${branch}\` | ${event} | \`${sha}\` | ${created} | **${overall}** | ${vStatus} | ${bStatus} | ${lStatus} | ${note} |`);
    }
  } catch (apiErr) {
    // If API failed and no JSON cache existed, check HTML fallback with strict labeling
    try {
      const htmlRes = await fetch(`https://github.com/${REPO}/actions`);
      const html = await htmlRes.text();
      const match = html.match(/<script type="application\/json" data-target="react-app\.embeddedData">([\s\S]*?)<\/script>/);

      if (match && match[1]) {
        const embedded = JSON.parse(match[1]);
        const runs = embedded?.payload?.allWorkflowRunsRoute?.workflowRuns || [];
        for (const run of runs.slice(0, 8)) {
          const runNum = run.runNumber;
          const branch = (run.branch?.name || '').replace('refs/heads/', '');
          const sha = run.description?.linkText || 'unknown';
          const created = (run.createdAt?.timestamp || '-').replace('T', ' ').replace('Z', '');
          const conclusion = (run.state?.conclusion || run.state?.status || 'unknown')
            .replace('WORKFLOW_RUN_CONCLUSION_', '')
            .toLowerCase();

          console.log(`| #${runNum} | \`${branch}\` | push | \`${sha}\` | ${created} | **${conclusion}** | - | - | - | unverified (HTML) |`);
        }
      } else {
        console.error(`Unable to parse workflow runs: ${apiErr.message}`);
      }
    } catch (parseErr) {
      console.error(`Error in CI status script: ${apiErr.message}`);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error('Fatal in ci-status.mjs:', err.message);
  process.exit(1);
});
