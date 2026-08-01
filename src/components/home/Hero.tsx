import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  heading: string
  subheading: string
  ctaLabel: string
  ctaHref: string
}

export function Hero({ heading, subheading, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Hero background image — full bleed */}
      <Image
        src="/images/seniors/EKP_1337.jpg"
        alt="Senior portrait session by Emily Kathryn Photography"
        fill
        priority
        fetchPriority="high"
        // This image is the LCP element on every mobile visit. 65 shaves a
        // meaningful chunk off the transfer versus the default 75, and the
        // gradient overlay and opacity-70 sitting on top of it hide the
        // difference at full-bleed size.
        quality={65}
        className="object-cover object-[60%_center] opacity-70"
        sizes="100vw"
      />

      {/* Gradient overlay — editorial dark-to-transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Content — bottom-left editorial positioning */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:pb-24 lg:px-10">
          {/* Gold accent rule */}
          <div
            className="mb-6 h-px w-12 bg-brand-gold"
            style={{ animation: 'growWidth 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}
          />

          {/* Editorial label. Carries the search terms the H1 deliberately
              does not: service + geography (v3 audit M-01). The H1 below
              stays the brand hook. */}
          <p
            className="editorial-label mb-4 text-brand-gold"
            style={{ animation: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}
          >
            Senior &amp; Family Portraits &bull; South-Central Virginia
          </p>

          {/* Massive editorial headline */}
          <h1
            className="max-w-4xl font-heading text-5xl font-light leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ animation: 'heroTextReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both' }}
          >
            {heading}
          </h1>

          {/* Subheading */}
          <p
            className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
            style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both' }}
          >
            {subheading}
          </p>

          {/* CTA — editorial link style */}
          <div style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both' }}>
            <Link
              href={ctaHref}
              className="group mt-8 inline-flex items-center gap-3"
            >
              <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                {ctaLabel}
              </span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8"
        style={{ animation: 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 2s both' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.5625rem] uppercase tracking-[0.25em] text-white/40">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
