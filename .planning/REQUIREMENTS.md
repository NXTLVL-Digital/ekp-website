# Requirements: Emily Kathryn Photography

**Defined:** 2026-02-18
**Core Value:** When a parent or senior in South-Central Virginia searches for portrait photography, Emily Kathryn Photography appears first — and the site converts that visitor into an inquiry within one session.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Site built on Next.js with App Router, deployed to Vercel
- [ ] **FOUND-02**: Sanity v4 CMS with embedded Studio at /studio for client content management
- [ ] **FOUND-03**: Next.js image pipeline with WebP/AVIF format selection, blur placeholders (Sanity LQIP), and lazy loading
- [ ] **FOUND-04**: ISR with tag-based revalidation via Sanity webhook for near-instant CMS updates
- [ ] **FOUND-05**: Mobile-first responsive design with gender-inclusive editorial aesthetic
- [ ] **FOUND-06**: 44x44px minimum tap targets on all interactive elements
- [ ] **FOUND-07**: DNS configured for emilykathryn.com on Vercel

### Performance

- [ ] **PERF-01**: LCP under 2.5 seconds on mobile
- [ ] **PERF-02**: CLS under 0.1
- [ ] **PERF-03**: 100/100 mobile performance score on Vercel Speed Insights
- [ ] **PERF-04**: Hero images use `priority` loading with accurate `sizes` props

### Pages — Core

- [ ] **PAGE-01**: Homepage — senior-focused hero (boys AND girls), portfolio preview grid, testimonials, scarcity cue, persistent CTA
- [ ] **PAGE-02**: Senior Portraits service page — gallery, session description, Experience Storyboard, "Starting At" pricing, FAQ section, CTA
- [ ] **PAGE-03**: Family Portraits service page — gallery, session description, "Starting At" pricing, FAQ section, CTA
- [ ] **PAGE-04**: About page — Emily's professional photo, personal story, photography philosophy
- [ ] **PAGE-05**: Contact page — inquiry form as primary element, business info, service area
- [ ] **PAGE-06**: Investment/Pricing page — package overview with "Starting At" pricing for each service, what's included, CTA to inquire
- [ ] **PAGE-07**: Raves/Testimonials page — dedicated page with client reviews, photos where available
- [ ] **PAGE-08**: Senior Style/Wardrobe Guide page — outfit tips, color recommendations, seasonal advice, layering suggestions

### Pages — Local SEO

- [ ] **LOCAL-01**: Chatham VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-02**: Danville VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-03**: Lynchburg VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-04**: Smith Mountain Lake VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-05**: Forest VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-06**: Altavista VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed
- [ ] **LOCAL-07**: Evington VA landing page — unique 250-500 word SEO copy, local testimonials, Google Maps embed, city-specific gallery, AEO answer block, JSON-LD with areaServed

### Galleries

