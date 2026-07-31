import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/lib/fetch'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries'
import { sanityLoader } from '@/sanity/lib/image'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
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
      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
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
                    <p>
                      Emily Kathryn has photographed seniors and families across
                      South-Central Virginia for more than a decade. Long enough
                      to know the right photograph doesn&apos;t happen by
                      accident.
                    </p>
                    <p>
                      For me, it clicked the first time I watched a senior see
                      themselves photographed well. Not turned into somebody
                      else. Just themselves, at their most confident.
                      That&apos;s still the reason I pick up the camera.
                    </p>
                    <p>
                      I&apos;ve built my work on one belief: a session should
                      feel like a magazine shoot. Relaxed, directed, never
                      rushed. When you see the finished images, the reaction I
                      want is simple. <em>&quot;That&apos;s actually
                      me.&quot;</em>
                    </p>
                    <p>
                      And the work isn&apos;t done when the gallery is
                      delivered. I photograph with the final print in mind: how
                      the light holds up on paper, which image anchors the
                      album, which one earns the big frame. These aren&apos;t
                      photographs for this week. They&apos;re for the people
                      you&apos;ll be a decade from now.
                    </p>
                    <p>
                      From golden-hour fields in Chatham to the brick streets
                      of downtown Danville, the foothills near Lynchburg, and
                      the docks of Smith Mountain Lake, this corner of Virginia
                      is home. If your people are here, I hope we get to work
                      together.
                    </p>
                  </div>
                )}
              </div>
            </div>
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
