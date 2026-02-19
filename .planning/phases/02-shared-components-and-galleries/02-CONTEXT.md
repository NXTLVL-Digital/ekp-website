# Phase 2: Shared Components and Galleries - Context

**Gathered:** 2026-02-19
**Status:** Ready for planning

<domain>
## Phase Boundary

All reusable visual components — gallery grid, lightbox, JSON-LD patterns, pricing cards, storyboard, scarcity cue, answer block — built, tested with real CMS content, and meeting Core Web Vitals targets. These components are consumed by Phase 3 (Core Pages) and Phase 5 (City Pages).

</domain>

<decisions>
## Implementation Decisions

### Gallery presentation
- Claude's discretion on grid style (masonry vs uniform), column counts, and responsive breakpoints
- Images must display beautifully — vibrant, high-quality rendering is the priority
- Gallery should feel easy to browse, not overwhelming

### Lightbox experience
- Claude's discretion on background treatment, transitions, caption display, and thumbnail navigation
- Must support arrow key navigation, mobile swipe, image counter, and Escape to close (per success criteria)
- Should feel polished and modern — not a generic modal

### Pricing & scarcity display
- Claude's discretion on PricingCard layout, ScarcityCue presentation, and Storyboard pattern
- Scarcity cues should be attention-grabbing but not pushy — photography clients expect warmth, not hard sells
- Pricing cards should clearly communicate "Starting At" pricing with a path to inquire

### Component visual tone
- Beautiful and vibrant — not minimal/stark, not cluttered
- Consistent with Emily Kathryn brand (warm gold accent, editorial fonts established in Phase 1)
- Components should feel premium — a portrait photography brand serving families and seniors

### Sanity Studio customization
- Every visual component must have meaningful Sanity schema fields so Emily can customize content without developer help
- Emily is not tech savvy — Sanity field labels must be plain English, descriptions must explain what each field does
- Provide toggle/select options where possible rather than requiring free-form text for layout choices
- Example: gallery should let Emily choose display style, reorder images, add captions — all from Studio

### Claude's Discretion
- All visual design decisions (layout patterns, spacing, animations, hover effects, transitions)
- All component architecture decisions (Server/Client boundaries, prop interfaces)
- All Sanity schema design (field types, validation rules, default values)
- JSON-LD component patterns and schema-dts integration
- Core Web Vitals optimization approach
- AnswerBlock and FAQ display patterns

</decisions>

<specifics>
## Specific Ideas

- "Easy to navigate with plenty of options for customization" — Emily should be able to meaningfully change how components display from Sanity Studio
- "User friendly for this client who is not tech savvy" — Sanity Studio experience must be intuitive with clear labels and descriptions
- "Beautiful and vibrant design" — lean into the warm, premium photography brand; components should showcase images as the hero content
- Brand foundation from Phase 1: warm gold (#C6A96C), editorial fonts (Playfair Display + Lato), Tailwind v4 theme tokens

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-shared-components-and-galleries*
*Context gathered: 2026-02-19*
