interface TrustSignal {
  icon: 'star' | 'camera' | 'calendar'
  label: string
}

interface TrustBarProps {
  signals?: TrustSignal[]
}

const defaultSignals: TrustSignal[] = [
  { icon: 'star', label: '5.0 Rated on Google' },
  { icon: 'camera', label: '200+ Sessions Photographed' },
  { icon: 'calendar', label: '5+ Years Serving Virginia' },
]

const icons: Record<TrustSignal['icon'], React.ReactElement> = {
  star: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 2L12.09 7.26L18 7.64L13.45 11.52L14.82 17.5L10 14.27L5.18 17.5L6.55 11.52L2 7.64L7.91 7.26L10 2Z"
        fill="currentColor"
      />
    </svg>
  ),
  camera: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 3L5.5 5H3C2.45 5 2 5.45 2 6V16C2 16.55 2.45 17 3 17H17C17.55 17 18 16.55 18 16V6C18 5.45 17.55 5 17 5H14.5L13 3H7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="11"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  calendar: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="4"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

/**
 * Thin trust-signal strip displayed below the AEO block on city pages.
 * Shows social proof metrics (rating, session count, years of service)
 * with gold-tinted icons. Self-contained layout — not wrapped in Section.
 */
export function TrustBar({ signals = defaultSignals }: TrustBarProps) {
  return (
    <div className="border-y border-brand-gold/20 bg-brand-gold/10 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 sm:px-6 lg:px-8">
        {signals.map((signal) => (
          <div
            key={signal.label}
            className="flex items-center gap-2 text-sm font-medium text-foreground md:text-base"
          >
            <span className="text-brand-gold">{icons[signal.icon]}</span>
            <span>{signal.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
