# Design Plan: Rajendra Bist "Own Identity" Rebuild
**Phase 2 — Step 2.0 (Design Plan & Specification)**
*Branch: `redesign/v4` · Target Domain: `bistrajendra.com.np` · Date: November 2026*

---

## 1. Executive Summary & Direction Selection

This design plan establishes a distinct, authentic, and defensible visual identity for Rajendra Bist's portfolio. It transitions the site away from the undifferentiated dark-glass aesthetic prevalent across AI portfolio templates and moves to a purpose-built identity grounded in Rajendra's actual work: **backend architecture, distributed systems, PostgreSQL schema design, and production reliability.**

### Direction Decision Matrix

| Dimension | Direction A: "Blueprint" (Recommended & Selected) | Direction B: "Quiet Graphite" (Alternative) |
|---|---|---|
| **Metaphor** | Architectural blueprint, CAD engineering schematic, technical drafting paper | Monolithic minimalist terminal, Apple pro developer tool |
| **Dominant Tone** | Deep Ink Navy (`#0B1220`) & Drafting Grid; warm off-white in light mode (`#F4F7FB`) | Neutral Charcoal/Graphite (`#0E0F11`); neutral light gray (`#F5F5F7`) |
| **Accent Hue** | Electric Cyan (`#38D0F0`) / Deep Sky (`#0369A1`) | Electric Sapphire Blue (`#2997FF`) / Sapphire Dark (`#0062CC`) |
| **Visual Markers** | Architectural corner crop marks, technical dimension lines, monospace coordinate badges, real circuit/flow lines | Borderless cards, soft ambient dropshadows, subdued gray typography |
| **WCAG 2.2 Compliance** | **100% Pass** on all 4 dark & light surfaces for body ($\ge 4.5:1$) and UI ($\ge 3:1$) | Fails AA body on surface 3 in light mode (3.81:1 accent, 4.27:1 status) |
| **Owner Alignment** | **Selected by owner (Q3 Answer: "Direction A Blueprint is preferred")** | Documented as secondary fall-back |

---

## 2. Color Palettes & Semantic Tokens

### Direction A: "Blueprint" (Primary)

#### Dark Mode ("Deep Ink Navy")
*Designed to feel like an engineer's high-contrast schematic monitor.*

- **Page Background (`--bg-page`):** `#0B1220` (Deep oceanic ink navy)
- **Surface Level 1 (`--bg-surface-1`):** `#101A2E` (Base card surface)
- **Surface Level 2 (`--bg-surface-2`):** `#16233B` (Elevated card / modal)
- **Surface Level 3 (`--bg-surface-3`):** `#1D2D49` (Interactive input / code callout)
- **Border Hairline (`--border-hairline`):** `rgba(148, 178, 255, 0.14)` (Subtle technical blueprint grid boundary)
- **Border Strong (`--border-strong`):** `rgba(148, 178, 255, 0.28)` (Focus ring & active borders)
- **Text Primary (`--text-primary`):** `#E8EEFB` (Ultra-crisp technical white-blue)
- **Text Secondary (`--text-secondary`):** `#A9B6D3` (Legible secondary slate)
- **Text Tertiary (`--text-tertiary`):** `#8A98B8` (Metadata, coordinate annotations)
- **Accent Primary (`--accent`):** `#38D0F0` (Blueprint drafting cyan)
- **Accent Dim (`--accent-dim`):** `rgba(56, 208, 240, 0.12)` (Badge & active pill backgrounds)
- **Accent Ink (`--accent-ink`):** `#051A24` (Text placed inside solid cyan badges/buttons)
- **Status Live (`--status-live`):** `#3DDC97` (Verified production green)
- **Grid Lines (`--grid-line`):** `rgba(148, 178, 255, 0.05)` (24px drafting grid)
- **Grid Major Lines (`--grid-major`):** `rgba(148, 178, 255, 0.10)` (96px major boundary lines)

#### Light Mode ("Drafting Paper")
*Designed to evoke physical engineering graph paper and plotted schematics.*

