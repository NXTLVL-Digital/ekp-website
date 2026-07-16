const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), 'dist');
const requiredPages = [
  'index.html',
  'about/index.html',
  'contact/index.html',
  'journal/index.html',
  'family/index.html',
  'senior/index.html',
  'investment/index.html',
  'portfolio/index.html',
];

const missingPages = requiredPages.filter((page) => !fs.existsSync(path.join(root, page)));
if (missingPages.length > 0) {
  console.error('Missing required pages:');
  for (const page of missingPages) console.error(`- ${page}`);
  process.exit(1);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const brokenRefs = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const refPattern = /(?:src|href)="([^"]+)"/g;
  for (const match of html.matchAll(refPattern)) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|#)/.test(url)) continue;

    let target = url.startsWith('/')
      ? path.join(root, url.slice(1))
      : path.join(path.dirname(file), url);

    if (!path.extname(url) && !url.startsWith('/assets')) {
      target = path.join(target, 'index.html');
    }

    if (!fs.existsSync(target)) {
      brokenRefs.push(`${path.relative(root, file)} -> ${url}`);
    }
  }
}

if (brokenRefs.length > 0) {
  console.error('Broken local references:');
  for (const ref of brokenRefs) console.error(`- ${ref}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and ${requiredPages.length} required routes.`);
