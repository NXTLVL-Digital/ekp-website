import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardsProps {
  cityName: string
}

const services = [
  {
    title: 'Senior Portraits',
    href: '/senior-portraits',
    image: {
      src: '/images/seniors/EKP_2401.jpg',
      alt: 'Senior portrait session by Emily Kathryn Photography',
    },
    description: (city: string) =>
      `Celebrate your milestone with editorial portraits that capture exactly who you are right now. Every session in ${city} is styled, guided, and designed to make you feel like the main character.`,
    cta: 'Explore Senior Portraits',
  },
  {
    title: 'Family Portraits',
    href: '/family-portraits',
    image: {
      src: '/images/families/EKP_1211.jpg',
      alt: 'Family portrait session by Emily Kathryn Photography',
    },
    description: (city: string) =>
      `Hold onto the way your family looks and feels right now. From toddler giggles to generational gatherings, your ${city} family session becomes a collection of heirlooms.`,
    cta: 'Explore Family Portraits',
  },
]

/**
 * Two-card grid showcasing Senior and Family portrait services on city pages.
 * Each card features a preview image, city-contextual description, and a
 * prominent gold CTA button linking to the service page.
 */
export function ServiceCards({ cityName }: ServiceCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {services.map((service) => (
        <div
          key={service.href}
          className="group overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <h3 className="font-heading text-2xl text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {service.description(cityName)}
            </p>
            <Link
              href={service.href}
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded bg-brand-gold px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
            >
              {service.cta}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
