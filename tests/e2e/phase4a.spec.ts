import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Phase 4A Sections & Primitives', () => {
  test('verifies About, IdentityBlock, Experience Dual-Lane, Stack, Credentials, and captures snapshots', async ({
    page,
    context,
  }) => {
    // Force dark theme
    await context.addCookies([
      { name: 'theme', value: 'dark', domain: '127.0.0.1', path: '/' },
    ]);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 1. About section checks
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.getByText('I\'m a full-stack developer in New Delhi')).toBeVisible();
    await expect(aboutSection.getByText('rajendra.identity.ts')).toBeVisible();

    // Verify Copy button in IdentityBlock
    const copyBtn = aboutSection.getByRole('button', { name: /copy/i });
    await expect(copyBtn).toBeVisible();

    // 2. Engineering Systems strip in About
    await expect(aboutSection.getByText('Schema & Migrations')).toBeVisible();
    await expect(aboutSection.getByText('Contract Validation')).toBeVisible();
    await expect(aboutSection.getByText('Automated CI Gates')).toBeVisible();
    await expect(aboutSection.getByText('Resilient Deployment')).toBeVisible();

    // 3. Experience section: dual-lane timeline & Today marker
    const expSection = page.locator('#experience');
    await expect(expSection).toBeVisible();
    await expect(expSection.getByText('Today')).toBeVisible();
    await expect(expSection.getByText('Building · Shipped Software')).toBeVisible();
    await expect(expSection.getByText('Learning · Education & Training')).toBeVisible();
    await expect(expSection.getByText('Sovereign — Multi-Tenant B2B SaaS')).toBeVisible();
    await expect(expSection.getByText('Diploma in IT (Full-Stack Web Dev)')).toBeVisible();

    // 4. Stack section: tablist keyboard navigation & SVG logos
    const stackSection = page.locator('#skills');
    await expect(stackSection).toBeVisible();
    const tablist = stackSection.getByRole('tablist');
    await expect(tablist).toBeVisible();

    const allTab = stackSection.getByRole('tab', { name: 'All Technologies' });
    const backendTab = stackSection.getByRole('tab', { name: 'Backend & Systems' });
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Keyboard navigation on tabs
    await allTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(backendTab).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowLeft');
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Verify Monogram fallback for Inngest
    await expect(stackSection.getByText('IN', { exact: true })).toBeVisible();

    // Verify Trademark disclaimer
    await expect(stackSection.getByText(/Logos are trademarks of their respective owners/i)).toBeVisible();

    // 5. Education & Credentials grid: verify exactly 3 cards
    const credSection = page.locator('#credentials');
    await expect(credSection).toBeVisible();
    const cards = credSection.locator('article');
    await expect(cards).toHaveCount(3);
    await expect(credSection.getByText('Vcare Technical Institute').first()).toBeVisible();
    await expect(credSection.getByText('Verify Certificate')).toBeVisible();

    // 6. Responsive Orphan Cell Check across 360, 390, 768, 1024, 1440, 1920
    const viewports = [
      { width: 360, height: 740 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      const credCardCount = await credSection.locator('article').count();
      expect(credCardCount).toBe(3);
    }

    // 7. Capture Phase 4A Snapshots
    const shotsDir = path.resolve('docs/shots/phase-4a');

    // Desktop Dark
    await page.setViewportSize({ width: 1440, height: 900 });
    await aboutSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-4a-dark-desktop.png'),
      fullPage: false,
    });

    // Mobile Dark
    await page.setViewportSize({ width: 390, height: 844 });
    await aboutSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-4a-dark-mobile.png'),
      fullPage: false,
    });

    // Light Theme Snapshots
    await page.setViewportSize({ width: 1440, height: 900 });
    const themeBtn = page.getByRole('button', { name: /switch to light/i });
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(150);
    }

    // Desktop Light
    await aboutSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-4a-light-desktop.png'),
      fullPage: false,
    });

    // Mobile Light
    await page.setViewportSize({ width: 390, height: 844 });
    await aboutSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-4a-light-mobile.png'),
      fullPage: false,
    });
  });
});
