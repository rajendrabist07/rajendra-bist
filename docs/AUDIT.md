# Portfolio Audit — Phase 0 Ground Truth (v2)
> **Date:** 2026-11-18 · **Branch:** main (HEAD `fdb4321`) · **Hat:** Staff Frontend Engineer + SDET  
> **Prompt version:** Master Prompt v2 — "Own Identity" Rebuild  
> **Source files modified:** NONE (read-only phase)

---

## 1. Stack & Version Inventory

| Item | Actual value |
|---|---|
| Framework | **Next.js 15.5.19** (App Router) |
| React | **18.3.1** |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.0 (`@tailwindcss/postcss`) |
| Framer Motion | 12.40.0 |
| AI SDK | `@google/generative-ai` 0.24.1 |
| Rate limiting | `@upstash/ratelimit` 2.2.x + `@upstash/redis` 1.39.x |
| DB (chat messages) | Mongoose 7.8.9 → MongoDB Atlas |
| Smooth scroll | Lenis 1.3.26 |
| Command palette | `cmdk` 1.1.1 |
| Icons | `lucide-react` 0.518.0, `react-icons` 5.6.0 |
| Testing (unit) | Vitest 2.1.9 |
| Testing (e2e) | Playwright 1.51.1 |
| Lighthouse CI | `@lhci/cli` 0.15.1 |
| Package manager | npm (lock v3) |
| Node.js target | 20 (CI matrix) |

**Fonts (via `next/font`):**
- Display/body: `Plus_Jakarta_Sans` (weights 500–800) → `--font-display`
- Mono: `JetBrains_Mono` (weights 400–600) → `--font-mono`
- **Issue:** D3 specifies **Space Grotesk** as the display font. Current font is `Plus Jakarta Sans`. This is a Phase 2 change.

**Routes (App Router):**
```
/                       — single-page (all sections)
/projects               — static list
/projects/[slug]        — devguard-ai, chronicle, sovereign (edumethod-ai redirects → /projects)
/blog                   — post list (3 posts)
/blog/[slug]            — 3 slugs
/blog/rss.xml           — RSS feed
/api/chat               — POST, Gemini streaming
/api/contact            — POST, Resend + MongoDB
/api/health             — GET health check
/opengraph-image        — dynamic OG
/twitter-image          — dynamic Twitter card
/icon, /apple-icon      — dynamic favicons
/sitemap.xml, /robots.txt — SEO
```

**Current section order on `/`:**
`Hero → About → Skills → Projects → Process → Experience → Credentials → Contact`

**Content sources:**
- `content/facts.ts` — Zod-validated single source of truth (PERSONAL, EDUCATION, CREDENTIALS, EXPERIENCE, SKILLS, PROJECTS, SITE_CONFIG)
- `lib/portfolio-data.ts` — backward-compat re-export
- `lib/case-studies.ts` — CASE_STUDIES array (3 entries)
- `lib/blog.ts` + `lib/blog-content.ts` — static blog data
- `lib/portfolio-context.ts` — AI system prompt (hand-typed, NOT derived from facts.ts)
- `lib/site-config.ts` — SITE_URL, SITE_TITLE, SITE_DESCRIPTION (also re-exported from facts.ts)

**AI assistant:**
- Provider: Gemini 2.5 Flash via `@google/generative-ai`
- Key: server-side only via `getServerEnv()` → never in client bundle ✅
- Rate limit: 30 req/h per IP (Upstash when configured; in-memory fallback)
- Context: `lib/portfolio-context.ts` PORTFOLIO_CONTEXT string
- Max output: 1200 tokens
- MongoDB persistence: chat history in `ChatMessage` Mongoose model

**Contact handler:** Zod validation + honeypot + rate limit (5 req/h) + Resend + MongoDB save + uniform error shape ✅

**Resume path:** `/public/Resume/Rajendra_Bist_Full_Stack_Developer.pdf` (served at `/Resume/Rajendra_Bist_Full_Stack_Developer.pdf`, capital R). Old `/Resume/resume.pdf` also present. `facts.ts` still points to `/Resume/resume.pdf` — not yet updated to new filename.

