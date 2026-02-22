import type { Metadata } from 'next'
import { Section } from '@/components/shared/Section'
import { InquiryForm } from '@/components/forms/InquiryForm'
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
    images: [
      {
        url: '/og/contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Emily Kathryn Photography — book your senior or family portrait session',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Emily Kathryn Photography',
    description:
      'Ready to book your dream session? Reach out to Emily Kathryn Photography in South-Central Virginia.',
    images: ['/og/contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Heading */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            I would love to hear from you. Whether you are ready to book your
            session or just exploring your options, fill out the form below
            and I will personally get back to you within 48 hours.
          </p>
        </div>
      </Section>

      {/* Form + Business Info */}
      <Section background="muted">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12">
          {/* Left column — Inquiry Form (primary) */}
          <div className="md:col-span-3">
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 font-heading text-2xl font-medium">
                Send Us a Message
              </h2>
              <InquiryForm />
            </div>
          </div>

          {/* Right column — Business Info */}
          <aside className="md:col-span-2">
            <div className="space-y-8">
              {/* Contact Info */}
              <div>
                <h3 className="mb-3 font-heading text-lg font-medium">
                  Contact Info
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Email: </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="transition-colors hover:text-brand-gold"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Phone: </span>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                      className="transition-colors hover:text-brand-gold"
                    >
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Service Area */}
              <div>
                <h3 className="mb-3 font-heading text-lg font-medium">
                  Service Area
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Based in {siteConfig.address.city}, {siteConfig.address.state},
                  proudly serving families and seniors across South-Central
                  Virginia — including Lynchburg, Danville, Chatham, Altavista,
                  and surrounding communities.
                </p>
              </div>

              {/* Follow Along */}
              <div>
                <h3 className="mb-3 font-heading text-lg font-medium">
                  Follow Along
                </h3>
                <div className="flex gap-4">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    Instagram
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    Facebook
                  </a>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    TikTok
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-4">
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-medium">Quick response guarantee:</span>{' '}
                  Emily personally reads every inquiry and responds within 48
                  hours. You&apos;ll also receive an automatic confirmation
                  email right away.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
