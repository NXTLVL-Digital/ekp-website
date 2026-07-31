import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { GalleryClient } from '@/components/shared/GalleryClient'
import type { GalleryImageData } from '@/components/shared/GalleryClient'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import { JsonLd } from '@/components/shared/JsonLd'
import { AnswerBlock } from '@/components/shared/AnswerBlock'
import { CityHero } from '@/components/city/CityHero'
import { AeoBlock } from '@/components/city/AeoBlock'
import { TrustBar } from '@/components/city/TrustBar'
import { ServiceCards } from '@/components/city/ServiceCards'
import { GoogleMapFacade } from '@/components/city/GoogleMapFacade'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { sanityFetch } from '@/sanity/lib/fetch'
import { CITY_PAGE_QUERY, TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { CITY_DATA, CITY_SLUGS } from '@/lib/cityData'
import { CITY_CONTENT } from '@/lib/cityContent'
import { cityGalleryImages } from '@/lib/placeholder-galleries'
import { buildCityLocalBusinessSchema } from '@/lib/schemas/localBusiness'
import { buildFaqPageSchema } from '@/lib/schemas/faqPage'
import { siteConfig } from '@/lib/siteConfig'
import type { PortableTextBlock } from '@portabletext/types'

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface CityPageData {
  title: string
  slug: string
  headline: string
  aeoBlock: string
  body: PortableTextBlock[]
  metaDescription: string
  mapQuery: string
  testimonialLabel?: string
  galleryImages?: GalleryImageData[]
  testimonials?: Array<{
    _id: string
    name: string
    quote: string
    service?: string
    image?: TestimonialImage
  }>
}

interface ImageRef {
  src: string
  alt: string
}

/* -------------------------------------------------------------------------- */
/*  Art direction                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Portfolio frames used to give every city page real visual weight, including
 * when the CMS gallery is still empty.
 *
 * Alt text is deliberately location neutral. These are portfolio images from
 * across South-Central Virginia, so none of them may be described as if it
 * were photographed in the city whose page it appears on.
 *
 * Every path below exists in public/images.
 */
const LANDSCAPE_FRAMES: ImageRef[] = [
  { src: '/images/seniors/EKP_0913.jpg', alt: 'Fashion-forward senior portrait with a wide-brim hat' },
  { src: '/images/seniors/EKP_7812.jpg', alt: 'Senior boy portrait among historic stonework' },
  { src: '/images/seniors/EKP_5990.jpg', alt: 'Senior boy portrait at sunset' },
  { src: '/images/families/EKP_1707-2.jpg', alt: 'Children playing with a red wagon in a field' },
  { src: '/images/seniors/EKP_8081.jpg', alt: 'Senior boy portrait with a vintage truck' },
  { src: '/images/families/EKP_1145.jpg', alt: 'Extended family walking together at a rustic farm' },
  { src: '/images/families/EKP_1477.jpg', alt: 'Multi-generational family portrait at a country cabin' },
  { src: '/images/seniors/EKP_8750.jpg', alt: 'Editorial senior boy portrait in autumn' },
  { src: '/images/families/EKP_1186.jpg', alt: 'Mother and daughters sharing a playful moment' },
  { src: '/images/seniors/EKP_1226_2.jpg', alt: 'Senior portrait beside a historic stone wall' },
  { src: '/images/families/HUTCHINSON-11.jpg', alt: 'Mother with her children in the countryside' },
  { src: '/images/seniors/EKP_5455.jpg', alt: 'Creative close-up senior portrait' },
]

const PORTRAIT_FRAMES: ImageRef[] = [
  { src: '/images/seniors/EKP_2401.jpg', alt: 'Graduate in cap and gown at golden hour' },
  { src: '/images/seniors/EKP_5960.jpg', alt: 'Relaxed senior portrait on a bridge' },
  { src: '/images/families/EKP_1211.jpg', alt: 'Family portrait in warm evening light' },
  { src: '/images/seniors/EKP_5436-Edit.jpg', alt: 'Editorial senior portrait among spring blossoms' },
  { src: '/images/seniors/EKP_8368.jpg', alt: 'Graduation portrait in a wildflower field' },
  { src: '/images/seniors/EKP_8089.jpg', alt: 'Senior portrait in a garden setting' },
  { src: '/images/families/EKP_2152.jpg', alt: 'Brother and sister portrait outdoors' },
  { src: '/images/seniors/EKP_9695.jpg', alt: 'Senior portrait in an elegant black dress' },
  { src: '/images/seniors/EKP_5643.jpg', alt: 'Senior portrait with a creative outdoor setting' },
  { src: '/images/seniors/EKP_5407.jpg', alt: 'Senior fashion portrait beneath an architectural bridge' },
  { src: '/images/seniors/EKP_8529.jpg', alt: 'Senior portrait in a flowing floral dress' },
  { src: '/images/seniors/EKP_0030.jpg', alt: 'Senior portrait in a woodland setting' },
  { src: '/images/seniors/EKP_5166.jpg', alt: 'Bright floral senior portrait' },
  { src: '/images/seniors/EKP_7683.jpg', alt: 'Senior boy portrait in a natural setting' },
]

/**
 * Lines Emily already says elsewhere on the site. Rotated by city so the seven
 * pages each land on a different note in the same voice.
 */
const PULL_QUOTES: string[] = [
  'A portrait is not finished until it is hanging on your wall.',
  'You will be directed the whole way through. All you have to do is show up as yourself.',
  'Trends fade. A framed portrait in the hallway does not.',
]

function frameAt(pool: ImageRef[], index: number): ImageRef {
  return pool[((index % pool.length) + pool.length) % pool.length]
}

/** Rotates an array so each city opens its gallery on a different frame. */
function rotate<T>(items: T[], by: number): T[] {
  if (items.length === 0) return items
  const offset = ((by % items.length) + items.length) % items.length
  return [...items.slice(offset), ...items.slice(0, offset)]
}

/* -------------------------------------------------------------------------- */
/*  Small presentational helpers                                               */
/* -------------------------------------------------------------------------- */

function ArrowCta({
  href,
  label,
  tone = 'dark',
  className = '',
}: {
  href: string
  label: string
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-3 ${className}`}
    >
      <span
        className={`editorial-label transition-colors duration-300 group-hover:text-brand-gold ${
          tone === 'light' ? 'text-white' : 'text-foreground'
        }`}
      >
        {label}
      </span>
      <svg
        width="24"
        height="8"
        viewBox="0 0 24 8"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path
          d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-brand-gold"
        />
      </svg>
    </Link>
  )
}

/**
 * PortableText renderers for CMS body copy. The typography plugin is not
 * installed, so every element carries explicit classes.
 */
const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-brand-gold pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
}

/* -------------------------------------------------------------------------- */
/*  Static Generation                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Only the 7 known city slugs resolve. Unknown slugs return 404.
 * Uses static CITY_DATA as source of truth (not Sanity) so builds work
 * even before CMS content is populated.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return CITY_SLUGS.map((slug) => ({ city: slug }))
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const data = await sanityFetch<CityPageData | null>({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })

  const cityGeo = CITY_DATA[city]
  const cityName = cityGeo?.name ?? city
  const seedContent = CITY_CONTENT[city]

  // Use CMS data first, then seed content, then generic fallback
  const metaDesc =
    data?.metaDescription ||
    seedContent?.metaDescription ||
    `Senior and family portrait photographer serving ${cityName}, Virginia. Editorial-style photography by Emily Kathryn Photography.`

  const title = `${cityName} Portrait Photographer | Emily Kathryn Photography`

  return {
    title: `${cityName} Portrait Photographer`,
    description: metaDesc,
    openGraph: {
      title,
      description: metaDesc,
      url: `${siteConfig.url}/${city}`,
      siteName: siteConfig.name,
      images: [
        {
          url: '/og/default.jpg',
          width: 1200,
          height: 630,
          alt: `Portrait photographer serving ${cityName}, Virginia`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDesc,
      images: ['/og/default.jpg'],
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params

  const [data, featuredTestimonials] = await Promise.all([
    sanityFetch<CityPageData | null>({
      query: CITY_PAGE_QUERY,
      params: { slug: city },
      tags: ['cityPage'],
    }),
    sanityFetch<Array<{ _id: string; name: string; quote: string; service?: string }>>({
      query: TESTIMONIALS_QUERY,
      params: { featured: true, service: null },
      tags: ['testimonial'],
    }),
  ])

  const cityGeo = CITY_DATA[city]
  const seedContent = CITY_CONTENT[city]

  // Only 404 if BOTH CMS data AND seed content are missing (should never
  // happen since CITY_DATA defines all 7 slugs and CITY_CONTENT covers them)
  if (!data && !seedContent) notFound()

  const cityName = data?.title || cityGeo?.name || city
  const mapQuery =
    data?.mapQuery || cityGeo?.mapQuery || `${cityName}, Virginia`
  const testimonialLabel = data?.testimonialLabel || cityName

  // Resolve content: CMS takes priority, seed content is fallback
  const headline =
    data?.headline || seedContent?.headline || `Senior Portraits in ${cityName}, VA`
  const aeoBlock = data?.aeoBlock || seedContent?.aeoBlock || ''
  const hasCmsBody = data?.body && data.body.length > 0
  const cityFaqs = seedContent?.faqs ?? []

  // Split seed content into paragraphs for editorial flow layout
  const bodyParagraphs =
    !hasCmsBody && seedContent?.bodyHtml
      ? seedContent.bodyHtml
          .split('</p>')
          .map((p: string) => p.replace(/^\s*<p>/, '').trim())
          .filter(Boolean)
      : []
  const introParas = bodyParagraphs.slice(0, 2)
  const remainingParas = bodyParagraphs.slice(2)
  const closingParas =
    remainingParas.length > 2 ? remainingParas.slice(-2) : remainingParas
  const middleParas =
    remainingParas.length > 2 ? remainingParas.slice(0, -2) : []

  /* --- Art direction, varied deterministically so no two cities match ----- */
  const cityIndex = Math.max(0, CITY_SLUGS.indexOf(city))
  const heroImage = frameAt(LANDSCAPE_FRAMES, cityIndex)
  const middleImage = frameAt(LANDSCAPE_FRAMES, cityIndex + 4)
  const ctaImage = frameAt(LANDSCAPE_FRAMES, cityIndex + 8)
  const introImage = frameAt(PORTRAIT_FRAMES, cityIndex * 4)
  const stripImages = [0, 1, 2].map((i) =>
    frameAt(PORTRAIT_FRAMES, cityIndex * 4 + 1 + i)
  )
  const pullQuote = PULL_QUOTES[cityIndex % PULL_QUOTES.length]

  /* --- Gallery: CMS images win. Local portfolio keeps the page whole. ----- */
  const hasCmsGallery = Boolean(
    data?.galleryImages && data.galleryImages.length > 0
  )
  const galleryImages = hasCmsGallery
    ? (data!.galleryImages as GalleryImageData[])
    : rotate(cityGalleryImages, cityIndex)

  return (
    <>
      {/* JSON-LD: City-specific LocalBusiness */}
      {cityGeo && <JsonLd data={buildCityLocalBusinessSchema(cityGeo)} />}

      {/* JSON-LD: FAQPage for AEO extraction */}
      {cityFaqs.length > 0 && <JsonLd data={buildFaqPageSchema(cityFaqs)} />}

      {/* ------------------------------------------------------------------ */}
      {/*  1. City Hero                                                       */}
      {/* ------------------------------------------------------------------ */}
      <CityHero cityName={cityName} headline={headline} image={heroImage} />

      {/* ------------------------------------------------------------------ */}
      {/*  2. AEO Answer Block                                                */}
      {/* ------------------------------------------------------------------ */}
      {aeoBlock && (
        <Section spacing="wide">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-5xl">
              <AeoBlock text={aeoBlock} cityName={cityName} />
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  3. Trust strip                                                     */}
      {/* ------------------------------------------------------------------ */}
      <TrustBar />

      {/* ------------------------------------------------------------------ */}
      {/*  4. Body Content: Editorial Flow                                    */}
      {/* ------------------------------------------------------------------ */}
      {hasCmsBody ? (
        <Section spacing="wide">
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
              <div className="editorial-image-hover relative md:col-span-5 md:col-start-8 md:row-start-1">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={introImage.src}
                    alt={introImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
              </div>

              <div className="relative z-10 md:col-span-7 md:col-start-1 md:row-start-1 md:mt-16 md:-mr-8">
                <div className="bg-background md:p-12">
                  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <PortableText value={data!.body} components={bodyComponents} />
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Section>
      ) : bodyParagraphs.length > 0 ? (
        <>
          {/* Intro: photograph right, type left, overlapping */}
          <Section spacing="wide">
            <RevealOnScroll variant="up">
              <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
                <div className="editorial-image-hover relative md:col-span-5 md:col-start-8 md:row-start-1">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={introImage.src}
                      alt={introImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                  </div>
                </div>

                <div className="relative z-10 md:col-span-7 md:col-start-1 md:row-start-1 md:mt-16 md:-mr-8">
                  <div className="bg-background md:p-12">
                    <span className="editorial-label text-brand-gold">
                      The Setting
                    </span>
                    <div className="mt-5 h-px w-12 bg-brand-gold" />
                    <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {introParas.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </Section>

          {/* Full-bleed image strip: the breath between two halves of copy */}
          <div className="grid grid-cols-3 gap-1">
            {stripImages.map((frame) => (
              <div
                key={frame.src}
                className="editorial-image-hover relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>

          {/* Pull quote: dark drama band */}
          <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
            <div className="pattern-hex absolute inset-0 opacity-20" />
            <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
              <RevealOnScroll variant="fade">
                <figure className="mx-auto max-w-3xl text-center">
                  <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
                  <blockquote className="font-heading text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                    {pullQuote}
                  </blockquote>
                  <figcaption className="editorial-label mt-8 text-white/40">
                    Emily Kathryn
                  </figcaption>
                </figure>
              </RevealOnScroll>
            </div>
          </section>

          {/* Middle: photograph left, type right, reversed flow */}
          {middleParas.length > 0 && (
            <Section spacing="wide">
              <RevealOnScroll variant="up">
                <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
                  <div className="editorial-image-hover relative md:col-span-7 md:col-start-1 md:row-start-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={middleImage.src}
                        alt={middleImage.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 58vw"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 md:col-span-5 md:col-start-8 md:row-start-1 md:mt-16 md:-ml-8">
                    <div className="bg-background md:p-12">
                      <span className="editorial-label text-brand-gold">
                        The Work
                      </span>
                      <div className="mt-5 h-px w-12 bg-brand-gold" />
                      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {middleParas.map((p, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </Section>
          )}

          {/* Closing: centered, with the two service routes */}
          {closingParas.length > 0 && (
            <Section spacing="tight">
              <RevealOnScroll variant="up">
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
                  <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {closingParas.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                  <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Whether you are looking for{' '}
                    <Link
                      href="/senior-portraits"
                      className="border-b border-brand-gold/40 pb-0.5 text-foreground transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
                    >
                      senior portraits
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="/family-portraits"
                      className="border-b border-brand-gold/40 pb-0.5 text-foreground transition-colors duration-300 hover:border-brand-gold hover:text-brand-gold"
                    >
                      family portraits
                    </Link>
                    , Emily Kathryn Photography would love to create something
                    beautiful with you in {cityName}.
                  </p>
                </div>
              </RevealOnScroll>
            </Section>
          )}
        </>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/*  5. Services                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted" spacing="wide">
        <RevealOnScroll variant="up">
          <div className="max-w-2xl">
            <span className="editorial-label text-brand-gold">Services</span>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              Portrait Services in {cityName}
            </h2>
            <div className="mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Two signature experiences designed to celebrate who you are right
              now.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-14">
          <ServiceCards cityName={cityName} variant={cityIndex} />
        </RevealOnScroll>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  6. Gallery                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="editorial-label text-brand-gold">Portfolio</span>
              <h2 className="mt-3 font-heading text-3xl font-light md:text-4xl">
                {hasCmsGallery ? `Recent Work in ${cityName}` : 'Recent Work'}
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                {hasCmsGallery
                  ? `A selection of recent sessions photographed in and around ${cityName}.`
                  : 'A selection of recent senior and family sessions from across South-Central Virginia.'}
              </p>
            </div>
            <ArrowCta
              href="/senior-portraits"
              label="View the Full Portfolio"
              className="sm:pb-2"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="scale" className="mt-12">
          <GalleryClient
            images={galleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </RevealOnScroll>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  7. Testimonials                                                    */}
      {/* ------------------------------------------------------------------ */}
      {data?.testimonials && data.testimonials.length > 0 ? (
        <Section className="border-t border-border" spacing="wide">
          <RevealOnScroll variant="up">
            <div className="mb-14 text-center">
              <span className="editorial-label text-brand-gold">
                In Their Words
              </span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                Kind Words from {testimonialLabel}
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="stagger">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
              {data.testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  name={testimonial.name}
                  quote={testimonial.quote}
                  service={testimonial.service}
                  image={testimonial.image}
                  variant="editorial"
                />
              ))}
            </div>
          </RevealOnScroll>
        </Section>
      ) : featuredTestimonials && featuredTestimonials.length > 0 ? (
        <Section className="border-t border-border" spacing="wide">
          <RevealOnScroll variant="up">
            <div className="mb-14 text-center">
              <span className="editorial-label text-brand-gold">
                In Their Words
              </span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                What Our Clients Are Saying
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="stagger">
            <TestimonialCarousel testimonials={featuredTestimonials} />
          </RevealOnScroll>
        </Section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/*  8. FAQ                                                             */}
      {/* ------------------------------------------------------------------ */}
      {cityFaqs.length > 0 && (
        <Section background="muted" spacing="wide">
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <span className="editorial-label text-brand-gold">
                  Questions
                </span>
                <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <div className="mt-5 h-px w-12 bg-brand-gold" />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  What families around {cityName} ask before they book. If your
                  question is not here, send it over and Emily will answer it
                  herself.
                </p>
              </div>
              <div className="md:col-span-8">
                <AnswerBlock items={cityFaqs} id="faq" />
              </div>
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  9. Map: facade only, no embed until the visitor asks for it        */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="editorial-label text-brand-gold">
                On Location
              </span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                Find Us Near {cityName}, VA
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <div className="mt-12">
              <GoogleMapFacade query={mapQuery} cityName={cityName} />
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  10. Closing CTA: photo-backed bookend                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <Image
          src={ctaImage.src}
          alt={ctaImage.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Start Planning Your {cityName} Session
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
                Ready to plan portraits worth framing in {cityName}? Tell Emily
                what you are picturing and she will take it from there.
              </p>
              <div className="mt-8">
                <ArrowCta href="/contact" label="Get in Touch" tone="light" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
