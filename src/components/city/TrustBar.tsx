interface TrustSignal {
  /** Short display figure, set in the heading face. */
  figure: string
  /** Editorial label underneath. */
  label: string
}

interface TrustBarProps {
  signals?: TrustSignal[]
}

/**
 * Already-published proof points only. These mirror the credentials row on the
 * About page so the two pages never contradict each other, and they carry no
 * numbers that cannot be stood behind.
 */
const defaultSignals: TrustSignal[] = [
  { figure: 'A decade +', label: 'Behind the camera' },
  { figure: 'Seven', label: 'Communities served' },
  { figure: 'Every session', label: 'Planned and directed' },
]

/**
 * Typographic trust strip that sits under the answer block on city pages.
 * Sharp edges, hairline dividers, no icons and no boxes. Self-contained
 * layout, so it is not wrapped in Section.
 */
export function TrustBar({ signals = defaultSignals }: TrustBarProps) {
  return (
    <section
      className="border-y border-border bg-muted"
      aria-label="Why families work with Emily Kathryn Photography"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="px-0 py-8 text-center sm:px-8 md:py-10"
            >
              <p className="font-heading text-2xl font-light text-foreground md:text-3xl">
                {signal.figure}
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-brand-gold/40" />
              <span className="editorial-label mt-4 block text-brand-gold">
                {signal.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
