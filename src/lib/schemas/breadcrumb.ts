import type { BreadcrumbList, WithContext } from 'schema-dts'

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Build a BreadcrumbList JSON-LD trail (v3 audit SD-07).
 *
 * The site is only two levels deep, so the win is SERP display (the path
 * shown under the title) and entity context for AI engines rather than
 * navigation. Used on city and service pages; journal posts are noindex
 * and skip it.
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
