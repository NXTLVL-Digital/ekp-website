---
phase: 03-core-pages-and-conversion
plan: 01
subsystem: ui
tags: [homepage, hero, testimonials, scarcity-cue, portfolio-preview, cta, opengraph, sanity-fetch, server-components]

# Dependency graph
requires:
  - phase: 02-shared-components-and-galleries
    provides: "Section, ScarcityCue, SanityImage, GalleryGrid components; TESTIMONIALS_QUERY, ACTIVE_SCARCITY_CUE_QUERY; sanityFetch wrapper"
provides:
  - "Homepage scroll journey at / with Hero, ScarcityCue, PortfolioPreview, HomeCTA, TestimonialCarousel, Bottom CTA"
  - "TestimonialCard reusable component for homepage, service pages, city pages, and raves page"
  - "TestimonialCarousel server-rendered grid (no client JS) for homepage testimonials"
  - "Hero component with gradient placeholder and gold CTA"
  - "PortfolioPreview component with category cards for senior and family sessions"
  - "HomeCTA component for mid-page conversion sections"
  - "HOMEPAGE_GALLERY_PREVIEW_QUERY for fetching one gallery per category"
  - "OpenGraph and Twitter Card metadata on homepage"
affects: [03-core-pages-and-conversion, 05-city-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Homepage Server Component composing shared + page-specific components with parallel sanityFetch"
    - "TestimonialImage type exported from TestimonialCard for consistent GROQ image projection typing"
    - "Gradient placeholder pattern for image areas pending Sanity CMS content"
    - "Promise.all for parallel CMS data fetching (testimonials + scarcity cue)"

key-files:
  created:
    - src/components/testimonials/TestimonialCard.tsx
    - src/components/home/Hero.tsx
    - src/components/home/PortfolioPreview.tsx
    - src/components/home/HomeCTA.tsx
    - src/components/home/TestimonialCarousel.tsx
  modified:
    - src/app/(site)/page.tsx
    - src/sanity/lib/queries.ts

key-decisions:
  - "TestimonialCard accepts full GROQ image projection (asset, hotspot, crop, alt) via TestimonialImage type -- not just the bare asset -- for proper SanityImage rendering with hotspot/crop support"
  - "Hero uses gradient placeholder instead of placeholder image -- Emily replaces with SanityImage + priority loading when real content is added"
  - "TestimonialCarousel is a server-rendered grid (no client-side carousel JS) -- simpler, faster, no hydration cost"
  - "Bottom CTA uses text link style instead of gold button to avoid competing with mid-page HomeCTA and sticky nav CTA"
  - "Homepage fetches featured testimonials and scarcity cue in parallel via Promise.all for minimal data loading time"

patterns-established:
  - "Homepage scroll journey: Hero > ScarcityCue (conditional) > PortfolioPreview > HomeCTA > Testimonials > Bottom CTA"
  - "TestimonialImage type interface for all testimonial image data from GROQ"
  - "Gradient placeholder for image areas: dark editorial gradient with gold accent for senior, sage accent for family"

requirements-completed: [PAGE-01, CONV-04, CONV-06, CONV-07]

# Metrics
duration: 9min
completed: 2026-02-22
---

# Phase 03 Plan 01: Homepage Summary

**Homepage scroll journey with Hero, conditional ScarcityCue, PortfolioPreview, mid-page CTA, TestimonialCarousel, and bottom CTA -- parallel sanityFetch for testimonials and scarcity cue, OpenGraph metadata, reusable TestimonialCard component**

## Performance

- **Duration:** 9 min
- **Started:** 2026-02-22T20:58:31Z
- **Completed:** 2026-02-22T21:08:02Z
- **Tasks:** 2
- **Files created:** 5
- **Files modified:** 2

## Accomplishments
- Homepage at `/` renders complete scroll journey: Hero with editorial gradient and gold CTA, conditional ScarcityCue from CMS, 2-column PortfolioPreview (Senior/Family), mid-page HomeCTA, TestimonialCarousel grid, and text-link bottom CTA
- TestimonialCard is a reusable Server Component (used by homepage, raves page, future service pages and city pages) with full GROQ image support including hotspot and crop
- Homepage fetches featured testimonials and active scarcity cue in parallel via Promise.all with tag-based ISR caching
- OpenGraph and Twitter Card metadata with title, description, url, siteName, locale, and type fields
- Persistent gold CTA already present in sticky nav (HeaderClient) -- verified visible within 2 scrolls on mobile via Hero CTA

## Task Commits

Each task was committed atomically:

1. **Task 1: TestimonialCard, Hero, PortfolioPreview, HomeCTA, TestimonialCarousel** - `fb4e428` (feat)
2. **Task 2: Homepage page.tsx composition with sanityFetch, scarcity cue, testimonials, OG metadata** - `11cc505` (feat)

## Files Created/Modified
- `src/components/testimonials/TestimonialCard.tsx` - Reusable testimonial blockquote card with SanityImage support (hotspot, crop, alt), service label, circular client photo
- `src/components/home/Hero.tsx` - Full-bleed hero section with dark editorial gradient placeholder, heading, subheading, gold CTA button
- `src/components/home/PortfolioPreview.tsx` - 2-column responsive grid of session category cards with gradient placeholders and "View Gallery" links
- `src/components/home/HomeCTA.tsx` - Centered mid-page CTA section with heading, body, gold button (44px min tap target)
- `src/components/home/TestimonialCarousel.tsx` - Server-rendered 1/2/3-column grid of up to 6 TestimonialCards (no client JS)
- `src/app/(site)/page.tsx` - Homepage Server Component composing Hero, ScarcityCue, PortfolioPreview, HomeCTA, TestimonialCarousel with parallel sanityFetch and OpenGraph metadata
- `src/sanity/lib/queries.ts` - Added HOMEPAGE_GALLERY_PREVIEW_QUERY and documented featured testimonials params pattern

## Decisions Made
- TestimonialCard uses `TestimonialImage` type (full GROQ image projection with asset, hotspot, crop, alt) rather than bare `SanityImageAsset` -- this enables proper hotspot/crop rendering and matches the established GROQ projection pattern
- Hero uses gradient placeholder (dark editorial with gold accent) instead of a placeholder image -- Emily will add a real SanityImage when CMS content is ready
- TestimonialCarousel is a simple server-rendered grid, not a client-side carousel -- no JS bundle cost, no hydration, simpler implementation
- Bottom CTA uses text link style ("Get in Touch" with gold text, no button background) to create visual hierarchy: sticky nav button > mid-page HomeCTA button > bottom text link
- Homepage copy uses "we" voice to feel welcoming while maintaining Emily's warm, editorial brand tone

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TestimonialCard image type to match GROQ projection**
- **Found during:** Task 2 (homepage composition TypeScript check)
- **Issue:** TestimonialCard's `image` prop was typed as `SanityImageAsset` (the bare asset object) but GROQ returns `image { asset->{ ... }, hotspot, crop, alt }` -- the full image object with nested asset
- **Fix:** Created `TestimonialImage` interface with `asset`, `hotspot`, `crop`, `alt` fields. Updated TestimonialCard and TestimonialCarousel to use this type. The SanityImage component now receives asset, hotspot, and crop separately for proper rendering.
- **Files modified:** src/components/testimonials/TestimonialCard.tsx, src/components/home/TestimonialCarousel.tsx
- **Verification:** `npx tsc --noEmit` passes, `npm run build` succeeds
- **Committed in:** 11cc505 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Type correction was necessary for TypeScript compilation and correct SanityImage rendering. No scope creep.

## Issues Encountered
- Intermittent Next.js build worker errors (`PageNotFoundError`, `pages-manifest.json ENOENT`, `Cannot read properties of undefined`) during clean builds -- resolved by retrying. These are known transient issues documented in Phase 2 summaries, caused by webpack caching race conditions in Next.js 15.5.12.
- Pre-existing Zod v4 compatibility issue in `src/lib/inquiry-schema.ts` (used `errorMap` instead of `error`) was auto-fixed by the project's linter before our first build.

## User Setup Required
None - no external service configuration required for this plan.

## Next Phase Readiness
- Homepage is fully functional at `/` with all scroll journey sections rendering correctly
- TestimonialCard is ready for reuse on service pages (03-02), raves page (03-03), and city pages (Phase 5)
- Hero component ready for SanityImage enhancement when CMS content is populated
- PortfolioPreview ready for real gallery preview images from Sanity
- HOMEPAGE_GALLERY_PREVIEW_QUERY available for future CMS integration
- All homepage components are Server Components (zero client JS added to the page)

## Self-Check: PASSED

All files verified on disk. Both commit hashes (fb4e428, 11cc505) verified in git log.

---
*Phase: 03-core-pages-and-conversion*
*Completed: 2026-02-22*