- **Page Background (`--bg-page`):** `#F4F7FB` (Crisp drafting paper)
- **Surface Level 1 (`--bg-surface-1`):** `#FFFFFF` (Pure white card surface)
- **Surface Level 2 (`--bg-surface-2`):** `#EAF0F8` (Recessed well / card highlight)
- **Surface Level 3 (`--bg-surface-3`):** `#DCE5F2` (Code snippet container)
- **Border Hairline (`--border-hairline`):** `rgba(15, 34, 64, 0.12)` (Pencil hairline border)
- **Border Strong (`--border-strong`):** `rgba(15, 34, 64, 0.25)` (Crisp technical stroke)
- **Text Primary (`--text-primary`):** `#0B1220` (Dense blueprint ink)
- **Text Secondary (`--text-secondary`):** `#334155` (Slate engineering graphite)
- **Text Tertiary (`--text-tertiary`):** `#475569` (Dimension note gray)
- **Accent Primary (`--accent`):** `#0369A1` (Deep sky blue blueprint ink)
- **Accent Dim (`--accent-dim`):** `rgba(3, 105, 161, 0.10)`
- **Accent Ink (`--accent-ink`):** `#FFFFFF`
- **Status Live (`--status-live`):** `#065F46` (Forest emerald status marker)
- **Grid Lines (`--grid-line`):** `rgba(15, 34, 64, 0.04)`
- **Grid Major Lines (`--grid-major`):** `rgba(15, 34, 64, 0.08)`

---

## 3. WCAG 2.2 Contrast Verification Matrix

Calculated via exact relative luminance formulas ($L = 0.2126R + 0.7152G + 0.0722B$) using `docs/design-plan/compute-contrast.mjs`.

### Direction A: Blueprint (Dark Mode) — All Pass ✅
| Text Token | Text Hex | Surface | Surface Hex | Contrast Ratio | WCAG AA Body ($\ge 4.5:1$) | WCAG AA Large/UI ($\ge 3:1$) |
|---|---|---|---|---|---|---|
| `text-primary` | `#E8EEFB` | `page` | `#0B1220` | **16.10:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#E8EEFB` | `surface-1` | `#101A2E` | **14.93:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#E8EEFB` | `surface-2` | `#16233B` | **13.50:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#E8EEFB` | `surface-3` | `#1D2D49` | **11.85:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#A9B6D3` | `page` | `#0B1220` | **9.20:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#A9B6D3` | `surface-1` | `#101A2E` | **8.53:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#A9B6D3` | `surface-2` | `#16233B` | **7.71:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#A9B6D3` | `surface-3` | `#1D2D49` | **6.77:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#8A98B8` | `page` | `#0B1220` | **6.48:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#8A98B8` | `surface-1` | `#101A2E` | **6.01:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#8A98B8` | `surface-2` | `#16233B` | **5.43:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#8A98B8` | `surface-3` | `#1D2D49` | **4.77:1** | ✅ PASS | ✅ PASS |
| `accent` | `#38D0F0` | `page` | `#0B1220` | **10.21:1** | ✅ PASS | ✅ PASS |
| `accent` | `#38D0F0` | `surface-1` | `#101A2E` | **9.47:1** | ✅ PASS | ✅ PASS |
| `accent` | `#38D0F0` | `surface-2` | `#16233B` | **8.56:1** | ✅ PASS | ✅ PASS |
| `accent` | `#38D0F0` | `surface-3` | `#1D2D49` | **7.51:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#3DDC97` | `page` | `#0B1220` | **10.59:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#3DDC97` | `surface-1` | `#101A2E` | **9.83:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#3DDC97` | `surface-2` | `#16233B` | **8.88:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#3DDC97` | `surface-3` | `#1D2D49` | **7.80:1** | ✅ PASS | ✅ PASS |
| `accent-ink` | `#051A24` | `accent (button)` | `#38D0F0` | **9.70:1** | ✅ PASS | ✅ PASS |
| `border-ui` | `#5B79AD` | `page` | `#0B1220` | **4.26:1** | — (UI) | ✅ PASS |
| `border-ui` | `#5B79AD` | `surface-1` | `#101A2E` | **3.96:1** | — (UI) | ✅ PASS |
| `border-ui` | `#5B79AD` | `surface-2` | `#16233B` | **3.58:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#38D0F0` | `page` | `#0B1220` | **10.21:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#38D0F0` | `surface-1` | `#101A2E` | **9.47:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#38D0F0` | `surface-2` | `#16233B` | **8.56:1** | — (UI) | ✅ PASS |

