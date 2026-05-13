// Strip literal `\n`/`\r`/`\t` escape sequences and surrounding whitespace.
// Vercel env vars have been observed with a trailing literal `\n` text that
// breaks Sanity's `projectId` regex (a-z, 0-9, dashes).
function clean(v: string | undefined): string {
  return (v || "").replace(/\\[nrt]/g, "").trim();
}

export const apiVersion =
  clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION) || "2025-03-04";

export const dataset =
  clean(process.env.NEXT_PUBLIC_SANITY_DATASET) || "production";

export const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
