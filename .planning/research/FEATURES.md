# Feature Research

**Domain:** Senior portrait / family photography local business website
**Researched:** 2026-02-18
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **High-quality portfolio galleries** | Visitors judge a photographer entirely by their work; galleries are the product demo | MEDIUM | Organized by service type (seniors, families). Masonry or grid layout. Must load fast with blur placeholders and lazy loading. 25-50 images per gallery page max for performance. |
| **Mobile-responsive design** | 80% of local searches happen on mobile. Gen Z audience is mobile-native | LOW | Mobile-first, not mobile-adapted. 44x44px minimum tap targets. Hamburger nav. Full-width images on small screens. |
| **Clear contact/inquiry form** | Visitors who want to book need an obvious path. No form = no leads | LOW | Minimal fields: Name, Email, Phone (optional), Service Type, Message. Fewer fields = higher conversion (reducing from 4 to 3 fields can boost conversions 50%). Button text should be specific ("Send My Inquiry") not generic ("Submit"). |
| **About page with photographer photo** | Clients hire a person, not a business. Humanization builds trust. Testimonials with photos increased conversions 34% | LOW | Professional headshot, personal story, philosophy. Warm and approachable tone. This page is second-most visited after homepage for service businesses. |
| **Service pages (Seniors + Families)** | Visitors need to understand what you offer and whether it matches their needs | MEDIUM | Separate page per service type. Each includes: gallery samples, session description, what's included, "Starting At" pricing, and a CTA to inquire. |
| **"Starting At" pricing display** | Transparent pricing pre-qualifies leads and reduces tire-kicker inquiries. Hiding pricing entirely causes visitors to bounce to competitors who show it | LOW | Show "Starting At $X" with a list of what's included at that tier. Does not need full pricing breakdown -- that happens during consultation. Filters out budget-mismatched leads while still requiring inquiry for details. |
| **Client testimonials** | Social proof is the single most important trust signal for service businesses. 5+ reviews increase purchase likelihood by 4x | LOW | Real names, real photos where possible. Placed on homepage, service pages, and city landing pages. Minimum 3 on homepage. Pull from Google reviews where available. |
| **Fast page load (Core Web Vitals)** | Google ranks slow sites lower. Visitors bounce at 3+ seconds. Photographers lose leads they never see | HIGH | LCP < 2.5s, CLS < 0.1. Next.js image optimization with WebP/AVIF, blur placeholders, lazy loading, CDN delivery via Vercel. This is hard for image-heavy sites -- requires disciplined image pipeline. |
| **Local SEO fundamentals** | Most photography clients find their photographer through local search ("senior photographer near me") | MEDIUM | NAP consistency, LocalBusiness JSON-LD structured data, Google Maps embeds, geographic keywords in titles/meta/headings. |
| **Persistent CTA** | Visitors should never be more than one scroll away from taking action | LOW | Sticky header or floating button with "Inquire for Detailed Pricing" visible on every page. Must not be intrusive on mobile. |
| **FAQ section** | Parents especially want answers before they commit. Common questions: How long is the session? How many outfits? When do I get photos? | LOW | On service pages and/or dedicated FAQ page. Structured as Q&A for AEO/featured snippet eligibility. Address: pricing, session length, outfit count, location options, turnaround time, digital files vs prints. |
| **Responsive image lightbox** | Visitors expect to click gallery images and view them large. Keyboard nav, swipe gestures, pinch-to-zoom on mobile | MEDIUM | Arrow keys, escape to close, swipe on mobile, image counter ("3 of 24"). Smooth transitions. Must not break back-button behavior. |

### Differentiators (Competitive Advantage)