### Direction A: Blueprint (Light Mode) — All Pass ✅
| Text Token | Text Hex | Surface | Surface Hex | Contrast Ratio | WCAG AA Body ($\ge 4.5:1$) | WCAG AA Large/UI ($\ge 3:1$) |
|---|---|---|---|---|---|---|
| `text-primary` | `#0B1220` | `page` | `#F4F7FB` | **17.42:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#0B1220` | `surface-1` | `#FFFFFF` | **18.72:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#0B1220` | `surface-2` | `#EAF0F8` | **16.33:1** | ✅ PASS | ✅ PASS |
| `text-primary` | `#0B1220` | `surface-3` | `#DCE5F2` | **14.74:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#334155` | `page` | `#F4F7FB` | **9.64:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#334155` | `surface-1` | `#FFFFFF` | **10.35:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#334155` | `surface-2` | `#EAF0F8` | **9.03:1** | ✅ PASS | ✅ PASS |
| `text-secondary` | `#334155` | `surface-3` | `#DCE5F2` | **8.15:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#475569` | `page` | `#F4F7FB` | **7.05:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#475569` | `surface-1` | `#FFFFFF` | **7.58:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#475569` | `surface-2` | `#EAF0F8` | **6.61:1** | ✅ PASS | ✅ PASS |
| `text-tertiary` | `#475569` | `surface-3` | `#DCE5F2` | **5.97:1** | ✅ PASS | ✅ PASS |
| `accent` | `#0369A1` | `page` | `#F4F7FB` | **5.52:1** | ✅ PASS | ✅ PASS |
| `accent` | `#0369A1` | `surface-1` | `#FFFFFF` | **5.93:1** | ✅ PASS | ✅ PASS |
| `accent` | `#0369A1` | `surface-2` | `#EAF0F8` | **5.18:1** | ✅ PASS | ✅ PASS |
| `accent` | `#0369A1` | `surface-3` | `#DCE5F2` | **4.67:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#065F46` | `page` | `#F4F7FB` | **7.15:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#065F46` | `surface-1` | `#FFFFFF` | **7.68:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#065F46` | `surface-2` | `#EAF0F8` | **6.70:1** | ✅ PASS | ✅ PASS |
| `status-live` | `#065F46` | `surface-3` | `#DCE5F2` | **6.05:1** | ✅ PASS | ✅ PASS |
| `accent-ink` | `#FFFFFF` | `accent (button)` | `#0369A1` | **5.93:1** | ✅ PASS | ✅ PASS |
| `border-ui` | `#64748B` | `page` | `#F4F7FB` | **4.43:1** | — (UI) | ✅ PASS |
| `border-ui` | `#64748B` | `surface-1` | `#FFFFFF` | **4.76:1** | — (UI) | ✅ PASS |
| `border-ui` | `#64748B` | `surface-2` | `#EAF0F8` | **4.15:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#0369A1` | `page` | `#F4F7FB` | **5.52:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#0369A1` | `surface-1` | `#FFFFFF` | **5.93:1** | — (UI) | ✅ PASS |
| `focus-ring` | `#0369A1` | `surface-2` | `#EAF0F8` | **5.18:1** | — (UI) | ✅ PASS |

---

## 4. Typography Scale & Structural Hierarchy

### Typefaces
- **Primary Display & Headings:** `Space Grotesk` (Weights: 500 Medium, 600 SemiBold, 700 Bold). Geometric, clean, architectural clarity.
- **Body & Prose:** System Proportional Stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Zero latency, instant render, rock-solid legibility.
- **Technical Badges, Schema, Evidence, Metrics:** `JetBrains Mono` / `ui-monospace` (Weights: 400 Regular, 500 Medium, 700 Bold). Distinct figures, slashed zero, clear disambiguation (`0` vs `O`, `1` vs `l`).

