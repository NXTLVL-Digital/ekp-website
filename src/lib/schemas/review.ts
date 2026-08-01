import type { Review, WithContext } from 'schema-dts'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

export interface TestimonialData {
  name: string
  quote: string
  service?: string
}

/**
 * Build quote-only Review JSON-LD entities from testimonial data.
 *
 * Deliberately NO reviewRating and NO AggregateRating anywhere in this file.
 * The testimonials are written quotes; nobody attached a star rating to
 * them, and schema that asserts ratings nobody gave is fabricated review
 * data (v3 audit, SD-06 - this file used to default every review to five
 * stars and emit a synthetic AggregateRating, armed to fire the moment the
 * CMS gained its first testimonial). Review without reviewRating is valid
 * schema.org and still gives search and AI engines named, attributed
 * social proof tied to the business entity.
 *
 * If real star ratings ever exist (a live Google Business Profile), build a
 * rating-bearing schema from THAT data source. Do not add defaults back
 * here.
 *
 * NOTE: Self-serving reviews on a business's own site are ineligible for
 * Google star snippets regardless. The value here is semantic: AI
 * assistants, voice search, and entity association via itemReviewed.
 */
export function buildReviewSchemas(
  testimonials: TestimonialData[],
): WithContext<Review>[] {
  return testimonials.map((t) => ({
    '@context': 'https://schema.org' as const,
    '@type': 'Review' as const,
    author: { '@type': 'Person' as const, name: t.name },
    reviewBody: t.quote,
    itemReviewed: { '@id': BUSINESS_ID },
  }))
}
