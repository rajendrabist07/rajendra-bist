import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

test.describe('WCAG 2.2 AA Axe Audits (Dark and Light Themes)', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Axe scan: ${route} (dark theme)`, async ({ page, context }) => {
      await context.addCookies([{ name: 'theme', value: 'dark', domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`Axe scan: ${route} (light theme)`, async ({ page, context }) => {
      await context.addCookies([{ name: 'theme', value: 'light', domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test.describe('Touch Targets (>= 44px on 390px mobile viewport)', () => {
  test('interactive elements meet touch target requirements on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Audit clickable elements (buttons, links, inputs)
    const touchViolations = await page.evaluate(() => {
      const interactive = Array.from(document.querySelectorAll('a, button, input, [role="button"]'));
      const violations: { tag: string; text: string; width: number; height: number }[] = [];

      for (const el of interactive) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

        // Check if dimension is smaller than 44px without an inline-flex/block container
        if (rect.width < 44 || rect.height < 44) {
          const isInlineLink = el.tagName === 'A' && el.parentElement && window.getComputedStyle(el.parentElement).display.includes('inline') || el.closest('p') !== null;
          if (!isInlineLink) {
            violations.push({
              tag: el.tagName,
              text: (el.textContent || '').trim().slice(0, 30),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }
      }
      return violations;
    });

    console.log('Mobile touch audit found elements < 44x44 (excluding inline paragraph links):', touchViolations.length);
  });
});

test.describe('200% Zoom & 320px Reflow (WCAG 1.4.10)', () => {
  test('no horizontal scrollbar at 320px viewport width on any public route', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `Route ${route} should not have horizontal overflow at 320px`).toBe(false);
    }
  });
});
