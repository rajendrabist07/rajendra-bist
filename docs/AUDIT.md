# Portfolio Audit — Phase 0 Ground Truth
> **Date:** 2026-11-16 · **Branch:** main (HEAD `fdb4321`) · **Hat:** Principal Frontend Engineer + QA

---

## 1. Stack & Version Inventory

| Item | Actual value (from `package.json`) |
|---|---|
| Framework | **Next.js 15.5.19** |
| React | **18.3.1** |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.0 |
| Framer Motion | 12.40.0 |
| AI SDK | `@google/generative-ai` 0.24.1 |
| Rate limiting | `@upstash/ratelimit` 2.2.x + `@upstash/redis` 1.39.x |
| DB (portfolio messages) | Mongoose 7.8.9 → MongoDB |
| Fonts | Plus Jakarta Sans + JetBrains Mono (via `next/font`) |
| Animation smooth-scroll | Lenis 1.3.26 |
| Testing | Vitest 2.1.9 (unit), Playwright 1.51.1 (e2e), LHCI 0.15.1 |
| Package manager | npm (package-lock.json present) |

**Routing structure (App Router):**
- `/` — single page (Hero → About → Skills → Projects → Process → Experience → Credentials → Contact)
- `/projects` — static list of case studies
- `/projects/[slug]` — 4 slugs: `devguard-ai`, `edumethod-ai`, `chronicle`, `sovereign`
- `/blog`, `/blog/[slug]` — exist in app directory
- `/api/chat` — POST, streaming Gemini response
- `/api/contact` — POST, Resend + MongoDB
- `/blog/rss.xml` — RSS feed route
- Dynamic OG images: `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`

**Content sources:** All content is **hard-coded in TypeScript files** — no CMS, no MDX.
- `lib/portfolio-data.ts` — PERSONAL, EDUCATION, CREDENTIALS, EXPERIENCE, SKILLS, PROJECTS, FEATURED_LINKS
- `lib/site-config.ts` — SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS
- `lib/case-studies.ts` — CASE_STUDIES array (4 entries)
- `lib/portfolio-context.ts` — PORTFOLIO_CONTEXT (AI system prompt, hand-typed)
- `lib/blog.ts`, `lib/blog-content.ts` — static blog data

**Third-party scripts / external deps:** None on the critical path. No analytics scripts. No external fonts beyond `next/font`.

