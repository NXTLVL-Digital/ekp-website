import { client } from "./client";
import { projectId } from "../env";
import type { QueryParams } from "next-sanity";

/**
 * Centralized Sanity fetch wrapper with ISR caching.
 *
 * ALL Sanity data fetching across the site MUST use this wrapper.
 *
 * CRITICAL: Next.js 15 changed the default `fetch` behavior from `force-cache`
 * to `no-store`. Without explicitly setting `cache: 'force-cache'`, every page
 * render makes a fresh Sanity API call -- burning API quota and eliminating ISR.
 *
 * Tag-based and time-based revalidation are MUTUALLY EXCLUSIVE in Next.js.
 * When tags are provided, `revalidate` is set to `false`. When no tags are
 * provided, time-based revalidation serves as the fallback.
 *
 * @example
 * ```ts
 * // Tag-based (recommended for webhook-driven revalidation)
 * const data = await sanityFetch<Homepage>({
 *   query: HOMEPAGE_QUERY,
 *   tags: ["homepage"],
 * });
 *
 * // Time-based fallback (for queries without webhook tags)
 * const data = await sanityFetch<Settings>({
 *   query: SITE_SETTINGS_QUERY,
 *   revalidate: 3600,
 * });
 * ```
 */
function emptyResultForQuery<T>(query: string): T {
  const trimmedQuery = query.trim();

  if (trimmedQuery.startsWith("{")) {
    return {} as T;
  }

  if (/^\*\[[\s\S]*?\]\s*\[\s*0\s*\]/.test(trimmedQuery)) {
    return null as T;
  }

  return [] as T;
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  if (!projectId) {
    return emptyResultForQuery<T>(query);
  }

  return client.fetch<T>(query, params, {
    // CRITICAL: Next.js 15 defaults to no-store. Must opt in for ISR.
    cache: "force-cache",
    next: {
      // Tag-based and time-based revalidation are mutually exclusive
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
