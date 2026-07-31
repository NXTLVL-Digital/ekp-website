import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { PricingCard } from '@/components/shared/PricingCard'
import { AnswerBlock } from '@/components/shared/AnswerBlock'
import { ScarcityCue } from '@/components/shared/ScarcityCue'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { GalleryClient } from '@/components/shared/GalleryClient'
import { JsonLd } from '@/components/shared/JsonLd'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { familyGalleryImages } from '@/lib/placeholder-galleries'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  PRICING_TIERS_QUERY,
  TESTIMONIALS_QUERY,
  ACTIVE_SCARCITY_CUE_QUERY,
} from '@/sanity/lib/queries'
import { buildServiceSchema } from '@/lib/schemas/service'
import { buildFaqPageSchema } from '@/lib/schemas/faqPage'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData } from '@/lib/schemas/review'

export const metadata: Metadata = {
  title: 'Family Portraits',
  description:
    'Relaxed, editorial family portraits in South-Central Virginia. Sessions for every generation — newborns to grandparents — finished as framed wall art and heirloom albums.',
  openGraph: {
    title: 'Family Portraits | Emily Kathryn Photography',
    description:
      'Relaxed, editorial family portraits in South-Central Virginia. Sessions for every generation — newborns to grandparents — finished as wall art and albums.',
    url: 'https://emilykathryn.com/family-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/family-portraits.jpg', width: 1200, height: 630, alt: 'Family portrait session by Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Portraits | Emily Kathryn Photography',
    description: 'Relaxed, editorial family portraits in South-Central Virginia, finished as wall art and albums.',
    images: ['/og/family-portraits.jpg'],
  },
}

interface PricingTier {
  _id: string
  name: string
  startingAt: number
  description: string
  features: string[]
  highlight: boolean
  sortOrder: number
}

interface ScarcityCueData {
  _id: string
  message: string
  isActive: boolean
  expiresAt?: string
}

const familyFaqs = [
  {
    question: 'When is the right age for family portraits?',
    answer:
      "There\u2019s no stage worth waiting for \u2014 every one of them is worth photographing. I work with brand-new babies, energetic toddlers, moody teenagers, and adoring grandparents, sometimes all in the same session. The right time is whenever you can get everyone together.",
  },
  {
    question: 'Can we bring our pets?',
    answer:
      "Yes \u2014 pets are family, and they\u2019re always welcome. Whether it\u2019s a golden retriever who steals the show or a cat who tolerates exactly one photo, we\u2019ll make it work. I just recommend having a helper on hand in case your furry friend needs a break.",
  },
  {
    question: 'What should we wear?',
    answer:
      "Coordinate, don\u2019t match. Pick a color palette of 2\u20133 complementary tones and let everyone express their own style within that range \u2014 soft neutrals, earthy tones, or muted jewel colors. Skip large logos and neon brights; they argue with a portrait once it\u2019s printed and framed. I\u2019m always happy to review outfit photos before your session.",
  },
  {
    question: "What if my kids won\u2019t cooperate?",
    answer:
      "This is the number-one worry parents bring me, and I promise \u2014 it\u2019s completely normal. I\u2019ve photographed hundreds of families, and I know how to work with kids of every temperament. We\u2019ll keep things playful, take breaks when needed, and let the genuine giggly moments happen between the composed ones \u2014 those usually end up being the portraits families frame.",
  },
  {
    question: 'How long is a family session?',
    answer:
      "Most family sessions run 45\u201360 minutes \u2014 enough time for real variety without anyone burning out, especially little ones. If you have a larger family or want to include extended family groupings, we can plan for a bit more time.",
  },
  {
    question: 'When is the right time of year for family photos?',
    answer:
      "Virginia gives you something in every season, but early fall (September\u2013October) and spring (April\u2013May) book heaviest \u2014 golden foliage in one, blossoms and soft green in the other. I schedule sessions during the hour before sunset, when the light is warm, flattering, and made for large prints. Fall weekends fill months ahead, so reach out early.",
  },
  {
    question: 'Do you help us choose wall art sizes and framing?',
    answer:
      "Yes \u2014 that happens at your ordering appointment, so nothing is left to guesswork. We view your finished gallery together, talk through the room the portraits are headed for \u2014 above the mantel, along the stairway, the big wall at the lake house \u2014 and I recommend sizes, framing, and groupings to fit the space. Bring a photo of the wall and I\u2019ll show you exactly what works.",
  },
  {
    question: 'What does a family session cost?',
    answer:
      "Family sessions begin at $899. Wall art, albums, and digital collections are chosen afterward at your ordering appointment, once you\u2019ve seen the finished portraits \u2014 so your investment reflects what you actually want on your walls.",
  },
]

