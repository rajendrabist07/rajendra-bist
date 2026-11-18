# Reference Notes — Peer Portfolio Study

> **Purpose:** A written study of 8 screenshots of a peer developer's portfolio.
> Use for **principles and interaction patterns only**. Never copy code, CSS, markup, copy,
> icons, images, proportions or palette. Never mention the peer on the site.
> If screenshot files are added later to `docs/reference/`, they take precedence over these notes.
>
> _Saved from owner instruction on 2026-11-18. Approximate values estimated from images._

---

## Global Look

- Near-black background (~`#0A0A0A`), slightly lighter surfaces (~`#111`–`#141414`)
- One orange accent (~`#E97D37`)
- Green tint used **only** for "available" status indicator
- White headings, mid-grey body text, very dim tertiary text
- Faint grid lines and sparse star-like dots in background
- Headings: bold geometric grotesque (looks like Space Grotesk, distinctive curved-tail "y")
- Body: same family; monospace with syntax colours (orange keys, yellow strings)
- Large body text, generous line height; consistent rounded corners

---

## ref-01 — Hero

- **Top bar:** "SK." logo mark with an orange dot, uppercase nav (ABOUT, SKILLS, PROJECTS, CONTACT, BLOG), outlined orange "Download CV" button, moon icon for theme toggle
- **Content:**
  - Green pill with dot: "Open to work, available immediately"
  - Huge two-line uppercase name — **last letters are orange**
  - Orange typed role line "AI Backend Engineer" with blinking caret
  - Short grey paragraph
  - One filled orange primary button + one outlined secondary button
  - Row of dim social icons
- **Right side:** Circular photo with an orange ring glow + orange outlined speech bubble with tagline
- Bottom centre: "SCROLL" cue with arrow
- Fixed bottom-right: floating circular avatar chat button

## ref-02 — About

- Small orange uppercase eyebrow, bold H2 "Who I Am"
- **Left:** Four paragraphs of large grey text
- **Right:** Code window with three coloured dots in header; syntax-highlighted TypeScript object: `role`, `location`, `timezone`, `open`, `focus`, `learning`

## ref-03 — Experience

- Vertical line with orange dots; orange date pill per entry
- Company in white, role in grey, location in dim grey
- Bullets start with an em dash
- "Stack:" label in orange, dim list
- ⚠️ Dim tertiary text has low contrast (weakness to avoid)

## ref-04 — Project

- Orange eyebrow "SOLO PROJECT · 2026", very large bold title, grey subtitle
- Bullets with orange dots; short orange label
- Grid of three stat tiles (large orange number, dim label) — **one tile orphaned on second row** (weakness)
- Dark grey tech chips
- Filled orange "Live Demo" button
- **Right:** Terminal-style window with ASCII request-flow diagram, orange bold component names, blinking block cursor

## ref-05 — Education

- Two-column grid of rounded cards: title in white, issuer in grey, orange date pill, outlined "Check certification" button
- **Last row: one card alone (orphan)** (weakness to avoid)

## ref-06 — Open Source

- One wide card: orange eyebrow "NPM PACKAGE", title, subtitle, four bullets, three chips, filled orange "View on npm" button

## ref-07 — Contact & Footer

- Centered H2 "Open to the right opportunity", subline, green availability pill
- **Left:** Form card with labels, dark inputs, full-width orange button
- **Right:** Stack of link cards with icon tiles (email, LinkedIn, GitHub) + orange "Download Resume" button
- **Footer** (3 cols): brand + short bio + availability | Explore links | contact + five social icons
- Joke line in bottom bar ⚠️ (weakness — undercuts credibility)

## ref-08 — Stack

- Eyebrow "TECH STACK", H2 "Technical Arsenal"
- Wrapping pills: real full-colour brand logo + name
- Small tinted badges ("BASICS", "LEARNING") on top edge of some pills

---

## Principles Worth Adopting (in our own visual language)

| # | Principle | Why it works |
|---|---|---|
| 1 | One accent colour, strong type hierarchy, generous spacing | Scannable, premium feel |
| 2 | Typed role line that settles (not endless loop) | Signals "engineer", accessible |
| 3 | Availability stated in first viewport | Answers recruiter's first question |
| 4 | Identity facts as scannable typed object | Fast scan of key facts |
| 5 | Chronology as a vertical timeline | Context at a glance |
| 6 | Architecture shown immediately, not hidden | Shows system thinking |
| 7 | Real logos and honest skill levels | Verifiable trust |
| 8 | Verifiable credentials with links; one clear contact CTA | Proof density |

## Weaknesses to Avoid

- Dim tertiary text that fails WCAG contrast
- Orphan cells in stat and credential grids
- Unsourced statistics
- Claims like "used by real clients" without evidence
- Joke footers
- Accent colour on **part** of the name
- Particle starfield background
- Same orange-on-near-black identity (our site must look clearly distinct)
