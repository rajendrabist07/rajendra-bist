#!/usr/bin/env node
/**
 * scripts/ci-status.mjs
 * Fetches recent GitHub Actions workflow runs and prints a machine-generated status table.
 * Includes graceful HTML scraping fallback when API rate limit is reached.
 */

const REPO = 'rajendrabist07/rajendra-bist';
const HEADERS = {
  'User-Agent': 'node-ci-status',
  Accept: 'application/vnd.github.v3+json',
};

if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
  HEADERS.Authorization = `token ${process.env.GITHUB_TOKEN || process.env.GH_TOKEN}`;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log(`| Run # | Branch | Event | Commit | Created (UTC) | Conclusion | Validate | Browser | Lighthouse | First Failure / Note |`);
  console.log(`| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |`);

  try {
    const runsUrl = `https://api.github.com/repos/${REPO}/actions/runs?per_page=10`;
    const runsData = await fetchJson(runsUrl);
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
        const jobsData = await fetchJson(run.jobs_url);
        jobs = jobsData.jobs || [];
      } catch {
        // ignore rate limit on jobs
      }

      const validateJob = jobs.find((j) => j.name === 'validate');
      const browserJob = jobs.find((j) => j.name === 'browser');
      const lighthouseJob = jobs.find((j) => j.name === 'lighthouse');

      const vStatus = validateJob ? (validateJob.conclusion || validateJob.status) : '-';
      const bStatus = browserJob ? (browserJob.conclusion || browserJob.status) : '-';
      const lStatus = lighthouseJob ? (lighthouseJob.conclusion || lighthouseJob.status) : '-';

      let firstFailure = '-';
      for (const job of [validateJob, browserJob, lighthouseJob]) {
        if (job && job.conclusion === 'failure') {
          const failedStep = (job.steps || []).find((s) => s.conclusion === 'failure');
          firstFailure = `${job.name}: ${failedStep ? failedStep.name : 'failed'}`;
          break;
        }
      }

      console.log(`| #${runNum} | \`${branch}\` | ${event} | \`${sha}\` | ${created} | **${overall}** | ${vStatus} | ${bStatus} | ${lStatus} | ${firstFailure} |`);
    }
  } catch (apiErr) {
    // HTML fallback if API rate limited
    const htmlRes = await fetch(`https://github.com/${REPO}/actions`);
    const html = await htmlRes.text();
    const runMatches = [...html.matchAll(/\/actions\/runs\/(\d+)/g)];
    const uniqueRunIds = [...new Set(runMatches.map((m) => m[1]))].slice(0, 5);

    for (const runId of uniqueRunIds) {
      const rPage = await fetch(`https://github.com/${REPO}/actions/runs/${runId}`);
      const rHtml = await rPage.text();

      const branchMatch = rHtml.match(/class="commit-ref"[^>]*>([^<]+)<\/span>/) || rHtml.match(/head-branch">([^<]+)</);
      const branch = branchMatch ? branchMatch[1].trim() : 'redesign/v4';
      const shaMatch = rHtml.match(/class="sha"[^>]*>([a-f0-9]{7,40})/) || rHtml.match(/commit\/([a-f0-9]{7})/);
      const sha = shaMatch ? shaMatch[1].slice(0, 7) : 'unknown';

      const vSuccess = rHtml.includes('job-id="validate"') && rHtml.includes('octicon-check-circle-fill');
      const bSuccess = rHtml.includes('job-id="browser"') && rHtml.includes('octicon-check-circle-fill');
      const lSuccess = rHtml.includes('job-id="lighthouse"') && rHtml.includes('octicon-check-circle-fill');

      const vStatus = vSuccess ? 'success' : 'unknown';
      const bStatus = bSuccess ? 'success' : 'unknown';
      const lStatus = lSuccess ? 'success' : 'unknown';

      console.log(`| (Run ${runId}) | \`${branch}\` | push | \`${sha}\` | - | - | ${vStatus} | ${bStatus} | ${lStatus} | (via HTML status parser) |`);
    }
  }
}

main().catch((err) => {
  console.error('Error fetching CI status:', err.message);
  process.exit(1);
});
