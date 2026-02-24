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
import { GalleryClient } from '@/components/shared/GalleryClient'
import { JsonLd } from '@/components/shared/JsonLd'
import { homepageGalleryImages } from '@/lib/placeholder-galleries'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData as ReviewTestimonialData } from '@/lib/schemas/review'

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
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Emily Kathryn Photography — editorial senior portraits and family photography in South-Central Virginia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial-style senior portrait and family photography in South-Central Virginia.',
    images: ['/og/default.jpg'],
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

  /* --- JSON-LD structured data: Review schemas when testimonials exist --- */
  const reviewTestimonialData: ReviewTestimonialData[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({ name: t.name, quote: t.quote, service: t.service }))
      : []
  const reviewSchemas =
    reviewTestimonialData.length > 0 ? buildReviewSchemas(reviewTestimonialData) : []

  return (
    <>
      {/* JSON-LD: Review schemas (conditional on testimonials) */}
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {reviewTestimonialData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(reviewTestimonialData)} />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 1. Hero — editorial first impression, gender-inclusive imagery     */}
      {/* ----------------------------------------------------------------- */}
      <Hero
        heading="Your Story. Beautifully Told."
        subheading="Senior and family portrait photography with an editorial edge — relaxed, authentic, and designed around you. Serving South-Central Virginia from Chatham to Lynchburg and everywhere in between."
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
            Whether you are celebrating a milestone or simply want to freeze
            this chapter exactly as it is, every session is a collaborative
            experience crafted around your story.
          </p>
        </div>
        <PortfolioPreview
          categories={[
            {
              title: 'Senior Portraits',
              href: '/senior-portraits',
              description:
                'Magazine-worthy sessions for guys and girls — bold, authentic, and nothing like the school photo. Your personality, your way.',
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
      {/* 3b. Featured Gallery — curated "best of" mix                      */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Recent Work
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A glimpse into what we create together — editorial senior portraits
            and heartfelt family sessions across South-Central Virginia.
          </p>
        </div>
        <GalleryClient
          images={homepageGalleryImages}
          displayStyle="masonry"
          priorityCount={0}
        />
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Mid-page CTA — reinforce conversion action                     */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted">
        <HomeCTA
          heading="Ready to Book Your Session?"
          body="Tell us a little about yourself and the session you have in mind. Emily will personally get back to you within 48 hours to start planning — no pressure, just a conversation."
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
              Nothing means more than hearing how a session made someone feel.
              Here is what a few of our families and seniors had to say.
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
