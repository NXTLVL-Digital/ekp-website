import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Section } from '@/components/shared/Section'
import { GalleryClient } from '@/components/shared/GalleryClient'
import type { GalleryImageData } from '@/components/shared/GalleryClient'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import { JsonLd } from '@/components/shared/JsonLd'
import { CityHero } from '@/components/city/CityHero'
import { AeoBlock } from '@/components/city/AeoBlock'
import { GoogleMapFacade } from '@/components/city/GoogleMapFacade'
import { sanityFetch } from '@/sanity/lib/fetch'
import { CITY_PAGE_QUERY } from '@/sanity/lib/queries'
import { CITY_DATA, CITY_SLUGS } from '@/lib/cityData'
import { buildCityLocalBusinessSchema } from '@/lib/schemas/localBusiness'
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

  if (!data) {
    return {
      title: `${cityName} Portrait Photographer`,
      description: `Senior and family portrait photographer serving ${cityName}, Virginia. Editorial-style photography by Emily Kathryn Photography.`,
    }
  }

  const title = `${data.title} Portrait Photographer | Emily Kathryn Photography`
  const description =
    data.metaDescription ||
    `Senior and family portrait photographer serving ${data.title}, Virginia. Editorial-style photography by Emily Kathryn Photography.`

  return {
    title: `${data.title} Portrait Photographer`,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${data.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: '/og/default.jpg',
          width: 1200,
          height: 630,
          alt: `Portrait photographer serving ${data.title}, Virginia`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  const data = await sanityFetch<CityPageData | null>({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })

  if (!data) notFound()

  const cityGeo = CITY_DATA[city]
  const mapQuery = data.mapQuery || cityGeo?.mapQuery || `${data.title}, Virginia`
  const testimonialLabel = data.testimonialLabel || data.title

  return (
    <>
      {/* JSON-LD: City-specific LocalBusiness */}
      {cityGeo && <JsonLd data={buildCityLocalBusinessSchema(cityGeo)} />}

      {/* ------------------------------------------------------------------ */}
      {/*  1. City Hero                                                       */}
      {/* ------------------------------------------------------------------ */}
      <CityHero
        cityName={data.title}
        headline={data.headline || `Senior Portraits in ${data.title}, VA`}
      />

      {/* ------------------------------------------------------------------ */}
      {/*  2. AEO Answer Block                                                */}
      {/* ------------------------------------------------------------------ */}
      {data.aeoBlock && (
        <Section>
          <div className="mx-auto max-w-3xl">
            <AeoBlock text={data.aeoBlock} cityName={data.title} />
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  3. Body Copy (Portable Text)                                       */}
      {/* ------------------------------------------------------------------ */}
      {data.body && data.body.length > 0 && (
        <Section background="muted">
          <div className="prose prose-lg mx-auto max-w-3xl text-muted-foreground">
            <PortableText value={data.body} />
            <p className="mt-6">
              Whether you are looking for{' '}
              <Link
                href="/senior-portraits"
                className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-dark"
              >
                senior portraits
              </Link>{' '}
              or{' '}
              <Link
                href="/family-portraits"
                className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-dark"
              >
                family portraits
              </Link>
              , Emily Kathryn Photography would love to create something beautiful
              with you in {data.title}.
            </p>
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  4. Gallery Section                                                  */}
      {/* ------------------------------------------------------------------ */}
      {data.galleryImages && data.galleryImages.length > 0 && (
        <Section>
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              Our Work in {data.title}
            </h2>
          </div>
          <GalleryClient
            images={data.galleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  5. Testimonials Section                                             */}
      {/* ------------------------------------------------------------------ */}
      {data.testimonials && data.testimonials.length > 0 && (
        <Section background="muted">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              Kind Words from {testimonialLabel}
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {data.testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                name={testimonial.name}
                quote={testimonial.quote}
                service={testimonial.service}
                image={testimonial.image}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  6. Google Maps Section                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center font-heading text-3xl font-light md:text-4xl">
            Find Us Near {data.title}, VA
          </h2>
          <GoogleMapFacade query={mapQuery} cityName={data.title} />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  7. CTA Section                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section background="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Start Planning Your {data.title} Session
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ready to create stunning portraits in {data.title}? I would love to
            hear about your vision and make it happen.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Start Planning Your {data.title} Session
          </Link>
        </div>
      </Section>
    </>
  )
}
