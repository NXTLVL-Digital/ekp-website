# Roadmap: Emily Kathryn Photography — Website Redesign

## Overview

A conversion-optimized photography website built on Next.js + Sanity + Vercel, delivered in six phases that follow a strict dependency order. The foundation phase establishes the image pipeline and canonical NAP config before a single page is built. Shared components are built once and reused across all pages. Core pages deliver the MVP launch candidate — a site that can replace emilykathryn.com and start generating inquiries. SEO infrastructure is then applied across all pages before the hyper-local city landing pages are built (city pages depend on a stable JSON-LD architecture and require significant unique content per city). External platform setup and launch polish close the project.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js + Sanity + Vercel scaffolding with image pipeline, ISR, NAP config, and pitfall prevention
- [ ] **Phase 2: Shared Components and Galleries** - Reusable gallery, lightbox, JSON-LD, and layout components with Core Web Vitals verification
- [ ] **Phase 3: Core Pages and Conversion** - All 8 core pages with inquiry funnel, email delivery, spam protection, and brand-voice copy — MVP launch candidate
- [ ] **Phase 4: SEO Infrastructure** - Site-wide JSON-LD schemas, XML sitemap, ISR webhook, and OG metadata
- [ ] **Phase 5: City Landing Pages** - 7 hyper-local city pages with unique content, AEO answer blocks, Google Maps, and city-specific JSON-LD
- [ ] **Phase 6: External Platforms and Launch Polish** - GBP setup guide, Apple Business Connect setup guide, and final cross-site verification

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js app deployed to Vercel with Sanity connected, the image optimization pipeline established, NAP+W config as single source of truth, and all critical pitfalls addressed before any content pages are built
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, PERF-04, SEO-07
**Success Criteria** (what must be TRUE):
  1. Visiting emilykathryn.com (after DNS cutover) serves a Next.js app from Vercel with no errors
  2. Emily can log in to /studio and publish a test image — it appears on the front end with a blur placeholder and loads as WebP/AVIF
  3. A hero image on any test page achieves LCP under 2.5s on mobile Lighthouse audit (priority prop + correct sizes prop in place)
  4. Every footer, nav, and page component pulls business name/phone/URL from one siteConfig source — no hardcoded NAP strings anywhere in the codebase
  5. ISR revalidation fires when Emily saves a Sanity document — page updates within 60 seconds without a full rebuild
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Project scaffolding: Next.js 15.5 + Sanity v4 + Tailwind v4 brand theme + editorial fonts + Studio route + Vercel deployment
- [ ] 01-02-PLAN.md — Image pipeline: SanityImage wrapper with custom CDN loader, LQIP blur placeholders, sanityFetch ISR wrapper, webhook revalidation endpoint
- [ ] 01-03-PLAN.md — NAP config + layout: siteConfig.ts single source of truth, scroll-aware Header, full-screen MobileNav, rich Footer, site layout integration

### Phase 2: Shared Components and Galleries
**Goal**: All reusable components — gallery grid, lightbox, JSON-LD patterns, pricing cards, storyboard, scarcity cue, answer block — built, tested with real CMS content, and meeting Core Web Vitals targets
**Depends on**: Phase 1
**Requirements**: GALL-01, GALL-02, GALL-03, GALL-04, PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. A gallery page with 20+ CMS images passes Lighthouse mobile with LCP under 2.5s and CLS under 0.1
  2. Clicking a gallery image opens a lightbox — user can navigate with arrow keys, swipe on mobile, see an image counter, and close with the Escape key
  3. Vercel Speed Insights reports 100/100 mobile performance score on a gallery test page
  4. All interactive gallery elements (lightbox open/close, nav arrows) have minimum 44x44px tap targets verified on device
**Plans**: TBD

Plans:
- [ ] 02-01: GalleryGrid and GalleryLightbox components — masonry/grid layout, Server/Client boundary, SanityImage integration
- [ ] 02-02: Shared layout components — Section, PricingCard, Storyboard, ScarcityCue, AnswerBlock, JsonLd with schema-dts
- [ ] 02-03: Core Web Vitals verification — Lighthouse mobile audit, CLS audit, tap target audit on gallery test page

