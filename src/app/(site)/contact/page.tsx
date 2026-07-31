import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Inquire about senior and family portrait sessions across South-Central Virginia. Emily reads every message and replies personally within 48 hours.',
  openGraph: {
    title: 'Contact | Emily Kathryn Photography',
    description:
      'Inquire for senior and family portrait availability across South-Central Virginia. Personal response within 48 hours.',
    url: `${siteConfig.url}/contact`,
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/contact.jpg', width: 1200, height: 630, alt: 'Contact Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Emily Kathryn Photography',
    description: 'Inquire for senior and family portrait availability across South-Central Virginia. Personal response within 48 hours.',
    images: ['/og/contact.jpg'],
  },
}

/** Opening image pair, one from each side of the work. */
const OVERTURE = [
  {
    src: '/images/seniors/EKP_8081.jpg',
    alt: 'Senior boy portrait with a vintage truck on a country road',
  },
  {
    src: '/images/families/EKP_1477.jpg',
    alt: 'Multi-generational family portrait at a country cabin',
  },
]

/** The path after the form, drawn from how sessions already run. */
const NEXT_STEPS = [
  {
    num: '01',
    title: 'Your Inquiry',
    text: 'Send the form with as much or as little detail as you have. Emily reads every message herself and answers it herself.',
  },
  {
    num: '02',
    title: 'Your Session',
    text: 'From there, everything is guided: the plan, the location, the wardrobe, and the direction on the day.',
  },
  {
    num: '03',
    title: 'Your Artwork',
    text: 'An ordering appointment to design your artwork and album, then finished pieces delivered ready to hang.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Contact</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Get in Touch
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              I&apos;d love to hear from you. Whether you&apos;re ready to plan
              your session or just have questions, fill out the form below and
              I&apos;ll personally get back to you within 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Image overture + form + business info */}
      <Section spacing="wide">
        <RevealOnScroll variant="stagger">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {OVERTURE.map((image, i) => (
              <div
                key={image.src}
                className={`editorial-image-hover relative aspect-[3/2] overflow-hidden ${
                  i === 1 ? 'sm:mt-12' : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Left column: Inquiry Form */}
            <div className="md:col-span-7">
              <span className="editorial-label text-brand-gold">
                Send a Message
              </span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                Tell Me About Your Session
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A date in mind, a location you love, or nothing at all yet. Any
                of it is a fine place to start.
              </p>
              <div className="mt-10 border border-border p-8 md:p-10">
                <InquiryForm />
              </div>
            </div>

            {/* Right column: Business Info */}
            <aside className="md:col-span-4 md:col-start-9">
              <div className="space-y-10">
                {/* Contact Info */}
                <div>
                  <span className="editorial-label text-brand-gold">Contact Info</span>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="editorial-label mr-2 text-foreground">Email</span>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="inline-flex min-h-11 items-center transition-colors hover:text-brand-gold"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                    {siteConfig.phone ? (
                      <p>
                        <span className="editorial-label mr-2 text-foreground">Phone</span>
                        <a
                          href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                          className="inline-flex min-h-11 items-center transition-colors hover:text-brand-gold"
                        >
                          {siteConfig.phone}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="h-px w-full bg-border" />

                {/* Service Area */}
                <div>
                  <span className="editorial-label text-brand-gold">Service Area</span>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Based in {siteConfig.address.city}, {siteConfig.address.state}.
                    Sessions run all over South-Central Virginia: Lynchburg,
                    Danville, Chatham, Altavista, and the towns in between.
                  </p>
                </div>

                <div className="h-px w-full bg-border" />

                {/* Follow Along */}
                <div>
                  <span className="editorial-label text-brand-gold">Follow Along</span>
                  <div className="mt-2 flex gap-6">
                    {[
                      { label: 'Instagram', href: siteConfig.social.instagram },
                      { label: 'Facebook', href: siteConfig.social.facebook },
                      { label: 'TikTok', href: siteConfig.social.tiktok },
                    ].map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-border" />

                {/* Response guarantee */}
                <div className="border-l-2 border-brand-gold pl-5">
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="editorial-label text-brand-gold">Personal Response</span>
                    <br />
                    <span className="mt-2 block text-muted-foreground">
                      Emily personally reads every inquiry and responds within 48
                      hours. You&apos;ll also receive an automatic confirmation
                      email right away.
                    </span>
                  </p>
                </div>

                {/* Studio taste, so the column ends on a photograph */}
                <div className="editorial-image-hover relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/seniors/EKP_5166.jpg"
                    alt="Bright floral senior portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </div>
            </aside>
          </div>
        </RevealOnScroll>
      </Section>

      {/* What happens after you hit send */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="text-center">
              <span className="editorial-label text-brand-gold">
                What Happens Next
              </span>
              <h2 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl">
                How It Goes From Here
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="stagger" className="mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
              {NEXT_STEPS.map((step) => (
                <div key={step.num}>
                  <span className="font-heading text-5xl font-light text-brand-gold/30">
                    {step.num}
                  </span>
                  <h3 className="mt-2 font-heading text-xl text-white">
                    {step.title}
                  </h3>
                  <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="up" className="mt-16">
            <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-10 sm:flex-row sm:justify-center sm:gap-14">
              {[
                { href: '/senior-portraits', label: 'See Senior Portraits' },
                { href: '/family-portraits', label: 'See Family Portraits' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex min-h-11 items-center gap-3"
                >
                  <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                    {link.label}
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
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
