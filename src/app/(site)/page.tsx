import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  TESTIMONIALS_QUERY,
  ACTIVE_SCARCITY_CUE_QUERY,
} from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { ScarcityCue } from '@/components/shared/ScarcityCue'
import { Hero } from '@/components/home/Hero'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { HomeCTA } from '@/components/home/HomeCTA'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'

// ---------------------------------------------------------------------------
// Types for CMS data
// ---------------------------------------------------------------------------

interface TestimonialData {
  _id: string
  name: string
  quote: string
  service?: string
  featured?: boolean
  image?: TestimonialImage
}

interface ScarcityCueData {
  _id: string
  message: string
  isActive: boolean
  expiresAt?: string
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Emily Kathryn Photography | Senior & Family Portraits',
  description:
    'Editorial-style senior portrait and family photography in South-Central Virginia. Serving Chatham, Danville, Lynchburg, Smith Mountain Lake, and beyond.',
  openGraph: {
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial-style senior portrait and family photography in South-Central Virginia. Serving Chatham, Danville, Lynchburg, Smith Mountain Lake, and beyond.',
    url: 'https://emilykathryn.com',
    siteName: 'Emily Kathryn Photography',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial-style senior portrait and family photography in South-Central Virginia.',
  },
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  // Fetch testimonials and scarcity cue in parallel from Sanity
  const [testimonials, scarcityCue] = await Promise.all([
    sanityFetch<TestimonialData[]>({
      query: TESTIMONIALS_QUERY,
      params: { featured: true, service: null },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCueData | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* 1. Hero — editorial first impression, gender-inclusive imagery     */}
      {/* ----------------------------------------------------------------- */}
      <Hero
        heading="Your Story. Your Session. Your Moment."
        subheading="Editorial-style senior and family portrait photography in South-Central Virginia. Every session is designed to feel like a magazine shoot — relaxed, authentic, and uniquely you."
        ctaLabel="Inquire for Detailed Pricing"
        ctaHref="/contact"
      />

      {/* ----------------------------------------------------------------- */}
      {/* 2. Scarcity Cue — conditional render from CMS                     */}
      {/* ----------------------------------------------------------------- */}
      {scarcityCue && (
        <Section>
          <ScarcityCue
            message={scarcityCue.message}
            isActive={scarcityCue.isActive}
          />
        </Section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. Portfolio Preview — session type categories                     */}
      {/* ----------------------------------------------------------------- */}
      <Section>
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            What We Create Together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Whether it is celebrating a milestone or capturing your family just
            as you are, every session is a collaborative experience crafted
            around your story.
          </p>
        </div>
        <PortfolioPreview
          categories={[
            {
              title: 'Senior Portraits',
              href: '/senior-portraits',
              description:
                'Editorial-style sessions for guys and girls — bold, authentic, and nothing like the school photo. Your personality, your way.',
            },
            {
              title: 'Family Portraits',
              href: '/family-portraits',
              description:
                'Natural, relaxed sessions that capture your family exactly as you are — the laughter, the connections, the moments that matter.',
            },
          ]}
        />
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Mid-page CTA — reinforce conversion action                     */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted">
        <HomeCTA
          heading="Ready to Book Your Session?"
          body="Let us know a little about yourself and what you are looking for. We will be in touch within 48 hours to start planning your session — no pressure, just a conversation."
          ctaLabel="Get in Touch"
          ctaHref="/contact"
        />
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. Testimonials — client social proof from CMS                    */}
      {/* ----------------------------------------------------------------- */}
      {testimonials && testimonials.length > 0 && (
        <Section>
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              What Our Clients Are Saying
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Nothing means more than hearing how much our families love their
              photos. Here is what a few of them had to say.
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </Section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 6. Bottom CTA — final conversion nudge                            */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Let&apos;s Create Something Beautiful
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Your story deserves to be told beautifully. Reach out and let us
            start planning a session that feels like you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center text-sm tracking-wide text-brand-gold transition-colors hover:text-brand-gold-dark"
          >
            Get in Touch &rarr;
          </Link>
        </div>
      </Section>
    </>
  )
}
