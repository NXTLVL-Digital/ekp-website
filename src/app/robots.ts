import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Robots.txt directives for search engine crawlers.
 *
 * Next.js generates /robots.txt from this file automatically.
 * Allows crawling of all public pages while blocking the Sanity
 * Studio dashboard and internal API routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
