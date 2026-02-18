# Pitfalls Research

**Domain:** Photography portfolio site with hyper-local SEO landing pages (Next.js/Vercel)
**Researched:** 2026-02-18
**Confidence:** HIGH (verified across official docs, multiple industry sources, and Google documentation)

---

## Critical Pitfalls

These mistakes cause rewrites, tanked rankings, or missed business goals.

### Pitfall 1: Hero Image Destroys LCP on Mobile

**What goes wrong:**
The above-the-fold hero image -- typically a high-impact senior portrait or family session shot -- loads as a 1-3 MB file on mobile connections. LCP blows past 4 seconds on 4G. Google flags the page as "poor" in Core Web Vitals, directly hurting search rankings and causing 53% of mobile visitors to bounce before the page renders.

**Why it happens:**
Photographers are trained to prioritize image quality above all else. They upload full-resolution exports from Lightroom (3000-6000px wide, 2-5 MB each) and assume Next.js Image component handles everything. The component optimizes format and dimensions, but it cannot fix a 5 MB source image served as the LCP element if the `sizes` prop is missing or wrong, or if `priority` is not set. Without `sizes`, the browser downloads the largest variant regardless of viewport.

**How to avoid:**
- Set `priority={true}` (or `preload={true}` on Next.js 16+) on the single hero image per page -- never on multiple images. This inserts `<link rel="preload">` in the `<head>` and sets `fetchPriority="high"`.
- Always provide an accurate `sizes` prop. For a full-bleed hero: `sizes="100vw"`. For a hero constrained to max-width 1200px: `sizes="(max-width: 1200px) 100vw, 1200px"`. Without this, the browser fetches the largest srcset variant.
- Pre-optimize source images before CMS upload: max 2000px wide, under 400KB, exported at 80-85% quality. The CMS image pipeline should enforce this ceiling.
- Use `placeholder="blur"` with a generated `blurDataURL` so perceived load is instant even if the optimized image takes 1.5s.
- Target: hero image delivered payload under 150KB on mobile viewports.

**Warning signs:**
- Lighthouse lab LCP > 2.5s on mobile throttled connection
- `next/image` console warning about detected LCP element missing `priority`
- Field CrUX data showing "poor" LCP for 75th percentile users
- Source images in CMS media library exceeding 500KB

**Phase to address:**
Foundation/Infrastructure phase -- image optimization pipeline and component patterns must be established before any gallery or page content is built.

---

### Pitfall 2: City Landing Pages Flagged as Doorway Pages

**What goes wrong:**
Seven hyper-local landing pages (e.g., "Senior Portraits Lynchburg VA", "Family Photographer Bedford VA") are built from a shared template with city names swapped in. Google's SpamBrain classifier -- significantly upgraded in the September 2025 spam update -- identifies them as doorway pages. Result: all seven pages are demoted or deindexed, destroying the entire local SEO strategy. Pages targeting "service in city A" vs "service in city B" with near-identical content saw widespread demotions in late 2025.

**Why it happens:**
It is faster to build one template and swap `{city}` variables than to write seven unique pages. Developers treat this as a DRY principle win. But Google explicitly penalizes "sites or pages created to rank for specific, similar search queries" that funnel to the same business. AI models now detect programmatic templating with high accuracy.

**How to avoid:**
- Each city page must have genuinely unique content: specific local landmarks or venues mentioned, unique testimonials from clients in that area, location-specific FAQs, unique photography session descriptions referencing local spots (e.g., "Peaks of Otter sunset sessions" for Bedford, "Riverwalk golden hour" for Lynchburg).
- Minimum 60% unique content per page. Shared elements (service descriptions, pricing overview, photographer bio) should be the minority.
- Include a unique Google Maps embed for each service area with actual session locations or meeting points.
- Write city-specific FAQ blocks answering questions real locals would ask ("Where is the best outdoor location for senior portraits in Danville?").
- Internal linking between city pages should feel natural, not like a site network.
- Test with Copyscape or similar before launch to verify uniqueness scores between pages.

