import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { PRICING_TIERS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { PricingCard } from '@/components/shared/PricingCard'
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
    images: [
      {
        url: '/og/investment.jpg',
        width: 1200,
        height: 630,
        alt: 'Investment and pricing — Emily Kathryn Photography senior and family sessions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment | Emily Kathryn Photography',
    description:
      'Transparent session pricing for senior portraits and family photography. Starting at $400.',
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

/** Placeholder pricing used when no CMS data exists yet. Emily updates these in Sanity Studio before launch. */
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
      {/* Heading section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-light md:text-5xl">
            Investment
          </h1>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
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
              digital packages — are shared personally after we connect. I
              offer a complimentary 15-minute discovery conversation where we
              talk about your vision, answer every question, and find exactly
              what is right for you.
            </p>
          </div>
        </div>
      </Section>

      {/* Pricing cards */}
      <Section background="muted">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
      </Section>

      {/* What's included section */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-light md:text-4xl">
            Every Session Includes
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            No matter which session you choose, you will always receive
            the full Emily Kathryn experience.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <li
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
              >
                <span
                  className="mt-0.5 text-brand-gold"
                  aria-hidden="true"
                >
                  &#10003;
                </span>
                <div>
                  <p className="font-heading text-base">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Product packages tease */}
      <Section background="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Custom Product Collections
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            After your session, we will sit down together for a personal reveal
            where you get to see your images for the first time — the way they
            deserve to be experienced. From stunning wall art and heirloom albums
            to curated digital collections, every product package is tailored to
            your home, your style, and your story.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Product packages and pricing are shared during your personal
            consultation so we can find exactly what is right for you.
          </p>
        </div>
      </Section>

      {/* CTA section */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Ready to Learn More?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The best way to get started is with a quick, no-pressure
            conversation. In just 15 minutes we will talk about your vision,
            answer your questions, and figure out the perfect session for you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Book Your Discovery Conversation
          </Link>
        </div>
      </Section>
    </>
  )
}
