---
phase: 05-city-landing-pages
plan: 02
subsystem: local-seo
tags: [city-pages, seo-copy, aeo-blocks, seed-content, editorial-voice, cms-fallback, dangerouslySetInnerHTML]

# Dependency graph
requires:
  - phase: 05-city-landing-pages
    provides: Dynamic [city] route with generateStaticParams, CITY_DATA static module, CityHero/AeoBlock/GoogleMapFacade components, cityPage Sanity schema
provides:
  - CITY_CONTENT seed module with unique SEO copy for all 7 cities (headlines, AEO blocks, meta descriptions, body HTML)
  - CMS fallback rendering path in city page route using seed content
  - dangerouslySetInnerHTML body copy rendering for pre-CMS deployment
affects: [05-03-city-verification, 06-launch-readiness]

# Tech tracking
tech-stack:
  added: []
  patterns: [seed-content-as-cms-fallback, tiered-word-count-by-market-size, dangerouslySetInnerHTML-for-trusted-html]

key-files:
  created:
    - src/lib/cityContent.ts
  modified:
    - src/app/(site)/[city]/page.tsx

key-decisions:
  - "Seed content uses pre-rendered HTML (bodyHtml) with dangerouslySetInnerHTML — safe because content is hardcoded in our codebase, not user-generated"
  - "CMS data takes priority over seed content at every level (metadata, hero, AEO, body copy) with graceful fallback chain"
  - "notFound() only triggers when BOTH Sanity data AND seed content are missing for a slug — prevents broken pages during pre-CMS deployment"
  - "Gallery and testimonials sections hidden (not errored) when CMS data is empty — they require CMS-managed images/references"
  - "Body copy service links to /senior-portraits and /family-portraits render in both CMS and seed content paths"

patterns-established:
  - "Seed content fallback: TypeScript module exports static content used when CMS has no data, enabling full page rendering before CMS population"
  - "Tiered word count by market: large cities ~500 words, mid ~350-400, small ~250-300 — differentiated content depth by market potential"
  - "AEO block uniqueness: no two city AEO blocks share more than 3 consecutive identical words, ensuring genuine differentiation"

requirements-completed: [LOCAL-01, LOCAL-02, LOCAL-03, LOCAL-04, LOCAL-05, LOCAL-06, LOCAL-07, SEO-05, SEO-06]

# Metrics
duration: 10min
completed: 2026-02-24
---

# Phase 5 Plan 2: City Content Summary

**Unique editorial SEO copy for all 7 city pages with tiered word counts, AEO answer blocks, and seed content fallback rendering when CMS is empty**

## Performance

- **Duration:** 10 min
- **Started:** 2026-02-24T23:07:21Z
- **Completed:** 2026-02-24T23:17:25Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created genuinely unique SEO copy for all 7 cities in Emily's warm, confident, editorial brand voice with no template-swapping
- Tiered word counts by market size: Danville (491), Lynchburg (483), Chatham (373), Smith Mountain Lake (377), Forest (261), Altavista (259), Evington (274)
- All 7 AEO blocks between 40-60 words, all use "Emily Kathryn Photography", no two share more than 3 consecutive identical words
- Wired seed content as CMS fallback so city pages render fully before Sanity is populated
- Production build passes with all 7 city pages building successfully from seed content

## Task Commits

Each task was committed atomically:

1. **Task 1: Write unique city content for all 7 cities and create seed content module** - `7ef723f` (feat)
2. **Task 2: Wire seed content into city page as CMS fallback** - `32a069b` (feat)

## Files Created/Modified
- `src/lib/cityContent.ts` - Seed content module with CityContent interface and CITY_CONTENT record for all 7 cities (headlines, AEO blocks, meta descriptions, body HTML)
- `src/app/(site)/[city]/page.tsx` - Updated to import CITY_CONTENT, use as fallback in generateMetadata and CityPage component, render body via dangerouslySetInnerHTML when CMS is empty

## Decisions Made
- **dangerouslySetInnerHTML for seed content:** The bodyHtml is hardcoded in our TypeScript module (not user-generated), making dangerouslySetInnerHTML safe. This avoids needing to convert HTML to Portable Text for the seed data path.
- **Graceful fallback chain:** CMS data > seed content > generic fallback at every level. This ensures pages render correctly regardless of CMS population state.
- **Gallery/testimonials hidden when empty:** Rather than showing placeholder content, these sections are simply not rendered when CMS data is absent. They require actual Sanity-managed images and references.
- **Service links in both paths:** The "Whether you are looking for senior portraits or family portraits" paragraph with links renders in both the CMS Portable Text path and the seed content HTML path, ensuring service page links are always present.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness
- All 7 city pages now render complete content (hero, AEO block, body copy, map, CTA, JSON-LD) from seed data
- When Emily populates cityPage documents in Sanity, CMS content automatically takes priority
- Plan 03 handles verification and quality checks across all city pages
- Emily can begin reviewing and editing city copy in Sanity Studio at any time

## Self-Check: PASSED

- [x] src/lib/cityContent.ts exists
- [x] src/app/(site)/[city]/page.tsx exists
- [x] 05-02-SUMMARY.md exists
- [x] Commit 7ef723f exists (Task 1)
- [x] Commit 32a069b exists (Task 2)

---
*Phase: 05-city-landing-pages*
*Completed: 2026-02-24*
