# Phase 2: Shared Components and Galleries - Research

**Researched:** 2026-02-19
**Domain:** Gallery grid/masonry layout, lightbox interaction, Sanity gallery schemas, JSON-LD structured data, shared UI components, Core Web Vitals for image-heavy pages
**Confidence:** HIGH

## Summary

Phase 2 builds every reusable visual component that Phases 3 and 5 consume: a CMS-driven gallery grid with lightbox, pricing cards, scarcity cues, experience storyboards, answer blocks, and a typed JSON-LD helper. The core technical challenge is achieving 100/100 Lighthouse mobile performance on a page with 20+ high-quality portrait photographs while delivering a polished, premium browsing and lightbox experience.

The gallery grid should use a CSS `column-count` masonry approach -- the simplest, zero-JavaScript solution that naturally handles variable-height portrait and landscape images. Native CSS masonry (`grid-template-rows: masonry` or `display: grid-lanes`) is still behind feature flags in Chrome/Edge and only available in Safari Technology Preview as of February 2026, making it unsuitable for production. The CSS columns approach is ideal for a photography gallery because: (a) content is purely visual (images), eliminating the reading-order accessibility concerns that affect text-based masonry, (b) it requires zero client-side JavaScript, and (c) it produces zero CLS when images have known aspect ratios from Sanity metadata.

For the lightbox, **yet-another-react-lightbox** (YARL) v3 is the clear standard. It supports React 19, provides built-in keyboard navigation (arrow keys, Escape to close), swipe gestures, and offers a Counter plugin for the image counter requirement. It integrates with `next/image` via a custom render function and should be dynamically imported (`next/dynamic`) to keep it out of the initial page bundle entirely. The library's plugin architecture means only the features we need (Counter, Captions, Thumbnails) add to the bundle.

**Primary recommendation:** Build the gallery as a Server Component grid using CSS columns with `SanityImage`, then wrap the lightbox trigger in a thin Client Component that dynamically imports YARL. All other shared components (PricingCard, ScarcityCue, Storyboard, AnswerBlock, JsonLd) should be Server Components consuming Sanity data via the established `sanityFetch` pattern, with JSON-LD rendered as `<script type="application/ld+json">` tags typed with `schema-dts`.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Claude's discretion on grid style (masonry vs uniform), column counts, and responsive breakpoints
- Images must display beautifully -- vibrant, high-quality rendering is the priority
- Gallery should feel easy to browse, not overwhelming
- Must support arrow key navigation, mobile swipe, image counter, and Escape to close (per success criteria)
- Should feel polished and modern -- not a generic modal
- Scarcity cues should be attention-grabbing but not pushy -- photography clients expect warmth, not hard sells
- Pricing cards should clearly communicate "Starting At" pricing with a path to inquire
- Beautiful and vibrant -- not minimal/stark, not cluttered
- Consistent with Emily Kathryn brand (warm gold accent, editorial fonts established in Phase 1)
- Components should feel premium -- a portrait photography brand serving families and seniors
- Every visual component must have meaningful Sanity schema fields so Emily can customize content without developer help
- Emily is not tech savvy -- Sanity field labels must be plain English, descriptions must explain what each field does
- Provide toggle/select options where possible rather than requiring free-form text for layout choices
- Example: gallery should let Emily choose display style, reorder images, add captions -- all from Studio

