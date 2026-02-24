---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, sanity, tailwind-v4, vercel, typescript, cormorant-garamond, route-groups, studio]

# Dependency graph
requires: []
provides:
  - "Next.js 15.5 project scaffolding with App Router and TypeScript"
  - "Tailwind v4 brand theme with @theme tokens (gold, rose, sage, spacing, fonts)"
  - "Cormorant Garamond heading font + Acrom-ready body font config via next/font"
  - "Route group separation: (site) for public pages, (studio) for Sanity Studio"
  - "Embedded Sanity Studio at /studio with NextStudio and graceful missing-ID fallback"
  - "Sanity client, env config, siteSettings schema, live.ts for visual editing"
  - "Vercel deployment with vercel.json config"
  - ".env.local and .env.example for environment variable management"
affects: [01-foundation-02, 01-foundation-03, 02-shared-components, 03-core-pages, 04-seo, 05-city-pages]

# Tech tracking
tech-stack:
  added:
    - "next@15.5.12"
    - "react@19.1.0"
    - "sanity@4.22.0"
    - "next-sanity@11.6.12"
    - "tailwindcss@4"
    - "@tailwindcss/postcss@4"
    - "@vercel/analytics"
    - "@vercel/speed-insights"
    - "schema-dts"
    - "styled-components"
    - "@sanity/client"
    - "@sanity/image-url"
    - "@sanity/vision"
  patterns:
    - "Route group separation: (site) vs (studio) prevents Studio from inheriting site layout"
    - "Tailwind v4 @theme block for brand design tokens"
    - "next/font/google for Cormorant Garamond heading font with CSS variable injection"
    - "Acrom localFont config scaffolded but commented until .woff2 files are provided"
    - "assertValue-free env.ts — uses fallback defaults instead of throwing at import time"
    - "Graceful Sanity Studio fallback when projectId is empty"

key-files:
  created:
    - package.json
    - next.config.ts
    - tsconfig.json
    - postcss.config.mjs
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/(site)/layout.tsx
    - src/app/(site)/page.tsx
    - src/app/(site)/not-found.tsx
    - src/app/(studio)/layout.tsx
    - src/app/(studio)/studio/[[...tool]]/page.tsx
    - src/app/(studio)/studio/[[...tool]]/Studio.tsx
    - src/sanity/env.ts
    - src/sanity/lib/client.ts
    - src/sanity/lib/live.ts
    - src/sanity/sanity.config.ts
    - src/sanity/schemas/index.ts
    - src/sanity/schemas/siteSettings.ts
    - .env.example
    - .gitignore
    - vercel.json
    - src/fonts/README.md
  modified: []

key-decisions:
  - "env.ts uses fallback defaults (empty string for projectId, 'production' for dataset) instead of assertValue pattern -- prevents build crashes when env vars are not yet configured"
  - "Studio.tsx checks projectId at runtime and shows setup instructions instead of crashing when Sanity project is not yet created"
  - "basePath: '/studio' added to sanity.config.ts so NextStudio correctly handles /studio URL routing"
  - "SanityLive commented out in site layout because defineLive throws when projectId is empty -- to be uncommented after Sanity project configuration"
  - "Acrom font config scaffolded as commented localFont block -- ready to activate when .woff2 files are provided"

patterns-established:
  - "Route group pattern: (site) for public pages with Header/Footer, (studio) for Sanity Studio with minimal layout"
  - "Tailwind v4 @theme block as single source of brand design tokens"
  - "CSS variable font injection: --font-cormorant and --font-acrom used in @theme for font-heading and font-body"
  - "Root layout (app/layout.tsx) is minimal html/body shell; site-specific layout is in (site)/layout.tsx"

requirements-completed: [FOUND-01, FOUND-02, FOUND-05]

# Metrics
duration: 20min
completed: 2026-02-18
---

# Phase 01 Plan 01: Project Scaffolding Summary

**Next.js 15.5 + Sanity v4 + Tailwind v4 scaffolding with Cormorant Garamond editorial font, route group separation for site vs Studio, siteSettings CMS schema, and Vercel deployment**

## Performance

- **Duration:** 20 min
- **Started:** 2026-02-18T16:40:28Z
- **Completed:** 2026-02-18T17:00:07Z
- **Tasks:** 2 auto tasks + 1 checkpoint (human-verify)
- **Files created:** 30

