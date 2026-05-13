# Discovery Notes — Internal Working Doc

**Prepared:** 2026-05-11 | NXTLVL Digital

## Current site state — emilykathryn.com

### Positioning
- Hero: "Your Story. Beautifully Told."
- Subhead: "Editorial portrait photography with a magazine edge — relaxed, authentic, and designed around you. Serving South-Central Virginia from Chatham to Lynchburg and everywhere in between."
- Primary CTA: "Inquire for Detailed Pricing"
- Brand quote: "Every session should feel like a magazine shoot — not stiff, not rushed, not generic."
- Closing CTA: "Let's Create Something Beautiful"

### Voice
Warm, editorial, confidence-anchored. Uses "magazine-worthy," "authentic," "designed around you." Speaks to both senior and parent. Tone is competent and serene rather than peppy.

### Information architecture (current footer + nav)
Senior Portraits · Family Portraits · Investment · About · Raves · Style Guide · Contact

### Visual treatment
- Dark hero with text overlay (black + cream)
- Editorial sans-serif display (Helvetica-feel) — NOT yet matching the brand-board's serif logotype
- Large vertical image cards alternating with copy
- Numbered services (01 Senior, 02 Family)
- Tile-grid portfolio
- Heavy whitespace, no music/animation noise

### Gaps in current site
- Phone is still placeholder: `(434) XXX-XXXX`
- Address line: `123 Main Street, Gretna, VA 24557` — needs verification
- No blog / journal yet
- No clear product/heirloom positioning beyond starting price hinted at $799
- No city pages despite stated coverage (Chatham, Gretna, Altavista, Lynchburg, Danville)
- No Investment guide download or parent education content
- Logo in footer is a placeholder white box
- Display font does not match brand board's serif "Yo Andy" tone — current font reads more like an Apple/Helvetica system stack
- Hero image is dark and crops off most of subject's body — fights the "magazine shoot" promise
- Service tiles for boys aren't visually present (all portfolio images are girls)

## Brand identity (from Official Brand Board.jpg)

### Logo system
- **Primary:** "emily kathryn" set in a tall, condensed editorial serif (Yo Andy or analog) with "PHOTOGRAPHY" in spaced caps Acrom underneath
- **Alternate:** stacked "emily / kathryn" + PHOTOGRAPHY
- **Submark:** "ek." in a circular outline + "EMILY KATHRYN PHOTOGRAPHY" in arc'd caps below

### Color palette (locked)
| Role | Hex | Use |
|---|---|---|
| Black | `#000000` | Type, anchors, deep backgrounds |
| Warm Gold | `#C2A36C` | Premium accent, rules, buttons |
| Blush | `#DCB6AD` | Feminine warmth, soft backgrounds |
| Aqua/Mint | `#B3D4CD` | Freshness, youth, secondary accent |
| Soft Gray | `#D6D4D4` | Neutral balance, dividers |

### Type system
- Yo Andy (display serif) — tall, fashion-magazine elegance
- Acrom (geometric sans) — clean UI/body
- *Note:* Yo Andy is a free script-display hybrid; for production we'll need web-safe substitutes (Cormorant Garamond, Italiana, or DM Serif Display for the Yo Andy feel; Inter or Manrope for Acrom).

### Patterns
- Gold quatrefoil/Moroccan lattice
- Light geometric/hexagonal outline pattern

### Style inspirations on brand board
- Editorial fashion (Twiggy magazine cover)
- Black/gold accessories
- Mint-blush femininity
- Pink ranunculus — romantic, soft

## Strategic interpretation for the 3 concepts

The brand identity is decidedly **feminine, editorial, and feminine-luxury** — but per Jeff and the project requirements, the audience now includes **senior boys**. The challenge: hold onto the editorial elegance while making the site feel **gender-inclusive**, **style-relevant to Gen Z**, and **buyer-credible to Gen X parents**.

Three concept directions that solve this differently:
1. **Editorial Heirloom (Concept A)** — leans into the existing magazine/Vogue DNA. Parent-trust-forward, archive-aesthetic. Black + gold + cream. Boys-inclusive through styling and casting, not by changing the system.
2. **Modern Muse (Concept B)** — Gen-Z forward energy. Bolder type, oversized imagery, gentle motion. More aqua/mint with cream. Speaks to seniors first, parents second.
3. **Boutique Atelier (Concept C)** — quiet luxury, gallery-white, minimal type. Restrained, archival, "studio mark" rather than "magazine cover." For the most discerning buyer.

## Decisions made (continuing without checkpoint)
- Output folder: `deliverables/2026-05-11-ekp-premium-package/`
- PDFs use a unified Emily Kathryn template (cover + interior pages) built before any other PDF renders
- Web mockups: static HTML/CSS/JS, fully responsive, clickable navigation across all pages, mobile menu, hover states
- Each concept ships with 7 pages: Home, About, Senior Portraits, Family Portraits, Investment, Portfolio, Journal (blog), Contact — that's 8, blog brings total above the 7-page maximum as requested
- Placeholder imagery uses elegant unsplash/CDN portrait imagery sized at premium aspect ratios; final build swaps in EKP's real portfolio
- Phone, NAP details kept as bracketed placeholders for the client to confirm before launch
