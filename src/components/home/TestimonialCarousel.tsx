import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import type { SanityImageProps } from '@/components/shared/SanityImage'

type SanityImageAsset = SanityImageProps['asset']

interface Testimonial {
  name: string
  quote: string
  service?: string
  image?: SanityImageAsset
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

/**
 * Homepage testimonials section displaying a grid of TestimonialCards.
 * Server-rendered grid — no client-side carousel JS.
 * Shows up to 6 featured testimonials in a responsive 1/2/3-column grid.
 */
export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const featured = testimonials.slice(0, 6)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((testimonial, index) => (
        <TestimonialCard
          key={`testimonial-${index}`}
          name={testimonial.name}
          quote={testimonial.quote}
          service={testimonial.service}
          image={testimonial.image}
        />
      ))}
    </div>
  )
}
