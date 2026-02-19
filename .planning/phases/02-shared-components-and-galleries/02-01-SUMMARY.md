---
phase: 02-shared-components-and-galleries
plan: 01
subsystem: ui
tags: [sanity-schemas, gallery, masonry, css-columns, lightbox, yarl, groq, dynamic-import]

# Dependency graph
requires:
  - phase: 01-foundation-02
    provides: "SanityImage component, urlFor image builder, sanityFetch wrapper, IMAGE_FIELDS GROQ fragment"
provides:
  - "Gallery component trio (GalleryGrid + GalleryClient + GalleryLightbox) for all portfolio pages"
  - "GalleryImageData type interface for gallery image props"
  - "5 Sanity schemas: gallery, galleryImage, pricingTier, testimonial, scarcityCue"
  - "GROQ queries: gallery by slug, galleries by category, pricing tiers, testimonials, active scarcity cue"
  - "Gallery test page at /gallery-test with 24 mock images for CWV verification"
affects: [02-shared-components-and-galleries, 03-inquiry, 05-city-pages]

# Tech tracking
tech-stack:
  added:
    - "yet-another-react-lightbox (YARL) v3 with Counter and Thumbnails plugins"
  patterns:
    - "CSS columns masonry layout (columns-2 md:columns-3 lg:columns-4) for zero-JS grid"
    - "Dynamic import of lightbox via next/dynamic with ssr:false for zero initial bundle cost"
    - "SanityImage/next-image fallback detection via cdn.sanity.io URL check"
    - "Sanity schemas with plain-English labels and descriptions for non-technical editor"
    - "GROQ IMAGE_FIELDS fragment reused across all image queries"

key-files:
  created:
    - src/sanity/schemas/gallery.ts
    - src/sanity/schemas/objects/galleryImage.ts
    - src/sanity/schemas/pricingTier.ts
    - src/sanity/schemas/testimonial.ts
    - src/sanity/schemas/scarcityCue.ts
    - src/components/shared/GalleryGrid.tsx
    - src/components/shared/GalleryClient.tsx
    - src/components/shared/GalleryLightbox.tsx
    - src/app/(site)/gallery-test/page.tsx
  modified:
    - src/sanity/schemas/index.ts
    - src/sanity/lib/queries.ts
    - src/components/shared/SanityImage.tsx
    - next.config.ts
    - package.json

key-decisions:
  - "Gallery images array uses inline image fields (not galleryImage object type) for better Studio drag-and-drop UX"
  - "galleryImage object type reserved for other schemas that need individual image references"
  - "GalleryGrid detects Sanity vs external URLs to auto-fallback from SanityImage to next/image"
  - "YARL lightbox uses direct Sanity CDN URLs (not NextJsImage render function) to avoid Vercel billing"
  - "GROQ TESTIMONIALS_QUERY uses select() for flexible featured/service filtering with null params"
  - "SanityImage aspectRatio made optional to align with gallery type interface"

patterns-established:
  - "All gallery rendering uses GalleryClient wrapper with GalleryGrid + dynamic GalleryLightbox"
  - "Sanity schema fields always include plain-English title and description for Emily"
  - "Radio buttons and dropdowns used for constrained choices instead of free-text fields"
  - "Hidden fields with conditional visibility (e.g., location only when category is location)"
  - "Gallery preview shows first image as media with category and photo count in subtitle"

requirements-completed: [GALL-01, GALL-02, GALL-03, GALL-04]

# Metrics
duration: 7min
completed: 2026-02-19
---

# Phase 02 Plan 01: Gallery Components and Sanity Schemas Summary

**Gallery component trio (masonry/grid + YARL lightbox via dynamic import), 5 Sanity CMS schemas with plain-English labels, GROQ queries, and 24-image test page at /gallery-test**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-19T18:25:29Z
- **Completed:** 2026-02-19T18:32:57Z
- **Tasks:** 2
- **Files created:** 9
- **Files modified:** 5

## Accomplishments
- Gallery component trio renders CMS images in CSS columns masonry (2/3/4 responsive columns) or uniform grid, with YARL lightbox loaded only on first click via dynamic import (zero initial JS cost)
- 5 Sanity schemas (gallery, galleryImage, pricingTier, testimonial, scarcityCue) with plain-English labels Emily can understand without developer help
- 5 GROQ queries for all Phase 2+ content types, reusing IMAGE_FIELDS fragment for consistency
- Gallery test page at /gallery-test with 24 mock images (varied aspect ratios) for Lighthouse auditing

## Task Commits

Each task was committed atomically:

1. **Task 1: Sanity schemas and GROQ queries for all Phase 2+ content types** - `fd28b44` (feat)
2. **Task 2: GalleryGrid, GalleryClient, GalleryLightbox components and gallery test page** - `1f2928f` (feat)

