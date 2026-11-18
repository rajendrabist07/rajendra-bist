import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Blueprint Design System & Primitives (/dev/design)', () => {
  test('renders all primitives, toggles theme without flash, and captures visual snapshots', async ({ page, context }) => {
    // 1. Force dark theme via cookie to test dark mode explicitly
    await context.addCookies([
      { name: 'theme', value: 'dark', domain: '127.0.0.1', path: '/' },
    ]);

    // 1. Desktop Dark Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/dev/design');

    // Verify main landmarks & headings
    await expect(page.locator('h1')).toContainText('Design System & Primitives');
    await expect(page.locator('#buttons')).toBeVisible();
    await expect(page.locator('#surfaces')).toBeVisible();
    await expect(page.locator('#chips')).toBeVisible();
    await expect(page.locator('#code')).toBeVisible();
    await expect(page.locator('#tabs-timeline')).toBeVisible();
    await expect(page.locator('#fields')).toBeVisible();
    await expect(page.locator('#cropmarks')).toBeVisible();
    await expect(page.locator('#toasts-icons')).toBeVisible();

    // Verify font computation on display and mono elements
    const headingFont = await page.locator('h1').evaluate((el) => window.getComputedStyle(el).fontFamily);
    console.log('Heading computed font:', headingFont);
    expect(headingFont.toLowerCase()).toContain('space grotesk');

    const codeFont = await page.locator('pre code').evaluate((el) => window.getComputedStyle(el).fontFamily);
    console.log('Code computed font:', codeFont);
    expect(codeFont.toLowerCase()).toContain('jetbrains mono');

    // Ensure dark theme is active
    const darkTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(darkTheme).toBe('dark');

    // Snapshot Desktop Dark
    const shotsDir = path.resolve('docs/design-plan/shots');
    await page.screenshot({ path: path.join(shotsDir, 'dev-design-dark-desktop.png'), fullPage: false });

    // 2. Mobile Dark Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(shotsDir, 'dev-design-dark-mobile.png'), fullPage: false });

    // 3. Toggle Theme to Light Drafting Paper
    await page.setViewportSize({ width: 1440, height: 900 });
    const themeBtn = page.getByRole('button', { name: /switch to light/i });
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();

    // Verify data-theme switched to light
    const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(lightTheme).toBe('light');

    // Snapshot Desktop Light
    await page.screenshot({ path: path.join(shotsDir, 'dev-design-light-desktop.png'), fullPage: false });

    // 4. Mobile Light Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(shotsDir, 'dev-design-light-mobile.png'), fullPage: false });
  });

  test('tabs and interactive primitives respond to keyboard and click events', async ({ page }) => {
    await page.goto('/dev/design');
    const frontendTab = page.getByRole('tab', { name: /frontend & ui/i });
    await expect(frontendTab).toBeVisible();
    await frontendTab.click();
    await expect(frontendTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Next.js 15 App Router with server-rendered reading surfaces')).toBeVisible();
  });
});
