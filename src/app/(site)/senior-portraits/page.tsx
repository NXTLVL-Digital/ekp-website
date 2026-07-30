import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { Storyboard } from '@/components/shared/Storyboard'
import { PricingCard } from '@/components/shared/PricingCard'
import { AnswerBlock } from '@/components/shared/AnswerBlock'
import { ScarcityCue } from '@/components/shared/ScarcityCue'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
import { GalleryClient } from '@/components/shared/GalleryClient'
import { JsonLd } from '@/components/shared/JsonLd'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { seniorGalleryImages } from '@/lib/placeholder-galleries'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  PRICING_TIERS_QUERY,
  TESTIMONIALS_QUERY,
  ACTIVE_SCARCITY_CUE_QUERY,
} from '@/sanity/lib/queries'
import { buildServiceSchema } from '@/lib/schemas/service'
import { buildFaqPageSchema } from '@/lib/schemas/faqPage'
import { buildReviewSchemas, buildAggregateRatingSchema } from '@/lib/schemas/review'
import type { TestimonialData } from '@/lib/schemas/review'

export const metadata: Metadata = {
  title: 'Senior Portraits',
  description:
    'Editorial senior portrait photography for boys and girls in South-Central Virginia. A magazine-worthy experience with wardrobe planning, multiple outfits, and handpicked locations.',
  openGraph: {
    title: 'Senior Portraits | Emily Kathryn Photography',
    description:
      'Editorial senior portrait photography for boys and girls in South-Central Virginia. A magazine-worthy experience with wardrobe planning, multiple outfits, and handpicked locations.',
    url: 'https://emilykathryn.com/senior-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/senior-portraits.jpg', width: 1200, height: 630, alt: 'Senior portrait by Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Portraits | Emily Kathryn Photography',
    description: 'Editorial senior portrait photography for boys and girls in South-Central Virginia.',
    images: ['/og/senior-portraits.jpg'],
  },
}

interface PricingTier {
  _id: string
  name: string
  startingAt: number
  description: string
  features: string[]
  highlight: boolean
  sortOrder: number
}

interface ScarcityCueData {
  _id: string
  message: string
  isActive: boolean
  expiresAt?: string
}

const storyboardSteps = [
  {
    number: 1,
    title: 'Consultation',
    description:
      'We start with a relaxed conversation about your vision, personality, and style. This is where I get to know you and we map out every detail together.',
  },
  {
    number: 2,
    title: 'Wardrobe Planning',
    description:
      'I guide you through outfit selections, color palettes, and accessories so you feel confident and camera-ready before session day even begins.',
  },
  {
    number: 3,
    title: 'Session Day',
    description:
      'Show up, relax, and have fun. I direct every pose and angle while you enjoy the experience in stunning South-Central Virginia locations.',
  },
  {
    number: 4,
    title: 'Gallery Reveal',
    description:
      'About two to three weeks later, you and your family see your professionally retouched gallery for the first time. It is one of the best parts.',
  },
  {
    number: 5,
    title: 'Product Delivery',
    description:
      'Your custom wall art, heirloom albums, and digital images are delivered with care — pieces you will treasure for a lifetime.',
  },
]

const seniorFaqs = [
  {
    question: 'When should I book my senior session?',
    answer:
      "The best time to book is 6\u201312 months before graduation. This gives us plenty of time for planning, wardrobe consultation, and scheduling the perfect golden-hour session. Spring and early fall fill up fast, so I recommend reaching out as soon as you know you're interested \u2014 even if graduation feels far away.",
  },
  {
    question: 'How many outfits can I bring?',
    answer:
      "Most seniors bring 3\u20135 outfits to get a beautiful variety of looks. I'll help you plan every detail during our wardrobe consultation \u2014 from casual and fun to dressy and editorial. Don't worry about choosing on your own; that's what the planning session is for.",
  },
  {
    question: 'Can I bring friends for a group session?',
    answer:
      "Absolutely! BFF and group sessions are some of the most fun we have. Bring your best friend, your squad, or even your teammates. We'll capture the real connection between you, plus everyone gets individual spotlight time too.",
  },
  {
    question: 'What locations do you shoot at?',
    answer:
      "I photograph throughout South-Central Virginia \u2014 from downtown Lynchburg's urban backdrops to rolling countryside and hidden garden spots. During our consultation, we'll choose locations that match your personality and the vibe you're going for. I know all the best light in the region.",
  },
  {
    question: 'How long until I see my photos?',
    answer:
      "Your professionally retouched gallery will be ready in about 2\u20133 weeks. We'll schedule a gallery reveal where you and your family can view the images together and choose your favorites for wall art, albums, and digital delivery.",
  },
  {
    question: 'Do you photograph senior boys?',
    answer:
      "Yes! Senior sessions are for everyone. I photograph boys and girls with the same editorial attention to detail. Guys get a relaxed, natural session with direction on posing that feels authentic \u2014 no awkward forced smiles. Your portraits will look magazine-worthy, I promise.",
  },
]

