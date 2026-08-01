import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/lib/fetch'
import { JOURNAL_POST_BY_SLUG_QUERY, JOURNAL_SLUGS_QUERY } from '@/sanity/lib/queries'
import { sanityLoader } from '@/sanity/lib/image'
import { Section } from '@/components/shared/Section'
import { AnswerBlock } from '@/components/shared/AnswerBlock'
import { JsonLd } from '@/components/shared/JsonLd'
import { JOURNAL_CONTENT, getJournalPost } from '@/lib/journalContent'
import { buildBlogPostingSchema } from '@/lib/schemas/blogPosting'
import { buildFaqPageSchema } from '@/lib/schemas/faqPage'
import { buildBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { siteConfig } from '@/lib/siteConfig'
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

/**
 * Tailwind child selectors that reproduce the PortableText overrides above for
 * seed posts, which ship as hardcoded HTML strings rather than Portable Text.
 * Keep the two in sync so a post looks identical whether it comes from Sanity
 * or from src/lib/journalContent.ts.
 */
const SEED_BODY_CLASSES = [
  'space-y-6',
  // paragraphs
  '[&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-muted-foreground md:[&>p]:text-base',
  // headings
  '[&>h2]:font-heading [&>h2]:text-3xl [&>h2]:font-light md:[&>h2]:text-4xl',
  '[&>h3]:font-heading [&>h3]:text-2xl [&>h3]:font-light',
  // pull quote
  '[&>blockquote]:border-l-2 [&>blockquote]:border-brand-gold [&>blockquote]:pl-6',
  '[&>blockquote]:font-heading [&>blockquote]:text-xl [&>blockquote]:font-light [&>blockquote]:italic',
  // lists
  '[&>ul]:list-disc [&>ol]:list-decimal [&>ul]:pl-5 [&>ol]:pl-5 [&>ul]:space-y-2 [&>ol]:space-y-2',
  '[&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-muted-foreground md:[&_li]:text-base',
  '[&_li::marker]:text-brand-gold',
  // inline marks
  '[&_strong]:font-medium [&_strong]:text-foreground',
  '[&_em]:italic',
  '[&_a]:text-brand-gold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-foreground',
].join(' ')

/* -------------------------------------------------------------------------- */
/*  Static Generation                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Every seed slug is pre-rendered so the six archive posts build statically
 * even with an empty CMS. Sanity slugs are merged in when available.
 */
export async function generateStaticParams() {
  let cmsSlugs: { slug: string }[] = []
  try {
    cmsSlugs = await sanityFetch<{ slug: string }[]>({
      query: JOURNAL_SLUGS_QUERY,
      tags: ['journalPost'],
    })
  } catch {
    // Sanity not configured or unreachable; seed slugs still build
  }

  const slugs = new Set<string>(JOURNAL_CONTENT.map((post) => post.slug))
  for (const entry of cmsSlugs ?? []) {
    if (entry?.slug) slugs.add(entry.slug)
  }

  return Array.from(slugs).map((slug) => ({ slug }))
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

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
  const seed = getJournalPost(slug)

  if (!post && !seed) return { title: 'Post Not Found' }

  const title = post?.title || seed?.title || 'Journal'
  const description = post?.excerpt || seed?.excerpt || ''
  const ogImage = post?.coverImage?.asset?.url || seed?.coverImage.src

  return {
    title,
    description,
    // Archive posts (2018-2019) are kept out of search: that content no
    // longer sells what Emily sells. The evergreen guides are the opposite:
    // written for search, marked indexable in journalContent.ts, and listed
    // in the sitemap. The /journal index itself stays indexable throughout.
    robots: seed?.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: `/journal/${slug}`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/journal/${slug}`,
      siteName: siteConfig.name,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
      locale: 'en_US',
      type: 'article',
      publishedTime: post?.publishedAt || seed?.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cmsPost = await sanityFetch<JournalPostData | null>({
    query: JOURNAL_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['journalPost'],
  })
  const seed = getJournalPost(slug)

  // CMS takes priority; seed content is the fallback. 404 only when neither
  // source has the slug.
  if (!cmsPost && !seed) notFound()

  const title = cmsPost?.title || seed!.title
  const publishedAt = cmsPost?.publishedAt || seed!.publishedAt
  const category = cmsPost?.category || seed!.category
  const excerpt = cmsPost?.excerpt || seed!.excerpt
  const hasCmsBody = Boolean(cmsPost?.body && cmsPost.body.length > 0)
  const faqs = seed?.faqs ?? []

  const cmsCover = cmsPost?.coverImage?.asset
  const coverAlt = cmsPost?.coverImage?.alt || seed?.coverImage.alt || title
  const schemaImage = cmsCover?.url || seed?.coverImage.src

  return (
    <>
      {/* JSON-LD: BlogPosting, wired to the site-wide LocalBusiness entity */}
      <JsonLd
        data={buildBlogPostingSchema({
          slug,
          title,
          description: excerpt,
          image: schemaImage,
          datePublished: publishedAt,
          dateModified: seed?.updatedAt,
        })}
      />

      {/* JSON-LD: FAQPage for AEO extraction */}
      {faqs.length > 0 && <JsonLd data={buildFaqPageSchema(faqs)} />}

      {/* JSON-LD: breadcrumbs, indexable guides only (archive posts are
          noindex and get no SERP display to feed) */}
      {seed?.indexable && (
        <JsonLd
          data={buildBreadcrumbSchema([
            { name: 'Home', url: siteConfig.url },
            { name: 'Journal', url: `${siteConfig.url}/journal` },
            { name: title, url: `${siteConfig.url}/journal/${slug}` },
          ])}
        />
      )}

      {/* Editorial post header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
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
                {CATEGORY_LABELS[category] ?? category}
              </span>
              {publishedAt && (
                <>
                  <span className="text-white/30">·</span>
                  <time dateTime={publishedAt} className="text-xs tracking-wide text-white/50">
                    {formatDate(publishedAt)}
                  </time>
                </>
              )}
            </div>
            <h1 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
          </div>
        </div>
      </section>

      {/* Cover image */}
      {(cmsCover || seed?.coverImage) && (
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="relative -mt-8 aspect-[16/7] overflow-hidden md:-mt-12">
            {cmsCover ? (
              <Image
                loader={sanityLoader}
                src={cmsCover.url}
                alt={coverAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority
                placeholder={cmsCover.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={cmsCover.metadata?.lqip}
              />
            ) : (
              <Image
                src={seed!.coverImage.src}
                alt={coverAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority
              />
            )}
          </div>
        </div>
      )}

      {/* Post body */}
      <Section spacing="wide">
        <div className="mx-auto max-w-2xl">
          {/* Excerpt / lede */}
          {excerpt && (
            <p className="mb-8 font-heading text-xl font-light text-muted-foreground md:text-2xl">
              {excerpt}
            </p>
          )}
          <div className="mb-8 h-px w-12 bg-brand-gold" />

          {/* Rich text body: Portable Text from the CMS, or seed HTML.
              Seed HTML is hardcoded in this repo (never user input), so
              dangerouslySetInnerHTML is safe here, same as the city pages. */}
          {hasCmsBody ? (
            <div className="space-y-6">
              <PortableText value={cmsPost!.body} components={portableTextComponents} />
            </div>
          ) : seed ? (
            <div
              className={SEED_BODY_CLASSES}
              dangerouslySetInnerHTML={{ __html: seed.bodyHtml }}
            />
          ) : null}

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

      {/* FAQ / answer block */}
      {faqs.length > 0 && (
        <Section background="muted">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-light md:text-4xl">
              Questions About This Session
            </h2>
            <AnswerBlock items={faqs} id="faq" />
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
            <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
              Let&apos;s Plan Something Worth Keeping
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
              Senior portraits, family sessions, or an idea that doesn&apos;t fit
              either box. Tell me what you have in mind.
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