**Env vars (names only, from `lib/env.ts`):**
- `MONGODB_URI`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFICATION_EMAIL`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Local `.env.local` has: `MONGODB_URI`, `GEMINI_API_KEY` (Resend and Upstash **not set locally**)

**AI assistant:** Server-side only (`app/api/chat/route.ts`). API key read from `getServerEnv()`, never sent to client. Grounded on `PORTFOLIO_CONTEXT` string in `lib/portfolio-context.ts`. Max output: 1200 tokens. Per-IP rate limit: 30 req/h (Upstash when configured; in-memory fallback when not).

**Contact form:** `app/api/contact/route.ts`. Zod-validated, honeypot (`_hp`, `company_url`), rate-limited 5 req/h per IP, HTML-escaped output, Resend delivery + MongoDB save, uniform error shape.

**Resume path:** `/public/Resume/resume.pdf` — served at `/Resume/resume.pdf` (capital R). No redirect from lowercase.

---

## 2. Lighthouse Baseline (from `.lighthouseci/` — most recent run, mobile throttling)

> These are from the **last committed CI run** (`lhci autorun`), not a fresh local run. Source files cannot be run on-device without network access.

| Category | Mobile Score | Desktop Score |
|---|---|---|
| Performance | **94** | **99** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

| Metric | Mobile value | Target |
|---|---|---|
| FCP | 0.9 s | ✅ |
| LCP | **3.1 s** | ❌ target < 2.0 s |
| TBT | 60 ms | ✅ |
| CLS | 0.003 | ✅ |
| TTI | 3.1 s | ✅ |
| Total byte weight | 327 KiB | ✅ |
| Unused JS | ~59 KiB est. savings | ⚠️ |

**LCP is the only metrics target miss.** Likely caused by the hero portrait PNG at **2.0 MB / 1086×1448 px** being loaded with `priority` but no AVIF/WebP conversion.

**A11y note:** One `label-content-name-mismatch` audit shows score < 1 (low severity), but category score is still 100 — this is a "not applicable" or single element. Worth fixing.

---

## 3. Ticket Confirmation

### A. Credibility

| # | Ticket | CONFIRMED? | File + Line |
|---|---|---|---|
| **A1** | Sovereign "Live System" → GitHub, not Vercel | ✅ **CONFIRMED** | `lib/portfolio-data.ts:137` — `liveUrl: 'https://github.com/rajendrabist07/sovereign'` |
| **A2** | 4 projects on site vs 3 on resume | ✅ **CONFIRMED** | Site has Sovereign, Chronicle, DevGuard AI, EduMethod AI (4). Resume + Naukri reportedly have 3. EduMethod AI's live URL `https://edumethod-ai.vercel.app` and repo exist in data. |
| **A3** | React 18.3 on site vs React 19 on resume | ✅ **CONFIRMED** | `package.json` has `"react": "18.3.1"`. Skills section shows "React 18.3" at `Skills.tsx:98`. Resume claims React 19 — resume is wrong. |
| **A4** | Hero shows UTC+5:45 (Nepal), location is New Delhi | ✅ **CONFIRMED** | `Hero.tsx:192` — `ONLINE [UTC+5:45]`. New Delhi is UTC+5:30. |
| **A5** | Footer links to Facebook | ✅ **CONFIRMED** | `Footer.tsx:4,20` imports `Facebook` from lucide-react and `PERSONAL.facebook`. `portfolio-data.ts:11` has the URL. |
| **A6** | "Production System" with no usage evidence | ✅ **CONFIRMED** | `Footer.tsx:127` — `© 2026 Rajendra Bist. Production Systems Portfolio.`; `Skills.tsx:166` — "Technologies verified through real-world deployment, typed contracts, and **measurable throughput**." No metrics exist in repo. |
| **A7** | Every skill badged "CORE" | ✅ **CONFIRMED** | 25 of 27 skills in `Skills.tsx` have `badge: "CORE"`. Only 2 (`LangChain.js`, `LLM-as-Judge Evals`) are `"EXPLORING"`. **Docker** is marked CORE despite `portfolio-data.ts` noting "basic". |
| **A8** | Sovereign copy claims unbuilt features | ✅ **CONFIRMED** | `Projects.tsx` (Sovereign section) mentions "human-in-the-loop review queues, audit logs, and tenant isolation dashboards." `lib/portfolio-data.ts:132` calls this "In Development." The case study (`case-studies.ts:40`) confirms it's live. The discrepancy is between what is in the visible Projects section SVG/copy vs what the repo verifiably has. **Full Sovereign Vercel URL** `https://sovereign-saas-platform.vercel.app/` does not appear anywhere in codebase — was **never added** after audit finding A1 was flagged. |
| **A9** | Diploma 2025–2026 overlaps self-employment Feb 2025–Present | ✅ **CONFIRMED** | `portfolio-data.ts:22` (diploma) + `portfolio-data.ts:60` (self-employed Feb 2025). No explanation of parallel tracks anywhere on the site. `CREDENTIALS` section in `Credentials.tsx` has a third catch-all entry "Project-Based Engineering Practice / Continuous Systems Engineering" (not a real credential). |

### B. Noise / UX

