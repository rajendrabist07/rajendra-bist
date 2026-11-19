import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Phase 4B Projects & Case Files', () => {
  test('verifies CaseFiles, Architecture Diagram, Evidence Strip, and Case Study routes', async ({
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

    // 1. Projects Section Check
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // 2. Sovereign Case File (Lead)
    const sovereignArticle = page.locator('#project-sovereign');
    await expect(sovereignArticle).toBeVisible();
    await expect(sovereignArticle.getByText('Featured')).toBeVisible();
    await expect(sovereignArticle.getByText('Database-Level Isolation Over Application-Level Filters')).toBeVisible();
    await expect(sovereignArticle.getByText('apps/web/app/(app)/approvals/page.tsx')).toBeVisible();

    // 3. DevGuard AI Case File
    const devguardArticle = page.locator('#project-devguard-ai');
    await expect(devguardArticle).toBeVisible();
    await expect(devguardArticle.getByText('Static Analysis Before LLM Generation')).toBeVisible();
    await expect(devguardArticle.getByText('app/dashboard/page.tsx')).toBeVisible();

    // 4. Chronicle Case File
    const chronicleArticle = page.locator('#project-chronicle');
    await expect(chronicleArticle).toBeVisible();
    await expect(chronicleArticle.getByText('Fail-Safe Schema Validation on AI Outputs')).toBeVisible();
    await expect(chronicleArticle.getByText('app/components/reading/ArticleReaderView.tsx')).toBeVisible();

    // 5. Architecture Diagram Interactivity on Sovereign
    const sovereignDiagram = sovereignArticle.locator('figure[aria-label*="Architecture Diagram"]');
    await expect(sovereignDiagram).toBeVisible();

    // Verify accessible screen reader alternative
    const figcaption = sovereignDiagram.locator('figcaption');
    await expect(figcaption).toBeAttached();
    const srList = sovereignDiagram.locator('ol');
    await expect(srList).toBeAttached();

    // Verify node interaction
    const clientNode = sovereignDiagram.getByRole('button', { name: /Browser Client/i });
    await expect(clientNode).toBeVisible();
    await clientNode.hover();
    await expect(sovereignDiagram.getByRole('tooltip')).toBeVisible();

    // Keyboard focus on node
    await clientNode.focus();
    await expect(clientNode).toBeFocused();

    // 6. Responsive Screenshot Picture element (DevGuard AI)
    const picture = devguardArticle.locator('picture');
    await expect(picture).toBeVisible();
    const desktopImg = picture.locator('img');
    await expect(desktopImg).toBeVisible();
    await expect(desktopImg).toHaveAttribute('src', /desktop\.webp/);

    // 7. Auto-fit Evidence Strip
    const evidenceItems = sovereignArticle.locator('a:has-text("Verify Source")');
    await expect(evidenceItems).toHaveCount(4);

    // 8. Capture Phase 4B Desktop & Mobile Snapshots (Dark Mode)
    await sovereignArticle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(process.cwd(), 'docs/shots/phase-4b/01-projects-desktop-dark.png'),
      fullPage: false,
    });

    // Mobile Viewport Snapshot (Dark Mode)
    await page.setViewportSize({ width: 390, height: 844 });
    await sovereignArticle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(process.cwd(), 'docs/shots/phase-4b/02-projects-mobile-dark.png'),
      fullPage: false,
    });

    // Light Mode Snapshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.dataset.theme = 'light';
    });
    await page.waitForTimeout(300);
    await sovereignArticle.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(process.cwd(), 'docs/shots/phase-4b/03-projects-desktop-light.png'),
      fullPage: false,
    });

    // 9. Case Study Route Verification: /projects/sovereign
    await page.goto('/projects/sovereign');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toHaveText('Sovereign');
    await expect(page.getByText('Interactive Isolation Proof')).toBeVisible();
    await expect(page.getByText('PostgreSQL Row-Level Security (RLS) Simulator')).toBeVisible();

    // Case Study Route: /projects/devguard-ai
    await page.goto('/projects/devguard-ai');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toHaveText('DevGuard AI');
    await expect(page.getByText('Static Analysis Before LLM Generation')).toBeVisible();

    // Case Study Route: /projects/chronicle
    await page.goto('/projects/chronicle');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toHaveText('Chronicle');
    await expect(page.getByText('Fail-Safe Schema Validation on AI Outputs')).toBeVisible();
  });
});
