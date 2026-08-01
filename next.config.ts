import type { NextConfig } from "next";

/**
 * Content-Security-Policy, shipped Report-Only first.
 *
 * Every origin below is one the site actually talks to today:
 *   googletagmanager / google-analytics  GA4 (env-driven, dormant until an ID is set)
 *   clarity.ms                           Microsoft Clarity (same)
 *   va.vercel-scripts / vitals.vercel-*  Vercel Analytics + Speed Insights
 *   cdn.sanity.io / *.api.sanity.io      CMS images and queries
 *   www.google.com                       the lazy Maps embed on city pages
 *
 * 'unsafe-inline' in script-src is required by the Next.js App Router bootstrap
 * and the two analytics init snippets; moving to nonces means routing every
 * script through middleware, which is a separate piece of work.
 *
 * Report-Only means violations log to the console and nothing breaks. Watch it
 * for a clean week, then rename the header to Content-Security-Policy.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.clarity.ms https://www.google-analytics.com https://maps.gstatic.com https://*.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io https://www.google-analytics.com https://*.google-analytics.com https://*.clarity.ms https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Deliberately no upgrade-insecure-requests here: browsers ignore it in a
  // report-only policy and log a console warning for it, which is noise during
  // the week spent reading real violations. Add it when flipping to enforcing.
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        // Test images for gallery-test page (picsum.photos placeholders)
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  // Suppress styled-components hydration warning from Sanity Studio
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        // Applies to every route. HSTS is already set at the Vercel edge.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            // Nothing frames this site. If Sanity Presentation is ever enabled
            // it iframes the site from /studio, which needs SAMEORIGIN instead.
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // geolocation stays self-enabled so a future "near me" feature does
            // not need a header change; camera and mic are never used.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP_REPORT_ONLY,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host: www → apex (mirrors the Vercel domain-level redirect)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.emilykathryn.com" }],
        destination: "https://emilykathryn.com/:path*",
        permanent: true,
      },
      // Legacy URL structure from the pre-2026 GoHighLevel site — preserves
      // indexed rankings and backlinks through the platform migration.
      { source: "/home", destination: "/", permanent: true },
      { source: "/meet-emily", destination: "/about", permanent: true },
      { source: "/experience", destination: "/senior-portraits", permanent: true },
      { source: "/gallery", destination: "/senior-portraits", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      // Per-post redirects for the six recovered legacy blog posts. Three of
      // them shipped with duplicated "valentines-day--ellery" slugs on the old
      // platform; each one maps to its real article. Order matters: the
      // specific rules must come before the catch-all below.
      {
        source: "/blog/b/emily-kathryn-photography-chatham-va",
        destination: "/journal/emily-kathryn-photography-chatham-va",
        permanent: true,
      },
      {
        source: "/blog/b/faith-2019-gretna-high-senior",
        destination: "/journal/faith-2019-gretna-high-senior",
        permanent: true,
      },
      {
        source: "/blog/b/raegan-2019-altavista-va-senior",
        destination: "/journal/raegan-2019-altavista-va-senior",
        permanent: true,
      },
      {
        source: "/blog/b/valentines-day--ellery",
        destination: "/journal/valentines-day-styled-shoot-ellery",
        permanent: true,
      },
      {
        // Points at the journal index while the 2018 personal post is held as
        // a draft. Retarget to /journal/hardest-photos-of-2018 when it ships.
        source: "/blog/b/valentines-day--ellery-1193",
        destination: "/journal",
        permanent: true,
      },
      {
        source: "/blog/b/valentines-day--ellery-6520",
        destination: "/journal/first-shoot-of-2019",
        permanent: true,
      },
      // Fallback for any other legacy post slug we did not recover.
      { source: "/blog/b/:slug", destination: "/journal", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-conditions", destination: "/privacy", permanent: true },
      { source: "/test_path", destination: "/", permanent: true },
      // Devices and bots that blind-probe the legacy touch-icon paths instead
      // of reading the <link rel="apple-touch-icon"> tag. Kills the 404 noise.
      { source: "/apple-touch-icon.png", destination: "/apple-icon.png", permanent: true },
      { source: "/apple-touch-icon-precomposed.png", destination: "/apple-icon.png", permanent: true },
    ];
  },
};

export default nextConfig;
