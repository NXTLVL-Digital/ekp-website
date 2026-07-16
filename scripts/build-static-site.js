const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sourceDir = path.join(root, 'static-site');
const outputDir = path.join(root, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error(`Missing static site source: ${sourceDir}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

const pageMap = {
  'about.html': 'about',
  'contact.html': 'contact',
  'journal.html': 'journal',
  'family.html': 'family',
  'senior.html': 'senior',
  'investment.html': 'investment',
  'portfolio.html': 'portfolio',
};

for (const [file, route] of Object.entries(pageMap)) {
  const htmlPath = path.join(outputDir, file);
  if (!fs.existsSync(htmlPath)) {
    console.error(`Missing required page: ${file}`);
    process.exit(1);
  }
  const routeDir = path.join(outputDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(htmlPath, path.join(routeDir, 'index.html'));
}

function rewriteHtml(html, nested = false) {
  return html
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="(about|contact|journal|family|senior|investment|portfolio)\.html"/g, 'href="/$1"')
    .replace(/src="assets\//g, nested ? 'src="/assets/' : 'src="assets/')
    .replace(/url\(['"]?assets\//g, nested ? 'url(/assets/' : 'url(assets/');
}

for (const file of ['index.html', ...Object.keys(pageMap)]) {
  const htmlPath = path.join(outputDir, file);
  const html = fs.readFileSync(htmlPath, 'utf8');
  fs.writeFileSync(htmlPath, rewriteHtml(html));
}

for (const route of Object.values(pageMap)) {
  const htmlPath = path.join(outputDir, route, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  fs.writeFileSync(htmlPath, rewriteHtml(html, true));
}

console.log(`Static site built to ${outputDir}`);