### Claude's Discretion
- All visual design decisions (layout patterns, spacing, animations, hover effects, transitions)
- All component architecture decisions (Server/Client boundaries, prop interfaces)
- All Sanity schema design (field types, validation rules, default values)
- JSON-LD component patterns and schema-dts integration
- Core Web Vitals optimization approach
- AnswerBlock and FAQ display patterns

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GALL-01 | Senior Portraits gallery with masonry/grid layout, CMS-managed images | CSS columns masonry pattern, Sanity gallery schema with orderable image arrays, SanityImage integration, responsive column counts |
| GALL-02 | Family Portraits gallery with masonry/grid layout, CMS-managed images | Same gallery component reused with different Sanity document data; gallery schema supports multiple gallery types via document reference |
| GALL-03 | Location-based portfolio galleries (mirroring current site's geographic gallery structure) | Same GalleryGrid component; Sanity schema supports associating images with locations/cities for Phase 5 consumption |
| GALL-04 | Responsive lightbox with keyboard nav, swipe gestures, image counter, escape-to-close | yet-another-react-lightbox v3 with Counter plugin, custom Next.js Image render function, dynamic import for code splitting |
| PERF-01 | LCP under 2.5 seconds on mobile | First visible gallery image uses `priority` loading; remaining images use lazy loading; Sanity CDN loader avoids Vercel billing; LQIP blur placeholders prevent perceived delay |
| PERF-02 | CLS under 0.1 | CSS columns with `aspect-ratio` from Sanity metadata dimensions; SanityImage provides width/height for browser space reservation; no JS-driven layout recalculation |
| PERF-03 | 100/100 mobile performance score on Vercel Speed Insights | Dynamic import of lightbox (zero initial JS cost); CSS-only grid (no layout library JS); lazy loading for all below-fold images; WebP/AVIF via Sanity CDN auto-format |
</phase_requirements>

---

## Standard Stack

### Core (already installed in Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.12 | Framework, image component, dynamic imports | Established in Phase 1. `next/image` handles lazy loading, format negotiation, responsive sizes. |
| React | 19.1.0 | UI library | Established in Phase 1. YARL v3 confirms React 19 compatibility. |
| Sanity | 4.22.0 | CMS for gallery images, component content | Established in Phase 1. Image arrays with hotspot, drag-and-drop reordering built in. |
| next-sanity | 11.6.12 | Sanity/Next.js integration | Established in Phase 1. `sanityFetch` wrapper for all data fetching. |
| @sanity/image-url | 2.0.3 | Image URL builder | Established in Phase 1. Used by SanityImage and lightbox slide URLs. |
| schema-dts | 1.1.5 | TypeScript JSON-LD types | Established in Phase 1. Types for LocalBusiness, Service, FAQPage, Review schemas. |
| Tailwind CSS | 4.x | Styling | Established in Phase 1. `@theme` tokens for brand colors, spacing, typography. |

### New for Phase 2

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| yet-another-react-lightbox | ^3.25 | Lightbox with plugins | Gallery image viewing. Only loaded when user clicks an image (dynamic import). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| yet-another-react-lightbox | yet-another-react-lightbox-lite (~5KB) | Lite version lacks Counter plugin (required for image counter), Captions, and Thumbnails. Missing features would need hand-rolling. Full version with dynamic import means zero initial bundle cost anyway. |
| yet-another-react-lightbox | Custom lightbox | Touch gestures, keyboard navigation, focus trapping, image preloading, animation -- deceptively complex. YARL handles all edge cases. |
| CSS columns masonry | JS masonry library (masonry.js, ~200K weekly npm downloads) | Adds ~25KB JS for layout; CSS columns achieves same visual result with zero JS for image-only galleries. |
| CSS columns masonry | Native CSS masonry (grid-template-rows: masonry) | Not production-ready. Behind feature flags in Chrome 140+. Only Safari Technology Preview supports it. |
| react-schemaorg | Direct script tag with schema-dts types | react-schemaorg is 4 years old, last published v2.0.0. Next.js official docs recommend the script tag approach for App Router. schema-dts provides the same type safety without the wrapper. |

**Installation:**

```bash
npm install yet-another-react-lightbox
```

That is the only new dependency. All other libraries are already installed from Phase 1.

---

## Architecture Patterns

### Recommended Component Structure (Phase 2 scope)

```
src/
├── components/
│   ├── shared/
│   │   ├── SanityImage.tsx         # Already exists (Phase 1)
│   │   ├── GalleryGrid.tsx         # Server Component: CSS columns grid
│   │   ├── GalleryLightbox.tsx     # Client Component: YARL wrapper (dynamic import target)
│   │   ├── GalleryClient.tsx       # Client Component: click handler + lightbox state
│   │   ├── Section.tsx             # Server Component: consistent section wrapper
│   │   ├── PricingCard.tsx         # Server Component: "Starting At" pricing display
│   │   ├── ScarcityCue.tsx         # Server Component: time-sensitive availability message
│   │   ├── Storyboard.tsx          # Server Component: Experience journey timeline
│   │   ├── AnswerBlock.tsx         # Server Component: FAQ/AEO answer display
│   │   └── JsonLd.tsx              # Server Component: typed JSON-LD script tag
│   └── layout/                     # Already exists (Phase 1)
│
├── sanity/
│   └── schemas/
│       ├── index.ts                # Updated: register new schemas
│       ├── siteSettings.ts         # Already exists (Phase 1)
│       ├── gallery.ts              # Gallery document: title, slug, images[], category, displayStyle
│       ├── objects/
│       │   └── galleryImage.ts     # Reusable object: image + alt + caption + tags
│       ├── pricingTier.ts          # Pricing document: name, startingAt, description, features[]
│       ├── testimonial.ts          # Testimonial document: name, quote, service, image
│       └── scarcityCue.ts          # Scarcity cue document: message, isActive, expiresAt
│
├── app/
│   └── (site)/
│       └── gallery-test/
│           └── page.tsx            # Test page: 20+ images for Lighthouse audit (Phase 2 verification)
│
└── lib/
    └── siteConfig.ts               # Already exists (Phase 1)
```

### Pattern 1: Server Component Grid + Client Component Lightbox (Gallery Split)

**What:** The gallery is split into two components: a Server Component (`GalleryGrid`) that renders the CSS columns grid with `SanityImage` elements, and a thin Client Component (`GalleryClient`) that wraps the grid and manages lightbox state. The actual lightbox (`GalleryLightbox`) is dynamically imported only when opened.

**When to use:** Every gallery on the site (Senior Portraits, Family Portraits, city galleries).

**Why this pattern:**
- Server Component for the grid means zero JavaScript ships for the grid layout itself
- Images are rendered server-side with correct dimensions, eliminating CLS
- The Client Component boundary is thin -- it only manages `open` state and the selected image index
- Dynamic import of the lightbox means ~0KB added to the initial page bundle
- The lightbox JS only loads on first click (user intent to view)

**Example:**

```typescript
// components/shared/GalleryGrid.tsx (Server Component)
import { SanityImage } from './SanityImage'
import type { GalleryImage } from '@/sanity/schemas/objects/galleryImage'

interface GalleryGridProps {
  images: GalleryImage[]
  onImageClick?: (index: number) => void
  columns?: { mobile: number; tablet: number; desktop: number }
}

export function GalleryGrid({
  images,
  onImageClick,
  columns = { mobile: 2, tablet: 3, desktop: 4 },
}: GalleryGridProps) {
  return (
    <div
      className="gap-3 md:gap-4"
      style={{
        columnCount: columns.mobile,
      }}
      // Responsive column counts via Tailwind arbitrary properties
      // See CSS implementation below
    >
      {images.map((image, index) => (
        <div
          key={image._key}
          className="mb-3 break-inside-avoid md:mb-4"
        >
          <button
            type="button"
            className="group relative w-full overflow-hidden rounded"
            onClick={() => onImageClick?.(index)}
            aria-label={`View ${image.alt || 'gallery image'} in lightbox`}
          >
            <SanityImage
              asset={image.asset}
              alt={image.alt || ''}
              hotspot={image.hotspot}
              crop={image.crop}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
          {image.caption && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
```

```typescript
// components/shared/GalleryClient.tsx (Client Component -- thin wrapper)
'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { GalleryGrid } from './GalleryGrid'
import type { GalleryImage } from '@/sanity/schemas/objects/galleryImage'

// Dynamic import: lightbox JS only loads on first click
const GalleryLightbox = dynamic(
  () => import('./GalleryLightbox').then(mod => ({ default: mod.GalleryLightbox })),
  { ssr: false }
)

interface GalleryClientProps {
  images: GalleryImage[]
  columns?: { mobile: number; tablet: number; desktop: number }
}

export function GalleryClient({ images, columns }: GalleryClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  return (
    <>
      <GalleryGrid
        images={images}
        onImageClick={handleImageClick}
        columns={columns}
      />
      {lightboxIndex >= 0 && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </>
  )
}
```

```typescript
// components/shared/GalleryLightbox.tsx (Client Component -- dynamically imported)
'use client'

import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { urlFor } from '@/sanity/lib/image'
import type { GalleryImage } from '@/sanity/schemas/objects/galleryImage'

interface GalleryLightboxProps {
  images: GalleryImage[]
  index: number
  onClose: () => void
}

export function GalleryLightbox({ images, index, onClose }: GalleryLightboxProps) {
  const slides = images.map((image) => ({
    src: urlFor(image.asset).width(1920).auto('format').quality(85).url(),
    alt: image.alt || '',
    width: image.asset.metadata?.dimensions?.width || 1920,
    height: image.asset.metadata?.dimensions?.height || 1280,
  }))

  return (
    <Lightbox
      open={true}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Counter, Thumbnails]}
      counter={{ separator: ' / ' }}
      thumbnails={{ width: 80, height: 60, gap: 8 }}
      animation={{ fade: 200, swipe: 300 }}
      carousel={{ preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}
```

### Pattern 2: JSON-LD as Server Component with schema-dts Types

**What:** A reusable `JsonLd` component that renders a `<script type="application/ld+json">` tag in a Server Component. Uses `schema-dts` for TypeScript type checking at authoring time with zero runtime cost.

**When to use:** Every page that needs structured data (all pages in this project).

**Why this pattern:** Next.js official docs (v16.1.6) recommend the `<script>` tag approach for App Router, NOT `react-schemaorg` (which is 4 years old and designed for `next/head`). The `schema-dts` package provides compile-time type safety without any runtime overhead.

**Example:**

```typescript
// components/shared/JsonLd.tsx (Server Component)
import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

```typescript
// Usage in a page (Server Component):
import { JsonLd } from '@/components/shared/JsonLd'
import type { LocalBusiness, WithContext } from 'schema-dts'
import { siteConfig } from '@/lib/siteConfig'

const jsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  image: 'https://emilykathryn.com/og-image.jpg',
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'Chatham', addressRegion: 'VA' },
    { '@type': 'City', name: 'Danville', addressRegion: 'VA' },
  ],
}

