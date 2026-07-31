import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CITY_SLUGS_QUERY, JOURNAL_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CITY_SLUGS } from "@/lib/cityData";
import { JOURNAL_CONTENT } from "@/lib/journalContent";

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

  // Fetch city slugs from Sanity, with hardcoded fallback.
  // Wrapped in try/catch so a missing/invalid projectId doesn't crash the build.
  let sanityCtySlugs: Array<{ slug: string }> = [];
  try {
    sanityCtySlugs = await sanityFetch<Array<{ slug: string }>>({
      query: CITY_SLUGS_QUERY,
      tags: ["cityPage"],
    });
  } catch {
    // Sanity not configured — fall through to hardcoded slugs
  }

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

  // Journal posts: seed content always ships (those routes are pre-rendered),
  // plus any additional slugs Sanity has once the CMS is populated.
  let sanityJournalSlugs: Array<{ slug: string }> = [];
  try {
    sanityJournalSlugs = await sanityFetch<Array<{ slug: string }>>({
      query: JOURNAL_SLUGS_QUERY,
      tags: ["journalPost"],
    });
  } catch {
    // Sanity not configured; seed slugs still make the sitemap
  }

  const journalSlugs = Array.from(
    new Set([
      ...JOURNAL_CONTENT.map((post) => post.slug),
      ...(sanityJournalSlugs ?? []).map((post) => post.slug).filter(Boolean),
    ]),
  );

  const journalPages: MetadataRoute.Sitemap = journalSlugs.map((slug) => {
    const seed = JOURNAL_CONTENT.find((post) => post.slug === slug);
    return {
      url: `${BASE_URL}/journal/${slug}`,
      lastModified: seed ? new Date(seed.publishedAt) : new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      ...(seed ? { images: [`${BASE_URL}${seed.coverImage.src}`] } : {}),
    };
  });

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
    // Investment page hidden until Emily confirms pricing — restore by uncommenting:
    // {
    //   url: `${BASE_URL}/investment`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    //   images: [`${BASE_URL}/og/investment.jpg`],
    // },
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
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      images: [`${BASE_URL}/og/journal.jpg`],
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...cityPages, ...journalPages];
}
