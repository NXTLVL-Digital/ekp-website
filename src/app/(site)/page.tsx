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
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
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

  const reviewTestimonialData: ReviewTestimonialData[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({ name: t.name, quote: t.quote, service: t.service }))
      : []
  const reviewSchemas =
    reviewTestimonialData.length > 0 ? buildReviewSchemas(reviewTestimonialData) : []

  return (
    <>
      {/* JSON-LD */}
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {reviewTestimonialData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(reviewTestimonialData)} />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 1. Hero — full-viewport editorial impact                          */}
      {/* ----------------------------------------------------------------- */}
      <Hero
        heading="Your Story. Beautifully Told."
        subheading="Editorial portrait photography with a magazine edge — relaxed, authentic, and designed around you. Serving South-Central Virginia from Chatham to Lynchburg and everywhere in between."
        ctaLabel="Inquire for Detailed Pricing"
        ctaHref="/contact"
      />

      {/* ----------------------------------------------------------------- */}
      {/* 2. Scarcity Cue — full-width dark bar                             */}
      {/* ----------------------------------------------------------------- */}
      {scarcityCue && (
        <ScarcityCue
          message={scarcityCue.message}
          isActive={scarcityCue.isActive}
        />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. Editorial Introduction                                         */}
      {/* ----------------------------------------------------------------- */}
      <Section>
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">The Experience</span>
            <h2 className="mt-4 font-heading text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
              What We Create Together
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Whether you are celebrating a milestone or simply want to freeze
              this chapter exactly as it is, every session is a collaborative
              experience crafted around your story.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. Portfolio Preview — editorial magazine spreads                  */}
      {/* ----------------------------------------------------------------- */}
      <Section spacing="none" className="pb-[var(--spacing-section)]">
        <RevealOnScroll variant="up">
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
        </RevealOnScroll>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. Editorial Pull Quote — dramatic dark section                   */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        {/* Subtle hex pattern */}
        <div className="pattern-hex absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="fade">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light italic leading-snug text-white md:text-4xl lg:text-5xl">
                &ldquo;Every session should feel like a magazine shoot &mdash;
                not stiff, not rushed, not generic.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-6 bg-brand-gold" />
                <span className="editorial-label text-brand-gold">
                  Emily Kathryn
                </span>
                <div className="h-px w-6 bg-brand-gold" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 6. Featured Gallery — curated "best of" mix                       */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted">
        <RevealOnScroll variant="up">
          <div className="mb-12 text-center">
            <span className="editorial-label text-brand-gold">Portfolio</span>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              Recent Work
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-5 text-sm text-muted-foreground md:text-base">
              A glimpse into what we create together — editorial senior portraits
              and heartfelt family sessions across South-Central Virginia.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll variant="scale">
          <GalleryClient
            images={homepageGalleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </RevealOnScroll>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 7. Mid-page CTA                                                   */}
      {/* ----------------------------------------------------------------- */}
      <Section>
        <RevealOnScroll variant="up">
          <HomeCTA
            heading="Ready to Book Your Session?"
            body="Tell us a little about yourself and the session you have in mind. Emily will personally get back to you within 48 hours to start planning — no pressure, just a conversation."
            ctaLabel="Get in Touch"
            ctaHref="/contact"
          />
        </RevealOnScroll>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 8. Testimonials — editorial layout                                */}
      {/* ----------------------------------------------------------------- */}
      {testimonials && testimonials.length > 0 && (
        <section className="border-t border-border bg-muted">
          <div className="mx-auto max-w-[1400px] px-6 py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)] lg:px-10">
            <RevealOnScroll variant="up">
              <div className="mb-12 text-center">
                <span className="editorial-label text-brand-gold">Kind Words</span>
                <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                  What Our Clients Are Saying
                </h2>
                <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="stagger">
              <TestimonialCarousel testimonials={testimonials} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 9. Bottom CTA — elegant final conversion nudge                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Let&apos;s Create Something Beautiful
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Your story deserves to be told beautifully. Reach out and let us
                start planning a session that feels like you.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Get in Touch
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