export default async function SeniorPortraitsPage() {
  const [pricingTiers, testimonials, scarcityCue] = await Promise.all([
    sanityFetch<PricingTier[]>({
      query: PRICING_TIERS_QUERY,
      tags: ['pricingTier'],
    }),
    sanityFetch<Array<{ _id: string; name: string; quote: string; service?: string }>>({
      query: TESTIMONIALS_QUERY,
      params: { featured: null, service: 'senior' },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCueData | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])

  const seniorTier = pricingTiers?.find(
    (t) => t.name?.toLowerCase().includes('senior'),
  )

  const testimonialData: TestimonialData[] = testimonials
    ? testimonials.map((t) => ({ name: t.name, quote: t.quote, service: t.service }))
    : []
  const reviewSchemas = testimonialData.length > 0 ? buildReviewSchemas(testimonialData) : []

  return (
    <>
      <JsonLd data={buildServiceSchema({
        name: 'Senior Portrait Photography',
        description: 'Editorial senior portrait photography for boys and girls in South-Central Virginia.',
        url: 'https://emilykathryn.com/senior-portraits',
      })} />
      <JsonLd data={buildFaqPageSchema(seniorFaqs)} />
      {reviewSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      {testimonialData.length > 0 && (
        <JsonLd data={buildAggregateRatingSchema(testimonialData)} />
      )}

      {/* Editorial page header — dark */}
      <section className="relative overflow-hidden bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Services</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Senior Portraits
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              An editorial portrait experience for the bold, the creative, and the
              unapologetically you. For guys and girls who want magazine-worthy
              images that capture exactly who they are right now.
            </p>
          </div>
        </div>
      </section>

      {/* Scarcity cue */}
      {scarcityCue && (
        <ScarcityCue message={scarcityCue.message} isActive={scarcityCue.isActive} />
      )}

      {/* Featured image — full-bleed editorial */}
      <div className="editorial-image-hover relative">
        <div className="relative h-72 sm:h-96 md:h-[500px]">
          <Image
            src="/images/brand/behind-the-scenes.jpg"
            alt="Behind the scenes of an Emily Kathryn senior portrait session"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Session description — asymmetric editorial layout */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="editorial-label text-brand-gold">The Experience</span>
              <h2 className="mt-3 font-heading text-4xl font-light md:text-5xl">
                The Senior Experience
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  This isn&apos;t your average cap-and-gown photo. Your senior session
                  is a full editorial experience designed around you &mdash; your style,
                  your personality, your story. We start with a planning consultation
                  where I get to know you and we map out every detail together.
                </p>
                <p>
                  On session day, you&apos;ll bring 3&ndash;5 outfits and we&apos;ll
                  spend 1&ndash;2 hours at handpicked locations across South-Central
                  Virginia. I&apos;ll direct every pose so you can relax, have fun, and
                  just be yourself. No awkward stiffness &mdash; just natural, confident,
                  magazine-worthy images.
                </p>
                <p>
                  About 2&ndash;3 weeks later, we&apos;ll meet for your gallery reveal
                  where you and your family will see your stunning, professionally
                  retouched portraits for the first time.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* Senior gallery */}
      <Section spacing="wide" background="muted">
        <RevealOnScroll variant="up">
          <div className="mb-12 text-center">
            <span className="editorial-label text-brand-gold">Portfolio</span>
            <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
              Senior Portfolio
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          </div>
        </RevealOnScroll>
        <RevealOnScroll variant="scale">
          <GalleryClient
            images={seniorGalleryImages}
            displayStyle="masonry"
            priorityCount={0}
          />
        </RevealOnScroll>
      </Section>

      {/* Experience Storyboard */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="editorial-label text-brand-gold">Your Journey</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                Step by Step
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <Storyboard steps={storyboardSteps} />
          </div>
        </RevealOnScroll>
      </Section>

      {/* Pricing */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-15" />
        <div className="relative mx-auto max-w-lg px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mb-10 text-center">
              <span className="editorial-label text-brand-gold">Investment</span>
              <h2 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl">
                Your Investment
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <PricingCard
              name={seniorTier?.name ?? 'Senior Session'}
              startingAt={seniorTier?.startingAt ?? 400}
              description={
                seniorTier?.description ??
                'A fully guided editorial portrait experience designed around you.'
              }
              features={
                seniorTier?.features ?? [
                  '1\u20132 hour session',
                  'Multiple outfit changes',
                  'Multiple locations',
                  'Professional retouching',
                  'Online gallery',
                ]
              }
              highlight={seniorTier?.highlight ?? true}
              ctaLabel="Inquire for Detailed Pricing"
              ctaHref="/contact"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <span className="editorial-label text-brand-gold">FAQ</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                Common Questions
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
            <AnswerBlock items={seniorFaqs} />
          </div>
        </RevealOnScroll>
      </Section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <Section spacing="wide" background="muted">
          <RevealOnScroll variant="up">
            <div className="mb-12 text-center">
              <span className="editorial-label text-brand-gold">Kind Words</span>
              <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
                What Our Seniors Are Saying
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll variant="stagger">
            <TestimonialCarousel testimonials={testimonials} />
          </RevealOnScroll>
        </Section>
      )}

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Ready for Your Moment?
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Let&apos;s start planning your senior portrait experience. I would love
                to hear your vision and create something truly incredible together.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Inquire Now
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