### Fluid Clamp Scale
| Token | CSS Definition | Desktop Equiv (1440px) | Mobile Equiv (390px) | Line Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| `display-hero` | `clamp(2.5rem, 6vw, 4.2rem)` | 67.2px | 40px | 1.05 | `-0.035em` | Hero Title ("Rajendra Bist") |
| `h1` | `clamp(2.0rem, 4vw, 2.75rem)` | 44px | 32px | 1.15 | `-0.025em` | Section Titles ("Production Systems") |
| `h2` | `clamp(1.35rem, 2.5vw, 1.75rem)` | 28px | 21.6px | 1.25 | `-0.015em` | Project & Experience Case Headers |
| `h3` | `clamp(1.1rem, 1.8vw, 1.25rem)` | 20px | 17.6px | 1.35 | `-0.01em` | Architecture Node Titles |
| `body-lead` | `clamp(1.0rem, 1.4vw, 1.125rem)` | 18px | 16px | 1.6 | `normal` | Hero intro, Section lead descriptions |
| `body` | `clamp(0.9375rem, 1.1vw, 1.0rem)` | 16px | 15px | 1.6 | `normal` | Main body prose (max measure: `68ch`) |
| `mono-data` | `clamp(0.8125rem, 1.0vw, 0.875rem)` | 14px | 13px | 1.4 | `0.02em` | Code metrics, API signatures |
| `mono-micro` | `0.75rem` (12px) | 12px | 12px | 1.2 | `0.05em` | Crop coordinates, timestamp tags |

### Reading Measure Rule
All prose containers enforce `max-width: 68ch` to avoid typographic eye fatigue and ensure senior technical recruiters scan case studies effortlessly.

---

## 5. Spatial Grid, Radii, Borders & Elevation

### 8px Engineering Grid
- Micro steps: `4px` (0.5u), `8px` (1u), `12px` (1.5u), `16px` (2u), `24px` (3u), `32px` (4u), `48px` (6u), `64px` (8u), `96px` (12u).
- Container maximum: `1200px` centered with fluid gutter padding (`clamp(16px, 4vw, 32px)`).

### Radius Hierarchy
Unlike rounded generic templates with `rounded-3xl` (24px-32px everywhere), Direction A adopts disciplined, precision radii:
- **`radius-control` (6px - 8px):** Buttons, inputs, search triggers, code chips.
- **`radius-card` (12px - 14px):** Project cards, timeline item cards, architecture containers.
- **`radius-feature` (18px):** Outer hero viewport container.
- **`radius-pill` (9999px):** Status chips, live badges (`Deployed`, `Available`).

### Borders & Hairline Rules
- Hairline borders: `1px solid var(--border-hairline)`.
- Interactive hover: `1px solid var(--border-strong)` with subtle inner glow `0 0 16px var(--accent-dim)`.
- **Zero heavy shadows:** In engineering blueprints, depth is shown by crisp layering and contrast rather than blurry black dropshadows.

---

## 6. Motion Tokens & Physics

