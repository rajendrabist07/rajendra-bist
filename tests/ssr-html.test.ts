import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Server HTML Content Integrity (No-JS / Crawler Verification)', () => {
  it('verifies that prerendered server HTML contains all critical content sections', () => {
    const htmlPath = path.resolve(process.cwd(), '.next/server/app/index.html');
    expect(fs.existsSync(htmlPath), 'Production prerendered index.html must exist').toBe(true);

    const html = fs.readFileSync(htmlPath, 'utf8');

    // 1. About section paragraphs
    expect(html).toContain('full-stack developer in New Delhi');
    expect(html).toContain('rajendra.identity.ts');

    // 2. All three project names
    expect(html).toContain('Sovereign');
    expect(html).toContain('DevGuard AI');
    expect(html).toContain('Chronicle');

    // 3. Experience lane labels
    expect(html).toContain('Building');
    expect(html).toContain('Learning');

    // 4. Credentials titles
    expect(html).toContain('Full-Stack Web Development');
    expect(html).toContain('Higher Secondary');

    // 5. Contact heading
    expect(html).toContain('Send a role or a problem.');

    // 6. Footer brand & identity
    expect(html).toContain('bistrajendra.com.np');
    expect(html).toContain('Full-stack developer building typed applications');
    expect(html).toContain('© 2026 Rajendra Bist');
  });
});
