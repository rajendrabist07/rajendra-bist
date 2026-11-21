# PR: Complete Portfolio Redesign & Evidence-Grounded Release (`redesign/v4` → `main`)

## Summary & What Changed Since `main@6acfad4`

> [!IMPORTANT]
> **Production Currently Serves `6acfad4`:**  
> The live site at `https://www.bistrajendra.com.np` is currently running commit `6acfad4`. That build still contains the unverified assumption text on the credentials card: `"Issuer assumed as Vcare Technical Institute training partner per owner document record"`.  
> **This PR removes this assumption text entirely**, replacing it with confirmed credentials, live verification links, and rigorous evidence grounding.

### Key Changes
1. **Credentials & Truth Grounding:**
   - Removed unverified assumption text from the Full-Stack Web Development card. Only confirmed information (title, description, and Google Drive verification link) is displayed.
   - Replaced outdated resume PDF with verified `Rajendra_Bist_Full_Stack_Developer.pdf` ("Available immediately; Delhi NCR or remote", "Next.js (App Router, ISR)").
   - Added automated release guard (`scripts/check-resume.mjs`) ensuring zero notice-period contradictions.
2. **API & Assistant Hardening:**
   - Structured error codes across `/api/chat` and `/api/contact` (`FORBIDDEN_ORIGIN`, `ASSISTANT_OFFLINE`, `RATE_LIMITED`, `INVALID_INPUT`, `PROVIDER_TIMEOUT`, `PROVIDER_ERROR`, `INTERNAL`, `SERVICE_UNAVAILABLE`).
   - Distinct, user-friendly client messages in both the Command Palette assistant dialog and the Contact form, each offering an immediate `mailto:rajendrabist396@gmail.com` fallback.
   - Single-line structured server logging without IP addresses or message contents.
   - Non-blocking best-effort MongoDB telemetry persistence bounded by a 2-second timeout.
   - Accepted origin validation covering apex domain (`bistrajendra.com.np`), `www`, `x-forwarded-host`, and Vercel preview environments.
3. **Repository Evidence & Proofs:**
   - Strengthened all 20 architectural and technology claims in `content/proofs.ts`: Node.js verified against `engines.node >=22.0.0` in `content-platform`, Prisma ORM verified against `@prisma/client ^6.19.3`.
   - `scripts/verify-claims.mjs` verifies 20/20 claims directly against raw GitHub source files.
4. **CI/CD Quality Gates & Automation:**
   - Decoupled GitHub Actions CI into 3 independent jobs: `validate`, `browser`, and `lighthouse`.
   - Pinned runners to `ubuntu-22.04` and Node engine to `22` via `.nvmrc` with zero `EBADENGINE` warnings.
   - Automated step summary generation (`scripts/ci-summary.mjs`) and artifact uploads (`if: always()`).
   - Removed `upgrade-insecure-requests` directive from `Content-Security-Policy-Report-Only` (which generated browser console warnings), restoring Lighthouse Best Practices to a perfect 1.0 (100).
   - Strict Lighthouse assertions enforced at `error` level: Accessibility 1.0, Best Practices 1.0, SEO 1.0, CLS 0.05, LCP 3500ms, TBT 300ms.

---

## Verified Checks & Test Counts

All automated quality gates have passed:

| Gate / Check | Scope / Tool | Result / Count | Status |
| :--- | :--- | :--- | :--- |
| **ESLint Static Analysis** | Next.js + ESLint flat config | `0 errors, 0 warnings` | ✅ PASS |
| **TypeScript Typecheck** | Strict compiler (`tsc --noEmit`) | `0 type errors` | ✅ PASS |
| **Vitest Test Suite** | Unit & Integration tests | `123 passed, 0 failed` across 10 files | ✅ PASS |
| **Playwright E2E Suite** | Cross-browser & responsive viewports | `56 passed, 0 failed` | ✅ PASS |
| **Axe Accessibility** | WCAG 2.2 AAA audit on 9 routes + 4 interactive states | `0 violations` | ✅ PASS |
| **Design Tokens & Contrast** | CSS custom properties token checker | `58/58 WCAG AA checks passed` | ✅ PASS |
| **Placeholder & Draft Guard** | Source & rendered production HTML scan | `0 leaks found` | ✅ PASS |
| **Resume PDF Verification** | Text extraction pre-flight check | `Available immediately` confirmed | ✅ PASS |
| **Evidence & Citations Check** | Live repository link & citation verification | `12 evidence items, 22 citations live` | ✅ PASS |
| **Architectural Proofs** | `scripts/verify-claims.mjs` | `20/20 claims verified` against source code | ✅ PASS |
| **Lighthouse CI (Mobile)** | Median run on simulated mobile device | **Perf: 98, A11y: 100, BP: 100, SEO: 100** | ✅ PASS |
| **Core Web Vitals** | Lighthouse median audit | **LCP: 2.4s, TBT: 41ms, CLS: 0.000** | ✅ PASS |

---

## Deployment Risks & Mitigations

1. **Missing Runtime API Keys:**
   - *Risk:* If `GEMINI_API_KEY` or `RESEND_API_KEY` are not provisioned in Vercel settings, endpoints could fail.
   - *Mitigation:* Both routes implement graceful failover returning distinct `ASSISTANT_OFFLINE` / `SERVICE_UNAVAILABLE` codes with direct mailto fallback links. Public static pages have zero dependency on external API availability.
2. **First Load Bundle Size:**
   - *Risk:* Hydration overhead on low-end mobile devices.
   - *Mitigation:* First Load JS is strictly budgeted at 141 kB for `/` (well within the 170 kB budget). All case study and blog routes are statically prerendered (SSG).

---

## Rollback Plan

If any unexpected regression occurs after merging to `main`:

1. **Instant Vercel Production Rollback (< 5 seconds):**
   - Go to **Vercel Dashboard > Project `rajendra-bist` > Deployments**.
   - Locate the previous successful deployment (`6acfad4`).
   - Click the three dots menu `...` and select **Promote to Production**.
   - Vercel will instantly repoint traffic at the edge without requiring a rebuild.
2. **Git Commit Revert:**
   - If rolling back via git:
     ```bash
     git checkout main
     git pull origin main
     git revert -m 1 <merge-commit-sha>
     git push origin main
     ```
   - Vercel will automatically build and deploy the reverted commit.
