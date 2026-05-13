import { SanityImage, type SanityImageProps } from './SanityImage'

interface StoryboardStep {
  number: number
  title: string
  description: string
  image?: SanityImageProps['asset']
}

interface StoryboardProps {
  steps: StoryboardStep[]
}

export function Storyboard({ steps }: StoryboardProps) {
  return (
    <div className="relative">
      {/* Mobile: vertical editorial timeline */}
      <div className="md:hidden">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
            {/* Vertical connecting line */}
            {index < steps.length - 1 && (
              <div
                className="absolute left-[0.4375rem] top-8 bottom-0 w-px bg-brand-gold/20"
                aria-hidden="true"
              />
            )}

            {/* Gold dot */}
            <div className="relative z-10 mt-1.5 h-[0.9375rem] w-[0.9375rem] shrink-0 rounded-full border border-brand-gold bg-background" />

            {/* Content */}
            <div>
              <span className="editorial-label text-brand-gold">
                Step {String(step.number).padStart(2, '0')}
              </span>
              <h3 className="mt-1 font-heading text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {step.image && (
                <div className="mt-3 overflow-hidden">
                  <SanityImage
                    asset={step.image}
                    alt={step.title}
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal editorial timeline */}
      <div className="hidden md:block">
        {/* Horizontal connecting line */}
        <div className="relative mb-10 h-px bg-brand-gold/20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
            >
              <div className="h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-brand-gold bg-background" />
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step) => (
            <div key={step.number} className="pr-6 last:pr-0">
              <span className="editorial-label text-brand-gold">
                Step {String(step.number).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-heading text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {step.image && (
                <div className="mt-3 overflow-hidden">
                  <SanityImage
                    asset={step.image}
                    alt={step.title}
                    sizes="20vw"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
