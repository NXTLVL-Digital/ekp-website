# Project Research Summary

**Project:** Emily Kathryn Photography — Website Redesign
**Domain:** Conversion-optimized photography portfolio with headless CMS and hyper-local SEO
**Researched:** 2026-02-18
**Confidence:** HIGH

## Executive Summary

Emily Kathryn Photography is a senior portrait and family photography business competing in Central Virginia (Lynchburg, Danville, Chatham, and surrounding cities). The recommended approach is a Next.js 15.5 + Sanity v4 + Vercel stack — a well-documented, production-proven combination that delivers the image optimization pipeline and CMS flexibility this project demands. Competitors are using WordPress/Elementor or Squarespace, which means a Next.js site hitting 100/100 mobile performance will load faster, rank higher, and convert better than anything else in the market. The CMS choice matters enormously for a photography site: Sanity wins over Prismic because of its built-in image pipeline with per-image hotspot/crop, its LQIP metadata for blur placeholders, and its embedded Studio at `/studio` that keeps Emily's workflow in one URL.

The central business challenge is two-sided: Emily needs to convert both Gen Z seniors (who want editorial/fashion aesthetics) and their Gen X parents (who want professionalism and clear value). No competitor in this VA market is solving this dual-audience problem, offering hyper-local city landing pages, or implementing any structured data. These gaps are Emily's primary competitive advantages. The site must be built to capture them systematically: 7 dedicated city landing pages with genuinely unique content, full JSON-LD/AEO structured data, and a CMS-managed inquiry funnel that filters leads without an online booking system.

The highest risks are performance and SEO. On the performance side, hero image LCP on mobile is the single biggest threat — it requires disciplined image pipeline setup before any gallery content is built. On the SEO side, the city landing pages are a significant local search opportunity that becomes a liability if the content is templated with only city names swapped: Google's SpamBrain now flags these as doorway pages. Both risks are preventable at the architecture layer if addressed in the foundation phase. NAP consistency across all seven city pages, JSON-LD blocks, and the Google Business Profile must be driven from a single canonical config object from day one.

## Key Findings

### Recommended Stack

The stack is a tightly coupled dependency chain: Next.js 15.5.x requires React 19.0.x, which is compatible with Sanity v4.22.0 and next-sanity v11.6.12. Do not deviate from these pinned versions. Next.js 16 is too new (released December 2025) and forces a cascade to Sanity v5 + React 19.2 — a dependency chain where the ecosystem has not caught up. Tailwind CSS v4 is the right choice for new projects in 2026, with its CSS-first config and smaller output. Vercel is the native host for Next.js and handles ISR, CDN, and image optimization at zero config cost. See [STACK.md](.planning/research/STACK.md) for the full version compatibility matrix and CMS evaluation.

**Core technologies:**
- **Next.js 15.5.12:** Meta-framework — App Router with RSC, built-in image optimization, ISR for CMS-driven revalidation, zero-config Vercel deployment
- **React 19.0.x:** UI library — broadest compatibility window with Next.js 15.5 and Sanity v4; use 19.0.4, not 19.2.x
- **Sanity v4.22.0:** Headless CMS — winner over Prismic due to built-in image pipeline (hotspot/crop/LQIP), code-first schemas, GROQ query flexibility, and embedded Studio
- **next-sanity v11.6.12:** Official Sanity-Next.js integration — draft mode, visual editing, ISR webhook revalidation; do NOT use v12 (requires Next.js 16)
- **Tailwind CSS v4.1.18:** Utility CSS — CSS-first config, 70% smaller output than v3, no migration burden on a new project
- **Resend v6.9.2:** Transactional email — free tier covers inquiry volume, works natively with Next.js Server Actions, React Email for branded templates
- **Zod v4.x:** Form validation — shared schema between client and server, pairs with Server Actions for type-safe inquiry form handling
- **Motion v12.x:** Animation — formerly Framer Motion (rebranded 2025); use `motion` package, NOT `framer-motion`
- **Vercel:** Hosting — ISR out of the box, global CDN, free tier covers small business sites

**What to avoid:** `framer-motion` (deprecated name), Cloudinary (redundant with Sanity CDN), WordPress (performance antithetical to LCP targets), component libraries (Chakra/MUI/shadcn constrain visual design), Google Analytics (requires cookie banner, use Vercel Analytics instead), Next.js 16 or Sanity v5 (too new).

