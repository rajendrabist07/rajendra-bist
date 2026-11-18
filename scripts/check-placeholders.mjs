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

console.log('🔍 Checking for placeholder leaks in components, app, and content...');
for (const dir of TARGET_DIRS) {
  scanDir(path.resolve(process.cwd(), dir));
}

if (violations > 0) {
  console.error(`\n🚨 Failed: Found ${violations} forbidden placeholder leak(s).`);
  process.exit(1);
} else {
  console.log('✅ Passed: Zero placeholder leaks found.');
}