// In the page JSX:
<JsonLd data={jsonLd} />
```

### Pattern 3: Sanity Schema with Plain-English Labels

**What:** Every Sanity schema field includes a human-readable `title` and `description` that explains what the field does in non-technical language. Select/radio options are used instead of free-text where possible.

**When to use:** All Sanity schemas in this project.

**Why this pattern:** Emily is the sole content editor and is not tech-savvy. Schema fields must be self-documenting. A field labeled "SEO Meta" means nothing to her; "Page Title (shown in Google search results)" is actionable.

**Example:**

```typescript
// sanity/schemas/gallery.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  description: 'A collection of photos that appears on your website. You can create galleries for Senior Portraits, Family Portraits, or specific locations.',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Name',
      type: 'string',
      description: 'A name for this gallery (e.g., "Senior Portraits 2025" or "Chatham Sessions")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Path',
      type: 'slug',
      description: 'The web address for this gallery. Click "Generate" to create it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Gallery Type',
      type: 'string',
      description: 'What kind of sessions are in this gallery?',
      options: {
        list: [
          { title: 'Senior Portraits', value: 'senior' },
          { title: 'Family Portraits', value: 'family' },
          { title: 'Location Gallery', value: 'location' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayStyle',
      title: 'Layout Style',
      type: 'string',
      description: 'How should photos be arranged? Masonry fills space naturally (like Pinterest). Grid keeps all photos the same size.',
      options: {
        list: [
          { title: 'Masonry (varied sizes)', value: 'masonry' },
          { title: 'Uniform Grid (same size)', value: 'grid' },
        ],
        layout: 'radio',
      },
      initialValue: 'masonry',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      description: 'Drag and drop to reorder. The first photo is featured most prominently.',
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Photo',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Photo Description',
              type: 'string',
              description: 'Describe what is in this photo (helps with Google search and accessibility). Example: "Senior girl in blue dress at Smith Mountain Lake"',
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'A short caption shown below the photo. Leave blank to show no caption.',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
      validation: (rule) => rule.min(1).error('A gallery needs at least one photo'),
    }),
    defineField({
      name: 'location',
      title: 'Location (optional)',
      type: 'string',
      description: 'If this is a location gallery, which city? Used to show photos on city landing pages.',
      options: {
        list: [
          { title: 'Chatham', value: 'chatham' },
          { title: 'Danville', value: 'danville' },
          { title: 'Lynchburg', value: 'lynchburg' },
          { title: 'Smith Mountain Lake', value: 'smith-mountain-lake' },
          { title: 'Forest', value: 'forest' },
          { title: 'Altavista', value: 'altavista' },
          { title: 'Evington', value: 'evington' },
        ],
      },
      hidden: ({ parent }) => parent?.category !== 'location',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0',
      imageCount: 'images',
    },
    prepare({ title, category, media, imageCount }) {
      const count = imageCount ? Object.keys(imageCount).length : 0
      return {
        title: title || 'Untitled Gallery',
        subtitle: `${category || 'Uncategorized'} - ${count} photo${count !== 1 ? 's' : ''}`,
        media,
      }
    },
  },
})
```

### Pattern 4: CSS Columns Masonry with Responsive Breakpoints

**What:** A pure CSS masonry layout using `column-count` with responsive breakpoints via Tailwind utility classes. Items flow top-to-bottom within columns. `break-inside: avoid` prevents images from splitting across columns.

**When to use:** GalleryGrid component with `displayStyle === 'masonry'`.

**Why CSS columns over JS masonry:**
- Zero JavaScript -- entire grid layout is CSS-only
- Zero CLS -- images have known dimensions from Sanity metadata, and `aspect-ratio` CSS property reserves space immediately
- Simpler than CSS Grid masonry (no row-span calculations needed)
- The tab-order accessibility concern (content reads top-to-bottom per column, not left-to-right) is a non-issue for image galleries because users click/tap images to view them; there is no sequential text reading requirement

**CSS approach:**

```css
/* In globals.css or component styles */
.gallery-masonry {
  column-gap: 0.75rem;
  column-count: 2;
}