**Warning signs:**
- Google Search Console showing "Excluded by 'noindex' tag" or "Crawled - currently not indexed" for city pages
- Identical word count across city pages (within 5% variance)
- Running diff between two city pages shows only proper nouns changed
- Manual action notification in Search Console for "thin content with little or no added value"

**Phase to address:**
Content/SEO phase -- but the page architecture must be designed in the foundation phase to support per-city unique content blocks. The CMS schema must have per-city fields, not a single template with a city dropdown.

---

### Pitfall 3: NAP+W Inconsistency Torpedoes Local Pack Rankings

**What goes wrong:**
The business name, address, phone number, and website URL appear in different formats across the seven landing pages, the site footer, JSON-LD structured data, and the Google Business Profile. "Emily Kathryn Photography" on the website but "Emily Kathryn Photo" on GBP. "123 Main St." in the footer but "123 Main Street" in schema. Google interprets these as ambiguous signals about business identity, tanking Local Pack rankings. Businesses with consistent NAP across 75%+ of citations see a 186% increase in website clicks vs. inconsistent ones.

**Why it happens:**
Multiple people or systems manage different touchpoints. The CMS content editor writes one format, the developer hardcodes another in the footer, JSON-LD uses a third variation pulled from a config file, and GBP was set up months earlier with yet another format. Nobody audits for consistency because each individual entry "looks right."

**How to avoid:**
- Create a single canonical NAP+W configuration object (e.g., `siteConfig.ts`) that is the sole source of truth. Every rendering of business name, address, phone, and URL pulls from this object -- footer, JSON-LD, city pages, contact page, meta tags.
- Match GBP listing character-for-character, including abbreviations, suite numbers, punctuation.
- Implement a build-time or CI check that validates all NAP references resolve to the same canonical values.
- Quarterly audit: compare site NAP against GBP, Yelp, Facebook, Apple Maps, and any other citations.

**Warning signs:**
- GBP insights showing declining impressions despite good content
- Searching your exact business name + city does not show Knowledge Panel
- Moz Local or BrightLocal citation audit showing inconsistencies
- Different phone number formats (555-123-4567 vs (555) 123-4567 vs 5551234567)

**Phase to address:**
Foundation phase -- the canonical NAP+W config must exist before any content is authored. Every component that renders business info must consume from this config.

---

### Pitfall 4: Missing or Incorrect Structured Data Blocks AI/AEO Visibility

**What goes wrong:**
Pages launch with either no JSON-LD structured data, or with generic/incorrect schemas. The `LocalBusiness` schema uses wrong `@type` (there is no "Photographer" type in Schema.org -- the correct approach is `ProfessionalService`), omits `areaServed`, `priceRange`, or `openingHours`. Without comprehensive structured data, AI-powered answer engines (Google AI Overviews, ChatGPT, Perplexity) cannot cite the business. Pages with comprehensive schema markup are 2.7x more likely to be cited in AI answers. AI Overviews now appear in 44.4% of queries and reduce organic clicks by 58% when present -- being excluded from these is catastrophic for visibility.

**Why it happens:**
Developers add a minimal JSON-LD block as an afterthought, copy-pasting from a generic template without customizing for the photography/local-service domain. Schema validation passes with minimal fields, creating false confidence. Nobody tests with Google's Rich Results Test or monitors Search Console for structured data errors.

**How to avoid:**
- Implement type-safe JSON-LD using `schema-dts` package with TypeScript, catching missing required fields at compile time.
- Use `ProfessionalService` as the `@type` for photography businesses (not `LocalBusiness` directly -- it is too broad, and `Photographer` does not exist in Schema.org).
- Every city landing page must have its own `LocalBusiness` + `Service` + `FAQPage` schema with unique `areaServed`, `geo` coordinates, and `serviceArea` specific to that city.
- Add `Speakable` schema to FAQ sections to improve voice search and AI citation eligibility.
- Sanitize JSON-LD output: replace `<` with `\u003c` per Next.js official docs to prevent XSS injection via `dangerouslySetInnerHTML`.
- Validate every page with Google Rich Results Test before launch and monitor structured data reports in Search Console monthly.

