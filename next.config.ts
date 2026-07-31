import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
