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
  // Absolute title: opts out of the root layout's "%s | Emily Kathryn Photography"
  // template so the brand appears exactly once on the homepage.
  title: {
    absolute: 'Emily Kathryn Photography | Senior & Family Portraits',
  },
  description:
    'Editorial senior and family portraits across South-Central Virginia. Guided sessions in Chatham, Danville, Lynchburg, and Smith Mountain Lake, finished as framed prints and albums.',
  openGraph: {
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial senior and family portraits across South-Central Virginia. Guided sessions in Chatham, Danville, Lynchburg, and Smith Mountain Lake, finished as framed prints and albums.',
    url: 'https://emilykathryn.com',
    siteName: 'Emily Kathryn Photography',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Emily Kathryn Photography, editorial senior portraits and family photography in South-Central Virginia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial senior and family portraits, made in South-Central Virginia and finished as framed prints and albums.',
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
        heading="Portraits made for the wall, not the phone."
        subheading="Guided senior and family portraits across South-Central Virginia. Planned with you from the first conversation, photographed anywhere from Chatham to Smith Mountain Lake, and finished as artwork your family will keep."
        ctaLabel="Inquire About Your Session"
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
              Portraits That Hold Up
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Every session is planned with you and guided from start to
              finish. Outfits, locations, the light, the little details
              you&apos;d never think to ask about. On the day, you just show up
              and be yourself. Emily handles the rest.
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
                  "Editorial sessions for guys and girls. A magazine spread, not a yearbook page. You're directed the whole time, so you end up looking like yourself on a really good day.",
              },
              {
                title: 'Family Portraits',
                href: '/family-portraits',
                description:
                  'Relaxed, guided sessions that photograph your family the way you actually are. The laughter, the leaning in, the in-between moments nobody planned.',
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
                &ldquo;A portrait isn&apos;t finished until it&apos;s hanging
                on your wall.&rdquo;
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
      {/* 6. Featured Gallery — curated recent-work mix                     */}
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
              Recent sessions from across South-Central Virginia. Seniors,
              families, and the places that make this region worth
              photographing.
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
            heading="Start With a Conversation"
            body="Tell Emily about your senior, your family, and the session you have in mind. She'll read it herself and get back to you within 48 hours, usually with a few questions about timing, style, and locations."
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
                <span className="editorial-label text-brand-gold">In Their Words</span>
                <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                  What Families Say Afterward
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
                Let&apos;s Plan Something Worth Keeping
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                You don&apos;t do this every day. Senior year won&apos;t wait,
                and family seasons move even faster. Tell Emily what
                you&apos;re picturing, and she&apos;ll take it from there.
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
