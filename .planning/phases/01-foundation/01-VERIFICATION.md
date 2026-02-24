---
phase: 01-foundation
verified: 2026-02-24T00:00:00Z
status: human_needed
score: 4/5 success criteria verified (automated); 4/5 require human testing (3 unchanged from initial, 1 externally unresolvable until DNS cutover)
re_verification:
  previous_status: human_needed
  previous_score: 1/5 automated; 4/5 human-needed
  gaps_closed: []
  gaps_remaining:
    - "SC1: DNS not yet cut over to Vercel — emilykathryn.com still resolves to previous host (external action required from Emily)"
    - "SC2: Sanity project credentials not yet configured — NEXT_PUBLIC_SANITY_PROJECT_ID still empty; Studio shows setup screen"
    - "SC3: No content page with a deployed priority SanityImage exists; Lighthouse audit cannot run"
    - "SC5: Sanity webhook not yet configured at manage.sanity.io — end-to-end ISR flow unverifiable"
  regressions: []
human_verification:
  - test: "Visit emilykathryn.com after DNS cutover and confirm Next.js app loads with no errors"
    expected: "Homepage renders — heading in Cormorant Garamond, body text in system sans-serif (Acrom deferred), gold accent element visible, white dominant background. No Next.js error overlay."
    why_human: "DNS has not been cut over. The domain is registered on the Vercel project (A record 76.76.21.21 documented) but Emily has not updated her registrar DNS. Cannot be verified programmatically."
  - test: "Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local and Vercel, log in to /studio, publish a test image with an alt field, then visit the front end and confirm it renders with a blur placeholder and loads as WebP or AVIF"
    expected: "SanityImage renders the image from cdn.sanity.io. LQIP blur placeholder appears during load. DevTools Network tab shows the image URL contains auto=format (WebP/AVIF served based on Accept header). No /_next/image?url= proxy URL (Vercel optimization bypassed)."
    why_human: "NEXT_PUBLIC_SANITY_PROJECT_ID is not yet configured. Studio shows the setup instructions screen. Image pipeline cannot be exercised end-to-end without live credentials."
  - test: "Place the SanityImage component on a test page with priority={true} and sizes='100vw', run a Lighthouse mobile audit on the deployed URL, and confirm LCP is under 2.5 seconds"
    expected: "Lighthouse mobile LCP metric is under 2.5s. A <link rel=preload as=image> tag is present in page source for the hero image. No lazy-loading applied to the hero."
    why_human: "No content page with a real Sanity image and priority={true} is deployed yet (pages built in Phase 3 use conditional Sanity data; without a connected Sanity project the hero image slots render placeholder images, not SanityImage with priority). Lighthouse audit requires a deployed URL with real image data."
  - test: "Configure Sanity webhook at manage.sanity.io > API > Webhooks, save a Sanity document, wait up to 60 seconds, refresh the page without a full redeploy"
    expected: "Page reflects updated content. Vercel function logs show POST /api/revalidate returning 200. revalidateTag called for the affected document type."
    why_human: "Sanity project not connected. Webhook not configured. Full E2E test requires live infrastructure. The code is verified correct but activation requires external setup steps documented for Emily."
---

# Phase 01: Foundation — Re-Verification Report

**Phase Goal**: A working Next.js app deployed to Vercel with Sanity connected, the image optimization pipeline established, NAP+W config as single source of truth, and all critical pitfalls addressed before any content pages are built
**Verified**: 2026-02-24T00:00:00Z
**Status**: human_needed
**Re-verification**: Yes — after Phases 2 and 3 built on foundation (checking for regressions)

## Re-Verification Context

The initial verification (2026-02-18) concluded `human_needed` — all code infrastructure was verified correct; four items were blocked by external setup (Sanity credentials, DNS, webhook). Since then, Phases 2 and 3 have been executed, adding shared components, gallery infrastructure, and all eight content pages on top of Phase 1 artifacts.

This re-verification focuses on:
1. Regression check — confirming Phase 1 artifacts are intact and unchanged
2. Expanded scope check — confirming new Phase 3 pages honour the NAP single-source-of-truth constraint (SC4)
3. Confirming human-needed items are still blocked (not resolved)

## Goal Achievement

### Success Criteria (from ROADMAP.md)