### Expected Features

The MVP must be conversion-ready before launch, not just "present." Inquiry form, pricing visibility, and testimonials are conversion-critical and must not be deferred. See [FEATURES.md](.planning/research/FEATURES.md) for the full competitor analysis and feature dependency graph.

**Must have (P1 — table stakes):**
- Portfolio galleries (organized by senior/family, masonry/grid, WebP/AVIF, blur placeholders) — visitors judge the photographer entirely by their work
- Mobile-first responsive design (80% of local searches are mobile; Gen Z audience is mobile-native)
- Inquiry form with smart fields (Grad Year, High School, Style preference) + email notification — the sole conversion endpoint
- Senior Portraits service page (gallery, session description, "Starting At" pricing, Experience Storyboard, FAQ, CTA)
- Family Portraits service page (gallery, session description, "Starting At" pricing, FAQ, CTA)
- Homepage (conversion-focused hero, portfolio preview, testimonials, persistent CTA, scarcity cue)
- About page (photographer photo, personal story) — second-most visited page for service businesses
- "Starting At" pricing display — pre-qualifies leads, reduces tire-kicker inquiries
- Persistent CTA (sticky header or floating button visible on every page)
- Client testimonials (3+ on homepage, also on service/city pages) — social proof increases purchase likelihood 4x
- Core Web Vitals compliance (LCP < 2.5s, CLS < 0.1) — non-negotiable for rankings and conversion
- CMS content management (Sanity Studio at /studio) — galleries, copy, pricing, scarcity cues all Emily-manageable
- JSON-LD structured data (LocalBusiness, Service, FAQPage) — uncontested territory in this market
- FAQ sections (service-specific, structured for AEO/featured snippets)

**Should have (P2 — competitive differentiators, add post-launch):**
- 7 hyper-local city landing pages (Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, Evington) — biggest local SEO opportunity in this market; no competitor has per-city pages
- AEO answer blocks (40-60 word answers at top of city pages and FAQ) — captures AI Overview visibility
- Google Maps embeds on city pages (lazy-loaded with facade pattern)
- Senior Style/Wardrobe Guide — drives "what to wear senior pictures" organic traffic
- GBP optimization guide for Emily — GBP accounts for 32% of local pack ranking
- CMS-managed scarcity cues ("Limited Spring 2026 Senior Slots Remaining")
- Gallery lightbox (keyboard nav, swipe gestures, image counter)
- Apple Business Connect setup — free visibility across Apple Maps/Siri; most VA photographers have not claimed this
- Inquiry form auto-responder (fires 10 minutes post-submission, feels personal)

**Defer (v2+):**
- Blog/content marketing — only if Emily commits to regular cadence; dead blog signals neglect worse than no blog
- Video testimonials — defer until content is collected
- Online booking/scheduling integration — removes Emily's ability to qualify leads; architecture should not block this
- Client gallery proofing portal — out of scope; Pixieset/ShootProof handle this better as standalone products
- E-commerce / print shop — massive scope increase, not Emily's model

**Anti-features (never build):**
Video hero backgrounds, Instagram feed embeds, real-time chat, auto-playing music, excessive parallax — all hurt performance or UX with no conversion benefit for this business model.

### Architecture Approach

The site is a Next.js App Router application with a thin-pages/fat-components pattern: page files fetch data and compose components, all business logic lives in `/lib`, `/actions`, and `/sanity`. Server Components are the default; `'use client'` is applied only to the interactive boundary (gallery lightbox, inquiry form, mobile nav, Maps embed). All CMS data flows through a centralized `sanityFetch()` wrapper with ISR cache tags for granular on-demand revalidation via Sanity webhooks. The 7 city landing pages use a single `app/[city]/page.tsx` dynamic route with `generateStaticParams` — never 7 separate files. See [ARCHITECTURE.md](.planning/research/ARCHITECTURE.md) for component diagrams, data flow patterns, and build order dependencies.

