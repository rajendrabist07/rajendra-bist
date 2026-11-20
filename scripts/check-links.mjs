import fs from 'node:fs';
import path from 'node:path';

async function checkLinks() {
  const factsPath = path.resolve(process.cwd(), 'content/facts.ts');
  const factsContent = fs.readFileSync(factsPath, 'utf8');

  const urlRegex = /(https?:\/\/[^\s"',]+)/g;
  const matches = [...new Set(factsContent.match(urlRegex) || [])];

  const filteredUrls = matches.filter(
    (url) => !url.includes('schema.org') && !url.includes('w3.org')
  );

  console.log(`🔗 Verifying ${filteredUrls.length} external URLs configured in facts.ts...`);

  for (const url of filteredUrls) {
    if (url.includes('drive.google.com')) {
      console.log(`ℹ️ [MANUAL VERIFY] Google Drive URL: ${url} — confirm file permissions are set to "Anyone with the link: Viewer".`);
      continue;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)' },
      }).catch(async () => {
        return fetch(url, {
          method: 'GET',
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)' },
        });
      });
      clearTimeout(timeoutId);

      if (res && res.status >= 400 && res.status !== 403 && res.status !== 401) {
        console.warn(`⚠️ Warning: ${url} returned status ${res.status}`);
      } else {
        console.log(`✅ ${url}: OK (${res?.status ?? 200})`);
      }
    } catch (err) {
      console.warn(`ℹ️ Note: Could not reach ${url}: ${err?.message || 'Network unreachable'}`);
    }
  }

  console.log('✅ External links checked.');
}

checkLinks().catch((err) => {
  console.error('Link check error:', err);
});
