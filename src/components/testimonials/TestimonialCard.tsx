import { SanityImage } from '@/components/shared/SanityImage'
import type { SanityImageProps } from '@/components/shared/SanityImage'

type SanityImageAsset = SanityImageProps['asset']

/**
 * Shape of a testimonial image as returned from GROQ queries.
 * Matches the `image { asset->{ ... }, hotspot, crop, alt }` projection.
 */
export interface TestimonialImage {
  asset: SanityImageAsset
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

interface TestimonialCardProps {
  name: string
  quote: string
  service?: string
  image?: TestimonialImage
}

/**
 * Reusable testimonial display card for homepage, service pages, and city pages.
 * Server Component — renders a blockquote with client name, optional service label,
 * and optional circular client photo via SanityImage.
 */
export function TestimonialCard({ name, quote, service, image }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      {image?.asset && (
        <div className="mb-4 h-16 w-16 overflow-hidden rounded-full">
          <SanityImage
            asset={image.asset}
            alt={image.alt || name}
            hotspot={image.hotspot}
            crop={image.crop}
            width={64}
            height={64}
            sizes="64px"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <blockquote className="text-muted-foreground italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-3 font-heading text-sm">
        &mdash; {name}
        {service && (
          <span className="text-muted-foreground">
            {' '}
            &middot;{' '}
            {service === 'senior'
              ? 'Senior Session'
              : service === 'family'
                ? 'Family Session'
                : service}
          </span>
        )}
      </p>
    </div>
  )
}
