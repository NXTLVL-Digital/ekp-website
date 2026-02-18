# Phase 1: Foundation - Research

**Researched:** 2026-02-18
**Domain:** Next.js 15.5 + Sanity v4 + Tailwind v4 scaffolding, image pipeline, ISR revalidation, NAP config, root layout
**Confidence:** HIGH

## Summary

Phase 1 establishes the complete infrastructure shell that every future page lives inside: a Next.js 15.5 App Router project deployed to Vercel, with Sanity v4 embedded at `/studio`, a `SanityImage` wrapper delivering LQIP blur placeholders and WebP/AVIF via Sanity's CDN, tag-based ISR revalidation via webhook, a single `siteConfig.ts` NAP+W source of truth, and the root layout with nav/footer. No content pages are built -- only the infrastructure and site-wide wrapper.

The stack is pinned and verified: Next.js 15.5.12 + React 19.0.x + Sanity v4.22.0 + next-sanity v11.6.12 + Tailwind v4.1.x. A critical cache behavior change in Next.js 15 means `fetch` defaults to `no-store` -- the `sanityFetch` wrapper MUST explicitly set `cache: 'force-cache'` with tags for ISR to work. Route groups `(site)` and `(studio)` are required to prevent Sanity Studio from inheriting the site layout. The SanityImage wrapper should use a custom Sanity CDN loader to bypass Vercel's image optimization billing. Fonts must be self-hosted via `next/font/local` since Acrom is a commercial font and the heading serif will likely be a Google Font loaded via `next/font/google`.

