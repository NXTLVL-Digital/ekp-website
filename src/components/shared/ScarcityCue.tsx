interface ScarcityCueProps {
  message: string
  isActive: boolean
}

/**
 * Conditional scarcity/availability message with warm brand styling.
 * Renders a gentle, warm nudge when active (e.g., "Only 5 Spring slots remaining")
 * and renders nothing when inactive. Designed to be attention-grabbing but not pushy --
 * the gold accent feels warm, not aggressive.
 */
export function ScarcityCue({ message, isActive }: ScarcityCueProps) {
  if (!isActive) return null

  return (
    <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-4 py-3 text-center">
      <p className="text-sm font-medium text-foreground">
        <span
          className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-gold"
          aria-hidden="true"
        />
        {message}
      </p>
    </div>
  )
}