**Warning signs:**
- Google Search Console "Enhancements" tab showing zero structured data detections
- Rich Results Test returning errors or "not eligible for rich results"
- Business not appearing in Google AI Overviews for core queries like "best senior photographer [city]"
- Competitor businesses appearing in AI-generated answers while yours does not

**Phase to address:**
SEO/Content phase -- but the JSON-LD component architecture and type-safe patterns must be established in the foundation phase. Schema templates per page type (homepage, city landing page, gallery, about) should be defined during architecture.

---

### Pitfall 5: CMS Remote Images Break Layout and Performance

**What goes wrong:**
Images uploaded through the headless CMS are served from a remote domain. Next.js Image component requires explicit `width` and `height` for remote images (it cannot introspect them at build time). Developers either omit dimensions (causing CLS > 0.25 from layout shifts), use `fill` mode without constraining the parent container (images overflow or collapse), or forget to whitelist the CMS image domain in `next.config.js` `remotePatterns` (causing broken images with no console error in production).

**Why it happens:**
Local development with static imports "just works" because Next.js auto-detects dimensions from the file system. When switching to CMS-sourced remote images, this safety net disappears. The `fill` prop seems like an easy workaround, but without a properly sized parent container it causes zero-height collapse or unconstrained growth. Protocol mismatches (HTTP vs HTTPS) cause silent failures -- broken image icons with no error message.

**How to avoid:**
- Configure the CMS to return image dimensions with every asset URL. Sanity, Contentful, and most headless CMSs include width/height in their API responses -- map these to the Image component props.
- Create a wrapper component (`<CmsImage>`) that enforces dimension requirements and falls back to `fill` mode with an aspect-ratio-constrained parent when dimensions are unavailable.
- Whitelist CMS image domains with specific `remotePatterns` in `next.config.ts` -- use exact hostnames and paths, never wildcards like `hostname: '*'`.
- Use the CMS's built-in image transformation API (Sanity's image pipeline, Contentful's Images API) as a custom `loader` instead of relying on Vercel's image optimization. This offloads transformation costs and avoids Vercel optimization billing.
- Generate `blurDataURL` at CMS content creation time (e.g., Sanity's LQIP, Contentful's `?w=20&q=10`) rather than at request time.

**Warning signs:**
- CLS score > 0.1 on pages with CMS-sourced images
- Broken image icons on staging/production that work in local dev
- `next.config.js` containing `domains` (deprecated) instead of `remotePatterns`
- Vercel image optimization billing unexpectedly high (> 5,000 transformations/month)

