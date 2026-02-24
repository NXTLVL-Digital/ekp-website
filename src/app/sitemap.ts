import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * XML sitemap for all core pages.
 *
 * Next.js generates /sitemap.xml from this file automatically.
 * Each entry includes image references for Google Image search
 * (critical for a photography business).
 *
 * TODO: Phase 5 — Add city landing pages dynamically via Sanity query
 * e.g., /chatham-va-photographer, /danville-va-photographer, etc.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = siteConfig.url;

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    {
      url: `${BASE_URL}/senior-portraits`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/og/senior-portraits.jpg`],
    },
    {
      url: `${BASE_URL}/family-portraits`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/og/family-portraits.jpg`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${BASE_URL}/og/contact.jpg`],
    },
    {
      url: `${BASE_URL}/investment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${BASE_URL}/og/investment.jpg`],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${BASE_URL}/og/about.jpg`],
    },
    {
      url: `${BASE_URL}/raves`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      images: [`${BASE_URL}/og/raves.jpg`],
    },
    {
      url: `${BASE_URL}/style-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      images: [`${BASE_URL}/og/style-guide.jpg`],
    },
  ];
}
