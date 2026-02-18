---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [navigation, footer, nap, seo, siteconfig, mobile-menu, accessibility, vercel-domain]

# Dependency graph
requires:
  - phase: 01-foundation-01
    provides: "Scaffolded Next.js project with route groups, Tailwind v4 brand theme, editorial fonts"
  - phase: 01-foundation-02
    provides: "SanityImage component, sanityFetch wrapper, live.ts for visual editing"
provides:
  - "siteConfig.ts canonical NAP+W single source of truth for all business info"
  - "Header server component with scroll-aware sticky behavior on desktop and mobile"
  - "HeaderClient with hide-on-scroll-down / reveal-on-scroll-up pattern"
  - "MobileNav full-screen overlay with focus trap, ESC close, body scroll lock"
  - "Footer with NAP, 3 social links, 7 secondary nav links, tagline, CTA, copyright"
  - "Site layout integration with Header, Footer, and main content area"
  - "emilykathryn.com domain registered on Vercel project"
affects: [02-shared-components, 03-core-pages, 04-seo, 05-city-pages, 06-launch]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server/Client component split for navigation: Header (server) passes siteConfig data to HeaderClient (client)"
    - "Scroll-aware sticky nav using passive scroll listener with translateY transform"
    - "Full-screen mobile overlay with focus trap, ESC key handling, and body scroll lock"
    - "All NAP data sourced from siteConfig.ts -- zero hardcoded business strings in components"
    - "44x44px minimum tap targets enforced on all interactive elements via min-h-11 min-w-11"

key-files:
  created:
    - src/lib/siteConfig.ts
    - src/components/layout/Header.tsx
    - src/components/layout/HeaderClient.tsx
    - src/components/layout/MobileNav.tsx
    - src/components/layout/Footer.tsx
  modified:
    - src/app/(site)/layout.tsx

key-decisions:
  - "SanityLive deferred: commented out in site layout because defineLive throws when NEXT_PUBLIC_SANITY_PROJECT_ID is empty -- will uncomment when Sanity project is configured"
  - "Dark footer (bg-foreground text-white) chosen for visual separation and page anchoring per plan recommendation"
  - "Footer CTA uses text link style (not gold button) to avoid competing with persistent nav CTA"
  - "Header uses Server/Client component split to keep siteConfig on server and minimize client JS bundle"

patterns-established:
  - "All business info (name, phone, address, email, social URLs, nav items) imported from siteConfig.ts"
  - "Navigation array in siteConfig drives both Header and Footer nav links"
  - "Header hides on scroll-down, reveals on scroll-up (scroll delta detection)"
  - "MobileNav overlay pattern: fixed inset-0 with focus trap and body scroll lock"
  - "Studio layout remains isolated -- never imports site Header or Footer"

requirements-completed: [FOUND-06, FOUND-07, SEO-07]

# Metrics
duration: 5min
completed: 2026-02-18
---

# Phase 01 Plan 03: NAP Config + Layout Summary

**Scroll-aware sticky Header, full-screen MobileNav overlay, rich Footer with NAP/socials/secondary nav, all driven by siteConfig.ts single source of truth, and emilykathryn.com domain added to Vercel**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-18T18:48:00Z
- **Completed:** 2026-02-18T18:58:00Z
- **Tasks:** 3
- **Files created:** 5
- **Files modified:** 1

