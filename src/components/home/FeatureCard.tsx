import Image from 'next/image'
import Link from 'next/link'

interface FeatureCardProps {
  number: string
  title: string
  description: string
  image: string
  alt: string
  ctaText: string
  ctaHref: string
}

export function FeatureCard({ number, title, description, image, alt, ctaText, ctaHref }: FeatureCardProps) {
  return (
    <div className="group cursor-pointer transition-transform hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-sm bg-muted">
        <div className="relative aspect-[4/5]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="editorial-label text-brand-gold">{number}</span>
        <h3 className="mt-3 font-heading text-3xl font-light md:text-4xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand-gold"
        >
          <span className="editorial-label">{ctaText}</span>
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M0 4H14M14 4L10.5 0.5M14 4L10.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
