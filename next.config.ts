import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // Suppress styled-components hydration warning from Sanity Studio
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
