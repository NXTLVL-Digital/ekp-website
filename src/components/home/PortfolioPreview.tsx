import Image from 'next/image'
import Link from 'next/link'

const categoryImages: Record<string, { src: string; alt: string }> = {
  '/senior-portraits': {
    src: '/images/seniors/EKP_2401.jpg',
    alt: 'Senior portrait by Emily Kathryn Photography',
  },
  '/family-portraits': {
    src: '/images/families/EKP_1211.jpg',
    alt: 'Family portrait by Emily Kathryn Photography',
  },
}

interface CategoryPreview {
  title: string
  href: string
  description: string
}

interface PortfolioPreviewProps {
  categories: CategoryPreview[]
}

export function PortfolioPreview({ categories }: PortfolioPreviewProps) {
  return (
    <div className="space-y-20 md:space-y-32">
      {categories.map((category, index) => {
        const image = categoryImages[category.href]
        const isReversed = index % 2 !== 0

        return (
          <Link
            key={category.href}
            href={category.href}
            className="editorial-image-hover group relative block"
          >
            {/* Desktop: side-by-side with overlap */}
            <div className="md:relative">
              {/* Image — positioned to one side */}
              <div
                className={`relative overflow-hidden md:w-[58%] ${
                  isReversed ? 'md:ml-auto' : ''
                }`}
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5]">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
              </div>

              {/* Content — on mobile below image, on desktop absolutely positioned overlapping */}
              <div
                className={`relative z-10 mt-6 md:absolute md:top-1/2 md:mt-0 md:w-[45%] md:-translate-y-1/2 ${
                  isReversed
                    ? 'md:left-0'
                    : 'md:right-0'
                }`}
              >
                <div className={`bg-background p-0 md:p-10 md:shadow-[0_4px_40px_rgba(0,0,0,0.06)] ${isReversed ? 'md:text-right' : ''}`}>
                  <span className="editorial-label text-brand-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                    {category.title}
                  </h3>

                  <div className={`my-5 h-px w-12 bg-brand-gold ${isReversed ? 'md:ml-auto' : ''}`} />

                  <p className={`max-w-sm text-sm leading-relaxed text-muted-foreground ${isReversed ? 'md:ml-auto' : ''}`}>
                    {category.description}
                  </p>

                  <div className={`mt-6 ${isReversed ? 'md:flex md:justify-end' : ''}`}>
                    <span className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                      <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                        View Gallery
                      </span>
                      <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M0 4H18M18 4L14.5 0.5M18 4L14.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
