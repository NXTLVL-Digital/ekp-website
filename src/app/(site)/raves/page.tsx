import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { JsonLd } from '@/components/shared/JsonLd'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import type { Metadata } from 'next'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData } from '@/lib/schemas/review'

export const metadata: Metadata = {
  title: 'Raves',
  description:
    'Hear what clients are saying about their experience with Emily Kathryn Photography. Real reviews from seniors and families in South-Central Virginia.',
  openGraph: {
    title: 'Raves | Emily Kathryn Photography',
    description: 'Hear what clients are saying about their portrait experience with Emily Kathryn Photography.',
    url: 'https://emilykathryn.com/raves',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/raves.jpg', width: 1200, height: 630, alt: 'Client testimonials — Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raves | Emily Kathryn Photography',
    description: 'Hear what clients are saying about their portrait experience.',
    images: ['/og/raves.jpg'],
  },
}

interface Testimonial {
  _id: string
  name: string
  quote: string
  service?: string
  featured?: boolean
  image?: TestimonialImage
}

export default async function RavesPage() {
  const testimonials = await sanityFetch<Testimonial[]>({
    query: TESTIMONIALS_QUERY,
    params: { featured: null, service: null },
    tags: ['testimonial'],
  })

  const reviewData: TestimonialData[] = testimonials.map((t) => ({
    name: t.name,
    quote: t.quote,
    service: t.service,
  }))
  const reviewSchemas = reviewData.length > 0 ? buildReviewSchemas(reviewData) : []

  return (
    <>
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {reviewData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(reviewData)} />
      )}

      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Testimonials</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Kind Words
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Nothing means more to me than knowing my clients walk away from
              their session feeling confident, celebrated, and genuinely thrilled
              with their images. These are their words, not mine.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <Section spacing="wide">
        {testimonials.length > 0 ? (
          <RevealOnScroll variant="stagger">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  name={testimonial.name}
                  quote={testimonial.quote}
                  service={testimonial.service}
                  image={testimonial.image}
                />
              ))}
            </div>
          </RevealOnScroll>
        ) : (
          <div className="py-12 text-center">
            <p className="font-heading text-xl text-muted-foreground">
              Testimonials coming soon
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We are collecting kind words from our amazing clients. Check back soon!
            </p>
          </div>
        )}
      </Section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Ready to Have Your Own Experience?
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Every session is designed to be relaxed, fun, and uniquely you.
                Let&apos;s talk about creating something you will rave about too.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Book Your Session
                </span>
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
