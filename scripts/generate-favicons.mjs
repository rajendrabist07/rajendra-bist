#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SVG_PATH = path.resolve('public/favicon.svg');
const DOCS_SEO_DIR = path.resolve('docs/seo');
fs.mkdirSync(DOCS_SEO_DIR, { recursive: true });

async function createIcoFromPngs(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO format
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + count * 16;
  const dirEntries = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0); // width
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((b) => b.buffer)]);
}

async function run() {
  console.log('Generating crisp static favicon suite from public/favicon.svg...');

  const svgBuffer = fs.readFileSync(SVG_PATH);

  // 1. Generate 16x16, 32x32, 48x48 PNGs
  const b16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const b32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const b48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  fs.writeFileSync('public/favicon-16x16.png', b16);
  fs.writeFileSync('public/favicon-32x32.png', b32);
  fs.writeFileSync('public/favicon-48x48.png', b48);
  fs.writeFileSync(path.join(DOCS_SEO_DIR, 'monogram-16.png'), b16);
  fs.writeFileSync(path.join(DOCS_SEO_DIR, 'monogram-32.png'), b32);
  fs.writeFileSync(path.join(DOCS_SEO_DIR, 'monogram-48.png'), b48);

  // 2. Generate multi-size app/favicon.ico
  const icoBuffer = await createIcoFromPngs([
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 },
  ]);
  fs.writeFileSync('app/favicon.ico', icoBuffer);
  fs.writeFileSync('public/favicon.ico', icoBuffer);

  // 3. Generate apple-icon (180x180)
  const b180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync('app/apple-icon.png', b180);
  fs.writeFileSync('public/apple-touch-icon.png', b180);

  // 4. Generate app/icon.png (512x512) and manifest icons
  const b192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const b512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync('public/icon-192.png', b192);
  fs.writeFileSync('public/icon-512.png', b512);
  fs.writeFileSync('public/icon-maskable-512.png', b512);
  fs.writeFileSync('app/icon.png', b512);

  console.log('✓ Successfully generated:');
  console.log('  - app/favicon.ico (16, 32, 48 multi-size)');
  console.log('  - app/apple-icon.png (180x180)');
  console.log('  - app/icon.png (512x512)');
  console.log('  - public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png');
  console.log('  - docs/seo/monogram-16.png, monogram-32.png, monogram-48.png');
}

run().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
