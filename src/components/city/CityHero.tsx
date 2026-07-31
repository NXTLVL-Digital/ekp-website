import Image from 'next/image'
import Link from 'next/link'

interface CityHeroProps {
  cityName: string
  headline: string
  /** Portfolio frame for this city. Alt text stays generic so no city claim is implied. */
  image: { src: string; alt: string }
  subheading?: string
}

/**
 * Full-bleed editorial hero for city landing pages.
 *
 * Mirrors the homepage Hero: darkened photograph, gold hairline rule, an
 * editorial label, oversized light display type, and a link-style CTA with the
 * translating arrow. No filled buttons, no rounded corners.
 */
export function CityHero({
  cityName,
  headline,
  image,
  subheading,
}: CityHeroProps) {
  const sub =
    subheading ??
    `Editorial senior portraits and timeless family photography serving ${cityName} and the surrounding communities.`

  return (
    <section className="relative h-[82vh] min-h-[560px] overflow-hidden bg-black">
      {/* Photograph */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        className="object-cover opacity-70"
        sizes="100vw"
      />

      {/* Editorial gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />

      {/* Content, anchored bottom-left */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:pb-24 lg:px-10">
          <div
            className="mb-6 h-px w-12 bg-brand-gold"
            style={{
              animation: 'growWidth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
            }}
          />

          <p
            className="editorial-label mb-4 text-brand-gold"
            style={{
              animation: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
            }}
          >
            {cityName}, Virginia
          </p>

          <h1
            className="max-w-4xl font-heading text-4xl font-light leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              animation:
                'heroTextReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both',
            }}
          >
            {headline}
          </h1>

          <p
            className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s both',
            }}
          >
            {sub}
          </p>

          <div
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both',
            }}
          >
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-11 items-center gap-3"
            >
              <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                Inquire for Detailed Pricing
              </span>
              <svg
                width="24"
                height="8"
                viewBox="0 0 24 8"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-brand-gold"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
