# Pre-Merge Release Checklist (`redesign/v4` → `main`)

> **Release Target:** `main` (Squash & Merge)  
> **Source Branch:** `redesign/v4`  
> **Release Coordinator:** Antigravity / Rajendra Bist  
> **Updated:** 2026-11-21  

---

## 1. Automated Quality Gates (All Passing)

- [x] **Facts Validation (`npm run prebuild`)**
  - Strict Zod schema validation across `content/facts.ts` passes at build time.
- [x] **Typecheck (`npm run typecheck`)**
  - Zero TypeScript compilation errors (`tsc --noEmit`).
- [x] **Linting (`npm run lint`)**
  - Next.js and ESLint static analysis passes (`0 errors, 0 warnings`).
- [x] **Design Tokens & Contrast (`npm run check:contrast`)**
  - 58/58 WCAG 2.2 AA contrast checks pass across dark and light tokens.
- [x] **Public Link Equity & Citations (`npm run check:links` & `npm run check:citations`)**
  - All 12 evidence repository files and 22 citation URLs verified live.
- [x] **Placeholder & Draft Scanner (`npm run check:placeholders`)**
  - Zero leaks of forbidden tokens (`assum`, `per owner`, `TODO`, `⚠`, `Note:`, `placeholder`, `training partner`) in source code or rendered `/` HTML.
- [x] **Resume PDF Release Guard (`node scripts/check-resume.mjs`)**
  - **DONE**: Owner uploaded updated PDF (`Rajendra_Bist_Full_Stack_Developer.pdf`).
  - Contains `"Available immediately"`; zero mentions of `"1 month notice"` or `"Next.js 15"`.
- [x] **Vitest Unit & Integration Suite (`npm test`)**
  - 123/123 tests passing across 10 test files.
- [x] **Full Playwright Browser E2E Suite (`npm run test:e2e`)**
  - 56/56 browser tests passing across 7 viewports and 18 axe accessibility scans (0 violations).
- [x] **Lighthouse CI Quality Audit (`npm run lighthouse`)**
  - Performance: 98 (mobile)
  - Accessibility: 100
  - Best Practices: 100 (localhost `is-on-https: off`)
  - SEO: 100
  - CLS: 0.000 (≤ 0.05 error threshold)
  - LCP: 2410 ms (≤ 3500 ms error threshold)
  - TBT: 41 ms (≤ 300 ms error threshold)

---

## 2. Production & Environment Separation Status

- [ ] **Production Serves `main@6acfad4` (Action: Deploy PR to fix)**
  - Production currently serves `6acfad4`, which still contains the unverified certificate card assumption: `"Issuer assumed as Vcare Technical Institute training partner per owner document record"`.
  - Merging this PR removes this text and replaces it with verified certificate links.
- [ ] **Environment Variables in Vercel (Owner Action)**
  - Verify `GEMINI_API_KEY`, `RESEND_API_KEY`, and `MONGODB_URI` are configured in Vercel Project Settings for both Preview and Production.
- [ ] **Contact Form Verification (Owner Action)**
  - Test contact form submission from personal email on live site and confirm receipt in inbox.
- [ ] **Certificate Issuer & Date Confirmation (Owner Action)**
  - Confirm official issuing institution and completion year for Full-Stack Web Development certificate so details can be permanently added.
- [ ] **Branch Protection on `main` (Owner Action)**
  - Configure GitHub branch protection on public repository: require pull request, require checks (`validate`, `browser`, `lighthouse`), block force pushes.
- [ ] **External Profile Alignment (Owner Action)**
  - Confirm alignment across Naukri, LinkedIn, and GitHub profiles per `docs/HUMAN-TODO.md`.

---

## 3. Merge & Verification Procedure

1. Open PR from `redesign/v4` to `main` using description from `docs/PR-DESCRIPTION.md`.
2. Confirm all 3 GitHub Actions checks (`validate`, `browser`, `lighthouse`) are green.
3. Select **Squash and merge**.
4. Run `node scripts/smoke-live.mjs https://www.bistrajendra.com.np` to verify production deployment.
