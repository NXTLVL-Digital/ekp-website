import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/lib/fetch'
import { JOURNAL_POST_BY_SLUG_QUERY, JOURNAL_SLUGS_QUERY } from '@/sanity/lib/queries'
import { sanityLoader } from '@/sanity/lib/image'
import { Section } from '@/components/shared/Section'
import type { Metadata } from 'next'

const CATEGORY_LABELS: Record<string, string> = {
  'style-tips': 'Style Tips',
  'session-recap': 'Session Recap',
  'behind-the-scenes': 'Behind the Scenes',
  'announcement': 'Announcement',
  'for-families': 'For Families',
  'for-seniors': 'For Seniors',
}

interface ImageAsset {
  _id: string
  url: string
  metadata: {
    lqip: string
    dimensions: { width: number; height: number; aspectRatio: number }
  }
}

interface SanityImage {
  asset: ImageAsset
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
  caption?: string
}

interface JournalPostData {
  title: string
  slug: string
  publishedAt: string
  category: string
  excerpt: string
  coverImage: SanityImage
  body: PortableTextBlock[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// PortableText component overrides — matches editorial aesthetic
const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-heading text-3xl font-light md:text-4xl">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-heading text-2xl font-light">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-brand-gold pl-6 font-heading text-xl font-light italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-gold underline underline-offset-2 hover:text-foreground"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden">
            <Image
              loader={sanityLoader}
              src={value.asset.url}
              alt={value.alt || ''}
              width={value.asset.metadata?.dimensions?.width ?? 1200}
              height={value.asset.metadata?.dimensions?.height ?? 800}
              className="w-full object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={value.asset.metadata?.lqip}
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: JOURNAL_SLUGS_QUERY,
    tags: ['journalPost'],
  })
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<JournalPostData | null>({
    query: JOURNAL_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['journalPost'],
  })

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Emily Kathryn Photography`,
      description: post.excerpt,
      url: `https://emilykathryn.com/journal/${slug}`,
      siteName: 'Emily Kathryn Photography',
      ...(post.coverImage?.asset?.url && {
        images: [{ url: post.coverImage.asset.url, width: 1200, height: 630, alt: post.title }],
      }),
      locale: 'en_US',
      type: 'article',
    },
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await sanityFetch<JournalPostData | null>({
    query: JOURNAL_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['journalPost'],
  })

  if (!post) notFound()

  return (
    <>
      {/* Editorial post header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/journal"
              className="editorial-label inline-flex items-center gap-2 text-white/50 transition-colors hover:text-brand-gold"
            >
              <svg width="16" height="6" viewBox="0 0 16 6" fill="none">
                <path d="M16 3H2M2 3L5.5 0.5M2 3L5.5 5.5" stroke="currentColor" strokeWidth="0.75" />
              </svg>
              Journal
            </Link>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="editorial-label text-brand-gold">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
              {post.publishedAt && (
                <>
                  <span className="text-white/30">·</span>
                  <time dateTime={post.publishedAt} className="text-xs tracking-wide text-white/50">
                    {formatDate(post.publishedAt)}
                  </time>
                </>
              )}
            </div>
            <h1 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage?.asset && (
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="relative -mt-8 aspect-[16/7] overflow-hidden md:-mt-12">
            <Image
              loader={sanityLoader}
              src={post.coverImage.asset.url}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
              placeholder={post.coverImage.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={post.coverImage.asset.metadata?.lqip}
            />
          </div>
        </div>
      )}

      {/* Post body */}
      <Section spacing="wide">
        <div className="mx-auto max-w-2xl">
          {/* Excerpt / lede */}
          {post.excerpt && (
            <p className="mb-8 font-heading text-xl font-light text-muted-foreground md:text-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="mb-8 h-px w-12 bg-brand-gold" />

          {/* Rich text body */}
          <div className="space-y-6">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Back link */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3"
            >
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
              <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
                Back to Journal
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
            <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
              Ready to Create Something Beautiful?
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
              Let&apos;s talk about your vision. Senior portraits, family sessions,
              or something entirely your own.
            </p>
            <Link href="/contact" className="group mt-8 inline-flex items-center gap-3">
              <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                Get in Touch
              </span>
              <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
