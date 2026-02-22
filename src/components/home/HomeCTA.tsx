import Link from 'next/link'

interface HomeCTAProps {
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

/**
 * Mid-page CTA section that breaks up the content scroll and reinforces
 * the conversion action. Centered layout with heading, body text, and
 * a gold CTA button meeting the 44px tap-target minimum.
 */
export function HomeCTA({ heading, body, ctaLabel, ctaHref }: HomeCTAProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-heading text-3xl font-light md:text-4xl">
        {heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
        {body}
      </p>
      <Link
        href={ctaHref}
        className="mt-8 inline-flex min-h-11 items-center rounded bg-brand-gold px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