**Major components:**
1. **Sanity Content Layer** — Studio embedded at `/studio`, Content Lake stores all CMS content, Image Pipeline delivers on-demand transforms with LQIP metadata
2. **Next.js Application Layer** — Server Components for all pages, Route Handlers for webhook/revalidation, Server Actions for inquiry form processing
3. **Delivery Layer** — Vercel Edge CDN, ISR Cache, built-in Image Optimization serving WebP/AVIF
4. **SanityImage wrapper** — `next/image` + `@sanity/image-url` + LQIP blur placeholder; the foundational shared component the entire image pipeline depends on
5. **Inquiry form + Server Action** — Client Component form with Zod validation, Server Action calls Resend API, shared validation schema between client and server
6. **City dynamic route** — `app/[city]/page.tsx` with `generateStaticParams` pre-renders all 7 city pages; unique CMS content per city
7. **JSON-LD / SEO layer** — Type-safe `schema-dts` JSON-LD in Server Components; `generateMetadata` for dynamic `<head>` tags; `sitemap.ts` for crawlability

**Key patterns to follow:**
- Thin pages, fat components (pages = data fetching + composition only)
- Centralized `sanityFetch()` with tag-based ISR revalidation
- Static city pages via `generateStaticParams` + `dynamicParams: true`
- Client boundary pushed as deep as possible (default to Server Component)
- Server Action for form submission with shared Zod schema
- NAP+W canonical config object (`lib/constants.ts`) as single source of truth

### Critical Pitfalls

The top 5 pitfalls are all preventable at the foundation layer. Addressing them during architecture setup costs hours; discovering them post-launch costs days-to-weeks. See [PITFALLS.md](.planning/research/PITFALLS.md) for recovery strategies and a "Looks Done But Isn't" verification checklist.

1. **Hero image destroys LCP on mobile** — Set `priority={true}` on exactly one hero image per page, always provide accurate `sizes` prop, pre-optimize source images to max 2000px/400KB before CMS upload, use `placeholder="blur"` with Sanity LQIP. Target delivered hero payload under 150KB on mobile. Must be solved in the foundation phase before any gallery content is built.

2. **City landing pages flagged as doorway pages** — Each city page must have minimum 60% unique content: specific local landmarks, unique client testimonials from that area, location-specific FAQs. Never swap only the city name in a template. SpamBrain (upgraded September 2025) detects programmatic templating. CMS schema must support per-city unique content fields, not a city dropdown on a shared template.

3. **NAP+W inconsistency torpedoes local pack rankings** — Single canonical `siteConfig.ts` object must be the sole source of truth for business name, address, phone, and URL. Every footer, JSON-LD block, city page, and meta tag pulls from this config. Match GBP character-for-character including abbreviations. Must be established in the foundation phase before any content is authored.

4. **Missing/incorrect structured data blocks AI/AEO visibility** — Use `ProfessionalService` as the `@type` (not `LocalBusiness` directly; `Photographer` does not exist in Schema.org). Every city page needs its own `LocalBusiness` + `Service` + `FAQPage` schema with unique `areaServed` and `geo` coordinates. Add `Speakable` schema to FAQ sections for AI citation eligibility. Sanitize JSON-LD output (replace `<` with `\u003c`). Validate with Google Rich Results Test before launch.

5. **CMS remote images break layout and performance** — Sanity returns image dimensions in the API response; always map these to `next/image` width/height props. Use `@sanity/image-url` as the custom loader, not Vercel's image optimization pipeline for CMS images (avoids billing overages at scale). The `SanityImage` wrapper component must be built and tested before any content pages are created.

**Additional pitfalls to track:**
- Google Maps embeds loaded eagerly on city pages add 200KB each; use facade pattern (static screenshot + "View Map" button)
- EXIF metadata not stripped from portfolio images exposes client GPS coordinates; strip via Sharp in the image pipeline
- Inquiry form without rate limiting + honeypot will be flooded by bots
- Full-screen hero carousel instead of single hero image (adds JS, causes CLS, CTA buried)
- No `'use client'` boundary discipline leading to bloated JavaScript bundles

## Implications for Roadmap

The architecture research provides an explicit build order; the feature and pitfall research confirm the dependency graph. The phase structure below follows component prerequisites, groups related deliverables, and front-loads all pitfall prevention.

### Phase 1: Foundation and Infrastructure

