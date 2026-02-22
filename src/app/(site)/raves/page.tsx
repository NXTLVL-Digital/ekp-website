import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raves',
  description:
    'Hear what clients are saying about their experience with Emily Kathryn Photography. Real reviews from seniors and families in South-Central Virginia.',
  openGraph: {
    title: 'Raves | Emily Kathryn Photography',
    description:
      'Hear what clients are saying about their experience with Emily Kathryn Photography.',
    url: 'https://emilykathryn.com/raves',
    siteName: 'Emily Kathryn Photography',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raves | Emily Kathryn Photography',
    description:
      'Hear what clients are saying about their experience with Emily Kathryn Photography.',
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

  return (
    <>
      {/* Heading section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-light md:text-5xl">
            Kind Words
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Nothing means more to me than knowing my clients walk away from
            their session feeling absolutely amazing. These are their words,
            not mine — and honestly, they make all the early mornings and
            late edits worth it.
          </p>
        </div>
      </Section>

      {/* Testimonials grid */}
      <Section background="muted">
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        ) : (
          <div className="py-12 text-center">
            <p className="font-heading text-xl text-muted-foreground">
              Testimonials coming soon
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We are collecting kind words from our amazing clients. Check
              back soon!
            </p>
          </div>
        )}
      </Section>

      {/* CTA section */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Ready to Have Your Own Experience?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every session is designed to be relaxed, fun, and uniquely you.
            Let&apos;s talk about creating something you will rave about too.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Book Your Session
          </Link>
        </div>
      </Section>
    </>
  )
}
