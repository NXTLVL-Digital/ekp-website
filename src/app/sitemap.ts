import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CITY_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CITY_SLUGS } from "@/lib/cityData";
import { JOURNAL_CONTENT } from "@/lib/journalContent";

/**
 * XML sitemap for all core pages, city landing pages, and indexable guides.
 *
 * Next.js generates /sitemap.xml from this file automatically.
 * Each entry includes image references for Google Image search
 * (critical for a photography business).
 *
 * lastModified is a real content date, not the build timestamp (v3 audit
 * T-07): a sitemap whose every lastmod changes on every deploy teaches
 * Google to ignore the signal. The dates below are manual constants,
 * updated when a page's content substantively changes; Sanity _updatedAt
 * takes over per-page once the CMS is populated.
 */

/** Last substantive content change per static route. Keep honest. */
const CONTENT_DATES: Record<string, string> = {
  "/": "2026-08-01", // hero label gained service + geography line
  "/senior-portraits": "2026-08-01", // description rewrite
  "/family-portraits": "2026-07-31", // premium redesign (#16)
  "/contact": "2026-07-31",
  "/about": "2026-07-31",
  "/raves": "2026-07-31", // real testimonial corpus restored
  "/style-guide": "2026-07-31",
  "/journal": "2026-08-01", // evergreen guides published
  "/privacy": "2026-07-31", // analytics disclosure
};
const CITY_CONTENT_DATE = "2026-07-31"; // city pages rebuilt in #16

const d = (path: string) => new Date(CONTENT_DATES[path] ?? "2026-07-31");

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
    lastModified: new Date(CITY_CONTENT_DATE),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Only the indexable evergreen guides are listed. The 2018-2019 archive
  // posts carry a noindex directive (the archive no longer sells what Emily
  // sells), and submitting noindexed URLs sends Google a contradictory
  // signal. The /journal index itself stays listed below.
  const journalPages: MetadataRoute.Sitemap = JOURNAL_CONTENT.filter(
    (post) => post.indexable,
  ).map((post) => ({
    url: `${BASE_URL}/journal/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${BASE_URL}${post.coverImage.src}`],
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: d("/"),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${BASE_URL}/og/default.jpg`],
    },
    {
      url: `${BASE_URL}/senior-portraits`,
      lastModified: d("/senior-portraits"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/og/senior-portraits.jpg`],
    },
    {
      url: `${BASE_URL}/family-portraits`,
      lastModified: d("/family-portraits"),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/og/family-portraits.jpg`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: d("/contact"),
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
      lastModified: d("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${BASE_URL}/og/about.jpg`],
    },
    {
      url: `${BASE_URL}/raves`,
      lastModified: d("/raves"),
      changeFrequency: "weekly",
      priority: 0.6,
      images: [`${BASE_URL}/og/raves.jpg`],
    },
    {
      url: `${BASE_URL}/style-guide`,
      lastModified: d("/style-guide"),
      changeFrequency: "monthly",
      priority: 0.5,
      images: [`${BASE_URL}/og/style-guide.jpg`],
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: d("/journal"),
      changeFrequency: "weekly",
      priority: 0.6,
      images: [`${BASE_URL}/og/journal.jpg`],
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: d("/privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...cityPages, ...journalPages];
}
