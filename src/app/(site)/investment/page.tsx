import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { PRICING_TIERS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { PricingCard } from '@/components/shared/PricingCard'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investment',
  description:
    'Transparent session pricing for senior portraits and family photography with Emily Kathryn Photography. Starting at $400 in South-Central Virginia.',
  openGraph: {
    title: 'Investment | Emily Kathryn Photography',
    description:
      'Transparent session pricing for senior portraits and family photography. Starting at $400 in South-Central Virginia.',
    url: 'https://emilykathryn.com/investment',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/investment.jpg', width: 1200, height: 630, alt: 'Investment and pricing — Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment | Emily Kathryn Photography',
    description: 'Transparent session pricing for senior portraits and family photography. Starting at $400.',
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
    startingAt: 400,
    description:
      'An editorial-style portrait experience designed to celebrate who you are right now.',
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
    startingAt: 400,
    description:
      'Relaxed, natural family sessions that capture the connections that matter most.',
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
                I believe in being upfront about pricing so you can focus on
                what really matters — getting excited about your session. Below
                you will find the session fee for each service type. This is
                your &quot;Starting At&quot; investment, which covers my time,
                talent, direction, and the full session experience from
                consultation to gallery reveal.
              </p>
              <p>
                Product collections — wall art, heirloom albums, and curated
                digital packages — are shared personally after we connect.
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
                  desc: 'We plan your wardrobe, locations, and vision together before session day.',
                },
                {
                  title: 'Location Scouting',
                  desc: 'I handpick spots that complement your style and the season beautifully.',
                },
                {
                  title: 'Professional Editing',
                  desc: 'Every image is individually retouched with an editorial, magazine-quality finish.',
                },
                {
                  title: 'Private Online Gallery',
                  desc: 'View, share, and download your images from a beautiful, password-protected gallery.',
                },
                {
                  title: 'Personal Reveal Session',
                  desc: 'We review your images together so you can see them the way they deserve to be seen.',
                },
                {
                  title: 'Print Ordering',
                  desc: 'Access to professional-quality prints, canvases, and albums through my curated lab.',
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
                Custom Product Collections
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                After your session, we will sit down together for a personal reveal
                where you get to see your images for the first time. From stunning
                wall art and heirloom albums to curated digital collections, every
                product package is tailored to your home, your style, and your story.
              </p>
              <p className="mt-4 text-xs text-white/30">
                Product packages and pricing are shared during your personal consultation.
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
              Ready to Learn More?
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              The best way to get started is with a quick, no-pressure
              conversation. In just 15 minutes we will talk about your vision,
              answer your questions, and figure out the perfect session for you.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3"
            >
              <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                Book Your Discovery Conversation
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