**Phase to address:**
Foundation/Infrastructure phase -- the CMS image pipeline and `<CmsImage>` wrapper component must be built and tested before any content pages are created.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline `sizes="100vw"` on all images | Quick, no calculation needed | Every image downloads at max resolution regardless of actual display size. Mobile users download 3-4x more data than needed. LCP suffers. | Never -- calculate actual sizes per component |
| Using Vercel image optimization for all CMS images | Zero config, works immediately | At 200+ portfolio images with multiple device sizes, monthly transformation count can exceed 5,000 (Pro plan included). Each additional 1,000 costs $5. Costs compound with traffic. | Acceptable for small portfolios (< 50 images). Use CMS-native image pipeline for larger catalogs. |
| Single JSON-LD block on layout.js for all pages | DRY, one place to maintain | Google sees identical structured data on every page. City-specific signals are lost. No per-page `FAQPage` or `Service` schema. AEO visibility is page-generic, not query-specific. | Never for multi-location sites |
| Storing gallery images in `/public` folder | Simple, no CMS integration needed | Images are baked into the deployment bundle. Adding/removing images requires a new deploy. Client cannot manage their own content. Build artifact grows with every image added. | Only for static assets like logos, icons, or background textures |
| Copy-pasting city page content and swapping names | 7 pages done in an hour | SpamBrain flags as doorway pages. All seven pages demoted. Recovery requires rewriting all content and waiting for recrawl. | Never |
| Skipping `placeholder="blur"` on gallery images | Faster initial development | Users see empty white space or layout jumps as images load. Perceived performance is poor. CLS may spike. Photography sites specifically suffer because the visual gap is jarring in a visual-first context. | Never for photography sites |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Maps Embed (city pages) | Loading iframe eagerly on page load. Adds 192KB+ JavaScript payload, delays TTI by ~1,240ms, increases LCP, causes CLS when iframe dimensions are not reserved. | Lazy-load the iframe with `loading="lazy"`. Reserve exact dimensions with `width`/`height` or aspect-ratio CSS. Consider a static map image placeholder that swaps to interactive on click/scroll (facade pattern). Reduces initial render time by 42%. |
| Google Business Profile | Setting up GBP once and never updating. GBP is now evaluated on ongoing accuracy, activity, and engagement. Stale profiles lose ranking to active competitors. | Schedule monthly GBP updates: new photos from recent sessions, respond to all reviews (88% of consumers prefer businesses that respond), publish Google Posts, update seasonal hours. Treat GBP as a living marketing channel. |
| Headless CMS (Sanity/Contentful) | Using `next/image` default loader for CMS images, which routes all transformations through Vercel's optimization API. With 200+ portfolio images served to diverse devices, this burns through the 5,000 included transformations quickly. | Use the CMS's native image CDN as a custom `loader`. Sanity's image pipeline and Contentful's Images API handle format conversion, resizing, and quality optimization at no additional cost. This completely bypasses Vercel image optimization billing. |
| Contact/Inquiry Form (primary conversion) | Using a third-party form service (Typeform, JotForm) embedded via iframe. Adds external JS/CSS dependencies, creates CLS, breaks the visual design, complicates conversion tracking, and the form provider owns the data. | Build a native form component with server actions or API routes. Use `react-hook-form` for validation, send submissions via email API (Resend, SendGrid) and store in a lightweight database or CMS collection. Full control, zero external dependencies, accurate conversion tracking. |
| Font Loading | Loading Google Fonts via `<link>` tag or external stylesheet. Causes FOUT/FOIT, CLS from font swap, and external network request that blocks rendering. | Use `next/font` to self-host fonts at build time. Next.js automatically applies `size-adjust` to prevent CLS. Zero external requests, no FOUT. This is the single easiest CWV win. |
| Analytics/Tracking Scripts | Adding Google Analytics, Facebook Pixel, or other tracking scripts to `<head>` without deferral. Blocks rendering, delays LCP, adds 50-200KB of blocking JavaScript. | Load analytics via `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`. For GA4, use the Partytown worker thread strategy or load via GTM with delayed initialization. |

## Performance Traps