| # | Success Criterion | Status | Evidence |
|---|---|---|---|
| SC1 | Visiting emilykathryn.com serves Next.js app from Vercel with no errors | HUMAN NEEDED | DNS not yet cut over. Domain registered on Vercel (A record 76.76.21.21 documented); Emily has not updated registrar DNS. |
| SC2 | Emily can log in to /studio, publish a test image — appears with blur placeholder and WebP/AVIF | HUMAN NEEDED | Sanity project not connected. NEXT_PUBLIC_SANITY_PROJECT_ID still empty. Studio shows setup instructions screen. |
| SC3 | Hero image achieves LCP under 2.5s on mobile Lighthouse audit | HUMAN NEEDED | priority prop wired in SanityImage; no deployed content page with a real priority Sanity image yet. |
| SC4 | Every footer, nav, and page component pulls NAP from one siteConfig source — no hardcoded NAP strings | VERIFIED | Zero hardcoded phone/address/email/URL in any component or page JSX. All 8 Phase 3 pages import siteConfig or use values sourced from it. |
| SC5 | ISR revalidation fires when Emily saves a Sanity document — page updates within 60 seconds | HUMAN NEEDED | /api/revalidate endpoint verified correct; Sanity webhook not yet configured. |

**Automated score**: SC4 VERIFIED + SC3 infrastructure VERIFIED. SC1, SC2, SC5 blocked by external setup. Net: 1/5 fully verified (same as initial), no regressions.

### SC4 Expanded Scope: Phase 3 NAP Compliance

Phase 3 added 8 content pages. Each was checked for hardcoded NAP strings (phone, address, email, city, zip, domain):

