# Phase 5: City Landing Pages - Research

**Researched:** 2026-02-24
**Domain:** Next.js dynamic routes, Sanity CMS content modeling, local SEO structured data, Google Maps facade pattern
**Confidence:** HIGH

## Summary

Phase 5 builds 7 city-specific landing pages (Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, Evington) as a single dynamic route `app/(site)/[city]/page.tsx` with `generateStaticParams` and `dynamicParams = false`. All city content lives in a new Sanity CMS `cityPage` document type so Emily can edit copy, swap gallery images, and update testimonials without developer help. Each page carries city-specific LocalBusiness JSON-LD with `geo` coordinates and `areaServed`, an AEO answer block targeting local portrait photography queries, a Google Maps embed behind a facade (click-to-load), and unique SEO copy differentiated by city character and market tier.

The project already has all supporting infrastructure: the `JsonLd` generic component (Phase 2), the `buildLocalBusinessSchema` function with `BUSINESS_ID` cross-referencing (Phase 4), `sanityFetch` with ISR and tag-based revalidation (Phase 1), `GalleryClient`/`GalleryGrid` with Sanity CDN detection (Phase 2), `TestimonialCard` (Phase 3), and a sitemap generator with image references (Phase 4). The work is primarily: (1) a new Sanity schema, (2) a dynamic route page component, (3) city-specific JSON-LD builder, (4) Google Maps facade client component, (5) unique copy for all 7 cities, and (6) sitemap integration.

**Primary recommendation:** Build a single `cityPage` Sanity document type with all city content fields (copy, AEO block, gallery images, testimonials, map query, geo coordinates), wire it to a `[city]` dynamic route with `generateStaticParams` from Sanity, and keep `dynamicParams = false` so only the 7 known cities resolve.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Text-focused hero with overlay -- bold headline like "Senior Portraits in [City], VA" over a branded background or subtle image. No city-specific hero photo required.
- Both Senior Portraits and Family Portraits mentioned on every city page with links to the main service pages
- Section order and overall page feel (compact vs. immersive) at Claude's discretion -- optimize for local SEO conversion
- Claude writes all 7 city pages in Emily's brand voice -- Emily reviews and edits after
- Local references should focus on city character and vibe (revitalized districts, rolling farmland, lake life) -- not specific shoot locations or parks
- Tiered word count by market size: bigger markets (Lynchburg, Danville) get ~500 words, smaller towns (Altavista, Evington, Forest) get ~250-300 words, mid-tier (Chatham, Smith Mountain Lake) in between
- All city copy lives in Sanity CMS so Emily can edit without developer help
- Medium gallery grid: 8-12 images per city page
- Plan for flexibility -- don't assume photos are pre-organized by city. Emily assigns any photos to any city in the CMS. Some cities may share photos initially.
- Testimonials: city-specific preferred, regional fallback. If no testimonial is tied to a specific city, show a regional one labeled "South-Central Virginia" rather than the city name.
- Testimonial count per page at Claude's discretion
- Separate CMS field in the city schema -- Emily can tweak the 40-60 word answer snippet independently of the main body copy
- Targets both services: "portrait photographer in [City] VA" (not senior-only)
- Uses business name: "Emily Kathryn Photography serves [City]..." -- not first-name casual
- Visual presentation at Claude's discretion