export default async function FamilyPortraitsPage() {
  const [pricingTiers, testimonials, scarcityCue] = await Promise.all([
    sanityFetch<PricingTier[]>({
      query: PRICING_TIERS_QUERY,
      tags: ['pricingTier'],
    }),
    sanityFetch<Array<{ _id: string; name: string; quote: string; service?: string }>>({
      query: TESTIMONIALS_QUERY,
      params: { featured: null, service: 'family' },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCueData | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])

  const familyTier = pricingTiers?.find(
    (t) => t.name?.toLowerCase().includes('family'),
  )

  const testimonialData: TestimonialData[] = testimonials
    ? testimonials.map((t) => ({ name: t.name, quote: t.quote, service: t.service }))
    : []
  const reviewSchemas = testimonialData.length > 0 ? buildReviewSchemas(testimonialData) : []

  return (
    <>
      <JsonLd data={buildServiceSchema({
        name: 'Family Portrait Photography',
        description: 'Relaxed, joyful family portrait photography in South-Central Virginia.',
        url: 'https://emilykathryn.com/family-portraits',
      })} />
      <JsonLd data={buildFaqPageSchema(familyFaqs)} />
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {testimonialData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(testimonialData)} />
      )}

      {/* Editorial page header */}
      <section className="relative overflow-hidden bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Services</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Family Portraits
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Warm, guided sessions for every generation of your family. No stiff
              rows, no forced smiles &mdash; portraits made to hang above the
              mantel, not sit forgotten in a folder on someone&apos;s phone.
            </p>
          </div>
        </div>
      </section>

      {/* Scarcity cue */}
      {scarcityCue && (
        <ScarcityCue message={scarcityCue.message} isActive={scarcityCue.isActive} />
      )}

      {/* Featured image */}
      <div className="editorial-image-hover relative">
        <div className="relative h-72 sm:h-96 md:h-[500px]">
          <Image
            src="/images/families/EKP_1145.jpg"
            alt="Family portrait session by Emily Kathryn Photography"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Session description */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="editorial-label text-brand-gold">The Experience</span>
              <h2 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                The Family Session
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Family sessions are all about connection. I photograph the way
                  your toddler reaches for your hand, the look your kids trade when
                  they think nobody&apos;s watching, and the way the whole group
                  softens on the rare day everyone is actually together.
                </p>
                <p>
                  We&apos;ll meet in the hour before sunset &mdash; warm, forgiving
                  light &mdash; at a place that means something to you: the
                  countryside, a garden, the dock at the lake, your own backyard.
                  Sessions run 45&ndash;60 minutes, enough time for real variety
                  without anyone hitting a meltdown.
                </p>
                <p>
                  I&apos;ll direct the whole session gently, mixing composed family
                  groupings with the in-between moments where everyone forgets the
                  camera. Afterward, at your ordering appointment, we design what
                  the gallery becomes: the framed piece for above the mantel, an
                  heirloom album, one portrait for each of the kids to take home
                  someday &mdash; and the digital files come home with you too.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Family gallery */}
      <Section spacing="wide" background="muted">
        <RevealOnScroll variant="up">
          <div className="mb-12 text-center">
            <span className="editorial-label text-brand-gold">Portfolio</span>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              Family Portfolio
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          </div>
        </RevealOnScroll>
        <RevealOnScroll variant="scale">
          <GalleryClient
            images={familyGalleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </RevealOnScroll>
      </Section>

      {/* Pricing */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-lg">
            <div className="mb-10 text-center">
              <span className="editorial-label text-brand-gold">Investment</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                Your Investment
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <PricingCard
              name={familyTier?.name ?? 'Family Session'}
              startingAt={familyTier?.startingAt ?? 899}
              description={
                familyTier?.description ??
                'A guided family session finished the way it deserves \u2014 framed wall art, an heirloom album, and your digital files.'
              }
              features={
                familyTier?.features ?? [
                  '45\u201360 minute guided session',
                  'Outdoor location',
                  'Up to 6 family members',
                  'Professional retouching & online gallery',
                  'In-person ordering appointment',
                ]
              }
              highlight={familyTier?.highlight ?? true}
              ctaLabel="Inquire for Detailed Pricing"
              ctaHref="/contact"
            />
          </div>
        </RevealOnScroll>
      </Section>

      {/* FAQ */}
      <Section spacing="wide" background="muted">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <span className="editorial-label text-brand-gold">FAQ</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                Common Questions
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <AnswerBlock items={familyFaqs} />
          </div>
        </RevealOnScroll>
      </Section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <Section spacing="wide">
          <RevealOnScroll variant="up">
            <div className="mb-12 text-center">
              <span className="editorial-label text-brand-gold">Kind Words</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                What Our Families Are Saying
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="stagger">
            <TestimonialCarousel testimonials={testimonials} />
          </RevealOnScroll>
        </Section>
      )}

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Let&apos;s Plan Something Worth Framing
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Whole-family days are rare &mdash; and when yours comes, it deserves
                more than a phone photo no one ever prints. Tell me about your
                people and the wall you have in mind, and I&apos;ll design a
                session that ends in a frame.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Inquire Now
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
