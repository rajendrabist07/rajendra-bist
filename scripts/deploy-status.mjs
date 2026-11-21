#!/usr/bin/env node
/**
 * scripts/deploy-status.mjs
 * Fetches recent deployments from the GitHub Deployments API and prints an unedited markdown table.
 */

const REPO = 'rajendrabist07/rajendra-bist';
const HEADERS = {
  'User-Agent': 'node-deploy-status',
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
  const deploymentsUrl = `https://api.github.com/repos/${REPO}/deployments?per_page=8`;
  const deployments = await fetchJson(deploymentsUrl);

  console.log('| Environment | State | Created (UTC) | Commit SHA | Deployment URL |');
  console.log('| :--- | :--- | :--- | :--- | :--- |');

  for (const dep of deployments) {
    const env = dep.environment;
    const sha = (dep.sha || dep.ref || '').slice(0, 7);
    const created = dep.created_at.replace('T', ' ').replace('Z', '');

    let state = 'unknown';
    let targetUrl = '-';

    try {
      const statuses = await fetchJson(dep.statuses_url);
      if (statuses && statuses.length > 0) {
        state = statuses[0].state || 'unknown';
        targetUrl = statuses[0].target_url || statuses[0].environment_url || '-';
      }
    } catch {
      // ignore status rate limit fallback
    }

    console.log(`| ${env} | **${state}** | ${created} | \`${sha}\` | ${targetUrl} |`);
  }
}

main().catch((err) => {
  console.error('Error fetching deploy status:', err.message);
  process.exit(1);
});