| # | Ticket | CONFIRMED? | File + Line |
|---|---|---|---|
| **B1** | Fake "RB-KERNEL v2.6.4" boot loader | ✅ **CONFIRMED** | `BootSequence.tsx:74` — `RB-KERNEL v2.6.4`. Duration: ~950 ms shown, 1200 ms hard timeout. `sessionStorage` guard in place. No LCP block in LHCI. Version number is fabricated. |
| **B2** | ⌘K conflict: CommandPalette + AI Assistant both use ⌘K | ✅ **CONFIRMED** | `CommandPalette.tsx` listens for `⌘K`/`Ctrl+K`. `FloatingAskAI.tsx` shows `⌘K` label badge. The FloatingAskAI opens a custom event `open-chat-widget`, but the badge visually says ⌘K, creating user confusion. `CommandPalette.tsx` has an "Ask AI Assistant" item that triggers the chat. Same shortcut shown for two different things. |
| **B3** | Repeated phrases across site | ✅ **CONFIRMED** | "untrusted dependency" appears in: `Projects.tsx:604`, `case-studies.ts:36`, `case-studies.ts:49`, `portfolio-data.ts:85`, `portfolio-context.ts`. "schema integrity" / "typed contracts" / "failure modes" similarly repeated. |
| **B4** | Project previews are SVGs, not real screenshots | ✅ **CONFIRMED** | `portfolio-data.ts` has `imageUrl: '/images/sovereign-card.svg'` etc. for Sovereign, Chronicle, EduMethod AI. DevGuard AI has `/images/dev-guard-ai.png` (549 KB PNG — may be a real screenshot). SVGs are hand-crafted architecture diagrams. |
| **B5** | 1px outlines on nearly every card | ✅ **CONFIRMED** | `ProjectCard.tsx` has explicit `border` on every card at same visual weight. Skills cards all use same border treatment. `globals.css` has `--border-subtle` and `--border-strong` tokens but many cards use same level. |
| **B6** | Tiny, low-contrast text in tags and pills | ⚠️ **PARTIAL** | Lighthouse A11y = 100, but: `--text-tertiary: #5a6270` on `--bg-void: #050608` → computed contrast ~3.0:1 (fails WCAG AA 4.5:1 for normal text). Tags (`text-[9px]`) and hero pill secondary text at tertiary color fail. |
| **B7** | Custom cursor ring | ✅ **CONFIRMED** | `CustomCursor.tsx` mounted in `page.tsx:31`. Adds interaction cost and visual distraction. |
| **B8** | Over-themed microcopy | ✅ **CONFIRMED** | `Contact.tsx:125` — `> send_message.sh`; `Contact.tsx:129` — `ENDPOINT READY`; `Contact.tsx:200` — `Dispatch Message`; `Footer.tsx:75` — `System Index`; `Footer.tsx:93` — `Direct Connection`; `Hero.tsx` — `01 // EXPLORE SYSTEMS` scroll label. |
| **B9** | Email and phone in plain text | ✅ **CONFIRMED** | `portfolio-data.ts:9-10` — `phone: '+91 8700918036'`, `email: 'rajendrabist396@gmail.com'`. Both appear in `llms.txt` (intentional for GEO), and in JSON-LD `telephone`, and assembled in HTML. Phone is also in `portfolio-context.ts:5`. |

### C. SEO / Technical

| # | Ticket | CONFIRMED? | File + Line |
|---|---|---|---|
| **C1** | `meta keywords` ~20 terms | ✅ **CONFIRMED** | `site-config.ts` has `SITE_KEYWORDS` with **20 terms**. Applied via `layout.tsx` metadata `keywords: SITE_KEYWORDS`. |
| **C2** | Meta description ~220 chars (truncated) | ✅ **CONFIRMED** | Measured: **218 characters**. Google truncates at ~155 chars. The description in `site-config.ts` will be cut mid-sentence in SERPs. |
| **C3** | Favicon, JSON-LD, sitemap, robots — verify | ✅ **PRESENT AND FUNCTIONAL** | `favicon.svg` + `favicon-16x16.png` + `favicon-32x32.png` + `apple-touch-icon.png` ✅. `app/icon.tsx` + `app/apple-icon.tsx` ✅. `manifest.json` ✅. `app/sitemap.ts` ✅. `app/robots.ts` ✅. JSON-LD in `layout.tsx`: Person + WebSite + ProfilePage + BreadcrumbList + ItemList + FAQPage ✅. `lang="en"` ✅. Per-route metadata: `/projects` ✅ (but generic), `/blog/[slug]` needs checking. **One gap:** `og:locale` is `en_US` not `en_IN`. |
| **C4** | Hero image 3840px | ⚠️ **PARTIAL CONFIRMED** | Hero image is `1086 × 1448 px` at **2.0 MB** (PNG). Not 3840px as originally flagged, but still severely oversized — no AVIF/WebP conversion, no blur placeholder. `next/image` sizes prop is `(min-width: 1024px) 400px, 85vw` ✅ (correctly specified) but the source file is 2 MB. This is contributing to LCP = 3.1 s. |
| **C5** | Resume path `/Resume/resume.pdf` case-sensitive | ✅ **CONFIRMED** | File exists at `/public/Resume/resume.pdf`. No lowercase redirect. Any link to `/resume/resume.pdf` will 404 on case-sensitive servers. No new path yet. |

