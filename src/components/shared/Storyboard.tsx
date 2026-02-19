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

/**
 * Visual timeline showing the session experience journey. A key conversion element
 * that communicates the premium, guided experience of working with Emily.
 *
 * Renders numbered steps connected by a gold line. On mobile, steps stack vertically.
 * On desktop, steps flow horizontally.
 *
 * Example steps: "1. Planning Call" -> "2. Wardrobe Consult" -> "3. Your Session" -> "4. Reveal & Order"
 */
export function Storyboard({ steps }: StoryboardProps) {
  return (
    <div className="relative">
      {/* Mobile: vertical layout */}
      <div className="md:hidden">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex gap-4 pb-10 last:pb-0">
            {/* Vertical connecting line */}
            {index < steps.length - 1 && (
              <div
                className="absolute left-5 top-10 bottom-0 w-px bg-brand-gold/30"
                aria-hidden="true"
              />
            )}

            {/* Numbered circle */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold font-heading text-lg text-white">
              {step.number}
            </div>

            {/* Content */}
            <div className="pt-1">
              <h3 className="font-heading text-lg">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
              {step.image && (
                <div className="mt-3 overflow-hidden rounded-lg">
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

      {/* Desktop: horizontal layout */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between">
          {/* Horizontal connecting line spanning between first and last circle centers */}
          <div
            className="absolute top-5 left-5 right-5 h-px bg-brand-gold/30"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              {/* Numbered circle */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold font-heading text-lg text-white">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="mt-4 font-heading text-lg">{step.title}</h3>
              <p className="mt-1 max-w-48 text-sm text-muted-foreground">
                {step.description}
              </p>
              {step.image && (
                <div className="mt-3 overflow-hidden rounded-lg">
                  <SanityImage
                    asset={step.image}
                    alt={step.title}
                    sizes="20vw"
                    className="w-full max-w-48"
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
