# Emily Kathryn Photography — Premium Brand & Web Design Package

**Prepared:** May 11, 2026 · NXTLVL Digital

A complete strategic + design package for Emily Kathryn Photography. Six research and brand deliverables, three distinct website concepts, a reusable EKP-branded PDF template, and a working brief.

---

## How to Read This Package

Open the deliverables in the order below. Each one builds on the one before it.

1. **Discovery Notes** → `research/00-discovery-notes.md`
   Internal working notes. Audit of the current site, brand board interpretation, and the strategic frame the three concepts were designed against.

2. **Market Research** → `research/01-market-research.md` + `.pdf`
   Comprehensive analysis of the senior + family portrait market across the Danville–Lynchburg–Smith Mountain Lake corridor. Local population data, senior school enrollment, industry pricing benchmarks, Gen Z consumer behavior, and five named market opportunities with revenue math.

3. **Competitor Analysis** → `research/02-competitor-analysis.md` + `.pdf`
   Profiles of 13 direct local competitors and 5 national/aspirational benchmarks. Pricing inferred with confidence labels. Strategic takeaways: where to win, where to invest, where not to compete.

4. **Customer Avatars** → `research/03-customer-avatar.md` + `.pdf`
   Three named avatars — Rachel (Memory-Keeper Mom, primary), Ella (Style-Aware Senior, influencer), and Maren (Lake-House Mom, untapped). Voice-of-customer language, decision processes, product preferences, willingness-to-pay anchors.

5. **Brand Guide** → `research/04-brand-guide.md` + `.pdf`
   Refined working brand guide built on the existing Brand Board. Logo system, color palette with hex/CMYK/RGB, type system with web-safe substitutes, photography direction, voice and tone with do/don't examples, and layout principles.

6. **Three Website Concepts** → `concept-a-editorial-heirloom/`, `concept-b-modern-muse/`, `concept-c-boutique-atelier/`
   Three visually distinct, fully clickable, responsive website concepts. Each is built as 8 HTML pages (Home, About, Senior, Family, Investment, Portfolio, Journal, Contact). Open `index.html` in each folder to start clicking through.

---

## The Three Concepts at a Glance

| Concept | Position | Primary Audience | Headline Voice |
| --- | --- | --- | --- |
| **A — Editorial Heirloom** | Premium magazine-meets-fine-art gallery. Closest to current DNA, elevated. | Parent buyer (Rachel) first | *"Portraits made for the wall, not the phone."* |
| **B — Modern Muse** | Gen-Z forward, contemporary fashion-editorial energy. Aqua/mint accent. | Senior (Ella) first, parent second | *"Senior year is the cover. Let's shoot it like one."* |
| **C — Boutique Atelier** | Quiet-luxury, gallery-white, ultra-minimal. The Row / Khaite reference. | Discerning luxury buyer (Maren) | *"A portrait studio for seniors and families."* |

Each concept includes a `_rationale.md` doc inside its folder explaining the design system, page-by-page breakdown, where it wins, where it takes risk, and what would need to be truthful at launch.

## Strategic Recommendation

If forced to ship one today, **Concept A** is the safest bet — it converts Rachel-buyers most reliably and feels parent-immediately credible. **Concept B** has the highest senior-engagement ceiling and would compound a Class-of-2028 ambassador program. **Concept C** unlocks the Smith Mountain Lake vertical and competes with national luxury photographers rather than local ones.

The smart 24-month plan: ship Concept A this summer. Use the year to build out the SML portfolio and the IPS/heirloom product story. Revisit Concept C as the studio matures into upper-boutique pricing.

---

## Package Structure

```
2026-05-11-ekp-premium-package/
├── README.md                                      ← you are here
│
├── research/
│   ├── 00-discovery-notes.md                      ← internal working doc
│   ├── 01-market-research.md / .pdf               ← deliverable 1
│   ├── 02-competitor-analysis.md / .pdf           ← deliverable 2
│   ├── 03-customer-avatar.md / .pdf               ← deliverable 3
│   └── 04-brand-guide.md / .pdf                   ← deliverable 4
│
├── templates/
│   └── ekp_pdf_template.py                        ← reusable EKP PDF renderer
│       (all four PDFs above render against this template)
│
├── concept-a-editorial-heirloom/
│   ├── _rationale.md                              ← design rationale
│   ├── _build.py                                  ← regeneration script
│   ├── index.html · about.html · senior.html
│   ├── family.html · investment.html · portfolio.html
│   ├── journal.html · contact.html                ← 8 clickable pages
│   └── _preview-home.pdf                          ← static preview render
│
├── concept-b-modern-muse/
│   └── (same structure as concept-a)
│
└── concept-c-boutique-atelier/
    └── (same structure as concept-a)
```

---

## Website Concepts — How to View

Open any concept's `index.html` directly in a browser. The navigation links work between pages, the mobile menu opens, the contact form has demo submit handling, the FAQ accordions expand, and the design is fully responsive across mobile, tablet, and desktop.

Every concept uses Unsplash CDN imagery as placeholder portraits — these are licensed for free use and serve as a stand-in for EKP's real portfolio. Before any concept goes live, the placeholder images should be swapped for actual EKP portrait work, with at least 18–24 senior boy portraits added to honor the gender-inclusive positioning.

To regenerate any concept's pages after editing content or styles, `cd` into the concept folder and run `python3 _build.py`.

## PDF Template

All four research PDFs render through `templates/ekp_pdf_template.py`. Any future PDF (collection guide, investment guide, client welcome packet) should use this same renderer to maintain the coordinated brand presentation. Calling pattern:

```python
from ekp_pdf_template import render_pdf
render_pdf(
    markdown_path="some-source.md",
    output_pdf_path="some-source.pdf",
    doc_number="05",
    doc_title="Document Title",
    doc_subtitle="One-line subtitle in italic serif.",
    prepared_date="May 11, 2026",
)
```

Web-safe font substitutes (Italiana for Yo Andy, Cormorant Garamond for serif body, Inter for Acrom) are pulled from Google Fonts and embedded in the rendered PDFs. The cover layout uses a black band + gold rule + large numeric "issue" mark + tall editorial serif title + italic subtitle + circular "ek." submark.

---

## Decisions Made During Execution

These choices were made by the design team in the interest of shipping a coherent package — they should be reviewed during the next pass:

- **Phone number, email, and address** are placeholder values throughout. The current emilykathryn.com still shows `(434) XXX-XXXX` and `123 Main Street, Gretna, VA 24557` — both need to be verified before launch.
- **Class of 2027 booking window** is referenced throughout as "open" and Class of 2028 as "opens January 2027." Adjust if those windows are different.
- **Senior session investment** is anchored at $799 starting per the existing site. Family begins at $899. Heirloom collection averages $2,400. All are based on existing positioning and competitive pricing analysis.
- **Smith Mountain Lake family vertical** is positioned as an active service in all three concepts. If EKP isn't ready to market this yet, the SML sections can be trimmed back during the launch pass.
- **Senior boy portfolio depth** is currently visual placeholder. Before launch, at least 18–24 real senior boy portraits should populate the boys section of each concept.

---

## Next Steps

1. Review all four research PDFs with the client.
2. Pick a concept direction (or hybrid).
3. Verify NAP, booking windows, pricing.
4. Commission a senior-boy model-call session to seed the boys portfolio.
5. Migrate the chosen concept into the production Next.js + Sanity codebase.
6. Set up IPS workflow and product menu before launch.

---

*This package was prepared by NXTLVL Digital for Emily Kathryn Photography on May 11, 2026.*
