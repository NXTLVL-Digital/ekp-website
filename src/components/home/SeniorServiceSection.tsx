import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'

export function SeniorServiceSection() {
  return (
    <Section>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <RevealOnScroll variant="up">
          <div className="mb-12 text-center">
            <span className="editorial-label text-brand-gold">Cover Story</span>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              Senior <span className="italic text-brand-gold">Portraits</span>
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="editorial-label text-brand-gold mb-6 block">For the once-in-a-lifetime senior year</span>
            <h2 className="font-heading text-5xl font-light md:text-6xl lg:text-7xl">
              A senior session that reads like a <span className="italic text-brand-gold">magazine</span> spread.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              From the first wardrobe consult to the final reveal — every detail of an Emily Kathryn senior session is built to feel like the cover shoot you&rsquo;ve always wanted, then finished as artwork your family can see and enjoy every day.
            </p>

            <ul className="mt-8 space-y-4 border-t border-border pt-6">
              <li className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wardrobe styling consult</span>
                <span className="font-serif text-brand-gold">Included</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Session planning</span>
                <span className="font-serif text-brand-gold">Personalized</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reveal appointment</span>
                <span className="font-serif text-brand-gold">Guided</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Finished artwork</span>
                <span className="font-serif text-brand-gold">Albums + Wall Art</span>
              </li>
            </ul>

            <Link
              href="/senior-portraits"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand-gold"
            >
              <span className="editorial-label">Inquire for the full guide</span>
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H18M18 4L14.5 0.5M18 4L14.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="/placeholder/senior-9.jpeg"
                  alt="Senior portrait session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/placeholder/senior-7.jpeg"
                  alt="Senior portrait session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/placeholder/senior-12.jpeg"
                  alt="Senior portrait session"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
