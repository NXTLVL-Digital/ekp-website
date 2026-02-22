import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { PricingCard } from '@/components/shared/PricingCard'
import { AnswerBlock } from '@/components/shared/AnswerBlock'
import { ScarcityCue } from '@/components/shared/ScarcityCue'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  PRICING_TIERS_QUERY,
  TESTIMONIALS_QUERY,
  ACTIVE_SCARCITY_CUE_QUERY,
} from '@/sanity/lib/queries'

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: 'Family Portraits',
  description:
    'Relaxed, joyful family portrait photography in South-Central Virginia. Sessions for all ages — from newborns to grandparents — capturing the connections that matter most.',
  openGraph: {
    title: 'Family Portraits | Emily Kathryn Photography',
    description:
      'Relaxed, joyful family portrait photography in South-Central Virginia. Sessions for all ages — from newborns to grandparents — capturing the connections that matter most.',
    url: 'https://emilykathryn.com/family-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [
      {
        url: '/og/family-portraits.jpg',
        width: 1200,
        height: 630,
        alt: 'Family portrait session by Emily Kathryn Photography in South-Central Virginia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Portraits | Emily Kathryn Photography',
    description:
      'Relaxed, joyful family portrait photography in South-Central Virginia. All ages welcome.',
    images: ['/og/family-portraits.jpg'],
  },
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Static Data                                                                */
/* -------------------------------------------------------------------------- */

const familyFaqs = [
  {
    question: 'What ages work best for family photos?',
    answer:
      "Every age is the best age. I photograph families with brand-new babies, energetic toddlers, moody teenagers, and adoring grandparents \u2014 sometimes all in the same session. There\u2019s no perfect stage to wait for, because every stage is worth capturing.",
  },
  {
    question: 'Can we bring our pets?',
    answer:
      "Absolutely! Pets are family, and they\u2019re always welcome. Whether it\u2019s a golden retriever who steals the show or a cat who tolerates exactly one photo, we\u2019ll make it work. I just recommend having a helper on hand in case your furry friend needs a break.",
  },
  {
    question: 'What should we wear?',
    answer:
      "The best approach is to coordinate, not match. Pick a color palette of 2\u20133 complementary tones and let everyone express their own style within that range. Think soft neutrals, earthy tones, or muted jewel colors. Avoid large logos and neon brights. I\u2019m always happy to review outfit photos before your session.",
  },
  {
    question: "What if my kids won\u2019t cooperate?",
    answer:
      "This is the number-one worry parents have, and I promise \u2014 it\u2019s completely normal. I\u2019ve photographed hundreds of families, and I know how to work with kids of every temperament. We\u2019ll keep things playful, take breaks when needed, and capture those genuine giggly moments that happen between the posed ones. Those end up being the favorites.",
  },
  {
    question: 'How long is a family session?',
    answer:
      "Most family sessions run 45\u201360 minutes, which is the sweet spot for getting beautiful variety without anyone burning out \u2014 especially little ones. If you have a larger family or want to include extended family groupings, we can plan for a bit more time.",
  },
  {
    question: 'When is the best time of year for family photos?',
    answer:
      "Virginia is gorgeous year-round, but the most popular seasons are early fall (September\u2013October) for golden foliage and spring (April\u2013May) for blossoms and soft green. I always schedule sessions during golden hour \u2014 the hour before sunset \u2014 when the light is warm, flattering, and absolutely magical.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function FamilyPortraitsPage() {
  /* --- data fetching (parallel) --- */
  const [pricingTiers, , scarcityCue] = await Promise.all([
    sanityFetch<PricingTier[]>({
      query: PRICING_TIERS_QUERY,
      tags: ['pricingTier'],
    }),
    sanityFetch<unknown[]>({
      query: TESTIMONIALS_QUERY,
      params: { featured: null, service: 'family' },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCueData | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])

  /* Find a family-specific pricing tier or fall back to placeholder */
  const familyTier = pricingTiers?.find(
    (t) => t.name?.toLowerCase().includes('family'),
  )

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  1. Hero Section                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-light md:text-5xl">
            Family Portraits
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Warm, relaxed sessions that capture the real connections between
            the people who matter most. No stiff posing, no forced smiles &mdash;
            just your family being beautifully, perfectly you.
          </p>
        </div>

        {/* Placeholder hero area -- Emily will replace with a featured family image from CMS */}
        <div className="mt-10 overflow-hidden rounded-lg bg-gradient-to-br from-brand-gold/10 via-muted to-brand-gold/5">
          <div className="flex h-64 items-center justify-center sm:h-80 md:h-96">
            <p className="text-sm text-muted-foreground">
              Featured family portrait image
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  2. Scarcity Cue (conditional)                                       */}
      {/* ------------------------------------------------------------------ */}
      {scarcityCue && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScarcityCue
            message={scarcityCue.message}
            isActive={scarcityCue.isActive}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  3. Session Description                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            The Family Session Experience
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Family sessions are all about connection. I want to capture the way
              your toddler reaches for your hand, the look your kids give each
              other when they think nobody&apos;s watching, and the way your whole
              family lights up when you&apos;re together.
            </p>
            <p>
              We&apos;ll meet at a beautiful outdoor location during golden hour
              &mdash; that warm, glowing light right before sunset that makes
              everyone look incredible. Sessions run 45&ndash;60 minutes, which
              is the perfect amount of time to get stunning variety without anyone
              hitting a meltdown. Kids of all ages welcome, including the
              four-legged ones.
            </p>
            <p>
              I&apos;ll guide you through relaxed poses and natural interactions,
              mixing structured family groupings with candid, playful moments.
              The result is a collection of portraits that feel authentic and warm
              &mdash; images you&apos;ll treasure for generations.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  4. NO Storyboard — Experience Storyboard is Senior-only (CONT-01)   */}
      {/* ------------------------------------------------------------------ */}

      {/* ------------------------------------------------------------------ */}
      {/*  5. Pricing Section                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-8 text-center font-heading text-3xl font-light md:text-4xl">
            Investment
          </h2>
          <PricingCard
            name={familyTier?.name ?? 'Family Session'}
            startingAt={familyTier?.startingAt ?? 400}
            description={
              familyTier?.description ??
              'A relaxed, joyful portrait session for your whole family.'
            }
            features={
              familyTier?.features ?? [
                '45\u201360 minute session',
                'Outdoor location',
                'Up to 6 family members',
                'Professional retouching',
                'Online gallery',
              ]
            }
            highlight={familyTier?.highlight ?? true}
            ctaLabel="Inquire for Detailed Pricing"
            ctaHref="/contact"
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  6. FAQ Section                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-3xl font-light md:text-4xl">
            Frequently Asked Questions
          </h2>
          <AnswerBlock items={familyFaqs} />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  7. Bottom CTA                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Let&apos;s Capture Your Family
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every family has a story worth telling beautifully. I would love to
            hear yours and create portraits that celebrate the wonderful,
            messy, perfectly imperfect people you love most.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Inquire Now
          </Link>
        </div>
      </Section>
    </>
  )
}