## Accomplishments
- siteConfig.ts established as the canonical single source of truth for all NAP+W data (name, address, phone, website, email, social URLs, navigation, CTA) -- every component imports from this file, zero hardcoded business strings
- Scroll-aware sticky Header that hides on scroll-down and reveals on scroll-up, with all 7 nav links and gold CTA button visible on desktop, hamburger menu on mobile
- Full-screen MobileNav overlay with focus trap, ESC key close, body scroll lock, and all interactive elements meeting 44x44px minimum tap targets
- Rich Footer with brand column (name, tagline, social links), navigation column (mirrors Header), contact column (full address, phone, email), CTA section, and dynamic copyright year
- Site layout updated with real Header and Footer components replacing the previous stubs
- emilykathryn.com domain registered on Vercel project (DNS: A record to 76.76.21.21 pending Emily's DNS credentials)

## Task Commits

Each task was committed atomically:

1. **Task 1: NAP+W siteConfig, Header with scroll-aware sticky nav, and MobileNav overlay** - `793860f` (feat)
2. **Task 2: Rich Footer with NAP, socials, secondary nav, site layout integration, and Vercel domain setup** - `07cabe7` (feat)
3. **Task 3: Verify nav, footer, mobile menu, NAP consistency, and domain status** - checkpoint:human-verify (user approved, no file changes)

## Files Created/Modified
- `src/lib/siteConfig.ts` - Canonical NAP+W single source of truth: business name, address, phone, email, social URLs, navigation array, CTA config
- `src/components/layout/Header.tsx` - Server Component wrapper that imports siteConfig and passes navigation data to HeaderClient
- `src/components/layout/HeaderClient.tsx` - Client Component with scroll-aware hide/show behavior, desktop nav with 7 links + gold CTA, hamburger trigger for mobile
- `src/components/layout/MobileNav.tsx` - Full-screen overlay mobile menu with focus trap, ESC close, body scroll lock, all nav links + CTA
- `src/components/layout/Footer.tsx` - Rich footer with brand/social column, navigation column, contact/NAP column, CTA section, and dynamic copyright
- `src/app/(site)/layout.tsx` - Updated site layout integrating real Header and Footer components (SanityLive commented out pending Sanity config)

## Decisions Made
- **SanityLive deferred:** Commented out in site layout because `defineLive` throws when `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty. Will be uncommented when the Sanity project is configured with real credentials. This is a non-blocking deferral.
- **Dark footer chosen:** Used `bg-foreground text-white` for the footer to create strong visual separation and anchor the page, following the plan's editorial aesthetic recommendation.
- **Footer CTA as text link:** The "Get in Touch" CTA in the footer uses a text link style rather than a solid gold button, to avoid competing with the persistent gold CTA in the Header navigation.
- **Server/Client split for Header:** Header.tsx (server) imports siteConfig and passes only the needed props to HeaderClient.tsx (client), minimizing the client-side JS bundle by keeping siteConfig on the server.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] SanityLive commented out in site layout**
- **Found during:** Task 2 (site layout integration)
- **Issue:** `defineLive` from `@sanity/client` throws a runtime error when `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty/missing. The Sanity project has not been configured yet.
- **Fix:** Commented out `<SanityLive />` in the site layout with a TODO comment explaining when to uncomment. The import is also commented out.
- **Files modified:** src/app/(site)/layout.tsx
- **Verification:** `npm run build` passes without errors
- **Committed in:** 07cabe7 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking dependency)
**Impact on plan:** SanityLive is visual-editing sugar, not required for production ISR. Will be enabled when Sanity project credentials are configured. No scope creep.

## Issues Encountered
- **DNS propagation pending:** The `vercel domains add emilykathryn.com` command registered the domain on the Vercel project, but full DNS cutover requires Emily to update her domain's DNS records. The required DNS configuration is: A record pointing to `76.76.21.21`. Emily needs access to her domain registrar (likely WordPress/GoDaddy DNS) to make this change. The site remains accessible at the `.vercel.app` URL in the meantime.

## User Setup Required
**DNS configuration required for custom domain.** Emily (or whoever manages DNS for emilykathryn.com) needs to:
1. Log in to the domain registrar managing emilykathryn.com DNS
2. Add or update the A record: `@` (or root) pointing to `76.76.21.21`
3. Optionally add CNAME: `www` pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (typically 15 minutes to 48 hours)
5. Verify by visiting https://emilykathryn.com -- it should serve the Next.js site

## Next Phase Readiness
- Foundation phase is COMPLETE: all 3 plans executed
- siteConfig.ts, Header, Footer, and MobileNav are ready for use across all pages
- Navigation array in siteConfig can be extended as new pages are built in Phase 2+
- SanityImage component (from Plan 02) ready for gallery and page content
- sanityFetch wrapper (from Plan 02) ready for all CMS data fetching
- Phase 2 (Shared Components and Galleries) can begin immediately

## Self-Check: PASSED

All 6 files verified on disk. Both commit hashes (793860f, 07cabe7) verified in git log.

---
*Phase: 01-foundation*
*Completed: 2026-02-18*
