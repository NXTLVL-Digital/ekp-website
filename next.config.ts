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
      { source: "/blog/b/:slug", destination: "/journal", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-conditions", destination: "/privacy", permanent: true },
      { source: "/test_path", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
