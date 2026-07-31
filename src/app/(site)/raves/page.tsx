import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/fetch'
import { TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { JsonLd } from '@/components/shared/JsonLd'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import { SEED_TESTIMONIALS } from '@/lib/testimonialContent'
import type { TestimonialImage } from '@/components/testimonials/TestimonialCard'
import type { Metadata } from 'next'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData } from '@/lib/schemas/review'

export const metadata: Metadata = {
  title: 'Raves',
  description:
    'Hear what clients are saying about their experience with Emily Kathryn Photography. Real reviews from seniors and families in South-Central Virginia.',
  openGraph: {
    title: 'Raves | Emily Kathryn Photography',
    description: 'Hear what clients are saying about their portrait experience with Emily Kathryn Photography.',
    url: 'https://emilykathryn.com/raves',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/raves.jpg', width: 1200, height: 630, alt: 'Client testimonials for Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raves | Emily Kathryn Photography',
    description: 'Hear what clients are saying about their portrait experience.',
    images: ['/og/raves.jpg'],
  },
}

interface Testimonial {
  _id: string
  name: string
  quote: string
  service?: string
  featured?: boolean
  image?: TestimonialImage
}

/**
 * Routes onward. These render whether or not Sanity has testimonials yet, so
 * the page always ends on pictures and a way forward rather than a dead end.
 */
const NEXT_STEPS = [
  {
    href: '/senior-portraits',
    label: 'Senior Portraits',
    linkText: 'View Senior Sessions',
    src: '/images/seniors/EKP_8529.jpg',
    alt: 'Senior portrait in a flowing floral dress',
    text: 'One senior, a few locations, and a gallery that reads like a magazine spread rather than a folder of pictures.',
  },
  {
    href: '/family-portraits',
    label: 'Family Portraits',
    linkText: 'View Family Sessions',
    src: '/images/families/EKP_2152.jpg',
    alt: 'Brother and sister portrait outdoors',
    text: 'Everyone in one frame, directed without the stiffness, and planned around the piece that ends up on your wall.',
  },
]

export default async function RavesPage() {
  const testimonials = await sanityFetch<Testimonial[]>({
    query: TESTIMONIALS_QUERY,
    params: { featured: null, service: null },
    tags: ['testimonial'],
  })

  const reviewData: TestimonialData[] = testimonials.map((t) => ({
    name: t.name,
    quote: t.quote,
    service: t.service,
  }))
  const reviewSchemas = reviewData.length > 0 ? buildReviewSchemas(reviewData) : []

  return (
    <>
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {reviewData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(reviewData)} />
      )}

      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Testimonials</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Kind Words
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Nothing means more to me than knowing my clients walk away from
              their session feeling confident and celebrated, and that the
              portraits we made together now hang on their walls. These are
              their words, not mine.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials grid, or a designed invitation while the CMS fills up */}
      <Section spacing="wide">
        {testimonials.length > 0 ? (
          <RevealOnScroll variant="stagger">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  name={testimonial.name}
                  quote={testimonial.quote}
                  service={testimonial.service}
                  image={testimonial.image}
                />
              ))}
            </div>
          </RevealOnScroll>
        ) : SEED_TESTIMONIALS.length > 0 ? (
          /* Real testimonials carried over from the previous site. They are not
             fed into the Review JSON-LD above, because that builder asserts a
             five star rating and these were written testimonials with no rating
             attached. Emily's CMS entries take over the moment she adds them. */
          <RevealOnScroll variant="stagger">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SEED_TESTIMONIALS.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  quote={testimonial.quote}
                  service={testimonial.context}
                  variant="editorial"
                />
              ))}
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll variant="up">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
              {/* Feature portrait */}
              <div className="editorial-image-hover relative md:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/seniors/EKP_5407.jpg"
                    alt="Senior fashion portrait beneath an architectural bridge"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                  />
                </div>
              </div>

              {/* Editorial invitation */}
              <div className="relative z-10 md:col-span-7 md:col-start-6 md:-ml-8 md:mt-16">
                <div className="bg-background md:p-12">
                  <span className="editorial-label text-brand-gold">
                    In Their Words
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                    The First Word Goes to the Work
                  </h2>
                  <div className="mt-5 h-px w-12 bg-brand-gold" />
                  <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <p>
                      This page belongs to my clients. I am gathering notes from
                      recent seniors and families now, and their words will live
                      here as they come in.
                    </p>
                    <p>
                      Until then, the portraits can speak first. Every gallery on
                      this site was made for someone in Chatham, Danville,
                      Lynchburg, or a field somewhere in between.
                    </p>
                  </div>

                  <div className="mt-10 border-t border-border pt-8">
                    <span className="editorial-label text-brand-gold">
                      Photographed With Me Before?
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      I would love to hear how your session felt and where the
                      prints ended up. Your note may be the one that helps the
                      next family decide.
                    </p>
                    <Link
                      href="/contact"
                      className="group mt-6 inline-flex min-h-11 items-center gap-3"
                    >
                      <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                        Share Your Experience
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
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </Section>

      {/* Pull quote: dark drama between the words and the work */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                The reaction I work for is never &ldquo;nice photo.&rdquo;
                It&apos;s &ldquo;that&apos;s actually me.&rdquo;
              </blockquote>
              <figcaption className="editorial-label mt-8 text-white/40">
                Emily Kathryn
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* Where to next: pictures and routes, in both CMS states */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="editorial-label text-brand-gold">The Work</span>
            <h2 className="mt-3 font-heading text-3xl font-light md:text-4xl">
              Start With the Pictures
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8">
            {NEXT_STEPS.map((step, i) => (
              <Link
                key={step.href}
                href={step.href}
                className={`group block ${i === 1 ? 'sm:mt-16' : ''}`}
              >
                <div className="editorial-image-hover relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <span className="editorial-label mt-6 block text-brand-gold">
                  {step.label}
                </span>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
                <span className="mt-5 inline-flex min-h-11 items-center gap-3">
                  <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                    {step.linkText}
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
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Ready to Have Your Own Experience?
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Every session is designed to be relaxed, fun, and uniquely you.
                Let&apos;s talk about creating something you will rave about too.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex min-h-11 items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Inquire About a Session
                </span>
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
