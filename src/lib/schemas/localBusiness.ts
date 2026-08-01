import type { LocalBusiness, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'

/**
 * Canonical @id for the LocalBusiness entity. Exported so Service and Review
 * schemas can cross-reference the parent business without duplication.
 */
export const BUSINESS_ID = `${siteConfig.url}/#business`

/**
 * Build a ProfessionalService (subtype of LocalBusiness) JSON-LD schema
 * with full NAP data, areaServed, opening hours, and payment info.
 *
 * Rendered site-wide via the root layout so every page carries the
 * LocalBusiness structured data required by SEO-01.
 *
 * NOTE: Service-area business — the street address is intentionally omitted
 * everywhere (schema and UI). It is provided to Google privately during GBP
 * verification only. Locality/region/zip are published for local relevance.
 */
export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Gretna', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Chatham', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Danville', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Lynchburg', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Smith Mountain Lake', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Forest', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Altavista', containedInPlace: { '@type': 'State', name: 'Virginia' } },
      { '@type': 'City', name: 'Evington', containedInPlace: { '@type': 'State', name: 'Virginia' } },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$$',
    paymentAccepted: 'Cash, Credit Card, Venmo',
    logo: `${siteConfig.url}/brand/logo-primary.png`,
    // Representative work, not just the OG card: gives image search and AI
    // engines real portfolio pixels to associate with the entity.
    image: [
      `${siteConfig.url}/og/default.jpg`,
      `${siteConfig.url}/images/seniors/EKP_1337.jpg`,
      `${siteConfig.url}/images/seniors/EKP_2401.jpg`,
      `${siteConfig.url}/images/families/EKP_1211.jpg`,
    ],
    // Kept as a literal rather than importing PERSON_ID from person.ts:
    // person.ts already imports BUSINESS_ID from this file, and the founder
    // reference is not worth a module cycle. Keep in sync with person.ts.
    founder: { '@id': `${siteConfig.url}/about#emily` },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
    description:
      'Editorial-style senior portrait and family photographer serving South-Central Virginia.',
    knowsAbout: [
      'Senior Portrait Photography',
      'Family Portrait Photography',
      'Editorial Photography',
    ],
  }
}

/*
 * The old buildCityLocalBusinessSchema is gone on purpose (v3 audit SD-04):
 * it gave every city page a second business entity with its own @id next to
 * the sitewide one. City pages now emit buildCityServiceSchema from
 * service.ts instead: one business entity, seven localized services.
 */
