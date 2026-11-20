# SEO & Search Engine Presence Handoff Guide
> Production Reference for Rajendra Bist (`https://www.bistrajendra.com.np`)

This guide provides step-by-step instructions for establishing, claiming, and monitoring organic search and AI-engine (GEO) presence across Google, Bing, Perplexity, and ClaudeBot.

---

## 1. Google Search Console (GSC) Setup

### Step 1.1: Add & Verify Property
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose one of two verification methods:
   - **Method A (Recommended: Domain Property)**:
     - Enter `bistrajendra.com.np`.
     - Copy the provided DNS TXT record (e.g., `google-site-verification=...`).
     - Log in to your domain DNS manager and add the TXT record at the root domain (`@`).
   - **Method B (URL Prefix via Environment Variable)**:
     - Enter `https://www.bistrajendra.com.np`.
     - Select **HTML tag** verification. Copy the token inside `content="..."`.
     - In Vercel Project Settings → Environment Variables, add:
       ```bash
       GOOGLE_SITE_VERIFICATION="your-verification-token"
       ```
     - Redeploy. The root layout automatically injects `<meta name="google-site-verification" content="..." />`.

### Step 1.2: Submit Sitemap
1. In the left navigation, click **Sitemaps**.
2. Under "Add a new sitemap", enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. Confirm status changes to **Success**. The sitemap advertises all 9 canonical routes (`/`, `/projects`, 3 project case studies, `/blog`, 3 engineering notes) with verified milestone `lastModified` timestamps and excludes all internal routes (like `/dev` or draft URLs).

### Step 1.3: URL Inspection & Manual Indexing Request
To accelerate crawling, use the **URL Inspection** search bar at the top of GSC for these priority URLs:
1. `https://www.bistrajendra.com.np/` -> Click **Test Live URL** -> **Request Indexing**.
2. `https://www.bistrajendra.com.np/projects/sovereign` -> **Request Indexing**.
3. `https://www.bistrajendra.com.np/projects/devguard-ai` -> **Request Indexing**.
4. `https://www.bistrajendra.com.np/projects/chronicle` -> **Request Indexing**.

---

## 2. Bing Webmaster Tools Setup

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Select **Import your sites from GSC** (recommended; 1-click verification once GSC is approved).
3. If importing manually:
   - Add site: `https://www.bistrajendra.com.np`.
   - Verify via DNS CNAME or HTML meta tag.
   - Go to **Sitemaps** → submit `https://www.bistrajendra.com.np/sitemap.xml`.

---

## 3. Schema & Structured Data Manual Validation

The codebase uses strongly typed `schema-dts` definitions injected into static server HTML. Test with these tools:

1. **Google Rich Results Test**:
   - URL: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Input: `https://www.bistrajendra.com.np`
   - Expected Entities:
     - `Person` (Name: Rajendra Bist, JobTitle: Full-Stack Developer, Address: New Delhi, India)
     - `WebSite` (`https://www.bistrajendra.com.np/#website`)
     - `ProfilePage` (`https://www.bistrajendra.com.np/#webpage`)
     - `BreadcrumbList`
     - `ItemList` (Featured Projects: Sovereign, Chronicle, DevGuard AI)
     - `FAQPage` (Author identity, location, legal work authorization)
   - Input: `https://www.bistrajendra.com.np/projects/sovereign`
     - Expected: `SoftwareApplication`, `BreadcrumbList`.
   - Input: `https://www.bistrajendra.com.np/blog/pgvector-vs-external-vector-db`
     - Expected: `BlogPosting`, `BreadcrumbList`.

2. **Schema.org Validator**:
   - URL: [https://validator.schema.org/](https://validator.schema.org/)
   - Confirm zero errors and zero warnings on all tested URLs.

3. **PageSpeed Insights**:
   - URL: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   - Test `https://www.bistrajendra.com.np` on mobile and desktop.
   - Confirm Performance, Accessibility, Best Practices, and SEO are all 95+.

---

## 4. Backlink Strategy & Immediate Placements

Search engines rank personal portfolio names based on graph authority and citation signals from authoritative domains. Place the following external backlinks immediately:

### A. GitHub
1. **Profile Bio / Website Field**:
   - Set Website to: `https://www.bistrajendra.com.np`
2. **Pinned Repository Readmes**:
   - In `github.com/rajendrabist07/sovereign/README.md`, add at the top or bottom:
     ```markdown
     > **Architecture Deep Dive**: Read the complete case study and production analysis at [bistrajendra.com.np/projects/sovereign](https://www.bistrajendra.com.np/projects/sovereign).
     ```
   - In `github.com/rajendrabist07/dev-guard-ai/README.md`:
     ```markdown
     > **Architecture Deep Dive**: Read the complete case study and production analysis at [bistrajendra.com.np/projects/devguard-ai](https://www.bistrajendra.com.np/projects/devguard-ai).
     ```
   - In `github.com/rajendrabist07/chronicle/README.md`:
     ```markdown
     > **Architecture Deep Dive**: Read the complete case study and production analysis at [bistrajendra.com.np/projects/chronicle](https://www.bistrajendra.com.np/projects/chronicle).
     ```

### B. Professional Profiles
1. **LinkedIn Profile**:
   - Edit Intro → **Contact Info** → Add Website: `https://www.bistrajendra.com.np` (Type: Portfolio).
   - Add Custom Link button on profile: "View Engineering Portfolio" → `https://www.bistrajendra.com.np`.
2. **Naukri Profile**:
   - Under Profile Summary, include:
     `Portfolio & Case Studies: https://www.bistrajendra.com.np`
3. **Twitter / X Profile**:
   - Website link: `https://www.bistrajendra.com.np`.

---

## 5. Generative Engine Optimization (GEO) & LLM Crawlers

AI search engines (Perplexity, ChatGPT Search, Claude, Google Gemini) index documentation differently than traditional crawlers:
1. **`public/llms.txt`**:
   - Deployed at `https://www.bistrajendra.com.np/llms.txt`.
   - Contains a concise, factual summary of Rajendra Bist's core tech stack, verified projects, open-source repos, and New Delhi location.
2. **AI Crawler Permissions (`robots.txt`)**:
   - `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` are explicitly allowed in `robots.txt` to crawl public pages, sitemap, and `llms.txt`.
   - All API endpoints (`/api/`) and non-public routes (`/dev/`) remain disallowed.

---

## 6. Realistic Timeline & Expectations

- **Initial Discovery (Days 1–7)**:
  - Googlebot will crawl `sitemap.xml` and discover canonical URLs.
  - Search Console will register valid pages under "Discovered - currently not indexed".
- **First Indexing (Weeks 1–3)**:
  - Homepage and `/projects` will appear in `site:bistrajendra.com.np` search results.
  - Queries for exact URL strings will return 200 OK preview cards.
- **Brand Authority & Name Rank (Weeks 3–8)**:
  - Once GitHub and LinkedIn backlinks are recrawled by Google, searches for `"Rajendra Bist"` or `"Rajendra Bist developer"` will elevate the domain to top results.
  - Knowledge panel / rich snippets for software applications will populate as structured data is verified in production.
