# Phase 3: Core Pages and Conversion - Context

**Gathered:** 2026-02-22
**Status:** Ready for planning

<domain>
## Phase Boundary

All 8 core pages live with brand-voice copy, the inquiry funnel functional end-to-end (form → Emily's inbox → auto-responder), and the site ready to replace emilykathryn.com as the primary conversion surface. Pages: Homepage, Senior Portraits, Family Portraits, About, Contact, Investment/Pricing, Raves/Testimonials, Senior Style/Wardrobe Guide. Includes spam protection (honeypot + rate limiting) and OG metadata per page.

</domain>

<decisions>
## Implementation Decisions

### Homepage flow
- Hero format, scroll journey order, scarcity cue placement, and testimonial format are all Claude's discretion — informed by the brand board (editorial/magazine aesthetic, Yo Andy + Acrom fonts, black/gold/blush/sage/gray palette), PROJECT.md context, and existing emilykathryn.com patterns
- Hero must be gender-inclusive (boys AND girls) per requirements
- The "Inquire for Detailed Pricing" CTA must be visible in sticky nav and within 2 scrolls on mobile

### Inquiry & conversion
- Form placement strategy: Claude's discretion on whether form lives only on Contact page, appears inline on service pages, or uses a modal pattern
- Auto-responder: Warm tone, thank by name, confirm what they inquired about, set response time expectation of "within 48 hours"
- Persistent CTA copy: Claude's discretion on exact wording (balancing clarity with mobile nav space)

### Pricing presentation
- Session pricing visible on the site: "Starting At" with CMS-managed price per service
- Product package pricing is NOT shown on the website — only shared after Emily's 15-minute discovery conversation
- Use placeholder prices in CMS that Emily updates in Sanity Studio before launch (senior and family prices managed independently)
- Whether to tease product packages on the Investment page: Claude's discretion

### Page content & voice
- Brand voice reference: the existing emilykathryn.com copy IS the voice — Claude studies it and matches that tone
- Voice is "warm, confident, editorial" — speaks to both teens and parents
- About page story angle: Claude's discretion
- Senior Style/Wardrobe Guide: Comprehensive guide with detailed sections — outfit count, color theory, seasonal advice, layering, accessories, what to avoid, and guy-specific tips
- FAQ sections: Distinctly different between Senior and Family pages — Senior FAQs address grad year, outfit changes, group sessions; Family FAQs address kids ages, pets, scheduling logistics
- Raves page layout, Experience Storyboard content, OG metadata strategy: Claude's discretion

### Claude's Discretion
- Hero format and homepage scroll journey (informed by brand board and current site)
- Scarcity cue placement and prominence
- Testimonial display format on homepage
- Form placement strategy (Contact-only vs inline vs modal)
- Persistent CTA exact copy
- Whether Investment page teases product packages
- About page story angle
- Raves page layout
- Experience Storyboard step content
- OG metadata imagery approach

</decisions>

<specifics>
## Specific Ideas

- Emily's response time to inquiries is within 48 hours — auto-responder must set this expectation
- Session shoots start at $400 — this is the "Starting At" anchor. Product packages are the premium upsell revealed only after discovery call
- Senior and Family prices are managed independently in CMS (not assumed same)
- The Style Guide should be a genuine resource, not a thin page — it serves both conversion (demonstrates expertise) and SEO value
- Brand board shows editorial/magazine inspiration (Yo Andy serif + Acrom sans-serif, black/gold/blush/sage/gray palette, quatrefoil and geometric patterns)
- Current emilykathryn.com copy is the voice reference — study it before writing new copy

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-core-pages-and-conversion*
*Context gathered: 2026-02-22*