Patterns that work at small scale but fail as usage grows or are specific to image-heavy photography sites.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Gallery page with 50+ full-resolution images | Page weight exceeds 20MB. Mobile users on 4G wait 15+ seconds. Lighthouse performance score drops below 30. Scroll becomes janky from painting oversized images. | Limit visible images to 12-20 per page view. Implement infinite scroll or "Load More" with intersection observer. Serve gallery thumbnails at 600px width, load full-res only on lightbox open. | Immediately on mobile -- any page with > 20 unoptimized images |
| No image dimension reservation in masonry/grid layout | CLS > 0.5 as images load at different times and push other images around. Mobile layout is completely unstable during load. | Define aspect ratios per image in CSS (`aspect-ratio` property). Use `fill` mode with explicitly sized parent containers. Pre-calculate grid positions server-side if using masonry layout. | Immediately on any connection slower than broadband |
| Serving AVIF/WebP without fallback consideration | Older Safari versions (pre-16) and some corporate browsers cannot render AVIF. Images show as broken. | Next.js Image component handles format negotiation automatically via `Accept` header. Do not manually set `formats: ['image/avif']` in config unless you have verified browser support for your audience. Let the default `['image/webp']` handle it. | When targeting older iOS devices (common for parents booking family photography) |
| Google Maps embed on every city page without facade | Seven city pages, each loading a full Google Maps iframe eagerly. Each iframe adds ~200KB and multiple network requests. If a user visits 3 city pages in a session, they have loaded 600KB of Maps JavaScript alone. | Implement facade pattern: show a static map screenshot with a "View Interactive Map" button. Load the actual iframe only on user interaction. This is the single biggest performance win for city landing pages. | Noticeable on any mobile device, critical on slow connections |
| Client-uploaded images without size/quality gates | Client or CMS editor uploads 8000x6000px, 15MB TIFF files exported directly from camera. Next.js/Vercel image optimization cannot process files > 10MB (hard limit). Even if under 10MB, optimization of massive source files is slow and burns transformation budget. | Implement CMS-side upload validation: max 3000px on longest edge, max 2MB file size, JPEG/PNG/WebP only (no TIFF/RAW). Reject or auto-resize on upload. This is a content management guardrail, not a developer concern. | First time a client uploads unprocessed camera files |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| EXIF metadata not stripped from portfolio images | Client photos contain embedded GPS coordinates (latitude/longitude accurate to meters), camera serial numbers, and timestamps. Publishing these exposes client home locations (for "at-home newborn sessions"), school locations (for senior portraits), and personal scheduling patterns. This is a privacy liability. | Strip all EXIF metadata during the image processing pipeline, either at CMS upload time or via an API route processor. Use `sharp` (already a Next.js dependency) with `.rotate()` (auto-applies and strips EXIF orientation) followed by explicit metadata stripping. Never serve raw camera exports. |
| Inquiry form without rate limiting or honeypot | Spam bots flood the inquiry form with hundreds of submissions per day, burying real client leads. If using email delivery, the sending domain gets flagged as spam, breaking legitimate notifications. | Implement honeypot field (hidden field that bots fill), rate limiting (max 3 submissions per IP per hour), and server-side validation. Avoid visible CAPTCHAs -- they hurt conversion rates by 3-8% for legitimate users. Use Cloudflare Turnstile as an invisible alternative if needed. |
| JSON-LD XSS vulnerability | If any CMS content (business name, description, FAQ answers) contains `<script>` tags, and JSON-LD is rendered via `dangerouslySetInnerHTML` without sanitization, an attacker who gains CMS access can inject malicious JavaScript that executes on every page load. | Always sanitize JSON-LD output by replacing `<` with `\u003c` as recommended in Next.js official docs. Use `serialize-javascript` for comprehensive sanitization. Never trust CMS content as safe HTML within script tags. |
| Client gallery links without authentication | If gallery/proofing pages are indexed by Google or shareable via URL without authentication, private client photos (e.g., boudoir sessions, newborn sessions in homes) become publicly accessible. | If client proofing galleries exist, implement authentication or at minimum use unguessable URLs (UUID-based, not sequential). Add `noindex` meta tags to private galleries. This may not apply to a portfolio site showing selected work, but is critical if client delivery is added later. |

## UX Pitfalls

