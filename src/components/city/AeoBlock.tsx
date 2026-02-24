interface AeoBlockProps {
  text: string
  cityName: string
}

/**
 * Always-visible AEO (Answer Engine Optimization) answer snippet.
 *
 * Styled as a prominent callout box with a subtle gold-tinted background
 * and left gold border accent. Targets local portrait photography queries
 * for AI answer extraction.
 *
 * NOT the collapsible AnswerBlock FAQ accordion — this is always visible.
 */
export function AeoBlock({ text, cityName }: AeoBlockProps) {
  return (
    <div
      className="rounded-r-lg border-l-4 border-brand-gold bg-brand-gold/5 px-6 py-5"
      role="region"
      aria-label={`About portrait photography in ${cityName}`}
    >
      <p className="text-base leading-relaxed text-foreground md:text-lg">
        {text}
      </p>
    </div>
  )
}
