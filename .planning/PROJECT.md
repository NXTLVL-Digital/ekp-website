# Emily Kathryn Photography — Website Redesign

## What This Is

A conversion-optimized, high-performance website redesign for Emily Kathryn Photography (emilykathryn.com), a senior portrait and family photography studio based in Gretna, VA. The site targets high school seniors (boys and girls) and their parents across South-Central Virginia, built on Next.js/Vercel with a headless CMS for client-managed content.

## Core Value

When a parent or senior in South-Central Virginia searches for portrait photography, Emily Kathryn Photography appears first — and the site converts that visitor into an inquiry within one session.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Conversion-optimized site with persistent "Inquire for Detailed Pricing" CTA
- [ ] Senior-focused homepage appealing to both boys and girls (not just feminine)
- [ ] Senior Portraits service page with gallery and "Starting At" pricing
- [ ] Family Portraits service page with gallery and "Starting At" pricing
- [ ] 7 hyper-local city landing pages with unique SEO copy (250-500 words each)
- [ ] Inquiry form (Name, Email, Grad Year, High School, Style) → email notification
- [ ] CMS-managed content (galleries, copy, scarcity indicators, pricing)
- [ ] Experience Storyboards showing the session journey
- [ ] CMS-managed scarcity cues ("Limited Spring 2026 Slots Remaining")
- [ ] Next.js image pipeline with WebP/AVIF and blur placeholders
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, 100/100 mobile performance
- [ ] Google Business Profile optimization with landing page links
- [ ] Apple Business Connect setup
- [ ] Answer Engine Optimization (40-60 word answer blocks on landing pages)
- [ ] Structured data / JSON-LD for local business and photography services
- [ ] Embedded Google Maps on each city landing page
- [ ] Local NAP+W consistency matching GBP
- [ ] Local testimonials on city pages
- [ ] Brand-voice-consistent copy generated for all pages
- [ ] DNS configuration for Vercel deployment
- [ ] Mobile-first design with 44x44px minimum CTA tap targets

### Out of Scope

- Real-time chat — not needed for inquiry-based model
- Video content hosting — storage/bandwidth complexity, not core to conversion
- OAuth/social login — no user accounts needed
- E-commerce/online payments — inquiry-to-booking model, no direct purchasing
- Blog/content marketing — defer to future milestone
- Booking/scheduling system integration — inquiry form is primary; architecture should not block future addition
- Mobile native app — web-first

## Context

**Current state:** emilykathryn.com exists with content focused on senior girls. Hybrid approach — reuse existing photo assets and brand elements, but new design, new copy, new platform. The brand aesthetic needs modernizing and broadening to include senior boys without losing the editorial quality feel.

**Target audience:**
- **Primary:** Class of 2026/2027 high school seniors (Gen Z) — value authenticity, "editorial/Vogue-style" aesthetics, mobile-first, social sharing
- **Secondary:** Parents (Gen X / Early Millennial) — view senior portraits as legacy milestone, want reliability, stress-free booking, clear value

**Geography:** South-Central Virginia corridor
- **Priority markets:** Chatham (closest to Gretna home base), Danville, Lynchburg, Smith Mountain Lake
- **Secondary markets:** Forest, Altavista, Evington
- Gretna is home office but too small a population to target directly

**Brand voice:** Must match the existing emilykathryn.com voice and carry through all new copy, including the 7 city landing pages we'll generate. Warm, confident, editorial — speaks to both teens and parents.

**Content readiness:**
- Some existing photos and content to reuse (hybrid migration)
- Pricing structure exists and is ready to display
- City landing page copy: we generate in Emily's brand voice
- Experience Storyboard content: mix of existing and placeholder structure for CMS

**Lead capture:** Simple email notification on inquiry form submission. No CRM integration needed. No booking system currently in use.

**External entity setup:** GBP and Apple Business Connect to be set up as part of this project. Anything requiring manual portal access will include step-by-step instructions for the client/team.

## Constraints

- **Tech stack**: Next.js on Vercel (non-negotiable per PRD)
- **CMS**: Sanity CMS or Prismic — to be decided during research phase
- **Performance**: LCP < 2.5s, CLS < 0.1, 100/100 mobile Vercel Speed Insights
- **SEO**: Must support ISR for near-instant content updates from CMS
- **Accessibility**: Mobile-first, 44x44px minimum tap targets
- **Budget**: Free-tier CMS preferred
- **Domain**: emilykathryn.com — DNS needs configuration for Vercel

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Vercel | PRD requirement, best-in-class for image-heavy sites with ISR | — Pending |
| CMS choice (Sanity vs Prismic) | Both viable, research phase will evaluate | — Pending |
| Homepage senior-only focus | Seniors are primary revenue driver; families get own service page | — Pending |
| Gender-inclusive design | Client now photographs boys too; site must not feel exclusively feminine | — Pending |
| Email-only lead capture | Simple, no CRM overhead; can add integration later | — Pending |
| City page copy generation | We write SEO copy in Emily's brand voice rather than waiting for client | — Pending |

---
*Last updated: 2026-02-18 after initialization*