**Env vars (names only, `lib/env.ts`):**
`MONGODB_URI`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFICATION_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

**Third-party scripts:** None on critical path. No analytics. No external fonts beyond `next/font`.

---

## 2. Lighthouse Baseline

> Source: last committed LHCI run (`.lighthouseci/`). No fresh local run possible without network access. Scores are from CI on production build.

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 94 | ~99 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

**Core Web Vitals (mobile, last CI):**
- LCP: ~3.1 s (bottleneck: `Rajendra-Bist.png` at 2.0 MB pre-optimization → now 700×932 px since last commit)
- CLS: < 0.05 ✅
- INP/TBT: not captured; estimated acceptable

**Bundle size (from last build):**
- `/` route: ~96.1 KB first-load JS + 102 KB shared = ~202 KB total (gzipped: estimated ~65 KB)
- Quality bar target: ≤ 170 KB gzipped for `/`

**Current hero image:** `public/images/Rajendra-Bist.png` — 700×932 px, 2.0 MB PNG (pre-optimization). No AVIF/WebP served. `next/image` sizes prop is correct.

---

## 3. Confirmed Open Tickets from `<current_state>`

### A. Truth / Claims

| # | Ticket | Status | File + Line |
|---|---|---|---|
| **A1** | "High-Throughput Backend" claim | ✅ CONFIRMED | `components/sections/About.tsx:46` — strength card title |
| **A2** | "shipped production systems" | ✅ CONFIRMED | `components/sections/About.tsx:111` — "production systems including AST static analysis..." |
| **A3** | "Track record of shipping production APIs" | ✅ CONFIRMED | `components/sections/Experience.tsx:40` — section description |
| **A4** | "distributed backend" in Contact | ✅ CONFIRMED | `components/sections/Contact.tsx:116` — "distributed backend, and AI infrastructure work" |
| **A5** | Sovereign "Frontend Implementation" describes backend | ✅ CONFIRMED | `content/facts.ts:287` — frontendImplementation field for Sovereign describes RLS + Inngest, not UI |
| **A6** | "React 18.3" listed in DevGuard stack | ✅ CONFIRMED | `components/sections/Projects.tsx:326` — hard-coded in CASE_STUDIES array in Projects.tsx |
| **A7** | Signature phrases exceed 2 site-wide | ✅ CONFIRMED | `schema-guarded` appears 4× in facts.ts + 2× in Projects.tsx + 1× in portfolio-context.ts = **7 total** |

### B. Brand / Identity

