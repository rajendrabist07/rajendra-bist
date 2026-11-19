import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const TARGET_DIR = path.resolve('docs/seo');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGES_TO_FETCH = [
  { urlPath: '/opengraph-image', outName: 'og-home.png' },
  { urlPath: '/twitter-image', outName: 'twitter-home.png' },
  { urlPath: '/projects/sovereign/opengraph-image', outName: 'og-project-sovereign.png' },
  { urlPath: '/projects/devguard-ai/opengraph-image', outName: 'og-project-devguard-ai.png' },
  { urlPath: '/projects/chronicle/opengraph-image', outName: 'og-project-chronicle.png' },
  { urlPath: '/blog/pgvector-vs-external-vector-db/opengraph-image', outName: 'og-blog-pgvector.png' },
  { urlPath: '/blog/multi-model-llm-fallback-router/opengraph-image', outName: 'og-blog-router.png' },
  { urlPath: '/blog/ast-based-pr-review/opengraph-image', outName: 'og-blog-ast-review.png' },
];

async function main() {
  const port = 3012;
  const server = spawn('npx', ['next', 'start', '-p', String(port), '-H', '127.0.0.1'], {
    stdio: 'ignore',
  });

  // Wait for server to come up
  await new Promise((resolve) => setTimeout(resolve, 3000));

  for (const item of IMAGES_TO_FETCH) {
    const filePath = path.join(TARGET_DIR, item.outName);
    await new Promise((resolve, reject) => {
      const req = http.get(`http://127.0.0.1:${port}${item.urlPath}`, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Failed to fetch ${item.urlPath}: status ${res.statusCode}`);
          resolve();
          return;
        }
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(filePath);
          console.log(`Saved ${item.outName} (${stats.size} bytes)`);
          resolve();
        });
      });
      req.on('error', (err) => {
        console.error(`Error requesting ${item.urlPath}:`, err.message);
        resolve();
      });
    });
  }

  server.kill();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
