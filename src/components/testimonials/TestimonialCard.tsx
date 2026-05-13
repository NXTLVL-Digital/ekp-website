import { SanityImage } from '@/components/shared/SanityImage'
import type { SanityImageProps } from '@/components/shared/SanityImage'

type SanityImageAsset = SanityImageProps['asset']

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
  variant?: 'default' | 'editorial'
}

export function TestimonialCard({ name, quote, service, image, variant = 'default' }: TestimonialCardProps) {
  if (variant === 'editorial') {
    return (
      <div className="relative border-l border-brand-gold/30 pl-8 py-2">
        {image?.asset && (
          <div className="mb-5 h-12 w-12 overflow-hidden rounded-full">
            <SanityImage
              asset={image.asset}
              alt={image.alt || name}
              hotspot={image.hotspot}
              crop={image.crop}
              width={48}
              height={48}
              sizes="48px"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <blockquote className="font-heading text-xl font-light italic leading-relaxed md:text-2xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-px w-6 bg-brand-gold" />
          <p className="editorial-label text-muted-foreground">
            {name}
            {service && (
              <span className="text-brand-gold">
                {' '}&bull;{' '}
                {service === 'senior'
                  ? 'Senior Session'
                  : service === 'family'
                    ? 'Family Session'
                    : service}
              </span>
            )}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border pt-6">
      {image?.asset && (
        <div className="mb-4 h-12 w-12 overflow-hidden rounded-full">
          <SanityImage
            asset={image.asset}
            alt={image.alt || name}
            hotspot={image.hotspot}
            crop={image.crop}
            width={48}
            height={48}
            sizes="48px"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px w-4 bg-brand-gold" />
        <p className="editorial-label text-foreground">
          {name}
          {service && (
            <span className="text-muted-foreground">
              {' '}&bull;{' '}
              {service === 'senior'
                ? 'Senior Session'
                : service === 'family'
                  ? 'Family Session'
                  : service}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