Features that set Emily Kathryn apart from VA competitors like Matthew Cost Photography (WordPress/Elementor, generic layout) and typical Pixieset/ShowIt sites. Not required, but these win bookings.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Experience Storyboards** | Walks prospects through the session journey (before, during, after) in a visual timeline. Reduces anxiety for first-time senior portrait clients and their parents. None of the VA competitors analyzed offer this | MEDIUM | Visual step-by-step: Consultation > Wardrobe Planning > Session Day > Gallery Reveal > Product Delivery. CMS-managed so Emily can update copy and images. Addresses the parent question "What does the process look like?" |
| **7 hyper-local city landing pages** | Competitors target "Lynchburg photographer" broadly. Emily targets Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, and Evington specifically. Captures long-tail local search traffic most competitors miss | HIGH | Each page needs: unique 250-500 word SEO copy, local testimonials, embedded Google Map, city-specific gallery samples, structured data with areaServed, AEO answer block (40-60 words). Cannot be boilerplate with city name swapped -- Google penalizes thin/duplicate location pages. |
| **CMS-managed scarcity cues** | "Limited Spring 2026 Senior Slots Remaining" creates urgency. Scarcity + urgency are proven conversion drivers (FOMO). Emily can update these seasonally without developer involvement | LOW | CMS field for scarcity message text, toggle for visibility, optional date-based auto-hide. Placed on homepage hero, service pages, and inquiry form. Must be honest -- fake scarcity backfires. |
| **Answer Engine Optimization (AEO) blocks** | 70% of searches projected to result in zero clicks by end of 2026. AEO blocks position Emily's content as the direct answer in Google featured snippets and AI overviews | MEDIUM | 40-60 word answer paragraphs at the top of city landing pages and FAQ sections. Format: question as H2/H3, concise answer immediately below. Target queries like "How much do senior portraits cost in Danville VA?" and "Best senior portrait photographer near Chatham Virginia." |
| **Dual-audience design (Gen Z + Gen X parents)** | Most senior photographer sites skew heavily feminine/teen or heavily parent-focused. Emily needs to speak to both: the senior who wants editorial/Vogue aesthetics AND the parent who wants reliability and clear value | HIGH | Design challenge: editorial, high-fashion feel that also communicates professionalism and trustworthiness. Not "cute" -- sophisticated. Gender-inclusive (boys AND girls). This is a design/UX challenge more than a technical one. |
| **Senior Style/Wardrobe Guide** | Reduces pre-session anxiety, positions Emily as an expert, and drives additional page views + time on site. Many successful senior photographers (Anna Brace, Pasha Belman) feature these prominently | MEDIUM | CMS-managed guide with outfit tips, color recommendations, layering suggestions, what to avoid. Organized by season or style category. Can be a standalone page or section within the Senior Portraits service page. Drives organic traffic for "what to wear senior pictures" queries. |
| **Google Business Profile optimization** | GBP accounts for 32% of local pack ranking. Competitors often have incomplete profiles. Photos on GBP increase views 200-300% | LOW | Not a website feature per se, but the website must support it: landing page URLs for each service, geotagged images, consistent NAP, review links. Step-by-step guide for Emily to maintain. Weekly photo uploads recommended. |
| **Apple Business Connect** | Free visibility across Apple Maps, Photos, Wallet, Siri. Most small photographers have not claimed this. Easy competitive advantage in the Apple ecosystem | LOW | Register at businessconnect.apple.com. Link to website, upload photos, set hours. Provides visibility to iPhone users searching in Maps/Siri -- significant given Emily's Gen Z audience. |
| **Structured data / JSON-LD** | Enables rich results in Google (star ratings, pricing, business info). Most VA competitor photographer sites lack proper schema markup | MEDIUM | Implement: LocalBusiness (with PhotographyBusiness or ProfessionalService subtype), FAQPage, Service, ImageGallery, Review. Include areaServed for each city. Validate with Google Rich Results Test. |
| **Inquiry form with smart fields** | Grad Year + High School fields help Emily immediately understand the lead and personalize her response. Style preference field signals what kind of session the client wants | LOW | Fields: Name, Email, Phone (optional), Service (Senior/Family dropdown), Grad Year (conditional on Senior), High School (conditional on Senior), Preferred Style or "Tell me about your dream session" open text. Auto-responder fires ~10 minutes after submission (feels personal, not robotic). |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for this specific project.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Online booking/scheduling system** | Seems efficient, reduces back-and-forth | Removes Emily's ability to qualify leads and set expectations. Senior portrait photography is high-touch -- clients expect a consultative conversation, not a Calendly link. Also adds system complexity and monthly cost | Inquiry form that captures key info, then Emily responds personally. Architecture should not block future Acuity/Calendly integration if she later wants it. |
| **Blog/content marketing** | SEO benefits, positions as expert, drives traffic | Significant ongoing content commitment Emily may not sustain. A dead blog (last post 8 months ago) signals neglect worse than no blog at all. City landing pages and FAQ content provide the SEO value without the maintenance burden | City landing pages with unique SEO content, FAQ sections with AEO blocks, wardrobe guide. These are "set and update occasionally" not "publish weekly." Defer blog to future milestone only if Emily commits to content cadence. |
| **Client gallery proofing portal** | Clients need to see and select their photos | Out of scope -- this is a post-session delivery tool, not a marketing website feature. Adds authentication, storage, payment complexity. Existing tools (Pixieset, ShootProof) handle this better as standalone products | Link to external proofing gallery from post-session email. Keep the marketing website focused on conversion, not delivery. |
| **Video backgrounds/hero videos** | Feels premium and modern | Destroys page load performance. A 5MB hero video means LCP > 4s on mobile. Conflicts directly with the Core Web Vitals target. Video hosting adds bandwidth costs | High-quality static hero image with WebP/AVIF compression and blur placeholder. Consider a subtle CSS animation or parallax effect for visual interest without the performance penalty. |
| **Instagram feed embed** | Shows "latest work" and social proof automatically | Third-party embed adds 500KB-1MB of JavaScript, tanks performance. Feed can show off-brand content (personal posts, reels). Creates dependency on Instagram's embed API stability | Curated gallery managed through CMS. Emily selects her best work deliberately rather than showing whatever Instagram's algorithm surfaces. Link to Instagram in footer/social icons. |
| **E-commerce / print shop** | Sell prints directly from the website | Massive scope increase: cart, payments, fulfillment, shipping, inventory. Emily's model is consultation-based with in-person product reveals. Print sales happen after sessions through gallery proofing | Keep inquiry-to-consultation model. Print/product sales happen through ShootProof or similar post-session tool. |
| **Real-time chat widget** | Immediate response to visitor questions | Emily is a solo photographer, often on shoots. Unanswered chat creates worse impression than no chat. Adds JavaScript weight. The inquiry model works better -- qualified leads fill out the form | Clear FAQ section answers common questions. Inquiry form with fast auto-responder and Emily's commitment to respond within 24 hours. |
| **Music/audio on gallery pages** | Creates "mood" and "experience" | Universally disliked UX pattern. Auto-playing audio causes immediate bounces. Accessibility violation. No modern high-end photography site does this | Let the photography speak for itself. Clean, quiet gallery experience. |
| **Excessive animation/parallax** | Feels "premium" and "modern" | Heavy JavaScript, layout shifts (CLS failures), motion sickness for some users, slower perceived load. Distracts from the photography | Subtle micro-interactions: hover effects on gallery images, smooth scroll, fade-in on scroll. Keep animations purposeful and performance-safe. |

