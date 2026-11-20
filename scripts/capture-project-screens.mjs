import { chromium } from '@playwright/test';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PROJECTS = [
  {
    slug: 'sovereign',
    title: 'Sovereign',
    url: 'https://sovereign-saas-platform.vercel.app/',
    alt: 'Sovereign multi-tenant B2B workflow SaaS landing interface',
  },
  {
    slug: 'devguard-ai',
    title: 'DevGuard AI',
    url: 'https://dev-guard-ai.vercel.app/',
    alt: 'DevGuard AI automated pull request review and security intelligence platform',
  },
  {
    slug: 'chronicle',
    title: 'Chronicle',
    url: 'https://chronicle-platform.vercel.app/',
    alt: 'Chronicle technical content and publishing platform reading interface',
  },
];

async function capture() {
  console.log('🚀 Starting project screenshot capture with Playwright & Sharp...');
  const browser = await chromium.launch();
  const manifest = [];

  for (const proj of PROJECTS) {
    const dir = path.resolve(`public/images/projects/${proj.slug}`);
    fs.mkdirSync(dir, { recursive: true });

    // 1. Desktop Viewport (1440x900 @ DPR 2)
    console.log(`📸 Capturing Desktop for ${proj.title}...`);
    const deskContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const deskPage = await deskContext.newPage();
    try {
      await deskPage.goto(proj.url, { waitUntil: 'networkidle', timeout: 30000 });
      await deskPage.evaluate(() => document.fonts.ready);
      await deskPage.waitForTimeout(1000);

      const rawDeskPng = await deskPage.screenshot({ fullPage: false });

      // Convert via Sharp to WebP & AVIF (constrained <= 140 KB)
      const deskWebpPath = path.join(dir, 'desktop.webp');
      const deskAvifPath = path.join(dir, 'desktop.avif');

      await sharp(rawDeskPng)
        .resize(1440)
        .webp({ quality: 80, effort: 5 })
        .toFile(deskWebpPath);

      await sharp(rawDeskPng)
        .resize(1440)
        .avif({ quality: 65, effort: 5 })
        .toFile(deskAvifPath);

      const webpStat = fs.statSync(deskWebpPath);
      const avifStat = fs.statSync(deskAvifPath);
      console.log(`  Desktop sizes -> WebP: ${(webpStat.size / 1024).toFixed(1)} KB, AVIF: ${(avifStat.size / 1024).toFixed(1)} KB`);

      manifest.push({
        project: proj.slug,
        viewport: 'desktop',
        width: 1440,
        height: 900,
        dpr: 2,
        url: proj.url,
        capturedAt: new Date().toISOString(),
        webp: `/images/projects/${proj.slug}/desktop.webp`,
        avif: `/images/projects/${proj.slug}/desktop.avif`,
        webpBytes: webpStat.size,
        avifBytes: avifStat.size,
        alt: proj.alt,
      });
    } catch (err) {
      console.error(`❌ Failed desktop capture for ${proj.title}: ${err.message}`);
    } finally {
      await deskContext.close();
    }

    // 2. Mobile Viewport (390x844 @ DPR 3)
    console.log(`📱 Capturing Mobile for ${proj.title}...`);
    const mobContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const mobPage = await mobContext.newPage();
    try {
      await mobPage.goto(proj.url, { waitUntil: 'networkidle', timeout: 30000 });
      await mobPage.evaluate(() => document.fonts.ready);
      await mobPage.waitForTimeout(1000);

      const rawMobPng = await mobPage.screenshot({ fullPage: false });

      const mobWebpPath = path.join(dir, 'mobile.webp');
      const mobAvifPath = path.join(dir, 'mobile.avif');

      await sharp(rawMobPng)
        .resize(780)
        .webp({ quality: 80, effort: 5 })
        .toFile(mobWebpPath);

      await sharp(rawMobPng)
        .resize(780)
        .avif({ quality: 65, effort: 5 })
        .toFile(mobAvifPath);

      const webpStat = fs.statSync(mobWebpPath);
      const avifStat = fs.statSync(mobAvifPath);
      console.log(`  Mobile sizes -> WebP: ${(webpStat.size / 1024).toFixed(1)} KB, AVIF: ${(avifStat.size / 1024).toFixed(1)} KB`);

      manifest.push({
        project: proj.slug,
        viewport: 'mobile',
        width: 390,
        height: 844,
        dpr: 3,
        url: proj.url,
        capturedAt: new Date().toISOString(),
        webp: `/images/projects/${proj.slug}/mobile.webp`,
        avif: `/images/projects/${proj.slug}/mobile.avif`,
        webpBytes: webpStat.size,
        avifBytes: avifStat.size,
        alt: proj.alt,
      });
    } catch (err) {
      console.error(`❌ Failed mobile capture for ${proj.title}: ${err.message}`);
    } finally {
      await mobContext.close();
    }
  }

  await browser.close();

  // Save screens.json manifest
  const manifestPath = path.resolve('public/images/projects/screens.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Screens manifest written to ${manifestPath} (${manifest.length} captures)`);
}

capture();
