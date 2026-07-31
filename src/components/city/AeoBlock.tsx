interface AeoBlockProps {
  text: string
  cityName: string
}

/**
 * Always-visible AEO (Answer Engine Optimization) answer snippet.
 *
 * The text is a fixed 40 to 60 word asset written for answer extraction, so it
 * is rendered verbatim. Presentation is editorial: an asymmetric split with a
 * labelled narrow column and the answer set in large light display type.
 *
 * NOT the collapsible AnswerBlock FAQ accordion. This is always visible.
 */
export function AeoBlock({ text, cityName }: AeoBlockProps) {
  return (
    <div
      className="grid grid-cols-1 gap-8 border-t border-border pt-10 md:grid-cols-12 md:gap-10 md:pt-12"
      role="region"
      aria-label={`About portrait photography in ${cityName}`}
    >
      <div className="md:col-span-4 lg:col-span-3">
        <span className="editorial-label text-brand-gold">The Short Answer</span>
        <div className="mt-5 h-px w-12 bg-brand-gold" />
      </div>

      <p className="font-heading text-xl font-light leading-[1.6] text-foreground md:col-span-8 md:text-2xl lg:col-span-9 lg:text-[1.75rem]">
        {text}
      </p>
    </div>
  )
}
