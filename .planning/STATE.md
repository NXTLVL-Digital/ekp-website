# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** When a parent or senior in South-Central Virginia searches for portrait photography, Emily Kathryn Photography appears first — and the site converts that visitor into an inquiry within one session.
**Current focus:** Phase 3 — Core Pages and Conversion

## Current Position

Phase: 3 of 6 (Core Pages and Conversion) -- In progress
Plan: 4 of 5 in current phase
Status: Completed 03-04 (Inquiry Form and Contact Page)
Last activity: 2026-02-22 — Completed 03-04-PLAN.md

Progress: [█████████████████░░░] 45%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 5.0 min
- Total execution time: 0.68 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 9 min | 4.5 min |
| 02-shared-components-and-galleries | 3 | 15.5 min | 5.2 min |
| 03-core-pages-and-conversion | 3 | 20 min | 6.7 min |

**Recent Trend:**
- Last 5 plans: 02-03 (5min), 03-04 (5min), 03-02 (7min), 03-03 (8min)
- Trend: Consistent

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Stack: Next.js 15.5.12 + React 19.0.x + Sanity v4.22.0 + next-sanity v11.6.12 + Tailwind v4 + Resend (research confirmed, pinned versions)
- CMS: Sanity v4 chosen over Prismic — built-in LQIP, hotspot/crop, embedded Studio at /studio
- City pages: Single app/[city]/page.tsx dynamic route with generateStaticParams — never 7 separate files
- NAP config: Single siteConfig.ts canonical object — established in Phase 1 before any content is authored
- Image pipeline: Custom Sanity CDN loader bypasses Vercel image optimization billing; SanityImage component is sole image renderer
- ISR: sanityFetch wrapper with explicit cache: force-cache (Next.js 15 defaults to no-store); tag-based and time-based revalidation mutually exclusive
- fetch.ts vs live.ts: Separate production ISR wrapper (fetch.ts) from visual editing live fetch (live.ts)
- SanityLive deferred: Commented out in site layout because defineLive throws when NEXT_PUBLIC_SANITY_PROJECT_ID is empty -- will uncomment when Sanity project is configured
- Header Server/Client split: Header.tsx (server) passes siteConfig props to HeaderClient.tsx (client) to minimize client JS bundle
- Footer CTA as text link: "Get in Touch" uses text style to avoid competing with persistent gold nav CTA
- [Phase 02]: AnswerBlock uses native HTML details/summary for zero-JS accordion -- keyboard and screen reader accessible by default
- [Phase 02]: JsonLd uses generic <T extends Thing> with schema-dts WithContext<T> for compile-time type safety across all page types
- [Phase 02]: Storyboard uses dual layout: vertical stack on mobile, horizontal flow on desktop, connected by gold line
- [Phase 02]: Gallery images array uses inline image fields (not galleryImage object type) for better Studio drag-and-drop UX
- [Phase 02]: GalleryGrid detects Sanity vs external URLs to auto-fallback from SanityImage to next/image
- [Phase 02]: YARL lightbox uses direct Sanity CDN URLs (not NextJsImage render) to avoid Vercel optimization billing
- [Phase 02]: CSS columns masonry (columns-2 md:columns-3 lg:columns-4) for zero-JS gallery grid layout
- [Phase 02]: Lighthouse 96-97 accepted — gap is picsum.photos proxy latency under simulated 3G; production Sanity CDN will score higher
- [Phase 02]: isSanityAsset() checks cdn.sanity.io in URL (not image ID prefix) for reliable Sanity vs external URL detection
- [Phase 02]: PERF-03 Speed Insights 100/100 deferred to post-deployment — infrastructure confirmed ready, requires real user traffic on Vercel
- [Phase 03]: useActionState from react (not react-dom) for Server Action form binding — react-dom import is deprecated in React 19
- [Phase 03]: Honeypot returns fake success to avoid revealing detection to bots
- [Phase 03]: Auto-responder wrapped in separate try/catch — failure does not block critical notification to Emily
- [Phase 03]: Resend client initialized only when RESEND_API_KEY is set — graceful dev fallback with console logging
- [Phase 03]: Zod enum message syntax (not errorMap) for cleaner error configuration
- [Phase 03]: Service page scroll journey pattern: hero > scarcity > description > storyboard(optional) > pricing > FAQ > CTA
- [Phase 03]: Experience Storyboard is Senior-only (not Family) per CONT-01 requirement
- [Phase 03]: CMS tier lookup by name substring with nullish coalescing fallback to placeholder $400 pricing
- [Phase 03]: Investment page placeholder PricingCards fallback when CMS has no data -- Emily updates in Sanity Studio before launch
- [Phase 03]: Product packages teased on Investment page without prices -- framed as elevated personal reveal experience
- [Phase 03]: Style Guide written as genuine 601-line resource with 9 sections for both conversion and SEO value

### Pending Todos

None yet.

### Blockers/Concerns

- Emily needs DNS access to emilykathryn.com for Vercel domain config and Resend SPF/DKIM setup — confirm before Phase 1 begins
- City landing pages (Phase 5) require Emily's input on local landmarks/venues/stories per city — content workshop needed before Phase 5 planning
- Resend domain verification requires DNS changes — confirm Emily has access before Phase 3 inquiry form work begins
- Image upload guidelines for Emily (max dimensions, export settings from Lightroom) must be documented before Sanity Studio handoff

## Session Continuity

Last session: 2026-02-22
Stopped at: Completed 03-03-PLAN.md (Secondary Core Pages)
Resume file: .planning/phases/03-core-pages-and-conversion/03-03-SUMMARY.md
