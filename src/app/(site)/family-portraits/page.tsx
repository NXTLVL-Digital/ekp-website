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
import { buildBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { buildWebPageSchema } from '@/lib/schemas/webPage'

/**
 * This photo runs full width higher up the page as the featured image, so it
 * is filtered out of the gallery below to avoid showing it twice on one page.
 */
const FEATURED_IMAGE = '/images/families/EKP_1145.jpg'

/**
 * These frames run as standalone editorial moments between the text sections
 * and follow the same rule: filtered out of the gallery so no photograph
 * appears twice on the page.
 */
const EDITORIAL_MOMENTS = {
  session: {
    src: '/images/families/EKP_1211.jpg',
    alt: 'Family portrait in warm evening light',
  },
  heirloom: {
    src: '/images/families/EKP_1477.jpg',
    alt: 'Multi-generational family portrait at a country cabin',
  },
}

const shownElsewhere = new Set<string>([
  FEATURED_IMAGE,
  ...Object.values(EDITORIAL_MOMENTS).map((image) => image.src),
])

const galleryImages = familyGalleryImages.filter(
  (image) => !shownElsewhere.has(image.asset.url ?? '')
)

export const metadata: Metadata = {
  title: 'Family Portraits',
  description:
    'Relaxed, editorial family portraits in South-Central Virginia. Sessions for every generation, newborns to grandparents, finished as framed artwork and heirloom albums.',
  openGraph: {
    title: 'Family Portraits | Emily Kathryn Photography',
    description:
      'Relaxed, editorial family portraits in South-Central Virginia. Sessions for every generation, newborns to grandparents, finished as framed artwork and albums.',
    url: 'https://emilykathryn.com/family-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/family-portraits.jpg', width: 1200, height: 630, alt: 'Family portrait session by Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Portraits | Emily Kathryn Photography',
    description: 'Relaxed, editorial family portraits in South-Central Virginia, finished as prints and albums.',
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
      "There\u2019s no stage worth waiting for. I photograph brand-new babies, busy toddlers, moody teenagers, and grandparents, sometimes all in the same session. The right time is whenever you can get everyone together.",
  },
  {
    question: 'Can we bring our pets?',
    answer:
      "Yes, pets are family and they\u2019re always welcome. Whether it\u2019s a golden retriever who steals the show or a cat who tolerates exactly one photo, we\u2019ll make it work. Bring a helper if you can, so someone can take the dog once its part is done.",
  },
  {
    question: 'What should we wear?',
    answer:
      "Coordinate, don\u2019t match. Pick two or three colors that sit well together and let everyone dress like themselves within that range: soft neutrals, earthy tones, muted blues and greens. Skip big logos and neon brights. And if you\u2019re second-guessing anything, send me outfit photos beforehand and I\u2019ll happily weigh in.",
  },
  {
    question: "What if my kids won\u2019t cooperate?",
    answer:
      "This is the number-one worry parents bring me, and it\u2019s completely normal. I\u2019ve photographed hundreds of families, and I know how to work with kids of every temperament. We\u2019ll keep things playful, take breaks when somebody needs one, and let the giggly moments happen between the planned ones. Those are usually the photos families end up framing anyway.",
  },
  {
    question: 'How long is a family session?',
    answer:
      "Most family sessions run about 45 minutes to an hour. That\u2019s enough time for real variety without anyone burning out, especially the little ones. If you have a big family or want extended-family groupings, we\u2019ll plan a bit more time.",
  },
  {
    question: 'When is the right time of year for family photos?',
    answer:
      "Virginia gives you something in every season, but early fall and spring book heaviest: October color in one, dogwood and soft green in the other. I schedule sessions in the hour before sunset, when the light is warm and flattering. Fall weekends fill months ahead, so reach out early.",
  },
  {
    question: 'Do you help us choose wall art sizes and framing?',
    answer:
      "Yes, always. At your ordering appointment we look at the finished gallery together and talk through the room the portraits are headed for: above the mantel, along the stairway, the big empty spot at the lake house. I\u2019ll recommend sizes, framing, and groupings to fit the space, and if you bring a photo of the wall, I\u2019ll show you exactly what works.",
  },
  {
    question: 'What does a family session cost?',
    answer:
      "Family sessions begin at $899, and most families end up between $1,800 and $3,500 all in once they\u2019ve chosen framed pieces, an album, and their digital files. You choose after you\u2019ve seen the finished gallery, so what you spend comes down to what you want in your home.",
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

  return (
    <>
      <JsonLd data={buildServiceSchema({
        name: 'Family Portrait Photography',
        description: 'Relaxed, joyful family portrait photography in South-Central Virginia.',
        url: 'https://emilykathryn.com/family-portraits',
      })} />
      <JsonLd data={buildFaqPageSchema(familyFaqs)} />
      <JsonLd
        data={buildWebPageSchema({
          url: 'https://emilykathryn.com/family-portraits',
          name: 'Family Portraits | Emily Kathryn Photography',
          datePublished: '2026-07-31',
          dateModified: '2026-07-31',
          speakableSelectors: ['h1'],
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: 'https://emilykathryn.com' },
          { name: 'Family Portraits', url: 'https://emilykathryn.com/family-portraits' },
        ])}
      />
      {/* Review JSON-LD lives on /raves only (quote-only, SD-06). The visible
          testimonial carousel below is unaffected. */}

      {/* Editorial page header */}
      <section className="relative overflow-hidden bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Services</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Family Portraits
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Warm, guided sessions for every generation of your family. No
              stiff rows, no forced smiles.
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
            src={FEATURED_IMAGE}
            alt="Family portrait session by Emily Kathryn Photography"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Session description: text left, tall editorial frame right */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
            <div className="md:col-span-5 md:pr-12 md:pt-10">
              <span className="editorial-label text-brand-gold">The Experience</span>
              <h2 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                The Family Session
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Family sessions are all about connection. I photograph the way
                  your toddler reaches for your hand, the look your kids trade when
                  they think nobody&apos;s watching, and the way the whole group
                  softens on the rare day everyone is actually together.
                </p>
                <p>
                  We&apos;ll meet in the hour before sunset, when the light
                  turns warm and forgiving, at a place that means something to
                  you: the Chatham countryside, a garden, the dock at Smith
                  Mountain Lake, your own backyard. Sessions run about 45
                  minutes to an hour, enough time for real variety without
                  anyone hitting a meltdown.
                </p>
              </div>
            </div>

            <div className="editorial-image-hover relative md:col-span-6 md:col-start-7 md:-mt-14">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={EDITORIAL_MOMENTS.session.src}
                  alt={EDITORIAL_MOMENTS.session.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Pull quote: the breath between the session and the wall it ends up on */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                Portraits made to hang above the mantel, not sit forgotten in a
                folder on someone&apos;s phone.
              </blockquote>
              <figcaption className="editorial-label mt-8 text-white/40">
                Emily Kathryn
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* After the session: image left, text right, reversed from above */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-0">
            <div className="editorial-image-hover relative order-1 md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={EDITORIAL_MOMENTS.heirloom.src}
                  alt={EDITORIAL_MOMENTS.heirloom.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="order-2 md:col-span-5 md:col-start-8">
              <span className="editorial-label text-brand-gold">
                After the Session
              </span>
              <h2 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                What Lands on the Wall
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  I&apos;ll direct the whole session gently, mixing composed
                  groupings with the in-between moments where everyone forgets
                  the camera. Afterward we&apos;ll sit down together and decide
                  what the gallery becomes: a framed piece for the living room,
                  an album, a print for the grandparents. The digital files
                  come home with you too.
                </p>
                <p>
                  Family sessions begin at $899, and every decision after that
                  waits until the finished gallery is in front of you: the
                  sizes, the framing, the wall each piece is headed for.
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
            images={galleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </RevealOnScroll>
      </Section>

      {/* Pricing */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-lg px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mb-10 text-center">
              <span className="editorial-label text-brand-gold">Investment</span>
              <h2 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl">
                Your Investment
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <PricingCard
              name={familyTier?.name ?? 'Family Session'}
              startingAt={familyTier?.startingAt ?? 899}
              description={
                familyTier?.description ??
                'One guided session, finished properly: framed artwork, an heirloom album, and your digital files.'
              }
              features={
                familyTier?.features ?? [
                  'Guided session, 45 to 60 minutes',
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
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ: editorial rail left, answers right */}
      <Section spacing="wide">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <RevealOnScroll variant="up" className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <span className="editorial-label text-brand-gold">FAQ</span>
              <h2 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                Common Questions
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                What to wear, what to do about the little ones, and when to
                book for the light you want.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex min-h-11 items-center gap-3"
              >
                <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                  Ask Me Anything Else
                </span>
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="up" className="md:col-span-7 md:col-start-6">
            <AnswerBlock items={familyFaqs} />
          </RevealOnScroll>
        </div>
      </Section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <Section spacing="wide" background="muted">
          <RevealOnScroll variant="up">
            <div className="mb-12 text-center">
              <span className="editorial-label text-brand-gold">In Their Words</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                From Families I&apos;ve Photographed
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
                One Afternoon, Everyone Together
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Rounding everyone up is the hard part. The rest is my job. Tell
                me who&apos;s coming and the kind of session you&apos;re
                imagining, and I&apos;ll plan an evening your family will
                actually enjoy, with the photographs to prove it.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex min-h-11 items-center gap-3"
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
