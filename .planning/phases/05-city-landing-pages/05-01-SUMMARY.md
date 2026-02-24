---
phase: 05-city-landing-pages
plan: 01
subsystem: local-seo
tags: [city-pages, sanity-cms, dynamic-routes, json-ld, google-maps-facade, aeo, portable-text, generateStaticParams]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: siteConfig.ts canonical NAP data, sanityFetch ISR wrapper, JsonLd generic component
  - phase: 02-shared-components-and-galleries
    provides: GalleryClient/GalleryGrid with Sanity CDN detection, Section layout wrapper
  - phase: 03-core-pages-and-conversion
    provides: TestimonialCard component, PortableText dependency via next-sanity
  - phase: 04-seo-infrastructure
    provides: buildLocalBusinessSchema pattern, BUSINESS_ID constant, sitemap.ts with image references
provides:
  - Sanity cityPage document schema for CMS-managed city content
  - Dynamic [city] route with generateStaticParams for 7 city slugs
  - buildCityLocalBusinessSchema with unique @id, single-city areaServed, and GeoCoordinates
  - CityHero, AeoBlock, and GoogleMapFacade city page components
  - CITY_DATA static module with geo coordinates for all 7 target cities
  - CITY_PAGE_QUERY and CITY_SLUGS_QUERY GROQ queries
  - Async sitemap.ts with city page integration and hardcoded fallback
affects: [05-02-city-content, 05-03-city-verification, 06-launch-readiness]

# Tech tracking
tech-stack:
  added: []
  patterns: [dynamic-route-generateStaticParams, google-maps-facade-click-to-load, city-specific-json-ld, portable-text-rendering, aeo-answer-block]

key-files:
  created:
    - src/sanity/schemas/cityPage.ts
    - src/lib/cityData.ts
    - src/components/city/CityHero.tsx
    - src/components/city/AeoBlock.tsx
    - src/components/city/GoogleMapFacade.tsx
    - src/app/(site)/[city]/page.tsx
  modified:
    - src/sanity/schemas/index.ts
    - src/sanity/lib/queries.ts
    - src/lib/schemas/localBusiness.ts
    - src/app/sitemap.ts

key-decisions:
  - "CITY_DATA used as generateStaticParams source (not Sanity) so builds work before CMS content exists"
  - "dynamicParams = false ensures unknown city slugs return 404 immediately"
  - "buildCityLocalBusinessSchema uses unique @id per city (e.g., /chatham/#business), not site-wide BUSINESS_ID"
  - "Google Maps facade shows graceful 'Map coming soon' fallback when NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is not set"
  - "AeoBlock is always-visible callout box (not collapsible AnswerBlock FAQ accordion)"
  - "Sitemap falls back to hardcoded CITY_SLUGS when Sanity has no cityPage documents yet"
  - "Body copy uses Portable Text (array of blocks) for rich text editing in Sanity Studio"

patterns-established:
  - "City page facade pattern: static placeholder button that loads Google Maps iframe on click, saving ~500KB initial JS"
  - "City-specific JSON-LD: unique @id, single areaServed, GeoCoordinates per city page"
  - "AEO answer block: dedicated CMS field rendered as always-visible gold-accented callout"
  - "Static city metadata module: CITY_DATA as source of truth for slugs, coordinates, and market tiers"

requirements-completed: [LOCAL-01, LOCAL-02, LOCAL-03, LOCAL-04, LOCAL-05, LOCAL-06, LOCAL-07, SEO-05, SEO-06]

# Metrics
duration: 4min
completed: 2026-02-24
---

# Phase 5 Plan 1: City Landing Page Infrastructure Summary

**Dynamic [city] route with Sanity cityPage schema, 7-city generateStaticParams, city-specific LocalBusiness JSON-LD with GeoCoordinates, Google Maps facade, AEO answer block, and async sitemap integration**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-24T23:00:15Z
- **Completed:** 2026-02-24T23:04:20Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Created complete Sanity cityPage document schema with all fields Emily needs to manage city content (title, slug, headline, aeoBlock, body as Portable Text, gallery images, testimonials, mapQuery, testimonialLabel, metaDescription)
- Built 3 new city page components: CityHero (editorial gradient hero), AeoBlock (gold-accented always-visible answer snippet), GoogleMapFacade (click-to-load facade pattern with graceful API key fallback)
- Wired dynamic [city] route with generateStaticParams from static CITY_DATA, PortableText body rendering, conditional gallery/testimonials/map sections, and city-specific JSON-LD
- Extended localBusiness.ts with buildCityLocalBusinessSchema producing unique @id, single-city areaServed, and GeoCoordinates per city
- Made sitemap.ts async with Sanity city slug fetch and hardcoded CITY_SLUGS fallback for pre-CMS builds
- Production build passes with 23 pages (7 new city pages) and zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Sanity cityPage schema, GROQ queries, and city data module** - `3243b1a` (feat)
2. **Task 2: Create city page components, dynamic route, JSON-LD builder, and sitemap integration** - `fd35e95` (feat)

## Files Created/Modified
- `src/sanity/schemas/cityPage.ts` - Sanity document type for city landing page content with all CMS-editable fields
- `src/sanity/schemas/index.ts` - Registered cityPage in schema types array
- `src/lib/cityData.ts` - Static city metadata module with geo coords, map queries, and market tiers for 7 cities
- `src/sanity/lib/queries.ts` - Added CITY_PAGE_QUERY (full page fetch with dereferenced testimonials/images) and CITY_SLUGS_QUERY
- `src/components/city/CityHero.tsx` - Text-focused hero with editorial gradient, city name badge, and gold CTA
- `src/components/city/AeoBlock.tsx` - Always-visible AEO answer snippet with gold border accent
- `src/components/city/GoogleMapFacade.tsx` - Client component facade with inline SVG map pin, click-to-load iframe, API key fallback
- `src/lib/schemas/localBusiness.ts` - Added buildCityLocalBusinessSchema with unique @id, single-city areaServed, GeoCoordinates
- `src/app/(site)/[city]/page.tsx` - Dynamic city page route with generateStaticParams, generateMetadata, all 7 page sections, JSON-LD
- `src/app/sitemap.ts` - Converted to async with Sanity city slug fetch and CITY_SLUGS hardcoded fallback

## Decisions Made
- **CITY_DATA as generateStaticParams source:** Avoids Sanity dependency at build time since CMS content may not exist yet. Static module defines the 7 known slugs.
- **Portable Text for body copy:** Uses `array of block` type instead of plain text, giving Emily rich text editing with paragraphs, bold, italic, and links in Sanity Studio.
- **Graceful Maps fallback:** When NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is not set, shows a "Map coming soon" placeholder with a direct link to Google Maps search instead of an error.
- **Sitemap hardcoded fallback:** If Sanity returns no cityPage documents (pre-CMS population), sitemap still includes all 7 city URLs from the static CITY_SLUGS array.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Google Maps Embed API key** (optional, not required for build):
- Create or use existing Google Cloud project
- Enable Maps Embed API (free, unlimited)
- Create an API key restricted to Maps Embed API and `emilykathryn.com/*` referrer
- Set as `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` environment variable
- Until configured, city pages show a "Map coming soon" fallback with link to Google Maps

## Next Phase Readiness
- All 7 city page shells render end-to-end with Sanity data fetching
- Plan 02 fills in the actual unique SEO copy for each city
- Plan 03 handles verification and content quality checks
- Emily can begin populating cityPage documents in Sanity Studio immediately

---
*Phase: 05-city-landing-pages*
*Completed: 2026-02-24*
