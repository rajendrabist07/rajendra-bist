# Production Release & Deployment Runbook

> **Portfolio:** Rajendra Bist — Full-Stack Developer  
> **Production Canonical URL:** `https://www.bistrajendra.com.np`  
> **Deployment Target:** Vercel (Edge Network + Serverless Node.js 20)  
> **Repository:** `github.com/rajendrabist07/rajendra-bist`  
> **Release Branch:** `redesign/v4` → `main` (via PR Squash Merge)

---

## 1. Environment Variables Configuration (Vercel Project Settings)

Configure the following environment variable names in the **Vercel Dashboard > Settings > Environment Variables** (for `Production` and `Preview` environments).

> [!IMPORTANT]
> Never commit actual secrets or credentials to git. All keys are read from serverless runtime environment.

| Variable Name | Required | Scope | Description / Purpose |
|---|---|---|---|
| `MONGODB_URI` | Yes | Serverless API | Connection string for MongoDB Atlas cluster (stores contact submissions and telemetry) |
| `GEMINI_API_KEY` | Yes | Serverless API | Google Gemini API key powering `/api/chat` streaming AI portfolio assistant |
| `RESEND_API_KEY` | Yes | Serverless API | Resend API key for delivering verified contact form submissions to personal email |
| `CONTACT_NOTIFICATION_EMAIL` | Yes | Serverless API | Notification recipient email address (e.g. `bistrajendra07@gmail.com`) |
| `RESEND_FROM_EMAIL` | Yes | Serverless API | Verified sender email address (e.g. `Portfolio Contact <contact@bistrajendra.com.np>`) |
| `UPSTASH_REDIS_REST_URL` | Yes | Edge / API | Upstash Redis REST endpoint for distributed IP rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Edge / API | Upstash Redis REST bearer token |

---

## 2. Production URL Redirects Audit

The following permanent (`308`) redirects are configured in `next.config.ts` to preserve legacy link equity and handle case-sensitivity:

| Incoming Request Path | Canonical Target | HTTP Code | Justification |
|---|---|---|---|
| `/projects/edumethod-ai` | `/projects` | 308 | Retired legacy college project cleanly redirected to projects directory |
| `/projects/socratic-ai` | `/projects/chronicle` | 308 | Previous working name redirected to Chronicle case study |
| `/Resume/resume.pdf` | `/resume/Rajendra_Bist_Full_Stack_Developer.pdf` | 308 | Case-sensitivity guard (uppercase `Resume` → lowercase canonical PDF) |
| `/resume/resume.pdf` | `/resume/Rajendra_Bist_Full_Stack_Developer.pdf` | 308 | Legacy generic filename → canonical full-name PDF |
| `/Resume/:path*` | `/resume/:path*` | 308 | General case-sensitivity normalization |
| `/blog/rss.xml` | `/rss.xml` | 308 | Feed path standardization |
| `rajendra-bist.vercel.app/*` | `https://www.bistrajendra.com.np/*` | 308 | Host redirect from default Vercel subdomain to custom canonical domain |

---

## 3. MongoDB Atlas TTL Index Setup

To prevent unbounded storage growth and comply with data minimization principles, ensure TTL (Time-To-Live) indexes are created in MongoDB Atlas:

```javascript
// Connect via mongosh to the portfolio database
use portfolio-rb;

// 1. Contact Submissions Collection: Auto-expire records after 90 days (7,776,000 seconds)
db.contacts.createIndex(
  { "createdAt": 1 },
  { expireAfterSeconds: 7776000, name: "ttl_contacts_90d" }
);

// 2. Chat Logs / Telemetry Collection: Auto-expire records after 30 days (2,592,000 seconds)
db.chat_logs.createIndex(
  { "createdAt": 1 },
  { expireAfterSeconds: 2592000, name: "ttl_chat_logs_30d" }
);
```

---

## 4. Google Search Console & Sitemap Submission

