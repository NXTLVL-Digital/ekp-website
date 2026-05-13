import Link from 'next/link'

interface HomeCTAProps {
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function HomeCTA({ heading, body, ctaLabel, ctaHref }: HomeCTAProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {/* Gold accent rule centered */}
      <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />

      <h2 className="font-heading text-4xl font-light md:text-5xl">
        {heading}
      </h2>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
        {body}
      </p>

      {/* Editorial CTA — underline style */}
      <Link
        href={ctaHref}
        className="group mt-8 inline-flex items-center gap-3"
      >
        <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
          {ctaLabel}
        </span>
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
        </svg>
      </Link>
    </div>
  )
}
