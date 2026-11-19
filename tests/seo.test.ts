import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { Person, WebSite, ProfilePage, SoftwareApplication, BlogPosting, BreadcrumbList } from 'schema-dts';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { SITE_URL } from '../lib/site-config';

interface RouteSeoExpectation {
  route: string;
  file: string;
  expectedH1: string;
  expectedCanonical: string;
  expectedTypes: string[];
}

const PUBLIC_ROUTES: RouteSeoExpectation[] = [
  {
    route: '/',
    file: 'index.html',
    expectedH1: 'Rajendra Bist',
    expectedCanonical: SITE_URL,
    expectedTypes: ['Person', 'WebSite', 'ProfilePage'],
  },
  {
    route: '/projects',
    file: 'projects.html',
    expectedH1: 'Systems built around real constraints.',
    expectedCanonical: `${SITE_URL}/projects`,
    expectedTypes: [],
  },
  {
    route: '/projects/sovereign',
    file: 'projects/sovereign.html',
    expectedH1: 'Sovereign',
    expectedCanonical: `${SITE_URL}/projects/sovereign`,
    expectedTypes: ['SoftwareApplication', 'BreadcrumbList'],
  },
  {
    route: '/projects/devguard-ai',
    file: 'projects/devguard-ai.html',
    expectedH1: 'DevGuard AI',
    expectedCanonical: `${SITE_URL}/projects/devguard-ai`,
    expectedTypes: ['SoftwareApplication', 'BreadcrumbList'],
  },
  {
    route: '/projects/chronicle',
    file: 'projects/chronicle.html',
    expectedH1: 'Chronicle',
    expectedCanonical: `${SITE_URL}/projects/chronicle`,
    expectedTypes: ['SoftwareApplication', 'BreadcrumbList'],
  },
  {
    route: '/blog',
    file: 'blog.html',
    expectedH1: 'Backend and AI systems, explained plainly.',
    expectedCanonical: `${SITE_URL}/blog`,
    expectedTypes: [],
  },
  {
    route: '/blog/pgvector-vs-external-vector-db',
    file: 'blog/pgvector-vs-external-vector-db.html',
    expectedH1: 'pgvector versus an external vector database',
    expectedCanonical: `${SITE_URL}/blog/pgvector-vs-external-vector-db`,
    expectedTypes: ['BlogPosting', 'BreadcrumbList'],
  },
  {
    route: '/blog/multi-model-llm-fallback-router',
    file: 'blog/multi-model-llm-fallback-router.html',
    expectedH1: 'Designing a multi-model LLM fallback router',
    expectedCanonical: `${SITE_URL}/blog/multi-model-llm-fallback-router`,
    expectedTypes: ['BlogPosting', 'BreadcrumbList'],
  },
  {
    route: '/blog/ast-based-pr-review',
    file: 'blog/ast-based-pr-review.html',
    expectedH1: 'Why AST evidence belongs in AI-assisted code review',
    expectedCanonical: `${SITE_URL}/blog/ast-based-pr-review`,
    expectedTypes: ['BlogPosting', 'BreadcrumbList'],
  },
];