### Claude's Discretion
- Section order and flow (hero, AEO, copy, gallery, testimonials, map, CTA -- exact order flexible)
- Overall page feel (compact landing page vs. more immersive)
- AEO block visual treatment (callout box, integrated into hero, etc.)
- Testimonial count per page
- Gallery layout style (grid, masonry, strip)
- Loading skeleton and error state designs
- Exact spacing, typography, and responsive breakpoints

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LOCAL-01 | Chatham VA landing page -- unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed | Dynamic route + Sanity cityPage schema + city-specific JSON-LD builder + Maps facade + unique copy |
| LOCAL-02 | Danville VA landing page -- same requirements | Same infrastructure, different CMS content |
| LOCAL-03 | Lynchburg VA landing page -- same requirements | Same infrastructure, different CMS content |
| LOCAL-04 | Smith Mountain Lake VA landing page -- same requirements | Same infrastructure, different CMS content |
| LOCAL-05 | Forest VA landing page -- same requirements | Same infrastructure, different CMS content |
| LOCAL-06 | Altavista VA landing page -- same requirements | Same infrastructure, different CMS content |
| LOCAL-07 | Evington VA landing page -- same requirements | Same infrastructure, different CMS content |
| SEO-05 | AEO answer blocks (40-60 words) on each city landing page targeting local queries | Dedicated `aeoBlock` field in Sanity schema, always-visible answer block component (not the collapsible AnswerBlock FAQ component) |
| SEO-06 | Google Maps embed centered on each target city on its landing page | Maps Embed API (free, unlimited) with facade pattern for performance |
| CONT-04 | SEO copy generated for all 7 city landing pages (250-500 words each) with genuine local references | Tiered word counts by market size, city-character-driven differentiation |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.12 | App Router, `generateStaticParams`, dynamic routes | Already in project, SSG for city pages |
| next-sanity | 11.6.12 | Sanity integration with Next.js | Already in project |
| Sanity | 4.22.0 | CMS for city page content management | Already in project, Emily can edit all city content |
| schema-dts | 1.1.5 | TypeScript types for JSON-LD structured data | Already in project, used for all JSON-LD schemas |
| Tailwind CSS | 4.x | Styling | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Maps Embed API | v1 | Free iframe map embeds (unlimited, no billing) | City map display behind facade |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Maps Embed API (with key) | Google Maps share embed (`?pb=` encoded URL) | No-key embed has opaque encoded URLs that can't be generated programmatically; API key approach gives clean `?q=City+VA` URLs and is still free |
| Single `cityPage` document type | Separate fields in siteSettings | cityPage document per city is cleaner, scales better, and gives Emily a dedicated Studio section |
| `dynamicParams = false` | `dynamicParams = true` | false is correct -- only 7 known cities, unknown slugs should 404 |

**Installation:**
```bash
# No new packages needed -- all dependencies already installed
# Only addition: NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY env var for Maps Embed API
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(site)/
│   └── [city]/
│       └── page.tsx           # Dynamic city page with generateStaticParams
├── components/
│   ├── city/
│   │   ├── CityHero.tsx       # Text-focused hero with city name overlay
│   │   ├── AeoBlock.tsx       # Always-visible AEO answer snippet (NOT AnswerBlock FAQ)
│   │   └── GoogleMapFacade.tsx # Client component: static image → iframe on click
│   └── shared/
│       ├── GalleryClient.tsx   # Already exists -- reuse for city galleries
│       ├── JsonLd.tsx          # Already exists -- reuse for city JSON-LD
│       └── TestimonialCard.tsx # Already exists -- reuse for city testimonials
├── lib/
│   ├── schemas/
│   │   └── localBusiness.ts   # Extend with buildCityLocalBusinessSchema()
│   └── cityData.ts            # Static city metadata (slugs, geo coords, map queries)
└── sanity/
    └── schemas/
        ├── cityPage.ts        # New Sanity document type for city landing pages
        └── index.ts           # Register cityPage schema
```

### Pattern 1: Dynamic Route with generateStaticParams
**What:** Single `app/(site)/[city]/page.tsx` generates all 7 city pages at build time
**When to use:** Known finite set of pages from CMS data
**Example:**
```typescript
// Source: Next.js 15 official docs - generateStaticParams
// app/(site)/[city]/page.tsx

import { sanityFetch } from '@/sanity/lib/fetch'
import { notFound } from 'next/navigation'

// Only these 7 slugs resolve; everything else 404s
export const dynamicParams = false

export async function generateStaticParams() {
  const cities = await sanityFetch<Array<{ slug: string }>>({
    query: `*[_type == "cityPage"]{ "slug": slug.current }`,
    tags: ['cityPage'],
  })
  return cities.map((city) => ({ city: city.slug }))
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const data = await sanityFetch<CityPageData>({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })
  if (!data) notFound()
  // render page...
}
```

