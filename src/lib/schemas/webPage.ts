import type { WebPage, WithContext } from 'schema-dts'

interface WebPageInput {
  url: string
  name: string
  description?: string
  /** ISO date the page first went live at this domain. */
  datePublished: string
  /** ISO date of the last substantive content change. */
  dateModified: string
  /**
   * CSS selectors for the sections best suited to being read aloud by
   * voice assistants (Speakable, plan item 5.6). Keep to 2-3 short,
   * self-contained regions: a heading and a summary, not whole pages.
   */
  speakableSelectors?: string[]
}

/**
 * Build a WebPage JSON-LD block carrying the freshness dates AI engines
 * look for on the page itself (v3 audit AEO-02: sitemap lastmod alone is
 * invisible to crawlers that process individual pages), plus optional
 * Speakable markup.
 *
 * Dates are manual constants at the call sites, same convention as
 * sitemap.ts. Update them when the page content substantively changes.
 */
export function buildWebPageSchema(page: WebPageInput): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    ...(page.description ? { description: page.description } : {}),
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    inLanguage: 'en-US',
    ...(page.speakableSelectors && page.speakableSelectors.length > 0
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: page.speakableSelectors,
          },
        }
      : {}),
  }
}
