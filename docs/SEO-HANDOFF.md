# SEO & Search Engine Presence Handoff Guide
> For Rajendra Bist (`https://www.bistrajendra.com.np`)

This guide explains how to establish and claim your organic search presence across Google, Bing, and AI engines (GEO).

---

## 1. Google Search Console (GSC) Setup

1. **Add Property**:
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Select **Domain property** and enter `bistrajendra.com.np` (requires DNS TXT record at your registrar).
   - Or select **URL prefix** and enter `https://www.bistrajendra.com.np` (can be verified via HTML tag or Vercel DNS).

2. **Submit Sitemap**:
   - In GSC left navigation, click **Sitemaps**.
   - Enter `sitemap.xml` and click **Submit**.
   - Your sitemap route is active at `https://www.bistrajendra.com.np/sitemap.xml`.

3. **Request Indexing**:
   - Use the URL Inspection tool at the top bar.
   - Enter `https://www.bistrajendra.com.np`.
   - Click **Request Indexing** for the homepage and `/projects`.

---

## 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Click **Import from Google Search Console** (1-click automatic verification once GSC is verified).
3. Confirm sitemap `https://www.bistrajendra.com.np/sitemap.xml` is recognized.

---

## 3. Schema & Structured Data Testing

1. Open Google's official [Rich Results Test](https://search.google.com/test/rich-results).
2. Test URL: `https://www.bistrajendra.com.np`.
3. Verify that the following schemas are detected without errors:
   - `Person` (Rajendra Bist, jobTitle, address, worksFor/alumniOf)
   - `WebSite`
   - `ProfilePage`
   - `BreadcrumbList`
   - `ItemList` (Featured Projects)
   - `FAQPage`
4. Test a project page like `https://www.bistrajendra.com.np/projects/devguard-ai`:
   - Verify `SoftwareApplication` schema is detected.

---

## 4. High-Authority Backlink Placement (Action Required)

No amount of on-page code can substitute for real external backlinks. Place these exact links:

| Platform | Location | Exact Link Target |
|---|---|---|
| **GitHub** | Profile "Website" field | `https://www.bistrajendra.com.np` |
| **GitHub** | Pinned repo READMEs (`sovereign`, `dev-guard-ai`, `chronicle`) | Add a footer: `[Read Full Architecture Case Study](https://www.bistrajendra.com.np/projects/slug)` |
| **LinkedIn** | Contact Info → Website | `https://www.bistrajendra.com.np` (Label: Portfolio) |
| **Naukri** | Profile Summary & Website field | `https://www.bistrajendra.com.np` |

---

## 5. Realistic Ranking Expectations

- **Name Query ("Rajendra Bist")**: Ranking #1 in Google depends on time (typically 2 to 6 weeks after indexing) and establishing consistent backlinks across your GitHub, LinkedIn, and project repositories.
- Code provides the technical foundation (perfect sitemap, crawlable static HTML, unique metadata, valid schema.org markup, fast Core Web Vitals). Search engines award rankings based on domain authority and consistent crawl signals over time.