## Feature Dependencies

```
Portfolio Galleries
    |-- requires --> Next.js Image Pipeline (WebP/AVIF, blur placeholders, lazy loading)
    |-- requires --> CMS Gallery Management (Sanity/Prismic image assets)
    |-- enhances --> Lightbox Component

Service Pages (Seniors, Families)
    |-- requires --> Portfolio Galleries (embedded gallery per service)
    |-- requires --> "Starting At" Pricing Display
    |-- requires --> Inquiry Form (CTA destination)
    |-- enhances --> Experience Storyboards (embedded in service page)
    |-- enhances --> FAQ Section (service-specific questions)

City Landing Pages (x7)
    |-- requires --> Service Pages (link to services from each city page)
    |-- requires --> Testimonials (city-specific social proof)
    |-- requires --> Google Maps Embed
    |-- requires --> JSON-LD Structured Data (LocalBusiness + areaServed)
    |-- requires --> AEO Answer Blocks
    |-- enhances --> Inquiry Form (city-specific lead source tracking)

Inquiry Form
    |-- requires --> Email notification system (form submission --> Emily's inbox)
    |-- enhances --> Auto-responder (10-minute delayed acknowledgment)
    |-- enhances --> CMS-managed scarcity cues (displayed near form)

Scarcity Cues
    |-- requires --> CMS content management (toggle, text, optional date logic)

Experience Storyboards
    |-- requires --> CMS content management (steps, images, copy)
    |-- enhances --> Service Pages

GBP Optimization
    |-- requires --> City Landing Pages (link destinations from GBP)
    |-- requires --> NAP consistency (address/phone matching across site)

JSON-LD Structured Data
    |-- requires --> Service Pages (service schema)
    |-- requires --> City Landing Pages (areaServed)
    |-- requires --> FAQ Sections (FAQPage schema)
    |-- requires --> Testimonials (Review schema)
```

