import Image from 'next/image'
import Link from 'next/link'

const categoryImages: Record<string, { src: string; alt: string }> = {
  '/senior-portraits': {
    src: '/placeholder/senior-1.jpeg',
    alt: 'Senior portrait by Emily Kathryn Photography',
  },
  '/family-portraits': {
    src: '/placeholder/family-1.jpeg',
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

/**
 * Portfolio preview grid showcasing session types (Senior, Family).
 * Displays category cards with preview images, titles, descriptions,
 * and "View Gallery" links. Will be enhanced with real Sanity gallery
 * preview images when CMS content is populated.
 */
export function PortfolioPreview({ categories }: PortfolioPreviewProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {categories.map((category) => {
        const image = categoryImages[category.href]
        return (
        <Link
          key={category.href}
          href={category.href}
          className="group overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-lg"
        >
          {/* Category preview image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>
          <div className="p-6">
            <h3 className="font-heading text-2xl text-foreground">
              {category.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <span className="mt-4 inline-block text-sm tracking-wide text-brand-gold transition-colors group-hover:text-brand-gold-dark">
              View Gallery &rarr;
            </span>
          </div>
        </Link>
        )
      })}
    </div>
  )
}