**Rationale:** Every other phase depends on this. The image optimization pipeline, CMS connection, canonical NAP config, and Server/Client component boundaries must exist before any content or page is built. Pitfall prevention for the 5 critical pitfalls all starts here.

**Delivers:** Working Next.js app on Vercel with Sanity connected, `SanityImage` wrapper with LQIP, canonical NAP config, `sanityFetch()` wrapper with ISR, root layout with nav/footer, Sanity schemas for all content types, CMS-native image loader configured, font loading via `next/font`.

**Addresses:**
- Pitfall: Hero image LCP (image pipeline + `SanityImage` + `sizes` prop discipline established)
- Pitfall: CMS remote image breakage (`SanityImage` wrapper, `remotePatterns` config, CMS-native loader)
- Pitfall: NAP+W inconsistency (canonical `siteConfig.ts` object)
- Pitfall: Font loading CLS (`next/font` self-hosted fonts, zero external CDN requests)
- Pitfall: EXIF metadata exposure (Sharp pipeline with metadata stripping)

**Research flag:** Standard, well-documented patterns. Skip `/gsd:research-phase` for this phase.

### Phase 2: Core Page Shell and Shared Components

**Rationale:** Shared components (Gallery, Lightbox, JSON-LD, Section layout, PricingCard, Storyboard) are reused across multiple pages. Building these before pages prevents rework. The JSON-LD architecture must be established before any page-specific schema is authored.

**Delivers:** `GalleryGrid` + `GalleryLightbox` (Server + Client boundary), `JsonLd` component with type-safe `schema-dts` patterns, `SanityImage` integration tested with real CMS content, `Section` layout primitive, `PricingCard`, `Storyboard`, `ScarcityCue`, `AnswerBlock` components.

**Addresses:**
- Pitfall: Missing/incorrect structured data (JSON-LD component architecture established with `ProfessionalService` type, `Speakable` for FAQs, XSS sanitization)
- Anti-pattern: Client component sprawl (Server/Client boundary discipline enforced in Gallery component)

**Research flag:** Standard RSC patterns. Skip `/gsd:research-phase`.

### Phase 3: Core Pages (MVP Launch Candidate)

**Rationale:** This is the minimum viable site that can replace emilykathryn.com and start converting. Homepage, both service pages, About, and the inquiry form cover all P1 features. Launch this phase before city pages — it generates real inquiries and validates the conversion funnel.

**Delivers:** Homepage (hero, portfolio preview, testimonials, scarcity cue, persistent CTA), Senior Portraits page (gallery, pricing, Experience Storyboard, FAQ), Family Portraits page (gallery, pricing, FAQ), About page, Contact/Inquiry page with Server Action + Resend email notification, Core Web Vitals compliance verified (LCP < 2.5s, CLS < 0.1), mobile-first responsive design with gender-inclusive aesthetic.

**Addresses:**
- Features: All P1 table-stakes features
- Pitfall: Hero image LCP (Lighthouse mobile audit before launch sign-off)
- UX pitfall: Inquiry form buried (sticky CTA, form visible within 2 scrolls on mobile)
- UX pitfall: No social proof near conversion points (testimonials adjacent to inquiry form)

**Research flag:** Standard patterns. Skip `/gsd:research-phase`. The dual-audience design challenge (Gen Z editorial + Gen X parent trust) is a design/UX decision, not a technical one — needs to be handled in requirements/design, not research.

### Phase 4: SEO Infrastructure and Structured Data

**Rationale:** With core pages live, the SEO layer can be built against real page content. Dynamic sitemap, robots.txt, per-page JSON-LD, OG images, and webhook-based ISR revalidation are independent of page count and should be complete before city pages are built (city pages depend heavily on JSON-LD).

**Delivers:** `sitemap.ts` covering all routes, `robots.ts`, per-page-type JSON-LD schemas (`LocalBusiness`, `Service`, `FAQPage`, `Review`, `ImageGallery`), Sanity webhook + `/api/revalidate` ISR endpoint, OG meta tags via `generateMetadata`, Google Search Console setup, Rich Results Test validation on all page types.

**Addresses:**
- Pitfall: Missing structured data (all page types validated before city pages are built)
- Pitfall: Structured data blocks AI/AEO (Speakable schema in FAQ sections)