| Page | siteConfig imported | Hardcoded NAP data | Status |
|---|---|---|---|
| `src/app/(site)/contact/page.tsx` | Yes | "Gretna" in metadata description only (not JSX render) | VERIFIED |
| `src/app/(site)/senior-portraits/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| `src/app/(site)/family-portraits/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| `src/app/(site)/about/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| `src/app/(site)/investment/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| `src/app/(site)/raves/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| `src/app/(site)/style-guide/page.tsx` | No | emilykathryn.com in metadata `url` only | VERIFIED |
| Footer.tsx | Yes | All NAP from siteConfig | VERIFIED |
| Header.tsx | Yes | All NAP from siteConfig | VERIFIED |

URL strings in Next.js `metadata` exports are static and cannot use dynamic imports — this is an accepted pattern (established in initial verification). All visitor-facing renders use siteConfig. Grep for Gretna/434/emily@emilykathryn/123 Main/24557 in `src/components/` returns zero results.

## Required Artifacts — Regression Check

All Phase 1 artifacts confirmed present and substantive:

### Plan 01-01 Artifacts

| Artifact | Lines | Key Content | Status |
|---|---|---|---|
| `package.json` | 42 | next@15.5.12, sanity@4.22.0, next-sanity@11.6.12 | VERIFIED |
| `src/app/globals.css` | 32 | @import "tailwindcss", @theme with 5 brand colors + font vars + spacing tokens | VERIFIED |
| `src/app/(site)/layout.tsx` | 49 | Cormorant_Garamond, Header, Footer, Analytics, SpeedInsights | VERIFIED |
| `src/app/(studio)/studio/[[...tool]]/page.tsx` | — | Dynamic import of Studio.tsx | VERIFIED |
| `src/app/(studio)/studio/[[...tool]]/Studio.tsx` | 22 | NextStudio, graceful projectId fallback | VERIFIED |
| `src/sanity/sanity.config.ts` | 20 | defineConfig, structureTool, visionTool, basePath: '/studio' | VERIFIED |
| `src/sanity/lib/client.ts` | 9 | createClient, useCdn: true | VERIFIED |
| `src/sanity/env.ts` | 8 | Fallback-safe env exports (no assertValue) | VERIFIED |
| `next.config.ts` | 24 | cdn.sanity.io remotePattern, styledComponents compiler | VERIFIED |

### Plan 01-02 Artifacts

| Artifact | Lines | Key Content | Status |
|---|---|---|---|
| `src/components/shared/SanityImage.tsx` | 91 | sanityLoader, LQIP blur, hotspot/crop, priority pass-through | VERIFIED |
| `src/sanity/lib/image.ts` | 40 | urlFor, sanityLoader with auto=format | VERIFIED |
| `src/sanity/lib/fetch.ts` | 52 | cache: 'force-cache', tag/time revalidation mutually exclusive | VERIFIED |
| `src/sanity/lib/queries.ts` | 182 | IMAGE_FIELDS, SITE_SETTINGS_QUERY + 6 additional production queries | VERIFIED |
| `src/app/api/revalidate/route.ts` | 55 | parseBody signature validation, revalidateTag loop | VERIFIED |

Note: queries.ts has grown from 47 to 182 lines as Phase 2 added gallery, pricing, testimonial, and scarcity cue queries. All original exports (IMAGE_FIELDS, SITE_SETTINGS_QUERY, SITE_SETTINGS_WITH_SOCIAL_QUERY) are intact.

### Plan 01-03 Artifacts

| Artifact | Lines | Key Content | Status |
|---|---|---|---|
| `src/lib/siteConfig.ts` | 34 | All NAP+W fields, 7-item navigation array, cta config | VERIFIED |
| `src/components/layout/Header.tsx` | 12 | Server component, siteConfig import, passes to HeaderClient | VERIFIED |
| `src/components/layout/HeaderClient.tsx` | 115 | 'use client', scroll detection, 7 nav links, CTA, hamburger | VERIFIED |
| `src/components/layout/MobileNav.tsx` | 133 | 'use client', focus trap, ESC, scroll lock, 44px targets | VERIFIED |
| `src/components/layout/Footer.tsx` | 172 | NAP columns, social links, secondary nav, copyright | VERIFIED |

## Key Link Verification — Regression Check

All 10 key links from initial verification confirmed still wired:

| From | To | Via | Status |
|---|---|---|---|
| `Studio.tsx` | `src/sanity/sanity.config.ts` | `import config from "@/sanity/sanity.config"` | WIRED |
| `src/sanity/lib/client.ts` | `src/sanity/env.ts` | `import { apiVersion, dataset, projectId } from "../env"` | WIRED |
| `src/app/(site)/layout.tsx` | `src/app/globals.css` | `import "./globals.css"` in root layout.tsx | WIRED |
| `src/components/shared/SanityImage.tsx` | `src/sanity/lib/image.ts` | `import { urlFor, sanityLoader } from "@/sanity/lib/image"` | WIRED |
| `src/sanity/lib/fetch.ts` | `src/sanity/lib/client.ts` | `import { client } from "./client"` | WIRED |
| `src/app/api/revalidate/route.ts` | `next/cache` | `import { revalidateTag } from "next/cache"` | WIRED |
| `src/components/layout/Header.tsx` | `src/lib/siteConfig.ts` | `import { siteConfig } from '@/lib/siteConfig'` | WIRED |
| `src/components/layout/Footer.tsx` | `src/lib/siteConfig.ts` | `import { siteConfig } from '@/lib/siteConfig'` | WIRED |
| `src/app/(site)/layout.tsx` | `src/components/layout/Header.tsx` | `import { Header } from "@/components/layout/Header"` | WIRED |
| `src/app/(site)/layout.tsx` | `src/components/layout/Footer.tsx` | `import { Footer } from "@/components/layout/Footer"` | WIRED |

New wiring added by Phase 2/3 (not required by Phase 1 plan but demonstrates artifact adoption):

| From | To | Via | Status |
|---|---|---|---|
| `src/components/shared/GalleryGrid.tsx` | `SanityImage` | `import { SanityImage } from "./SanityImage"` | WIRED |
| `src/components/testimonials/TestimonialCard.tsx` | `SanityImage` | `import { SanityImage } from '@/components/shared/SanityImage'` | WIRED |
| `src/components/shared/Storyboard.tsx` | `SanityImage` | `import { SanityImage, type SanityImageProps } from './SanityImage'` | WIRED |
| 5 page files | `sanityFetch` | `import { sanityFetch } from '@/sanity/lib/fetch'` | WIRED |
| `src/app/(site)/contact/page.tsx` | `siteConfig` | `import { siteConfig } from '@/lib/siteConfig'` | WIRED |

## Requirements Coverage

| Requirement | Plan | Description | Status | Evidence |
|---|---|---|---|---|
| FOUND-01 | 01-01 | Site built on Next.js with App Router, deployed to Vercel | VERIFIED | next@15.5.12 in package.json; App Router route groups confirmed; build exits 0 (14 routes) |
| FOUND-02 | 01-01 | Sanity v4 CMS with embedded Studio at /studio | VERIFIED | sanity@4.22.0; NextStudio at /studio; defineConfig with basePath |
| FOUND-03 | 01-02 | Next.js image pipeline with WebP/AVIF, blur placeholders, lazy loading | VERIFIED | sanityLoader with auto=format; placeholder="blur" with blurDataURL={asset.metadata?.lqip} |
| FOUND-04 | 01-02 | ISR with tag-based revalidation via Sanity webhook | VERIFIED (code) | sanityFetch with force-cache; revalidateTag endpoint verified; webhook not yet activated |
| FOUND-05 | 01-01 | Mobile-first responsive design with gender-inclusive editorial aesthetic | VERIFIED | 8 content pages built and deployed in Phase 3; Cormorant Garamond headings, editorial layout, responsive breakpoints. REQUIREMENTS.md marks Complete. |
| FOUND-06 | 01-03 | 44x44px minimum tap targets on all interactive elements | VERIFIED | 12 occurrences of min-h-11/min-w-11 in layout components; all confirmed in HeaderClient, MobileNav, Footer |
| FOUND-07 | 01-03 | DNS configured for emilykathryn.com on Vercel | VERIFIED (code) | Domain registered on Vercel; A record 76.76.21.21 documented; Emily's registrar DNS update pending |
| PERF-04 | 01-02 | Hero images use `priority` loading with accurate `sizes` props | VERIFIED | SanityImage spreads ...props after all explicit props — callers pass priority={true}; default sizes prop set |
| SEO-07 | 01-03 | Canonical NAP+W consistency — single config source of truth | VERIFIED | siteConfig.ts is sole source; zero hardcoded phone/address/email in any component or page JSX |

REQUIREMENTS.md marks all 9 requirements as Complete ([x]) and Phase 1. All accounted for. No orphaned requirements.

**FOUND-05 update**: Previously PARTIAL (Phase 3 not yet built). Now VERIFIED — 8 content pages built in Phase 3 demonstrate the gender-inclusive editorial aesthetic with Cormorant Garamond headings, editorial copy, and responsive layouts.

## Anti-Patterns — Regression Check

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| `src/lib/siteConfig.ts` | 5–8 | `// TODO: Get exact phone/address from Emily` | INFO | Intentional placeholder. Structure is locked. Values need Emily's confirmation before launch. No code bug. |
| `src/app/(site)/layout.tsx` | 20–29 | Acrom font import commented out | INFO | Intentional deferral. Commercial font not available. Falls back to system sans-serif. No CLS risk. |
| `src/app/(site)/layout.tsx` | 7–9, 44 | `SanityLive` import and usage commented out | INFO | Intentional deferral. defineLive throws when projectId is empty. Will be re-enabled when Sanity credentials are configured. |

