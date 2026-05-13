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
    title: 'Your Story Matters',
    text: 'Every family has a rhythm. Every senior has a spark. My job is not to pose you into someone else — it is to reveal who you already are, beautifully and authentically.',
  },
  {
    num: '02',
    title: 'Experience Over Everything',
    text: 'Your session is not just about the final images — it is about how you feel while we create them. I want you to leave feeling confident, celebrated, and genuinely excited to see the results.',
  },
  {
    num: '03',
    title: 'Art That Lasts Generations',
    text: 'Trends come and go, but timeless portraits endure. I create images with an editorial, magazine-quality finish that you will be proud to display in your home for decades to come.',
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
    'Meet Emily Kathryn — a portrait photographer in South-Central Virginia who believes every session should feel like a magazine shoot. Serving Chatham, Danville, Lynchburg, and beyond.'

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
          alt: 'Emily Kathryn — portrait photographer based in South-Central Virginia',
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
  const ctaHeading = data?.ctaHeading ?? "Let's Create Something Beautiful Together"
  const ctaBody =
    data?.ctaBody ??
    "I would love to hear about your vision — whether it is a milestone senior session or timeless family portraits. Let's start the conversation."

  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">About</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Hey, I&apos;m Emily
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
                    alt={data.headshot.alt ?? 'Emily Kathryn — portrait photographer in South-Central Virginia'}
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
                    src="/placeholder/emily.jpeg"
                    alt="Emily Kathryn — portrait photographer in South-Central Virginia"
                    fill
                    className="object-cover"
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
                      There is something extraordinary about a photograph that makes
                      you stop and truly <em>feel</em> something. That single frame
                      where light, expression, and emotion align in a way that is
                      completely, unmistakably you. That is what I chase in every
                      session I shoot.
                    </p>
                    <p>
                      My journey into photography started the way most great loves
                      do — unexpectedly. What began as a creative outlet quickly
                      became a calling. I realized I was not just taking pictures; I
                      was capturing the quiet confidence of a senior stepping into
                      who they are becoming, the unscripted laughter between a
                      parent and their child, and the simple magic of a family just
                      being together.
                    </p>
                    <p>
                      Based in the heart of South-Central Virginia, I have built my
                      reputation on one belief: every session should feel like a
                      magazine shoot. Not stiff. Not rushed. Not generic. I am
                      talking about that relaxed, editorial quality where you look
                      at the final images and think, <em>&quot;That is actually
                      me.&quot;</em>
                    </p>
                    <p>
                      What makes my approach different is that I take the time to
                      know you before I ever pick up the camera. Whether we are
                      talking about your senior&apos;s personality and style or the
                      way your family naturally connects, I want every frame to
                      reflect something real. The result is not just a portrait — it
                      is art that tells your story.
                    </p>
                    <p>
                      From golden-hour fields in Chatham to the charming streetscapes
                      of Danville, the rolling foothills near Lynchburg, and
                      everywhere in between, I am honored to serve families and
                      seniors across this beautiful corner of Virginia. And I truly
                      cannot wait to create something beautiful with you.
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
