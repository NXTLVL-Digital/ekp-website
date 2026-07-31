import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Emily Kathryn Photography collects, uses, and protects your information.',
  openGraph: {
    title: 'Privacy Policy | Emily Kathryn Photography',
    description:
      'How Emily Kathryn Photography collects, uses, and protects your information.',
    url: 'https://emilykathryn.com/privacy',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: 'Emily Kathryn Photography' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Emily Kathryn Photography',
    description:
      'How Emily Kathryn Photography collects, uses, and protects your information.',
    images: ['/og/default.jpg'],
  },
}

const EFFECTIVE_DATE = 'July 31, 2026'

export default function PrivacyPage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Legal</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Privacy Policy
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Your trust matters as much as your portraits. This page explains
              what information we collect, why we collect it, and how it is
              protected.
            </p>
          </div>
        </div>
      </section>

      {/* Policy body */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-12">
            <p className="text-sm text-muted-foreground">
              Effective date: {EFFECTIVE_DATE}
            </p>

            <div>
              <span className="editorial-label text-brand-gold">
                What We Collect
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                When you submit the inquiry form, we collect the information you
                provide. That is your name, email address, phone number if you
                share it, and the details of the session you are interested in. That
                is the only personal information this website asks for. We also
                use analytics tools to understand how visitors use the site, as
                described below. We do not run advertising trackers, and we do
                not sell or rent your information to anyone.
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">
                How It Is Used
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Inquiry details are delivered by email to {siteConfig.name} so
                we can respond to your request, and a confirmation email is
                sent to the address you provide. Emails are delivered through
                Resend, our email service provider. Your information is used to
                communicate with you about your session and for no other
                purpose.
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">
                Hosting &amp; Technical Data
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                This site is hosted on Vercel, which keeps standard server logs
                (such as IP address and pages requested) for security and
                reliability. These logs are managed under Vercel&apos;s privacy
                practices. This site does not set advertising or cross-site
                tracking cookies.
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">
                Analytics
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                We use two analytics services to understand how people find and
                use this site, so we can make it better. Google Analytics tells
                us which pages get visited and how people arrive. Microsoft
                Clarity records anonymized session activity such as clicks,
                scrolling, and mouse movement, which shows us where visitors get
                stuck. Both services set their own cookies and both may record
                your IP address. Neither is used for advertising, and we never
                connect what they collect to the details you send through the
                inquiry form.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                If you would rather not be included, most browsers offer a
                &ldquo;Do Not Track&rdquo; setting, and Google publishes an
                opt-out add-on for Analytics at{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-gold"
                >
                  tools.google.com/dlpage/gaoptout
                </a>
                .
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">
                Portraits &amp; Minors
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Many of the portraits on this site feature high school seniors.
                Client images are published only with the prior consent of the
                client. For minors, that means the consent of a parent or
                guardian.
                All published images have identifying camera metadata removed.
                If you would like an image of you or your child removed from
                the site, email us and it will be taken down promptly.
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">
                Your Choices
              </span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                You may request a copy of the information we hold about you,
                ask us to correct it, or ask us to delete it at any time.
                Contact{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-gold"
                >
                  {siteConfig.email}
                </a>{' '}
                and we will take care of it.
              </p>
            </div>

            <div>
              <span className="editorial-label text-brand-gold">Changes</span>
              <div className="mt-4 h-px w-12 bg-brand-gold" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                If our practices change, this page will be updated and the
                effective date above revised. Questions about this policy are
                always welcome at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-gold"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