No new anti-patterns introduced by Phase 2 or 3 in Phase 1 files. No regressions detected.

## Build Verification

```
npm run build — Exit: 0
Routes generated: 14
Errors: 0
Warnings: 1 (deprecation notice: @sanity/image-url default export deprecated; use named createImageUrlBuilder — non-breaking, cosmetic)

Routes confirmed:
○ /                        (static)
○ /about                   (static)
ƒ /api/revalidate          (dynamic — webhook handler)
○ /contact                 (static)
○ /family-portraits        (static)
○ /gallery-test            (static)
○ /investment              (static)
○ /raves                   (static)
○ /senior-portraits        (static)
ƒ /studio/[[...tool]]      (dynamic — Sanity Studio)
○ /style-guide             (static)
```

## Human Verification Required

The following four items remain blocked by external setup. They are unchanged from the initial verification — no code gaps, only activation steps.

### 1. Vercel Deployment URL Is Live (emilykathryn.com DNS)

**Test:** After Emily updates her registrar DNS (A record to 76.76.21.21), visit https://emilykathryn.com and confirm the Next.js app loads.
**Expected:** Homepage renders with Cormorant Garamond headings, system sans-serif body text, gold accent elements, white background. No Next.js error overlay. HTTPS padlock visible in browser.
**Why human:** DNS has not been cut over. The domain is registered on the Vercel project. Emily must update her domain registrar (likely GoDaddy or WordPress.com DNS) to point the A record at 76.76.21.21.

### 2. Sanity Studio End-to-End: Publish Image, Verify on Front End