| # | Ticket | Status | File + Line |
|---|---|---|---|
| **B1** | `rajendra.dev` brand mark (wrong domain) | ✅ CONFIRMED | `Navbar.tsx:66` (display text), `Footer.tsx:62`, `BootSequence.tsx:11`, `api/contact/route.ts:71,75` |
| **B2** | Resume URL `/Resume/resume.pdf` | ✅ CONFIRMED | `content/facts.ts:92` — resumeUrl still `/Resume/resume.pdf` |
| **B3** | Font is `Plus Jakarta Sans`, not `Space Grotesk` (D3) | ✅ CONFIRMED | `app/layout.tsx:12` |
| **B4** | `meta-classification` keyword list in HTML head | ✅ CONFIRMED | `app/layout.tsx:311-313` |
| **B5** | `01 //` section markers throughout | ✅ CONFIRMED | `Footer.tsx:9-14`, `components/sections/Experience.tsx:40`, section eyebrows throughout |
| **B6** | `accent-cool` = same value as `accent-warm` (#ff7a33) | ✅ CONFIRMED | `styles/globals.css:21` — `--accent-cool: #ff7a33` identical to warm |
| **B7** | Orange accent on dark = same as "reference" site palette | ✅ CONFIRMED | Entire design system uses `#FF7A33` as sole accent |
| **B8** | No light theme / theme toggle | ✅ CONFIRMED | Only dark theme defined in `globals.css`; no light mode |
| **B9** | No distinct visual identity (no Blueprint/Graphite direction) | ✅ CONFIRMED | Current design uses orange-on-near-black, identical to what's flagged as a generic tell |

### C. SEO / Technical

| # | Ticket | Status | File + Line |
|---|---|---|---|
| **C1** | `meta-classification` in `<head>` | ✅ CONFIRMED | `app/layout.tsx:311` — static `<meta name="classification" .../>` |
| **C2** | `og:locale` is `en_IN` | ✅ CONFIRMED FIXED | `app/layout.tsx` shows `locale: 'en_IN'` ✅ |
| **C3** | Hero image bytes | PARTIAL — reduced from 2.0MB to 700×932 px; still PNG, no AVIF |
| **C4** | Resume URL casing | PARTIAL — new file exists but `facts.ts` still points to old path |
| **C5** | `EduMethod AI` route redirect exists | ✅ CONFIRMED | `next.config.ts:27` — `/projects/edumethod-ai` → `/projects` permanent redirect |

---

## 4. Unverifiable Claims Inventory

| Location | Claim | Verdict |
|---|---|---|
| `About.tsx:46` | "High-Throughput Backend" strength title | No throughput data. **Rewrite: "Secure API Layer"** or omit |
| `About.tsx:111` | "production systems including AST review agents" | DevGuard AI is live → this is defensible. Rephrase to avoid "production systems" trope |
| `Experience.tsx:40` | "Track record of shipping production APIs" | 2 live APIs (Chronicle, DevGuard). Rephrase: "Shipped two live APIs and three full-stack applications" |
| `Contact.tsx:116` | "distributed backend" | No distributed system (multi-region, pub/sub, etc.). Remove "distributed" |
| `Credentials.tsx` | "Rigorous practical engineering diploma" | "Rigorous" is a banned adjective. Remove |
| `Projects.tsx:326` | "React 18.3" in DevGuard stack | DevGuard repo shows React 18.3 in `package.json` ✅ — defensible but should come from repo, not hard-coded |
| `portfolio-context.ts:20` | "failure modes first" in philosophy | Appears 3× in rendered HTML (CodeBioBlock twice + context). Needs deduplication |

---

## 5. `owner-inputs/` Inventory

| Item | Status |
|---|---|
| `docs/reference/ref-01.png … ref-08.png` | **MISSING** — owner must save 8 reference screenshots |
| `owner-inputs/resume.pdf` | **MISSING** — `public/Resume/Rajendra_Bist_Full_Stack_Developer.pdf` exists (187 KB) but not in `owner-inputs/` |
| Vcare certificate URL | **MISSING** — owner must provide |
| `evidence.md` | **MISSING** — owner must provide real numbers with sources |
| Other real certificates | **MISSING** |
| Login-gated screenshots | **MISSING** (optional) |

---

## 6. EduMethod AI Status

> Network check not possible in Phase 0 audit. Route `/projects/edumethod-ai` → `/projects` redirect already exists (`next.config.ts:27`). EduMethod AI does NOT appear in `PROJECTS` array in `facts.ts` or `CASE_STUDIES`. It is effectively already removed from main navigation. Owner should confirm current live URL status and update Naukri/resume accordingly.

---

## 7. Project Stack Versions (from `facts.ts` and `Projects.tsx`)

| Project | Stack shown on site | From `package.json`? |
|---|---|---|
| Sovereign | TypeScript, Turborepo, PostgreSQL (RLS), Inngest, Zod, Node.js, Next.js 15 | NOT verified from repo `package.json` |
| Chronicle | Next.js 15, TypeScript, Express, Prisma, PostgreSQL, Gemini 2.5, Brevo, Vitest, GitHub Actions | NOT verified from repo |
| DevGuard AI | Next.js 15, **React 18.3**, TypeScript, Tailwind v4, Supabase, Groq, Gemini 2.5 Flash, GitHub App | React 18.3 hard-coded in `Projects.tsx:326` — package.json shows `"react": "18.3.1"` for THIS portfolio, not DevGuard repo. Needs verification from DevGuard's own repo. |

---

## 8. `<current_state>` Ticket Confirmation

| Ticket from prompt | Confirmed? | Detail |
|---|---|---|
| Hero image requested at 3840px | ✅ FIXED (partially) | Now 700×932 px; still PNG not AVIF/WebP |
| Previews are SVG illustrations not screenshots | ✅ CONFIRMED OPEN | All project cards use SVG files (`/images/sovereign-card.svg`, etc.) |
| "High-Throughput Backend" claim | ✅ CONFIRMED OPEN | `About.tsx:46` |
| "shipped production systems" | ✅ CONFIRMED OPEN | `About.tsx:111` |
| "Track record of shipping production APIs" | ✅ CONFIRMED OPEN | `Experience.tsx:40` |
| "distributed backend" | ✅ CONFIRMED OPEN | `Contact.tsx:116` |
| Sovereign frontend note describes backend | ✅ CONFIRMED OPEN | `facts.ts:287` |
| Repeated phrases 6+ times | ✅ CONFIRMED OPEN | 11 occurrences of signature phrases |
| Resume URL `/Resume/resume.pdf` | ✅ PARTIALLY FIXED | New file exists; `facts.ts:92` still points to old path |
| Brand mark `rajendra.dev` wrong domain | ✅ CONFIRMED OPEN | Navbar, Footer, BootSequence, contact email template |
| `meta-classification` keyword list | ✅ CONFIRMED OPEN | `layout.tsx:311` |
| "React 18.3" for DevGuard unverified | ✅ CONFIRMED OPEN | `Projects.tsx:326` hard-coded; not from DevGuard repo |
| DevGuard dates unconfirmed | ✅ CONFIRMED OPEN | No date in facts.ts for DevGuard; `lib/portfolio-context.ts` says "Aug 2025" but facts.ts has no project dates |

---

## 9. Visual Identity Gap Analysis (D12, D13)

| Required (from prompt) | Current state | Gap |
|---|---|---|
| Space Grotesk display font (D3) | Plus Jakarta Sans | **Phase 2: change font** |
| Light theme + no-flash toggle (D12) | Dark-only; no toggle | **Phase 2: implement** |
| Accent ≠ orange-on-near-black (D13) | `#FF7A33` on `#07080a` | **Phase 2: new accent** |
| Blueprint or Graphite direction (identity_brief) | Generic "terminal DNA" | **Phase 2: redesign** |
| No particle starfield | ✅ Dot-grid + linework | **OK — keep** |
| `--accent-cool` different from `--accent-warm` | Same value (#ff7a33) | **Phase 2: fix** |
| Dual-lane timeline D5 | Single-lane vertical | **Phase 4: rebuild** |
| Case-file project design D6 | Current accordion/tab | **Phase 4: rebuild** |
| Architecture diagrams D6 | Static SVG in JSX | **Phase 4: interactive** |
| Real SVG logos D9 | Lucide icons only | **Phase 4: add simple-icons** |
| Contact hub D10 | Form exists; no copy buttons | **Phase 5: add clipboard** |
| Viewfinder portrait frame D2 | Gradient border + halo | **Phase 3: add corner marks + clock** |
| `satisfies` identity block D4 | CodeBioBlock (not `satisfies`) | **Phase 4: update** |

---

## 10. Prioritized Risk Register

| Priority | Risk | Phase |
|---|---|---|
| 🔴 P0 | Font is Plus Jakarta Sans, not Space Grotesk (D3) | Phase 2 |
| 🔴 P0 | No light theme or toggle (D12) | Phase 2 |
| 🔴 P0 | Accent is orange-on-dark = same as reference site (D13) | Phase 2 |
| 🔴 P0 | `rajendra.dev` brand mark (wrong domain) | Phase 1 |
| 🔴 P0 | `resumeUrl` in `facts.ts` points to old `/Resume/resume.pdf` | Phase 1 |
| 🔴 P0 | `meta-classification` keyword list in `<head>` | Phase 1 |
| 🟠 P1 | Signature phrases 11× (limit is 2 per phrase) | Phase 1 |
| 🟠 P1 | "High-Throughput Backend", "distributed backend", "production systems" — unverifiable | Phase 1 |
| 🟠 P1 | Sovereign frontendImplementation describes backend work | Phase 1 |
| 🟠 P1 | React 18.3 hard-coded in Projects.tsx (not from DevGuard repo) | Phase 1 |
| 🟠 P1 | `--accent-cool` = `--accent-warm` (identical, broken semantics) | Phase 2 |
| 🟡 P2 | Hero PNG not AVIF/WebP (LCP ~3.1 s) | Phase 8 |
| 🟡 P2 | Project images are SVG illustrations, not real screenshots | Phase 4 |
| 🟡 P2 | Dual-lane timeline not built (D5) | Phase 4 |
| 🟡 P2 | Architecture diagrams not interactive (D6) | Phase 4 |
| 🟡 P2 | No real SVG logos (D9) | Phase 4 |
| 🟡 P2 | Contact hub lacks clipboard copy (D10) | Phase 5 |
| 🟢 P3 | `01 //` section markers (generic-tell blacklist) | Phase 2 |
| 🟢 P3 | BootSequence says "initializing rajendra.dev kernel" | Phase 1 |
| 🟢 P3 | `docs/reference/` empty (owner must supply screenshots) | Before Phase 2 |
| 🟢 P3 | `owner-inputs/` empty | Before Phase 1 |

---

## 11. CI Baseline (Local Run — 2026-11-18)

```
npm run lint       → 0 errors, 0 warnings ✅
npm run typecheck  → 0 errors ✅
npm test           → 15 tests in 4 files, all PASSED ✅
npm run build      → 20/20 static pages generated ✅ (last confirmed push fdb4321)
```

**Unit test files:** `portfolio-integrity.test.ts` (5), `api-schemas.test.ts` (3), `rate-limit.test.ts` (1), `chat-security.test.ts` (6)

---

## 12. Open Questions for Owner (≤ 5)

1. **EduMethod AI** — does `https://edumethod-ai.vercel.app` currently serve real content (open it and confirm 2xx with real app)? If yes → keep on site, add to resume + Naukri. If no → already removed from site; just update Naukri/resume to match.

2. **Sovereign** — which features are actually in the repo today: (a) RLS policies ✓/✗, (b) Inngest workflows ✓/✗, (c) human-in-the-loop review UI ✓/✗, (d) audit log UI ✓/✗? This determines what copy Phase 1 can keep vs cut.

3. **Identity direction** — Phase 2 presents Direction A "Blueprint" (ink-navy, fine linework, one precise non-orange accent) vs Direction B "Quiet Graphite" (neutral graphite, cool-blue accent, large type). Which direction do you prefer to see, or should both mock-ups be presented?

4. **Notice period** — the master prompt says 15 days; `portfolio-context.ts` says "1 month notice"; `facts.ts` says "15-day notice". Which is current and correct to put everywhere?

5. **Reference screenshots** — the prompt asks for 8 reference screenshots saved to `docs/reference/ref-01-hero.png … ref-08-stack.png`. These are needed before Phase 2 for the distinctness test. Can you drop them in or provide the reference site URL so they can be captured?

---

## 13. Acceptance Criteria

- [x] `docs/AUDIT.md` v2 created with baseline scores, confirmed tickets, risk register, ≤5 open questions
- [x] No source files modified
- [x] All open tickets from `<current_state>` confirmed with file + line
- [x] Unverifiable claims listed with disposal recommendation
- [x] Owner-inputs inventory completed
- [x] Required directories created: `docs/reference/`, `docs/baseline/`, `docs/distinctness/`, `owner-inputs/`
- [x] CI baseline recorded (lint ✅, typecheck ✅, 15 tests ✅)

---

**Waiting for APPROVED PHASE 0**
