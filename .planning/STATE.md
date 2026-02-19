# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** When a parent or senior in South-Central Virginia searches for portrait photography, Emily Kathryn Photography appears first — and the site converts that visitor into an inquiry within one session.
**Current focus:** Phase 2 — Shared Components and Galleries

## Current Position

Phase: 2 of 6 (Shared Components and Galleries) -- Context gathered
Plan: 0 of 3 in current phase
Status: Context gathered, ready for planning
Last activity: 2026-02-19 — Phase 2 context gathered

Progress: [██████░░░░░░░░░░░░░░] 16%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 4.5 min
- Total execution time: 0.15 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 9 min | 4.5 min |

**Recent Trend:**
- Last 5 plans: 01-02 (4min), 01-03 (5min)
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

### Pending Todos

None yet.

### Blockers/Concerns

- Emily needs DNS access to emilykathryn.com for Vercel domain config and Resend SPF/DKIM setup — confirm before Phase 1 begins
- City landing pages (Phase 5) require Emily's input on local landmarks/venues/stories per city — content workshop needed before Phase 5 planning
- Resend domain verification requires DNS changes — confirm Emily has access before Phase 3 inquiry form work begins
- Image upload guidelines for Emily (max dimensions, export settings from Lightroom) must be documented before Sanity Studio handoff

## Session Continuity

Last session: 2026-02-19
Stopped at: Phase 2 context gathered
Resume file: .planning/phases/02-shared-components-and-galleries/02-CONTEXT.md