Common user experience mistakes specific to photography portfolio/local service sites.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Inquiry form buried at bottom of long gallery page | Mobile users (62%+ of traffic) scroll through 30+ images, lose interest or forget why they came. Conversion rate drops below 2%. The form is invisible without deliberate hunting. | Place a sticky "Book a Session" CTA that follows the user during scroll. Include a short inline form (name, email, session type) after the first 6-8 portfolio images. Full form on a dedicated `/contact` page linked from the sticky CTA. |
| Full-screen image slider/carousel as hero | Carousels have 1-2% click-through on slides beyond the first. They add JavaScript weight, cause CLS during initialization, and delay LCP because the slider JS must initialize before the first image renders. Auto-playing carousels are an accessibility violation (WCAG 2.2.2). | Use a single, impactful hero image with a clear CTA overlay. Rotate the hero image weekly/monthly via CMS to keep it fresh. This loads faster, has zero CLS, and puts the CTA front-and-center. |
| Gallery lightbox with no "Inquire About This Session" CTA | User sees a beautiful image, feels inspired, but has no path to convert from that emotional peak. They must close the lightbox, scroll to find a contact link, and re-establish intent. The emotional moment is lost. | Add a persistent "Inquire" or "Book Similar Session" button within the lightbox UI. This capitalizes on the emotional trigger point when a potential client sees work they connect with. |
| City landing page that reads like a directory listing | "We serve Lynchburg, VA. Contact us for photography services." No personality, no local knowledge, no reason to choose this photographer over the 15 others also "serving Lynchburg." | Write in first person with genuine local knowledge: "I grew up exploring the trails at Sharp Top Mountain, and it's still one of my favorite locations for fall senior sessions." Include specific venue recommendations, seasonal tips, real client stories from that city. |
| No social proof near conversion points | Inquiry form sits alone without reviews, testimonials, or portfolio samples nearby. Prospective clients have doubt at the moment of commitment. | Place 2-3 short testimonials (with first name and session type) directly adjacent to the inquiry form. Include a small gallery strip of recent work above the form. Show Google review rating badge. |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **City landing pages:** Often missing unique `FAQPage` JSON-LD per city -- verify each page has its own structured data with Rich Results Test
- [ ] **Image optimization:** Often missing `sizes` prop on `next/image` -- verify with browser DevTools Network tab that mobile devices receive mobile-sized images, not desktop-sized
- [ ] **Inquiry form:** Often missing conversion tracking -- verify that form submissions fire GA4 events and can be attributed to source page (which city page drove the lead?)
- [ ] **Google Maps embeds:** Often missing lazy loading -- verify with Lighthouse that Maps iframe is not flagged as "offscreen iframe loaded eagerly"
- [ ] **Mobile CTA:** Often missing sticky/floating CTA on mobile -- verify on real device that booking CTA is always reachable without scrolling back to top
- [ ] **NAP consistency:** Often has subtle differences (St. vs Street, abbreviation differences) -- verify by extracting all NAP instances into a single document and comparing character-by-character
- [ ] **Font loading:** Often still using external Google Fonts link -- verify with DevTools Network tab that no requests go to `fonts.googleapis.com` or `fonts.gstatic.com`
- [ ] **Structured data on all pages:** Often only on homepage -- verify every page type (home, about, city pages, gallery, contact) has appropriate JSON-LD
- [ ] **Image alt text:** Often generic ("photo1.jpg") or missing entirely -- verify every portfolio image has descriptive, keyword-relevant alt text that aids both accessibility and SEO
- [ ] **EXIF data stripped:** Often overlooked -- verify by downloading a served image and checking metadata with `exiftool` or an online EXIF viewer. GPS coordinates should be absent.
- [ ] **Open Graph / social sharing images:** Often missing or broken on city pages -- verify by pasting each page URL into Facebook Sharing Debugger and Twitter Card Validator

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Doorway page penalty (city pages demoted) | HIGH -- 2-4 weeks minimum | Rewrite all city page content to be genuinely unique (60%+ unique per page). Submit reconsideration request if manual action. Request re-crawl via Search Console. Expect 4-8 weeks for rankings to recover after content fix. |
| LCP > 4s on mobile across site | MEDIUM -- 1-2 days | Audit all hero/above-fold images. Add `priority` prop to LCP images. Add accurate `sizes` props. Pre-optimize source images. Implement blur placeholder. Results visible in field data within 28 days. |
| CLS > 0.25 from images/embeds | MEDIUM -- 1-2 days | Add explicit dimensions to all images and iframes. Implement aspect-ratio CSS on image containers. Lazy-load Maps embeds. Results visible in field data within 28 days. |
| NAP inconsistency discovered post-launch | LOW-MEDIUM -- 1 day + waiting | Update all site references to match canonical config. Update GBP, Yelp, Facebook, Apple Maps. Use Moz Local or BrightLocal to push corrections to data aggregators. Allow 2-4 weeks for changes to propagate. |
| EXIF data exposed on live portfolio images | MEDIUM -- few hours | Immediately re-process all portfolio images through `sharp` to strip metadata. Replace all images in CMS. Purge CDN cache. Check if Google has cached any image metadata. Update pipeline to prevent recurrence. |
| Vercel image optimization overage billing | LOW -- 1 hour | Switch to CMS-native image loader to bypass Vercel optimization. Update `next.config.ts` with custom loader. Costs stop immediately for new requests. |
| Structured data errors blocking rich results | LOW -- few hours | Run Rich Results Test on all page types. Fix schema errors (wrong types, missing required fields). Re-validate. Request re-crawl. Rich results typically appear within 1-2 weeks. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Hero image LCP failure | Foundation/Infrastructure | Lighthouse mobile LCP < 2.5s on all page types with throttled connection |
| Doorway page penalty | Content/SEO (architecture in Foundation) | Copyscape uniqueness score > 60% between any two city pages |
| NAP+W inconsistency | Foundation (config), verified in Content phase | Automated test comparing all rendered NAP instances against canonical config |
| Missing/incorrect structured data | Foundation (component patterns), Content (per-page data) | Rich Results Test passes on every page type, Search Console shows zero structured data errors |
| CMS remote image breakage | Foundation/Infrastructure | CLS < 0.1 on all pages with CMS images, zero broken images on staging |
| Google Maps performance impact | Foundation (component patterns) | Lighthouse does not flag offscreen iframes, TTI under 3.5s on city pages |
| EXIF metadata exposure | Foundation (image pipeline) | `exiftool` shows zero GPS/PII metadata on any served portfolio image |
| Inquiry form conversion failure | UX/Conversion phase | Form visible within 2 scrolls on mobile, conversion tracking firing in GA4, spam rate < 5% |
| City page content thinness | Content/SEO phase | Each city page has > 800 words unique content, real local references, unique testimonials |
| Font loading CLS | Foundation/Infrastructure | Zero requests to external font CDNs, CLS contribution from fonts = 0 |
| Vercel optimization billing | Foundation (CMS integration) | Custom loader configured, Vercel image transformation count stable month-over-month |

