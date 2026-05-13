interface AnswerBlockItem {
  question: string
  answer: string
}

interface AnswerBlockProps {
  items: AnswerBlockItem[]
  id?: string
}

export function AnswerBlock({ items, id }: AnswerBlockProps) {
  return (
    <div id={id} className="divide-y divide-border">
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-heading text-lg font-light pr-4">{item.question}</span>
            <span className="shrink-0 text-brand-gold transition-transform duration-300 group-open:rotate-45">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
          </summary>
          <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
