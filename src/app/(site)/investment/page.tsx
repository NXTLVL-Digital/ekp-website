import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { PRICING_TIERS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { PricingCard } from '@/components/shared/PricingCard'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investment',
  // Hidden until Emily confirms pricing — remove robots block to relaunch
  robots: { index: false, follow: false },
  description:
    'Senior sessions begin at $799, family sessions at $899. See what every session includes and how the ordering appointment turns your images into wall art and albums.',
  openGraph: {
    title: 'Investment | Emily Kathryn Photography',
    description:
      'Senior sessions begin at $799, family sessions at $899 in South-Central Virginia. Collections of digital files, wall art, and albums, guided by a personal ordering appointment.',
    url: 'https://emilykathryn.com/investment',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/investment.jpg', width: 1200, height: 630, alt: 'Investment and pricing at Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment | Emily Kathryn Photography',
    description: 'Senior sessions begin at $799, family sessions at $899. Wall art, albums, and digital files, all guided by a personal ordering appointment.',
    images: ['/og/investment.jpg'],
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

const PLACEHOLDER_TIERS: PricingTier[] = [
  {
    _id: 'placeholder-senior',
    name: 'Senior Portraits',
    startingAt: 799,
    description:
      'An editorial portrait experience for the last big chapter, directed so you look like yourself, just elevated.',
    features: [
      '1-2 hour session',
      'Multiple outfit changes',
      'Multiple locations',
      'Professional retouching',
      'Online gallery',
    ],
    highlight: true,
    sortOrder: 1,
  },
  {
    _id: 'placeholder-family',
    name: 'Family Portraits',
    startingAt: 899,
    description:
      'A relaxed, guided session for the whole family, photographed as you really are, and finished as artwork made for the wall.',
    features: [
      '45-60 minute session',
      'Outdoor location',
      'Up to 6 family members',
      'Professional retouching',
      'Online gallery',
    ],
    highlight: false,
    sortOrder: 2,
  },
]

export default async function InvestmentPage() {
  const cmsTiers = await sanityFetch<PricingTier[]>({
    query: PRICING_TIERS_QUERY,
    tags: ['pricingTier'],
  })

  const tiers = cmsTiers.length > 0 ? cmsTiers : PLACEHOLDER_TIERS

  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Pricing</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Investment
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
          </div>
        </div>
      </section>

      {/* Intro text */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Senior sessions begin at $799. Family sessions begin at $899.
                Your session fee covers the whole experience. That means the
                planning, the wardrobe and location direction, the guided
                session, and your personal reveal. Every decision after that
                is simply about what you will keep.
              </p>
              <p>
                Finished artwork is offered in considered collections rather
                than &agrave; la carte, designed so the digital files, the wall
                art, and the album work together instead of being pieced apart.
                Most families invest between $1,800 and $3,500 across digital
                files, wall art, and a senior album.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Pricing cards */}
      <Section spacing="wide" background="muted">
        <RevealOnScroll variant="stagger">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {tiers.map((tier) => (
              <PricingCard
                key={tier._id}
                name={tier.name}
                startingAt={tier.startingAt}
                description={tier.description}
                features={tier.features}
                highlight={tier.highlight}
              />
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* What's included */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="editorial-label text-brand-gold">Included</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                Every Session Includes
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'Pre-Session Consultation',
                  desc: 'We plan your wardrobe, locations, and the feel of your session together before the day arrives.',
                },
                {
                  title: 'Location Scouting',
                  desc: 'I handpick settings that suit your style and the season, from Chatham fields to Danville brick.',
                },
                {
                  title: 'Professional Retouching',
                  desc: 'Every finished image is retouched by hand with a clean editorial finish that holds up in print at any size.',
                },
                {
                  title: 'Private Online Gallery',
                  desc: 'Your finished images are presented in a private, password-protected gallery that is simple to view and share.',
                },
                {
                  title: 'Reveal & Ordering Appointment',
                  desc: 'We meet in person to see your images for the first time and choose what they become. No guesswork, no pressure.',
                },
                {
                  title: 'Heirloom Printing',
                  desc: 'Prints, wall art, and albums are produced through my professional lab. They are made to be handed down, not replaced.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 border-t border-border pt-5">
                  <div className="mt-0.5 h-px w-4 shrink-0 bg-brand-gold" />
                  <div>
                    <p className="font-heading text-base">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Product packages tease */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                What Happens After Your Session
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Once your images are ready, we sit down together for your
                ordering appointment. You will see the finished portraits for
                the first time, and we will design what they become. Digital
                files you will share. Wall art sized for your rooms. An
                album that holds the whole story. Then everything arrives
                finished: printed, framed, and ready to hang.
              </p>
              <p className="mt-4 text-xs text-white/30">
                Collection details and pricing are presented at your ordering appointment.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
            <h2 className="font-heading text-4xl font-light md:text-5xl">
              Talk It Through First
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              Fifteen minutes, no obligation. Tell Emily about your senior or
              your family, ask anything about sessions and collections, and
              leave with a clear picture of the experience and the
              investment.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3"
            >
              <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                Begin the Conversation
              </span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  )
}
