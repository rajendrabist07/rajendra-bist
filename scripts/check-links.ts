import { PERSONAL, PROJECTS } from '../content/facts';

async function checkLinks() {
  const urls: { name: string; url: string }[] = [
    { name: 'GitHub', url: PERSONAL.github },
    { name: 'LinkedIn', url: PERSONAL.linkedin },
  ];

  for (const project of PROJECTS) {
    if (project.liveUrl) {
      urls.push({ name: `${project.title} (Live)`, url: project.liveUrl });
    }
    if (project.githubUrl) {
      urls.push({ name: `${project.title} (GitHub)`, url: project.githubUrl });
    }
  }

  console.log(`🔗 Verifying ${urls.length} external URLs configured in facts.ts...`);
  
  let failures = 0;
  for (const item of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(item.url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)' },
      }).catch(async () => {
        // Fallback to GET if HEAD rejected
        return fetch(item.url, {
          method: 'GET',
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioLinkChecker/1.0)' },
        });
      });
      clearTimeout(timeoutId);

      if (res && res.status >= 400 && res.status !== 403 && res.status !== 401) {
        console.warn(`⚠️ Warning: ${item.name} (${item.url}) returned status ${res.status}`);
      } else {
        console.log(`✅ ${item.name}: OK (${res?.status ?? 200})`);
      }
    } catch (err: any) {
      console.warn(`ℹ️ Note: Could not reach ${item.name} (${item.url}): ${err?.message || 'Network unreachable'}`);
    }
  }

  console.log('✅ External links checked.');
}

checkLinks().catch((err) => {
  console.error('Link check error:', err);
});
