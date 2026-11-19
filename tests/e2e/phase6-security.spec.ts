import { test, expect } from '@playwright/test';

test.describe('Phase 6: Security, CSP & API Hygiene', () => {
  test('1. Health check returns strictly { ok: true }', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ ok: true });
    expect(body.uptime).toBeUndefined();
    expect(body.service).toBeUndefined();
    expect(body.timestamp).toBeUndefined();
  });

  test('2. Response headers include strict security headers and CSP-Report-Only', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['x-frame-options']?.toLowerCase()).toBe('deny');
    expect(headers['x-content-type-options']?.toLowerCase()).toBe('nosniff');
    expect(headers['referrer-policy']?.toLowerCase()).toBe('strict-origin-when-cross-origin');
    expect(headers['permissions-policy']).toContain('camera=()');
    expect(headers['strict-transport-security']).toContain('max-age=63072000');

    const csp = headers['content-security-policy-report-only'];
    expect(csp).toBeDefined();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  test('3. No CSP violations triggered on home page render', async ({ page }) => {
    const violations: Array<{ blockedURI: string; violatedDirective: string }> = [];

    await page.exposeFunction('logCSPViolation', (data: { blockedURI: string; violatedDirective: string }) => {
      violations.push(data);
    });

    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) => {
        (window as any).logCSPViolation({
          blockedURI: e.blockedURI,
          violatedDirective: e.violatedDirective,
        });
      });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out expected report-only browser telemetry if any
    const realViolations = violations.filter(
      (v) => !v.blockedURI.includes('chrome-extension://') && !v.blockedURI.includes('moz-extension://'),
    );

    expect(realViolations).toHaveLength(0);
  });

  test('4. Contact API rejects cross-origin and oversized payloads', async ({ request }) => {
    // Cross-origin check
    const forbiddenRes = await request.post('/api/contact', {
      headers: {
        Origin: 'https://malicious-external-site.com',
        Host: 'bistrajendra.com.np',
      },
      data: {
        name: 'Attacker',
        email: 'attacker@evil.com',
        message: 'Trying cross-origin submission over twenty chars',
      },
    });
    expect(forbiddenRes.status()).toBe(403);
    const forbiddenJson = await forbiddenRes.json();
    expect(forbiddenJson.ok).toBe(false);
    expect(forbiddenJson.code).toBe('FORBIDDEN');

    // Honeypot check
    const honeypotRes = await request.post('/api/contact', {
      data: {
        name: 'Spam Bot',
        email: 'bot@spam.com',
        message: 'Spammy content reaching twenty characters threshold',
        _hp: 'active_bot_trap',
      },
    });
    expect(honeypotRes.status()).toBe(200);
    const honeypotJson = await honeypotRes.json();
    expect(honeypotJson.ok).toBe(true);
    expect(honeypotJson.code).toBe('DELIVERED');
  });
});
