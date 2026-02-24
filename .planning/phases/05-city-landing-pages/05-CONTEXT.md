# Phase 5: City Landing Pages - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 7 unique local SEO landing pages for Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, and Evington. Each page gets genuinely unique copy, a city-specific gallery, local testimonials, an AEO answer block, a Google Maps embed (facade pattern), and city-specific LocalBusiness JSON-LD with geo coordinates. No two pages share more than 40% identical content. All 7 URLs appear in the sitemap.

</domain>

<decisions>
## Implementation Decisions

### Page layout and sections
- Text-focused hero with overlay — bold headline like "Senior Portraits in [City], VA" over a branded background or subtle image. No city-specific hero photo required.
- Both Senior Portraits and Family Portraits mentioned on every city page with links to the main service pages
- Section order and overall page feel (compact vs. immersive) at Claude's discretion — optimize for local SEO conversion

### Copy voice and local flavor
- Claude writes all 7 city pages in Emily's brand voice — Emily reviews and edits after
- Local references should focus on city character and vibe (revitalized districts, rolling farmland, lake life) — not specific shoot locations or parks
- Tiered word count by market size: bigger markets (Lynchburg, Danville) get ~500 words, smaller towns (Altavista, Evington, Forest) get ~250-300 words, mid-tier (Chatham, Smith Mountain Lake) in between
- All city copy lives in Sanity CMS so Emily can edit without developer help

### Gallery and testimonial sourcing
- Medium gallery grid: 8-12 images per city page
- Plan for flexibility — don't assume photos are pre-organized by city. Emily assigns any photos to any city in the CMS. Some cities may share photos initially.
- Testimonials: city-specific preferred, regional fallback. If no testimonial is tied to a specific city, show a regional one labeled "South-Central Virginia" rather than the city name.
- Testimonial count per page at Claude's discretion

### AEO answer block
- Separate CMS field in the city schema — Emily can tweak the 40-60 word answer snippet independently of the main body copy
- Targets both services: "portrait photographer in [City] VA" (not senior-only)
- Uses business name: "Emily Kathryn Photography serves [City]..." — not first-name casual
- Visual presentation at Claude's discretion

### Claude's Discretion
- Section order and flow (hero, AEO, copy, gallery, testimonials, map, CTA — exact order flexible)
- Overall page feel (compact landing page vs. more immersive)
- AEO block visual treatment (callout box, integrated into hero, etc.)
- Testimonial count per page
- Gallery layout style (grid, masonry, strip)
- Loading skeleton and error state designs
- Exact spacing, typography, and responsive breakpoints

</decisions>

<specifics>
## Specific Ideas

- Hero is text-focused with overlay — keep it simple, strong headline with city name, no need for 7 unique hero photos
- City differentiation comes from copy character (vibe, personality of each town) not from cookie-cutter landmark lists
- The CMS should make it easy for Emily to manage everything: swap photos, edit copy, update testimonials, tweak AEO blocks — all without touching code
- Regional testimonial fallback should be transparent (labeled "South-Central Virginia") not misleading

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-city-landing-pages*
*Context gathered: 2026-02-24*