### Pattern 2: Google Maps Facade (Click-to-Load)
**What:** Static placeholder with map pin icon; replaces with real iframe on user interaction
**When to use:** Third-party embeds that add significant weight (Google Maps iframe loads ~500KB+)
**Example:**
```typescript
// Source: web.dev/articles/embed-best-practices + Chrome DevTools facade guidance
// components/city/GoogleMapFacade.tsx
'use client'

import { useState, useCallback } from 'react'

interface GoogleMapFacadeProps {
  query: string      // e.g. "Chatham,VA"
  cityName: string   // e.g. "Chatham"
  apiKey: string
}

export function GoogleMapFacade({ query, cityName, apiKey }: GoogleMapFacadeProps) {
  const [loaded, setLoaded] = useState(false)

  const loadMap = useCallback(() => setLoaded(true), [])

  if (loaded) {
    return (
      <iframe
        title={`Map of ${cityName}, Virginia`}
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={loadMap}
      className="relative flex h-[400px] w-full items-center justify-center bg-muted rounded-lg cursor-pointer group"
      aria-label={`Load map of ${cityName}, Virginia`}
    >
      {/* Static facade with map pin icon */}
      <div className="text-center">
        <MapPinIcon className="mx-auto h-12 w-12 text-brand-gold" />
        <p className="mt-2 text-sm text-muted-foreground">
          Click to view map of {cityName}, VA
        </p>
      </div>
    </button>
  )
}
```

### Pattern 3: City-Specific LocalBusiness JSON-LD with GeoCoordinates
**What:** Each city page gets its own LocalBusiness schema with unique `areaServed` (single city, not all 7) and `geo` coordinates
**When to use:** City landing pages for local SEO
**Example:**
```typescript
// Source: schema.org/LocalBusiness, schema.org/GeoCoordinates, Google Search Central
// lib/schemas/localBusiness.ts (extend existing)

import type { LocalBusiness, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'
import { BUSINESS_ID } from '@/lib/schemas/localBusiness'

interface CityGeoData {
  name: string
  slug: string
  latitude: number
  longitude: number
}

export function buildCityLocalBusinessSchema(
  city: CityGeoData,
): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/${city.slug}/#business`,
    name: siteConfig.name,
    url: `${siteConfig.url}/${city.slug}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    // CRITICAL: Single city, not all 7 -- differentiates from site-wide schema
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Virginia' },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    },
    // Inherit other fields from site-wide schema...
  }
}
```

