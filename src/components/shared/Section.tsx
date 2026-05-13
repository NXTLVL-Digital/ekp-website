interface SectionProps {
  children: React.ReactNode
  background?: 'white' | 'muted' | 'dark' | 'black'
  spacing?: 'default' | 'tight' | 'wide' | 'none'
  className?: string
  id?: string
}

export function Section({
  children,
  background = 'white',
  spacing = 'default',
  className = '',
  id,
}: SectionProps) {
  const bgClasses = {
    white: 'bg-background text-foreground',
    muted: 'bg-muted text-foreground',
    dark: 'bg-foreground text-white',
    black: 'bg-black text-white',
  }[background]

  const spacingClasses = {
    default: 'py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]',
    tight: 'py-10 md:py-14',
    wide: 'py-24 md:py-36',
    none: '',
  }[spacing]

  return (
    <section id={id} className={`${bgClasses} ${spacingClasses} ${className}`}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {children}
      </div>
    </section>
  )
}