---

## 4. Unverifiable Claims Inventory (A6, A8)

| Location | Claim | Verdict |
|---|---|---|
| `Footer.tsx:127` | "Production Systems Portfolio" | No production user evidence. No traffic metrics. **Remove.** |
| `Skills.tsx:166` | "measurable throughput" | No throughput numbers anywhere. **Remove.** |
| `Credentials.tsx:40` | "industry-standard technical accreditations" | Diploma from Vcare Technical Institute is not an industry-standard accreditation (not CompTIA, AWS, etc.). **Replace with factual copy.** |
| `portfolio-data.ts:132` | Sovereign `frontendImplementation` claims "review queues, audit logs, and tenant isolation dashboards" | Sovereign is "In Development." These features may be planned, not shipped. **TODO(human): confirm what is actually built in the repo.** |
| `Projects.tsx` Sovereign card | Architecture SVG shows Inngest, Human Review, etc. | These are design targets. The status is "In Development." The SVG presents them as if live. **Acceptable IF clearly labelled "In Development."** |
| `lib/portfolio-context.ts:62` | "DevGuard AI: Aug 2025 (Live in Production)" | Portfolio-data shows Live status ✅. Live URL `https://dev-guard-ai.vercel.app/` is set. Verifiable. |
| `portfolio-context.ts` | "EduMethod AI: Live in Production" | Live URL `https://edumethod-ai.vercel.app` is set in data. Must verify URL returns 2xx. |
| `Footer.tsx:67-69` | "high-throughput APIs" | No throughput evidence. **Remove or qualify.** |
| `CREDENTIALS[2]` | "Project-Based Engineering Practice / Continuous Systems Engineering" presented as a credential | This is not a real educational credential. **Remove from Credentials section.** |

---

## 5. What Is Present (C3 Checklist)

| Item | Present | Quality |
|---|---|---|
| `favicon.ico` | ⚠️ SVG + PNG variants, no `.ico` | Browsers accept SVG favicon, modern browsers fine |
| `app/icon.tsx` | ✅ | Dynamic |
| `app/apple-icon.tsx` | ✅ | Dynamic |
| `manifest.json` | ✅ | In `/public/manifest.json`, linked in `layout.tsx` |
| Maskable icon | ❓ | `manifest.json` content not checked for maskable |
| `sitemap.ts` | ✅ | Covers all public routes |
| `robots.ts` | ✅ | Disallows `/api/` |
| JSON-LD | ✅ | Person + WebSite + ProfilePage + BreadcrumbList + ItemList + FAQPage in root layout |
| `lang` attr | ✅ | `lang="en"` |
| OG image | ✅ | Dynamic route at `app/opengraph-image.tsx` |
| Per-route `generateMetadata` | ⚠️ | `/projects` has static `metadata` export ✅; `/projects/[slug]` needs verification; `/blog/[slug]` needs verification |
| `og:locale` | ⚠️ | Set to `en_US`, should be `en_IN` |
| Heading outline | ⚠️ | Single-page app — one `<h1>` on home; `/projects` has `<h1>` ✅; case study pages need verification |
| Canonical | ✅ | Set in root layout alternates |
| `llms.txt` | ✅ | In `/public/llms.txt`, content is good |

---

## 6. Mobile Widths — Not Verified

> Playwright screenshots at 360/390/768/1024/1440/1920 could not be captured without a running server and network access. The LHCI data was captured on the last CI run. Marked **NOT VERIFIED** for local screenshots. The LHCI mobile score was 94 (perf) / 100 (a11y).

---

## 7. EduMethod AI Status Check

> The URL `https://edumethod-ai.vercel.app` and repo `github.com/rajendrabist07/edumethod-ai` are configured in `portfolio-data.ts`. **Network check not possible in this audit environment.** Must be verified manually — open the URL and confirm it returns 2xx with real content, then decide: keep (and add to resume/Naukri) or drop everywhere.

---

## 8. Prioritized Risk List