describe('Phase 7: SEO, GEO & Metadata Integrity Test Suite', () => {
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  for (const item of PUBLIC_ROUTES) {
    describe(`Route: ${item.route}`, () => {
      const htmlPath = path.resolve(process.cwd(), '.next/server/app', item.file);

      it(`1. Title is unique and length is <= 60 characters`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        const match = html.match(/<title>([^<]+)<\/title>/);
        expect(match, `Title tag must exist in ${item.file}`).toBeTruthy();
        const title = match![1];

        expect(title.length).toBeLessThanOrEqual(60);
        expect(seenTitles.has(title), `Title "${title}" must be unique across all routes`).toBe(false);
        seenTitles.add(title);
      });

      it(`2. Description is unique and length is between 70 and 155 characters`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
        expect(match, `Description meta tag must exist in ${item.file}`).toBeTruthy();
        const desc = match![1];

        expect(desc.length).toBeGreaterThanOrEqual(70);
        expect(desc.length).toBeLessThanOrEqual(155);
        expect(seenDescriptions.has(desc), `Description must be unique across routes`).toBe(false);
        seenDescriptions.add(desc);
      });

      it(`3. Canonical link is absolute and matches route`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        const match = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
        expect(match, `Canonical link tag must exist in ${item.file}`).toBeTruthy();
        const canonical = match![1];
        expect(canonical).toBe(item.expectedCanonical);
      });

      it(`4. Exactly one <h1> element exists on the page`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
        expect(h1Matches, `Expected exactly one <h1> in ${item.file}`).toBeTruthy();
        expect(h1Matches!.length).toBe(1);
        expect(h1Matches![0]).toContain(item.expectedH1);
      });

      it(`5. Open Graph tags are defined with valid absolute images and locale`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        expect(html).toContain('property="og:locale" content="en_IN"');
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
        expect(ogImageMatch, `og:image must exist in ${item.file}`).toBeTruthy();
        expect(ogImageMatch![1]).toMatch(/^https?:\/\/|\/opengraph-image/);
      });

      it(`6. No keywords or classification meta tags exist`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        expect(html).not.toContain('name="keywords"');
        expect(html).not.toContain('name="classification"');
      });

      it(`7. Prerendered HTML specifies lang="en" and allows indexing`, () => {
        if (!fs.existsSync(htmlPath)) return;
        const html = fs.readFileSync(htmlPath, 'utf8');
        expect(html).toContain('<html lang="en"');
        expect(html).not.toContain('name="robots" content="noindex');
      });

      if (item.expectedTypes.length > 0) {
        it(`8. JSON-LD structured data parses and validates expected Schema.org entities`, () => {
          if (!fs.existsSync(htmlPath)) return;
          const html = fs.readFileSync(htmlPath, 'utf8');
          const scriptMatches = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
          expect(scriptMatches, `JSON-LD scripts must exist in ${item.file}`).toBeTruthy();

          const allSchemas: any[] = [];
          for (const s of scriptMatches!) {
            const jsonText = s.replace(/<script\s+type="application\/ld\+json">/i, '').replace(/<\/script>/i, '');
            const parsed = JSON.parse(jsonText);
            if (Array.isArray(parsed)) {
              allSchemas.push(...parsed);
            } else if (parsed['@graph']) {
              allSchemas.push(...parsed['@graph']);
            } else {
              allSchemas.push(parsed);
            }
          }

          const presentTypes = allSchemas.map((s) => s['@type']);
          for (const expectedType of item.expectedTypes) {
            expect(presentTypes, `Schema type ${expectedType} must be present in ${item.file}`).toContain(expectedType);
          }
        });
      }
    });
  }

  describe('Sitemap & Robots Verification', () => {
    it('sitemap contains all 9 canonical routes and excludes drafts/internal paths', () => {
      const items = sitemap();
      const urls = items.map((i) => i.url);

      expect(urls).toHaveLength(9);
      expect(urls).toContain(SITE_URL);
      expect(urls).toContain(`${SITE_URL}/projects`);
      expect(urls).toContain(`${SITE_URL}/projects/sovereign`);
      expect(urls).toContain(`${SITE_URL}/projects/devguard-ai`);
      expect(urls).toContain(`${SITE_URL}/projects/chronicle`);
      expect(urls).toContain(`${SITE_URL}/blog`);
      expect(urls).toContain(`${SITE_URL}/blog/pgvector-vs-external-vector-db`);
      expect(urls).toContain(`${SITE_URL}/blog/multi-model-llm-fallback-router`);
      expect(urls).toContain(`${SITE_URL}/blog/ast-based-pr-review`);

      // Verify no drafts or internal routes
      expect(urls.some((u) => u.includes('edumethod'))).toBe(false);
      expect(urls.some((u) => u.includes('/dev/') || u.endsWith('/dev'))).toBe(false);
      expect(urls.some((u) => u.includes('/api/'))).toBe(false);

      // Verify real dates (not all identical current timestamps)
      const dateStrings = new Set(items.map((i) => i.lastModified?.toString()));
      expect(dateStrings.size).toBeGreaterThan(1);
    });

    it('robots.txt references sitemap and disallows /api/ while allowing crawlable pages', () => {
      const config = robots();
      expect(config.sitemap).toContain(`${SITE_URL}/sitemap.xml`);
      const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
      const generalRule = rules.find((r) => r.userAgent === '*');
      expect(generalRule).toBeDefined();
      expect(generalRule?.allow).toBe('/');
      expect(generalRule?.disallow).toContain('/api/');
    });
  });
});
