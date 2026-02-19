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
};

export default nextConfig;
