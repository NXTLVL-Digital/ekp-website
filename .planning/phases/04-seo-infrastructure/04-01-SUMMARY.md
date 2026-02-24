---
phase: 04-seo-infrastructure
plan: 01
subsystem: seo
tags: [json-ld, schema-dts, structured-data, local-business, faq, review, service]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: siteConfig.ts canonical NAP data, JsonLd generic component
  - phase: 03-core-pages-and-conversion
    provides: Service pages with FAQ data and testimonial fetching, homepage with testimonials
provides:
  - LocalBusiness ProfessionalService JSON-LD schema builder (buildLocalBusinessSchema)
  - Service JSON-LD schema builder (buildServiceSchema) with @id cross-referencing
  - FAQPage JSON-LD schema builder (buildFaqPageSchema)
  - Review + AggregateRating JSON-LD schema builders (buildReviewSchemas, buildAggregateRatingSchema)
  - BUSINESS_ID constant for cross-schema @id referencing
  - Site-wide LocalBusiness structured data via layout
  - Per-page Service, FAQPage, and Review structured data on service pages
affects: [05-city-landing-pages, 06-launch-readiness]

# Tech tracking
tech-stack:
  added: []
  patterns: [schema-builder-functions, id-cross-referencing, conditional-jsonld-rendering]

key-files:
  created:
    - src/lib/schemas/localBusiness.ts
    - src/lib/schemas/service.ts
    - src/lib/schemas/faqPage.ts
    - src/lib/schemas/review.ts
  modified:
    - src/app/(site)/layout.tsx
    - src/app/(site)/senior-portraits/page.tsx
    - src/app/(site)/family-portraits/page.tsx
    - src/app/(site)/page.tsx
    - src/app/(site)/raves/page.tsx

key-decisions:
  - "Speakable markup intentionally omitted from FAQPage -- beta-only for US-English news publishers, may be discontinued"
  - "Review schemas render conditionally only when testimonials exist from CMS fetch"
  - "BUSINESS_ID exported as shared constant for @id cross-referencing across all schema types"
  - "ProfessionalService used as @type despite Schema.org deprecation note -- still valid, Google processes it, most specific categorization"

patterns-established:
  - "Schema builder pattern: typed functions in src/lib/schemas/ returning WithContext<T> objects"
  - "@id cross-referencing: BUSINESS_ID constant shared across LocalBusiness, Service, and Review schemas"
  - "Conditional JSON-LD: Review schemas only render when testimonial data exists (length > 0)"
  - "Multiple JSON-LD blocks per page: separate script tags for each schema type"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04]

# Metrics
duration: 4min
completed: 2026-02-24
---

# Phase 4 Plan 1: JSON-LD Structured Data Summary

**Four type-safe JSON-LD schema builders (LocalBusiness, Service, FAQPage, Review) with @id cross-referencing, wired into all page components via schema-dts WithContext types**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-24T19:57:55Z
- **Completed:** 2026-02-24T20:01:39Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Created 4 schema builder functions in `src/lib/schemas/` with full schema-dts type safety
- LocalBusiness ProfessionalService renders site-wide via layout with NAP data, 7-city areaServed, opening hours, payment info, and social links
- Service schemas on Senior and Family Portraits pages linked to parent business via BUSINESS_ID @id reference
- FAQPage schemas render on both service pages from existing FAQ data arrays
- Review + AggregateRating schemas render conditionally on homepage, service pages, and raves when testimonials exist
- All data sourced from siteConfig (no hardcoded NAP) -- single update point
- Production build passes with zero errors, all 16 pages generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Create JSON-LD schema builder functions** - `3278a54` (feat)
2. **Task 2: Wire JSON-LD schemas into page components** - `cef5d0e` (feat)

## Files Created/Modified
- `src/lib/schemas/localBusiness.ts` - LocalBusiness ProfessionalService builder with BUSINESS_ID export
- `src/lib/schemas/service.ts` - Service builder with provider @id cross-reference
- `src/lib/schemas/faqPage.ts` - FAQPage builder from FaqItem arrays
- `src/lib/schemas/review.ts` - Review array + AggregateRating builders with TestimonialData interface
- `src/app/(site)/layout.tsx` - Added site-wide LocalBusiness JSON-LD before Header
- `src/app/(site)/senior-portraits/page.tsx` - Added Service + FAQPage + Review JSON-LD
- `src/app/(site)/family-portraits/page.tsx` - Added Service + FAQPage + Review JSON-LD
- `src/app/(site)/page.tsx` - Added Review JSON-LD conditional on featured testimonials
- `src/app/(site)/raves/page.tsx` - Added Review JSON-LD conditional on testimonials

## Decisions Made
- **Speakable omitted:** Research confirmed Speakable is beta-only for US-English news publishers and may be discontinued in early 2026. FAQPage structure alone is sufficient for voice/AI parsing.
- **ProfessionalService @type:** Used despite Schema.org deprecation note -- still valid, processed by Google, and most specific categorization for a photography business.
- **Conditional Review rendering:** Review schemas only render when CMS returns testimonials (length > 0), preventing empty schema output.
- **Shared BUSINESS_ID:** Exported from localBusiness.ts and imported by service.ts and review.ts for consistent @id cross-referencing across all schema types.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 4 JSON-LD schema types are live and type-checked
- Schema builders are reusable for city landing pages in Phase 5 (Service and Review schemas accept dynamic data)
- BUSINESS_ID constant is available for any future schema that needs to reference the parent business
- Ready for Phase 4 Plan 2 (sitemap, robots.txt, GSC verification)

## Self-Check: PASSED

All 9 files verified present. Both task commits (3278a54, cef5d0e) verified in git log.

---
*Phase: 04-seo-infrastructure*
*Completed: 2026-02-24*
