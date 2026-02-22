import Link from 'next/link'

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
 * Displays category cards with placeholder image areas, titles, descriptions,
 * and "View Gallery" links. Intentionally simple — will be enhanced with real
 * Sanity gallery preview images when CMS content is populated.
 */
export function PortfolioPreview({ categories }: PortfolioPreviewProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className="group overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-lg"
        >
          {/* Placeholder image area — gradient matching brand palette */}
          <div
            className="aspect-[4/3] w-full"
            style={{
              background:
                category.href.includes('senior')
                  ? 'linear-gradient(135deg, #2d2926 0%, #3b3530 50%, #c4a35a22 100%)'
                  : 'linear-gradient(135deg, #2d2926 0%, #3b3530 50%, #a3b18a22 100%)',
            }}
          />
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
      ))}
    </div>
  )
}
