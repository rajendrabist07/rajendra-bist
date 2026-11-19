import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const VIEWPORTS = [
  { width: 360, height: 640, name: '360px-mobile-small' },
  { width: 390, height: 844, name: '390px-mobile-iphone' },
  { width: 768, height: 1024, name: '768px-tablet' },
  { width: 1024, height: 768, name: '1024px-laptop' },
  { width: 1440, height: 900, name: '1440px-desktop' },
  { width: 1920, height: 1080, name: '1920px-desktop-large' },
];

const PUBLIC_ROUTES = [
  '/',
  '/projects',
  '/projects/sovereign',
  '/projects/devguard-ai',
  '/projects/chronicle',
  '/blog',
  '/blog/pgvector-vs-external-vector-db',
  '/blog/multi-model-llm-fallback-router',
  '/blog/ast-based-pr-review',
];

test.describe('Responsive & Viewport Overflow Audits', () => {
  for (const vp of VIEWPORTS) {
    test(`No horizontal overflow at ${vp.width}x${vp.height} (${vp.name})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of PUBLIC_ROUTES) {
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        const overflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            clientWidth: document.documentElement.clientWidth,
          };
        });
        expect(
          overflow.scrollWidth <= overflow.innerWidth,
          `Route ${route} has horizontal overflow at ${vp.width}px (scrollWidth: ${overflow.scrollWidth}, innerWidth: ${overflow.innerWidth})`
        ).toBe(true);
      }
    });
  }
});

test.describe('Responsive Screenshots (390px and 1440px)', () => {
  test('Capture visual snapshots of key sections in dark and light themes', async ({ page }) => {
    const outDir = path.resolve(process.cwd(), 'docs/shots/phase-8');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const testViewports = [
      { width: 390, height: 844, suffix: '390px' },
      { width: 1440, height: 900, suffix: '1440px' },
    ];

    for (const vp of testViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Dark theme
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      });
      await page.screenshot({ path: path.join(outDir, `home-dark-${vp.suffix}.png`), fullPage: false });

      // Light theme
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      });
      await page.screenshot({ path: path.join(outDir, `home-light-${vp.suffix}.png`), fullPage: false });
    }
  });
});
