# Architecture Research

**Domain:** Photography portfolio / local business website with headless CMS
**Researched:** 2026-02-18
**Confidence:** HIGH

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CONTENT LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Sanity Studio │  │ Sanity CDN   │  │ Sanity Image Pipeline    │  │
│  │ (CMS Editor)  │  │ (Content API)│  │ (On-demand transforms)   │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │ webhook          │ GROQ                  │ image URL      │
├─────────┴──────────────────┴──────────────────────┴────────────────┤
│                       APPLICATION LAYER                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Next.js App Router                         │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐               │   │
│  │  │  Server    │  │  Route    │  │  Server   │               │   │
│  │  │  Componen. │  │  Handlers │  │  Actions  │               │   │
│  │  │  (pages)   │  │  (API)    │  │  (forms)  │               │   │
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │   │
│  │        │               │              │                      │   │
│  │  ┌─────┴───────────────┴──────────────┴─────┐               │   │
│  │  │          Shared: Layout, Nav, Footer      │               │   │
│  │  │          Client: Gallery, Form, Map       │               │   │
│  │  └──────────────────────────────────────────┘               │   │
│  └─────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                       DELIVERY LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Vercel Edge   │  │ Vercel ISR   │  │ Vercel Image             │  │
│  │ Network (CDN) │  │ Cache        │  │ Optimization             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                       EXTERNAL SERVICES                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Resend       │  │ Google Maps  │  │ Google Search Console /   │  │
│  │ (Email API)  │  │ Embed API    │  │ Rich Results              │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Sanity Studio | Content editing: galleries, page copy, scarcity cues, pricing, testimonials | Hosted at `/studio` route via `next-sanity` embedded studio, or separate Sanity-hosted studio |
| Sanity Content Lake | Structured content storage and GROQ query API | Cloud-hosted by Sanity, queried via `@sanity/client` |
| Sanity Image Pipeline | On-demand image resizing, format conversion, LQIP generation | URL-based transforms via `@sanity/image-url`; Sanity stores LQIP/blurhash metadata per asset |
| Next.js Server Components | Page rendering: fetches CMS data at build/request time, generates HTML with metadata | Async RSCs in `page.tsx` files; all pages are Server Components by default |
| Next.js Route Handlers | API endpoints: CMS webhook receiver for on-demand ISR, inquiry form POST handler | `route.ts` files under `app/api/` |
| Next.js Server Actions | Form submission processing: validate inquiry data, send email notification | `'use server'` functions called from Client Component forms |
| Client Components | Interactive UI: image gallery lightbox, mobile nav toggle, inquiry form, Google Maps lazy loader | `'use client'` directive; kept minimal for bundle size |
| Vercel Platform | Hosting, CDN, ISR cache, image optimization, serverless function execution | Zero-config deployment from Git; automatic HTTPS, edge caching |
| Resend | Transactional email delivery for inquiry notifications | API call from Server Action; React Email for templating |
| Google Maps Embed | Embedded maps on city landing pages showing business location relevance | `@next/third-parties` GoogleMapsEmbed component with lazy loading |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: <html>, <body>, fonts, global nav/footer
│   ├── page.tsx                # Homepage: senior-focused hero, portfolio preview, CTAs
│   ├── not-found.tsx           # Custom 404 page
│   ├── error.tsx               # Global error boundary
│   ├── sitemap.ts              # Dynamic sitemap generation (all pages + city pages)
│   ├── robots.ts               # Robots.txt generation
│   │
│   ├── senior-portraits/
│   │   └── page.tsx            # Service page: gallery, pricing, experience storyboard
│   │
│   ├── family-portraits/
│   │   └── page.tsx            # Service page: gallery, pricing, experience storyboard
│   │
│   ├── [city]/                 # Dynamic route for 7 hyper-local landing pages
│   │   └── page.tsx            # City page: local SEO copy, testimonials, map, gallery
│   │
│   ├── about/
│   │   └── page.tsx            # About Emily page
│   │
│   ├── contact/
│   │   └── page.tsx            # Inquiry form page
│   │
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts        # Sanity webhook handler for on-demand ISR
│   │
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx        # Embedded Sanity Studio (catch-all route)
│
├── sanity/
│   ├── env.ts                  # Sanity project ID, dataset, API version
│   ├── lib/
│   │   ├── client.ts           # Sanity client initialization
│   │   ├── fetch.ts            # sanityFetch wrapper with ISR/tag caching
│   │   ├── queries.ts          # All GROQ queries (defineQuery)
│   │   └── image.ts            # Image URL builder helper
│   ├── schemas/
│   │   ├── index.ts            # Schema registry
│   │   ├── homepage.ts         # Homepage document schema
│   │   ├── servicePage.ts      # Service page document schema
│   │   ├── cityLandingPage.ts  # City landing page document schema
│   │   ├── aboutPage.ts        # About page document schema
│   │   ├── gallery.ts          # Gallery document (collection of images)
│   │   ├── testimonial.ts      # Testimonial document schema
│   │   ├── siteSettings.ts     # Global settings: NAP, scarcity cues, pricing
│   │   └── objects/
│   │       ├── galleryImage.ts # Image object with alt text, caption, hotspot
│   │       ├── seo.ts          # Reusable SEO fields (title, description, OG image)
│   │       ├── cta.ts          # CTA button object (text, link, style)
│   │       └── storyboard.ts   # Experience storyboard step object
│   └── types.ts                # Generated TypeScript types (via sanity typegen)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Server Component: nav, persistent CTA button
│   │   ├── Footer.tsx          # Server Component: contact info, links, NAP
│   │   ├── MobileNav.tsx       # Client Component: hamburger menu toggle
│   │   └── CTAButton.tsx       # Server Component: "Inquire for Detailed Pricing"
│   ├── gallery/
│   │   ├── GalleryGrid.tsx     # Server Component: renders image grid
│   │   ├── GalleryLightbox.tsx # Client Component: fullscreen image viewer
│   │   └── GalleryImage.tsx    # Server Component: next/image with blur placeholder
│   ├── forms/
│   │   ├── InquiryForm.tsx     # Client Component: form with validation
│   │   └── FormSuccess.tsx     # Client Component: submission confirmation
│   ├── seo/
│   │   ├── JsonLd.tsx          # Server Component: renders JSON-LD script tag
│   │   └── LocalBusinessSchema.ts  # Schema builder for LocalBusiness JSON-LD
│   ├── city/
│   │   ├── CityHero.tsx        # Server Component: city-specific hero section
│   │   ├── GoogleMap.tsx       # Client Component: lazy-loaded Maps embed
│   │   └── LocalTestimonials.tsx   # Server Component: city-filtered reviews
│   ├── service/
│   │   ├── PricingCard.tsx     # Server Component: "Starting At" pricing display
│   │   ├── Storyboard.tsx      # Server Component: experience journey steps
│   │   └── ScarcityCue.tsx     # Server Component: CMS-driven availability indicator
│   └── shared/
│       ├── SanityImage.tsx     # Wrapper: next/image + Sanity URL builder + LQIP
│       ├── Section.tsx         # Layout primitive: consistent padding/max-width
│       └── AnswerBlock.tsx     # Server Component: 40-60 word AEO answer block
│
├── lib/
│   ├── constants.ts            # City slugs, NAP data, site metadata
│   ├── email.ts                # Resend client + email template
│   ├── validation.ts           # Zod schemas for form validation
│   └── utils.ts                # General utilities
│
├── actions/
│   └── inquiry.ts              # Server Action: validate + send inquiry email
│
└── styles/
    └── globals.css             # Tailwind CSS imports + custom properties