**Research flag:** JSON-LD schema specifics for `ProfessionalService` + `areaServed` per city may benefit from a focused research pass during planning. The `schema-dts` TypeScript types catch structural errors but not semantic ones.

### Phase 5: Hyper-Local City Landing Pages

**Rationale:** City landing pages depend on all previous phases being stable: gallery components, JSON-LD architecture, ISR revalidation, and the `[city]` dynamic route pattern. More importantly, they require significant unique content creation (250-500 words x 7 cities, unique testimonials, local landmark references). Emily must be involved in content creation before this phase can be completed.

**Delivers:** 7 city landing pages (Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, Evington) via `app/[city]/page.tsx` with `generateStaticParams`, unique CMS content per city (local copy, testimonials, FAQ), Google Maps embeds with facade pattern, AEO answer blocks (40-60 words per city), city-specific JSON-LD with unique `areaServed` and `geo` coordinates.

**Addresses:**
- Pitfall: Doorway page penalty (Copyscape uniqueness score > 60% between any two city pages, verified before launch)
- Pitfall: Google Maps performance (facade pattern: static screenshot + lazy-loaded iframe)
- Feature: Hyper-local SEO (biggest competitive gap in this VA photography market)

**Research flag:** City-specific local content (landmarks, venues, session locations per city) needs Emily's input, not additional developer research. The architecture pattern is documented; the content gap is a client collaboration requirement. Flag this phase for a content workshop with Emily.

### Phase 6: Conversion Optimization and Polish

**Rationale:** With all pages live and generating data, this phase uses real performance metrics and early inquiry data to optimize. Scarcity cues, auto-responder, GBP optimization guide, and Apple Business Connect setup are lower-complexity items that maximize the conversion rate of existing traffic.

**Delivers:** CMS-managed scarcity cues live on homepage hero + service pages, inquiry form auto-responder (10-minute delayed acknowledgment), GBP optimization step-by-step guide for Emily, Apple Business Connect setup, Lighthouse audit with image priority tuning, CLS verification across all page types, mobile tap target verification (44x44px minimum), EXIF strip verification via `exiftool`, form spam protection (honeypot + rate limiting).

**Addresses:**
- Feature: All P2 differentiators not addressed in Phase 5
- Pitfall: Inquiry form spam (honeypot + rate limiting)
- "Looks Done But Isn't" checklist items

**Research flag:** GBP optimization tactics evolve frequently. Run `/gsd:research-phase` on current GBP best practices (2026) during planning for this phase — the Localmighty source from PITFALLS.md is MEDIUM confidence and may be stale.

### Phase Ordering Rationale

- Foundation before everything because the image pipeline and NAP config are prerequisites for every other component
- Core components before pages because `GalleryGrid`, `JsonLd`, and `SanityImage` are shared across 10+ pages — building pages first creates rework
- Core pages before city pages because the city pages depend on `GalleryGrid`, `LocalTestimonials`, `GoogleMap`, and the `[city]` route's JSON-LD architecture all being tested and stable
- SEO infrastructure alongside or just after core pages (Phase 4 can partially overlap Phase 3) so the sitemap and JSON-LD patterns are established before city pages are authored
- City pages near the end because they require both stable infrastructure AND significant unique content production — they are not a technical blocker, they are a content production effort
- Conversion optimization last because it uses real data from live pages and traffic

### Research Flags

**Phases needing `/gsd:research-phase` during planning:**
- **Phase 6 (GBP Optimization):** GBP ranking factors shift frequently; verify current best practices before writing Emily's maintenance guide. The 2026 Localmighty source is MEDIUM confidence.
- **Phase 4 (Structured Data):** The `ProfessionalService` + `areaServed` + `Speakable` schema combination for a photography local business is worth a focused validation pass against current Google documentation before implementation.

