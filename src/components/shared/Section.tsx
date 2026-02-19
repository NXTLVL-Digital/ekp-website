import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'muted'
  id?: string
}

/**
 * Consistent section wrapper with premium vertical spacing, max-width constraint,
 * and optional muted background. This is the foundational wrapper every page
 * section uses for consistent layout across the site.
 */
export function Section({
  children,
  className = '',
  background = 'white',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-section-sm md:py-section ${
        background === 'muted' ? 'bg-muted' : 'bg-background'
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
