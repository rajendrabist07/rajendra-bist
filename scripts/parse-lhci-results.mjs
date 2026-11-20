import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.cwd(), '.lighthouseci');
if (!fs.existsSync(dir)) {
  console.error('.lighthouseci directory not found.');
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.report.json'));

const resultsByUrl = {};

for (const f of files) {
  const json = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
  const url = json.requestedUrl;
  if (!resultsByUrl[url]) resultsByUrl[url] = [];

  const perf = Math.round((json.categories?.performance?.score ?? 0) * 100);
  const a11y = Math.round((json.categories?.accessibility?.score ?? 0) * 100);
  const bp = Math.round((json.categories?.['best-practices']?.score ?? 0) * 100);
  const seo = Math.round((json.categories?.seo?.score ?? 0) * 100);

  const lcp = json.audits?.['largest-contentful-paint']?.numericValue ?? 0;
  const tbt = json.audits?.['total-blocking-time']?.numericValue ?? 0;
  const cls = json.audits?.['cumulative-layout-shift']?.numericValue ?? 0;
  const fcp = json.audits?.['first-contentful-paint']?.numericValue ?? 0;
  const speedIndex = json.audits?.['speed-index']?.numericValue ?? 0;

  // LCP breakdown items if present
  const lcpElement = json.audits?.['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || '';

  resultsByUrl[url].push({
    file: f,
    perf,
    a11y,
    bp,
    seo,
    fcp,
    lcp,
    tbt,
    cls,
    speedIndex,
    lcpElement,
  });
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

console.log('====================================================');
console.log('LIGHTHOUSE CI 5-RUN SUMMARY & MEDIAN METRICS');
console.log('====================================================\n');

for (const [url, runs] of Object.entries(resultsByUrl)) {
  console.log(`URL: ${url} (${runs.length} runs)`);
  console.log('----------------------------------------------------');
  runs.forEach((r, idx) => {
    console.log(`Run #${idx + 1}: Perf: ${r.perf} | A11y: ${r.a11y} | BP: ${r.bp} | SEO: ${r.seo} | LCP: ${r.lcp.toFixed(1)}ms | TBT: ${r.tbt.toFixed(1)}ms | CLS: ${r.cls.toFixed(3)} | FCP: ${r.fcp.toFixed(1)}ms`);
  });

  const medPerf = median(runs.map(r => r.perf));
  const medA11y = median(runs.map(r => r.a11y));
  const medBp = median(runs.map(r => r.bp));
  const medSeo = median(runs.map(r => r.seo));
  const medLcp = median(runs.map(r => r.lcp));
  const medTbt = median(runs.map(r => r.tbt));
  const medCls = median(runs.map(r => r.cls));
  const medFcp = median(runs.map(r => r.fcp));

  console.log('--> MEDIAN:');
  console.log(`    Performance:    ${medPerf}`);
  console.log(`    Accessibility:  ${medA11y}`);
  console.log(`    Best Practices: ${medBp}`);
  console.log(`    SEO:            ${medSeo}`);
  console.log(`    FCP:            ${medFcp.toFixed(1)} ms`);
  console.log(`    LCP:            ${medLcp.toFixed(1)} ms`);
  console.log(`    TBT:            ${medTbt.toFixed(1)} ms`);
  console.log(`    CLS:            ${medCls.toFixed(3)}`);
  if (runs[0]?.lcpElement) {
    console.log(`    LCP Element:    ${runs[0].lcpElement}`);
  }
  console.log('\n');
}
