import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Emily Kathryn — a portrait photographer in South-Central Virginia who believes every session should feel like a magazine shoot. Serving Chatham, Danville, Lynchburg, and beyond.',
  openGraph: {
    title: 'About | Emily Kathryn Photography',
    description:
      'Meet Emily Kathryn — a portrait photographer in South-Central Virginia who believes every session should feel like a magazine shoot.',
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
    description:
      'Meet Emily Kathryn — a portrait photographer in South-Central Virginia who believes every session should feel like a magazine shoot.',
    images: ['/og/about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero — Emily's story with photo placeholder */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: Emily's portrait (replaced with SanityImage when CMS content is added) */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/placeholder/emily.jpeg"
              alt="Emily Kathryn — portrait photographer in South-Central Virginia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Story content */}
          <div>
            <h1 className="font-heading text-4xl font-light md:text-5xl">
              Hey, I&apos;m Emily
            </h1>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
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
          </div>
        </div>
      </Section>

      {/* Philosophy section */}
      <Section background="muted">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            What I Believe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            These are the principles that guide every session, every edit, and
            every interaction.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10">
              <span className="font-heading text-2xl text-brand-gold">01</span>
            </div>
            <h3 className="mt-4 font-heading text-xl">Your Story Matters</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Every family has a rhythm. Every senior has a spark. My job is not
              to pose you into someone else — it is to reveal who you already
              are, beautifully and authentically.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10">
              <span className="font-heading text-2xl text-brand-gold">02</span>
            </div>
            <h3 className="mt-4 font-heading text-xl">
              Experience Over Everything
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Your session is not just about the final images — it is about how
              you feel while we create them. I want you to leave feeling
              confident, celebrated, and genuinely excited to see the results.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10">
              <span className="font-heading text-2xl text-brand-gold">03</span>
            </div>
            <h3 className="mt-4 font-heading text-xl">
              Art That Lasts Generations
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Trends come and go, but timeless portraits endure. I create images
              with an editorial, magazine-quality finish that you will be proud
              to display in your home for decades to come.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA section */}
      <Section>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Let&apos;s Create Something Beautiful Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            I would love to hear about your vision — whether it is a
            milestone senior session or timeless family portraits. Let&apos;s
            start the conversation.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded bg-brand-gold px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  )
}
