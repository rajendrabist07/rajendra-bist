import fs from 'node:fs';
import path from 'node:path';

// Rule 3: Fail if content contains template placeholders or unfinished draft markers
const FORBIDDEN_PATTERNS = [
  { name: 'TODO comment/text', regex: /\bTODO\b/ },
  { name: 'Lorem ipsum', regex: /\blorem\s+ipsum\b/i },
  { name: 'Handlebars/Mustache template {{var}}', regex: /\{\{\s*[a-zA-Z0-9_-]+\s*\}\}/ },
  { name: 'Unfilled city placeholder [City', regex: /\[City/i },
  { name: 'Placeholder domain example.com', regex: /example\.com/i },
  { name: 'Coming soon placeholder', regex: /\bComing\s+soon\b/i },
];

const TARGET_DIRS = ['components', 'app', 'content'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.md', '.json'];

let violations = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of FORBIDDEN_PATTERNS) {
          if (pattern.regex.test(content)) {
            console.error(`❌ Placeholder leak in ${fullPath}: matched ${pattern.name}`);
            violations++;
          }
        }
      }
    }
  }
}

console.log('🔍 Checking for placeholder leaks in source files...');
for (const dir of TARGET_DIRS) {
  scanDir(path.resolve(process.cwd(), dir));
}

// Check rendered HTML of / (from .next/server/app/index.html)
const indexPath = path.resolve(process.cwd(), '.next/server/app/index.html');
if (fs.existsSync(indexPath)) {
  console.log('🔍 Checking rendered production HTML of / (.next/server/app/index.html)...');
  const rawHtml = fs.readFileSync(indexPath, 'utf8');
  // Strip input placeholder attributes and tailwind classes for fair inspection of text content
  const cleanHtml = rawHtml
    .replace(/\splaceholder="[^"]*"/g, '')
    .replace(/placeholder:[^\s"'>]+/g, '');

  const RENDERED_FORBIDDEN = [
    { name: 'assum', regex: /assum/i },
    { name: 'per owner', regex: /per owner/i },
    { name: 'TODO', regex: /\bTODO\b/ },
    { name: '⚠', regex: /⚠/ },
    { name: 'Note:', regex: /Note:/i },
    { name: 'placeholder', regex: /\bplaceholder\b/i },
    { name: 'training partner', regex: /training partner/i },
  ];

  for (const check of RENDERED_FORBIDDEN) {
    if (check.regex.test(cleanHtml)) {
      console.error(`❌ Rendered HTML leak: found forbidden token "${check.name}" in /`);
      violations++;
    }
  }
} else {
  console.log('ℹ️  .next/server/app/index.html not found (run after build for rendered HTML check).');
}

if (violations > 0) {
  console.error(`\n🚨 Failed: Found ${violations} forbidden placeholder / assumption leak(s).`);
  process.exit(1);
} else {
  console.log('✅ Passed: Zero placeholder and assumption leaks found.');
}