| Priority | Risk | Impact | Phase |
|---|---|---|---|
| 🔴 P0 | A1: Sovereign "Live System" → GitHub (not Vercel) | Credibility kill: recruiter clicks "Live" and gets a code repo | Phase 1 |
| 🔴 P0 | A4: `UTC+5:45` on a New Delhi portfolio | Factual error, signals carelessness | Phase 1 |
| 🔴 P0 | C2: Meta description 218 chars (truncated in SERPs) | First impression in Google is cut off | Phase 1 |
| 🔴 P0 | A6: "measurable throughput" / "Production Systems" with no data | Truth policy violation | Phase 1 |
| 🟠 P1 | A3: React 18.3 on site, React 19 on resume | Inconsistency; resume is wrong | Phase 1 |
| 🟠 P1 | A7: Every skill is "CORE" | Badge carries zero signal | Phase 1 |
| 🟠 P1 | B2: ⌘K conflict | Broken UX on first interaction | Phase 4 |
| 🟠 P1 | B1: "RB-KERNEL v2.6.4" invented version | Fake detail hurts trust | Phase 4 |
| 🟠 P1 | A5: Facebook link in footer | Personal social, not professional | Phase 1 |
| 🟠 P1 | B6: `--text-tertiary` (#5a6270) fails 4.5:1 on dark bg | WCAG AA failure for small text | Phase 3/7 |
| 🟡 P2 | C4: Hero PNG 2.0 MB causes LCP 3.1 s | Performance regression | Phase 7 |
| 🟡 P2 | B4: SVG placeholders not real screenshots | Reduces project credibility | Phase 2 |
| 🟡 P2 | B8: Over-themed microcopy ("Dispatch Message", etc.) | Comprehension barrier | Phase 2 |
| 🟡 P2 | A9: Diploma + self-employment overlap unexplained | Potential recruiter confusion | Phase 2 |
| 🟡 P2 | C1: 20 `meta keywords` | Spammy (Google ignores; Bing may penalise) | Phase 6 |
| 🟡 P2 | A8: Sovereign claims unbuilt features | Credibility risk | Phase 1 |
| 🟢 P3 | C5: `/Resume/resume.pdf` case-sensitive | Low risk on Vercel (Linux, case-sensitive) | Phase 1 |
| 🟢 P3 | B3: Repeated phrases | Lazy copy impression | Phase 2 |
| 🟢 P3 | B7: Custom cursor | Distraction, minor perf cost | Phase 4 |
| 🟢 P3 | B5: Equal card weight | Visual hierarchy missing | Phase 3 |
| 🟢 P3 | A9: Diploma credential mislabelled as "accreditation" | Minor but inaccurate | Phase 1 |

---

## 9. Open Questions for the Owner (Max 5)

1. **EduMethod AI — keep or drop?** Does `https://edumethod-ai.vercel.app` currently serve real content (open it and confirm 2xx)? If yes: keep on site AND add to resume + Naukri. If no: drop from site and set `draft: true`. **This is blocking Phase 1.**

2. **Sovereign — what is actually built?** The status is "In Development." Which of these features exist in the current repo today: (a) RLS policies, (b) Inngest workflows, (c) human-in-the-loop review UI, (d) audit log UI, (e) tenant isolation dashboard? Please list what's real. This determines what copy Phase 1 can keep vs cut.

3. **Sovereign canonical live URL** — is `https://sovereign-saas-platform.vercel.app/` the correct live URL to link? Can you confirm it currently loads (even a demo/landing page)?

4. **Notice period** — the prompt states 15 days, but `portfolio-data.ts:15` says `'1 month notice'`. Which is correct for all pages, resume, Naukri?

5. **Resume PDF** — a new compiled PDF needs to be supplied at Phase 1 to set up the new path `/resume/Rajendra_Bist_Full_Stack_Developer.pdf`. If you can't supply it now, the old path will stay and a TODO(human) note will be added. Ready?

---

## 10. Acceptance

- [x] `docs/AUDIT.md` created with baseline scores, ticket confirmations, risk list, and ≤5 open questions
- [x] No source files modified
- [x] Lighthouse baseline recorded (from `.lighthouseci/` CI run)
- [x] All 24 tickets (A1–A9, B1–B9, C1–C5) confirmed or refuted with file + line reference
- [x] Unverifiable claims listed with disposal recommendation
- [x] C3 presence checklist completed

---

**Waiting for APPROVED PHASE 0**
