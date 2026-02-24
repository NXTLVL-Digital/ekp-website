import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CITY_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CITY_SLUGS } from "@/lib/cityData";

/**
 * XML sitemap for all core pages and city landing pages.
 *
 * Next.js generates /sitemap.xml from this file automatically.
 * Each entry includes image references for Google Image search
 * (critical for a photography business).
 *
 * City pages are fetched from Sanity. If Sanity has no city content yet
 * (CMS not populated), falls back to the hardcoded CITY_SLUGS list so
 * the sitemap always includes all 7 city URLs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = siteConfig.url;

  // Fetch city slugs from Sanity, with hardcoded fallback
  const sanityCtySlugs = await sanityFetch<Array<{ slug: string }>>({
    query: CITY_SLUGS_QUERY,
    tags: ["cityPage"],
  });

  const citySlugs =
    sanityCtySlugs && sanityCtySlugs.length > 0
      ? sanityCtySlugs.map((c) => c.slug)
      : CITY_SLUGS;

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
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

  return [...staticPages, ...cityPages];
}
