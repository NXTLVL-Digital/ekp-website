import type { FAQPage, WithContext } from 'schema-dts'

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Build a FAQPage JSON-LD schema from an array of question/answer pairs.
 *
 * Used on Senior Portraits and Family Portraits pages (SEO-03).
 *
 * NOTE: Google restricted FAQPage rich results to authoritative gov/health
 * sites in August 2023. The schema still provides semantic value for AI
 * assistants, voice search, and non-Google surfaces. Speakable markup is
 * intentionally omitted — it is beta-only for US-English news publishers
 * and may be discontinued.
 */
export function buildFaqPageSchema(faqs: FaqItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
  }
}
