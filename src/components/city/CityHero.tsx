import Link from 'next/link'

interface CityHeroProps {
  cityName: string
  headline: string
}

/**
 * Text-focused hero for city landing pages. Bold headline over a dark editorial
 * gradient background, with a gold CTA button. No city-specific hero photo
 * required per user decision.
 */
export function CityHero({ cityName, headline }: CityHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Subtle gold accent overlay */}
      <div className="absolute inset-0 bg-brand-gold/5" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-gold">
            {cityName}, Virginia
          </p>
          <h1 className="mt-3 font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Editorial senior portraits and timeless family photography serving{' '}
            {cityName} and the surrounding communities.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Inquire for Detailed Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
