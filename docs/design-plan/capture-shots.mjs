import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Block any non-file external network requests to avoid sandboxed hangs
  await context.route('**/*', (route) => {
    if (route.request().url().startsWith('file:')) {
      route.continue();
    } else {
      route.abort();
    }
  });

  const mockups = [
    { name: 'direction-a', file: path.join(__dirname, 'mockups/direction-a.html') },
    { name: 'direction-b', file: path.join(__dirname, 'mockups/direction-b.html') }
  ];

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const themes = ['dark', 'light'];

  for (const m of mockups) {
    for (const v of viewports) {
      for (const t of themes) {
        const page = await context.newPage();
        await page.setViewportSize({ width: v.width, height: v.height });
        await page.goto(`file://${m.file}`, { waitUntil: 'load', timeout: 10000 });
        await page.evaluate((theme) => {
          document.documentElement.setAttribute('data-theme', theme);
        }, t);
        await page.waitForTimeout(150);

        const outPath = path.join(__dirname, 'shots', `${m.name}-${t}-${v.name}.png`);
        await page.screenshot({ path: outPath, fullPage: false, timeout: 10000 });
        console.log(`Saved: ${outPath}`);
        await page.close();
      }
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
