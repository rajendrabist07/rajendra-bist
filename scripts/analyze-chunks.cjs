const fs = require('fs');
const path = require('path');

const chunksDir = path.join(process.cwd(), '.next/static/chunks');
const files = fs.readdirSync(chunksDir);

console.log('Top chunks in .next/static/chunks:');
const list = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (item.endsWith('.js')) {
      list.push({ file: path.relative(chunksDir, full), size: stat.size });
    }
  }
}
walk(chunksDir);

list.sort((a, b) => b.size - a.size);
for (const item of list.slice(0, 15)) {
  console.log(`${(item.size / 1024).toFixed(1)} kB\t${item.file}`);
}
