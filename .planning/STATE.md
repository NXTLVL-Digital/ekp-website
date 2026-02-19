# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** When a parent or senior in South-Central Virginia searches for portrait photography, Emily Kathryn Photography appears first — and the site converts that visitor into an inquiry within one session.
**Current focus:** Phase 2 — Shared Components and Galleries

## Current Position

Phase: 2 of 6 (Shared Components and Galleries) -- Executing
Plan: 1 of 3 in current phase
Status: Executing plans
Last activity: 2026-02-19 — Completed 02-02-PLAN.md

Progress: [████████░░░░░░░░░░░░] 22%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 4.2 min
- Total execution time: 0.21 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 9 min | 4.5 min |
| 02-shared-components-and-galleries | 1 | 3.5 min | 3.5 min |

**Recent Trend:**
- Last 5 plans: 01-02 (4min), 01-03 (5min), 02-02 (3.5min)
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

### Pending Todos

None yet.

### Blockers/Concerns

- Emily needs DNS access to emilykathryn.com for Vercel domain config and Resend SPF/DKIM setup — confirm before Phase 1 begins
- City landing pages (Phase 5) require Emily's input on local landmarks/venues/stories per city — content workshop needed before Phase 5 planning
- Resend domain verification requires DNS changes — confirm Emily has access before Phase 3 inquiry form work begins
- Image upload guidelines for Emily (max dimensions, export settings from Lightroom) must be documented before Sanity Studio handoff

## Session Continuity

Last session: 2026-02-19
Stopped at: Completed 02-02-PLAN.md
Resume file: .planning/phases/02-shared-components-and-galleries/02-02-SUMMARY.md
