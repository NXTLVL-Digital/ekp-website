---
phase: 02-shared-components-and-galleries
plan: 02
subsystem: ui
tags: [react, server-components, tailwind, json-ld, schema-dts, accordion, pricing]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Tailwind v4 brand tokens, SanityImage component, siteConfig.ts, schema-dts
provides:
  - Section wrapper component for consistent page layout
  - PricingCard component for investment/pricing pages
  - ScarcityCue component for time-sensitive availability messaging
  - Storyboard component for session experience journey timeline
  - AnswerBlock component for zero-JS FAQ accordion
  - JsonLd component for typed JSON-LD structured data
affects: [03-core-pages, 05-city-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component shared UI pattern (zero client JS for layout/content components)
    - Native HTML details/summary accordion pattern
    - Generic typed JSON-LD with XSS prevention
    - Responsive mobile-first Storyboard layout (vertical mobile, horizontal desktop)

key-files:
  created:
    - src/components/shared/Section.tsx
    - src/components/shared/PricingCard.tsx
    - src/components/shared/ScarcityCue.tsx
    - src/components/shared/Storyboard.tsx
    - src/components/shared/AnswerBlock.tsx
    - src/components/shared/JsonLd.tsx
  modified: []

key-decisions:
  - "AnswerBlock uses native HTML details/summary for zero-JS accordion -- keyboard and screen reader accessible by default"
  - "JsonLd uses generic <T extends Thing> with schema-dts WithContext<T> for compile-time type safety across all page types"
  - "Storyboard uses dual layout: vertical stack on mobile, horizontal flow on desktop, connected by gold line"

patterns-established:
  - "Section wrapper: py-section-sm md:py-section with max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  - "PricingCard gold CTA: min-h-11 for 44px tap target, bg-brand-gold with hover:bg-brand-gold-dark"
  - "ScarcityCue conditional render: return null when isActive is false"
  - "JsonLd XSS prevention: JSON.stringify(data).replace(/</g, '\\u003c')"

requirements-completed: [GALL-03]

# Metrics
duration: 3.5min
completed: 2026-02-19
---

# Phase 2 Plan 2: Shared Layout and Content Components Summary

**6 Server Components (Section, PricingCard, ScarcityCue, Storyboard, AnswerBlock, JsonLd) with zero client JS, typed JSON-LD via schema-dts, and native HTML accordion**

## Performance

- **Duration:** 3.5 min
- **Started:** 2026-02-19T18:25:23Z
- **Completed:** 2026-02-19T18:28:53Z
- **Tasks:** 2
- **Files created:** 6

## Accomplishments
- Section wrapper provides consistent padding, max-width, and background options for every page section
- PricingCard displays "Starting At" pricing with gold CTA meeting 44px tap target, hover shadow, and highlight variant
- ScarcityCue conditionally renders a warm availability nudge with pulsing gold dot (returns null when inactive)
- Storyboard renders responsive experience timeline with numbered gold circles and connecting line
- AnswerBlock provides zero-JS FAQ accordion using native details/summary with custom chevron
- JsonLd renders typed JSON-LD script tags with XSS prevention, accepting any schema-dts WithContext type

## Task Commits

Each task was committed atomically:

1. **Task 1: Section, PricingCard, and ScarcityCue components** - `5c5e82f` (feat)
2. **Task 2: Storyboard, AnswerBlock, and JsonLd components** - `6dae209` (feat)

## Files Created/Modified
- `src/components/shared/Section.tsx` - Consistent section wrapper with padding, max-width, muted/white background
- `src/components/shared/PricingCard.tsx` - "Starting At" pricing card with features list and gold CTA button
- `src/components/shared/ScarcityCue.tsx` - Conditional scarcity message with pulsing gold dot accent
- `src/components/shared/Storyboard.tsx` - Visual session experience timeline with numbered steps and gold connecting line
- `src/components/shared/AnswerBlock.tsx` - FAQ accordion using native details/summary with custom chevron rotation
- `src/components/shared/JsonLd.tsx` - Generic typed JSON-LD renderer with schema-dts types and XSS prevention

## Decisions Made
- Used native HTML `<details>/<summary>` for AnswerBlock instead of a JS accordion library -- provides keyboard and screen reader accessibility by default with zero JavaScript
- JsonLd uses a generic `<T extends Thing>` type parameter allowing any schema-dts type (LocalBusiness, Service, FAQPage, etc.) for compile-time safety across all page types
- Storyboard uses separate mobile (vertical) and desktop (horizontal) layouts rather than a single responsive layout, for cleaner visual presentation at each breakpoint
- PricingCard formats price with `toLocaleString()` for consistent number formatting

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Stale `.next` cache caused MODULE_NOT_FOUND error during build -- resolved by deleting `.next` directory and rebuilding cleanly. Not related to component changes.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All 6 shared components ready for page composition in Phase 3 (Core Pages) and Phase 5 (City Pages)
- Section is the foundational wrapper for every page section
- PricingCard ready for Investment page
- ScarcityCue ready to be driven by Sanity CMS scarcityCue document (schema to be created in Plan 02-01)
- Storyboard ready to render session experience on service pages
- AnswerBlock ready for FAQ sections across all pages
- JsonLd ready for structured data on every page

## Self-Check: PASSED

All 6 component files verified present. Both task commits (5c5e82f, 6dae209) verified in git log. SUMMARY.md exists at expected path.

---
*Phase: 02-shared-components-and-galleries*
*Completed: 2026-02-19*
