import type { Metadata } from 'next'
import { Section } from '@/components/shared/Section'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Emily Kathryn Photography to book your senior portrait or family photography session in South-Central Virginia. Response within 48 hours.',
  openGraph: {
    title: 'Contact | Emily Kathryn Photography',
    description:
      'Ready to book your dream session? Reach out to Emily Kathryn Photography — serving Gretna, Lynchburg, Danville, and South-Central Virginia.',
    url: `${siteConfig.url}/contact`,
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/contact.jpg', width: 1200, height: 630, alt: 'Contact Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Emily Kathryn Photography',
    description: 'Ready to book your dream session? Reach out to Emily Kathryn Photography.',
    images: ['/og/contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Contact</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Get in Touch
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              I would love to hear from you. Whether you are ready to book your
              session or just exploring your options, fill out the form below
              and I will personally get back to you within 48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Business Info */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Left column — Inquiry Form */}
            <div className="md:col-span-7">
              <div className="border border-border p-8 md:p-10">
                <span className="editorial-label text-brand-gold">Send a Message</span>
                <div className="mt-1 mb-8 h-px w-8 bg-brand-gold" />
                <InquiryForm />
              </div>
            </div>

            {/* Right column — Business Info */}
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
                        className="transition-colors hover:text-brand-gold"
                      >
                        {siteConfig.email}
                      </a>
                    </p>
                    {siteConfig.phone ? (
                      <p>
                        <span className="editorial-label mr-2 text-foreground">Phone</span>
                        <a
                          href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                          className="transition-colors hover:text-brand-gold"
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
                    Based in {siteConfig.address.city}, {siteConfig.address.state},
                    proudly serving families and seniors across South-Central
                    Virginia — including Lynchburg, Danville, Chatham, Altavista,
                    and surrounding communities.
                  </p>
                </div>

                <div className="h-px w-full bg-border" />

                {/* Follow Along */}
                <div>
                  <span className="editorial-label text-brand-gold">Follow Along</span>
                  <div className="mt-4 flex gap-6">
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
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-gold"
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
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    From there, everything is guided: your session, then an
                    ordering appointment to design your wall art and album, then
                    your finished heirlooms delivered ready to hang.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  )
}