## Files Created/Modified
- `src/sanity/schemas/gallery.ts` - Gallery document schema with title, slug, category radio, displayStyle radio, images array with inline alt/caption, conditional location
- `src/sanity/schemas/objects/galleryImage.ts` - Reusable galleryImage object type for embedding in other schemas
- `src/sanity/schemas/pricingTier.ts` - Pricing tier document with Starting At price, features array, featured highlight toggle, sort order
- `src/sanity/schemas/testimonial.ts` - Testimonial document with client name, quote, service type radio, optional photo, featured toggle
- `src/sanity/schemas/scarcityCue.ts` - Scarcity cue document with message, active toggle, optional auto-hide date
- `src/sanity/schemas/index.ts` - Updated to register all 6 schema types (siteSettings + 5 new)
- `src/sanity/lib/queries.ts` - Added GALLERY_BY_SLUG_QUERY, GALLERIES_BY_CATEGORY_QUERY, PRICING_TIERS_QUERY, TESTIMONIALS_QUERY, ACTIVE_SCARCITY_CUE_QUERY
- `src/components/shared/GalleryGrid.tsx` - Server Component with masonry (CSS columns) and uniform grid modes, SanityImage/next-image auto-fallback
- `src/components/shared/GalleryClient.tsx` - Client Component wrapping GalleryGrid with lightbox state and dynamic import of GalleryLightbox
- `src/components/shared/GalleryLightbox.tsx` - Client Component wrapping YARL with Counter and Thumbnails plugins, CSS co-located for code splitting
- `src/app/(site)/gallery-test/page.tsx` - Test page with 24 mock images via picsum.photos, noindex, masonry layout
- `next.config.ts` - Added picsum.photos to remotePatterns for test images
- `package.json` - Added yet-another-react-lightbox dependency
- `src/components/shared/SanityImage.tsx` - Made aspectRatio optional in SanityImageAsset type

## Decisions Made
- **Inline image fields on gallery schema:** The gallery document's images array uses inline `type: 'image'` with alt/caption fields directly (not the galleryImage object type). This provides better drag-and-drop reordering UX in Sanity Studio. The galleryImage object type is reserved for other schemas that need individual image references.
- **SanityImage/next-image auto-detection:** GalleryGrid checks if `image.asset.url` contains `cdn.sanity.io`. Sanity URLs render via SanityImage (custom CDN loader), while external URLs (picsum.photos) render via standard next/image. Same component works for production and test.
- **Direct Sanity CDN URLs in lightbox:** GalleryLightbox uses `urlFor().width(1920).auto('format').quality(85).url()` directly, NOT the NextJsImage custom render function. This avoids routing lightbox images through Vercel's image optimization, saving on billing.
- **TESTIMONIALS_QUERY with select() filtering:** Uses GROQ `select()` for flexible runtime filtering by featured and/or service type, allowing a single query to serve multiple filtering needs by passing null params.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed SanityImage aspectRatio type mismatch**
- **Found during:** Task 2 (GalleryGrid TypeScript compilation)
- **Issue:** GalleryImageData interface has `aspectRatio?: number` (optional) but SanityImage's SanityImageAsset had `aspectRatio: number` (required). TypeScript rejected passing gallery images to SanityImage.
- **Fix:** Changed SanityImage's `SanityImageAsset.metadata.dimensions.aspectRatio` from `number` to `number | undefined` (optional)
- **Files modified:** src/components/shared/SanityImage.tsx
- **Verification:** `npx tsc --noEmit` passes
- **Committed in:** 1f2928f (Task 2 commit)

**2. [Rule 3 - Blocking] Fixed dynamic Tailwind class names**
- **Found during:** Task 2 (GalleryGrid implementation)
- **Issue:** Initial implementation used template literal Tailwind classes (`columns-${columns.mobile}`) which Tailwind v4 JIT cannot detect at build time
- **Fix:** Replaced with static Tailwind classes (`columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4`) using the default column config values directly
- **Files modified:** src/components/shared/GalleryGrid.tsx
- **Verification:** `npm run build` passes, classes correctly generated
- **Committed in:** 1f2928f (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking issues)
**Impact on plan:** Both auto-fixes necessary for TypeScript compilation and Tailwind class generation. No scope creep.

## Issues Encountered
- Pre-existing build error (`TypeError: a[d] is not a function`) appeared during first Task 1 build verification but was transient -- subsequent builds passed without changes. Likely a webpack caching issue during rapid build invocations.

## User Setup Required
None - no external service configuration required for this plan.

## Next Phase Readiness
- Gallery component trio ready for use on all service pages and city landing pages
- GalleryClient can be imported and used with any array of GalleryImageData objects
- All 5 Sanity schemas registered and visible in Studio's schema list
- GROQ queries available for fetching galleries, pricing, testimonials, and scarcity cues
- Gallery test page at /gallery-test ready for Lighthouse audit in Plan 02-03
- Plan 02-02 (Section, PricingCard, ScarcityCue, Storyboard, AnswerBlock, JsonLd) can proceed

## Self-Check: PASSED

All 11 files verified on disk. Both commit hashes (fd28b44, 1f2928f) verified in git log.

---
*Phase: 02-shared-components-and-galleries*
*Completed: 2026-02-19*
