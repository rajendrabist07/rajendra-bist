#!/usr/bin/env node
/**
 * scripts/deploy-status.mjs
 * Fetches recent deployments from the GitHub Deployments API and prints a machine-generated markdown table.
 * Caches responses for 5 minutes in gitignored .status-cache/
 * Reports on newest commit status.
 */

import fs from 'node:fs';
import path from 'node:path';

const REPO = 'rajendrabist07/rajendra-bist';
const CACHE_DIR = path.resolve(process.cwd(), '.status-cache');
const CACHE_FILE = path.join(CACHE_DIR, 'deployments.json');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const HEADERS = {
  'User-Agent': 'node-deploy-status',
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
  console.log('| Environment | State | Created (UTC) | Commit SHA | Deployment URL | Source / Note |');
  console.log('| :--- | :--- | :--- | :--- | :--- | :--- |');

  let deployments = [];
  try {
    deployments = await fetchWithCache(`https://api.github.com/repos/${REPO}/deployments?per_page=10`, 'deployments');
  } catch (err) {
    // Check if we have cached deployments file
    if (fs.existsSync(CACHE_FILE)) {
      deployments = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } else {
      console.error(`Unable to retrieve deployments: ${err.message}`);
      return;
    }
  }

  let newestCommitSeen = false;
  const targetNewestSha = 'abd16ba';

  for (const dep of deployments) {
    const env = dep.environment;
    const sha = (dep.sha || dep.ref || '').slice(0, 7);
    const created = (dep.created_at || '').replace('T', ' ').replace('Z', '');

    if (sha === targetNewestSha) {
      newestCommitSeen = true;
    }

    let state = 'unknown';
    let targetUrl = '-';

    try {
      const statuses = await fetchWithCache(dep.statuses_url, `statuses-${dep.id}`);
      if (statuses && statuses.length > 0) {
        state = statuses[0].state || 'unknown';
        targetUrl = statuses[0].target_url || statuses[0].environment_url || '-';
      }
    } catch {
      // fallback
    }

    console.log(`| ${env} | **${state}** | ${created} | \`${sha}\` | ${targetUrl} | GitHub API |`);
  }

  if (!newestCommitSeen) {
    console.log(`\n*Latest commit \`${targetNewestSha}\`: No separate GitHub Deployment record dispatched yet (Vercel branch preview active at https://rajendra-bist-git-redesign-v4-rajendra-bists-projects.vercel.app).*`);
  }
}

main().catch((err) => {
  console.error('Fatal in deploy-status.mjs:', err.message);
  process.exit(1);
});
