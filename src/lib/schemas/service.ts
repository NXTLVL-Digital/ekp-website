import type { Service, WithContext } from 'schema-dts'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'
import { siteConfig } from '@/lib/siteConfig'
import type { CityGeoData } from '@/lib/cityData'

interface ServiceInput {
  name: string
  description: string
  url: string
  image?: string
}

/**
 * Build a Service JSON-LD schema linked to the parent LocalBusiness via @id.
 *
 * Used on Senior Portraits and Family Portraits pages (SEO-02).
 * The `provider` field references BUSINESS_ID to create a connected
 * knowledge graph between the service and the business entity.
 */
export function buildServiceSchema(service: ServiceInput): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}/#service`,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'State', name: 'Virginia' },
    serviceType: service.name,
    ...(service.image ? { image: service.image } : {}),
  }
}

/**
 * Build the city-page Service JSON-LD.
 *
 * This replaces the old per-city ProfessionalService block (v3 audit SD-04):
 * every city page used to emit a second business entity with its own @id
 * next to the sitewide one from the layout, leaving two near-identical
 * businesses on every city page. City pages now describe a Service offered
 * by THE business (provider -> #business), and the city specificity lives
 * where schema.org wants it: areaServed as a City with geo coordinates.
 * One business entity sitewide, seven localized services.
 */
export function buildCityServiceSchema(city: CityGeoData): WithContext<Service> {
  const url = `${siteConfig.url}/${city.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/#service`,
    name: `Senior & Family Portrait Photography in ${city.name}, Virginia`,
    description: `Editorial senior portraits and family photography for ${city.name}, Virginia by Emily Kathryn Photography.`,
    url,
    provider: { '@id': BUSINESS_ID },
    serviceType: 'Portrait Photography',
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Virginia' },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.latitude,
        longitude: city.longitude,
      },
    },
  }
}