```

### Structure Rationale

- **`app/` is purely routing:** Pages are thin orchestrators that fetch data and compose components. Business logic lives in `lib/`, `actions/`, and `sanity/`.
- **`[city]/` dynamic route for landing pages:** A single dynamic segment handles all 7 city pages. `generateStaticParams` pre-renders them at build time. Each city has unique CMS content (copy, testimonials, map coordinates) fetched by slug.
- **`sanity/` is co-located but separate from `app/`:** Schemas, queries, and client config live together. The `schemas/objects/` pattern enables reusable field groups (SEO, CTA, gallery images) across multiple document types.
- **`components/` follows domain grouping:** Components are grouped by feature area (gallery, forms, city, service, layout) rather than atomic design. This keeps related files together and makes it obvious which components serve which pages.
- **Server vs Client Component split:** The `'use client'` boundary is pushed as deep as possible. Gallery grids, headers, footers, and content sections are all Server Components. Only interactive elements (lightbox, form, mobile nav, map) are Client Components.
- **`actions/` for Server Actions:** Isolated from components to keep form handling logic testable and separate from UI.

## Data Flow

### Primary Content Flow: CMS to User

```
Sanity Studio (editor publishes content)
    │
    ├──→ Sanity Content Lake (stores structured content)
    │        │
    │        ├──→ Sanity Webhook fires on publish
    │        │        │
    │        │        └──→ POST /api/revalidate (Next.js Route Handler)
    │        │                 │
    │        │                 └──→ revalidateTag('homepage') or revalidatePath('/danville')
    │        │                       │
    │        │                       └──→ Next.js ISR regenerates affected page(s)
    │        │
    │        └──→ GROQ query from Server Component (at build or on stale-while-revalidate)
    │                 │
    │                 └──→ Page HTML rendered with fresh CMS data
    │
    └──→ Sanity Image Pipeline
             │
             └──→ On-demand image transform URL
                      │
                      └──→ next/image with Sanity loader → Vercel Image Optimization
                               │
                               └──→ WebP/AVIF served to user with blur placeholder
