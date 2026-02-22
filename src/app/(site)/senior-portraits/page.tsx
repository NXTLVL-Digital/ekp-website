import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { Storyboard } from '@/components/shared/Storyboard'
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
  title: 'Senior Portraits',
  description:
    'Editorial-style senior portrait photography for boys and girls in South-Central Virginia. A magazine-worthy experience with style consultation, multiple outfits, and stunning locations.',
  openGraph: {
    title: 'Senior Portraits | Emily Kathryn Photography',
    description:
      'Editorial-style senior portrait photography for boys and girls in South-Central Virginia. A magazine-worthy experience with style consultation, multiple outfits, and stunning locations.',
    url: 'https://emilykathryn.com/senior-portraits',
    siteName: 'Emily Kathryn Photography',
    locale: 'en_US',
    type: 'website',
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

const storyboardSteps = [
  {
    number: 1,
    title: 'Consultation',
    description:
      "We'll chat about your vision, style, and what makes you you. This is where the magic starts.",
  },
  {
    number: 2,
    title: 'Wardrobe Planning',
    description:
      "I'll guide you through outfit selections, colors, and accessories that photograph beautifully.",
  },
  {
    number: 3,
    title: 'Session Day',
    description:
      "Relax and have fun \u2014 I'll direct every pose while you enjoy the experience.",
  },
  {
    number: 4,
    title: 'Gallery Reveal',
    description:
      "About 2\u20133 weeks later, we'll meet to view your stunning gallery together.",
  },
  {
    number: 5,
    title: 'Product Delivery',
    description:
      'Your custom wall art, albums, and digital images are delivered with care.',
  },
]

const seniorFaqs = [
  {
    question: 'When should I book my senior session?',
    answer:
      "The best time to book is 6\u201312 months before graduation. This gives us plenty of time for planning, wardrobe consultation, and scheduling the perfect golden-hour session. Spring and early fall fill up fast, so I recommend reaching out as soon as you know you're interested \u2014 even if graduation feels far away.",
  },
  {
    question: 'How many outfits can I bring?',
    answer:
      "Most seniors bring 3\u20135 outfits to get a beautiful variety of looks. I'll help you plan every detail during our wardrobe consultation \u2014 from casual and fun to dressy and editorial. Don't worry about choosing on your own; that's what the planning session is for.",
  },
  {
    question: 'Can I bring friends for a group session?',
    answer:
      "Absolutely! BFF and group sessions are some of the most fun we have. Bring your best friend, your squad, or even your teammates. We'll capture the real connection between you, plus everyone gets individual spotlight time too.",
  },
  {
    question: 'What locations do you shoot at?',
    answer:
      "I photograph throughout South-Central Virginia \u2014 from downtown Lynchburg's urban backdrops to rolling countryside and hidden garden spots. During our consultation, we'll choose locations that match your personality and the vibe you're going for. I know all the best light in the region.",
  },
  {
    question: 'How long until I see my photos?',
    answer:
      "Your professionally retouched gallery will be ready in about 2\u20133 weeks. We'll schedule a gallery reveal where you and your family can view the images together and choose your favorites for wall art, albums, and digital delivery.",
  },
  {
    question: 'Do you photograph senior boys?',
    answer:
      "Yes! Senior sessions are for everyone. I photograph boys and girls with the same editorial attention to detail. Guys get a relaxed, natural session with direction on posing that feels authentic \u2014 no awkward forced smiles. Your portraits will look magazine-worthy, I promise.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function SeniorPortraitsPage() {
  /* --- data fetching (parallel) --- */
  const [pricingTiers, , scarcityCue] = await Promise.all([
    sanityFetch<PricingTier[]>({
      query: PRICING_TIERS_QUERY,
      tags: ['pricingTier'],
    }),
    sanityFetch<unknown[]>({
      query: TESTIMONIALS_QUERY,
      params: { featured: null, service: 'senior' },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCueData | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])

  /* Find a senior-specific pricing tier or fall back to placeholder */
  const seniorTier = pricingTiers?.find(
    (t) => t.name?.toLowerCase().includes('senior'),
  )

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  1. Hero Section                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-light md:text-5xl">
            Senior Portraits
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            An editorial portrait experience for the bold, the creative, and the
            unapologetically you. For boys and girls who deserve magazine-worthy
            images that celebrate this milestone.
          </p>
        </div>

        {/* Placeholder hero area -- Emily will replace with a featured senior image from CMS */}
        <div className="mt-10 overflow-hidden rounded-lg bg-gradient-to-br from-brand-gold/10 via-muted to-brand-gold/5">
          <div className="flex h-64 items-center justify-center sm:h-80 md:h-96">
            <p className="text-sm text-muted-foreground">
              Featured senior portrait image
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
            The Senior Experience
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              This isn&apos;t your average cap-and-gown photo. Your senior session
              is a full editorial experience designed around you &mdash; your style,
              your personality, your story. We start with a planning consultation
              where I get to know you and we map out every detail together.
            </p>
            <p>
              On session day, you&apos;ll bring 3&ndash;5 outfits and we&apos;ll
              spend 1&ndash;2 hours at handpicked locations across South-Central
              Virginia. I&apos;ll direct every pose so you can relax, have fun, and
              just be yourself. No awkward stiffness &mdash; just natural, confident,
              magazine-worthy images.
            </p>
            <p>
              About 2&ndash;3 weeks later, we&apos;ll meet for your gallery reveal
              where you and your family will see your stunning, professionally
              retouched portraits for the first time. It&apos;s one of the best parts
              of the entire experience.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  4. Experience Storyboard                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-heading text-3xl font-light md:text-4xl">
            Your Experience, Step by Step
          </h2>
          <Storyboard steps={storyboardSteps} />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  5. Pricing Section                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-8 text-center font-heading text-3xl font-light md:text-4xl">
            Investment
          </h2>
          <PricingCard
            name={seniorTier?.name ?? 'Senior Session'}
            startingAt={seniorTier?.startingAt ?? 400}
            description={
              seniorTier?.description ??
              'A fully guided editorial portrait experience designed around you.'
            }
            features={
              seniorTier?.features ?? [
                '1\u20132 hour session',
                'Multiple outfit changes',
                'Multiple locations',
                'Professional retouching',
                'Online gallery',
              ]
            }
            highlight={seniorTier?.highlight ?? true}
            ctaLabel="Inquire for Detailed Pricing"
            ctaHref="/contact"
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  6. FAQ Section                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-3xl font-light md:text-4xl">
            Frequently Asked Questions
          </h2>
          <AnswerBlock items={seniorFaqs} />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  7. Bottom CTA                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Ready to Be Photographed?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Let&apos;s start planning your senior portrait experience. I&apos;d love
            to hear your vision and create something incredible together.
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
