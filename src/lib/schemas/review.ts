import type { Review, LocalBusiness, WithContext } from 'schema-dts'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

export interface TestimonialData {
  name: string
  quote: string
  service?: string
}

/**
 * Build individual Review JSON-LD entities from testimonial data.
 *
 * Each review references the parent LocalBusiness via BUSINESS_ID and
 * defaults to a 5-star rating (hand-picked happy client testimonials).
 *
 * NOTE: Self-serving reviews on a business's own site are ineligible for
 * Google star snippets. Implemented for semantic value — AI assistants,
 * voice search, and non-Google surfaces (SEO-04).
 */
export function buildReviewSchemas(
  testimonials: TestimonialData[],
): WithContext<Review>[] {
  return testimonials.map((t) => ({
    '@context': 'https://schema.org' as const,
    '@type': 'Review' as const,
    author: { '@type': 'Person' as const, name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: 5,
      bestRating: 5,
    },
    itemReviewed: { '@id': BUSINESS_ID },
  }))
}

/**
 * Build an AggregateRating JSON-LD wrapped in a LocalBusiness entity.
 *
 * Returns a ProfessionalService with only @id and aggregateRating so
 * search engines merge it with the full LocalBusiness schema on the page.
 */
export function buildAggregateRatingSchema(
  testimonials: TestimonialData[],
): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5,
      reviewCount: testimonials.length,
      bestRating: 5,
    },
  }
}