```

### Inquiry Form Submission Flow

```
User fills InquiryForm (Client Component)
    │
    ├──→ Client-side validation (Zod schema, immediate feedback)
    │
    └──→ Server Action: inquiry.ts
             │
             ├──→ Server-side validation (same Zod schema, security)
             │
             ├──→ Resend API: send notification email to Emily
             │        │
             │        └──→ React Email template with inquiry details
             │
             └──→ Return success/error to client
                      │
                      └──→ FormSuccess component shown to user
```

### Image Optimization Flow

```
Sanity Image Asset (uploaded in Studio)
    │
    ├──→ Sanity stores: original + metadata (LQIP base64, dimensions, blurhash)
    │
    └──→ SanityImage component renders:
             │
             ├──→ @sanity/image-url builds CDN URL with size/crop/hotspot params
             │
             ├──→ next/image component with:
             │        ├── src: Sanity CDN URL
             │        ├── placeholder="blur"
             │        ├── blurDataURL: asset.metadata.lqip (base64 from GROQ query)
             │        ├── sizes: responsive breakpoints ("(max-width: 768px) 100vw, 50vw")
             │        ├── priority: true (for above-fold LCP images only)
             │        └── width/height: from asset.metadata.dimensions
             │
             └──→ Vercel/Next.js Image Optimization:
                      ├── Converts to WebP/AVIF based on Accept header
                      ├── Serves responsive sizes based on device
                      └── Caches optimized variants at edge
```

### SEO & Structured Data Flow

```
Page Server Component renders:
    │
    ├──→ generateMetadata(): dynamic title, description, OG image from CMS
    │        │
    │        └──→ <head> metadata tags (title, description, og:*, twitter:*)
    │
    ├──→ JsonLd component: LocalBusiness schema (per city page)
    │        │
    │        └──→ <script type="application/ld+json"> in page body
    │             Includes: name, address, geo, openingHours, image, areaServed
    │
    ├──→ JsonLd component: Service schema (per service page)
    │        │
    │        └──→ <script type="application/ld+json"> with provider, serviceType
    │
    └──→ sitemap.ts: generates /sitemap.xml with all routes
             │
             └──→ Includes: homepage, service pages, all 7 city pages, about, contact
```

## Architectural Patterns

### Pattern 1: Thin Pages, Fat Components

**What:** Page files (`page.tsx`) contain only data fetching and component composition. All rendering logic lives in `components/`. All data access goes through `sanity/lib/fetch.ts`.

**When to use:** Every page in this project.

**Trade-offs:** Slightly more files, but pages are scannable at a glance and components are reusable across pages (e.g., `GalleryGrid` on both service pages and city pages).

**Example:**
```typescript
// app/senior-portraits/page.tsx
import { sanityFetch } from '@/sanity/lib/fetch'
import { SERVICE_PAGE_QUERY } from '@/sanity/lib/queries'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { PricingCard } from '@/components/service/PricingCard'
import { Storyboard } from '@/components/service/Storyboard'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildServiceSchema } from '@/components/seo/LocalBusinessSchema'

