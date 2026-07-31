import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/fetch'
import { JOURNAL_POSTS_QUERY } from '@/sanity/lib/queries'
import { sanityLoader } from '@/sanity/lib/image'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import { JOURNAL_CONTENT } from '@/lib/journalContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Style tips, session recaps, and behind-the-scenes stories from Emily Kathryn Photography, serving seniors and families across South-Central Virginia.',
  alternates: {
    canonical: '/journal',
  },
  openGraph: {
    title: 'Journal | Emily Kathryn Photography',
    description:
      'Style tips, session recaps, and behind-the-scenes stories from Emily Kathryn Photography.',
    url: 'https://emilykathryn.com/journal',
    siteName: 'Emily Kathryn Photography',
    images: [{ url: '/og/journal.jpg', width: 1200, height: 630, alt: 'The Emily Kathryn Photography journal' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Emily Kathryn Photography',
    description: 'Style tips, session recaps, and behind-the-scenes stories.',
    images: ['/og/journal.jpg'],
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  'style-tips': 'Style Tips',
  'session-recap': 'Session Recap',
  'behind-the-scenes': 'Behind the Scenes',
  'announcement': 'Announcement',
  'for-families': 'For Families',
  'for-seniors': 'For Seniors',
}

interface JournalPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  category: string
  excerpt: string
  featured: boolean
  coverImage?: {
    asset: {
      _id: string
      url: string
      metadata: {
        lqip: string
        dimensions: { width: number; height: number; aspectRatio: number }
      }
    }
    hotspot?: { x: number; y: number }
    crop?: { top: number; bottom: number; left: number; right: number }
    alt?: string
  }
}

/**
 * Normalized shape rendered by the card grid. Sanity images go through
 * `sanityLoader`; seed images are plain files under /public and must not.
 */
type CardCover =
  | { kind: 'sanity'; url: string; alt: string; lqip?: string }
  | { kind: 'local'; src: string; alt: string }
  | null

interface CardPost {
  key: string
  slug: string
  title: string
  publishedAt: string
  category: string
  excerpt: string
  featured: boolean
  cover: CardCover
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function JournalPage() {
  const cmsPosts = await sanityFetch<JournalPost[]>({
    query: JOURNAL_POSTS_QUERY,
    tags: ['journalPost'],
  })

  // CMS takes priority. Seed content in src/lib/journalContent.ts is the
  // fallback until Sanity is populated, mirroring the city pages.
  const posts: CardPost[] =
    cmsPosts && cmsPosts.length > 0
      ? cmsPosts.map((post) => ({
          key: post._id,
          slug: post.slug,
          title: post.title,
          publishedAt: post.publishedAt,
          category: post.category,
          excerpt: post.excerpt,
          featured: Boolean(post.featured),
          cover: post.coverImage?.asset
            ? {
                kind: 'sanity',
                url: post.coverImage.asset.url,
                alt: post.coverImage.alt || post.title,
                lqip: post.coverImage.asset.metadata?.lqip,
              }
            : null,
        }))
      : JOURNAL_CONTENT.map((post) => ({
          key: post.slug,
          slug: post.slug,
          title: post.title,
          publishedAt: post.publishedAt,
          category: post.category,
          excerpt: post.excerpt,
          featured: Boolean(post.featured),
          cover: {
            kind: 'local',
            src: post.coverImage.src,
            alt: post.coverImage.alt,
          },
        }))

  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Stories &amp; Inspiration</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Journal
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              Session recaps, style tips, behind-the-scenes moments, and everything
              else happening at Emily Kathryn Photography.
            </p>
          </div>
        </div>
      </section>

      {/* Post grid */}
      <Section spacing="wide">
        {posts.length > 0 ? (
          <RevealOnScroll variant="stagger">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.key}
                  href={`/journal/${post.slug}`}
                  className="group block"
                >
                  {/* Cover image */}
                  <div className="editorial-image-hover relative aspect-[4/3] overflow-hidden">
                    {post.cover?.kind === 'sanity' ? (
                      <Image
                        loader={sanityLoader}
                        src={post.cover.url}
                        alt={post.cover.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder={post.cover.lqip ? 'blur' : 'empty'}
                        blurDataURL={post.cover.lqip}
                      />
                    ) : post.cover?.kind === 'local' ? (
                      <Image
                        src={post.cover.src}
                        alt={post.cover.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="editorial-label bg-brand-gold px-3 py-1 text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Post meta */}
                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <span className="editorial-label text-brand-gold">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                      {post.publishedAt && (
                        <>
                          <span className="text-muted-foreground/40">·</span>
                          <time
                            dateTime={post.publishedAt}
                            className="text-xs tracking-wide text-muted-foreground"
                          >
                            {formatDate(post.publishedAt)}
                          </time>
                        </>
                      )}
                    </div>
                    <h2 className="mt-2 font-heading text-2xl font-light transition-colors duration-300 group-hover:text-brand-gold">
                      {post.title}
                    </h2>
                    <div className="mt-3 h-px w-8 bg-brand-gold/40 transition-all duration-300 group-hover:w-12 group-hover:bg-brand-gold" />
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="editorial-label mt-4 inline-block text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                      Read More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        ) : (
          <div className="py-16 text-center">
            <p className="font-heading text-2xl font-light text-muted-foreground">
              Coming Soon
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Stories, style tips, and session recaps are on their way. Check back soon.
            </p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Your Turn
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Every one of these started with somebody sending a note. Tell me
                who you are and what you have in mind.
              </p>
              <Link href="/contact" className="group mt-8 inline-flex items-center gap-3">
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Start a Conversation
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
