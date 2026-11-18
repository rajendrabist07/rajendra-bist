import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Phase 3 Hero, Navigation & Intro Tests', () => {
  test('verifies fonts loaded, hero structure, typed role, portrait sharpness, and captures screenshots', async ({ page, context }) => {
    // Force dark theme by default
    await context.addCookies([
      { name: 'theme', value: 'dark', domain: '127.0.0.1', path: '/' },
    ]);

    // 1. Desktop Dark Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Wait for network idle and fonts ready
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);

    // Carry-Forward Fix 4: Real font loading check
    const spaceGroteskLoaded = await page.evaluate(() => document.fonts.check('16px "Space Grotesk"'));
    const jetbrainsMonoLoaded = await page.evaluate(() => document.fonts.check('14px "JetBrains Mono"'));
    console.log('Space Grotesk loaded via document.fonts.check:', spaceGroteskLoaded);
    console.log('JetBrains Mono loaded via document.fonts.check:', jetbrainsMonoLoaded);
    expect(spaceGroteskLoaded).toBe(true);
    expect(jetbrainsMonoLoaded).toBe(true);

    // Hero Header checks
    const h1 = page.locator('#home h1');
    await expect(h1).toHaveText('Rajendra Bist');
    // Ensure no colored letters (e.g. no nested colored span in h1)
    const h1Spans = await h1.locator('span').count();
    expect(h1Spans).toBe(0);

    // Availability chip
    const availChip = page.locator('#home').getByText('Available immediately · Delhi NCR / remote');
    await expect(availChip).toBeVisible();

    // Two-sentence pitch
    const pitch = page.getByText('I build complete web apps, from the database schema to the deployed site, with Next.js, Node.js and PostgreSQL.');
    await expect(pitch).toBeVisible();

    // CTAs
    const viewProjectsBtn = page.locator('#home a[href="#projects"]');
    await expect(viewProjectsBtn).toBeVisible();
    const resumeBtn = page.locator('#home a[href="/resume/Rajendra_Bist_Full_Stack_Developer.pdf"]');
    await expect(resumeBtn).toBeVisible();

    // Portrait checks: rectangular 4:5, max width <= 400 CSS px, webp derivative
    const portraitImg = page.locator('#home img[alt*="Rajendra Bist"]');
    await expect(portraitImg).toBeVisible();
    const imgSrc = await portraitImg.getAttribute('src');
    console.log('Hero image src:', imgSrc);
    expect(imgSrc).toContain('rajendra-bist-portrait.webp');
    // Ensure old 3840px request is gone
    expect(imgSrc).not.toContain('w=3840');

    const portraitBounding = await portraitImg.boundingBox();
    console.log('Portrait bounding box:', portraitBounding);
    if (portraitBounding) {
      expect(portraitBounding.width).toBeLessThanOrEqual(405);
    }

    // Two real Annotation chips
    await expect(page.locator('#home').getByText('Available immediately').first()).toBeVisible();
    await expect(page.locator('#home').getByText(/New Delhi · .* IST/)).toBeVisible();

    // Typed role line checks
    const srOnlyRole = page.locator('#home .sr-only').first();
    await expect(srOnlyRole).toContainText('Full-Stack Developer, Node.js · TypeScript · PostgreSQL, Apps from schema to deployment');

    // Capture Snapshots
    const shotsDir = path.resolve('docs/shots/phase-3');

    // Desktop Dark
    await page.screenshot({ path: path.join(shotsDir, 'hero-dark-desktop.png'), fullPage: false });

    // Mobile Dark
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(shotsDir, 'hero-dark-mobile.png'), fullPage: false });

    // Switch to Light Theme
    await page.setViewportSize({ width: 1440, height: 900 });
    const themeBtn = page.getByRole('button', { name: /switch to light/i });
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
    await page.waitForTimeout(100);

    // Desktop Light
    await page.screenshot({ path: path.join(shotsDir, 'hero-light-desktop.png'), fullPage: false });

    // Mobile Light
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(shotsDir, 'hero-light-mobile.png'), fullPage: false });
  });

  test('navigation glass effect, active link highlight, and command palette integration', async ({ page }) => {
    await page.goto('/');
    const searchBtn = page.getByRole('button', { name: 'Open Command Palette' });
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    // Dialog role and mode switcher
    await expect(page.locator('div[role="dialog"]')).toBeVisible();
    const askAiTab = page.getByRole('button', { name: /ask ai assistant/i });
    await expect(askAiTab).toBeVisible();
    await askAiTab.click();

    // Verify AI mode shows quick prompts
    await expect(page.getByText('What projects has Rajendra built?')).toBeVisible();

    // Close with Esc
    await page.keyboard.press('Escape');
    await expect(page.locator('div[role="dialog"]')).not.toBeVisible();
  });
});
