---
phase: 03-core-pages-and-conversion
plan: 02
subsystem: ui
tags: [next.js, server-components, sanity, tailwind, seo, opengraph, service-pages]

# Dependency graph
requires:
  - phase: 02-shared-components-and-galleries
    provides: "Section, Storyboard, PricingCard, AnswerBlock, ScarcityCue, SanityImage, GalleryGrid, GalleryClient components"
  - phase: 02-shared-components-and-galleries
    provides: "sanityFetch wrapper, GROQ queries (PRICING_TIERS_QUERY, TESTIMONIALS_QUERY, ACTIVE_SCARCITY_CUE_QUERY)"
provides:
  - "Senior Portraits service page at /senior-portraits with 5-step Experience Storyboard"
  - "Family Portraits service page at /family-portraits (no Storyboard, family-specific FAQs)"
  - "Both pages with PricingCard 'Starting At' pricing, ScarcityCue, and gold CTA"
affects: [03-core-pages-and-conversion, 05-city-landing-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Service page scroll journey pattern: hero > scarcity > description > storyboard(optional) > pricing > FAQ > CTA"
    - "CMS fallback: local placeholder data with nullish coalescing for when Sanity is unconfigured"
    - "Promise.all parallel data fetching for pricing, testimonials, and scarcity cue"

key-files:
  created:
    - "src/app/(site)/senior-portraits/page.tsx"
    - "src/app/(site)/family-portraits/page.tsx"
  modified:
    - "src/lib/inquiry-schema.ts"

key-decisions:
  - "Service-specific CMS tier lookup by name substring (e.g., 'senior', 'family') with fallback to placeholder data"
  - "Family page intentionally omits Experience Storyboard per CONT-01 requirement (Senior-only)"
  - "FAQ content distinctly different between pages: Senior covers grad year, outfits, boys; Family covers kids ages, pets, scheduling"

patterns-established:
  - "Service page scroll journey: hero > scarcity cue > session description > optional storyboard > pricing > FAQ > CTA"
  - "CMS fallback pattern: sanityFetch with nullish coalescing (??) for placeholder data when Sanity is empty"

requirements-completed: [PAGE-02, PAGE-03, CONV-05, CONT-01, CONT-02]

# Metrics
duration: 7min
completed: 2026-02-22
---

# Phase 3 Plan 2: Service Pages Summary

**Senior Portraits and Family Portraits service pages with editorial scroll journeys, CMS-backed pricing, distinct FAQs, and conversion CTAs**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-22T20:58:37Z
- **Completed:** 2026-02-22T21:06:14Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Senior Portraits page with complete scroll journey: hero, scarcity cue, session description, 5-step Experience Storyboard, PricingCard with "Starting At" pricing, 6 senior-specific FAQs, and gold CTA
- Family Portraits page with parallel structure but NO Storyboard (Senior-only per CONT-01), family-specific FAQs addressing kids ages, pets, wardrobe coordination, and seasonal timing
- Both pages fetch pricing, testimonials, and scarcity cues via sanityFetch with ISR cache tags
- Both pages include full OpenGraph metadata for social sharing
- FAQ content is distinctly different between the two pages (senior: grad year, outfits, group sessions, boys; family: ages, pets, kids cooperation, seasonality)

## Task Commits

Each task was committed atomically:

1. **Task 1: Senior Portraits service page** - `31880f3` (feat)
2. **Task 2: Family Portraits service page** - `6357697` (feat)

## Files Created/Modified
- `src/app/(site)/senior-portraits/page.tsx` - Senior Portraits service page with 5-step Storyboard, pricing, FAQ, CTA
- `src/app/(site)/family-portraits/page.tsx` - Family Portraits service page with pricing, FAQ, CTA (no Storyboard)
- `src/lib/inquiry-schema.ts` - Fixed Zod v4 errorMap -> message API change (pre-existing build blocker)

## Decisions Made
- Service-specific CMS tier lookup uses `name.toLowerCase().includes('senior'/'family')` with fallback to $400 placeholder data when Sanity is unconfigured
- Family page intentionally omits Experience Storyboard per CONT-01 requirement -- this is a Senior-only feature
- Brand voice differentiated: Senior page is "editorial, magazine-worthy" speaking to both teens and parents; Family page is "warm, reassuring, parent-focused" with less editorial tone
- Both pages use muted background alternation for visual rhythm between sections

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed inquiry-schema.ts Zod v4 API change**
- **Found during:** Task 1 (Senior Portraits page build verification)
- **Issue:** `z.enum()` second argument used `errorMap` callback which is Zod v3 API; Zod v4 uses `message` string property. Pre-existing build error blocking all builds.
- **Fix:** Changed `{ errorMap: () => ({ message: '...' }) }` to `{ message: '...' }`
- **Files modified:** src/lib/inquiry-schema.ts
- **Verification:** Build passes after fix
- **Committed in:** 31880f3 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Fix was necessary for build verification. No scope creep.

## Issues Encountered
- Pre-existing `pages-manifest.json` ENOENT error during Next.js build -- resolved by clean rebuild (`rm -rf .next` with timing retry). This is a known intermittent issue with Next.js 15 concurrent build workers.
- Concurrent plan executions (03-01, 03-03, 03-04) running in parallel created some git staging overlap, but each plan's files were committed correctly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Both service pages are complete and statically pre-rendered at build time
- Pages are ready for CMS content population once Sanity project is configured
- Placeholder pricing ($400 Starting At) will be overridden by CMS data when available
- Both pages link to /contact for inquiry CTA (Contact page is built by plan 03-04)

## Self-Check: PASSED

- [x] src/app/(site)/senior-portraits/page.tsx exists (300 lines, min 80)
- [x] src/app/(site)/family-portraits/page.tsx exists (260 lines, min 60)
- [x] Commit 31880f3 exists (Task 1: Senior Portraits)
- [x] Commit 6357697 exists (Task 2: Family Portraits)
- [x] Senior page imports Storyboard; Family page does not
- [x] FAQ content is distinct between pages
- [x] Both pages use PricingCard with "Starting At" pricing
- [x] Build passes successfully

---
*Phase: 03-core-pages-and-conversion*
*Completed: 2026-02-22*
