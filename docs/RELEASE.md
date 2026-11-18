# Release Checklist & Deployment Runbook
> Rajendra Bist Portfolio (`https://www.bistrajendra.com.np`)

---

## 1. Pre-Deployment Verification

Run all verification scripts locally before merging to `main`:

```bash
# 1. Typecheck (zero errors required)
npm run typecheck

# 2. Linting (zero errors required)
npm run lint

# 3. Guard against unfinished placeholders or leaked TODOs
npm run check:placeholders

# 4. Verify external facts and project URLs
npm run check:links

# 5. Vitest test suite (15 unit & adversarial security tests)
npm test

# 6. Full production build test
npm run build
```

---

## 2. Vercel Environment Variables

Ensure these environment variables are populated in your Vercel Project Settings:

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Recommended | Powers `/api/chat` streaming AI assistant |
| `RESEND_API_KEY` | Recommended | Delivers `/api/contact` submissions to your inbox |
| `CONTACT_NOTIFICATION_EMAIL` | Optional | Recipient email (defaults to `rajendrabist396@gmail.com`) |
| `MONGODB_URI` | Optional | Persists contact submissions and chat telemetry |
| `UPSTASH_REDIS_REST_URL` | Optional | Distributed rate limiting across serverless edge |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Upstash Redis authentication token |

---

## 3. Post-Deployment Verification

1. **Live Domain Check**:
   - Visit `https://www.bistrajendra.com.np`
   - Verify hero displays live time in IST (`New Delhi · HH:MM IST`)
   - Verify availability chip: `Available immediately · Delhi NCR / remote`
   - Test "View Projects" and "Download Resume" buttons

2. **Redirect Validation**:
   - Request `https://www.bistrajendra.com.np/resume/resume.pdf` → must redirect (308/307) to `/Resume/resume.pdf`

3. **Case Studies & Routes**:
   - `/projects/sovereign`
   - `/projects/chronicle`
   - `/projects/devguard-ai`
   - `/projects/edumethod-ai` (verified permanent 308 redirect to `/projects`)
   - `/blog`

4. **Sitemap & Robots**:
   - Open `https://www.bistrajendra.com.np/sitemap.xml` → status 200 with all 20 public URLs
   - Open `https://www.bistrajendra.com.np/robots.txt` → status 200 referencing sitemap

5. **Contact Endpoint**:
   - Submit a test inquiry via the contact form
   - Confirm confirmation feedback appears with `aria-live` announcement

---

## 4. Rollback Plan

If an unexpected production defect occurs:
1. Open the [Vercel Dashboard](https://vercel.com).
2. Go to **Deployments**.
3. Locate the previous stable deployment (commit `fdb4321` or latest healthy build).
4. Click the three dots `...` and select **Instant Rollback**.
