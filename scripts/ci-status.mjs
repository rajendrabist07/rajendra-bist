#!/usr/bin/env node
/**
 * scripts/ci-status.mjs
 * Fetches recent GitHub Actions workflow runs and prints a machine-generated status table.
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
    throw new Error(`GitHub API error ${res.status}: ${res.statusText} (${url})`);
  }
  return res.json();
}

async function main() {
  const runsUrl = `https://api.github.com/repos/${REPO}/actions/runs?per_page=10`;
  const runsData = await fetchJson(runsUrl);
  const runs = runsData.workflow_runs || [];

  console.log(`| Run # | Branch | Event | Commit | Created (UTC) | Conclusion | Validate | Browser | Lighthouse | First Failure / Note |`);
  console.log(`| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |`);

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
      // ignore
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
}

main().catch((err) => {
  console.error('Error fetching CI status:', err.message);
  process.exit(1);
});
