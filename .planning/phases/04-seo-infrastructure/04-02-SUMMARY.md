---
phase: 04-seo-infrastructure
plan: 02
subsystem: seo
tags: [sitemap, robots-txt, google-search-console, isr, next-js-metadata]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: siteConfig.ts with canonical URL and navigation
  - phase: 03-core-pages-and-conversion
    provides: all 8 core page routes and OG metadata
provides:
  - XML sitemap with all core pages and image:image references
  - robots.txt with crawl directives and sitemap reference
  - Google Search Console verification via env var
  - Non-technical GSC setup guide for client
  - Validated ISR webhook for on-demand cache invalidation
affects: [05-city-landing-pages, deployment, launch-readiness]

# Tech tracking
tech-stack:
  added: []
  patterns: [MetadataRoute.Sitemap, MetadataRoute.Robots, metadata.verification.google]

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
    - docs/google-search-console-setup.md
  modified:
    - src/app/layout.tsx
    - .env.example

key-decisions:
  - "Image sitemaps included in sitemap.ts -- image:image XML tags drive Google Image traffic for photography business"
  - "GSC verification via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env var -- Next.js omits empty meta tag automatically"
  - "ISR webhook confirmed functional via code review -- no changes needed to Phase 1 implementation"

patterns-established:
  - "MetadataRoute.Sitemap: export default function from src/app/sitemap.ts for automatic /sitemap.xml generation"
  - "MetadataRoute.Robots: export default function from src/app/robots.ts for automatic /robots.txt generation"
  - "Verification metadata: process.env lookup in metadata export for conditional meta tag rendering"

requirements-completed: [SEO-08, INFRA-02]

# Metrics
duration: 3min
completed: 2026-02-24
---

# Phase 04 Plan 02: SEO Discovery and Indexing Infrastructure Summary

**XML sitemap with image references for 8 core pages, robots.txt with crawl boundaries, GSC verification via env var, and validated ISR webhook**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-24T19:57:48Z
- **Completed:** 2026-02-24T20:00:58Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- XML sitemap covering all 8 core pages with image:image tags for Google Image search discovery
- robots.txt allowing public crawling while blocking /studio/ and /api/ routes
- Google Search Console verification meta tag rendered conditionally from environment variable
- Step-by-step GSC setup guide written for Emily (non-technical) covering account creation through sitemap submission
- ISR webhook at /api/revalidate confirmed functional with proper signature validation, tag processing, and error handling

## Task Commits

Each task was committed atomically:

1. **Task 1: Create sitemap, robots.txt, and GSC verification** - `7baa04b` (feat)
2. **Task 2: Validate ISR webhook and create GSC setup guide** - `3278a54` (docs)

## Files Created/Modified
- `src/app/sitemap.ts` - XML sitemap generation with all 8 core pages and image references
- `src/app/robots.ts` - robots.txt with public allow, /studio/ and /api/ disallow, sitemap reference
- `src/app/layout.tsx` - Added verification.google to root metadata for GSC meta tag
- `.env.example` - Added NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION and RESEND_API_KEY entries
- `docs/google-search-console-setup.md` - 6-section non-technical guide for Emily

## Decisions Made
- Included image sitemaps (images array) in every sitemap entry since Google Image search is a significant traffic driver for photography businesses
- Used `process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` directly in metadata export -- Next.js automatically omits the verification meta tag when the env var is undefined, avoiding empty content attributes
- ISR webhook confirmed correct via code review with no changes needed -- parseBody from next-sanity/webhook handles signature validation, and error codes (401/400/500) follow HTTP conventions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

Emily needs to complete Google Search Console setup before launch:
- Follow `docs/google-search-console-setup.md` to create GSC account, add verification code to Vercel, and submit sitemap
- Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var in Vercel project settings

## Next Phase Readiness
- Sitemap is ready for Phase 5 city landing pages (TODO comment in sitemap.ts marks the extension point)
- All SEO infrastructure is in place for search engine discovery and indexing
- GSC guide is ready for Emily to execute when the site is deployed to production

## Self-Check: PASSED

All files verified present. All commits verified in git log.

---
*Phase: 04-seo-infrastructure*
*Completed: 2026-02-24*
