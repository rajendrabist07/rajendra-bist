import { test, expect } from '@playwright/test';

test.describe('Phase 9 Smoke Test Suite', () => {
  test('1. Core public pages render with proper HTTP status and landmarks', async ({ page }) => {
    // 1.1 Homepage
    const homeRes = await page.goto('/');
    expect(homeRes?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Rajendra Bist');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // 1.2 Project detail page
    const projectRes = await page.goto('/projects/sovereign');
    expect(projectRes?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Sovereign');
    await expect(page.locator('h2:has-text("System Architecture")')).toBeVisible();

    // 1.3 Blog index
    const blogRes = await page.goto('/blog');
    expect(blogRes?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Backend and AI systems');

    // 1.4 Blog post
    const postRes = await page.goto('/blog/pgvector-vs-external-vector-db');
    expect(postRes?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();

    // 1.5 404 page
    const notFoundRes = await page.goto('/non-existent-page-404');
    expect(notFoundRes?.status()).toBe(404);
    await expect(page.locator('text=404')).toBeVisible();
  });

  test('2. Contact form mocked submission flow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mock /api/contact endpoint to avoid live email triggers
    await page.route('/api/contact', async (route) => {
      const postData = route.request().postDataJSON();
      if (!postData.name || !postData.email || !postData.message) {
        return route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Validation failed' }),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, message: 'Message sent successfully.' }),
      });
    });

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await page.fill('#contact-name', 'Smoke Test User');
    await page.fill('#contact-email', 'test@example.com');
    await page.fill('#contact-message', 'This is an automated smoke test verification message with enough characters.');

    const submitBtn = page.locator('button[type="submit"]:has-text("Send Message")');
    await submitBtn.click();

    await expect(page.locator('text=Message delivered')).toBeVisible({ timeout: 5000 });
  });

  test('3. Theme toggle persists selection across page reloads via cookie', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click theme toggle
    const themeBtn = page.locator('button[aria-label*="Switch to"]').first();
    await themeBtn.click();

    // Check cookie
    const cookies = await context.cookies();
    const themeCookie = cookies.find((c) => c.name === 'theme');
    expect(themeCookie).toBeDefined();

    const selectedTheme = themeCookie?.value;
    expect(['dark', 'light']).toContain(selectedTheme);

    // Reload page and verify theme persistence on <html>
    await page.reload();
    await page.waitForLoadState('networkidle');

    const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('light') ? 'light' : 'dark'));
    expect(htmlTheme).toBe(selectedTheme);
  });

  test('4. Command Palette (Cmd+K/Ctrl+K, filter results, Esc focus return)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchBtn = page.locator('button:has-text("Search")').first();
    await searchBtn.focus();

    // Open palette
    await page.keyboard.press('Control+k');
    const input = page.locator('input[placeholder*="command" i], [role="combobox"]');
    await expect(input).toBeVisible({ timeout: 3000 });
    await expect(input).toBeFocused();

    // Type query to filter
    await input.fill('Sovereign');
    await expect(page.locator('text=Sovereign').first()).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await expect(input).not.toBeVisible();

    // Focus restored
    await expect(searchBtn).toBeFocused();
  });

  test('5. Prefers-reduced-motion disables role animation and displays final phrase', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const roleElement = page.locator('text=Full-Stack Developer').first();
    await expect(roleElement).toBeVisible();

    // Ensure text is immediately present
    const isDone = await page.evaluate(() => {
      const el = document.querySelector('span[aria-hidden="true"]');
      return el ? el.textContent : null;
    });
    expect(isDone).toBeTruthy();
  });
});