- [ ] **GALL-01**: Senior Portraits gallery with masonry/grid layout, CMS-managed images
- [ ] **GALL-02**: Family Portraits gallery with masonry/grid layout, CMS-managed images
- [ ] **GALL-03**: Location-based portfolio galleries (mirroring current site's geographic gallery structure)
- [ ] **GALL-04**: Responsive lightbox with keyboard nav, swipe gestures, image counter, escape-to-close

### Conversion

- [ ] **CONV-01**: Inquiry form with fields: Name, Email, Phone (optional), Service Type dropdown, Grad Year (conditional on Senior), High School (conditional on Senior), "Tell us about your dream session" text area
- [ ] **CONV-02**: Inquiry form submissions send email notification to Emily
- [ ] **CONV-03**: Auto-responder email sent ~10 minutes after inquiry submission
- [ ] **CONV-04**: Persistent "Inquire for Detailed Pricing" CTA button in navigation bar and as high-contrast button on every page
- [ ] **CONV-05**: "Starting At" pricing displayed on Senior Portraits and Family Portraits service pages
- [ ] **CONV-06**: CMS-managed scarcity cues ("Limited Spring 2026 Slots Remaining") with visibility toggle
- [ ] **CONV-07**: Client testimonials displayed on homepage, service pages, and city landing pages (CMS-managed)

### Content & Experience

- [ ] **CONT-01**: Experience Storyboards on Senior Portraits page showing session journey (Consultation > Wardrobe Planning > Session Day > Gallery Reveal > Product Delivery)
- [ ] **CONT-02**: FAQ sections on service pages addressing: pricing, session length, outfit count, locations, turnaround time, digital vs prints
- [ ] **CONT-03**: All page copy written in Emily's existing brand voice — warm, confident, editorial
- [ ] **CONT-04**: SEO copy generated for all 7 city landing pages (250-500 words each) with genuine local references (not template-swapped)

### SEO & Structured Data

- [ ] **SEO-01**: JSON-LD LocalBusiness schema (service area business — no physical address displayed) on all pages
- [ ] **SEO-02**: JSON-LD Service schema for Senior Portraits and Family Portraits
- [ ] **SEO-03**: JSON-LD FAQPage schema on pages with FAQ sections
- [ ] **SEO-04**: JSON-LD Review schema for testimonials
- [ ] **SEO-05**: AEO answer blocks (40-60 words) on each city landing page targeting local queries
- [ ] **SEO-06**: Google Maps embed centered on each target city on its landing page
- [ ] **SEO-07**: Canonical NAP+W (Name, Address, Phone, Website) consistency across all pages — single config source of truth
- [ ] **SEO-08**: XML sitemap generation with all pages
- [ ] **SEO-09**: OG metadata and social sharing images per page

### External Platforms

- [ ] **EXT-01**: GBP setup as service area business — provide Gretna address to Google for verification/proximity ranking but hide from public display, list all 7 service area cities, link landing pages, step-by-step guide for manual portal steps
- [ ] **EXT-02**: Apple Business Connect setup as service area business, step-by-step guide for manual portal steps

### Infrastructure

- [ ] **INFRA-01**: Email delivery via Resend for inquiry notifications and auto-responder
- [ ] **INFRA-02**: Sanity webhook to trigger ISR revalidation on content changes
- [ ] **INFRA-03**: Form spam protection (honeypot + rate limiting)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Marketing

- **V2-01**: Blog/content marketing system (only if Emily commits to regular publishing cadence)
- **V2-02**: Video testimonials integration

### Integrations

- **V2-03**: CRM integration (HoneyBook, Dubsado) for inquiry form submissions
- **V2-04**: Booking/scheduling system integration (Acuity, Calendly)

### Expanded Services

- **V2-05**: Additional service pages if Emily expands offerings (headshots, branding, etc.)
- **V2-06**: Client resource center (session prep guides, timeline planners)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online booking/scheduling system | Emily qualifies leads personally; high-touch consultative model. Architecture won't block future addition |
| Client gallery proofing portal | Post-session delivery tool, not marketing. Use Pixieset/ShootProof separately |
| E-commerce / print shop | Emily's model is consultation-based with in-person product reveals |
| Video backgrounds/hero videos | Destroys page load performance (5MB+ = LCP > 4s). Static hero with blur placeholder instead |
| Instagram feed embed | Adds 500KB-1MB JS, tanks performance. Curated CMS gallery instead, link to Instagram in footer |
| Real-time chat widget | Emily is solo and often on shoots. Unanswered chat worse than no chat. FAQ + fast inquiry response instead |
| Music/audio on galleries | Universally disliked UX. Accessibility violation. Let photography speak for itself |
| Excessive animations/parallax | CLS failures, motion sickness, slower load. Subtle micro-interactions only |
| Mobile native app | Web-first, no app needed for this business model |
| Blog (v1) | Content commitment Emily may not sustain. Dead blog signals neglect. City pages provide SEO value without maintenance burden |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| *(Updated during roadmap creation)* | | |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 0
- Unmapped: 44 ⚠️

---
*Requirements defined: 2026-02-18*
*Last updated: 2026-02-18 after initial definition*
