# HUMAN-TODO

Manual actions and optional owner inputs. These cannot be automated.

## Portrait Image Source

- [ ] Current portrait `public/images/Rajendra-Bist.png` source resolution is **700×932 px** (flagged as below recommended 1200×1500 px).
- [x] Generated 4:5 derivatives (`public/images/rajendra-bist-portrait.webp` at 28 KB, `rajendra-bist-portrait.avif` at 31 KB) without artificial upscaling.
- [ ] *(Optional)*: Provide an uncompressed portrait photo at ≥ 1200×1500 px in `owner-inputs/` if higher crispness on 4K/retina displays is desired.

## Optional Authenticated Case Study Screenshots (Phase 4)

- [ ] Take 3 screenshots while logged in (ensure zero personal data/tokens are visible):
  - Sovereign: Approvals queue / execution status
  - DevGuard AI: Dashboard showing active PR review execution
  - Chronicle: Writer workspace / rich editor
- [ ] Place them in `owner-inputs/screens/<project>/`.

## Live Profile Alignment

- [ ] **Resume:** `public/resume/Rajendra_Bist_Full_Stack_Developer.pdf` is active.
- [ ] **Naukri Profile:** Confirm core projects (Sovereign, Chronicle, DevGuard AI); set React version to React 18.3.
- [ ] **LinkedIn & GitHub:** Set website URL to `https://www.bistrajendra.com.np`.

## Google Search Console & Sitemaps

- [ ] Verify `bistrajendra.com.np` in Google Search Console.
- [ ] Submit sitemap: `https://www.bistrajendra.com.np/sitemap.xml`. (Note: `/dev/design` is excluded from sitemap and tagged `noindex, nofollow`).

## Case Study Problem Statements (Needs Owner Confirmation)

- [ ] **Sovereign**: Confirm problem statement: "Multi-tenant AI agent platforms require strict tenant isolation and durable execution to prevent cross-tenant data exposure and lost execution state during background runs."
- [ ] **DevGuard AI**: Confirm problem statement: "Automated code review relying solely on single-shot LLM prompts on raw diffs produces unverified comments. Collecting deterministic static analysis, AST linting, and dependency vulnerability scans prior to inference grounds findings in concrete repository evidence."
- [ ] **Chronicle**: Confirm problem statement: "Technical publishing platforms require verified accounts, abuse resistance, schema-validated AI tooling, and server-rendered public pages to maintain editorial trust and search visibility."