### Phase 3: Core Pages and Conversion
**Goal**: Every core page is live with brand-voice copy, the inquiry funnel is functional end-to-end (form to Emily's inbox to auto-responder), and the site is ready to replace emilykathryn.com as the primary conversion surface
**Depends on**: Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, CONV-01, CONV-02, CONV-03, CONV-04, CONV-05, CONV-06, CONV-07, CONT-01, CONT-02, CONT-03, CONT-04, INFRA-01, INFRA-03, SEO-09
**Success Criteria** (what must be TRUE):
  1. A visitor landing on the homepage sees a gender-inclusive senior hero, portfolio preview, testimonials, and an active scarcity cue — with the "Inquire for Detailed Pricing" CTA visible in the sticky nav and within 2 scrolls on mobile
  2. Submitting the inquiry form delivers an email notification to Emily's inbox and an auto-responder arrives in the submitter's inbox within 15 minutes
  3. A bot submission attempt is blocked by honeypot or rate limiting — Emily's inbox does not receive the spam
  4. Emily can update testimonial copy, toggle scarcity cues on/off, and change a gallery image from Sanity Studio — changes appear on the live site within 60 seconds
  5. All 8 core pages exist, load without errors on mobile, display correct "Starting At" pricing, and carry the persistent CTA in the navigation
**Plans**: TBD

Plans:
- [ ] 03-01: Homepage — hero, portfolio preview grid, testimonials, scarcity cue, persistent CTA (PAGE-01, CONV-04, CONV-06, CONV-07)
- [ ] 03-02: Senior Portraits and Family Portraits service pages — galleries, Experience Storyboard, pricing, FAQ (PAGE-02, PAGE-03, CONV-05, CONT-01, CONT-02)
- [ ] 03-03: About, Contact, Investment/Pricing, Raves, Style Guide pages (PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08)
- [ ] 03-04: Inquiry form with Server Action, Resend email delivery, auto-responder, spam protection (CONV-01, CONV-02, CONV-03, INFRA-01, INFRA-03)
- [ ] 03-05: Brand-voice copy for all 8 pages, OG metadata per page (CONT-03, CONT-04 partial, SEO-09)

### Phase 4: SEO Infrastructure
**Goal**: Site-wide structured data is validated, every page type has correct JSON-LD, the XML sitemap covers all routes, and on-demand ISR revalidation is live — all in place before city pages are authored
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-08, INFRA-02
**Success Criteria** (what must be TRUE):
  1. Google Rich Results Test returns no errors for LocalBusiness, Service, FAQPage, and Review schema on their respective page types
  2. The XML sitemap at /sitemap.xml includes every published page URL and is submitted to Google Search Console
  3. Editing a Sanity document triggers the /api/revalidate webhook endpoint — the updated page is served from CDN cache within 60 seconds
  4. Every page type (homepage, service pages, about, contact) has distinct, valid JSON-LD that a validator confirms is error-free
**Plans**: TBD

Plans:
- [ ] 04-01: JSON-LD component implementations — LocalBusiness ProfessionalService, Service, FAQPage with Speakable, Review schema (SEO-01, SEO-02, SEO-03, SEO-04)
- [ ] 04-02: Sitemap, ISR webhook endpoint, Google Search Console setup, Rich Results Test validation (SEO-08, INFRA-02)

### Phase 5: City Landing Pages
**Goal**: All 7 city landing pages are live with genuinely unique content per city, AEO answer blocks, lazy-loaded Google Maps embeds, city-specific JSON-LD with geo coordinates, and uniqueness verified above 60% between any two pages
**Depends on**: Phase 4
**Requirements**: LOCAL-01, LOCAL-02, LOCAL-03, LOCAL-04, LOCAL-05, LOCAL-06, LOCAL-07, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Visiting /chatham, /danville, /lynchburg, /smith-mountain-lake, /forest, /altavista, and /evington each returns a page with unique 250-500 word copy, a city-specific gallery, and local testimonials — no two pages share more than 40% identical content
  2. Each city page displays an AEO answer block (40-60 words) at the top targeting the local query ("senior portrait photographer in [City] VA")
  3. Clicking "View Map" on a city page opens a Google Maps embed centered on that city — the embed is not loaded until the user interacts (facade pattern)
  4. Google Rich Results Test confirms valid LocalBusiness JSON-LD with unique areaServed and geo coordinates on each of the 7 city pages
  5. The sitemap at /sitemap.xml includes all 7 city page URLs
**Plans**: TBD

Plans:
- [ ] 05-01: City dynamic route — app/[city]/page.tsx with generateStaticParams, Sanity city content schema, city-specific JSON-LD (LOCAL-01 through LOCAL-07, SEO-06)
- [ ] 05-02: City page content — unique copy for all 7 cities in Emily's brand voice, AEO answer blocks, local testimonials, city galleries (CONT-04, SEO-05)
- [ ] 05-03: Google Maps facade implementation, uniqueness verification (Copyscape or manual audit), city page Lighthouse audit

### Phase 6: External Platforms and Launch Polish
**Goal**: Emily has actionable step-by-step guides to complete GBP and Apple Business Connect setup, and the site passes a final cross-site verification checklist covering performance, tap targets, EXIF stripping, and NAP consistency
**Depends on**: Phase 5
**Requirements**: EXT-01, EXT-02
**Success Criteria** (what must be TRUE):
  1. Emily can follow the GBP setup guide independently — it covers service area business configuration, all 7 service cities listed, landing page links added, and verification steps without requiring developer assistance
  2. Emily can follow the Apple Business Connect guide independently — it covers claiming the listing, category selection, and linking emilykathryn.com
  3. A final Lighthouse mobile audit on the homepage, Senior Portraits page, and one city page all return LCP under 2.5s and CLS under 0.1
  4. An exiftool scan of all published portfolio images confirms no GPS EXIF metadata is present
**Plans**: TBD

Plans:
- [ ] 06-01: GBP optimization step-by-step guide for Emily — service area business setup, all 7 cities, landing page links (EXT-01)
- [ ] 06-02: Apple Business Connect step-by-step guide for Emily (EXT-02)
- [ ] 06-03: Final launch verification — Lighthouse audit, EXIF strip check, tap target audit, NAP consistency check, sitemap submission confirmation

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Planned | - |
| 2. Shared Components and Galleries | 0/3 | Not started | - |
| 3. Core Pages and Conversion | 0/5 | Not started | - |
| 4. SEO Infrastructure | 0/2 | Not started | - |
| 5. City Landing Pages | 0/3 | Not started | - |
| 6. External Platforms and Launch Polish | 0/3 | Not started | - |