Strictly adheres to performance and respect for accessibility:
- **Duration Micro:** `120ms` (hover, active press).
- **Duration Standard:** `220ms` (accordion open, tab switch).
- **Duration Flow:** `450ms` (SVG architecture connection trace animation).
- **Easing Curve:** `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out, mechanical precision).
- **Spring Configuration:** `stiffness: 380, damping: 28` (for drawer / command palette modals).
- **SVG Line Drawing Motif:** `stroke-dasharray`, `stroke-dashoffset` animation that simulates a CAD plotter drawing the data pipeline on scroll into view.
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 7. Component Inventory & Anatomy

### 1. Viewfinder Portrait with Engineering Crop Marks (`CropMarks`)
- Replaces standard rounded avatar circle.
- Rectangular portrait (`400px` height) framed by 4 precision L-bracket crop marks at corners.
- Coordinates badge overlaid at bottom right: `28°36'N · 77°12'E | IST (UTC+5:30)`.
- Real headshot image: `public/images/Rajendra-Bist.png` with crisp framing.

### 2. Dimension Line (`DimensionLine`)
- Visual horizontal or vertical separator with endpoint crossbars and centered coordinate label.
- Used between sections to visually anchor structure: `|---- 1200px SYSTEM BOUNDARY ----|`.

### 3. Architecture Node (`ArchNode`)
- Blueprint node box representing a verified service (e.g., `Next.js 15 Web App`, `Express REST API`, `PostgreSQL (Neon) + RLS`, `Inngest Durable Engine`).
- Includes port/protocol badge, status dot (`HEALTH 200 OK`), and verified metrics chip.

### 4. Technical Annotation (`AnnotationChip`)
- Monospace uppercase tag with hairline border: `[SPEC // SEC.01]`, `[PRISMA RLS POLICIES: 4]`, `[CI DURATION: 42s]`.

---

## 8. ASCII Wireframes

### Desktop View (1440px)
```text
+--------------------------------------------------------------------------------------------------+
| [R.BIST // SYS.2026]           (•) AVAILABLE IMMEDIATELY      [Projects] [Architecture] [Contact]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [SPEC // 01 · IDENTITY]                                                                          |
|                                                                                                  |
| RAJENDRA BIST                                     +--[VIEWFINDER]------------------------------+ |
| Full-Stack Developer & Backend Engineer           | +--                                    --+ | |
|                                                   | |                                        | | |
| Backend-focused developer who designs and ships   | |      [ RAJENDRA BIST REAL PORTRAIT ]   | | |
| production web applications end to end: schema    | |      (public/images/Rajendra-Bist.png) | | |
| design, PostgreSQL RLS, REST APIs, and CI.        | |                                        | | |
|                                                   | +--                                    --+ | |
| [New Delhi, India] [Available Immediately]        | [28°36'N · 77°12'E] [NEW DELHI · IST]      | |
|                                                   +--------------------------------------------+ |
| [ > Explore System Case Files ]  [ Download Technical Resume (PDF) ]                             |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| |-- 1200px VERIFIED PRODUCTION CASE FILES ---------------------------------------------------| |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| CASE FILE #01: CHRONICLE                                              [DEVOPS // CI PASS]        |
| Two-Service Publishing Platform & Schema-Validated AI Tooling          (Next.js 15 + Express 4)  |
|                                                                                                  |
| +--[INTERACTIVE ARCHITECTURE SCHEMATIC]--------------------------------------------------------+ |
| | [ Client Browser ]                                                                           | |
| |         |                                                                                    | |
| |         v (HTTPS / ISR)                                                                      | |
| |   [ Next.js 15 (Vercel) ] <===== (REST API / JWT) =====> [ Express API (Render) ]            | |
| |                                                                    |                         | |
| |                                                      +-------------+-------------+           | |
| |                                                      v                           v           | |
| |                                            [ PostgreSQL (Prisma) ]     [ Gemini 2.5 AI SDK ] | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| Key Metrics: [48 Automated Vitest Suites] [2 Deployed Services] [Zero Free-Tier Sleep Latency]   |
| [ Explore Live Platform -> ]  [ Inspect GitHub Repository -> ]                                   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| CASE FILE #02: SOVEREIGN (MULTI-TENANT B2B SAAS)                      [RLS // SEC-VERIFIED]      |
| Isolated Workspace Engine with PostgreSQL Row-Level Security                                     |
| Verified Code: `20261002111243_enable_rls/migration.sql` (FORCE ROW LEVEL SECURITY)             |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| TECHNICAL TIMELINE: DUAL-LANE (ENGINEERING WORK + SYSTEMS SHIPPED)                               |
| [2025 - PRESENT] Independent Full-Stack Engineer   ===> Shipped Chronicle, DevGuard AI, Sovereign|
| [2024] Full-Stack Apprenticeship & Research        ===> Mastered PostgreSQL, Inngest, Next.js   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| CONTACT HUB: DIRECT TERMINAL                                                                     |
| Email: rajendrabist396@gmail.com · Phone: +91 8700918036 · LinkedIn · GitHub                     |
+--------------------------------------------------------------------------------------------------+
```

### Mobile View (390px)
```text
+---------------------------------------+
| [R.BIST]          (•) AVAILABLE  [ = ]|
+---------------------------------------+
|                                       |
| [SPEC // 01 · IDENTITY]               |
| RAJENDRA BIST                         |
| Backend & Full-Stack Engineer         |
|                                       |
| +--[VIEWFINDER]---------------------+ |
| | +--                             --+ |
| |   [ RAJENDRA BIST PORTRAIT ]        |
| | +--                             --+ |
| | [NEW DELHI · IST]                   |
| +-----------------------------------+ |
|                                       |
| Backend-focused developer who designs |
| and ships complete web applications   |
| end to end.                           |
|                                       |
| [ > Explore System Case Files ]       |
| [ Download Resume (PDF) ]             |
|                                       |
+---------------------------------------+
| CASE FILE #01: CHRONICLE              |
| Two-Service Publishing Platform       |
|                                       |
| [Client] -> [Next.js] -> [Express API]|
|             -> [PostgreSQL]           |
|                                       |
| Key Metrics:                          |
| • 48 Vitest suites                    |
| • 2 Deployed services                 |
| [Live Demo]  [GitHub]                 |
+---------------------------------------+
```

---

## 9. Background Subsystem Specification

### Zero-Overhead CSS Drafting Grid
Unlike heavy WebGL or Canvas background libraries that trigger continuous GPU redraws and drain battery, Direction A uses pure CSS background gradients:
```css
.blueprint-bg {
  background-color: var(--bg-page);
  background-image: 
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(var(--grid-major) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-major) 1px, transparent 1px);
  background-size: 24px 24px, 24px 24px, 96px 96px, 96px 96px;
  background-position: -1px -1px;
}
```
- **Performance:** 0 CPU cycles at rest, 60fps / 120fps smooth scrolling.
- **Radial Lighting:** A fixed CSS radial vignette softens the grid edges towards the screen periphery (`radial-gradient(ellipse at 50% 0%, transparent 60%, var(--bg-page) 100%)`).

---

## 10. Signature Interactive Element

### Interactive Architecture Flowchart
For each project case file (Chronicle, Sovereign, DevGuard AI):
- A live interactive SVG architecture diagram that plots data flow on hover or tap.
- Clicking an architectural block (e.g., `PostgreSQL + RLS`) highlights the corresponding schema snippet, migration file link, and security guarantee.
- **Trace Lines:** Animated cyan dashes indicate request flow from Client -> Edge Gateway -> Service API -> Database.

---

## 11. Generic-AI-Tell Audit & Elimination

| Generic AI Template Symptom | Root Cause | Blueprint Solution |
|---|---|---|
| Purple/violet cosmic gradient backgrounds (`#7928CA` / `#FF0080`) | Default AI aesthetic ("vibe coding") | Replaced with strict Oceanic Navy (`#0B1220`) & Drafting Cyan (`#38D0F0`). |
| Circular gradient avatar glow | Default UI kits | Replaced with rectangular engineering Viewfinder and corner crop marks. |
| Vague marketing claims ("Crafting beautiful digital experiences") | Empty LLM copywriting | Replaced with verified engineering facts: table names, migration files, test counts, CI status. |
| Frosted glassmorphism overload (`backdrop-blur-xl` on every card) | Template trend | Replaced with solid engineering blueprint surfaces (`#101A2E`, `#16233B`) and hairline borders. |
| Inaccessible low-contrast secondary text | Untested color selection | 100% verified $\ge 4.5:1$ contrast across all dark and light surfaces. |
| Fake statistics ("99.9% satisfaction", "10k users") | Fabricated portfolio numbers | Strictly audited live metrics (e.g., 48 Vitest suites, 4 RLS policies, 2 live deployed services). |

---

## 12. Distinctness Review & Verification Against Reference Notes

### Comparison vs. `REFERENCE-NOTES.md`
- **Reference #1 (Hero):** Reference uses standard left-aligned text with floating social links. Rebuild integrates the **Engineering Identity Block** with real-time coordinate badge and crop marks.
- **Reference #2 (Projects):** Reference uses simple image cards. Rebuild introduces **Interactive Case Files with live system schematics** and direct code audit links.
- **Reference #3 (Timeline):** Reference uses single-column dots. Rebuild provides a **Dual-Lane Timeline** mapping personal engineering progression alongside shipped system milestones.
- **Reference #4 (Contact):** Reference uses basic inputs. Rebuild implements a **Direct Technical Dispatch Hub** with instant clipboard actions and verified PGP/email signatures.

---

## 13. Owner Decision & Approval Gate

### Confirmed Direction: Direction A ("Blueprint")
- Both mockups rendered and validated in `docs/design-plan/mockups/`.
- 8 high-resolution Playwright screenshots saved in `docs/design-plan/shots/`:
  - `direction-a-dark-desktop.png`
  - `direction-a-dark-mobile.png`
  - `direction-a-light-desktop.png`
  - `direction-a-light-mobile.png`
  - `direction-b-dark-desktop.png`
  - `direction-b-dark-mobile.png`
  - `direction-b-light-desktop.png`
  - `direction-b-light-mobile.png`

**Status:** Awaiting owner approval (`APPROVED PHASE 2 PLAN`) before beginning Step 2.1 (Component & Styling Implementation). Zero app code has been modified in Step 2.0.