**Primary recommendation:** Build the project in three clear layers -- (1) scaffold + deploy, (2) image pipeline + SanityImage wrapper, (3) Sanity schemas + ISR webhook + NAP config + root layout with nav/footer -- validating each layer before proceeding.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Full navigation with all page links: Senior Portraits, Family Portraits, Investment, About, Raves, Style Guide, Contact -- plus CTA button
- "Inquire for Detailed Pricing" CTA button present in nav on all pages
- Logo uses primary brand mark ("emily kathryn photography")
- Rich footer: logo, NAP info, social links, secondary nav links, brand tagline, copyright
- Social links: Instagram, Facebook, TikTok (all three platforms)
- Full business address displayed in footer (Gretna, VA street address) for maximum local SEO
- Secondary nav links mirror main nav for accessibility/SEO
- White + black dominant palette -- photography takes center stage, clean uncluttered backgrounds
- Brand colors (gold #c2a36c, dusty rose #dcb6ad, sage #b3d4cd, gray #d6d4d4) used as accents only
- Critical direction: Less feminine than current site -- gender-inclusive editorial aesthetic per FOUND-05
- Replace Yo Andy (decorative serif) with a modern editorial serif (Didone-style or clean serif) for headings -- keeps editorial feel without ornate femininity
- Acrom (sans-serif) remains for body text and UI elements
- Brand assets: mostly derived from the brand board image; only a couple of logo files exist separately
- Emily edits content only: photos, testimonials, FAQ answers, scarcity cue text, page copy -- structure and layout are locked by developer
- Sanity Studio shows full view organized by category sections
- Jeff handles ongoing site maintenance -- Emily does content updates only

### Claude's Discretion
- Nav sticky behavior (scroll-aware hide/show vs always sticky -- optimize for mobile conversion)
- Mobile menu pattern (hamburger + slide-out vs full-screen overlay -- match editorial aesthetic)
- CTA button styling (match brand aesthetic -- balance visibility with editorial refinement)
- Footer CTA inclusion (decide based on conversion best practices)
- Gold (#c2a36c) usage -- use where impactful but keep gender-neutral; don't overuse
- Brand board patterns -- determine if/where subtle geometric patterns add value without adding femininity
- Heading serif font selection -- pick a modern editorial serif that replaces Yo Andy while matching the brand's premium feel

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Site built on Next.js with App Router, deployed to Vercel | Standard Stack section: `create-next-app@15` with `--app --src-dir --typescript --tailwind`, Vercel deployment via Git. Pinned to Next.js 15.5.12. |
| FOUND-02 | Sanity v4 CMS with embedded Studio at /studio for client content management | Architecture Patterns: Route group separation `(site)` vs `(studio)`, `NextStudio` at `app/(studio)/studio/[[...tool]]/page.tsx`, CORS configuration required. |
| FOUND-03 | Next.js image pipeline with WebP/AVIF format selection, blur placeholders (Sanity LQIP), and lazy loading | Code Examples: `SanityImage` wrapper component with custom Sanity CDN loader, LQIP from `asset->metadata.lqip` GROQ projection, `remotePatterns` for `cdn.sanity.io`. |
| FOUND-04 | ISR with tag-based revalidation via Sanity webhook for near-instant CMS updates | Architecture Patterns: `sanityFetch` wrapper with `cache: 'force-cache'` + `next.tags`, webhook route at `/api/revalidate` using `parseBody` from `next-sanity/webhook`, GROQ-powered webhook projects tags. |
| FOUND-05 | Mobile-first responsive design with gender-inclusive editorial aesthetic | Discretion Recommendations: Scroll-aware sticky nav, full-screen overlay mobile menu, editorial serif font (Cormorant Garamond or Playfair Display), Tailwind v4 `@theme` for brand tokens. |
| FOUND-06 | 44x44px minimum tap targets on all interactive elements | Common Pitfalls: Set minimum `min-h-11 min-w-11` (44px) on all interactive elements via Tailwind utility classes; verify with Lighthouse tap target audit. |
| FOUND-07 | DNS configured for emilykathryn.com on Vercel | Open Questions: Requires Emily's DNS access. Vercel domain config is straightforward once DNS credentials are available. |
| PERF-04 | Hero images use priority loading with accurate sizes props | Code Examples: `priority={true}` on single hero image per page, accurate `sizes` prop (e.g., `"100vw"` for full-bleed, `"(max-width: 1200px) 100vw, 1200px"` for constrained). Never set priority on multiple images. |
| SEO-07 | Canonical NAP+W consistency across all pages -- single config source of truth | Architecture Patterns: `siteConfig.ts` exports canonical NAP+W object consumed by Header, Footer, JSON-LD, and all page components. Zero hardcoded NAP strings. |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.12 | React meta-framework with App Router, SSR/ISR/SSG | 14+ months stable. Built-in image optimization. Vercel deployment is zero-config. |
| React | 19.0.4 | UI library | Broadest compatibility with Next.js 15.5 and Sanity v4.22. |
| Sanity | 4.22.0 | Headless CMS with embedded Studio | Built-in LQIP, hotspot/crop, image CDN. Free tier covers this project. |
| next-sanity | 11.6.12 | Official Sanity toolkit for Next.js | Handles draft mode, visual editing, ISR hooks. v11 supports Next.js 15 + Sanity v4. |
| @sanity/client | ^7.13.2 | GROQ query client | Required peer dep of next-sanity. Fetch-based caching native to Next.js. |
| @sanity/image-url | 2.0.3 | Image URL builder | Generates CDN URLs with crop, hotspot, size params for Sanity images. |
| styled-components | ^6.1.15 | CSS-in-JS (Sanity dep) | Required peer dependency of Sanity Studio. Only used within Studio, not site code. |
| TypeScript | ~5.9 | Type safety | Catches CMS schema/query mismatches at build time. |
| Tailwind CSS | 4.1.x | Utility-first CSS | CSS-first config via `@theme`. 70% smaller production output than v3. |
| @tailwindcss/postcss | 4.1.x | PostCSS plugin for Tailwind v4 | Required for Tailwind v4 with Next.js. Replaces old PostCSS plugin. |

### Supporting (Phase 1 only)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/analytics | 1.6.1 | Web analytics | Add to root layout. Privacy-friendly, zero-config on Vercel. |
| @vercel/speed-insights | 1.3.1 | Core Web Vitals RUM | Add to root layout. Validates < 2.5s LCP target with real user data. |
| schema-dts | 1.1.5 | TypeScript JSON-LD types | Type-safe structured data. Used for JSON-LD component pattern. |

### Installation (Phase 1)

```bash
# Create Next.js project
npx create-next-app@15 emilykathryn --typescript --tailwind --app --src-dir --import-alias "@/*"

# Sanity CMS
npm install sanity@4 next-sanity@11 @sanity/client @sanity/image-url @sanity/vision styled-components

# Analytics
npm install @vercel/analytics @vercel/speed-insights

# SEO (type-safe JSON-LD)
npm install schema-dts

# Dev dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
src/
├── app/
│   ├── (site)/                    # Route group for public-facing site
│   │   ├── layout.tsx             # Root site layout: fonts, nav, footer, analytics
│   │   ├── page.tsx               # Homepage (placeholder in Phase 1)
│   │   └── not-found.tsx          # Custom 404
│   │
│   ├── (studio)/                  # Route group for Sanity Studio (separate layout)
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx       # Embedded Sanity Studio
│   │
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts           # Sanity webhook handler for on-demand ISR
│   │
│   ├── layout.tsx                 # Root <html> layout (minimal: lang, meta charset)
│   └── globals.css                # Tailwind imports + @theme brand tokens
│
├── sanity/
│   ├── env.ts                     # NEXT_PUBLIC_SANITY_PROJECT_ID, DATASET, API_VERSION
│   ├── lib/
│   │   ├── client.ts              # Sanity client initialization
│   │   ├── fetch.ts               # sanityFetch wrapper with ISR/tag caching
│   │   ├── queries.ts             # GROQ queries (defineQuery)
│   │   ├── image.ts               # Image URL builder + custom loader
│   │   └── live.ts                # defineLive configuration (for future visual editing)
│   ├── schemas/
│   │   ├── index.ts               # Schema registry
│   │   └── siteSettings.ts        # NAP+W, social links, brand tagline
│   └── sanity.config.ts           # Studio config: plugins, schema, structure
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Nav with all page links + CTA button
│   │   ├── Footer.tsx             # Rich footer: logo, NAP, socials, secondary nav
│   │   └── MobileNav.tsx          # Client Component: mobile menu toggle
│   └── shared/
│       └── SanityImage.tsx        # Wrapper: next/image + Sanity loader + LQIP
│
├── lib/
│   └── siteConfig.ts              # Canonical NAP+W single source of truth
│
└── fonts/                         # Self-hosted Acrom font files (woff2)
    ├── Acrom-Regular.woff2
    ├── Acrom-Medium.woff2
    └── Acrom-Bold.woff2
```

### Pattern 1: Route Group Separation for Embedded Studio

**What:** Use Next.js route groups `(site)` and `(studio)` to give the public site and Sanity Studio completely separate layouts. This prevents Sanity Studio from inheriting the site's nav/footer and prevents site pages from loading Studio JS.

**When to use:** Always when embedding Sanity Studio in a Next.js app.

**Why critical:** Without route groups, the root `layout.tsx` wraps both the site and Studio. This means Studio pages get the site's nav/footer (broken UI), and site pages may load Studio code (massive bundle increase). The `<SanityLive>` component must only render in the `(site)` layout, never in the `(studio)` layout, or it causes unexpected reloads.

**Source:** [Sanity Embedding Docs](https://www.sanity.io/docs/studio/embedding-sanity-studio), [next-sanity README](https://github.com/sanity-io/next-sanity)

```typescript
// app/layout.tsx — Minimal root layout (shared by both route groups)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/(site)/layout.tsx — Site layout with nav, footer, analytics
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// app/(studio)/studio/[[...tool]]/page.tsx — Studio (no site layout)
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### Pattern 2: sanityFetch Wrapper with Explicit Cache Control

**What:** A centralized fetch wrapper that explicitly opts into caching (Next.js 15 defaults to `no-store`) and supports tag-based ISR revalidation.

**When to use:** Every Sanity data fetch across the entire site.

**Why critical:** Next.js 15 changed the default `fetch` behavior from `force-cache` to `no-store`. Without explicitly setting `cache: 'force-cache'`, every page render makes a fresh Sanity API call -- burning API quota and eliminating ISR benefits. When tags are provided, `revalidate` must be set to `false` (time-based and tag-based revalidation cannot be used together).

**Source:** [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration), [Sanity Tag-Based Revalidation](https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/tag-based-revalidation)

```typescript
// sanity/lib/fetch.ts
import { client } from './client'
import type { QueryParams } from 'next-sanity'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600, // 1-hour fallback for non-tagged queries
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    // CRITICAL: Next.js 15 defaults to no-store. Must opt in.
    cache: 'force-cache',
    next: {
      // Tag-based and time-based revalidation are mutually exclusive
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
```

### Pattern 3: Webhook Revalidation Route Handler

**What:** An API route that receives Sanity webhook POSTs, validates the signature, and calls `revalidateTag()` for the affected document types.

**When to use:** Wired to a GROQ-powered Sanity webhook that fires on document create/update/delete.

**Source:** [next-sanity webhook docs](https://github.com/sanity-io/next-sanity), [Sanity Revalidation Guide](https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs)

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = { tags: string[] }

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true // wait for Sanity CDN to update before revalidating
    )

    if (!isValidSignature) {
      return new Response(JSON.stringify({ message: 'Invalid signature' }), { status: 401 })
    }

    if (!Array.isArray(body?.tags) || !body.tags.length) {
      return new Response(JSON.stringify({ message: 'Bad Request' }), { status: 400 })
    }

    body.tags.forEach((tag) => revalidateTag(tag))
    return NextResponse.json({ revalidated: true, tags: body.tags })
  } catch (err) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
```

**Sanity webhook configuration:**
- URL: `https://emilykathryn.com/api/revalidate`
- Filter: `_type in ["siteSettings", "homepage", "servicePage", "gallery", "testimonial", "cityLandingPage"]`
- Projection: `{"tags": [_type, _type + ":" + slug.current]}`
- Secret: Shared `SANITY_REVALIDATE_SECRET` in headers

### Pattern 4: SanityImage Wrapper with Custom Loader

**What:** A reusable component that wraps `next/image` with a Sanity-specific loader, automatically providing blur placeholders from LQIP metadata, and bypassing Vercel's image optimization to use Sanity's CDN directly.

**When to use:** Every CMS-sourced image on the site.

**Why critical:** Using the default Next.js image loader routes all Sanity images through Vercel's optimization API, which has a 5,000 transformation limit on the free tier. With 200+ portfolio images, this burns through quickly. Sanity's CDN already handles format conversion (WebP/AVIF via `auto=format`), resizing, and quality -- using it as the loader is free.

**Source:** [Sanity Image Metadata](https://www.sanity.io/docs/apis-and-sdks/image-metadata), [Next.js Custom Loader](https://nextjs.org/docs/app/api-reference/config/next-config-js/images)

```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Custom loader that bypasses Vercel optimization
export function sanityLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const url = new URL(src)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('auto', 'format') // WebP/AVIF based on Accept header
  url.searchParams.set('fit', 'max')
  if (quality) url.searchParams.set('q', quality.toString())
  return url.toString()
}
```

```typescript
// components/shared/SanityImage.tsx
import Image, { type ImageProps } from 'next/image'
import { urlFor, sanityLoader } from '@/sanity/lib/image'

interface SanityImageProps extends Omit<ImageProps, 'src' | 'loader'> {
  asset: {
    _ref: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number }
    }
  }
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export function SanityImage({
  asset,
  hotspot,
  crop,
  alt,
  ...props
}: SanityImageProps) {
  const imageUrl = urlFor(asset)
    .width(props.width as number || 1200)
    .auto('format')
    .url()

  return (
    <Image
      loader={sanityLoader}
      src={imageUrl}
      alt={alt}
      width={asset.metadata?.dimensions?.width}
      height={asset.metadata?.dimensions?.height}
      placeholder={asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={asset.metadata?.lqip}
      {...props}
    />
  )
}
```

**GROQ pattern for image metadata:**
```groq
*[_type == "homepage"][0]{
  heroImage {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    },
    hotspot,
    crop,
    alt
  }
}
```

### Pattern 5: NAP+W Single Source of Truth

**What:** A single TypeScript config file that exports the canonical business name, address, phone, and website. Every component that renders business info imports from this file.

**When to use:** Header, Footer, JSON-LD, contact page, city pages, meta tags -- everywhere NAP appears.

**Source:** [Pitfalls Research - NAP Inconsistency](../../../.planning/research/PITFALLS.md)

```typescript
// lib/siteConfig.ts
export const siteConfig = {
  name: 'Emily Kathryn Photography',
  tagline: 'Senior Portrait & Family Photographer',
  url: 'https://emilykathryn.com',
  phone: '(434) XXX-XXXX', // Exact format matching GBP
  email: 'emily@emilykathryn.com',
  address: {
    street: '123 Main Street', // Exact street matching GBP
    city: 'Gretna',
    state: 'VA',
    zip: '24557',
    formatted: '123 Main Street, Gretna, VA 24557',
  },
  social: {
    instagram: 'https://www.instagram.com/emilykathrynphotography/',
    facebook: 'https://www.facebook.com/emilykathrynphotography/',
    tiktok: 'https://www.tiktok.com/@emilykathrynphotography',
  },
  // Navigation items -- single source for both header and footer
  navigation: [
    { label: 'Senior Portraits', href: '/senior-portraits' },
    { label: 'Family Portraits', href: '/family-portraits' },
    { label: 'Investment', href: '/investment' },
    { label: 'About', href: '/about' },
    { label: 'Raves', href: '/raves' },
    { label: 'Style Guide', href: '/style-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Inquire for Detailed Pricing',
    href: '/contact',
  },
} as const
```

### Anti-Patterns to Avoid

- **No route groups for Studio:** Causes Studio to inherit site layout (broken UI) and site pages to load Studio JS (massive bundle bloat). Always use `(site)` and `(studio)` route groups.
- **Missing `cache: 'force-cache'` on Sanity fetches:** Next.js 15 defaults to `no-store`. Without explicit opt-in, ISR does not work and every page render hits the Sanity API.
- **Using default Next.js image loader for Sanity images:** Routes all image transformations through Vercel, burning the 5,000/mo free-tier limit. Use Sanity CDN loader instead.
- **Hardcoding NAP strings in components:** Any component that renders business info must import from `siteConfig.ts`. Zero hardcoded strings.
- **Setting `priority` on multiple images per page:** Only the single LCP hero image should have `priority={true}`. Multiple priority images create competing preloads and hurt LCP.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image blur placeholders | Custom blur generation pipeline | Sanity LQIP (built-in, 20px base64 PNG per asset) | Sanity generates LQIP automatically on upload. Available via GROQ `asset->metadata.lqip`. Zero extra processing. |
| Image format negotiation | Manual WebP/AVIF detection | Sanity CDN `auto=format` + next/image | Sanity CDN reads `Accept` header and serves optimal format. next/image handles `<picture>` element. |
| Cache tag revalidation | Custom webhook signature validation | `parseBody` from `next-sanity/webhook` | Handles HMAC signature validation, body parsing, and CDN sync delay. Battle-tested. |
| Font optimization | Manual `@font-face` + preload | `next/font/local` and `next/font/google` | Automatic self-hosting, size-adjust for zero CLS, no external network requests. |
| CSS framework config | Custom design tokens system | Tailwind v4 `@theme` directive | Native CSS variables, generates utility classes automatically, 70% smaller output. |
| Studio embedding | Manual Sanity Studio integration | `NextStudio` from `next-sanity/studio` | Handles routing, auth, styling, and code-splitting automatically. |

**Key insight:** The Sanity + next-sanity + Next.js integration is deep and well-tested. Fighting it (e.g., custom image pipelines, manual Studio embedding) creates more problems than it solves.

---

## Common Pitfalls

### Pitfall 1: Next.js 15 Cache Default Change Breaks ISR

**What goes wrong:** Developers familiar with Next.js 14 assume `fetch` calls are cached by default. In Next.js 15, `fetch` defaults to `no-store`. Every Sanity query runs on every request, burning API quota and eliminating ISR benefits. Pages that should be static become dynamic.

**Why it happens:** Next.js 15 reversed the caching default due to community feedback that opt-out caching was confusing. This is a breaking change that affects every data-fetching pattern.

**How to avoid:** The `sanityFetch` wrapper MUST explicitly set `cache: 'force-cache'`. Verify with `NEXT_PRIVATE_DEBUG_CACHE=1` in `.env` during development to see cache hits/misses.

**Warning signs:** Sanity API usage unexpectedly high. Pages are slow despite ISR config. Lighthouse shows dynamic rendering instead of static.

**Source:** [Next.js 15 Caching Changes](https://nextjs.org/docs/app/api-reference/functions/fetch), [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration)

### Pitfall 2: Sanity Studio Inherits Site Layout

**What goes wrong:** Without route groups, the `layout.tsx` wraps both site pages and Studio. Studio gets the site nav/footer overlaid on top of it. Studio CSS conflicts with site CSS. The `<SanityLive>` component in the layout causes Studio to reload unexpectedly.

**Why it happens:** Next.js App Router applies the nearest `layout.tsx` to all child routes. Without route groups, `/studio` is a child of the root layout.

**How to avoid:** Always use route groups: `app/(site)/layout.tsx` for the public site, `app/(studio)/studio/[[...tool]]/page.tsx` for Studio. The root `app/layout.tsx` should contain only the `<html>` and `<body>` tags with no site-specific UI.

**Warning signs:** Studio page shows site nav/footer. Console errors about hydration mismatches on Studio. Studio reloading on its own.

**Source:** [Sanity Embedding Docs](https://www.sanity.io/docs/studio/embedding-sanity-studio), [next-sanity README](https://github.com/sanity-io/next-sanity)

### Pitfall 3: Missing CORS Configuration for Embedded Studio

**What goes wrong:** Sanity Studio loads but cannot connect to the Content Lake. API calls from Studio fail silently or show authentication errors. Emily cannot edit content.

**Why it happens:** Sanity requires the Studio's hosting domain to be registered as a CORS origin with authenticated requests enabled. This is configured in the Sanity project settings, not in the codebase.

**How to avoid:** After deployment, add `https://emilykathryn.com` and `http://localhost:3000` to the Sanity project's CORS origins (Settings > API > CORS origins) with "Allow credentials" checked.

**Warning signs:** Studio loads but shows "Unauthorized" or empty content. Network tab shows 403 responses from `api.sanity.io`.

**Source:** [Sanity Embedding Docs](https://www.sanity.io/docs/studio/embedding-sanity-studio)

### Pitfall 4: Vercel Image Optimization Billing Surprise

**What goes wrong:** Using the default Next.js image loader for all Sanity images routes every transformation through Vercel. With 200+ portfolio images across device sizes, the 5,000 free-tier transformation limit is exceeded within weeks.

**Why it happens:** The default `next/image` loader sends image URLs to Vercel's optimization API. This works well for small sites but scales poorly for image-heavy photography portfolios.

**How to avoid:** Implement a custom Sanity CDN loader (see SanityImage pattern above). Sanity's CDN handles all transformations at no additional cost. Vercel's image optimization is only used for static assets (logo, icons).

**Warning signs:** Vercel dashboard shows image optimization usage climbing. Unexpected billing charges.

**Source:** [Vercel Image Optimization Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)

### Pitfall 5: Tag-Based and Time-Based Revalidation Mixed

**What goes wrong:** Setting both `revalidate: 60` and `tags: ['homepage']` on the same fetch. Next.js documentation states these are mutually exclusive. The behavior becomes unpredictable -- sometimes time-based wins, sometimes tag-based.

**Why it happens:** Developers want a "belt and suspenders" approach -- revalidate on schedule AND on webhook. But Next.js does not support both on the same cache entry.

**How to avoid:** The `sanityFetch` wrapper enforces this: when tags are provided, `revalidate` is set to `false`. When no tags are provided, time-based revalidation is the fallback.

**Warning signs:** Pages not updating after webhook fires. Inconsistent cache behavior between deployments.

**Source:** [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration), [Sanity Tag-Based Revalidation](https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/tag-based-revalidation)

### Pitfall 6: Acrom Font Not Self-Hosted

**What goes wrong:** Acrom is a commercial font by Inhouse Type. It is not available on Google Fonts. If loaded via an external CDN or font service, it creates an external network request that blocks rendering, causes FOUT/FOIT, and contributes to CLS.

**Why it happens:** Developers assume all fonts can be loaded from Google Fonts or a public CDN.

**How to avoid:** Acrom font files must be obtained with a valid web license and self-hosted using `next/font/local`. Store `.woff2` files in `src/fonts/` and configure in the root layout.

**Warning signs:** DevTools Network tab shows requests to external font domains. CLS spikes during font loading. FOUT visible on page load.

**Source:** [Acrom on MyFonts](https://www.myfonts.com/collections/acrom-font-inhouse-type/), [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)

---

## Discretion Recommendations

Research findings for areas marked as Claude's Discretion in CONTEXT.md.

### Nav Sticky Behavior: Scroll-Aware Hide/Show

**Recommendation:** Scroll-aware sticky header that hides on scroll-down and reveals on scroll-up.

**Rationale:**
- Always-sticky headers consume 60-80px of precious mobile viewport on a photography site where visual real estate is critical
- Scroll-aware pattern is now standard on editorial and fashion sites (the aesthetic Emily wants)
- The CTA button remains accessible: visible when user scrolls up (intent to navigate/act), hidden when scrolling down (viewing content)
- Implementation: Client Component with `useEffect` scroll listener, CSS `transform: translateY(-100%)` for smooth hide, `transition` for animation

**Source:** [Mobile Sticky Header Best Practices](https://lite14.net/blog/2025/03/11/how-to-implement-mobile-sticky-headers/), [React Disappearing Header Pattern](https://www.codemzy.com/blog/react-sticky-header-disappear-scroll)

### Mobile Menu: Full-Screen Overlay

**Recommendation:** Full-screen overlay menu triggered by hamburger icon.

**Rationale:**
- Editorial/fashion-magazine aesthetic strongly favors full-screen menus -- they create a moment of focused navigation that matches the premium feel
- With 7 navigation items + CTA, a side-panel slide-out can feel cramped on mobile
- Full-screen overlay allows larger tap targets (exceeding the 44px minimum easily), larger typography, and potential for a subtle brand accent
- The overlay can include the CTA prominently at the bottom, keeping it visible during navigation
- Implementation: Client Component with `<dialog>` or portal, CSS animation for entry, focus trap for accessibility

**Source:** [Full-Screen Menu Patterns](https://designmodo.com/full-screen-menus/), [Mobile Menu Design Best Practices](https://www.webstacks.com/blog/mobile-menu-design)

### CTA Button Styling

**Recommendation:** Solid gold (#c2a36c) background with white text for the CTA button. Slightly smaller on mobile, slightly larger on desktop. No rounded-full -- use a subtle radius (rounded-sm or rounded) to maintain editorial feel.

**Rationale:**
- Gold is the brand's most distinctive accent color and creates immediate visual contrast against the white/black palette
- A solid-fill button at the brand's accent color is the highest-visibility option without being garish
- Editorial aesthetic prefers understated shapes -- pill-shaped buttons read as "tech startup," squared buttons read as "editorial"
- On hover: darken slightly or add a subtle border transition

### Footer CTA Inclusion

**Recommendation:** Yes, include a CTA in the footer.

**Rationale:**
- Users who scroll to the footer have consumed the page content and may be ready to act
- The footer CTA should be styled differently from the nav CTA -- a text link or outlined button rather than a solid gold button, to avoid visual competition
- Best practice: "Ready to book your session?" text + "Get in Touch" link leading to /contact

### Gold (#c2a36c) Usage

**Recommendation:** Use gold for CTA buttons, hover states on links, and the occasional horizontal rule or section divider. Do NOT use for backgrounds, large areas, or decorative elements.

**Rationale:**
- Gold reads as premium and gender-neutral when used sparingly (jewelry, fashion, editorial all use gold accents)
- Gold reads as "feminine" when used as a dominant color or in patterns (bridal, beauty industry associations)
- Keep gold to < 5% of total visual area on any page

### Brand Board Patterns

**Recommendation:** Do not use the quatrefoil/geometric patterns from the brand board on the website.

**Rationale:**
- The quatrefoil pattern on the brand board is strongly associated with feminine aesthetics (common in wedding/bridal/beauty branding)
- The user explicitly stated "less feminine than current site"
- The white + black palette with photography as the hero creates a stronger editorial impression without patterns
- If subtle texture is needed, consider a very light gray (#f5f5f5) section background or a thin gold horizontal rule between sections

### Heading Serif Font Selection

**Recommendation:** **Cormorant Garamond** (Google Font, available via `next/font/google`)

**Rationale:**
- Cormorant Garamond is a high-contrast Didone-style serif with sharp, delicate serifs and vertical stress -- exactly the editorial/fashion-magazine feel requested
- Free and open-source via Google Fonts -- no licensing complexity (unlike Acrom, which requires a commercial license)
- Available as a variable font for optimal performance (single file, all weights)
- Gender-neutral: widely used in fashion, architecture, and editorial contexts for both masculine and feminine brands
- Pairs excellently with geometric sans-serifs like Acrom (contrast principle: ornate display + clean body)
- Performance tested at ~48ms load time on Google Fonts -- among the fastest serif options

**Alternatives considered:**
- **Playfair Display**: Also Didone-inspired, but more commonly associated with feminine/wedding sites. Slightly overused in photography portfolios.
- **Libre Caslon Display**: Beautiful vintage-modern character, but less editorial than Cormorant. Better for literary/publishing contexts.
- **Instrument Serif**: Modern and clean, but lacks the high-contrast drama that sells editorial photography.

**Font pairing summary:**
- **Headings:** Cormorant Garamond (variable, Google Font) via `next/font/google`
- **Body/UI:** Acrom (commercial, self-hosted) via `next/font/local`

**Source:** [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond), [Best Modern Serif Google Fonts 2026](https://fazal.site/best-modern-serif-google-fonts-2026), [Typewolf Google Fonts 2026](https://www.typewolf.com/google-fonts)

---

## Code Examples

### Tailwind v4 Brand Theme Configuration

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors — accents only */
  --color-brand-gold: #c2a36c;
  --color-brand-gold-dark: #a88c55;
  --color-brand-rose: #dcb6ad;
  --color-brand-sage: #b3d4cd;
  --color-brand-gray: #d6d4d4;

  /* Core palette */
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;

  /* Typography — integrated with next/font CSS variables */
  --font-heading: var(--font-cormorant), ui-serif, Georgia, serif;
  --font-body: var(--font-acrom), ui-sans-serif, system-ui, sans-serif;

  /* Spacing rhythm */
  --spacing-section: 5rem;
  --spacing-section-sm: 3rem;
}
```

### Font Configuration in Root Layout

```typescript
// app/(site)/layout.tsx
import { Cormorant_Garamond } from 'next/font/google'
import localFont from 'next/font/local'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const acrom = localFont({
  src: [
    { path: '../../fonts/Acrom-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/Acrom-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/Acrom-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-acrom',
  display: 'swap',
})

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cormorant.variable} ${acrom.variable} font-body`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

### next.config.ts with Sanity Remote Patterns

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Suppress styled-components hydration warning from Sanity Studio
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
```

### Sanity Client Configuration

```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN for published content (60s TTL)
})
```

```typescript
// sanity/env.ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-04'
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing NEXT_PUBLIC_SANITY_DATASET'
)
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage)
  return v
}
```

### Sanity siteSettings Schema

```typescript
// sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      description: 'Must match Google Business Profile exactly',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Format: (434) XXX-XXXX — must match GBP exactly',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', type: 'string', title: 'Street' }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'state', type: 'string', title: 'State' }),
        defineField({ name: 'zip', type: 'string', title: 'ZIP Code' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'facebook', type: 'url', title: 'Facebook' }),
        defineField({ name: 'tiktok', type: 'url', title: 'TikTok' }),
      ],
    }),
  ],
  // Singleton pattern — only one siteSettings document
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
})
```

### Scroll-Aware Sticky Header (Client Component)

```typescript
// components/layout/Header.tsx (Server Component wrapper)
import { siteConfig } from '@/lib/siteConfig'
import { HeaderClient } from './HeaderClient'

export function Header() {
  return (
    <HeaderClient
      navigation={siteConfig.navigation}
      cta={siteConfig.cta}
      logoText={siteConfig.name}
    />
  )
}
```

```typescript
// components/layout/HeaderClient.tsx (Client Component)
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface HeaderClientProps {
  navigation: ReadonlyArray<{ label: string; href: string }>
  cta: { label: string; href: string }
  logoText: string
}

export function HeaderClient({ navigation, cta, logoText }: HeaderClientProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Show header when scrolling up or at top
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 80)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm
        border-b border-border transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-lg tracking-wide">
          {logoText}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-body tracking-wide text-foreground/80
                  hover:text-foreground transition-colors min-h-11 flex items-center"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={cta.href}
          className="hidden lg:inline-flex items-center px-5 py-2.5
            bg-brand-gold text-white text-sm font-body tracking-wide
            rounded hover:bg-brand-gold-dark transition-colors min-h-11"
        >
          {cta.label}
        </Link>

        {/* Mobile hamburger trigger */}
        <button
          className="lg:hidden min-h-11 min-w-11 flex items-center justify-center"
          aria-label="Open menu"
        >
          {/* Hamburger icon SVG */}
        </button>
      </nav>
    </header>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS) | `@theme` directive in CSS | Tailwind v4 (Jan 2025) | No JS config file. Design tokens in CSS. 70% smaller output. |
| `fetch` cached by default (Next.js 14) | `fetch` uncached by default (Next.js 15) | Next.js 15 (Oct 2024) | MUST explicitly `cache: 'force-cache'` for ISR. |
| `framer-motion` package | `motion` package | Rebranded 2025 | Same API, new package name. Do NOT install `framer-motion`. |
| Manual `<link>` font loading | `next/font` auto self-hosting | Next.js 13+ (stable) | Zero CLS from fonts, no external requests. |
| `images.domains` in next.config | `images.remotePatterns` in next.config | Next.js 14+ | `domains` is deprecated. Use `remotePatterns` with glob patterns. |
| `import { defineLive } from 'next-sanity'` | `import { defineLive } from 'next-sanity/live'` | next-sanity v11 | Import path changed. Old path causes build errors in v11+. |
| `<SanityLive>` in root layout | `<SanityLive>` in `(site)` layout only | next-sanity v11 | Including in Studio layout causes unexpected reloads. |

**Deprecated/outdated:**
- `images.domains` in `next.config.js` -- replaced by `images.remotePatterns`
- `framer-motion` package name -- rebranded to `motion`
- `next-sanity` root imports for `VisualEditing`, `defineLive`, `isCorsOriginError` -- moved to subpaths in v11
- Sanity `__experimental_actions` for singleton pattern -- still works but Sanity recommends structure builder for singleton UX

---

## Open Questions

1. **Acrom Font License and Files**
   - What we know: Acrom is a commercial font by Inhouse Type. Web license required. Available on MyFonts.
   - What's unclear: Does Emily/Jeff already own a web font license? Are the `.woff2` files available, or only desktop formats?
   - Recommendation: Verify license status before Phase 1 execution. If no web license exists, either purchase one (~$50-100) or substitute with a free geometric sans-serif like Inter or DM Sans as a temporary measure.

2. **Emily's Actual NAP+W Details**
   - What we know: Business is in Gretna, VA. Phone number and exact street address need to match GBP character-for-character.
   - What's unclear: Exact address, phone format, and whether GBP has been set up yet.
   - Recommendation: Collect exact NAP from Emily before `siteConfig.ts` is written. If GBP exists, copy from there. If not, define the canonical format now and use it for both site and GBP.

3. **Sanity Project Creation**
   - What we know: Need a Sanity project with projectId and dataset.
   - What's unclear: Whether Jeff has an existing Sanity account/organization.
   - Recommendation: Create the Sanity project via `npx sanity init` during scaffolding. This generates the project ID and dataset. Add CORS origins for localhost and production domain.

4. **DNS Access for emilykathryn.com**
   - What we know: Domain needs to be configured for Vercel. Emily may or may not have DNS access.
   - What's unclear: Where DNS is currently managed (registrar? Squarespace? Cloudflare?).
   - Recommendation: DNS config can be deferred to the end of Phase 1. The site works on Vercel's auto-generated URL in the meantime. Collect DNS credentials before the final plan step.

5. **Logo Files**
   - What we know: Primary and alternate logo marks exist. "emily kathryn photography" is the primary mark.
   - What's unclear: File formats available (SVG, PNG, etc.). Whether they need to be extracted from the brand board JPG.
   - Recommendation: Request SVG versions of the logo from Emily. If unavailable, trace from brand board during execution. SVG is required for the header logo (crisp at all sizes, tiny file size).

---

## Sources

### Primary (HIGH confidence)
- [Next.js ISR Guide (v16.1.6)](https://nextjs.org/docs/app/guides/incremental-static-regeneration) -- on-demand revalidation, revalidateTag, cache behavior
- [Next.js Font Optimization (v16.1.6)](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/local, next/font/google, CSS variable patterns
- [Next.js Image Configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/images) -- remotePatterns for Sanity CDN
- [Next.js fetch() API (v16.1.6)](https://nextjs.org/docs/app/api-reference/functions/fetch) -- cache default change in v15
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- @theme directive, CSS-first config, all namespaces
- [Sanity Image Metadata](https://www.sanity.io/docs/apis-and-sdks/image-metadata) -- LQIP, blurhash, palette, dimensions, GROQ queries
- [Sanity Embedding Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio) -- CORS, route structure, NextStudio
- [Sanity Schema Definitions](https://www.sanity.io/docs/studio/schema-types) -- defineType, defineField, document schemas
- [next-sanity GitHub](https://github.com/sanity-io/next-sanity) -- v11 setup, defineLive, sanityFetch, parseBody, studio embedding
- [Sanity Tag-Based Revalidation Course](https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/tag-based-revalidation) -- webhook config, tag strategy, parseBody usage

### Secondary (MEDIUM confidence)
- [Sanity Webhooks and On-demand Revalidation](https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs) -- implementation walkthrough verified against official docs
- [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond) -- font specimen, variable font availability
- [Best Modern Serif Google Fonts 2026](https://fazal.site/best-modern-serif-google-fonts-2026) -- performance testing, editorial font recommendations
- [Mobile Sticky Header Best Practices](https://lite14.net/blog/2025/03/11/how-to-implement-mobile-sticky-headers/) -- scroll-aware pattern, performance optimization
- [Mobile Menu Design Best Practices](https://www.webstacks.com/blog/mobile-menu-design) -- full-screen overlay vs slide-out comparison
- [Full-Screen Menu Patterns](https://designmodo.com/full-screen-menus/) -- editorial/fashion menu design
- [Acrom on MyFonts](https://www.myfonts.com/collections/acrom-font-inhouse-type/) -- commercial font, web license availability

### Tertiary (LOW confidence)
- [React Disappearing Header Pattern](https://www.codemzy.com/blog/react-sticky-header-disappear-scroll) -- community implementation pattern, needs adaptation for Next.js App Router
- [Custom Sanity Loader Gist](https://gist.github.com/ulises-codes/2228f7fb77ad37d3cebc82f4a1e885e5) -- community code, verified concept against official Sanity image docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All versions verified on npm, peer deps confirmed, compatibility matrix validated
- Architecture: HIGH -- Patterns from official Next.js and Sanity docs, route groups verified, ISR behavior confirmed
- Pitfalls: HIGH -- Cache default change verified in Next.js 15 official docs, Vercel billing confirmed, route group issues documented
- Font selection: MEDIUM -- Cormorant Garamond is well-established, but final pairing with Acrom needs visual validation during execution
- Discretion areas: MEDIUM -- Recommendations based on UX best practices and editorial design patterns, but visual preferences are subjective

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days -- stack is stable, no major releases expected)
