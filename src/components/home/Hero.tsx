import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  issueLabel: string
  heading: string
  subheading: string
  ctaLabel: string
  ctaHref: string
}

export function Hero({ issueLabel, heading, subheading, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] auto-rows-[auto] min-h-[90vh] overflow-hidden bg-background group">
      {/* Left side - content */}
      <div className="relative z-10 flex flex-col justify-between p-8 pb-16 md:p-12 md:pb-24 lg:px-10 lg:pt-16">
        {/* Issue badge */}
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-10 bg-gray-400" />
          <span className="editorial-label text-muted-foreground">{issueLabel}</span>
        </div>

        {/* Headline */}
        <div className="mt-12 md:mt-16">
          <h1 className="font-heading text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
            {subheading}
          </p>
        </div>

        {/* Hero metadata */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <span className="editorial-label text-sm text-muted-foreground">Specialty</span>
              <div className="mt-2 font-heading text-2xl">Senior + Family</div>
            </div>
            <div>
              <span className="editorial-label text-sm text-muted-foreground">Service</span>
              <div className="mt-2 font-heading text-2xl">South-Central VA</div>
            </div>
            <div>
              <span className="editorial-label text-sm text-muted-foreground">Artwork</span>
              <div className="mt-2 font-heading text-2xl">Albums + Wall Art</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand-gold"
          >
            <span className="editorial-label">{ctaLabel}</span>
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M0 4H18M18 4L14.5 0.5M18 4L14.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right side - image */}
      <div className="relative hidden lg:block h-[60vh] lg:h-auto">
        <Image
          src="/placeholder/hero-1.jpeg"
          alt="Senior portrait session by Emily Kathryn Photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />
        <div className="absolute top-8 right-8 bg-background px-6 py-3 text-xs font-medium uppercase tracking-widest shadow-sm">
          Cover Shot <span className="text-brand-gold">·</span> SS &lsquo;26
        </div>
      </div>

      {/* Mobile image (below content on small screens) */}
      <div className="relative order-first h-64 lg:hidden">
        <Image
          src="/placeholder/hero-1.jpeg"
          alt="Senior portrait session by Emily Kathryn Photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="editorial-label text-sm">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  )
}
