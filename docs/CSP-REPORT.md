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
Strict-Transport-Security: max-age=63072000
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.resend.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;
```

---

## 2. Policy Directives & Architectural Trade-offs

| Directive | Value | Architectural Rationale & Trade-off Notes |
|---|---|---|
| `default-src` | `'self'` | Disallows loading resources from arbitrary third-party origins by default. |
| `script-src` | `'self' 'unsafe-inline'` | **Removed `'unsafe-eval'`** as it is unneeded in production. **Accepts `'unsafe-inline'`** because implementing per-request cryptographic nonces would force dynamic SSR on every request, completely disabling static HTML generation (SSG) and edge CDN caching for the entire portfolio. |
| `style-src` | `'self' 'unsafe-inline'` | Permits Tailwind CSS utility classes and Next.js font/style injections. |
| `img-src` | `'self' data: blob: https:` | Permits local optimized WebP/AVIF images, inline SVG data URIs, and external project previews. |
| `font-src` | `'self' data:` | Allows local Space Grotesk and JetBrains Mono fonts. |
| `connect-src` | `'self' https://generativelanguage.googleapis.com https://api.resend.com` | Whitelists only the official Gemini API and Resend email endpoints. |
| `object-src` | `'none'` | Strictly disallows legacy Flash/Java plugins or embedded object vulnerabilities. |
| `frame-ancestors` | `'none'` | Completely disables iframe embedding, eliminating clickjacking attack vectors (paired with `X-Frame-Options: DENY`). |
| `base-uri` | `'self'` | Disallows DOM-based `<base>` tag injection attacks. |
| `form-action` | `'self'` | Ensures contact and feedback forms submit strictly to internal same-origin API routes (`/api/contact`). |
| `upgrade-insecure-requests` | directive enabled | Automatically promotes HTTP requests to HTTPS. |

### Critical Evidence Caveat
> **Important Note on "No Violations":**  
> While the automated Playwright test recorded zero `securitypolicyviolation` events during navigation and interaction, reporting "no violations" under a policy permitting `'unsafe-inline'` is **not strong evidence** of absolute XSS immunity. It proves that existing first-party scripts and libraries load without CSP syntax blockage, but defense-in-depth relies on strict server-side Zod validation, text sanitization, and React's default DOM escaping.

---

## 3. Strict-Transport-Security (HSTS) Note

In accordance with deployment best practices on Vercel, `includeSubDomains` and `preload` were removed from `next.config.ts`, maintaining:
```http
Strict-Transport-Security: max-age=63072000
```
Domain-level subdomains and HSTS preload submission remain governed by Vercel's edge certificate infrastructure.
