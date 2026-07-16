import fs from "node:fs";
import path from "node:path";

export const staticPageFiles = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact.html",
  "/journal": "journal.html",
  "/family": "family.html",
  "/senior": "senior.html",
  "/investment": "investment.html",
  "/portfolio": "portfolio.html",
} as const;

const fileToRoute: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "contact.html": "/contact",
  "journal.html": "/journal",
  "family.html": "/family",
  "senior.html": "/senior",
  "investment.html": "/investment",
  "portfolio.html": "/portfolio",
};

export type StaticPageFile = (typeof staticPageFiles)[keyof typeof staticPageFiles];

export type StaticPage = {
  title: string;
  description: string;
  html: string;
};

function readSource(file: StaticPageFile) {
  const sourcePath = path.join(process.cwd(), "static-site", file);
  return fs.readFileSync(sourcePath, "utf8");
}

function between(source: string, start: RegExp, end: RegExp) {
  const startMatch = source.match(start);
  if (startMatch?.index === undefined) return "";
  const contentStart = startMatch.index + startMatch[0].length;
  const rest = source.slice(contentStart);
  const endMatch = rest.match(end);
  return endMatch?.index === undefined ? rest : rest.slice(0, endMatch.index);
}

function extractMeta(source: string) {
  const title =
    source.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ??
    "Emily Kathryn Photography";
  const description =
    source.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]?.trim() ??
    "Editorial senior and family portraiture across South-Central Virginia.";

  return { title, description };
}

function rewriteForNext(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="(about|contact|journal|family|senior|investment|portfolio)\.html"/g, (_match, page) => `href="/${page}"`)
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/url\((['"]?)assets\//g, "url($1/assets/")
    .replace(/\s+class=""/g, "")
    .replace(/<a href="([^"]+\.html)"/g, (match, file) => {
      const route = fileToRoute[file];
      return route ? `<a href="${route}"` : match;
    });
}

export function loadStaticPage(file: StaticPageFile): StaticPage {
  const source = readSource(file);
  const { title, description } = extractMeta(source);
  const body = between(source, /<body[^>]*>/i, /<\/body>/i);

  return {
    title,
    description,
    html: rewriteForNext(body),
  };
}
