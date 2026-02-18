---
phase: 01-foundation
plan: 02
subsystem: infra
tags: [sanity, next-image, isr, webhook, lqip, webp, avif, sanity-cdn]

# Dependency graph
requires:
  - phase: 01-foundation-01
    provides: "Scaffolded Next.js project with Sanity client, route groups, env config"
provides:
  - "SanityImage component with custom CDN loader and LQIP blur placeholders"
  - "sanityLoader function bypassing Vercel image optimization"
  - "urlFor image URL builder for Sanity assets"
  - "IMAGE_FIELDS GROQ fragment for reusable image metadata projection"
  - "sanityFetch wrapper with explicit force-cache for Next.js 15 ISR"
  - "Webhook endpoint at /api/revalidate for on-demand ISR via Sanity"
affects: [02-content-pages, 03-inquiry, 04-seo, 05-city-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Custom Sanity CDN image loader bypasses Vercel optimization billing"
    - "sanityFetch with cache: force-cache for Next.js 15 ISR"
    - "Tag-based and time-based revalidation are mutually exclusive"
    - "GROQ IMAGE_FIELDS fragment for consistent image metadata projection"

key-files:
  created:
    - src/sanity/lib/image.ts
    - src/sanity/lib/fetch.ts
    - src/sanity/lib/queries.ts
    - src/components/shared/SanityImage.tsx
    - src/app/api/revalidate/route.ts
  modified: []

key-decisions:
  - "SanityImageSource type re-exported from @sanity/image-url (not deep subpath)"
  - "sanityFetch is separate from live.ts defineLive sanityFetch -- fetch.ts is production ISR wrapper"
  - "SanityImage passes hotspot and crop to urlFor builder for CDN-side crop handling"
  - "Default sizes prop set to responsive breakpoints; callers override for hero images"

patterns-established:
  - "All Sanity images rendered via SanityImage component with custom sanityLoader"
  - "All Sanity data fetching via sanityFetch wrapper with explicit cache control"
  - "IMAGE_FIELDS GROQ fragment included in every image query"
  - "Webhook revalidation validates signature before calling revalidateTag"

requirements-completed: [FOUND-03, FOUND-04, PERF-04]

# Metrics
duration: 4min
completed: 2026-02-18
---

# Phase 01 Plan 02: Image Pipeline & ISR Summary

**SanityImage component with custom CDN loader (bypassing Vercel billing), LQIP blur placeholders, sanityFetch wrapper with explicit force-cache for Next.js 15 ISR, and webhook revalidation endpoint**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-18T18:42:44Z
- **Completed:** 2026-02-18T18:46:28Z
- **Tasks:** 2
- **Files created:** 5

## Accomplishments
- SanityImage component renders images via custom Sanity CDN loader, avoiding Vercel's 5,000/month free-tier image optimization limit
- LQIP blur placeholders automatically applied when Sanity asset metadata includes lqip field
- sanityFetch wrapper explicitly opts into `cache: 'force-cache'` -- the critical fix for Next.js 15's default `no-store` behavior that would otherwise defeat ISR
- Tag-based and time-based revalidation enforced as mutually exclusive (preventing unpredictable cache behavior)
- Webhook endpoint at `/api/revalidate` validates Sanity signatures and calls `revalidateTag` for on-demand ISR

## Task Commits

Each task was committed atomically:

1. **Task 1: SanityImage wrapper with custom CDN loader and LQIP blur placeholders** - `46064a5` (feat)
2. **Task 2: sanityFetch wrapper with ISR caching and webhook revalidation endpoint** - `89970da` (feat)

## Files Created/Modified
- `src/sanity/lib/image.ts` - Image URL builder (urlFor) and custom Sanity CDN loader (sanityLoader)
- `src/sanity/lib/queries.ts` - GROQ queries with IMAGE_FIELDS fragment for image metadata projection
- `src/components/shared/SanityImage.tsx` - Reusable image component wrapping next/image with Sanity CDN loader, LQIP blur, hotspot/crop support
- `src/sanity/lib/fetch.ts` - Centralized sanityFetch wrapper with explicit cache: force-cache and tag/time revalidation
- `src/app/api/revalidate/route.ts` - Webhook POST handler for on-demand ISR triggered by Sanity

## Decisions Made
- **SanityImageSource type import path:** Used `@sanity/image-url` direct export instead of deep subpath `@sanity/image-url/lib/types/types` (which does not exist in v2.0.3). Fixed during Task 1 via auto-fix Rule 3.
- **Separate fetch.ts from live.ts:** The `live.ts` file (from scaffolding) exports a `sanityFetch` via `defineLive` for visual editing. The new `fetch.ts` is the production ISR-optimized wrapper. They serve different purposes and coexist at different import paths.
- **Crop handling in SanityImage:** Passed hotspot and crop directly to urlFor builder so Sanity CDN handles crop server-side, rather than only using CSS objectPosition.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed SanityImageSource type import path**
- **Found during:** Task 1 (image.ts creation)
- **Issue:** Plan specified `import type { SanityImageSource } from '@sanity/image-url/lib/types/types'` but this path does not exist in `@sanity/image-url@2.0.3`
- **Fix:** Changed to `import type { SanityImageSource } from '@sanity/image-url'` (direct export)
- **Files modified:** src/sanity/lib/image.ts
- **Verification:** `npx tsc --noEmit` passes
- **Committed in:** 46064a5 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed unused crop parameter causing ESLint warning**
- **Found during:** Task 1 (build verification)
- **Issue:** `crop` prop was destructured but not used, causing ESLint `no-unused-vars` warning
- **Fix:** Passed crop (along with hotspot) to `urlFor()` builder so Sanity CDN handles crop server-side
- **Files modified:** src/components/shared/SanityImage.tsx
- **Verification:** `npm run build` passes with zero warnings
- **Committed in:** 46064a5 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking import path, 1 bug fix)
**Impact on plan:** Both auto-fixes necessary for correctness. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required for this plan. The webhook endpoint requires `SANITY_REVALIDATE_SECRET` env var at deployment time, which will be configured during Vercel deployment.

## Next Phase Readiness
- SanityImage component ready for use in all page templates (Phase 2+)
- sanityFetch wrapper ready for all Sanity data fetching across the site
- IMAGE_FIELDS GROQ fragment ready for inclusion in all page queries
- Webhook endpoint ready for Sanity webhook configuration after deployment
- Plan 03 (NAP config, schemas, root layout with nav/footer) can proceed

## Self-Check: PASSED

All 6 files verified on disk. Both commit hashes (46064a5, 89970da) verified in git log.

---
*Phase: 01-foundation*
*Completed: 2026-02-18*
