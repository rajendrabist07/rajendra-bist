import fs from 'fs';
import path from 'path';

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(hex1, hex2) {
  const l1 = luminance(...hexToRgb(hex1));
  const l2 = luminance(...hexToRgb(hex2));
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Read the REAL token file
const tokenFilePath = path.resolve('styles/tokens.css');
if (!fs.existsSync(tokenFilePath)) {
  console.error(`Token file not found at: ${tokenFilePath}`);
  process.exit(1);
}

const cssContent = fs.readFileSync(tokenFilePath, 'utf-8');

function parseTokens(css) {
  const tokens = { dark: {}, light: {} };
  
  // Extract dark section
  const darkMatch = css.match(/(:root,\s*\[data-theme="dark"\]\s*\{[^}]+\})/s) ||
                    css.match(/(\[data-theme="dark"\]\s*\{[^}]+\})/s) ||
                    css.match(/(:\s*root\s*\{[^}]+\})/s);
  if (darkMatch) {
    const lines = darkMatch[1].split(';');
    for (const line of lines) {
      const match = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/);
      if (match) {
        tokens.dark[match[1]] = match[2];
      }
    }
  }

  // Extract light section
  const lightMatch = css.match(/(\[data-theme="light"\]\s*\{[^}]+\})/s);
  if (lightMatch) {
    const lines = lightMatch[1].split(';');
    for (const line of lines) {
      const match = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/);
      if (match) {
        tokens.light[match[1]] = match[2];
      }
    }
  }

  return tokens;
}

const tokens = parseTokens(cssContent);

const suites = [
  {
    theme: 'dark',
    data: tokens.dark,
    surfaces: ['bg-page', 'bg-surface-1', 'bg-surface-2', 'bg-surface-3'],
  },
  {
    theme: 'light',
    data: tokens.light,
    surfaces: ['bg-page', 'bg-surface-1', 'bg-surface-2', 'bg-surface-3'],
  }
];

let failures = 0;
let totalChecks = 0;

console.log('='.repeat(80));
console.log('WCAG 2.2 CONTRAST CHECKER (REAL TOKEN FILE: styles/tokens.css)');
console.log('='.repeat(80));

for (const s of suites) {
  console.log(`\nEvaluating ${s.theme.toUpperCase()} Theme Tokens:`);
  console.log('-'.repeat(80));
  
  // 1. Body Text Tests (>= 4.5:1)
  const bodyTexts = ['text-primary', 'text-secondary', 'text-tertiary', 'accent', 'status-live'];
  for (const t of bodyTexts) {
    const tHex = s.data[t];
    if (!tHex) {
      console.error(`Missing token --${t} in ${s.theme}`);
      failures++;
      continue;
    }
    for (const surf of s.surfaces) {
      const sHex = s.data[surf];
      if (!sHex) continue;
      const ratio = contrast(tHex, sHex);
      totalChecks++;
      const pass = ratio >= 4.5;
      if (!pass) failures++;
      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${t.padEnd(16)} (${tHex}) on ${surf.padEnd(14)} (${sHex}) -> ${ratio.toFixed(2)}:1 (req >= 4.5:1)`);
    }
  }

  // 2. Accent Button Contrast (accent-ink on accent, >= 4.5:1)
  if (s.data['accent-ink'] && s.data['accent']) {
    const ratio = contrast(s.data['accent-ink'], s.data['accent']);
    totalChecks++;
    const pass = ratio >= 4.5;
    if (!pass) failures++;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] accent-ink        (${s.data['accent-ink']}) on accent button  (${s.data['accent']}) -> ${ratio.toFixed(2)}:1 (req >= 4.5:1)`);
  } else {
    console.error(`Missing accent-ink or accent token in ${s.theme}`);
    failures++;
  }

  // 3. UI Components & Focus Ring (>= 3.0:1)
  const uiTokens = ['border-ui', 'focus-ring'];
  for (const u of uiTokens) {
    const uHex = s.data[u];
    if (!uHex) {
      console.error(`Missing UI token --${u} in ${s.theme}`);
      failures++;
      continue;
    }
    for (const surf of s.surfaces.slice(0, 3)) { // test on page, surface-1, surface-2
      const sHex = s.data[surf];
      if (!sHex) continue;
      const ratio = contrast(uHex, sHex);
      totalChecks++;
      const pass = ratio >= 3.0;
      if (!pass) failures++;
      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${u.padEnd(16)} (${uHex}) on ${surf.padEnd(14)} (${sHex}) -> ${ratio.toFixed(2)}:1 (req >= 3.0:1)`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`Summary: ${totalChecks - failures}/${totalChecks} contrast checks passed.`);
if (failures > 0) {
  console.error(`❌ FAILED: ${failures} token pair(s) fell below required WCAG 2.2 thresholds!`);
  process.exit(1);
} else {
  console.log('✅ ALL WCAG 2.2 CONTRAST THRESHOLDS PASSED.');
  process.exit(0);
}
