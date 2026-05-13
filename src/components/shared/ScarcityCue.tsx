interface ScarcityCueProps {
  message: string
  isActive: boolean
}

export function ScarcityCue({ message, isActive }: ScarcityCueProps) {
  if (!isActive) return null

  return (
    <div className="flex items-center justify-center gap-3 border-y border-brand-gold/20 bg-foreground px-4 py-3">
      <span
        className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold"
        aria-hidden="true"
      />
      <p className="editorial-label text-brand-gold">
        {message}
      </p>
    </div>
  )
}