### Dependency Notes

- **Portfolio Galleries require Image Pipeline:** The entire site depends on the Next.js image optimization pipeline being solid. Without WebP/AVIF, blur placeholders, and lazy loading, an image-heavy photography site will fail Core Web Vitals. This is the foundational technical investment.
- **City Landing Pages require most other features:** These are the most complex pages and depend on galleries, testimonials, structured data, maps, and AEO content all being in place. They should be built last among content pages.
- **Inquiry Form is the conversion endpoint:** Nearly every other feature funnels visitors toward the inquiry form. It must be built early and be rock-solid before layering on traffic-driving features like city pages and GBP optimization.
- **CMS is a prerequisite for all dynamic content:** Galleries, scarcity cues, testimonials, storyboards, and city page content all need CMS management. CMS schema design and setup must happen before content population.

## MVP Definition

### Launch With (v1)

Minimum viable site that can replace emilykathryn.com and start converting.

- [ ] **Homepage** -- hero image, brief intro, portfolio preview, testimonials, persistent CTA
- [ ] **Senior Portraits service page** -- gallery, session description, "Starting At" pricing, Experience Storyboard, FAQ, CTA
- [ ] **Family Portraits service page** -- gallery, session description, "Starting At" pricing, FAQ, CTA
- [ ] **About page** -- photographer photo, personal story, philosophy
- [ ] **Inquiry form** -- smart fields with email notification and auto-responder
- [ ] **Next.js image pipeline** -- WebP/AVIF, blur placeholders, lazy loading, CDN
- [ ] **Mobile-first responsive design** -- gender-inclusive editorial aesthetic
- [ ] **CMS setup** -- gallery management, content editing, scarcity cues
- [ ] **JSON-LD structured data** -- LocalBusiness, Service, FAQPage
- [ ] **Core Web Vitals compliance** -- LCP < 2.5s, CLS < 0.1

### Add After Launch (v1.x)

Features to add once core site is live and generating inquiries.

- [ ] **7 city landing pages** -- Trigger: after launch, when ready to invest in local SEO push. These require significant unique content creation (250-500 words each x 7 cities + city-specific testimonials + gallery curation)
- [ ] **AEO answer blocks** -- Trigger: alongside city landing pages, as these go on those pages
- [ ] **Google Maps embeds** -- Trigger: alongside city landing pages
- [ ] **Senior Style/Wardrobe Guide** -- Trigger: after core service pages are performing. Additional content that drives organic traffic
- [ ] **GBP optimization** -- Trigger: after city landing pages exist to serve as link destinations. Requires step-by-step guide for Emily
- [ ] **Apple Business Connect** -- Trigger: after GBP is set up, as setup process is similar

### Future Consideration (v2+)

Features to defer until site is established and generating consistent leads.

