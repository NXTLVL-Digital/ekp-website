import type { Person, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

/**
 * Canonical @id for Emily as a Person entity, exported so the business
 * schema can reference her as founder (plan item 3.2).
 */
export const PERSON_ID = `${siteConfig.url}/about#emily`

/**
 * Person JSON-LD for Emily, rendered on /about (v3 audit SD-02).
 *
 * E-E-A-T anchor: ties the human being to the business entity so search and
 * AI engines can attribute the work to a real, named photographer.
 *
 * Deliberately NO sameAs yet: the live Instagram/TikTok handles are still
 * unconfirmed (evidence points to @emilykathrynphotos while the site links
 * @emilykathrynphotography). Handles land in plan item 3.1 once Emily
 * confirms, and get added here and to the business block together.
 *
 * Address stays off per the service-area business rule: no street anywhere
 * in schema or UI.
 */
export function buildPersonSchema(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Emily Kathryn Walker',
    alternateName: 'Emily Kathryn',
    jobTitle: 'Portrait Photographer',
    worksFor: { '@id': BUSINESS_ID },
    url: `${siteConfig.url}/about`,
    image: `${siteConfig.url}/og/about.jpg`,
    knowsAbout: [
      'Senior Portrait Photography',
      'Family Portrait Photography',
      'Editorial Photography',
      'High School Senior Photography in Virginia',
    ],
    description:
      'Editorial senior portrait and family photographer based in Gretna, Virginia, serving Chatham, Danville, Lynchburg, Smith Mountain Lake, and the surrounding communities for more than a decade.',
  }
}