### Pattern 4: Sanity cityPage Document Schema
**What:** Dedicated document type for city landing page content, all fields Emily can edit
**When to use:** CMS-managed city content with independent fields for each content block
**Example:**
```typescript
// Source: Sanity schema docs, project conventions from Phase 1-4
// sanity/schemas/cityPage.ts

import { defineType, defineField, defineArrayMember } from 'sanity'

export const cityPage = defineType({
  name: 'cityPage',
  title: 'City Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'City Name',
      type: 'string',                    // "Chatham"
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Path',
      type: 'slug',                       // "chatham"
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',                    // "Senior Portraits in Chatham, VA"
    }),
    defineField({
      name: 'aeoBlock',
      title: 'AEO Answer Snippet',
      type: 'text',
      rows: 3,
      description: 'The 40-60 word answer targeting "portrait photographer in [City] VA". Editable independently from body copy.',
      validation: (rule) => rule.required().min(100).max(400),
    }),
    defineField({
      name: 'body',
      title: 'Main Copy',
      type: 'text',                       // Rich text or plain text block
      rows: 15,
      description: 'The unique SEO copy for this city (250-500 words).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      description: 'SEO meta description for this city page (150-160 chars).',
    }),
    defineField({
      name: 'galleryImages',
      title: 'City Gallery',
      type: 'array',
      of: [defineArrayMember({
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
      })],
      description: 'Assign 8-12 photos for this city page.',
    }),
    defineField({
      name: 'testimonials',
      title: 'City Testimonials',
      type: 'array',
      of: [defineArrayMember({
        type: 'reference',
        to: [{ type: 'testimonial' }],
      })],
      description: 'Pick testimonials for this city. If none are city-specific, choose regional ones.',
    }),
    defineField({
      name: 'testimonialLabel',
      title: 'Testimonial Location Label',
      type: 'string',
      description: 'Override label (e.g., "South-Central Virginia" for regional fallback). Leave blank to use city name.',
    }),
    defineField({
      name: 'mapQuery',
      title: 'Google Maps Search Query',
      type: 'string',
      description: 'What to search on Google Maps (e.g., "Chatham, Virginia"). Used for the embedded map.',
    }),
  ],
})
```

### Pattern 5: AEO Answer Block (Always Visible)
**What:** A prominently displayed 40-60 word answer snippet, distinct from the FAQ `AnswerBlock` accordion
**When to use:** City pages targeting local search queries for AI answer extraction
**Note:** The existing `AnswerBlock` component is a collapsible FAQ accordion using `<details>/<summary>`. The AEO block is a separate, always-visible component -- a styled callout box or highlighted paragraph.

### Anti-Patterns to Avoid
- **7 separate page files:** Never create `app/(site)/chatham/page.tsx`, `app/(site)/danville/page.tsx`, etc. Use single `[city]` dynamic route. This is a locked decision from STATE.md.
- **Hardcoded city copy in page component:** All copy must live in Sanity CMS. Never embed 500-word city descriptions in TSX files.
- **Template-swapped copy:** "Senior portraits in [CITY]" with only the city name changed between pages. Each city needs genuinely unique content about its character and vibe.
- **Loading Google Maps iframe eagerly:** The iframe loads ~500KB of JS. Always use the facade pattern -- static placeholder until user clicks.
- **Shared `@id` across city pages:** Each city page needs a unique `@id` in its LocalBusiness JSON-LD (e.g., `emilykathryn.com/chatham/#business`), not the site-wide `BUSINESS_ID`.
- **Using `dynamicParams = true`:** Only 7 cities exist. Unknown slugs like `/random-city` must 404 immediately, not attempt SSR.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Google Maps embed | Custom map with Leaflet/Mapbox | Google Maps Embed API iframe | Free, unlimited, zero maintenance, familiar UI to users |
| Content uniqueness verification | Custom text similarity algorithm | Manual audit or Copyscape | Algorithmic similarity detection is complex NLP; manual comparison of 7 pages (21 pairs) is feasible |
| JSON-LD structured data | String template concatenation | `schema-dts` types + `JsonLd` component | Already in project, compile-time type safety, XSS-safe |
| Gallery grid/lightbox | Custom image grid component | Existing `GalleryClient` + `GalleryGrid` + YARL lightbox | Already built in Phase 2, handles Sanity CDN detection |
| Testimonial display | Custom review card | Existing `TestimonialCard` component | Already built in Phase 3 with SanityImage support |
| ISR/caching | Custom cache layer | Existing `sanityFetch` wrapper | Already handles force-cache, tags, revalidation |

**Key insight:** Nearly all UI components needed for city pages already exist from Phases 2-3. The primary new work is the Sanity schema, the dynamic route wiring, the Maps facade component, and the actual city copy content.

## Common Pitfalls