export async function generateMetadata() {
  const page = await sanityFetch({
    query: SERVICE_PAGE_QUERY,
    params: { slug: 'senior-portraits' },
    tags: ['servicePage'],
  })
  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: { images: [page.seo.ogImage] },
  }
}

export default async function SeniorPortraitsPage() {
  const page = await sanityFetch({
    query: SERVICE_PAGE_QUERY,
    params: { slug: 'senior-portraits' },
    tags: ['servicePage'],
  })

  return (
    <>
      <JsonLd data={buildServiceSchema(page)} />
      <HeroSection hero={page.hero} />
      <GalleryGrid images={page.gallery} />
      <PricingCard pricing={page.pricing} />
      <Storyboard steps={page.storyboard} />
    </>
  )
}
```

### Pattern 2: Centralized CMS Fetch with Tag-Based Revalidation

**What:** All Sanity queries go through a single `sanityFetch()` wrapper that standardizes caching behavior. Each query is tagged for granular on-demand revalidation via webhooks.

**When to use:** Every CMS data fetch across the entire site.

**Trade-offs:** Slightly more ceremony per fetch call, but enables precise cache invalidation (e.g., editing a testimonial only revalidates pages showing that testimonial, not the entire site).

**Example:**
```typescript
// sanity/lib/fetch.ts
import { client } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600, // 1 hour fallback
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
```

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { _type } = body
  // Map document types to cache tags
  const tagMap: Record<string, string[]> = {
    homepage: ['homepage'],
    servicePage: ['servicePage'],
    cityLandingPage: ['cityPage'],
    gallery: ['gallery', 'servicePage', 'cityPage'],
    testimonial: ['testimonial', 'cityPage'],
    siteSettings: ['settings', 'homepage', 'servicePage', 'cityPage'],
  }

  const tags = tagMap[_type] || []
  tags.forEach(tag => revalidateTag(tag))

  return Response.json({ revalidated: tags })
}
```

### Pattern 3: Static City Pages via generateStaticParams

**What:** The 7 city landing pages use a single `[city]/page.tsx` dynamic route. All city slugs are enumerated at build time via `generateStaticParams`, producing fully static HTML for each city. ISR handles updates.

**When to use:** The hyper-local landing pages.

**Trade-offs:** Requires slug consistency between CMS content and route params. Adding a new city requires creating the CMS document (the route handles it automatically via ISR with `dynamicParams: true`).

**Example:**
```typescript
// app/[city]/page.tsx
import { sanityFetch } from '@/sanity/lib/fetch'
import { CITY_PAGE_QUERY, ALL_CITY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { CityHero } from '@/components/city/CityHero'
import { GoogleMap } from '@/components/city/GoogleMap'
import { LocalTestimonials } from '@/components/city/LocalTestimonials'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildLocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { notFound } from 'next/navigation'

export const dynamicParams = true // Allow ISR for new cities added later

export async function generateStaticParams() {
  const cities = await sanityFetch<{ slug: string }[]>({
    query: ALL_CITY_SLUGS_QUERY,
    tags: ['cityPage'],
  })
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const page = await sanityFetch({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })
  if (!page) return {}
  return {
    title: page.seo.title, // e.g. "Senior Portraits Danville VA | Emily Kathryn Photography"
    description: page.seo.description,
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const page = await sanityFetch({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })

  if (!page) notFound()

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(page)} />
      <CityHero city={page} />
      <AnswerBlock content={page.answerBlock} />
      <GalleryGrid images={page.gallery} />
      <LocalTestimonials testimonials={page.testimonials} />
      <GoogleMap
        query={page.mapQuery}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
      />
    </>
  )
}
```

### Pattern 4: Server/Client Component Boundary at Interactivity

**What:** The `'use client'` directive is applied only to the specific component that requires browser APIs or interactivity. Parent layout and content sections remain Server Components.

**When to use:** Gallery lightbox, inquiry form, mobile navigation, Google Maps embed.

