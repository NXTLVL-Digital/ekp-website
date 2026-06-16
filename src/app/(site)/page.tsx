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
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { HomeCTA } from '@/components/home/HomeCTA'
import { GalleryClient } from '@/components/shared/GalleryClient'
import { JsonLd } from '@/components/shared/JsonLd'
import Image from 'next/image'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { homepageGalleryImages } from '@/lib/placeholder-galleries'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData as ReviewTestimonialData } from '@/lib/schemas/review'
import { Marquee } from '@/components/home/Marquee'
import { FeatureCard } from '@/components/home/FeatureCard'
import { SeniorServiceSection } from '@/components/home/SeniorServiceSection'
import { FamilyServiceSection } from '@/components/home/FamilyServiceSection'

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
    'Editorial-style senior portrait and family photography in South-Central Virginia, with heirloom albums, wall art, and printed portrait products designed to stay in the family.',
  openGraph: {
    title: 'Emily Kathryn Photography | Senior & Family Portraits',
    description:
      'Editorial-style senior portrait and family photography in South-Central Virginia, with heirloom albums, wall art, and printed portrait products designed to stay in the family.',
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
        issueLabel="Editorial Heirloom Issue · Spring/Summer 2026"
        heading="Portraits made to live with your family."
        subheading="Editorial senior and family photography for South-Central Virginia families who want more than digitals — printed portraits, albums, and wall art designed for desks, walls, and the people who come after us."
        ctaLabel="Inquire for the Heirloom Guide"
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
      {/* 3. Marquee — themes of editorial heirloom                       */}
      {/* ----------------------------------------------------------------- */}
      <Marquee
        items={[
          { text: 'Senior Portraits', highlight: false },
          { text: 'Family Portraits', highlight: false },
          { text: 'Printed Albums', highlight: true },
          { text: 'Wall Art', highlight: false },
          { text: 'South-Central Virginia', highlight: true },
          { text: 'Heirloom Products', highlight: true },
        ]}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 4. FeatureCard grid — heirloom products focus                   */}
      {/* ----------------------------------------------------------------- */}
      <Section background="muted" spacing="none" className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              number="01"
              title="Senior Portraits"
              description="Magazine-worthy senior sessions with guided planning, personal style, and final portraits made to become framed artwork, albums, and keepsakes."
              image="/placeholder/senior-1.jpeg"
              alt="Senior portrait session"
              ctaText="Inquire for the full guide"
              ctaHref="/senior-portraits"
            />
            <FeatureCard
              number="02"
              title="Investment"
              description="A product-led portrait experience centered on albums, wall art, and printed pieces your family can see, touch, display, and pass down."
              image="/placeholder/gallery-2.jpeg"
              alt="Portrait artwork from Emily Kathryn Photography"
              ctaText="View pricing guide"
              ctaHref="/investment"
            />
            <FeatureCard
              number="03"
              title="Family Portraits"
              description="Warm, relaxed family portraits created for the walls, shelves, and albums that keep this chapter close long after the season changes."
              image="/placeholder/family-1.jpeg"
              alt="Family portrait session"
              ctaText="View family portfolio"
              ctaHref="/family-portraits"
            />
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. Senior Service Section                                       */}
      {/* ----------------------------------------------------------------- */}
      <SeniorServiceSection />

      {/* ----------------------------------------------------------------- */}
      {/* 6. Family Service Section                                       */}
      {/* ----------------------------------------------------------------- */}
      <FamilyServiceSection />

      {/* ----------------------------------------------------------------- */}
      {/* 7. GalleryClient portfolio section using homepageGalleryImages  */}
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
      {/* 8. Dark pull quote about albums/printed portraits               */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-30" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="fade">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light italic leading-snug text-white md:text-4xl lg:text-5xl">
                &ldquo;The goal is not a folder of files. The goal is the album on the coffee table, the portrait on the wall, and the memory your family keeps reaching for.&rdquo;
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
      {/* 9. Meet Emily section using /placeholder/emily.jpeg             */}
      {/* ----------------------------------------------------------------- */}
      <Section>
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-[800px] text-center">
            <span className="editorial-label text-brand-gold">The Photographer</span>
            <h2 className="mt-4 font-heading text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
              Meet Emily
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Emily Kathryn creates editorial-style senior and family portraits in South-Central Virginia with a calm, guided process from planning through printed products. The experience is built for families who want portraits they can hold, display, and keep — not images that disappear into a camera roll.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3"
            >
              <span className="editorial-label text-brand-gold transition-colors duration-300 group-hover:text-foreground">
                Read the full story
              </span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
        <div className="mt-16 overflow-hidden rounded-sm">
          <div className="relative aspect-[16/9]">
            <Image
              src="/placeholder/emily.jpeg"
              alt="Emily Kathryn - Photographer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 10. HomeCTA product/guide inquiry                               */}
      {/* ----------------------------------------------------------------- */}
      <Section>
        <RevealOnScroll variant="up">
          <HomeCTA
            heading="Ready to design the pieces your family keeps?"
            body="Tell us about your senior, your family, and the walls, albums, or framed pieces you are dreaming about. Emily will follow up with the next step and the full experience guide."
            ctaLabel="Start the Conversation"
            ctaHref="/contact"
          />
        </RevealOnScroll>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/* 11. Testimonials if present                                     */}
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
      {/* 12. Bottom CTA — Link /contact                                 */}
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
                Your story deserves more than a download link. Reach out and let us
                start planning portraits that become part of your home.
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
