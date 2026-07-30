import Image from 'next/image'
import Link from 'next/link'

interface CityHeroProps {
  cityName: string
  headline: string
}

/**
 * Photo-backed hero for city landing pages. Full-bleed background image with
 * dark overlay, gold label, headline, subtext, and CTA — matching the homepage
 * Hero pattern for visual consistency.
 */
export function CityHero({ cityName, headline }: CityHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
      {/* Hero background image */}
      <Image
        src="/images/seniors/EKP_0913.jpg"
        alt={`Portrait photography in ${cityName}, Virginia`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content overlay — positioned at bottom for editorial feel */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-gold">
            {cityName}, Virginia
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Editorial senior portraits and timeless family photography serving{' '}
            {cityName} and the surrounding communities.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Inquire for Detailed Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
