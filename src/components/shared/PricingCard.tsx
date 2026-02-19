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

/**
 * Premium pricing card displaying "Starting At" pricing with a features list
 * and warm gold CTA button linking to the inquiry page. Used on the Investment
 * page and anywhere pricing packages are shown.
 *
 * The highlight variant adds a gold border and subtle gold background to make
 * one package stand out as the recommended choice.
 */
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
      className={`rounded-lg border p-6 transition-shadow hover:shadow-md md:p-8 ${
        highlight
          ? 'border-brand-gold bg-brand-gold/5'
          : 'border-border bg-white'
      }`}
    >
      <h3 className="font-heading text-2xl">{name}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>

      <p className="mt-4">
        <span className="text-sm text-muted-foreground">Starting At</span>
        <br />
        <span className="font-heading text-3xl">
          ${startingAt.toLocaleString()}
        </span>
      </p>

      <ul className="mt-6 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 text-brand-gold" aria-hidden="true">
              &#10003;
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="mt-6 flex min-h-11 items-center justify-center rounded bg-brand-gold px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
