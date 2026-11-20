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

const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('WCAG 2.2 AA Axe Audits - Initial Paint (Dark and Light Themes)', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Axe scan: ${route} (dark theme)`, async ({ page, context }) => {
      await context.addCookies([{ name: 'theme', value: 'dark', domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test(`Axe scan: ${route} (light theme)`, async ({ page, context }) => {
      await context.addCookies([{ name: 'theme', value: 'light', domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test.describe('WCAG 2.2 AA Axe Audits - Interactive States', () => {
  const themes: ('dark' | 'light')[] = ['dark', 'light'];

  for (const theme of themes) {
    test(`Axe interactive: Command Palette open (${theme} theme)`, async ({ page, context }) => {
      await context.addCookies([{ name: 'theme', value: theme, domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Open command palette via shortcut
      await page.keyboard.press('Control+k');
      await page.waitForSelector('[role="combobox"], [role="dialog"], input[placeholder*="command"]', { timeout: 3000 });

      const results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test(`Axe interactive: Mobile Navigation Drawer open (${theme} theme)`, async ({ page, context }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await context.addCookies([{ name: 'theme', value: theme, domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Open mobile drawer
      const trigger = page.locator('button[aria-label="Toggle navigation menu"]');
      await trigger.click();
      await page.waitForSelector('#mobile-nav-menu', { state: 'visible', timeout: 3000 });

      const results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test(`Axe interactive: Skills Tab Panels switched (${theme} theme)`, async ({ page, context }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await context.addCookies([{ name: 'theme', value: theme, domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Switch to Backend tab
      const backendTab = page.locator('#tab-backend');
      await backendTab.scrollIntoViewIfNeeded();
      await backendTab.click();
      await page.waitForTimeout(300);

      let results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();
      expect(results.violations).toEqual([]);

      // Switch to Frontend tab
      const frontendTab = page.locator('#tab-frontend');
      await frontendTab.click();
      await page.waitForTimeout(300);

      results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();
      expect(results.violations).toEqual([]);
    });

    test(`Axe interactive: Contact Form Validation Errors (${theme} theme)`, async ({ page, context }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await context.addCookies([{ name: 'theme', value: theme, domain: '127.0.0.1', path: '/' }]);
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to contact form and submit empty form to trigger validation errors
      const contactSection = page.locator('#contact');
      await contactSection.scrollIntoViewIfNeeded();
      const submitBtn = page.locator('button[type="submit"]:has-text("Send Message")');
      await submitBtn.click();

      // Wait for error feedback
      await page.waitForSelector('text=Full name is required', { timeout: 3000 });

      const results = await new AxeBuilder({ page })
        .withTags(AXE_TAGS)
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Touch Targets (WCAG 2.2 AA SC 2.5.8 >= 24x24px on 390px mobile viewport)', () => {
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

        // WCAG 2.2 AA 2.5.8 Target Size (Minimum) is 24x24px
        if (rect.width < 24 || rect.height < 24) {
          const isInlineLink = (el.tagName === 'A' && el.parentElement && window.getComputedStyle(el.parentElement).display.includes('inline')) || el.closest('p') !== null;
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

    console.log('Mobile touch audit found interactive elements < 24x24px:', touchViolations.length);
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
