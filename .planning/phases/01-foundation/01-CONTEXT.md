# Phase 1: Foundation - Context

**Gathered:** 2026-02-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js + Sanity + Vercel scaffolding with the image optimization pipeline (LQIP, WebP/AVIF, priority loading), ISR revalidation, NAP+W single source of truth, and root layout (nav/footer). This is the shell every future page lives inside. No content pages are built in this phase — only the infrastructure and site-wide wrapper.

</domain>

<decisions>
## Implementation Decisions

### Navigation & header
- Full navigation with all page links: Senior Portraits, Family Portraits, Investment, About, Raves, Style Guide, Contact — plus CTA button
- "Inquire for Detailed Pricing" CTA button present in nav on all pages
- Logo uses primary brand mark ("emily kathryn photography")

### Footer layout
- Rich footer: logo, NAP info, social links, secondary nav links, brand tagline, copyright
- Social links: Instagram, Facebook, TikTok (all three platforms)
- Full business address displayed in footer (Gretna, VA street address) for maximum local SEO
- Secondary nav links mirror main nav for accessibility/SEO

### Brand aesthetic
- White + black dominant palette — photography takes center stage, clean uncluttered backgrounds
- Brand colors (gold #c2a36c, dusty rose #dcb6ad, sage #b3d4cd, gray #d6d4d4) used as accents only
- **Critical direction: Less feminine than current site** — gender-inclusive editorial aesthetic per FOUND-05
- Replace Yo Andy (decorative serif) with a modern editorial serif (Didone-style or clean serif) for headings — keeps editorial feel without ornate femininity
- Acrom (sans-serif) remains for body text and UI elements
- Brand assets: mostly derived from the brand board image; only a couple of logo files exist separately. Colors, patterns, and fonts must be sourced/matched from the board.

### Emily's CMS experience
- Emily is moderately tech-comfortable (Squarespace/Wix level)
- Emily edits content only: photos, testimonials, FAQ answers, scarcity cue text, page copy — structure and layout are locked by developer
- Sanity Studio shows full view organized by category sections — Emily can browse all content types, but technical schemas are clearly labeled and separated
- Jeff handles ongoing site maintenance — Emily does content updates only
- No need for extensive self-service documentation; Emily can ask Jeff for structural changes

### Claude's Discretion
- Nav sticky behavior (scroll-aware hide/show vs always sticky — optimize for mobile conversion)
- Mobile menu pattern (hamburger + slide-out vs full-screen overlay — match editorial aesthetic)
- CTA button styling (match brand aesthetic — balance visibility with editorial refinement)
- Footer CTA inclusion (decide based on conversion best practices)
- Gold (#c2a36c) usage — use where impactful but keep gender-neutral; don't overuse
- Brand board patterns — determine if/where subtle geometric patterns add value without adding femininity
- Heading serif font selection — pick a modern editorial serif that replaces Yo Andy while matching the brand's premium feel

</decisions>

<specifics>
## Specific Ideas

- "We do not want this website to be as feminine as the current design" — the brand board leans feminine (rose, gold, ornate fonts, quatrefoil patterns) but the web implementation should pull back significantly toward gender-inclusive editorial
- The current site's aesthetic is what we're moving AWAY from in terms of femininity level
- Style inspirations from the brand board suggest fashion-magazine editorial direction — lean into the editorial, pull back on the feminine
- Logo files exist for primary and alternate marks; everything else (colors, fonts, patterns) must be extracted from the brand board JPG

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-18*
