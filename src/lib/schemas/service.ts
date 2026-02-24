import type { Service, WithContext } from 'schema-dts'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

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