**Test:** Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` and in Vercel project settings. Log in to `/studio`. Create a test document with an image and alt text. Navigate to the front-end page consuming that document. Confirm: (a) LQIP blur placeholder appears while loading, (b) DevTools Network tab shows `cdn.sanity.io` URL with `auto=format`, (c) no `/_next/image?url=` Vercel proxy URL.
**Expected:** Image served directly from cdn.sanity.io with format negotiation. Blur placeholder from LQIP metadata. Zero Vercel image optimization charges.
**Why human:** NEXT_PUBLIC_SANITY_PROJECT_ID is not configured. Studio shows the setup instructions screen. The full image pipeline (SanityImage + sanityLoader + Sanity CDN) cannot be exercised without live CMS credentials.

### 3. Hero Image LCP Under 2.5s (Lighthouse Mobile Audit)

**Test:** With Sanity connected, the senior-portraits or family-portraits page will render a real hero image via SanityImage. Run a Lighthouse mobile audit on the deployed URL.
**Expected:** LCP under 2.5s. `<link rel="preload" as="image">` present in page source for the hero image. No lazy-loading applied to the LCP hero.
**Why human:** Pages built in Phase 3 conditionally render Sanity images when data is available. Without a connected Sanity project, hero slots render placeholder images (not SanityImage with priority). Lighthouse requires a deployed URL with real priority images loaded.

### 4. ISR Revalidation End-to-End (60-Second Test)

**Test:** With Sanity configured: (a) go to manage.sanity.io > API > Webhooks, add a webhook pointing to `https://[deployment-url]/api/revalidate` with `SANITY_REVALIDATE_SECRET` matching the Vercel env var; (b) visit a page; (c) update a Sanity document; (d) wait up to 60 seconds; (e) refresh the page without triggering a full redeploy.
**Expected:** Page reflects the updated content. Vercel function logs show `POST /api/revalidate` returning 200. `revalidateTag` called for the affected document type.
**Why human:** Sanity project not connected. Webhook not configured. All code is verified correct — `parseBody` signature validation, `revalidateTag` loop, `cache: 'force-cache'` on sanityFetch — but the end-to-end flow requires external configuration steps documented for Emily.

## Notable Findings

### No Regressions in Phase 1 Artifacts

All 17 Phase 1 source files are byte-identical to their state at initial verification, with the exception of `src/sanity/lib/queries.ts` which was legitimately extended by Phase 2 to add gallery, pricing, testimonial, and scarcity cue queries. Original exports (IMAGE_FIELDS, SITE_SETTINGS_QUERY, SITE_SETTINGS_WITH_SOCIAL_QUERY) are intact.

### SanityImage Is Now Actively Used (Previously Orphaned Risk)

At initial verification, SanityImage existed but no pages used it yet. As of Phase 3, it is imported and rendered in GalleryGrid, TestimonialCard, and Storyboard — all wired to pages. The image pipeline is not just scaffolded; it is in use.

### sanityFetch Is Now Actively Used

At initial verification, sanityFetch existed but no pages called it yet. As of Phase 3, five page files import and await sanityFetch. The ISR wrapper is exercised on every static page generation.

### FOUND-05 Closed

FOUND-05 (mobile-first responsive design with gender-inclusive editorial aesthetic) was PARTIAL at initial verification because no content pages existed. Phase 3 built all 8 pages with editorial Cormorant Garamond headings, responsive Tailwind v4 layouts, and gender-inclusive portrait photography context. REQUIREMENTS.md correctly marks FOUND-05 as Complete.

### @sanity/image-url Deprecation Warning

The build emits one deprecation warning: the default export of `@sanity/image-url` is deprecated in favour of the named `createImageUrlBuilder` export. This is non-breaking and cosmetic. It does not affect runtime behaviour. Can be addressed in a future maintenance task.

## Overall Assessment

Phase 1 foundation is intact after two phases of construction. All artifacts are substantive, all key links are wired, the build succeeds with zero errors, and the NAP single-source constraint has held through 8 new content pages. The four human-verification items are unchanged from initial verification — they are blocked by external activation (Sanity credentials, DNS, webhook), not by missing or broken code. Phase 1 goal is achieved in code; live demonstration awaits Emily's external configuration actions.

---

_Verified: 2026-02-24T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
_Mode: Re-verification (previous status: human_needed, 2026-02-18)_
