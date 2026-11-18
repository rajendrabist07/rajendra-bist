import sharp from 'sharp';
import path from 'path';

const srcPath = 'public/images/Rajendra-Bist.png';
const meta = await sharp(srcPath).metadata();
console.log('Source dimensions:', meta.width, 'x', meta.height);

// 4:5 aspect ratio
// With width = 700, height = 700 * 5 / 4 = 875.
const targetWidth = meta.width; // 700
const targetHeight = Math.round(targetWidth * 5 / 4); // 875
const topOffset = Math.round((meta.height - targetHeight) * 0.25); // Top-weighted framing for portrait

console.log(`Cropping to ${targetWidth}x${targetHeight} at top offset ${topOffset}...`);

const base = sharp(srcPath).extract({
  left: 0,
  top: topOffset,
  width: targetWidth,
  height: targetHeight
});

// Output 4:5 PNG
await base.clone().png({ quality: 90, compressionLevel: 8 }).toFile('public/images/rajendra-bist-portrait.png');

// Output 4:5 WebP
await base.clone().webp({ quality: 85 }).toFile('public/images/rajendra-bist-portrait.webp');

// Output 4:5 AVIF
await base.clone().avif({ quality: 80 }).toFile('public/images/rajendra-bist-portrait.avif');

console.log('Derivatives generated successfully.');
