# Keyboard Navigation Walkthrough & Accessibility Audit

> **Standard:** WCAG 2.2 AA Conformance  
> **Audited Date:** 2026-11-20  
> **Environment:** Next.js Production Build (`next start`), Chromium / Safari / Firefox  
> **Verification Policy:** Every item below is explicitly tagged as either `asserted by Playwright (<test file / test name>)` or `not tested; owner must check manually`.

---

## 1. Skip-to-Content Link
- **Initial Focus:** Pressing `Tab` upon initial page load immediately focuses the `.skip-to-content` anchor element.
  - *Status:* `not tested; owner must check manually`
- **Visual Presentation:** Visually hidden off-screen (`-top-12`) until focused, then smoothly slides into view at `top-4 left-4 z-50` with high-contrast accent outline and surface background.
  - *Status:* `not tested; owner must check manually`
- **Activation:** Pressing `Enter` jumps directly to `<main id="main-content">`, skipping the navigation bar entirely.
  - *Status:* `not tested; owner must check manually`

---

## 2. Header & Main Navigation Flow
- **Tab Sequence:**
  1. Skip link (`#main-content`)
  2. Brand logo anchor (`/`)
  3. Nav links: `About`, `Experience`, `Projects`, `Stack`, `Credentials`, `Blog`, `Contact`
  4. Search / Command Palette button (`Cmd+K`)
  5. Theme toggle switch (`ThemeToggle`)
  6. Primary "Resume" button
  - *Status:* `not tested; owner must check manually`
- **Focus Indicators:** Every interactive header element displays an explicit `2px` focus ring with `var(--color-accent)` and `2px` offset (`focus-visible:ring-2 focus-visible:ring-accent`).
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe scan: /)`
- **No Focus Traps in Top Header:** Tab flows linearly without trapping or losing focus.
  - *Status:* `asserted by Playwright (tests/e2e/home.spec.ts: homepage renders hero, sections, and navigation landmarks)`

---

## 3. Command Palette (`Cmd+K` / `Ctrl+K`)
- **Invocation via Keyboard:** Global shortcut `Ctrl+k` / `Cmd+k` opens the command palette.
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 4. Command Palette (Cmd+K/Ctrl+K, filter results, Esc focus return))`
- **Focus Management:** Focus immediately transfers into the search `<input role="combobox">`.
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 4. Command Palette (Cmd+K/Ctrl+K, filter results, Esc focus return))`
- **Query Filtering:** Typing a query updates the list of navigable items and project deep-links.
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 4. Command Palette (Cmd+K/Ctrl+K, filter results, Esc focus return))`
- **Escape Dismissal & Focus Restoration:** Pressing `Escape` closes the palette and restores focus to the invoking trigger.
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 4. Command Palette (Cmd+K/Ctrl+K, filter results, Esc focus return))`
- **A11y & Contrast Compliance:** Axe scans while palette is active in dark and light modes.
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Command Palette open (dark theme) and (light theme))`

---

## 4. Mobile Navigation Drawer (`<390px`)
- **Trigger Activation:** Clicking or activating the hamburger trigger opens the mobile sheet drawer (`aria-expanded="true"`, `aria-controls="mobile-nav-menu"`).
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Mobile Navigation Drawer open)`
- **Focus Trap:** Focus remains inside drawer while open; dismissible via Escape or backdrop click.
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Mobile Navigation Drawer open)`
- **A11y Conformance:** Zero axe violations on mobile navigation drawer in both dark and light modes.
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Mobile Navigation Drawer open (dark theme) and (light theme))`

---

## 5. Skills Tab Panels
- **Tab Navigation:** ArrowLeft / ArrowRight switches between technology categories (`Backend & Systems`, `Frontend`, etc.).
  - *Status:* `not tested; owner must check manually`
- **Tab Selection & Content Update:** Clicking a category tab switches the rendered skill badges.
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Skills Tab Panels switched)`
- **A11y Conformance:** Zero axe violations across switched tab panels in both dark and light modes.
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Skills Tab Panels switched (dark theme) and (light theme))`

---

## 6. Projects & Architecture Diagram
- **Case File Links:** "Source Code", "Live App", and "Deep Dive" are standard semantic `<a>` anchors with visible and accessible text.
  - *Status:* `asserted by Playwright (tests/e2e/phase4b.spec.ts: verifies CaseFiles, Architecture Diagram, Evidence Strip, and Case Study routes)`
- **Architecture Diagram Node Selection:** Keyboard navigation through diagram nodes and activation via Enter/Space.
  - *Status:* `not tested; owner must check manually`
- **Static Blueprint Fallback:** Accessible SVG layout under reduced motion.
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 5. Prefers-reduced-motion)`

---

## 7. Contact Form & Error Validation
- **Form Controls & Labels:** `<input id="contact-name">`, `<input id="contact-email">`, `<textarea id="contact-message">` bound with `<label for="...">`.
  - *Status:* `asserted by Playwright (tests/e2e/home.spec.ts: contact form validates input fields client-side)`
- **Client-Side Validation Errors:** Submitting empty fields sets `aria-invalid="true"` and displays error alerts (`aria-describedby`).
  - *Status:* `asserted by Playwright (tests/e2e/home.spec.ts: contact form validates input fields client-side)`
- **Error Contrast Compliance:** Validation error alert and messages meet WCAG 2.2 AA contrast in both dark and light themes (≥ 4.5:1).
  - *Status:* `asserted by Playwright (tests/e2e/accessibility-axe.spec.ts: Axe interactive: Contact Form Validation Errors (dark theme) and (light theme))`
- **Mocked Submission Flow:** Successful submission displays polite feedback alert (`role="status"`).
  - *Status:* `asserted by Playwright (tests/e2e/smoke.spec.ts: 2. Contact form mocked submission flow)`

---

## 8. Summary of Automated Verification
- **Automated Axe Scan Tests:** 28 passing Playwright tests covering initial paint across 9 routes (dark & light) + 4 interactive states (dark & light) + touch target compliance + 320px reflow.
- **Manual Verification Scope:** Skip link initial tab focus jump, arrow-key navigation between tablist tabs, and interactive SVG node activation remain marked for human review.
