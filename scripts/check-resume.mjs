import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const resumePath = path.resolve(process.cwd(), 'public/resume/Rajendra_Bist_Full_Stack_Developer.pdf');

if (!fs.existsSync(resumePath)) {
  console.error(`❌ RELEASE BLOCKER: Resume PDF not found at exact path: ${resumePath}`);
  process.exit(1);
}

// Extract text using pypdf
let text = '';
const pythonBin = fs.existsSync('/tmp/pdfenv/bin/python') ? '/tmp/pdfenv/bin/python' : 'python3';
const cmd = `${pythonBin} -c "import pypdf; reader = pypdf.PdfReader('${resumePath}'); print(''.join(p.extract_text() or '' for p in reader.pages))"`;

try {
  text = execSync(cmd, { encoding: 'utf-8' });
} catch (err) {
  console.error('❌ Error executing PDF text extraction:', err.message);
  process.exit(1);
}

const lowerText = text.toLowerCase();

const FORBIDDEN_PATTERNS = [
  { pattern: '1 month', label: 'Contradicts "Available immediately" (found "1 month notice")' },
  { pattern: '15 days', label: 'Contradicts "Available immediately" (found "15 days")' },
  { pattern: 'notice period', label: 'Notice period clause found' },
  { pattern: 'next.js 15', label: 'Outdated version specifier (found "Next.js 15")' },
];

const failures = [];

for (const { pattern, label } of FORBIDDEN_PATTERNS) {
  if (lowerText.includes(pattern)) {
    failures.push({ pattern, label });
  }
}

console.log('====================================================');
console.log('RESUME PDF RELEASE PRE-FLIGHT CHECK');
console.log(`Path: ${resumePath}`);
console.log(`Extracted characters: ${text.length}`);
console.log('====================================================\n');

if (failures.length > 0) {
  console.error('❌ RELEASE BLOCKER: Resume PDF contains forbidden/outdated claims:');
  for (const f of failures) {
    console.error(`  - [FAIL] ${f.label}`);
  }
  console.error('\nAction Required: Replace public/resume/Rajendra_Bist_Full_Stack_Developer.pdf with the compiled resume-v3.pdf before release.');
  process.exit(1);
}

console.log('✅ PASS: Resume PDF contains no contradictory notice period claims or outdated version tags.');
process.exit(0);
