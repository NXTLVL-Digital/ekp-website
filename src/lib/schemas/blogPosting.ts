import type { BlogPosting, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

interface BlogPostingInput {
  /** Journal slug, without the /journal/ prefix. */
  slug: string
  title: string
  description: string
  /** Absolute URL or a root-relative path under /public. */
  image?: string
  /** ISO date string. */
  datePublished: string
  dateModified?: string
}

/**
 * Build a BlogPosting JSON-LD schema for a single journal post.
 *
 * Both `author` and `publisher` reference BUSINESS_ID so every post is wired
 * into the same knowledge graph as the site-wide LocalBusiness entity, the
 * same way buildServiceSchema references it via `provider`.
 */
export function buildBlogPostingSchema(
  post: BlogPostingInput,
): WithContext<BlogPosting> {
  const url = `${siteConfig.url}/journal/${post.slug}`
  const image = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${siteConfig.url}${post.image}`
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(image ? { image } : {}),
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  }
}