1. Log into [Google Search Console](https://search.google.com/search-console).
2. Select property `https://www.bistrajendra.com.np`.
3. Navigate to **Indexing > Sitemaps**.
4. Enter URL: `https://www.bistrajendra.com.np/sitemap.xml`.
5. Click **Submit**.
6. Verify status shows **Success** and all 20 discovered URLs are indexed.
7. Request indexing for the homepage `/` and primary case study `/projects/sovereign`.

---

## 5. Social Sharing & Card Validation (OpenGraph / Twitter)

Dynamic OpenGraph (`opengraph-image.tsx`) and Twitter Cards (`twitter-image.tsx`) are generated at the edge with Blueprint design tokens:

- **Validation Tool**: Test with [opengraph.xyz](https://www.opengraph.xyz) and [cards-dev.twitter.com](https://cards-dev.twitter.com).
- **URLs to test**:
  - `https://www.bistrajendra.com.np/`
  - `https://www.bistrajendra.com.np/projects/sovereign`
  - `https://www.bistrajendra.com.np/blog/pgvector-vs-external-vector-db`
- **Expected Assertions**:
  - Title and description match metadata.
  - Image size: 1200x630px.
  - Aspect ratio: 1.91:1.
  - Image renders Blueprint dark navy background, accent badge, and monospaced typography.

---

## 6. Low-End Android / Mobile Performance Verification

To verify real-world field responsiveness on budget hardware:

1. Open Google Chrome on a desktop workstation.
2. Open DevTools (`F12`), toggle Device Toolbar (`Cmd+Shift+M`).
3. Select **Moto G4** or custom mobile viewport (360x640 / 390x844).
4. In DevTools **Performance** tab, set CPU throttling to **4x slowdown** or **6x slowdown** and Network to **Slow 4G**.
5. Profile a fresh page load of `/`:
   - Verify LCP occurs in < 2.5 seconds.
   - Verify no main-thread long tasks (> 50 ms) during idle browsing.
   - Verify smooth 60fps scrolling with zero jank or layout recalculations.
   - Verify touch targets for navigation and buttons are easy to tap.

---

## 7. Release Execution Flow (Squash Merge)

> [!CAUTION]
> Do NOT direct push to `main`. Use a PR with a Squash Merge to produce a clean single commit on `main`.

1. **Verify Local Pre-Release Checks**:
   ```bash
   npm run check:env
   npm run release:check
   ```
   *(Note: `npm run check:resume` fails until the owner replaces the PDF with the updated version without contradictory notice periods. Once replaced, `release:check` will pass).*

2. **Push Branch to Remote**:
   ```bash
   git push origin redesign/v4
   ```

3. **Open Pull Request**:
   - Title: `feat: Portfolio Redesign v4 (Blueprint Design System & Shipped Systems Evidence)`
   - Target Branch: `main`
   - Source Branch: `redesign/v4`
   - Merge Type: **Squash and merge**

4. **Verify Vercel Production Deployment**:
   - Vercel automatically deploys commit upon squash merge to `main`.
   - Confirm build output reports route First Load JS is within 141 kB.

---

## 8. Live Post-Deployment Smoke Checks (`curl`)

Execute these curl checks immediately following production deployment:

```bash
# 1. Homepage status & landmark check
curl -sI https://www.bistrajendra.com.np/ | grep -E "HTTP/|x-frame-options|content-security-policy"

# 2. Case study route status
curl -sI https://www.bistrajendra.com.np/projects/sovereign | grep "HTTP/"

# 3. Blog post status
curl -sI https://www.bistrajendra.com.np/blog/pgvector-vs-external-vector-db | grep "HTTP/"

# 4. Redirect check: Retired legacy route
curl -sI https://www.bistrajendra.com.np/projects/edumethod-ai | grep -E "HTTP/|location:"

# 5. Redirect check: Uppercase resume folder
curl -sI https://www.bistrajendra.com.np/Resume/resume.pdf | grep -E "HTTP/|location:"

# 6. Canonical sitemap status
curl -sI https://www.bistrajendra.com.np/sitemap.xml | grep "HTTP/"

# 7. Robots.txt status
curl -sI https://www.bistrajendra.com.np/robots.txt | grep "HTTP/"

# 8. API Health endpoint
curl -s https://www.bistrajendra.com.np/api/health
# Expected: {"ok":true}
```

---

## 9. Rollback Plan

If critical defects or regressions are detected post-deployment:

1. Open [Vercel Dashboard](https://vercel.com/rajendrabist07/rajendra-bist).
2. Navigate to **Deployments**.
3. Identify the last known healthy deployment commit.
4. Click the three dots `...` action menu on that deployment and select **Instant Rollback**.
5. Vercel routes 100% of incoming production edge traffic back to the previous deployment instantaneously without rebuilding.
