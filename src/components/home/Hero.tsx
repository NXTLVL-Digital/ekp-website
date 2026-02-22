import Link from 'next/link'

interface HeroProps {
  heading: string
  subheading: string
  ctaLabel: string
  ctaHref: string
}

/**
 * Full-bleed hero section with brand gradient placeholder background, overlay heading,
 * subheading, and a gold CTA button. Gender-inclusive, editorial aesthetic.
 *
 * When Sanity content is connected, this will be enhanced to use SanityImage with
 * `priority` and `fetchPriority="high"` for LCP optimization. For now, a styled
 * gradient background serves as a placeholder Emily will replace.
 */
export function Hero({ heading, subheading, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Gradient placeholder — dark editorial feel with gold accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a1a1a 0%, #2d2926 40%, #3b3530 60%, #1a1a1a 100%)',
        }}
      />

      {/* Subtle gold light accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 70% 60%, #c4a35a 0%, transparent 60%)',
        }}
      />

      {/* Content overlay */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
          <h1 className="max-w-3xl font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {subheading}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex min-h-11 items-center rounded bg-brand-gold px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
