# Pre-Merge Release Checklist (`redesign/v4` → `main`)

> **Release Target:** `main` (Squash & Merge)  
> **Source Branch:** `redesign/v4`  
> **Release Coordinator:** Antigravity / Rajendra Bist  
> **Date:** 2026-11-20  

---

## 1. Automated Quality Gates

Every gate below must be satisfied prior to triggering the squash merge:

- [x] **Facts Validation (`npm run prebuild`)**
  - Schema validation across `facts.ts` passes with strict Zod types.
- [x] **Typecheck (`npm run typecheck`)**
  - Zero TypeScript compilation errors (`tsc --noEmit`).
- [x] **Linting (`npm run lint`)**
  - Next.js and ESLint static analysis passes.
- [x] **Design Tokens & Contrast (`npm run check:contrast`)**
  - All color pairs in both dark and light modes pass WCAG 2.2 AA contrast requirements (≥ 4.5:1 text, ≥ 3.0:1 UI borders).
- [x] **Public Link Equity & Citations (`npm run check:links` & `npm run check:citations`)**
  - All external repository and artifact URLs verified reachable via HTTP 200 checks.
- [x] **Placeholder & Generic-Tell Guard (`npm run check:placeholders`)**
  - Zero forbidden generic-tells (`[SPEC // ...]`, `BOUNDARY`, `TODO`, `Lorem ipsum`).
- [x] **Vitest Unit & Adversarial Test Suite (`npm test`)**
  - 15/15 unit and prompt-injection static defense tests pass.
- [x] **Full Playwright E2E Suite (`npx playwright test`)**
  - 56/56 browser tests pass covering axe accessibility across 9 public routes, 4 interactive states, responsive viewports, and critical smoke journeys.
- [x] **Mobile Lighthouse Benchmark (`npx lhci autorun`)**
  - Performance: ≥ 96 (median: 98)
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100
  - First Load JS (`/`): 141 kB (strictly under 170 kB budget)
- [ ] **Resume PDF Release Guard (`npm run check:resume`)**
  - **STATUS: RELEASE BLOCKER (PENDING OWNER ACTION)**
  - Current extraction of `public/resume/Rajendra_Bist_Full_Stack_Developer.pdf` contains `"1 month notice"` and `"Next.js 15"`.
  - Contradicts portfolio status (`"Available immediately"`).
  - Owner must replace this file with the updated PDF. Once swapped, `npm run release:check` will pass.

---

## 2. Public Repository Hygiene

- [x] Private reference audits moved to `docs/private/` (confirmed gitignored).
- [x] Legacy reference files removed via `git rm` (`docs/reference/DISTINCTNESS-AUDIT.md`, `docs/reference/REFERENCE-NOTES.md`).
- [x] Zero mentions of external benchmark portfolios or "SK." in repository code.
- [x] Zero absolute machine paths (`/Users/...`) tracked in git.
- [x] Clean Blueprint architectural documentation.

---

## 3. Merge Procedure

1. Push all final commits on `redesign/v4`:
   ```bash
   git push origin redesign/v4
   ```
2. Open a Pull Request from `redesign/v4` into `main`.
3. Verify GitHub Actions CI runs all 3 workflow jobs (`validate`, `browser`, `lighthouse`).
4. Replace resume PDF with corrected file and verify `npm run release:check` exits with code 0.
5. Perform **Squash and merge** into `main`.
6. Confirm Vercel production deployment succeeds.