@media (min-width: 768px) {
  .gallery-masonry {
    column-gap: 1rem;
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .gallery-masonry {
    column-count: 4;
  }
}

.gallery-masonry > * {
  break-inside: avoid;
  margin-bottom: 0.75rem;
}

@media (min-width: 768px) {
  .gallery-masonry > * {
    margin-bottom: 1rem;
  }
}
```

Alternatively, use Tailwind's responsive classes directly:

```tsx
<div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
  {images.map((image) => (
    <div key={image._key} className="mb-3 break-inside-avoid md:mb-4">
      {/* image content */}
    </div>
  ))}
</div>
```

### Pattern 5: Uniform Grid Alternative

**What:** A standard CSS Grid layout where all images are cropped to the same aspect ratio (3:4 portrait, matching typical portrait photography).

**When to use:** GalleryGrid component with `displayStyle === 'grid'`.

**Why offer both:** Some galleries (particularly family sessions with consistent framing) look better in a uniform grid. Giving Emily the choice in Sanity Studio satisfies the customization requirement.

```tsx
<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
  {images.map((image) => (
    <div key={image._key} className="relative aspect-[3/4] overflow-hidden rounded">
      <SanityImage
        asset={image.asset}
        alt={image.alt || ''}
        hotspot={image.hotspot}
        crop={image.crop}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />
    </div>
  ))}
</div>
```

### Anti-Patterns to Avoid

- **Importing lightbox CSS in the main bundle:** YARL CSS imports (`yet-another-react-lightbox/styles.css`) must be inside the dynamically-imported component, NOT in `globals.css` or layout. Otherwise the CSS ships on every page load even when the lightbox is never opened.
- **Making the entire gallery grid a Client Component:** Only the click handler and lightbox state need `'use client'`. The grid itself, including all `SanityImage` renders, should be a Server Component for zero JS cost.
- **Using `priority` on gallery grid images:** Only the page hero (above-fold LCP element) should have `priority`. Gallery images below the fold MUST use the default lazy loading. Setting priority on 20+ images creates 20+ competing preloads and destroys LCP.
- **Fetching full-resolution images for grid thumbnails:** Grid images should be sized appropriately via `sizes` prop (e.g., `50vw` on mobile, `25vw` on desktop). The Sanity CDN loader will serve properly sized images. Full-resolution images are only needed in the lightbox.
- **Storing gallery images as separate Sanity documents:** Use an array of images within the gallery document, NOT individual image documents. Arrays support drag-and-drop reordering in Sanity Studio and maintain ordering naturally.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Lightbox with gestures | Custom modal with swipe detection | yet-another-react-lightbox v3 | Touch gesture normalization across devices, keyboard trap, preloading, animation physics -- hundreds of edge cases. |
| Image counter in lightbox | Custom counter overlay | YARL Counter plugin | Pre-built, styled, positioned, accessible. 2 lines to enable. |
| Thumbnail strip in lightbox | Custom scrollable thumbnail bar | YARL Thumbnails plugin | Handles scroll position, active state, responsive sizing. |
| Masonry layout engine | JS-based masonry (masonry.js, isotope) | CSS `column-count` | Zero JS, zero CLS, built into browsers for 10+ years. Works perfectly for image-only content. |
| JSON-LD type safety | Manually typing schema objects | schema-dts `WithContext<T>` | Google-maintained, complete Schema.org vocabulary, catches invalid properties at compile time. |
| JSON-LD rendering | react-schemaorg `<JsonLd>` component | Direct `<script>` tag (Next.js recommended) | react-schemaorg is 4 years stale, designed for pages router. Next.js App Router docs recommend the script tag pattern. |
| Image blur placeholders | Custom blur hash generation | Sanity LQIP (built-in) | Already generated on upload. Available via `asset->metadata.lqip` GROQ projection. |
| Responsive image sizing | Manual srcset generation | SanityImage + Sanity CDN loader | The custom loader already generates properly sized URLs. `next/image` handles srcset automatically via `sizes` prop. |

**Key insight:** The lightbox is the single component that justifies a third-party library in this phase. Everything else (grid layout, blur placeholders, image sizing, JSON-LD) is handled by CSS, Sanity built-ins, or the established Phase 1 infrastructure.

---

## Common Pitfalls

### Pitfall 1: Lightbox CSS in Main Bundle

**What goes wrong:** Importing `yet-another-react-lightbox/styles.css` in `globals.css` or the layout file ships ~4KB of lightbox CSS on every page load, even pages without galleries.

**Why it happens:** Developers import CSS at the top level for convenience. In a traditional SPA this is fine, but in Next.js with code splitting, CSS imports should follow the component they belong to.

**How to avoid:** Import YARL CSS files ONLY inside the `GalleryLightbox` component that is dynamically imported. The CSS will only load when the lightbox loads.

**Warning signs:** Lighthouse flags unused CSS on non-gallery pages. DevTools shows `counter.css` and `styles.css` loaded on the homepage.

### Pitfall 2: CLS from Images Without Dimensions

**What goes wrong:** Gallery images load without width/height attributes, causing the page layout to shift as each image downloads and renders. CLS exceeds 0.1, failing PERF-02.

**Why it happens:** When using `fill` mode in `next/image`, the parent container must have explicit dimensions. When using width/height mode, the values must be correct.

**How to avoid:** Always pass `width` and `height` from Sanity metadata (`asset.metadata.dimensions.width/height`). For masonry mode, the SanityImage already handles this. For grid mode with `fill`, wrap each image in a container with `aspect-ratio: 3/4` (or the desired ratio).

**Warning signs:** Lighthouse CLS warning. Images visibly "popping in" during page load. Content jumping below the gallery.

### Pitfall 3: Setting Priority on Multiple Gallery Images

**What goes wrong:** Marking several gallery images as `priority` creates competing preload hints. The browser tries to fetch them all immediately, saturating the connection and actually increasing LCP because the hero/LCP image has to share bandwidth.

**Why it happens:** The instinct is "make important images load faster." But `priority` means "this is THE most important image on the page" -- there can only be one.

**How to avoid:** Only the page hero image (if one exists above the gallery) should have `priority`. All gallery images use the default `loading="lazy"` behavior. The first visible gallery image will naturally load quickly because `next/image` uses Intersection Observer.

**Warning signs:** Lighthouse warns about multiple preloaded images. Network waterfall shows 4+ images competing at highest priority.

### Pitfall 4: Lightbox Not Supporting All Required Interactions

**What goes wrong:** The lightbox opens but arrow keys, swipe, or Escape don't work. This fails success criteria #2.

**Why it happens:** Missing plugin imports, or the lightbox component is rendered inside an element that captures keyboard events.

**How to avoid:** YARL handles keyboard (arrow keys, Escape) and swipe gestures by default -- no extra configuration needed. The Counter plugin must be explicitly imported and added to the `plugins` array. Test all interactions during implementation: (1) arrow left/right to navigate, (2) Escape to close, (3) swipe left/right on mobile, (4) counter shows "1 / N" format.

**Warning signs:** Open lightbox and press Escape -- nothing happens. Open on mobile and swipe -- nothing happens.

### Pitfall 5: Sanity Schema Fields Without Descriptions

**What goes wrong:** Emily opens Sanity Studio and sees fields labeled "slug," "alt," "displayStyle" with no explanation. She doesn't know what to type or which option to choose. She messages Jeff for help every time she needs to update content.

**Why it happens:** Developers name fields for their own understanding, not for the end user.

**How to avoid:** Every field must have a plain-English `description`. Use Sanity's `options.list` with human-readable titles for any field with predefined choices. Use `hidden` to conditionally show fields (e.g., location only appears when category is "location"). Use `initialValue` to provide sensible defaults.

**Warning signs:** Emily asks questions about what fields mean. Emily leaves fields blank because she doesn't understand them.

### Pitfall 6: Gallery Test Page Missing from Build

**What goes wrong:** The Lighthouse audit in Plan 02-03 fails because there's no gallery test page deployed with real CMS images.

**Why it happens:** Components are built but never assembled into a test page. Verification depends on a real page with 20+ images.

**How to avoid:** Create a gallery test page at `/gallery-test` during Plan 02-01. Populate the Sanity gallery with 20+ real portfolio images. This page serves as the Lighthouse audit target and can be removed or repurposed after Phase 2 verification.

**Warning signs:** Plan 02-03 starts and there's no page to audit.

---

## Code Examples

### GROQ Query for Gallery with Image Metadata

```groq
// Source: Established IMAGE_FIELDS pattern from Phase 1 queries.ts
*[_type == "gallery" && slug.current == $slug][0]{
  title,
  category,
  displayStyle,
  location,
  "images": images[]{
    _key,
    alt,
    caption,
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
    crop
  }
}
```

### YARL Custom Render Function for Next.js Image (Lightbox)

```typescript
// Source: https://yet-another-react-lightbox.com/examples/nextjs
import Image from 'next/image'
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from 'yet-another-react-lightbox'

export function NextJsImage({ slide, offset, rect }: {
  slide: { src: string; alt?: string; width?: number; height?: number; blurDataURL?: string }
  offset: number
  rect: { width: number; height: number }
}) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps()
  const { currentIndex } = useLightboxState()
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / (slide.height || 1)) * (slide.width || 1)))
    : rect.width
  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / (slide.width || 1)) * (slide.height || 1)))
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt={slide.alt || ''}
        src={slide.src}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        blurDataURL={slide.blurDataURL}
        style={{
          objectFit: cover ? 'cover' : 'contain',
          cursor: click ? 'pointer' : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0
            ? () => click?.({ index: currentIndex })
            : undefined
        }
      />
    </div>
  )
}
```

**Note:** Using the custom NextJsImage render in the lightbox would route images through Vercel's optimization (because `next/image` with fill uses the default loader by default). For the lightbox, it is simpler and more cost-effective to use the standard YARL image rendering with Sanity CDN URLs (which already include `auto=format`). Only use the NextJsImage render function if advanced lightbox features like blur placeholders inside the lightbox are desired.

### PricingCard Component Pattern

```typescript
// components/shared/PricingCard.tsx (Server Component)
import Link from 'next/link'