- [ ] **Blog/content marketing** -- Defer until Emily commits to regular content cadence (minimum bi-weekly posts)
- [ ] **Video testimonials** -- Defer until Emily collects video content from clients
- [ ] **Booking/scheduling integration** -- Defer until inquiry volume justifies automation. Architecture should not block this
- [ ] **Additional service pages** -- If Emily expands offerings (headshots, branding, etc.)
- [ ] **Client resource center** -- Session prep guides, timeline planners, etc. beyond the wardrobe guide

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Portfolio galleries + image pipeline | HIGH | HIGH | P1 |
| Mobile-first responsive design | HIGH | MEDIUM | P1 |
| Inquiry form with email notification | HIGH | LOW | P1 |
| Senior Portraits service page | HIGH | MEDIUM | P1 |
| Family Portraits service page | HIGH | MEDIUM | P1 |
| Homepage (conversion-focused) | HIGH | MEDIUM | P1 |
| About page | HIGH | LOW | P1 |
| "Starting At" pricing display | HIGH | LOW | P1 |
| Persistent CTA | HIGH | LOW | P1 |
| Client testimonials | HIGH | LOW | P1 |
| Core Web Vitals compliance | HIGH | HIGH | P1 |
| CMS content management | HIGH | HIGH | P1 |
| JSON-LD structured data | MEDIUM | MEDIUM | P1 |
| FAQ sections | MEDIUM | LOW | P1 |
| Experience Storyboards | MEDIUM | MEDIUM | P2 |
| CMS-managed scarcity cues | MEDIUM | LOW | P2 |
| Lightbox gallery component | MEDIUM | MEDIUM | P2 |
| City landing pages (x7) | HIGH | HIGH | P2 |
| AEO answer blocks | MEDIUM | LOW | P2 |
| Senior Style/Wardrobe Guide | MEDIUM | MEDIUM | P2 |
| Google Maps embeds | LOW | LOW | P2 |
| GBP optimization (guide + links) | HIGH | LOW | P2 |
| Apple Business Connect | LOW | LOW | P3 |
| Inquiry form auto-responder | LOW | LOW | P2 |

**Priority key:**
- P1: Must have for launch -- site does not function without these
- P2: Should have, add in weeks following launch or as part of v1.x
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Emily Kathryn (current) | Matthew Cost (Lynchburg) | Heidi Fam (NoVA) | Emily Kathryn (new) |
|---------|------------------------|--------------------------|-------------------|---------------------|
| **Gallery quality** | Good photos, dark aesthetic, slider carousel | Standard grid, decent quality | Strong portfolio organized by location | CMS-managed masonry galleries, WebP/AVIF, blur placeholders |
| **Service pages** | Minimal -- mostly gallery | Separate pages for seniors, families, headshots, events | Dedicated seniors page with process steps | Focused: Seniors (primary) + Families only. Deep content per page |
| **Pricing visibility** | Not visible on site | Dedicated pricing page | "Investment" section with package options | "Starting At" with included items. Inquire for full pricing |
| **Local SEO** | Location mentions in image hover text | Mentions Lynchburg, Forest, Roanoke in copy | Strong: "Northern Virginia," county-level targeting | 7 dedicated city landing pages with unique content, maps, local testimonials |
| **Structured data** | None detected | Basic organizational schema | Not detected | Full: LocalBusiness, Service, FAQPage, Review, ImageGallery |
| **Session experience/journey** | Not visible | Not visible | "Steps" section with numbered process | Full Experience Storyboards: visual timeline from consultation to delivery |
| **Testimonials** | Not visible on homepage | Homepage quotes with client names and service types | Rotating quotes + video testimonials | CMS-managed across homepage, service pages, city pages. Real names and photos |
| **Gender inclusivity** | Focused on senior girls | Shows male and female subjects | Primarily female subjects | Deliberately inclusive: boys AND girls in hero, galleries, and copy |
| **Scarcity/urgency** | None | None | None detected | CMS-managed seasonal scarcity cues |
| **CTA approach** | Booking buttons present | Multiple "Book Now" buttons | Inquiry buttons near key content | Persistent "Inquire for Detailed Pricing" on every page |
| **Platform** | Unknown (likely ShowIt or Squarespace) | WordPress + Elementor | Unknown | Next.js + Vercel + headless CMS |
| **Performance** | Unknown | Likely slow (WordPress + Elementor typical) | Unknown | Target: LCP < 2.5s, CLS < 0.1, 100/100 mobile |
| **AEO/Answer optimization** | None | None | None | 40-60 word answer blocks on landing pages |
| **Style/Wardrobe guide** | Not found | Not found | Referenced but not prominent | Dedicated guide page with outfit tips and seasonal recommendations |

