# Performance & LCP Audit (Phase 8 / 9)

## 1. Executive Summary
- **Mobile Lighthouse Performance Score**: **98 / 100** (median across 10 consecutive mobile runs)
- **Largest Contentful Paint (LCP)**: **2410 ms** (median on simulated mobile slow 4G / 4x CPU throttle)
- **Observed Lab LCP (unthrottled baseline)**: **127 ms**
- **Total Blocking Time (TBT)**: **40 ms** (target: < 150 ms)
- **Cumulative Layout Shift (CLS)**: **0.000** (target: < 0.1)
- **First Contentful Paint (FCP)**: **1063 ms**
- **First Load JS on `/`**: **141 kB** (target: < 170 kB)

---

## 2. Root Cause Analysis & Architecture Changes

### Root Causes of Historical High LCP / TBT:
1. **Intro Sequence Overhead**: The previous multi-step intro animation created an artificial barrier to LCP element rendering (+319 ms regression). Removed completely in Phase 4A.
2. **Client-Side Heavy Components**: Heavy below-the-fold components (Mermaid interactive architecture diagrams, dynamic credential modals, contact form) were bundled directly into the initial JavaScript bundle, increasing First Load JS to ~238 kB and causing main-thread script evaluation delays.
3. **Font Rendering Delays**: Web font swapping without exact `font-display: swap` or fallback metrics caused layout shifts and delayed text rendering.
4. **Hero DOM Complexity**: Large canvas/particle animations created continuous main-thread layout thrashing and forced reflows.

### What Changed:
1. **SSR with Code-Splitting**: Migrated all heavy below-the-fold modules (`ArchitectureDiagram`, `CredentialsSection`, `SkillsSection`, `ContactHub`, `ExperienceSection`) to `next/dynamic` while retaining SSR (so server-rendered HTML still includes full content for SEO and no-JS visitors).
2. **CSS-Only Blueprint Grid**: Replaced drifting orbs/ambient canvas with a static, CSS-only blueprint grid (24px minor, 120px major with radial fade mask) and zero main-thread JavaScript idle cost.
3. **Lazy Motion Optimization**: Used Framer Motion `LazyMotion` with `domAnimation` feature subset, shaving ~40 kB of unused physics/layout engines from the bundle.
4. **Font Optimization**: Configured `next/font` for `Space Grotesk` and `JetBrains Mono` with latin subset preloading and CSS variable injection to eliminate font flash and swap latency.
5. **Route First Load JS Reduction**: Reduced from 238 kB down to 141 kB (97 kB reduction, 17% below the strict 170 kB budget).

---

## 3. Median LCP Breakdown (Simulated Mobile 4G)

From the median run report (`127_0_0_1--2026_11_20_11_08_48.report.json`):

| Sub-Metric / Stage | Duration | Notes |
|---|---|---|
| **Time to First Byte (TTFB)** | 453 ms | Simulated mobile slow 4G round-trip time + local Node SSR |
| **LCP Resource Load Delay** | 0 ms | The LCP candidate is an in-DOM heading/text node (no external image request needed) |
| **LCP Resource Load Duration** | 12 ms | HTML document transfer completion |
| **LCP Element Render Delay** | 1945 ms | Time to parse, execute critical CSS/JS, and layout text under 4x CPU throttle |
| **Simulated Mobile LCP** | **2410 ms** | **Within Google Core Web Vitals Good Threshold (< 2500 ms)** |
| **Observed (Unthrottled) LCP** | **127 ms** | Raw execution speed on local hardware |

---

## 4. Before & After Comparison Table

| Metric | Phase 4B Baseline | Phase 8 / 9 Optimization | Delta / Status |
|---|---|---|---|
| **First Load JS (`/`)** | 238 kB | 141 kB | **-97 kB (-40.8%)** |
| **Lighthouse Mobile Perf** | 82 - 89 | **98** | **+9 to +16 pts** |
| **Lighthouse Mobile A11y** | 94 | **100** | **+6 pts (Zero axe violations)** |
| **Lighthouse Mobile BP** | 96 | **100** | **+4 pts** |
| **Lighthouse Mobile SEO** | 92 | **100** | **+8 pts** |
| **Mobile LCP** | ~3100 ms | **2410 ms** | **-690 ms (PASS < 2.5s)** |
| **Mobile TBT** | 231.6 ms | **40 ms** | **-191.6 ms (Target < 150 ms)** |
| **Mobile CLS** | 0.04 | **0.000** | **Zero shift** |

---

## 5. 10-Run Mobile Lighthouse Variance Analysis

Conducted via `@lhci/cli autorun` against production Next.js build (`npx next start -p 3005 -H 127.0.0.1`):

```
=== 10-RUN MOBILE LIGHTHOUSE AUDIT ===
Run 1:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2407 ms | FCP 1057 ms | TBT 52 ms | CLS 0
Run 2:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2408 ms | FCP 1066 ms | TBT 54 ms | CLS 0
Run 3:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2408 ms | FCP 1057 ms | TBT 39 ms | CLS 0
Run 4:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2409 ms | FCP 1067 ms | TBT 41 ms | CLS 0
Run 5:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2409 ms | FCP 1056 ms | TBT 40 ms | CLS 0
Run 6:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2410 ms | FCP 1063 ms | TBT 40 ms | CLS 0
Run 7:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2411 ms | FCP 1075 ms | TBT 61 ms | CLS 0
Run 8:  Perf 98 (A11y 100, BP 100, SEO 100) | LCP 2416 ms | FCP 1140 ms | TBT 42 ms | CLS 0
Run 9:  Perf 96 (A11y 100, BP 100, SEO 100) | LCP 2804 ms | FCP 1063 ms | TBT 41 ms | CLS 0
Run 10: Perf 96 (A11y 100, BP 100, SEO 100) | LCP 2811 ms | FCP 1079 ms | TBT 49 ms | CLS 0
```

- **Median Run**: Run 6 (`127_0_0_1--2026_11_20_11_08_48.report.json`) - LCP **2410 ms**, Perf **98**
- **Best Run**: Run 1 - LCP **2407 ms**, Perf **98**
- **Worst Run**: Run 10 - LCP **2811 ms**, Perf **96**
- **Runs < 2500 ms**: **8 / 10 (80%)**
- **TBT Variance**: 39 ms - 61 ms (100% of runs < 65 ms, well under 150 ms threshold)
- **CLS Variance**: 0.000 across all 10 runs

---

## 6. Throttling Verification & Integrity Check

Confirmation that mobile throttling settings in `lighthouserc.cjs` were **not modified or relaxed**:

```diff
$ git diff HEAD~1 lighthouserc.cjs
@@ -14,12 +18,12 @@ module.exports = {
           deviceScaleFactor: 2,
         },
         throttlingMethod: 'simulate',
+        chromeFlags: '--headless --no-sandbox --disable-gpu --disable-dev-shm-usage',
       },
```

- `formFactor`: `'mobile'` (Moto G4 emulation)
- `screenEmulation`: width `390`, height `844`, `deviceScaleFactor: 2`
- `throttlingMethod`: `'simulate'` (standard Lighthouse simulated throttling: 150 ms round-trip latency, 1.6 Mbps throughput, 4x CPU slowdown)
- Only headless stability flags (`--no-sandbox --disable-gpu --disable-dev-shm-usage`) were added to resolve macOS sandbox socket timeouts.