interface PricingCardProps {
  name: string
  startingAt: number
  description: string
  features: string[]
  ctaHref?: string
  ctaLabel?: string
  highlight?: boolean
}

export function PricingCard({
  name,
  startingAt,
  description,
  features,
  ctaHref = '/contact',
  ctaLabel = 'Inquire for Detailed Pricing',
  highlight = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 md:p-8 ${
        highlight
          ? 'border-brand-gold bg-brand-gold/5'
          : 'border-border bg-white'
      }`}
    >
      <h3 className="font-heading text-2xl">{name}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <p className="mt-4">
        <span className="text-sm text-muted-foreground">Starting At</span>
        <br />
        <span className="font-heading text-3xl">${startingAt}</span>
      </p>
      <ul className="mt-6 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 text-brand-gold" aria-hidden="true">&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-6 flex min-h-11 items-center justify-center rounded bg-brand-gold px-5 py-2.5 text-sm tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
```

### ScarcityCue Component Pattern

```typescript
// components/shared/ScarcityCue.tsx (Server Component)
interface ScarcityCueProps {
  message: string
  isActive: boolean
}

export function ScarcityCue({ message, isActive }: ScarcityCueProps) {
  if (!isActive) return null

  return (
    <div className="rounded-lg border border-brand-gold/30 bg-brand-gold/5 px-4 py-3 text-center">
      <p className="text-sm font-medium text-foreground">
        <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-gold" aria-hidden="true" />
        {message}
      </p>
    </div>
  )
}
```

### Section Wrapper Component Pattern

```typescript
// components/shared/Section.tsx (Server Component)
interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'muted'
  id?: string
}

export function Section({
  children,
  className = '',
  background = 'white',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-section-sm md:py-section ${
        background === 'muted' ? 'bg-muted' : 'bg-background'
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        {children}
      </div>
    </section>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS masonry libraries (masonry.js, isotope) | CSS `column-count` for image-only grids | Always available, but JS libs dominated due to feature parity | Zero JS cost, zero CLS with known dimensions |
| Native CSS masonry (`grid-template-rows: masonry`) | Still experimental, behind feature flags | Chrome 140+ (flag), Safari TP 234 | NOT production-ready. Do not use. CSS columns is the correct approach for 2026. |
| `react-schemaorg` for JSON-LD in React | Direct `<script>` tag with `schema-dts` types | Next.js App Router era (2023+) | react-schemaorg is stale (v2.0.0, 4 years old). Next.js docs explicitly recommend script tag approach. |
| `framer-motion` for transitions | `motion` package (rebranded) | 2025 | If any animation is needed, use `motion` not `framer-motion`. But prefer CSS transitions for simple hover/scale effects. |
| Lightbox.js, react-images, etc. | yet-another-react-lightbox v3 | 2023+ | YARL is actively maintained, React 19 compatible, plugin architecture, ~10KB core gzipped |

**Deprecated/outdated:**
- `react-schemaorg`: Last published 4 years ago. Use schema-dts types with direct script tag.
- Native CSS masonry: Not production-ready. Use CSS columns.
- `framer-motion` package name: Rebranded to `motion`. Same API.
- Multiple lightbox libraries (react-images, lightbox.js, react-photoswipe): Either unmaintained or lacking React 19 support. YARL is the standard.

---

## Discretion Recommendations

### Gallery Layout: CSS Columns Masonry (Default) + Uniform Grid (Option)

**Recommendation:** Default to masonry (CSS columns) with 2 columns on mobile, 3 on tablet, 4 on desktop. Offer uniform grid as an alternative selectable in Sanity Studio.

**Rationale:**
- Portrait photography naturally varies in aspect ratio (full-length portraits are tall, group shots are wide, detail shots are square). Masonry handles this beautifully without cropping.
- The Pinterest-style masonry layout is immediately recognizable and inviting for browsing large photo collections.
- Uniform grid is better for curated collections where Emily wants a clean, editorial look with consistent framing.
- Giving Emily the choice in Studio (radio buttons: "Masonry" vs "Grid") satisfies the customization requirement with zero technical burden.

### Lightbox: Dark Background, Smooth Transitions, Thumbnails

**Recommendation:** Use YARL with dark semi-transparent backdrop, 200ms fade transitions, bottom thumbnail strip, and the Counter plugin showing "1 / 20" format.

**Rationale:**
- Dark backgrounds make photographs pop (industry standard for photography portfolio lightboxes)
- Thumbnail strip enables non-linear browsing ("jump to a photo I saw earlier") without feeling overwhelming
- Counter satisfies the success criteria requirement and orients the user within the collection
- 200ms fade is fast enough to feel responsive but slow enough to feel polished (not jarring)

### Hover Effects: Subtle Scale Transform

**Recommendation:** On gallery grid images, use `scale(1.02)` on hover with a 500ms CSS transition. No opacity change, no overlay text, no color filter.

**Rationale:**
- The subtle scale signals interactivity ("this is clickable") without obscuring the photograph
- Emily's brand is about showcasing images -- overlays or filters would work against that
- 500ms transition feels smooth and premium; faster transitions feel twitchy, slower feels sluggish
- CSS-only, zero JS cost

### AnswerBlock and FAQ Display

**Recommendation:** Use a simple accordion pattern with question as the trigger and answer as the expandable content. Use the native HTML `<details>/<summary>` elements for zero-JS accordion behavior.

**Rationale:**
- `<details>/<summary>` is accessible out of the box (keyboard operable, screen reader compatible)
- Zero client-side JavaScript required
- SEO-friendly: Google can read the content regardless of open/close state
- Styling with Tailwind is straightforward
- The AEO answer blocks on city pages (Phase 5) are a different component -- they are always visible, not collapsed

### JSON-LD Integration

**Recommendation:** Build a generic `JsonLd<T>` component that accepts any `WithContext<T>` from schema-dts. Each page composes its own JSON-LD data and passes it to the component. Do NOT try to auto-generate JSON-LD from page data -- explicit is better than magic.

**Rationale:**
- Each page type has different JSON-LD requirements (LocalBusiness, Service, FAQPage, Review)
- Explicit construction makes it easy to validate against Google Rich Results Test
- The generic component handles serialization and XSS prevention (the `<` replacement)
- schema-dts catches invalid properties at compile time

---

## Open Questions

1. **YARL Bundle Size (exact gzipped)**
   - What we know: YARL is actively maintained, v3.25.0+, plugin architecture allows tree-shaking unused plugins
   - What's unclear: Exact minified+gzipped size of core + Counter + Thumbnails plugins combined
   - Recommendation: This is LOW risk since the lightbox is dynamically imported (zero initial page cost). Verify actual bundle impact during implementation with `next/bundle-analyzer` if needed. The ~5KB lite version was considered but lacks required plugins.

2. **Sanity Gallery Image Count for 20+ Test**
   - What we know: Success criteria requires 20+ CMS images on the test page
   - What's unclear: Whether Emily has 20+ portfolio images ready to upload, or if stock/placeholder images are needed
   - Recommendation: Use placeholder images for initial development and Lighthouse testing. Replace with real portfolio images when available. The performance characteristics (file size, dimensions, LQIP generation) will be similar.

3. **Vercel Speed Insights 100/100 Target**
   - What we know: Vercel Speed Insights uses real user metrics (RUM), not synthetic Lighthouse scores. Achieving 100/100 requires consistently excellent performance across real visitors.
   - What's unclear: Whether 100/100 on Speed Insights is achievable for a gallery page with 20+ images on mobile, or whether the success criteria means Lighthouse performance score of 100.
   - Recommendation: Optimize for both. Lighthouse 100 is achievable with proper lazy loading, LQIP, and CSS-only layout. Speed Insights 100/100 depends on real user conditions but the same optimizations apply. Build the gallery test page, measure both, and adjust.

---

## Sources

### Primary (HIGH confidence)
- [Next.js JSON-LD Guide (v16.1.6)](https://nextjs.org/docs/app/guides/json-ld) -- Official recommendation: script tag with schema-dts types, NOT react-schemaorg
- [Next.js Image Component (v16.1.6)](https://nextjs.org/docs/app/api-reference/components/image) -- priority, sizes, fill, lazy loading behavior
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) -- Google-maintained, TypeScript types for Schema.org JSON-LD
- [Sanity Image Gallery Recipe](https://www.sanity.io/recipes/image-gallery-dea386ba) -- Official gallery schema pattern with hotspot, alt, display options
- [Sanity Image Type Docs](https://www.sanity.io/docs/studio/image-type) -- hotspot, crop, metadata options (lqip, blurhash, palette, exif)
- [Sanity Image Metadata Docs](https://www.sanity.io/docs/apis-and-sdks/image-metadata) -- LQIP format, dimensions, GROQ projections
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com) -- React 19 compatible, plugin system, keyboard/swipe/touch support
- [YARL Next.js Integration](https://yet-another-react-lightbox.com/examples/nextjs) -- Custom render function for next/image, dynamic import pattern
- [YARL Counter Plugin](https://yet-another-react-lightbox.com/plugins/counter) -- Slide counter with customizable separator and positioning

### Secondary (MEDIUM confidence)
- [CSS Masonry Approaches (CSS-Tricks)](https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/) -- Comparison of columns, flexbox, grid approaches; columns best for image-only
- [Can I Use: CSS Masonry](https://caniuse.com/?search=masonry) -- Browser support status: experimental only, not production ready
- [Chrome Developers: Masonry Update](https://developer.chrome.com/blog/masonry-update) -- grid-lanes proposal, Chrome 140 flag, competing approaches
- [WebKit: CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/) -- Safari TP 234 only, display: grid-lanes
- [Smashing Magazine: Native CSS Masonry](https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/) -- Comprehensive overview of experimental state
- [Next.js Lighthouse Optimization Guide](https://www.wisp.blog/blog/mastering-mobile-performance-a-complete-guide-to-improving-nextjs-lighthouse-scores) -- LCP strategies, lazy loading, priority usage
- [CLS-Safe CMS Images in Next.js (Medium)](https://medium.com/@nicholasrussellconsulting/industry-standard-practices-for-rendering-cls-safe-cms-images-in-next-js-bf99fcc8d7e3) -- Dimension-based CLS prevention

### Tertiary (LOW confidence)
- [YARL Lite README](https://github.com/igordanchenko/yet-another-react-lightbox-lite/blob/main/README.md) -- ~5KB bundle, lacks Counter/Thumbnails plugins, React 18+ (not verified for React 19)
- YARL exact bundle size -- Bundlephobia page did not render; estimated ~10-15KB core gzipped based on similar libraries

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries verified as installed (Phase 1) or confirmed on npm with React 19 / Next.js 15 compatibility. YARL explicitly lists React 19 support.
- Architecture: HIGH -- Server/Client split pattern established in Phase 1 (Header/HeaderClient). CSS columns is a decade-old stable CSS feature. Dynamic import is core Next.js. Gallery schema follows official Sanity recipe.
- Pitfalls: HIGH -- CLS from missing dimensions is well-documented. Priority misuse is documented in Next.js official docs. CSS bundle splitting is a known Next.js pattern. Sanity field UX is a documented best practice.
- Discretion areas: MEDIUM -- Layout and UX recommendations are based on industry patterns and research, but visual preferences are inherently subjective. Implementation should validate against Emily Kathryn brand feel.

**Research date:** 2026-02-19
**Valid until:** 2026-03-19 (30 days -- CSS columns and YARL are stable; native CSS masonry status may change but is irrelevant to this implementation)