## Accomplishments
- Scaffolded full Next.js 15.5 project with TypeScript, App Router, and src directory structure
- Configured Tailwind v4 brand theme via @theme block with gold (#c2a36c), rose (#dcb6ad), sage (#b3d4cd), gray (#d6d4d4) accent colors plus core palette and spacing tokens
- Set up Cormorant Garamond as editorial heading font via next/font/google; Acrom body font scaffolded for later activation with commercial .woff2 files
- Established route group separation: (site) with Header/Footer/Analytics vs (studio) with minimal layout for Sanity Studio
- Integrated Sanity v4 with embedded Studio at /studio using NextStudio, plus client config, env vars, and siteSettings schema
- Deployed to Vercel with vercel.json configuration

## Task Commits

Each task was committed atomically:

1. **Task 1a: Scaffold Next.js project with Tailwind v4 brand theme, fonts, and route groups** - `48393d4` (feat)
2. **Task 1b: Add Sanity CMS, Studio route, environment config, and deploy to Vercel** - `dd7b8b0` (feat)

Post-execution fixes (part of plan 01-01 scope):
3. **Fix: Gracefully handle missing Sanity project ID in Studio** - `798af68` (fix)
4. **Fix: Add basePath to Sanity config for correct Studio URL routing** - `1022b12` (fix)

## Files Created/Modified
- `package.json` - Project dependencies: Next.js 15.5, React 19, Sanity v4, next-sanity, Tailwind v4, Vercel analytics
- `next.config.ts` - Remote image patterns for cdn.sanity.io, styledComponents compiler option
- `tsconfig.json` - TypeScript config with @/* path alias
- `postcss.config.mjs` - @tailwindcss/postcss plugin (Tailwind v4 requirement)
- `src/app/globals.css` - Tailwind v4 @theme block with brand colors, core palette, typography, and spacing tokens
- `src/app/layout.tsx` - Minimal root layout (html/body shell shared by site and studio)
- `src/app/(site)/layout.tsx` - Site layout with Cormorant Garamond font, Header, Footer, Analytics, SpeedInsights
- `src/app/(site)/page.tsx` - Placeholder homepage with heading in font-heading, body in font-body, gold accent element
- `src/app/(site)/not-found.tsx` - Custom 404 page with link back to homepage
- `src/app/(studio)/layout.tsx` - Minimal studio layout (no site nav/footer)
- `src/app/(studio)/studio/[[...tool]]/page.tsx` - Dynamic catch-all route for Sanity Studio
- `src/app/(studio)/studio/[[...tool]]/Studio.tsx` - Client component with NextStudio and graceful missing-ID fallback
- `src/sanity/env.ts` - Environment variable exports with fallback defaults
- `src/sanity/lib/client.ts` - Sanity client initialization with CDN enabled
- `src/sanity/lib/live.ts` - defineLive export for visual editing (SanityLive deferred)
- `src/sanity/sanity.config.ts` - Sanity Studio config with structureTool, visionTool, basePath
- `src/sanity/schemas/index.ts` - Schema type registry exporting [siteSettings]
- `src/sanity/schemas/siteSettings.ts` - CMS schema: businessName, tagline, phone, email, address, socialLinks
- `.env.example` - Environment variable template (no secrets)
- `.gitignore` - Standard Next.js + .env.local exclusions
- `vercel.json` - Vercel deployment configuration
- `src/fonts/README.md` - Instructions for adding Acrom .woff2 font files

## Decisions Made
- **env.ts fallback pattern over assertValue:** Using empty string fallback for projectId instead of throwing prevents build crashes when Sanity project is not yet configured. This allows the app to build and deploy before env vars are set.
- **Runtime Studio fallback UI:** Studio.tsx checks projectId at runtime and shows clear setup instructions instead of crashing with an opaque error when Sanity is not connected.
- **basePath on Sanity config:** Added `basePath: "/studio"` to defineConfig so NextStudio correctly handles routing at the /studio URL path.
- **SanityLive deferred:** Commented out `<SanityLive />` in site layout because `defineLive` throws at module evaluation time when projectId is empty. Will be uncommented when Sanity project is configured.
- **Acrom font scaffolded but inactive:** The localFont config for Acrom is ready as a commented block. The CSS variable fallback chain (`var(--font-acrom), ui-sans-serif, system-ui, sans-serif`) ensures body text renders cleanly with system fonts until commercial Acrom .woff2 files are provided.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Graceful handling of missing Sanity project ID**
- **Found during:** Post-Task 1b verification
- **Issue:** Studio page would crash with an opaque error when NEXT_PUBLIC_SANITY_PROJECT_ID was empty (default state before Sanity project creation)
- **Fix:** Added runtime projectId check in Studio.tsx with clear setup instructions fallback UI; changed env.ts to use empty string default instead of assertValue
- **Files modified:** src/app/(studio)/studio/[[...tool]]/Studio.tsx, src/sanity/env.ts
- **Verification:** Build succeeds with empty projectId, /studio shows setup instructions
- **Committed in:** `798af68`

**2. [Rule 1 - Bug] Missing basePath in Sanity config**
- **Found during:** Post-deployment verification
- **Issue:** Sanity Studio at /studio had routing issues because the config did not declare its base path
- **Fix:** Added `basePath: "/studio"` to defineConfig in sanity.config.ts
- **Files modified:** src/sanity/sanity.config.ts
- **Verification:** Studio loads correctly at /studio URL
- **Committed in:** `1022b12`

---

**Total deviations:** 2 auto-fixed (2 bug fixes)
**Impact on plan:** Both fixes were necessary for correct Studio operation. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required

**External services require manual configuration.** The plan's frontmatter specifies:

**Sanity CMS:**
- Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` (from manage.sanity.io > Project > Settings)
- Set `NEXT_PUBLIC_SANITY_DATASET` (usually "production")
- Set `NEXT_PUBLIC_SANITY_API_VERSION` ("2025-03-04")
- Generate `SANITY_REVALIDATE_SECRET` with `openssl rand -hex 32`
- Add CORS origins at manage.sanity.io for localhost:3000 and Vercel URL

**Vercel:**
- Add same environment variables to Vercel project settings

## Next Phase Readiness
- Project builds and deploys successfully -- ready for Plan 01-02 (Image Pipeline)
- Route group structure in place for all future pages
- Tailwind v4 brand tokens available for all component styling
- Sanity client and schemas ready for content modeling expansion
- Font system ready -- Cormorant Garamond active, Acrom ready to activate

## Self-Check: PASSED

All key files verified on disk. All 4 commit hashes (48393d4, dd7b8b0, 798af68, 1022b12) verified in git log.

---
*Phase: 01-foundation*
*Completed: 2026-02-18*
