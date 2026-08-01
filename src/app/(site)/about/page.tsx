import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/lib/fetch'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import { sanityLoader } from '@/sanity/lib/image'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { JsonLd } from '@/components/shared/JsonLd'
import { buildPersonSchema } from '@/lib/schemas/person'
import type { Metadata } from 'next'

interface AboutPageData {
  headshot?: {
    asset: {
      _id: string
      url: string
      metadata: { lqip: string; dimensions: { width: number; height: number } }
    }
    hotspot?: { x: number; y: number }
    alt?: string
  }
  bio?: PortableTextBlock[]
  philosophyHeading?: string
  philosophyPrinciples?: Array<{ number: string; title: string; text: string }>
  ctaHeading?: string
  ctaBody?: string
  metaDescription?: string
}

// Hardcoded fallback content — used until Emily populates Sanity
const FALLBACK_PRINCIPLES = [
  {
    num: '01',
    title: 'You, On Your Best Day',
    text: "Every family has a rhythm. Every senior has a spark. My job isn't to turn you into someone else. It's to direct you until the photograph is unmistakably you.",
  },
  {
    num: '02',
    title: 'The Experience Shows',
    text: 'How a session feels shows up in the finished portraits. Mine run calm, guided, and unhurried, so you leave the day feeling better about yourself than when you arrived.',
  },
  {
    num: '03',
    title: 'Made for the Wall',
    text: "Trends fade. A framed portrait in the hallway doesn't. Albums, prints, artwork for the grandparents: what we make together should still mean something in twenty years.",
  },
]

/**
 * Fallback bio, split into two groups so the page can breathe between them.
 * The brand guide asks for photograph, type, breath, photograph rather than
 * one unbroken column of text. Used until Emily populates Sanity, at which
 * point her CMS bio renders in the first position instead.
 */
const FALLBACK_BIO_OPENING = [
  "Emily Kathryn has photographed seniors and families across South-Central Virginia for more than a decade. Long enough to know the right photograph doesn't happen by accident.",
  "For me, it clicked the first time I watched a senior see themselves photographed well. Not turned into somebody else. Just themselves, at their most confident. That's still the reason I pick up the camera.",
  "I've built my work on one belief: a session should feel like a magazine shoot. Relaxed, directed, never rushed. When you see the finished images, the reaction I want is simple. That's actually me.",
]

const FALLBACK_BIO_CLOSING = [
  "The work isn't done when the gallery is delivered. I photograph with the final print in mind: how the light holds up on paper, which image anchors the album, which one earns the big frame.",
  'From golden hour fields in Chatham to the brick streets of downtown Danville, the foothills near Lynchburg, and the docks at Smith Mountain Lake, this corner of Virginia is home. If your people are here, I hope we get to work together.',
]

/** Truthful, already-published proof points. No invented numbers. */
const CREDENTIALS = [
  {
    figure: 'A decade +',
    label: 'Behind the camera',
    text: 'Photographing seniors and families across this corner of Virginia since long before it was a trend.',
  },
  {
    figure: 'Seven',
    label: 'Communities served',
    text: 'Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, and Evington.',
  },
  {
    figure: 'Every frame',
    label: 'Made for the wall',
    text: 'Sessions are planned around the finished piece, so the work ends in albums and artwork rather than a folder.',
  },
]

/** Portfolio taste, kept to three so the strip reads as a spread. */
const PORTFOLIO_STRIP = [
  {
    src: '/images/seniors/EKP_5436-Edit.jpg',
    alt: 'Editorial senior portrait among spring blossoms',
  },
  {
    src: '/images/families/EKP_1211.jpg',
    alt: 'Family portrait in warm evening light',
  },
  {
    src: '/images/seniors/EKP_8368.jpg',
    alt: 'Graduation portrait in a wildflower field',
  },
]

const bioComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-brand-gold pl-4 italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<AboutPageData | null>({
    query: ABOUT_PAGE_QUERY,
    tags: ['aboutPage'],
  })

  const description =
    data?.metaDescription ??
    'Meet Emily Kathryn, a portrait photographer with more than a decade behind the camera in South-Central Virginia. Serving Chatham, Danville, and Lynchburg.'

  return {
    title: 'About',
    description,
    openGraph: {
      title: 'About | Emily Kathryn Photography',
      description,
      url: 'https://emilykathryn.com/about',
      siteName: 'Emily Kathryn Photography',
      images: [
        {
          url: '/og/about.jpg',
          width: 1200,
          height: 630,
          alt: 'Emily Kathryn, portrait photographer based in South-Central Virginia',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About | Emily Kathryn Photography',
      description,
      images: ['/og/about.jpg'],
    },
  }
}

export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData | null>({
    query: ABOUT_PAGE_QUERY,
    tags: ['aboutPage'],
  })

  const principles =
    data?.philosophyPrinciples?.map((p) => ({
      num: p.number,
      title: p.title,
      text: p.text,
    })) ?? FALLBACK_PRINCIPLES

  const philosophyHeading = data?.philosophyHeading ?? 'What I Believe'
  const ctaHeading = data?.ctaHeading ?? 'Introduce Yourself'
  const ctaBody =
    data?.ctaBody ??
    "Tell me about your senior, your family, or the session you keep putting off. I'd love to hear what you're picturing."

  return (
    <>
      <JsonLd data={buildPersonSchema()} />

      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">About</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Meet Emily
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
          </div>
        </div>
      </section>

      {/* Hero — Emily's story with photo */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
            {/* Emily's portrait */}
            <div className="editorial-image-hover relative md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                {data?.headshot?.asset ? (
                  <Image
                    loader={sanityLoader}
                    src={data.headshot.asset.url}
                    alt={data.headshot.alt ?? 'Emily Kathryn, portrait photographer in South-Central Virginia'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                    placeholder={data.headshot.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={data.headshot.asset.metadata?.lqip}
                    style={
                      data.headshot.hotspot
                        ? {
                            objectPosition: `${data.headshot.hotspot.x * 100}% ${data.headshot.hotspot.y * 100}%`,
                          }
                        : undefined
                    }
                  />
                ) : (
                  <Image
                    src="/images/brand/emily-walker.jpg"
                    alt="Emily Walker, the photographer behind Emily Kathryn Photography"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                )}
              </div>
            </div>

            {/* Story content */}
            <div className="relative z-10 md:col-span-7 md:col-start-6 md:-ml-8 md:mt-16">
              <div className="bg-background md:p-12">
                {data?.bio ? (
                  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <PortableText value={data.bio} components={bioComponents} />
                  </div>
                ) : (
                  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {FALLBACK_BIO_OPENING.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Pull quote — the breath between the two halves of the story */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                These aren&apos;t photographs for this week. They&apos;re for
                the people you&apos;ll be a decade from now.
              </blockquote>
              <figcaption className="editorial-label mt-8 text-white/40">
                Emily Kathryn
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* Behind the scenes — image right, text left, mirroring the opening */}
      {!data?.bio && (
        <Section spacing="wide">
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-0">
              {/* Text */}
              <div className="order-2 md:order-1 md:col-span-6 md:pr-12">
                <span className="editorial-label text-brand-gold">
                  How I Work
                </span>
                <div className="mt-5 h-px w-12 bg-brand-gold" />
                <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {FALLBACK_BIO_CLOSING.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="editorial-image-hover relative order-1 md:order-2 md:col-span-7 md:col-start-6">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/brand/behind-the-scenes.jpg"
                    alt="Emily Kathryn directing a portrait session on location"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* Credentials — editorial figures, no invented numbers */}
      <Section spacing="tight">
        <RevealOnScroll variant="stagger">
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-16 md:grid-cols-3 md:gap-10">
            {CREDENTIALS.map((item) => (
              <div key={item.label}>
                <p className="font-heading text-3xl font-light text-foreground md:text-4xl">
                  {item.figure}
                </p>
                <span className="editorial-label mt-3 block text-brand-gold">
                  {item.label}
                </span>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* Philosophy section */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="text-center">
              <span className="editorial-label text-brand-gold">Philosophy</span>
              <h2 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl">
                {philosophyHeading}
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="stagger" className="mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
              {principles.map((item) => (
                <div key={item.num} className="text-center">
                  <span className="font-heading text-5xl font-light text-brand-gold/30">
                    {item.num}
                  </span>
                  <h3 className="mt-2 font-heading text-xl text-white">{item.title}</h3>
                  <div className="mx-auto mt-4 h-px w-8 bg-brand-gold/40" />
                  <p className="mt-4 text-sm leading-relaxed text-white/50">{item.text}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Recent work — a taste of the portfolio, so the page ends on pictures */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="editorial-label text-brand-gold">
                Recent Work
              </span>
              <h2 className="mt-3 font-heading text-3xl font-light md:text-4xl">
                A Look at the Work
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <Link
              href="/senior-portraits"
              className="group inline-flex items-center gap-3 sm:pb-2"
            >
              <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                View Senior Portraits
              </span>
              <svg
                width="24"
                height="8"
                viewBox="0 0 24 8"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-brand-gold"
                />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {PORTFOLIO_STRIP.map((image, i) => (
              <div
                key={image.src}
                className={`editorial-image-hover relative aspect-[4/5] overflow-hidden ${
                  i === 1 ? 'sm:mt-10' : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* CTA section */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
            <h2 className="font-heading text-4xl font-light md:text-5xl">{ctaHeading}</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {ctaBody}
            </p>
            <Link href="/contact" className="group mt-8 inline-flex items-center gap-3">
              <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                Get in Touch
              </span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  )
}
