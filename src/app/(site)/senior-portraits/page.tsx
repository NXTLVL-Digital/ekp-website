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
    'Editorial senior portraits for boys and girls in South-Central Virginia — a guided experience from wardrobe planning to an ordering appointment that ends in wall art and a senior album made to keep.',
  openGraph: {
    title: 'Senior Portraits | Emily Kathryn Photography',
    description:
      'Editorial senior portraits for boys and girls in South-Central Virginia — a guided experience from wardrobe planning to an ordering appointment that ends in wall art and a senior album made to keep.',
    url: 'https://emilykathryn.com/senior-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/senior-portraits.jpg', width: 1200, height: 630, alt: 'Senior portrait by Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Portraits | Emily Kathryn Photography',
    description: 'Editorial senior portraits in South-Central Virginia, finished as wall art and a senior album.',
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
      'We start with a relaxed conversation about your vision, your style, and what your family wants on the wall when this year is over. This is where I get to know you and we map out every detail together.',
  },
  {
    number: 2,
    title: 'Wardrobe Planning',
    description:
      'I guide you through outfit selections, color palettes, and accessories so you feel confident before session day even begins. Every look is chosen for how it photographs — and how it will read in a frame.',
  },
  {
    number: 3,
    title: 'Session Day',
    description:
      'Show up, relax, and let me direct. I tell you where to stand, what to do with your hands, and when to just laugh while we move through handpicked locations across South-Central Virginia.',
  },
  {
    number: 4,
    title: 'The Ordering Appointment',
    description:
      'About two to three weeks later, you and your family see your professionally retouched gallery for the first time — then I guide you through choosing what becomes wall art, what goes in your album, and which digital files are yours to keep.',
  },
  {
    number: 5,
    title: 'Heirloom Delivery',
    description:
      'Your framed wall art, senior album, and digital collection arrive finished and ready to live with — the album made to be the piece your family pulls off the shelf for decades.',
  },
]

const seniorFaqs = [
  {
    question: 'When should I book my senior session?',
    answer:
      "Book 6\u201312 months before graduation. That leaves room for planning, your wardrobe consultation, and a golden-hour session date you actually want. Spring and early fall fill first, so reach out as soon as you know you're interested \u2014 even if graduation still feels far away.",
  },
  {
    question: 'How many outfits can I bring?',
    answer:
      "Most seniors bring 3\u20135 outfits for real variety \u2014 casual, dressy, and editorial. We plan every look together during your wardrobe consultation, down to the accessories, so nothing is left to guesswork on session day.",
  },
  {
    question: 'Can I bring friends for a group session?',
    answer:
      "Yes \u2014 friend and group sessions are some of the most fun we make. Bring your closest friends, your squad, or your teammates: everyone gets individual time in front of the camera, and we photograph the real connection between you.",
  },
  {
    question: 'What locations do you shoot at?',
    answer:
      "I photograph throughout South-Central Virginia \u2014 from downtown Lynchburg's urban backdrops to rolling countryside and hidden garden spots. During our consultation, we'll choose locations that match your personality and the feel you're going for. I know where the light falls in this region, and we schedule around it.",
  },
  {
    question: 'How long until I see my photos?',
    answer:
      "Your professionally retouched gallery is ready about 2\u20133 weeks after your session. Then comes your ordering appointment \u2014 you and your family view the finished images together, and I guide you through selecting your wall art, your senior album, and your digital files.",
  },
  {
    question: 'Do you photograph senior boys?',
    answer:
      "Yes. Senior sessions are for everyone, and I photograph guys with the same editorial attention to detail. Expect a relaxed session with clear direction \u2014 where to stand, what to do with your hands \u2014 so nothing feels stiff or forced. The portraits look like him, at his most confident.",
  },
  {
    question: 'Do parents receive help choosing prints and albums?',
    answer:
      "Yes \u2014 that is exactly what the ordering appointment is for. After your session, you view the finished gallery in person and I guide every decision: which portraits belong on the wall, which sizes fit your space, and how the senior album comes together. No one is left to sort through hundreds of files alone.",
  },
  {
    question: 'What does a senior portrait session cost?',
    answer:
      "Senior sessions begin at $799. Wall art, albums, and digital collections are chosen afterward at your ordering appointment, once you've seen the finished portraits \u2014 so your final investment reflects what your family actually wants to keep.",
  },
  {
    question: 'What is the difference between a digital-only photographer and a boutique senior portrait experience?',
    answer:
      "A digital-only photographer hands you files, and the experience ends there. A boutique senior portrait experience is guided from start to finish \u2014 wardrobe planning, direction at every location, and an ordering appointment afterward \u2014 and it ends in printed artwork: wall art for your home and a senior album that marks the milestone. Your digital files still come with it; the difference is you also have something to hang up and hold.",
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
              An editorial portrait experience for guys and girls who want a Vogue
              shoot, not a yearbook &mdash; guided from wardrobe planning to wall
              art, with portraits that look like you at your most confident.
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
                  This isn&apos;t a yearbook photo with better lighting. Your senior
                  session is a full editorial experience designed around you &mdash;
                  your style, your personality, your year. We start with a planning
                  consultation where I get to know you, and together we map out
                  locations, wardrobe, and the feel you want.
                </p>
                <p>
                  On session day, you&apos;ll bring 3&ndash;5 outfits and we&apos;ll
                  spend 1&ndash;2 hours at handpicked locations across South-Central
                  Virginia. I&apos;ll direct every frame &mdash; where to stand, what
                  to do with your hands, when to just laugh &mdash; so you can relax
                  and look like yourself, only elevated.
                </p>
                <p>
                  About 2&ndash;3 weeks later, you and your family return for your
                  ordering appointment: the first time you see your finished,
                  professionally retouched gallery. Together we turn it into photos
                  you can hang up &mdash; not just files on your phone &mdash; with
                  framed wall art, your digital collection, and the senior album
                  that anchors it all.
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
              startingAt={seniorTier?.startingAt ?? 799}
              description={
                seniorTier?.description ??
                'A guided editorial experience from wardrobe planning through your ordering appointment \u2014 finished as wall art, a senior album, and your digital files.'
              }
              features={
                seniorTier?.features ?? [
                  '1\u20132 hour guided session',
                  'Wardrobe planning & 3\u20135 outfits',
                  'Handpicked locations',
                  'Professional retouching & online gallery',
                  'In-person ordering appointment',
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
                You&apos;re Only a Senior Once
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Let&apos;s plan something worth keeping. Tell me your vision and
                I&apos;ll design the session around it &mdash; guided from the first
                consultation to the wall art and album your family holds onto.
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