**Phases with standard patterns (skip `/gsd:research-phase`):**
- **Phase 1 (Foundation):** Next.js + Sanity + Vercel setup is thoroughly documented with official guides and verified npm peer deps
- **Phase 2 (Shared Components):** RSC Server/Client boundary patterns are well-documented in Next.js official docs
- **Phase 3 (Core Pages):** Standard Next.js App Router patterns + Resend Server Actions — well-documented
- **Phase 5 (City Pages):** Architecture pattern is documented in ARCHITECTURE.md; the gap is content, not technical patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry on 2026-02-18. Peer dependency chain fully traced. CMS evaluation (Sanity vs Prismic) cross-referenced against official feature docs and project requirements. |
| Features | HIGH | Table stakes grounded in conversion research (CXL, ShootProof) with quantified data. Competitor analysis conducted against real sites (Matthew Cost, Heidi Fam). Feature dependencies explicitly mapped. |
| Architecture | HIGH | Patterns sourced from official Next.js and Sanity documentation. Code examples are production-quality patterns, not theoretical. Build order matches documented component dependencies. |
| Pitfalls | HIGH | Critical pitfalls sourced from official documentation (Next.js Image docs, Google structured data docs, Vercel pricing). Industry sources cross-checked across multiple publications. |

**Overall confidence:** HIGH

### Gaps to Address

- **Dual-audience design language:** The research identifies the Gen Z + Gen X parent design challenge clearly but cannot prescribe the specific visual direction — that requires Emily's input during requirements definition and a design exploration phase. Needs to be surfaced explicitly in requirements gathering.
- **Emily's content production capacity for city pages:** City landing pages require Emily to provide local knowledge (specific landmarks, venues, client stories per city). The architecture supports this, but the roadmap must account for content production time and not schedule city pages as a purely technical sprint.
- **Grad year / high school form field privacy:** The inquiry form captures sensitive personal information (minor's school, expected grad year). Ensure Emily's data retention policy and any applicable COPPA/privacy considerations are addressed before form goes live. This was not explicitly covered in research.
- **Image upload guidelines for Emily:** The CMS needs upload validation rules (max 3000px, max 2MB, JPEG/PNG/WebP only) and Emily needs a written guide on exporting from Lightroom for web. This is a content management process gap, not a technical one.
- **Resend domain verification:** The Resend integration requires DNS verification of emilykathryn.com (SPF/DKIM records). Confirm Emily has DNS access before development begins on the inquiry form.

## Sources

### Primary (HIGH confidence)
- npm Registry (2026-02-18) — version compatibility matrix for all core dependencies
- [Next.js Official Documentation v16.1.6](https://nextjs.org/docs) — App Router, ISR, Image optimization, Metadata API, JSON-LD, Route Handlers
- [Sanity Documentation](https://www.sanity.io/docs) — Visual editing, image pipeline, LQIP patterns, Presentation tool, pricing/limits
- [Google Structured Data Documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) — LocalBusiness schema, Rich Results requirements
- [Tailwind CSS v4 Next.js Setup Guide](https://tailwindcss.com/docs/guides/nextjs) — v4 installation with `@tailwindcss/postcss`
- [Resend Next.js Integration Guide](https://resend.com/docs/send-with-nextjs) — Server Actions pattern
- [Apple Business Connect](https://businessconnect.apple.com/) — official source for Apple Maps/Siri visibility

### Secondary (MEDIUM confidence)
- [CXL - Answer Engine Optimization Guide 2026](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/) — AEO block format and query targeting
- [CXL - Web Form Optimization](https://cxl.com/blog/web-form-optimization/) — field count and conversion rate data
- [Search Engine Land - Service Area Pages](https://searchengineland.com/guide/service-area-pages) — local landing page uniqueness requirements
- [next-sanity GitHub Repository](https://github.com/sanity-io/next-sanity) — official integration patterns
- [Localmighty - GBP Optimization 2026](https://www.localmighty.com/blog/google-business-profile-optimization-best-practices/) — GBP ranking factors
- Competitor analysis: Matthew Cost Photography, Heidi Fam Photography — feature gap identification
- [Rise Marketing - Core Web Vitals for Next.js](https://rise.co/blog/core-web-vitals-for-react-next.js-sites-real-fixes-that-cut-lcp-by-50percent) — LCP/CLS fix patterns

### Tertiary (LOW confidence — validate before acting)
- [Duplicate Content for Local SEO - Search Engine Journal](https://www.searchenginejournal.com/when-is-duplicate-content-acceptable-for-local-seo-google-explains/519562/) — doorway page penalty signals
- Community blog posts on Next.js project structure (used for pattern validation, not primary source)

---
*Research completed: 2026-02-18*
*Ready for roadmap: yes*
