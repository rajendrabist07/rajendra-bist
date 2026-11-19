import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Phase 5 Contact Hub, Footer, Case Studies, and Notes', () => {
  test('verifies Contact hub, Footer, Case Study routes, and captures snapshots', async ({
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

    // 1. Contact section checks
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await expect(contactSection.getByText('Send a role or a problem.')).toBeVisible();
    await expect(contactSection.getByText(/Available immediately/i)).toBeVisible();
    await expect(contactSection.getByText(/New Delhi · IST/i)).toBeVisible();

    // Verify copy email button
    const copyEmailBtn = contactSection.getByRole('button', { name: /copy email/i });
    await expect(copyEmailBtn).toBeVisible();

    // Verify phone reveal button
    const revealPhoneBtn = contactSection.getByRole('button', { name: /reveal/i });
    await expect(revealPhoneBtn).toBeVisible();
    await revealPhoneBtn.click();
    await expect(contactSection.getByText('+91 8700918036')).toBeVisible();

    // Verify download resume link
    const resumeLink = contactSection.getByRole('link', { name: /download resume/i });
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute('href', '/resume/Rajendra_Bist_Full_Stack_Developer.pdf');

    // Verify form validation
    const submitBtn = contactSection.getByRole('button', { name: /send message/i });
    await submitBtn.click();
    await expect(contactSection.getByText(/Full name is required/i)).toBeVisible();

    // 2. Footer checks
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('RB.')).toBeVisible();
    await expect(footer.getByText(/Full-stack developer building typed applications/i)).toBeVisible();
    await expect(footer.getByText('Last updated: Nov 2026')).toBeVisible();
    await expect(footer.getByText('© 2026 Rajendra Bist. All rights reserved.')).toBeVisible();

    // Verify footer socials
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Email' })).toBeVisible();

    // 3. Case-study page: Sovereign
    await page.goto('/projects/sovereign');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Sovereign', exact: true })).toBeVisible();
    await expect(page.getByText('The Problem')).toBeVisible();
    await expect(page.getByText('Core Constraints')).toBeVisible();
    await expect(page.getByText('System Architecture')).toBeVisible();
    await expect(page.getByText('Key Architectural Decision')).toBeVisible();
    await expect(page.getByText('Interactive Isolation Proof')).toBeVisible();
    await expect(page.getByText('Verifiable Repository Evidence')).toBeVisible();
    await expect(page.getByText('Architectural Roadmap · Next Iterations')).toBeVisible();

    // 4. Case-study page: DevGuard AI
    await page.goto('/projects/devguard-ai');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'DevGuard AI', exact: true })).toBeVisible();
    await expect(page.getByText('Live Capture')).toBeVisible();

    // 5. Blog and RSS
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('pgvector vs. External Vector Databases')).toBeVisible();

    // 6. Capture Phase 5 Snapshots (Contact & Footer in Dark & Light, Desktop & Mobile)
    const shotsDir = path.resolve('docs/shots/phase-5');
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Desktop Dark
    await page.setViewportSize({ width: 1440, height: 900 });
    await contactSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-5-dark-desktop.png'),
      fullPage: false,
    });

    // Mobile Dark
    await page.setViewportSize({ width: 390, height: 844 });
    await contactSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-5-dark-mobile.png'),
      fullPage: false,
    });

    // Switch to Light Theme
    await page.setViewportSize({ width: 1440, height: 900 });
    const themeBtn = page.getByRole('button', { name: /switch to light/i });
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(150);
    }

    // Desktop Light
    await contactSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-5-light-desktop.png'),
      fullPage: false,
    });

    // Mobile Light
    await page.setViewportSize({ width: 390, height: 844 });
    await contactSection.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(shotsDir, 'phase-5-light-mobile.png'),
      fullPage: false,
    });
  });
});
