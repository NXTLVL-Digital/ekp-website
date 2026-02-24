# Phase 4: SEO Infrastructure - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Site-wide structured data (JSON-LD schemas) validated on every page type, XML sitemap covering all routes, robots.txt, Google Search Console verification support, and ISR webhook validation — all in place before city landing pages are built in Phase 5. The generic `JsonLd` component and `/api/revalidate` webhook already exist from earlier phases; this phase creates the specific schema implementations and discovery infrastructure.

</domain>

<decisions>
## Implementation Decisions

### Overarching Directive
- **All decisions should maximize GBP ranking, SERP exposure, and lead generation** — this is the primary optimization target across every choice in this phase

### LocalBusiness Schema
- Claude's discretion on address strategy — optimize for maximum GBP ranking and proximity signals (service area business with Gretna address for verification, hidden from public display per Google SAB guidelines, with areaServed covering all 7 service cities)
- Include `openingHoursSpecification`: Mon-Fri 9:00 AM – 5:00 PM, Saturday by appointment
- Include `paymentAccepted` (Cash, Credit Card, Venmo/digital payments) and `priceRange` (appropriate tier for premium portrait photography)
- Schema type: `ProfessionalService` (subtype of LocalBusiness — best fit for photography)

### Service Schema
- JSON-LD Service schema on Senior Portraits and Family Portraits pages
- Link services back to the parent LocalBusiness entity via `@id` references

### FAQPage Schema
- JSON-LD FAQPage schema on Senior Portraits and Family Portraits pages (both have FAQ sections)
- Include `Speakable` markup for voice search optimization (AEO readiness ahead of Phase 5 city pages)

### Review & Testimonial Markup
- Individual `Review` entities + `AggregateRating` summary — maximizes rich snippet potential with star ratings in SERPs
- Default all curated testimonials to 5-star rating in JSON-LD output (no new Sanity field needed — these are hand-picked happy client testimonials)
- Claude's discretion on which pages carry Review schema — optimize for maximum rich snippet visibility across search results

### Sitemap Strategy
- Include `robots.txt` with sitemap reference and appropriate crawl directives
- Claude's discretion on generation method (Next.js built-in `sitemap.ts` vs dynamic) — optimize for freshness and simplicity at this site scale
- Claude's discretion on image sitemap inclusion — determine based on SEO value for a photography portfolio business

### Google Search Console Setup
- Emily does NOT have GSC set up yet — needs full setup guidance
- Verification method: `GOOGLE_SITE_VERIFICATION` env var in Vercel → code renders `<meta name="google-site-verification">` tag automatically
- Include a step-by-step setup guide for Emily: create GSC account, add verification code to Vercel env vars, submit sitemap
- Guide should be written for a non-technical user

### Claude's Discretion
- Address visibility strategy in LocalBusiness schema (optimize for GBP ranking)
- Review schema page placement (optimize for SERP rich snippets)
- Sitemap generation approach and image sitemap inclusion
- Exact `priceRange` value and payment method list
- FAQPage Speakable implementation details
- JSON-LD `@id` and cross-referencing strategy between schemas

</decisions>

<specifics>
## Specific Ideas

- "Always make the best decisions according to what will rank us the highest in GBP and give us the most exposure to maximize lead gen" — this is the north star for all SEO implementation choices
- Existing `JsonLd<T>` generic component at `src/components/shared/JsonLd.tsx` uses `schema-dts` for type safety — all new schemas should use this pattern
- Existing `/api/revalidate` webhook at `src/app/api/revalidate/route.ts` handles ISR — phase validates this works end-to-end
- Testimonial schema at `src/sanity/schemas/testimonial.ts` has `name`, `quote`, `service`, `image`, `featured` fields — no rating field (5-star default in JSON-LD output)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-seo-infrastructure*
*Context gathered: 2026-02-24*