### Pitfall 1: Route Conflict with Existing Pages
**What goes wrong:** A `[city]` dynamic segment at `app/(site)/[city]/page.tsx` could conflict with existing static routes like `/about`, `/contact`, `/senior-portraits` since they're all siblings under `(site)`.
**Why it happens:** Next.js resolves static routes before dynamic routes, so `/about` will still match `app/(site)/about/page.tsx` before `[city]`. However, during development or with misconfiguration, this can cause confusion.
**How to avoid:** (1) `dynamicParams = false` ensures only `generateStaticParams` slugs resolve. (2) Verify no city slug collides with an existing page route name. The 7 city slugs (chatham, danville, lynchburg, smith-mountain-lake, forest, altavista, evington) do not conflict with any existing route (about, contact, investment, senior-portraits, family-portraits, raves, style-guide, gallery-test). (3) Next.js App Router prioritizes static segments over dynamic segments, so even without `dynamicParams = false`, `/about` would match the static route first.
**Warning signs:** 404 on city pages or unexpected rendering of the city template for non-city URLs.

### Pitfall 2: params is a Promise in Next.js 15
**What goes wrong:** Destructuring `params` synchronously causes a build warning or runtime error.
**Why it happens:** Next.js 15 made `params` async (returns `Promise<{ city: string }>`). Must `await params` before accessing properties.
**How to avoid:** Always use `const { city } = await params` in the page component. This pattern is already used across the project.
**Warning signs:** "Dynamic server usage" warnings during build.

### Pitfall 3: Duplicate Content Between City Pages
**What goes wrong:** Google penalizes or devalues pages that share more than 40% identical content. If city pages use template-swapped copy ("We serve [City], VA with beautiful portraits..."), they'll be detected as thin/duplicate content.
**Why it happens:** It's tempting to write one template and swap city names. The success criteria explicitly requires no two pages share more than 40% identical content.
**How to avoid:** (1) Each city gets genuinely unique copy about its character -- Danville's revitalized riverfront district, Lynchburg's historic hills, Smith Mountain Lake's waterfront life. (2) Tiered word counts mean different-sized content blocks. (3) Shared structural elements (nav, footer, CTA buttons) don't count toward content uniqueness -- only the main body copy. (4) Manual audit of all 21 city-pair comparisons before launch.
**Warning signs:** Using copy-paste between city content with only name swaps.