**Trade-offs:** Requires careful prop design at the boundary (only serializable data can cross from Server to Client). Keeps JavaScript bundle minimal -- critical for 100/100 mobile performance target.

**Example:**
```typescript
// components/gallery/GalleryGrid.tsx (Server Component - no directive)
import { SanityImage } from '@/components/shared/SanityImage'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryGridProps {
  images: Array<{
    _key: string
    alt: string
    asset: { _ref: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    hotspot?: { x: number; y: number }
  }>
}

export function GalleryGrid({ images }: GalleryGridProps) {
  // Server Component: renders the static grid of images
  // Passes serializable image data to the Client Component lightbox
  return (
    <section>
      <GalleryLightbox
        images={images.map((img) => ({
          key: img._key,
          src: buildImageUrl(img), // plain string URL
          alt: img.alt,
          width: img.asset.metadata.dimensions.width,
          height: img.asset.metadata.dimensions.height,
          lqip: img.asset.metadata.lqip,
        }))}
      />
    </section>
  )
}
```

```typescript
// components/gallery/GalleryLightbox.tsx (Client Component)
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface LightboxImage {
  key: string
  src: string
  alt: string
  width: number
  height: number
  lqip: string
}

export function GalleryLightbox({ images }: { images: LightboxImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button key={img.key} onClick={() => setSelectedIndex(index)}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              placeholder="blur"
              blurDataURL={img.lqip}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <dialog open className="fixed inset-0 z-50 bg-black/90">
          {/* Fullscreen image viewer with prev/next navigation */}
        </dialog>
      )}
    </>
  )
}
```

### Pattern 5: Server Action for Inquiry Form with Shared Validation

**What:** Form validation schema (Zod) is shared between client-side instant feedback and server-side security validation. The Server Action handles email sending via Resend.

**When to use:** The contact/inquiry form.

**Trade-offs:** Requires Zod as a dependency (small). Server Action approach is simpler than separate API route, and the form works even without JavaScript (progressive enhancement).

**Example:**
```typescript
// lib/validation.ts (shared between client and server)
import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  graduationYear: z.string().optional(),
  highSchool: z.string().optional(),
  style: z.string().optional(),
  message: z.string().min(10, 'Please tell us about your vision'),
})

export type InquiryFormData = z.infer<typeof inquirySchema>
```

```typescript
// actions/inquiry.ts
'use server'

import { inquirySchema } from '@/lib/validation'
import { Resend } from 'resend'
import { InquiryEmail } from '@/lib/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitInquiry(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const result = inquirySchema.safeParse(raw)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  await resend.emails.send({
    from: 'Emily Kathryn Photography <inquiries@emilykathryn.com>',
    to: 'emily@emilykathryn.com',
    subject: `New Inquiry from ${result.data.name}`,
    react: InquiryEmail(result.data),
  })

  return { success: true }
}
```

## Anti-Patterns

### Anti-Pattern 1: Making Everything a Client Component

**What people do:** Adding `'use client'` at the top of every component because it is familiar from React SPA development.

**Why it is wrong:** Sends unnecessary JavaScript to the browser. For a photography site where the goal is 100/100 mobile performance, every kilobyte of client JS hurts LCP and TTI. Gallery grids with 20+ images do not need client-side React hydration unless they have interactive features.

**Do this instead:** Default to Server Components. Only add `'use client'` when you need `useState`, `useEffect`, event handlers, or browser APIs. Push the client boundary as deep into the component tree as possible.

### Anti-Pattern 2: Fetching CMS Data in Client Components

**What people do:** Using `useEffect` + `fetch` to load Sanity data on the client side, or using Sanity's real-time listener in production pages.

**Why it is wrong:** Causes layout shift (CLS) as content pops in after hydration. Exposes Sanity API credentials/tokens to the client. Adds waterfall latency (HTML loads, JS loads, then data loads). Kills SEO since crawlers may not execute JavaScript.

**Do this instead:** Fetch all CMS data in Server Components or `generateMetadata`. Content is baked into the HTML at build time (SSG/ISR). Use Sanity's real-time features only for draft preview mode, never production rendering.

### Anti-Pattern 3: One Giant Homepage Query

