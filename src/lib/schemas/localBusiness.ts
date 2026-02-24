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
 * NOTE: The address is included for GBP verification and proximity ranking
 * per SAB guidelines — it is NOT displayed in the UI.
 */
export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: [
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
    image: `${siteConfig.url}/og/default.jpg`,
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