## Sources

### Official Documentation (HIGH confidence)
- [Next.js Image Optimization Docs (v16.1.6)](https://nextjs.org/docs/app/getting-started/images)
- [Next.js JSON-LD Guide (v16.1.6)](https://nextjs.org/docs/app/guides/json-ld)
- [Vercel Image Optimization Limits and Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)
- [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org LocalBusiness Type](https://schema.org/LocalBusiness)

### Industry Sources (MEDIUM confidence)
- [18 Local SEO Mistakes Killing Your Rankings in 2026 - Connectica LLC](https://www.connecticallc.com/local-seo-mistakes/)
- [Top 7 Site Speed Issues on Photography Sites - Flothemes](https://flothemes.com/top-speed-issues-photography-sites/)
- [Core Web Vitals for React + Next.js Sites - Rise Marketing](https://rise.co/blog/core-web-vitals-for-react-next.js-sites-real-fixes-that-cut-lcp-by-50percent)
- [Next.js Image Component: Performance and CWV in Practice - Pagepro](https://pagepro.co/blog/nextjs-image-component-performance-cwv/)
- [iFrames Affect Page Speed and CWV - GtechMe](https://www.gtechme.com/insights/iframes-page-speed-core-web-vitals/)
- [Your Images Are Killing Your LCP - Yagyaraj Lodhi](https://yagyaraj234.medium.com/your-images-are-killing-your-lcp-heres-how-to-fix-it-fab3ee3c5853)
- [Local SEO Mistakes That Kill Rankings - LocalMighty](https://www.localmighty.com/blog/top-local-seo-mistakes-killing-your-local-seo-rankings/)
- [Answer Engine Optimization Comprehensive Guide - CXL](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/)
- [Google Business Profile Mistakes - Rio SEO](https://www.rioseo.com/blog/8-google-business-profile-mistakes/)
- [Gallery Layout Best Practices 2025 - OneWebCare](https://onewebcare.com/blog/gallery-layout-best-practices/)

### Community/WebSearch (LOW confidence -- verify before acting)
- [Duplicate Content for Local SEO - Search Engine Journal](https://www.searchenginejournal.com/when-is-duplicate-content-acceptable-for-local-seo-google-explains/519562/)
- [How to Protect Images from Generative AI - Pixsy](https://www.pixsy.com/image-protection/how-to-protect-your-images-from-generative-ai-in-2025-6-steps-you-can-take)

---
*Pitfalls research for: Emily Kathryn Photography -- Next.js photography portfolio with hyper-local SEO*
*Researched: 2026-02-18*
