# Keyboard Navigation Walkthrough & Accessibility Audit

> **Standard:** WCAG 2.2 AA Conformance  
> **Audited Date:** 2026-11-19  
> **Environment:** Next.js Production Build (`next start`), Chromium / Safari / Firefox  

---

## 1. Skip-to-Content Link
- **Initial Focus:** Pressing `Tab` upon initial page load immediately focuses the `.skip-to-content` anchor element.
- **Visual Presentation:** Visually hidden off-screen (`-top-12`) until focused, then smoothly slides into view at `top-4 left-4 z-50` with high-contrast accent outline and surface background.
- **Activation:** Pressing `Enter` jumps directly to `<main id="main-content">`, skipping the navigation bar entirely.

---

## 2. Header & Main Navigation Flow
- **Tab Sequence:**
  1. Skip link (`#main-content`)
  2. Brand logo anchor (`/`)
  3. Nav links: `About`, `Experience`, `Projects`, `Stack`, `Credentials`, `Blog`, `Contact`
  4. Search / Command Palette button (`Cmd+K`)
  5. Theme toggle switch (`ThemeToggle`)
  6. Primary "Get in Touch" contact CTA
- **Focus Indicators:** Every interactive header element displays an explicit `2px` focus ring with `var(--color-accent)` and `2px` offset (`focus-visible:ring-2 focus-visible:ring-accent`).
- **No Focus Traps:** Tab flows linearly without trapping or losing focus.

---

## 3. Command Palette (`Cmd+K` / `Ctrl+K`)
- **Invocation:** Keyboard shortcut `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux) or clicking the search button.
- **Focus Management:** Focus immediately transfers into the search `<input role="combobox">`.
- **Navigation:**
  - `ArrowDown` / `ArrowUp`: cycles through navigable results and actions.
  - `Enter`: activates the highlighted command (navigates route or executes action).
  - `Escape`: closes the palette and restores focus to the invoking trigger button.
- **Focus Trap:** Tab within the open dialog is trapped strictly inside the modal container.

---

## 4. Ask AI Chat Drawer (`Cmd+J` / Floating Trigger)
- **Invocation:** Floating button or global keybinding `Cmd+J`.
- **Focus Management:** Focus transfers directly to the question input.
- **Keyboard Actions:**
  - `Enter`: submits prompt to the assistant.
  - `Escape`: dismisses the chat drawer and returns focus to the trigger.
- **ARIA Live Regions:** Assistant responses announce streaming completions politely (`aria-live="polite"`).

---

## 5. Projects & Interactive Architecture Diagram
- **Case Files:**
  - Project cards and action links ("Live Site", "Source Code", "Deep Dive") are standard `<a>` tags with explicit accessible labels that include visible text (`aria-label="Live Site for Sovereign"`).
- **Architecture Diagram:**
  - Architecture node buttons can be focused via `Tab`.
  - Pressing `Enter` or `Space` activates the node detail inspector, updating the live parameter view.
  - No hover-only interactions; all metadata is reachable via keyboard.

---

## 6. Contact Form & Interactive Inputs
- **Inputs:**
  - `<input id="name">`, `<input id="email">`, `<textarea id="message">`.
  - All form controls have associated `<label for="...">` elements.
  - Clear error states with `aria-invalid="true"` and `aria-describedby` when validation errors occur.
- **Submission:** Submitting with `Enter` or activating the "Send Message" button (`type="submit"`).

---

## 7. Automated Axe & Reflow Verification Summary
- **Axe-core scan:** 0 violations across all 9 public routes in dark and light modes.
- **Reflow (WCAG 1.4.10):** 0 horizontal scroll at 320px viewport width and 200% zoom.
- **Touch Targets (WCAG 2.5.8):** All primary touch targets meet or exceed minimum spacing and 44x44px bounding hit areas.
