import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardsProps {
  cityName: string
  /**
   * City index. Rotates which portfolio frame each service shows so the seven
   * city pages do not read as copies of one another.
   */
  variant?: number
}

interface ServiceImage {
  src: string
  alt: string
}

/**
 * Verified files in public/images/seniors, all upright frames so the 4:5 crop
 * never cuts a subject. Alt text stays location neutral.
 */
const seniorImages: ServiceImage[] = [
  { src: '/images/seniors/EKP_5321.jpg', alt: 'Senior portrait holding a colorful bouquet' },
  { src: '/images/seniors/EKP_8781.jpg', alt: 'Senior athlete portrait with a letterman jacket' },
  { src: '/images/seniors/EKP_7803.jpg', alt: 'Senior boy portrait at a rustic location' },
  { src: '/images/seniors/EKP_9695.jpg', alt: 'Senior portrait in an elegant black dress' },
  { src: '/images/seniors/EKP_2401.jpg', alt: 'Graduate in cap and gown at golden hour' },
  { src: '/images/seniors/EKP_5446.jpg', alt: 'Joyful senior portrait among spring blossoms' },
  { src: '/images/seniors/EKP_8368.jpg', alt: 'Graduation portrait in a wildflower field' },
]

/**
 * Verified files in public/images/families. Wide group frames are left out on
 * purpose: they lose people at a 4:5 crop.
 */
const familyImages: ServiceImage[] = [
  { src: '/images/families/EKP_2152.jpg', alt: 'Brother and sister portrait outdoors' },
  { src: '/images/families/EKP_1211.jpg', alt: 'Family portrait in warm evening light' },
  { src: '/images/families/EKP_1186.jpg', alt: 'Mother and daughters sharing a playful moment' },
  { src: '/images/families/HUTCHINSON-11.jpg', alt: 'Mother with her children in the countryside' },
  { src: '/images/families/WOF_8576.jpg', alt: 'Natural child portrait beside a stone wall' },
  { src: '/images/families/WOF_8608.jpg', alt: 'Young girl portrait in soft natural light' },
]

const services = [
  {
    title: 'Senior Portraits',
    href: '/senior-portraits',
    images: seniorImages,
    note: 'Collections from $799',
    description: (city: string) =>
      `Celebrate your milestone with editorial portraits that bring out exactly who you are right now. Every session in ${city} is styled, guided, and designed to make you feel like the main character.`,
    cta: 'Explore Senior Portraits',
  },
  {
    title: 'Family Portraits',
    href: '/family-portraits',
    images: familyImages,
    note: 'Collections from $899',
    description: (city: string) =>
      `Hold onto the way your family looks and feels right now. From toddler giggles to generational gatherings, your ${city} family session becomes a collection of heirlooms.`,
    cta: 'Explore Family Portraits',
  },
]

/**
 * The two signature services, presented as an editorial pair rather than
 * boxed cards: photograph, numeral, display heading, gold hairline, and a
 * link-style CTA with the translating arrow. The second column drops down on
 * desktop so the pair reads asymmetrically.
 */
export function ServiceCards({ cityName, variant = 0 }: ServiceCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
      {services.map((service, index) => {
        const image =
          service.images[
            ((variant % service.images.length) + service.images.length) %
              service.images.length
          ]

        return (
          <Link key={service.href} href={service.href} className="group block">
            <div
              className={`editorial-image-hover relative aspect-[4/5] overflow-hidden ${
                index === 1 ? 'md:mt-20' : ''
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="editorial-label absolute left-5 top-5 text-white/70">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-7">
              <h3 className="font-heading text-3xl font-light text-foreground md:text-4xl">
                {service.title}
              </h3>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {service.description(cityName)}
              </p>
              <p className="editorial-label mt-6 text-muted-foreground">
                {service.note}
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center gap-3">
                <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                  {service.cta}
                </span>
                <svg
                  width="24"
                  height="8"
                  viewBox="0 0 24 8"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-brand-gold"
                  />
                </svg>
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