**What people do:** Writing a single GROQ query that fetches every piece of data for the homepage (hero, gallery, testimonials, settings, pricing) in one massive nested query.

**Why it is wrong:** Makes the query fragile -- any schema change breaks the whole page. Makes ISR revalidation coarse-grained (any content change revalidates the entire page cache). Hard to type with TypeScript.

**Do this instead:** Use multiple focused queries per section, each with specific cache tags. Hero content tagged `'homepage'`, testimonials tagged `'testimonial'`, gallery tagged `'gallery'`. This enables granular revalidation and keeps queries maintainable.

### Anti-Pattern 4: Storing Images in Git/Public Folder

**What people do:** Placing portfolio images in `public/images/` and referencing them directly.

**Why it is wrong:** Bloats the Git repository. No image optimization pipeline (no responsive sizes, no format conversion, no LQIP). Emily cannot update her portfolio without a developer. Defeats the entire purpose of a headless CMS.

**Do this instead:** All portfolio images go through Sanity's image pipeline. `@sanity/image-url` generates optimized CDN URLs. `next/image` handles responsive delivery and format negotiation.

### Anti-Pattern 5: Duplicating City Page Templates

**What people do:** Creating 7 separate page files (`app/danville/page.tsx`, `app/chatham/page.tsx`, etc.) with copy-pasted code.

**Why it is wrong:** Violates DRY. Adding a feature to city pages requires editing 7 files. Adding an 8th city means creating another file. Bug fixes must be applied 7 times.

**Do this instead:** Use a single `app/[city]/page.tsx` dynamic route with `generateStaticParams`. All 7 cities share one template. Content differences come from the CMS. Adding a new city means adding one Sanity document.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (launch) | Fully static site via ISR. 7 city pages + 5 core pages = ~12 pages total. Sanity free tier handles this easily. Single webhook for revalidation. All pages cached at Vercel edge. |
| Growth (20+ cities) | Same architecture works. `generateStaticParams` scales linearly. Consider sitemap splitting with `generateSitemaps` if needed. May need Sanity Growth plan for API usage. |
| High traffic (viral/seasonal) | Vercel edge cache absorbs traffic spikes. Static pages serve from CDN with zero server load. Only the revalidation webhook and inquiry form Server Action require compute. Resend handles email volume. |

### Scaling Priorities

1. **First bottleneck -- Image loading performance:** If gallery pages grow beyond 30-40 images, implement virtualized scrolling or pagination. The current architecture supports this by keeping gallery data in Server Components and adding client-side virtualization only when needed.
2. **Second bottleneck -- CMS query volume:** Sanity's free tier includes 500K API requests/month. With ISR caching (1-hour fallback + webhook revalidation), actual API calls will be minimal. If Emily updates content frequently, monitor API usage.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Sanity Content Lake | `@sanity/client` via `sanityFetch()` wrapper | GROQ queries with cache tags; webhook for on-demand ISR |
| Sanity Image Pipeline | `@sanity/image-url` URL builder | Generates CDN URLs with crop/hotspot/size transforms; LQIP from asset metadata |
| Resend Email API | Server Action calls `resend.emails.send()` | Requires verified domain (emilykathryn.com); SPF/DKIM for deliverability |
| Google Maps Embed | `@next/third-parties/google` `GoogleMapsEmbed` | Lazy-loaded below fold; one embed per city page; requires Maps Embed API key |
| Vercel Platform | Git-based deployment, automatic preview URLs | ISR cache invalidation via `revalidateTag`; Image Optimization built-in |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Component to Client Component | Serializable props only | Pass plain objects, strings, numbers. No functions, no class instances. Transform Sanity data to plain objects before crossing boundary. |
| Page to Sanity | `sanityFetch()` in Server Components | Always use the wrapper, never raw `client.fetch()`. Tags enable granular revalidation. |
| Form to Server Action | `formAction` on `<form>` element | Server Action receives `FormData`. Returns `{ success, errors }` object. |
| Webhook to ISR | HTTP POST from Sanity to `/api/revalidate` | Authenticated via shared secret in header. Maps document `_type` to cache tags. |
| Sanity Studio to Content | Embedded at `/studio` route | Protected by Sanity auth (login required). Uses catch-all `[[...tool]]` route. |