### Pitfall 4: Google Maps Embed API Key Exposure
**What goes wrong:** The Maps Embed API key is visible in the iframe `src` URL in the browser. If not restricted, it could be misused.
**Why it happens:** Embed API keys are inherently public (they're in client-side HTML).
**How to avoid:** (1) Restrict the API key to the Maps Embed API only (no other Google APIs). (2) Set HTTP referrer restrictions to `emilykathryn.com/*` in Google Cloud Console. (3) Use `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` env var -- the `NEXT_PUBLIC_` prefix is correct since this key is intentionally public.
**Warning signs:** API key without referrer restrictions in Google Cloud Console.

### Pitfall 5: Testimonial Schema References Need Dereferencing
**What goes wrong:** Sanity references (`{ _type: 'reference', _ref: 'abc123' }`) return only the reference ID, not the actual testimonial data.
**Why it happens:** GROQ references must be explicitly dereferenced with `->` in the query projection.
**How to avoid:** Use `testimonials[]->{ _id, name, quote, service, image { ${IMAGE_FIELDS} } }` in the GROQ query to dereference testimonial references.
**Warning signs:** Testimonial data showing `null` or `undefined` for name/quote fields.

### Pitfall 6: Sitemap Not Including City Pages
**What goes wrong:** The 7 city pages are live but missing from `/sitemap.xml`, so Google may not discover them.
**Why it happens:** The current `sitemap.ts` is a static list. It has a `TODO: Phase 5` comment but no dynamic city page logic.
**How to avoid:** Make `sitemap()` async, fetch city slugs from Sanity, and append city page entries. The existing TODO in `sitemap.ts` line 12 explicitly calls for this.
**Warning signs:** City pages not indexed in Google Search Console after launch.

## Code Examples

Verified patterns from the existing codebase and official sources:

### City Page GROQ Query
```typescript
// Pattern follows existing GALLERY_BY_SLUG_QUERY and TESTIMONIALS_QUERY
export const CITY_PAGE_QUERY = `*[_type == "cityPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  headline,
  aeoBlock,
  body,
  metaDescription,
  mapQuery,
  testimonialLabel,
  "galleryImages": galleryImages[]{
    _key,
    alt,
    caption,
    ${IMAGE_FIELDS}
  },
  "testimonials": testimonials[]->{
    _id,
    name,
    quote,
    service,
    "image": image {
      ${IMAGE_FIELDS}
    }
  }
}`;

export const CITY_SLUGS_QUERY = `*[_type == "cityPage"]{ "slug": slug.current }`;
```

### generateMetadata for Dynamic City Pages
```typescript
// Source: Next.js 15 docs - generateMetadata with dynamic routes
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const data = await sanityFetch<CityPageData>({
    query: CITY_PAGE_QUERY,
    params: { slug: city },
    tags: ['cityPage'],
  })
  if (!data) return {}

  return {
    title: `${data.title} Portrait Photographer`,
    description: data.metaDescription || `Senior and family portrait photographer serving ${data.title}, Virginia...`,
    openGraph: {
      title: `${data.title} Portrait Photographer | Emily Kathryn Photography`,
      description: data.metaDescription,
      url: `https://emilykathryn.com/${data.slug}`,
      // ...standard OG fields
    },
  }
}
```

### Async Sitemap with City Pages
```typescript
// Source: Existing sitemap.ts + Phase 5 TODO comment
import { sanityFetch } from '@/sanity/lib/fetch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = siteConfig.url

  // Fetch city slugs from Sanity
  const cities = await sanityFetch<Array<{ slug: string }>>({
    query: `*[_type == "cityPage"]{ "slug": slug.current }`,
    tags: ['cityPage'],
  })

  const staticPages = [
    // ... existing static entries
  ]

  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...cityPages]
}
```

## City Metadata Reference

Static data for all 7 cities (geo coordinates, map queries, market tiers):

| City | Slug | Latitude | Longitude | Map Query | Market Tier | Word Count Target |
|------|------|----------|-----------|-----------|-------------|-------------------|
| Chatham | chatham | 36.8260 | -79.3981 | Chatham, Virginia | Mid | ~350-400 |
| Danville | danville | 36.5860 | -79.3950 | Danville, Virginia | Large | ~500 |
| Lynchburg | lynchburg | 37.4138 | -79.1422 | Lynchburg, Virginia | Large | ~500 |
| Smith Mountain Lake | smith-mountain-lake | 37.0380 | -79.5345 | Smith Mountain Lake, Virginia | Mid | ~350-400 |
| Forest | forest | 37.3692 | -79.2867 | Forest, Virginia | Small | ~250-300 |
| Altavista | altavista | 37.1118 | -79.2856 | Altavista, Virginia | Small | ~250-300 |
| Evington | evington | 37.2338 | -79.2895 | Evington, Virginia | Small | ~250-300 |

**Note:** Coordinates are approximate (from public geographic databases). Sufficient precision for JSON-LD `GeoCoordinates` and map centering. The Maps Embed API `place` mode uses query strings, not coordinates, for pin placement.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13+ | Function signature and async params handling differ |
| Sync `params` object | `params: Promise<{}>` (must await) | Next.js 15 | Must `await params` before destructuring |
| Google Maps `output=embed` (no key) | Maps Embed API v1 (free, key required) | ~2018 | Legacy `output=embed` deprecated; Embed API is free/unlimited but needs a key |
| Eager-loaded map iframes | Facade pattern (click-to-load) | web.dev guidance 2022+ | ~500KB savings per page load; critical for mobile LCP |
| `schema-dts` Review on own site for star snippets | Review for semantic/AEO value only | Google 2024 | Self-serving reviews on own site don't get star snippets; still valuable for AI answer engines |

**Deprecated/outdated:**
- `output=embed` Google Maps URL parameter: No longer supported without API key. Use Maps Embed API v1 instead (free, unlimited).
- `getStaticPaths`: Pages Router only. Use `generateStaticParams` in App Router.
- Sync `params` in page components: Next.js 15 requires `await params`.

## Open Questions

1. **Google Maps Embed API Key Setup**
   - What we know: Maps Embed API is free with unlimited usage. Requires a Google Cloud project and API key.
   - What's unclear: Whether Emily/Jeff already has a Google Cloud project, or if one needs to be created. The key needs HTTP referrer restrictions set to `emilykathryn.com/*`.
   - Recommendation: Document the API key setup steps in the plan. Use `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` env var. Plan can include facade with a "map coming soon" fallback if key is not yet configured.

2. **Testimonial City Association**
   - What we know: The existing `testimonial` schema has no `city` field. The CONTEXT.md says city-specific testimonials are preferred with regional fallback.
   - What's unclear: Whether to add a `city` field to the existing testimonial schema (breaking change for existing data?) or handle city-testimonial association purely through the `cityPage.testimonials` reference array.
   - Recommendation: Use the `cityPage.testimonials` reference array approach. Emily manually picks testimonials per city in the CMS. No schema change to existing `testimonial` type needed. The `testimonialLabel` field on `cityPage` handles the "South-Central Virginia" regional fallback label.

3. **Gallery Image Source for City Pages**
   - What we know: CONTEXT.md says "don't assume photos are pre-organized by city" and "Emily assigns any photos to any city in the CMS."
   - What's unclear: Whether to use the existing `gallery` document type (which already has a `location` field for cities) or embed images directly in the `cityPage` schema.
   - Recommendation: Embed gallery images directly in the `cityPage` document as an inline image array. This is simpler for Emily -- she sees one document per city with everything in it. The existing `gallery` schema's `location` field is for the separate gallery pages, not the city landing pages. Both can coexist.

## Sources

### Primary (HIGH confidence)
- [Next.js 15 generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Function API, dynamicParams, return types, async params
- [Next.js 15 Dynamic Routes docs](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) - Route resolution, segment config
- [Google Maps Embed API docs](https://developers.google.com/maps/documentation/embed/get-started) - Free unlimited usage, API key required, place mode parameters
- [Google Maps Embed API embedding-map](https://developers.google.com/maps/documentation/embed/embedding-map) - iframe URL structure, place mode, query parameters
- [Schema.org GeoCoordinates](https://schema.org/GeoCoordinates) - latitude, longitude properties for LocalBusiness.geo
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness) - areaServed, geo properties
- [Google Search Central LocalBusiness docs](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Required and recommended properties

### Secondary (MEDIUM confidence)
- [web.dev embed best practices](https://web.dev/articles/embed-best-practices) - Facade pattern for third-party embeds
- [Chrome DevTools third-party facades](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades) - Lighthouse audit for facade pattern
- [Sanity schema docs](https://www.sanity.io/docs/studio/schema-types) - Document type definitions, field types
- [CXL AEO guide](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/) - AEO answer block best practices for 2025-2026

### Tertiary (LOW confidence)
- City geo coordinates from latitude.to and coordinatesfinder.com - approximate values, sufficient for JSON-LD precision

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in project, no new dependencies
- Architecture: HIGH - Dynamic route pattern verified with Next.js 15 official docs, all supporting components exist
- Pitfalls: HIGH - Route conflict analysis verified against existing codebase, async params pattern already used in project
- City data: MEDIUM - Geo coordinates from public databases, sufficient precision for Schema.org but should be cross-verified
- Google Maps: HIGH - Embed API confirmed free/unlimited in official docs, facade pattern well-documented

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable domain, no fast-moving dependencies)
