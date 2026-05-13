import Link from 'next/link'

interface PricingCardProps {
  name: string
  startingAt: number
  description: string
  features: string[]
  ctaHref?: string
  ctaLabel?: string
  highlight?: boolean
}

export function PricingCard({
  name,
  startingAt,
  description,
  features,
  ctaHref = '/contact',
  ctaLabel = 'Inquire for Detailed Pricing',
  highlight = false,
}: PricingCardProps) {
  return (
    <div
      className={`border p-8 transition-shadow hover:shadow-lg md:p-10 ${
        highlight
          ? 'border-brand-gold bg-foreground text-white'
          : 'border-border bg-white'
      }`}
    >
      <span className={`editorial-label ${highlight ? 'text-brand-gold' : 'text-brand-gold'}`}>
        {name}
      </span>

      <p className={`mt-3 text-sm leading-relaxed ${highlight ? 'text-white/60' : 'text-muted-foreground'}`}>
        {description}
      </p>

      <div className="mt-6">
        <span className={`editorial-label ${highlight ? 'text-white/40' : 'text-muted-foreground'}`}>
          Starting At
        </span>
        <p className="mt-1 font-heading text-4xl font-light md:text-5xl">
          ${startingAt.toLocaleString()}
        </p>
      </div>

      <div className={`my-8 h-px ${highlight ? 'bg-white/10' : 'bg-border'}`} />

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <div className="mt-1.5 h-px w-3 shrink-0 bg-brand-gold" />
            <span className={highlight ? 'text-white/70' : ''}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`group mt-8 inline-flex min-h-11 items-center gap-3 ${
          highlight ? '' : ''
        }`}
      >
        <span className={`editorial-label transition-colors duration-300 group-hover:text-brand-gold ${
          highlight ? 'text-white' : 'text-foreground'
        }`}>
          {ctaLabel}
        </span>
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M0 4H18M18 4L14.5 0.5M18 4L14.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
        </svg>
      </Link>
    </div>
  )
}