## Build Order Dependencies

The following build order reflects component dependencies -- earlier items are prerequisites for later items.

```
Phase 1: Foundation
    ├── Next.js project scaffolding (App Router, TypeScript, Tailwind)
    ├── Sanity project setup (schema definitions, studio config)
    ├── sanityFetch wrapper + client initialization
    └── next.config.ts (image remote patterns for Sanity CDN)

Phase 2: Layout Shell
    ├── Root layout (fonts, global styles, analytics)
    ├── Header with persistent CTA (depends on: siteSettings schema)
    ├── Footer with NAP info (depends on: siteSettings schema)
    └── Mobile navigation (Client Component)

Phase 3: Core Components
    ├── SanityImage wrapper (depends on: image URL builder, LQIP query pattern)
    ├── GalleryGrid + GalleryLightbox (depends on: SanityImage, gallery schema)
    ├── JsonLd component (depends on: schema-dts types)
    └── Section layout primitive

Phase 4: Pages (can parallelize after Phase 3)
    ├── Homepage (depends on: layout shell, gallery, CTA)
    ├── Service pages (depends on: gallery, pricing, storyboard components)
    ├── City landing pages (depends on: [city] route, GoogleMap, testimonials, gallery)
    ├── About page (depends on: layout shell, SanityImage)
    └── Contact/Inquiry page (depends on: InquiryForm, Server Action, Resend)

Phase 5: SEO & Infrastructure
    ├── Dynamic sitemap.ts (depends on: all page routes finalized)
    ├── robots.ts
    ├── JSON-LD structured data per page type (depends on: page content structure)
    ├── Webhook revalidation endpoint (depends on: Sanity webhook config)
    └── OG image generation (optional: dynamic via ImageResponse)

Phase 6: Performance & Polish
    ├── Lighthouse audit + image priority tuning
    ├── CLS verification (blur placeholders, font loading)
    └── Mobile tap target verification (44x44px)
```

## Sources

- [Next.js App Router Routing Documentation (v16.1.6)](https://nextjs.org/docs/app/building-your-application/routing) -- HIGH confidence, official docs, updated 2026-02-11
- [Next.js ISR Documentation (v16.1.6)](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration) -- HIGH confidence, official docs
- [Next.js Image Optimization Documentation (v16.1.6)](https://nextjs.org/docs/app/building-your-application/optimizing/images) -- HIGH confidence, official docs
- [Next.js Metadata API Documentation (v16.1.6)](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) -- HIGH confidence, official docs
- [Next.js JSON-LD Guide (v16.1.6)](https://nextjs.org/docs/app/guides/json-ld) -- HIGH confidence, official docs
- [Next.js Route Handlers (v16.1.6)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) -- HIGH confidence, official docs
- [Next.js Project Structure (v16.1.6)](https://nextjs.org/docs/app/getting-started/project-structure) -- HIGH confidence, official docs
- [next-sanity GitHub Repository](https://github.com/sanity-io/next-sanity) -- HIGH confidence, official Sanity toolkit
- [Sanity Image Type Documentation](https://www.sanity.io/docs/image-type) -- MEDIUM confidence (page did not fully render; corroborated by community sources)
- [Sanity LQIP/Blur Placeholder Patterns](https://www.sanity.io/answers/how-to-use-the-next-js-image-blur) -- MEDIUM confidence, official Sanity community
- [@next/third-parties Google Maps Embed](https://nextjs.org/docs/app/guides/third-party-libraries) -- HIGH confidence, official Next.js
- [Resend + Next.js Integration](https://resend.com/docs/send-with-nextjs) -- MEDIUM confidence, official Resend docs
- [schema-dts for TypeScript JSON-LD](https://www.npmjs.com/package/schema-dts) -- MEDIUM confidence, well-maintained community package
- [Next.js Architecture Best Practices 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) -- LOW confidence, community blog post (used for pattern validation only)
- [Next.js Folder Structure Best Practices 2026](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide) -- LOW confidence, community blog post

---
*Architecture research for: Emily Kathryn Photography website redesign*
*Researched: 2026-02-18*
