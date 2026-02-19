interface AnswerBlockItem {
  question: string
  answer: string
}

interface AnswerBlockProps {
  items: AnswerBlockItem[]
  id?: string
}

/**
 * FAQ accordion using native HTML details/summary elements for zero-JS behavior.
 * Accessible by default: keyboard operable, screen reader compatible.
 * SEO-friendly: Google reads content in both open and closed states.
 *
 * This component is for FAQ sections with collapsible answers. The AEO "answer blocks"
 * on city pages (Phase 5) are a separate component -- they are always visible, not collapsed.
 */
export function AnswerBlock({ items, id }: AnswerBlockProps) {
  return (
    <div id={id} className="divide-y divide-border">
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-heading text-lg [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>
          <div className="pb-4 text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
