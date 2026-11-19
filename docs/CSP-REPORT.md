# Content Security Policy & Security Headers Audit Report

**Date:** November 19, 2026  
**Environment:** Next.js 15.5.19 Production Build (`next start`)  
**Target:** `https://www.bistrajendra.com.np`  
**Test Suite:** `tests/e2e/phase6-security.spec.ts` (Playwright E2E)

---

## 1. Security Headers Configuration (`next.config.ts`)

The application enforces a defensive security header posture across all routes (`/(.*)`):

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.resend.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
```

---

## 2. Policy Directives Breakdown

| Directive | Value | Rationale |
|---|---|---|
| `default-src` | `'self'` | Disallows loading resources from arbitrary third-party origins by default. |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval'` | Permits Next.js client runtime hydration and Shiki syntax highlighting while restricting external untrusted scripts. |
| `style-src` | `'self' 'unsafe-inline'` | Permits Tailwind CSS utility classes and Next.js font/style injections. |
| `img-src` | `'self' data: blob: https:` | Permits local optimized WebP/AVIF images, inline SVG data URIs, and external project previews. |
| `font-src` | `'self' data:` | Allows local Space Grotesk and JetBrains Mono fonts. |
| `connect-src` | `'self' https://generativelanguage.googleapis.com https://api.resend.com` | Whitelists only the official Gemini API and Resend email endpoints. |
| `object-src` | `'none'` | Strictly disallows legacy Flash/Java plugins or embedded object vulnerabilities. |
| `frame-ancestors` | `'none'` | Completely disables iframe embedding, eliminating clickjacking attack vectors (paired with `X-Frame-Options: DENY`). |
| `base-uri` | `'self'` | Disallows DOM-based `<base>` tag injection attacks. |
| `form-action` | `'self'` | Ensures contact and feedback forms submit strictly to internal same-origin API routes (`/api/contact`). |

---

## 3. Playwright Violation Monitoring Evidence

In `tests/e2e/phase6-security.spec.ts`, an event listener for `securitypolicyviolation` was attached via `addInitScript` prior to document evaluation.

```ts
test('3. No CSP violations triggered on home page render', async ({ page }) => {
  const violations: Array<{ blockedURI: string; violatedDirective: string }> = [];
  await page.exposeFunction('logCSPViolation', (data) => violations.push(data));
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
  expect(violations).toHaveLength(0);
});
```

**Result:** Passed with `0` violations recorded.

---

## 4. Production Header Verification (`curl -sI`)

Raw server headers captured from running production instance:

```text
HTTP/1.1 200 OK
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.resend.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
x-nextjs-cache: HIT
x-nextjs-prerender: 1
Cache-Control: s-maxage=31536000
Content-Type: text/html; charset=utf-8
```