### Competitive Gaps Emily Kathryn Can Exploit

1. **No VA senior photographer in this market has dedicated city landing pages.** Matthew Cost mentions cities in copy but does not have per-city pages. This is the single biggest local SEO opportunity.
2. **No competitor has structured data/JSON-LD.** Rich results are uncontested territory.
3. **No competitor shows an Experience Storyboard.** Addressing "what's the process?" is a conversion differentiator, especially for parents making a considered purchase.
4. **No competitor uses AEO.** As AI-powered search grows, being the first photographer in this market with AEO-formatted content captures zero-click visibility.
5. **Performance is likely weak across all competitors.** WordPress/Elementor and ShowIt sites typically score 30-60 on mobile performance. A Next.js site hitting 100/100 loads faster, ranks higher, and converts better.

## Sources

- [Hope Taylor Photography - Senior Photography Trends 2026](https://hopetaylor.com/2026/01/05/senior-photography-trends-for-2026-whats-in-whats-out/) -- MEDIUM confidence (industry practitioner)
- [Zenfolio - Creating a Seamless Client Journey](https://zenfolio.com/blog/create-seamless-client-journey-photography-website/) -- MEDIUM confidence (platform provider)
- [CXL - Answer Engine Optimization Guide 2026](https://cxl.com/blog/answer-engine-optimization-aeo-the-comprehensive-guide/) -- HIGH confidence (respected conversion research)
- [Arc4 - Local Landing Pages Guide 2026](https://arc4.com/local-landing-pages/) -- MEDIUM confidence (SEO practitioner)
- [Google - LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) -- HIGH confidence (official documentation)
- [ShootProof - Contact Forms for Photographers](https://www.shootproof.com/blog/5-genius-contact-forms-that-will-get-you-more-clients/) -- MEDIUM confidence (industry platform)
- [CXL - Web Form Optimization](https://cxl.com/blog/web-form-optimization/) -- HIGH confidence (conversion research with test data)
- [Embrace Presets - Should Photographers Show Prices](https://embracepresets.com/should-photographers-show-prices-on-their-website/) -- MEDIUM confidence (industry practitioner)
- [Anna Brace Photography - Senior Style Guide](https://annabracephotography.com/style-guide) -- MEDIUM confidence (competitor example)
- [Heidi Fam Photography - Seniors Page](https://heidifamphotography.com/seniors) -- MEDIUM confidence (competitor analysis)
- [Matthew Cost Photography](https://matthewcost.co/) -- MEDIUM confidence (competitor analysis)
- [Localmighty - GBP Optimization 2026](https://www.localmighty.com/blog/google-business-profile-optimization-best-practices/) -- MEDIUM confidence (SEO practitioner)
- [Apple Business Connect](https://businessconnect.apple.com/) -- HIGH confidence (official source)
- [Pinmeto - Apple Business Connect 2026](https://www.pinmeto.com/blog/apple-business-connect-listings-2026) -- MEDIUM confidence (platform provider)
- [Shoot and Thrive - Social Proof for Photographers](https://shootandthrive.com/how-to-incorporate-social-proof-into-your-photography-website/) -- MEDIUM confidence (industry practitioner)
- [Search Engine Land - Service Area Pages](https://searchengineland.com/guide/service-area-pages) -- HIGH confidence (authoritative SEO publication)
- [ForegroundWeb - Photography Contact Pages](https://www.foregroundweb.com/photography-contact-pages/) -- MEDIUM confidence (web design resource)

---
*Feature research for: Emily Kathryn Photography website redesign*
*Researched: 2026-02-18*
