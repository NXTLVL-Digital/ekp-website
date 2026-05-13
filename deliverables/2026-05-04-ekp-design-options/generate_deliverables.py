from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path("/Users/jeff/AI Projects/NXTLVL-Digital/Clients/EmilyKathryn")
OUT = ROOT / "deliverables" / "2026-05-04-ekp-design-options"
RESEARCH = OUT / "research"
ASSETS = OUT / "assets"
OPTION_1 = OUT / "website-option-1"
OPTION_2 = OUT / "website-option-2"
LOGO = ROOT / "public" / "placeholder" / "logo.png"
SUBMARK = ROOT / "public" / "placeholder" / "logo-submark.svg"
BRAND_BOARD = ROOT / "Official Brand Board.jpg"
IMG = ROOT / "public" / "placeholder"

BLACK = colors.HexColor("#000000")
GOLD = colors.HexColor("#C2A36C")
BLUSH = colors.HexColor("#DCB6AD")
AQUA = colors.HexColor("#B3D4CD")
GRAY = colors.HexColor("#D6D4D4")
INK = colors.HexColor("#23201F")
SOFT = colors.HexColor("#F7F5F2")


def file_url(path: Path) -> str:
    return path.resolve().as_uri()


def branded_header(title: str, doc_type: str) -> str:
    return f"""# {title}

**Emily Kathryn Photography | {doc_type}**  
**Prepared:** May 4, 2026  
**Prepared by:** NXTLVL Digital

**Brand frame:** Editorial senior portraiture, boutique service, parent trust, and confident self-expression.

---
"""


SEO_AUDIT = branded_header(
    "Current SEO, AEO, and GEO Audit", "Search and Answer Engine Audit"
) + """
## Executive Summary

Emily Kathryn Photography has a strong emotional offer: high school senior portraits that make girls feel confident, beautiful, and remembered. The current live site communicates that promise, but the technical foundation limits how much search engines and AI answer engines can trust, extract, and cite it.

The largest issues are not visual. They are structural. The homepage is the only page with meaningful metadata in the source HTML. Several important pages expose empty SEO fields in the initial source. The sitemap includes a test URL. The homepage schema contains address conflicts. The site has duplicated body copy, weak heading hierarchy, and no answer-engine-ready FAQ or comparison structure.

The redesign should keep the boutique emotional positioning, but rebuild it as crawlable, page-specific content with local landing-page depth, stronger parent-facing buying clarity, and clean schema.

## Scorecard

| Category | Score | Key Issue |
| --- | ---: | --- |
| Technical Foundation | 5/10 | HTTPS works, but redirects chain from HTTP to www to non-www. Sitemap includes a test path. |
| Crawlability | 5/10 | Core pages exist, but important metadata is missing from several page source responses. |
| Performance | 4/10 | Homepage source is about 696 KB before images and loads many third-party scripts. PageSpeed API was unavailable. |
| On-Page SEO | 4/10 | Homepage title targets Danville seniors, but subpages lack page-level SEO in source. |
| Structured Data | 3/10 | Homepage has LocalBusiness JSON-LD, but NAP conflicts and no FAQ, Person, Service, or Breadcrumb schema. |
| Content Quality | 5/10 | Good emotional copy exists, but duplicate blocks and thin page structures reduce authority. |
| Images and Media | 6/10 | Photography is visually strong, but filenames/alt strategy needs consistent keyword and accessibility work. |
| AEO/GEO Readiness | 3/10 | No llms.txt found, no AI-readable Q&A blocks, and limited direct-answer content. |
| E-E-A-T and Trust | 5/10 | Testimonials and founder story are strong, but credentials, process proof, and review signals need structure. |
| Local SEO | 4/10 | Service areas are named, but city-specific pages and NAP consistency are missing. |
| Mobile | 5/10 | Current site is responsive, but source includes validator issues and heavy scripts. |
| Accessibility | 4/10 | Validator found invalid HTML/CSS patterns; source headings are weak and duplicated. |
| Security | 6/10 | HTTPS and Cloudflare are present; deeper security header scan was not completed. |

## Technical Checklist

| Check | Status | Evidence |
| --- | --- | --- |
| HTTPS enforced | Partial | HTTP redirects to https://www, then to https://emilykathryn.com. |
| Preferred canonical host | Partial | Final host is non-www, but robots points to non-www while some crawls use www. |
| robots.txt present | Pass | Allows all except /private/ and /admin/. Sitemap declared. |
| sitemap.xml present | Partial | 8 URLs found, including /test_path?item=123. |
| Page-level metadata | Fail | Homepage has metadata. Meet, Experience, Gallery, Contact, Raves, and Blog source responses expose empty SEO fields. |
| JSON-LD schema | Partial | Homepage LocalBusiness exists, but address conflicts with contact page. |
| FAQ schema | Fail | No FAQPage schema found. |
| llms.txt | Fail | No llms.txt or llms-full.txt observed. |
| W3C validation | Fail | 398 messages on homepage validation; 397 were errors. |
| PageSpeed API | Unavailable | Google API returned quota exceeded on May 4, 2026. |

## Critical Issues

### Remove the test URL from the sitemap

The sitemap includes `https://emilykathryn.com/test_path?item=123`. This should not be submitted to Google. It wastes crawl attention and can look like a staging or test artifact.

### Fix NAP conflicts across schema, contact page, and business constants

The current contact page lists Jeff and Emily Walker at 8285 Chalk Level Rd, Gretna, VA 24557. The homepage schema references the same street but lists Danville, VA 24540. Local SEO depends on consistent name, address, and phone data. The redesign should use one verified NAP everywhere: footer, contact page, LocalBusiness schema, Google Business Profile, and llms.txt.

### Restore unique metadata on every public page

The homepage source includes a title and description. The other fetched pages show empty title and description fields in source-level page SEO. Every important page needs a unique title, meta description, canonical URL, Open Graph image, and Twitter image.

## Phase 1: Technical Foundation

- Use one canonical host. Recommended: `https://www.emilykathryn.com` or `https://emilykathryn.com`, but not both.
- Remove `/test_path?item=123` from sitemap generation.
- Add self-referencing canonical tags to every page.
- Add a clean 404 page that links back to Senior Portraits, Family Portraits, Gallery, and Contact.
- Keep robots.txt simple, but add explicit sitemap and avoid blocking AI crawlers unless that is intentional.

## Phase 2: Crawlability and Indexation

- Build the redesign with server-rendered or static HTML for all core pages.
- Keep the core value proposition, service copy, FAQ answers, and testimonials visible in initial HTML.
- Avoid putting critical content only inside client-side builders, sliders, or script payloads.
- Add internal links from the homepage to each core service page and from each service page to Contact.

## Phase 3: Page Speed and Core Web Vitals

PageSpeed data could not be retrieved because the public API returned quota exceeded. Observable issues still matter:

- Homepage source size was about 696 KB before loading images and external scripts.
- Current source includes Google Tag Manager, Hotjar, jQuery, OwlCarousel, Cloudflare beacon, and many builder scripts.
- The redesign should use native CSS and minimal JavaScript for galleries and navigation.
- Use responsive image sizes, lazy-load below-fold images, and preload only the primary hero image.

## Phase 4: On-Page SEO

Recommended target pages:

| Page | Primary Search Intent | Recommended Title |
| --- | --- | --- |
| Home | Senior and family photographer in South-Central Virginia | Emily Kathryn Photography | Senior and Family Photographer in Virginia |
| Senior Portraits | High school senior photographer Danville / Lynchburg / Gretna | Senior Portrait Photographer in Danville, Lynchburg and Gretna VA |
| Family Portraits | Family photographer Danville / Gretna / Lynchburg | Family Photographer in South-Central Virginia |
| Investment | Senior portrait pricing and experience | Senior Portrait Investment | Emily Kathryn Photography |
| About | Trust and founder story | Meet Emily | South-Central Virginia Senior Photographer |
| Gallery | Portfolio proof | Senior Portrait Gallery | Danville and Lynchburg VA |
| Contact | Conversion | Inquire With Emily Kathryn Photography |

## Phase 5: Structured Data and Schema

Add a page-specific schema set:

- `LocalBusiness` on all pages with verified NAP.
- `Person` for Emily on About and Home.
- `Service` for Senior Portraits and Family Portraits.
- `FAQPage` on Senior Portraits, Investment, and Contact.
- `BreadcrumbList` on all non-home pages.
- `ImageObject` for featured galleries.
- `Review` or `AggregateRating` only if review data is verified and policy-compliant.

## Phase 6: Images and Media

- Use descriptive filenames before upload: `danville-va-senior-portrait-floral-field.jpg`, not generic camera names.
- Add image alt text that describes the person, setting, and location when relevant.
- Keep decorative logos empty-alt if they are repeated and not informational.
- Create page-specific social images for senior portraits, family portraits, investment, and contact.

## Phase 7: Content Quality and Internal Linking

The current copy has strong emotional language but repeats itself on several pages. The redesign should use each page for a distinct job:

- Home: qualify the audience and route to senior/family paths.
- Senior Portraits: explain the experience, transformation, timeline, products, and FAQs.
- Family Portraits: establish the family offer separately instead of treating it as secondary.
- Investment: clarify starting price, what is included, and what comes next.
- About: build trust through Emily's story, values, experience, and client care.
- Gallery: prove range by location, style, season, and personality.
- Contact: reduce friction and set expectations for reply time, planning call, and booking windows.

## Phase 8: E-E-A-T and Trust Signals

- Put Emily's years of experience near the top of About and Senior Portraits.
- Add proof points: 12+ years, all-inclusive sessions, heirloom products, in-person ordering, senior magazine, and testimonials.
- Add named high schools and locations where sessions have happened, where permission allows.
- Use parent-specific proof: safety, planning, wardrobe help, posing guidance, delivery timeline, print/product help.

## Phase 9: AEO and GEO Optimization

For AI answer engines, the site needs content that answers direct questions in plain language.

Add answer blocks such as:

- What does a senior portrait session with Emily Kathryn include?
- How far in advance should I book senior pictures in South-Central Virginia?
- Where does Emily Kathryn Photography take senior portraits?
- What should I wear for senior pictures?
- Do parents receive help choosing prints and albums?
- What is the difference between a digital-only photographer and a boutique senior portrait experience?

Each answer should be 2 to 4 sentences, followed by detail. Add FAQ schema and use stable URLs.

## Phase 10: Local SEO

Recommended local pages:

- `/danville-va-senior-photographer`
- `/lynchburg-va-senior-photographer`
- `/gretna-va-senior-photographer`
- `/chatham-va-senior-photographer`
- `/altavista-va-senior-photographer`

Each page should include unique location copy, local gallery examples, nearby high schools, travel notes, and a relevant FAQ. Avoid duplicating the same paragraph with only city names changed.

## Phase 11: Mobile and UX

- Keep nav simple: Senior Portraits, Family Portraits, Gallery, Investment, About, Contact.
- Make the inquiry CTA persistent but not intrusive.
- Avoid tiny script-style text for important conversion copy.
- Use dense but elegant service information for parents who are comparing investment and process.

## Phase 12: Accessibility

- Ensure one H1 per page.
- Use real text instead of text baked into images.
- Maintain visible focus states for keyboard navigation.
- Keep contrast high when using blush and aqua.
- Avoid invalid HTML structures such as divs inside buttons.

## Phase 13: Security and Tracking

- Keep analytics lightweight.
- Remove any placeholder tracking code variables before launch.
- Add a privacy-safe cookie/analytics stance if Hotjar remains.
- Consider security headers: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.

## Redesign Requirements Derived From Audit

- Build static or server-rendered pages with real headings and page copy.
- Add page-level SEO metadata and schema.
- Create city/service content without duplicating blocks.
- Make the buying path parent-clear: starting price, included planning, products, delivery, and booking timing.
- Preserve the high-end visual brand, but make the site easier to crawl, quote, and choose.

## Sources and Evidence

- Current site homepage: https://www.emilykathryn.com/ (accessed May 4, 2026)
- Current Experience page: https://emilykathryn.com/experience (accessed May 4, 2026)
- Current Contact page search result and page content: https://emilykathryn.com/contact (accessed May 4, 2026)
- robots.txt live fetch: https://www.emilykathryn.com/robots.txt (accessed May 4, 2026)
- sitemap.xml live fetch: https://www.emilykathryn.com/sitemap.xml (accessed May 4, 2026)
- W3C Nu HTML Checker result for https://emilykathryn.com (accessed May 4, 2026)
- Google PageSpeed Insights API attempted May 4, 2026; public API returned quota exceeded.
"""


MARKET_RESEARCH = branded_header(
    "Market Research", "Market and Opportunity Research"
) + """
## Executive Summary

Emily Kathryn Photography competes in a local market where demand is emotional, seasonal, and identity-driven. Senior portraits are not purchased only as photos. They are purchased as confidence, memory, social proof, family pride, and a milestone experience.

The strongest growth path is a premium senior portrait position that speaks to two buyers at once: the senior girl who wants to feel seen and the parent who wants a guided, trustworthy, heirloom-quality process. The current site has the emotional foundation, but the redesign needs stronger service architecture, clearer investment framing, and better local search coverage.

Top recommendations:

- Own the phrase cluster around senior portraits in Danville, Gretna, Chatham, Altavista, and Lynchburg.
- Build parent-facing proof: process, safety, product value, timeline, and booking scarcity.
- Separate senior portraits and family portraits into distinct high-end buying journeys.
- Add senior model team or ambassador content if operationally realistic.
- Create city-specific pages and answer blocks for AI/search visibility.

## Business Profile

Emily Kathryn Photography is an on-location portrait business serving high school seniors and families in South-Central Virginia. Current site copy names Lynchburg, Altavista, Gretna, Chatham, and Danville as service areas. The Contact page also references clients from Florida, New Hampshire, and California, which supports a premium experience narrative but should not dilute the core local SEO strategy.

Current positioning strengths:

- Clear senior focus.
- Strong emotional promise: confidence, beauty, and once-in-a-lifetime memory.
- Boutique experience language.
- Starting investment visible on Experience page: $799.
- Founder story builds warmth and faith/family trust.
- Testimonials show strong client emotion.

Current market gaps:

- Parent decision factors are underdeveloped.
- Family portraits are not positioned as a separate premium offer.
- No structured local content for each service city.
- No clear answer-engine content for common buying questions.
- Gallery proof is strong, but not organized by style, location, season, or personality type.

## Market Analysis

### Industry Overview

IBISWorld reported the U.S. photography market at $16.2 billion in 2025, with 0.5% growth in 2025. BLS reports that photographers held about 151,200 jobs in 2024 and projects 2% employment growth from 2024 to 2034. BLS also notes that 66% of photographers are self-employed, which means the market is fragmented and heavily dependent on brand, trust, portfolio, and local demand capture.

The smartphone threat is real. BLS states that smartphone quality and stock photography can reduce demand for some professional photography. For EKP, that makes commodity positioning risky. The defense is not cheaper sessions. It is a guided, confidence-building, boutique experience with professional direction, locations, retouching, product help, and emotional value.

### Local Market Conditions

Core South-Central Virginia market indicators:

| Market | Population | Median Household Income | Under 18 | Notes |
| --- | ---: | ---: | ---: | --- |
| Pittsylvania County | 59,490 in 2025 | $54,085 | 17.4% | Core rural/local market; high owner-occupied housing rate. |
| Danville city | 41,647 in 2025 | $44,423 | 22.9% | Large named search market with more public school senior volume. |
| Lynchburg city | 81,347 in 2025 | $57,947 | 19.5% | Higher education and income signals; strong expansion market. |

Visible senior pipeline from public school profiles:

| School | 2024-2025 Grade 12 Enrollment |
| --- | ---: |
| Gretna High | 118 |
| Chatham High | 142 |
| Tunstall High | 194 |
| Dan River High | 133 |
| George Washington High | 240 |
| Galileo Magnet High | 64 |
| Altavista High | 98 |
| Brookville High | 281 |
| Conservative sourced total | 1,270 |

This is not total addressable market. It excludes private schools, homeschool students, other Lynchburg-area schools, surrounding counties, Class of 2027 pre-booking, and family portrait buyers. At the stated starting investment of $799, 25 incremental senior sessions represent $19,975 before product upgrades. Fifty incremental senior sessions represent $39,950 before product upgrades.

## Audience Research

### Segment 1: The Style-Aware Senior

Demographics:

- Age 16 to 18.
- High school junior or senior.
- Lives in Danville, Pittsylvania County, Campbell County, Lynchburg, or nearby rural communities.
- Often influenced by friends, Instagram, TikTok, team activities, prom, and graduation culture.

Psychographics:

- Wants photos that feel like "me, but elevated."
- Fears looking awkward, stiff, or generic.
- Wants confidence and social proof.
- Values locations, outfits, posing help, and quick sneak peeks.
- Responds to phrases like confident, modern, editorial, styled around you, senior year only happens once.

Digital behavior:

- Pew reports that 90% of U.S. teens use YouTube, 63% use TikTok, 61% use Instagram, and 55% use Snapchat in 2024.
- Older teens are especially active on Instagram and Snapchat.
- The senior sees the photographer through portfolio, reels, friends, tagged posts, and the overall vibe before reading details.

### Segment 2: The Memory-Keeper Mom

Demographics:

- Age 38 to 55.
- Parent or guardian of a high school junior/senior.
- Often the final buyer or co-buyer.
- Values quality, trust, timing, and emotional return.

Psychographics:

- Wants her daughter to feel beautiful and cared for.
- Wants the milestone preserved beyond phone photos.
- Needs to justify premium pricing through process, products, safety, and quality.
- Responds to guided planning, clear timeline, scarcity, and print/album value.

Digital behavior:

- Searches Google for "senior photographer near me," "Danville VA senior pictures," "Lynchburg senior portraits," and "senior portrait pricing."
- Uses Facebook and word-of-mouth more than the senior does.
- Reads reviews, About pages, and Contact/Investment details before inquiring.

### Segment 3: The Personality-Led Senior Family

Demographics:

- Senior plus parent buyer.
- Includes athletes, dancers, FFA/agriculture students, musicians, creatives, and seniors who want locations tied to identity.

Psychographics:

- Wants the session to show more than a pretty portrait.
- Values props, uniforms, instruments, fields, trucks, downtown settings, water, school identity, or pets.
- Needs assurance that the photographer can direct without flattening personality.

Digital behavior:

- Searches by style and activity: "senior pictures with truck," "senior photos with flowers," "softball senior pictures," "downtown Lynchburg senior photos."
- Responds to galleries grouped by style, not only chronological photos.

## Competitive Landscape

### Direct and Regional Competitors

| Competitor | Positioning | What They Do Well | EKP Opportunity |
| --- | --- | --- | --- |
| Visions by Heather | Central Virginia senior and portrait photographer | 19 years, PPA membership, senior insider group, strong experience language. | Match the guided experience proof while leaning more editorial and boutique. |
| Matthew Cost Photography | Lynchburg senior, portrait, headshot, event photography | Broad professional positioning and commercial credibility. | EKP can be more specialized and emotionally senior-focused. |
| Estes Photos | Lynchburg events, sports, senior portraits | Accessible, action-oriented, budget-friendly senior/sports language. | EKP should avoid price competition and own premium transformation. |
| M. Cave Photography | Central Virginia senior portraits | Team 27 model team creates community and recurring content. | Consider an EKP senior team if capacity supports it. |
| Katie Kraft Photography | Richmond portrait experience | Strong family/senior positioning plus wall art and albums. | Use product value and in-person ordering as a clearer differentiator. |

### Aspirational Competitors

Musselman Photography positions senior portraits as legacy artwork with white-glove, hand-delivered, heirloom products. This is an important strategic signal. High-end senior photography buyers respond to more than digital files. They respond to permanence, artwork, and a family milestone story.

## Vertical and Opportunity Analysis

### Current Verticals

- High school senior portraits.
- Family portraits.
- Heirloom products and in-person ordering.
- Senior magazine and custom planning.

### Untapped or Underdeveloped Verticals

| Opportunity | Why It Matters | Effort | Priority |
| --- | --- | --- | --- |
| City-specific senior pages | Captures high-intent local search and AI answers. | Medium | High |
| Parent guide content | Reduces anxiety and justifies investment. | Low | High |
| Senior style/personality galleries | Helps students see themselves in the portfolio. | Medium | High |
| Family portrait premium page | Stops family work from feeling secondary. | Medium | Medium |
| Senior model team | Builds referral loops and social content. | High | Medium |
| Print and album education | Moves buyer from files to heirlooms. | Low | High |

## Strategic Recommendations

### Quick Wins: 30 Days

- Rewrite page titles and meta descriptions for every page.
- Remove the sitemap test URL.
- Create FAQ sections for Senior Portraits, Investment, and Contact.
- Add verified NAP data to footer, schema, contact page, and Google Business Profile.
- Reorganize gallery previews by style: editorial, country, downtown, floral, sports, water, cap and gown.

### Medium-Term Plays: 1 to 3 Months

- Publish city landing pages for Danville, Gretna, Chatham, Altavista, and Lynchburg.
- Create a parent-facing senior portrait guide.
- Add service schema, FAQ schema, Person schema, and Breadcrumb schema.
- Create a "What to Wear" page or downloadable guide optimized for search and lead capture.

### Long-Term Moves: 3 to 12 Months

- Launch a senior model or ambassador program only if the operations can support it.
- Build a blog/resource cluster around senior portrait planning, locations, outfits, sports portraits, and print products.
- Add post-session product education: wall art, albums, gift prints, and graduation display ideas.
- Track leads by city and service type to see which pages produce the best inquiries.

## Sources and Methodology

- Emily Kathryn Photography homepage, Experience, Gallery, Meet Emily, and Contact pages, accessed May 4, 2026.
- U.S. Census Bureau QuickFacts: Pittsylvania County, Danville city, and Lynchburg city, accessed May 4, 2026.
- Virginia School Quality Profiles: Gretna High, Chatham High, Tunstall High, Dan River High, George Washington High, Galileo Magnet High, Altavista High, and Brookville High, accessed May 4, 2026.
- U.S. Bureau of Labor Statistics, Occupational Outlook Handbook: Photographers, accessed May 4, 2026.
- IBISWorld Photography in the US Market Size, last updated March 2025, accessed May 4, 2026.
- Pew Research Center, Teens, Social Media and Technology 2024; Teens and Social Media Fact Sheet 2025, accessed May 4, 2026.
- Competitor websites reviewed through public search results and pages: Visions by Heather, Matthew Cost Photography, Estes Photos, M. Cave Photography, Katie Kraft Photography, Musselman Photography.
"""


CUSTOMER_AVATAR = branded_header(
    "Ideal Customer Avatar", "Audience Strategy"
) + """
## Primary Avatar: The Memory-Making Senior Mom

### Snapshot

Name: Melissa  
Age: 44  
Location: Danville, Gretna, Chatham, Altavista, or Lynchburg area  
Household: Married or partnered, 2 to 3 children, one high school junior or senior  
Role in purchase: Decision maker, budget holder, emotional validator  
Likely search: "senior photographer near me," "Danville VA senior pictures," "Lynchburg senior photographer," "senior portrait pricing"

Melissa wants more than a gallery. She wants proof that her daughter will be cared for, guided, and photographed in a way that feels beautiful without feeling fake.

## Emotional Job To Be Done

Melissa is trying to preserve a version of her daughter that is about to change. Senior year feels fast. College, work, trade school, sports, graduation, and independence are all coming. She wants images that say: this is who you were before everything changed, and I saw you.

## Functional Needs

- Clear starting investment.
- Confidence that Emily handles posing and awkwardness.
- Wardrobe and location planning.
- A timeline for booking, session day, sneak peeks, final images, and product ordering.
- Assurance that the session will be safe, professional, and organized.
- Evidence that other girls loved the experience.
- A way to preserve images beyond digital files.

## Psychological Drivers

### Identity

Melissa sees herself as the mom who shows up. She wants her daughter to have something special, not rushed or ordinary. The purchase supports her identity as thoughtful, proud, and invested.

### Fear

She fears waiting too long, choosing the wrong photographer, wasting money, or seeing her daughter feel uncomfortable in the photos.

### Status

Status is subtle. She does not want flashy luxury. She wants taste, polish, and proof that the experience is a step above the default school-picture option.

### Nostalgia

The strongest emotional trigger is the approaching end of a season. Language should treat senior portraits as a threshold, not a vanity project.

## Secondary Avatar: The Senior Style Curator

Name: Ava  
Age: 17  
Role in purchase: Influencer and emotional decision-maker  
Digital behavior: Instagram, TikTok, YouTube, Snapchat, group chats, tagged galleries  
Primary question: "Will I look like myself, but better?"

She wants:

- A photographer who knows poses.
- Locations that match her personality.
- Outfit guidance without making her feel controlled.
- Images that look good online and in print.
- A session that feels fun, not embarrassing.

She rejects:

- Stiff poses.
- Overly generic rustic photos.
- Websites that feel outdated.
- Pricing or process pages that sound only parent-facing.

## Buying Committee

| Person | What They Care About | Content Needed |
| --- | --- | --- |
| Senior | Style, confidence, location, outfit, social proof | Gallery, reels, style categories, testimonials from seniors |
| Mom | Trust, value, timing, process, products | Experience page, investment page, FAQs, product proof |
| Dad/Other Parent | Cost, logistics, credibility | Simple pricing frame, what is included, why it matters |
| Friends | Photographer reputation | Tagged posts, model team, senior raves |

## Message That Will Convert

"A guided senior portrait experience for girls who want to feel confident, polished, and completely themselves - and for parents who want this milestone preserved beautifully."

## Words To Use

- Confident
- Polished
- Guided
- Once-in-a-lifetime
- Senior year
- Heirloom
- Styled around you
- Beautiful light
- South-Central Virginia
- Danville, Gretna, Chatham, Altavista, Lynchburg

## Words To Avoid

- Cheap
- Affordable as the lead message
- Glam squad unless true operationally
- Luxury without proof
- Digital-only as the value proposition
- Generic senior photos

## Website Implications

- The homepage must speak to the senior visually and the parent structurally.
- The Senior Portraits page should explain the transformation and the logistics.
- The Investment page should make $799 feel like the start of a guided experience, not a price obstacle.
- The Gallery should be organized by identity and setting.
- The Contact page should reduce anxiety with next steps and booking timing.
- The About page should make Emily feel trustworthy, warm, skilled, and personally invested.

## Offer Framing

Lead offer:

"Senior portraits that feel confident, modern, and personal - planned with you, guided by Emily, and finished as artwork your family can keep."

Support points:

- Custom planning for outfits and locations.
- Posing guidance throughout the session.
- Professionally retouched images.
- Sneak peeks for social sharing.
- In-person help choosing products.
- Albums and wall art for long-term memory.

## Conversion Triggers

- "Booking ahead is recommended because senior season fills early."
- "You do not need to know how to pose."
- "We plan your session around your style, not a template."
- "Your images are designed to live beyond your phone."
- "Parents receive clear guidance from inquiry to final artwork."

## Objections and Responses

| Objection | Response |
| --- | --- |
| "My daughter is awkward in photos." | Emily guides every pose and expression so the session feels easy. |
| "Is this worth the price?" | The session includes planning, professional direction, retouching, and product guidance. |
| "We only need digitals." | Digital images are included, but heirloom products keep the milestone visible and lasting. |
| "We waited too long." | Contact should set clear seasonal booking windows and waitlist options. |
| "We do not know where to shoot." | Emily recommends locations based on style, outfits, and personality. |

## Best-Fit Brand Personality

Emily Kathryn should feel like an editorial best friend for the senior and a trusted milestone guide for the parent. The brand should not feel cold, overly fashion-house, or childish. It should feel polished, warm, feminine, confident, and organized.
"""


BRAND_GUIDE = branded_header(
    "Brand Guide", "Brand Strategy and Visual Direction"
) + """
## Brand Essence

Emily Kathryn Photography helps high school seniors feel confident, beautiful, and fully seen during one of the most meaningful transitions of their life. The brand is editorial, feminine, polished, and warm. It should feel elevated without becoming distant.

## Brand Positioning

### Core Position

Boutique senior and family portrait photography in South-Central Virginia, designed around confidence, personal style, and heirloom memory.

### Positioning Statement

For high school seniors and families in South-Central Virginia, Emily Kathryn Photography creates a guided portrait experience that feels personal, polished, and confidence-building - with imagery designed to be shared now and treasured for years.

## Brand Promise

You will not have to know how to pose, where to go, or how to make the session feel special. Emily guides the process so the images feel like the most confident version of you.

## Brand Pillars

| Pillar | Meaning | Website Expression |
| --- | --- | --- |
| Confidence | The senior feels beautiful and comfortable. | Senior testimonials, posing guidance, transformation copy. |
| Personal Style | Sessions are shaped around the client. | Style galleries, outfit/location planning, identity-led sections. |
| Heirloom Value | Images deserve to live beyond a phone. | Albums, wall art, product education, parent messaging. |
| Warm Guidance | Emily handles the details. | Process timeline, FAQs, inquiry expectations. |
| Local Expertise | Emily knows the South-Central Virginia setting. | City pages, high school mentions, location-based galleries. |

## Voice

### Voice Attributes

- Warm
- Editorial
- Reassuring
- Specific
- Confident
- Parent-clear
- Senior-aware

### Voice Rules

- Lead with emotion, then support with proof.
- Write to the senior and parent together.
- Keep luxury grounded in service details.
- Use direct answers in FAQ sections.
- Avoid vague claims like "capturing memories" unless followed by a specific proof point.

### Sample Copy

Hero:

"Senior portraits for the girl becoming herself."

Support:

"A guided, confidence-building portrait experience across Danville, Gretna, Chatham, Altavista, Lynchburg, and the places that feel like you."

CTA:

"Inquire for Senior Availability"

## Visual Identity

### Existing Palette

| Color | Hex | Role |
| --- | --- | --- |
| Black | #000000 | Editorial contrast, typography, anchors |
| Warm Gold | #C2A36C | Premium accent, rules, buttons |
| Blush | #DCB6AD | Feminine warmth, soft backgrounds |
| Aqua | #B3D4CD | Freshness, youth, secondary accent |
| Soft Gray | #D6D4D4 | Neutral balance, dividers, quiet backgrounds |

### Color Direction

Use black and white as the editorial base. Use gold for premium cues, blush for warmth, and aqua for freshness. Do not let the site become all blush, all aqua, or all beige. The client needs high-end contrast with youthful energy.

## Typography Direction

The brand board references Yo Andy and Acrom. Since Acrom files are not currently self-hosted in the repo, the web implementation should use:

- High-contrast editorial serif for the logo-like display tone.
- Clean geometric sans for navigation, labels, and UI.
- Script or handwritten accent only for small emotional moments.

Recommended web-safe direction:

- Display: Playfair Display or Cormorant Garamond.
- Body/UI: Montserrat, Avenir-style, or Acrom if licensed.
- Accent: keep script minimal.

## Photography Direction

Photos should feel:

- Bright but not washed out.
- Colorful but controlled.
- Confident, feminine, and personality-led.
- Location-rich: fields, downtown textures, water, florals, schools, farms, and family spaces.
- Edited consistently enough to feel premium.

Avoid:

- Over-dark hero crops.
- Generic stock-like detail shots.
- Galleries with no organization.
- Tiny thumbnails that hide image quality.

## Layout Direction

The site should feel high-end and editorial, but it must not become a magazine that parents cannot use. Best structure:

- Large first-viewport image signal.
- Clear senior/family routing.
- Polished but direct process sections.
- FAQ content with direct answers.
- Strong gallery proof before inquiry.
- Contact page with expectations.

## Brand Psychology

The senior needs to imagine herself in the photos. The parent needs to trust the process. That means the brand should balance aspiration with reassurance:

- Aspiration: editorial typography, strong photography, elevated spacing.
- Reassurance: process clarity, testimonials, investment clarity, local trust, FAQs.
- Belonging: named locations, named schools where appropriate, senior stories.
- Permanence: albums, wall art, in-person ordering, heirloom language.

## Messaging Hierarchy

1. Senior portraits that build confidence.
2. Guided experience with styling, posing, and location planning.
3. South-Central Virginia local expertise.
4. Digital images plus heirloom product support.
5. Limited booking windows and inquiry CTA.

## Design Option Alignment

### Option 1: Editorial Heirloom

Best for a higher-end parent-led buying path. Strong black/white/gold foundation. More premium, composed, and print-product focused.

### Option 2: Modern Muse

Best for a senior-led, colorful, social-forward buying path. More energetic, fresh, and community-driven while still parent-clear.

## Launch Checklist

- Verify NAP before schema launch.
- License and self-host final fonts.
- Replace placeholder images with final EKP portfolio exports.
- Create page-specific SEO metadata.
- Add FAQ and LocalBusiness schema.
- Create llms.txt and llms-full.txt.
- Connect inquiry form to CRM/email.
- Compress images and validate mobile layouts.
"""


OPTIONS_BRIEF = branded_header(
    "Website Design Options", "Concept Rationale"
) + """
## Overview

The two website options are built from the audit, market research, customer avatar, and brand guide. Both concepts use the same business strategy: premium senior portraiture, parent trust, local search clarity, and AI-readable page structure.

Each option includes seven static pages:

- Home
- Senior Portraits
- Family Portraits
- Gallery
- About
- Investment or Raves
- Contact/Inquire

## Option 1: Editorial Heirloom

Tone: refined, editorial, polished, parent-trust-heavy.

Best for:

- Raising perceived value.
- Explaining heirloom products and in-person ordering.
- Making the $799+ investment feel grounded in service and permanence.
- Attracting parents who want a premium but tasteful experience.

Strategic corrections:

- Uses clear service routing.
- Adds direct answer sections for AEO/GEO.
- Makes investment and products visible.
- Balances senior confidence with parent assurance.

## Option 2: Modern Muse

Tone: fresh, confident, social-forward, senior-led.

Best for:

- Appealing quickly to students.
- Building a model-team or ambassador direction later.
- Showing personality-led galleries.
- Keeping the brand youthful without losing polish.

Strategic corrections:

- Makes the senior's identity the first visual hook.
- Adds style-led gallery pathways.
- Keeps parent logistics visible.
- Uses stronger color energy from the existing brand board.

## Recommendation

Option 1 is the safer premium conversion choice if the business wants to emphasize investment, products, and parent confidence.

Option 2 is the better brand-growth choice if Emily wants the site to feel more current to seniors and eventually support a senior team/referral engine.

The strongest final site could combine Option 1's buying clarity with Option 2's gallery energy.
"""


def write_md() -> list[Path]:
    docs = {
        "seo-aeo-geo-audit.md": SEO_AUDIT,
        "market-research.md": MARKET_RESEARCH,
        "customer-avatar.md": CUSTOMER_AVATAR,
        "brand-guide.md": BRAND_GUIDE,
        "website-design-options.md": OPTIONS_BRIEF,
    }
    paths: list[Path] = []
    for filename, content in docs.items():
        path = RESEARCH / filename
        path.write_text(content.strip() + "\n", encoding="utf-8")
        paths.append(path)
    return paths


def pdf_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="EKPTitle",
            parent=styles["Title"],
            fontName="Times-Roman",
            fontSize=28,
            leading=32,
            textColor=BLACK,
            alignment=TA_CENTER,
            spaceAfter=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EKPH1",
            parent=styles["Heading1"],
            fontName="Times-Roman",
            fontSize=20,
            leading=24,
            textColor=BLACK,
            spaceBefore=14,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EKPH2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=BLACK,
            spaceBefore=12,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EKPBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.4,
            leading=13.2,
            textColor=INK,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EKPBullet",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.8,
            leftIndent=14,
            firstLineIndent=-8,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="EKPPre",
            parent=styles["Code"],
            fontName="Courier",
            fontSize=7,
            leading=8,
            textColor=INK,
        )
    )
    return styles


def clean_inline(text: str) -> str:
    text = html.escape(text)
    text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)
    text = text.replace("  ", " ")
    return text


def parse_table(lines: list[str], styles) -> Table:
    rows = []
    for line in lines:
        cells = [clean_inline(cell.strip()) for cell in line.strip().strip("|").split("|")]
        if cells and not all(set(cell.replace(":", "").replace("-", "").strip()) <= {"-"} for cell in cells):
            rows.append([Paragraph(cell, styles["EKPBody"]) for cell in cells])
    table = Table(rows, hAlign="LEFT", repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BLACK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.25, GRAY),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def md_to_story(markdown: str, title: str):
    styles = pdf_styles()
    story = []
    if LOGO.exists():
        img = Image(str(LOGO), width=2.2 * inch, height=0.8 * inch)
        img.hAlign = "CENTER"
        story.append(img)
        story.append(Spacer(1, 0.18 * inch))
    story.append(Paragraph(title, styles["EKPTitle"]))
    story.append(Paragraph("Emily Kathryn Photography | Strategic Website Design Package", styles["EKPBody"]))
    story.append(Spacer(1, 0.12 * inch))
    swatches = Table(
        [["#000000", "#C2A36C", "#DCB6AD", "#B3D4CD", "#D6D4D4"]],
        colWidths=[1.0 * inch] * 5,
        hAlign="CENTER",
    )
    swatches.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), BLACK),
                ("BACKGROUND", (1, 0), (1, 0), GOLD),
                ("BACKGROUND", (2, 0), (2, 0), BLUSH),
                ("BACKGROUND", (3, 0), (3, 0), AQUA),
                ("BACKGROUND", (4, 0), (4, 0), GRAY),
                ("TEXTCOLOR", (0, 0), (0, 0), colors.white),
                ("TEXTCOLOR", (1, 0), (-1, 0), colors.white),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(swatches)
    story.append(PageBreak())

    lines = markdown.splitlines()
    table_buffer: list[str] = []

    def flush_table():
        nonlocal table_buffer
        if table_buffer:
            story.append(parse_table(table_buffer, styles))
            story.append(Spacer(1, 0.08 * inch))
            table_buffer = []

    for raw in lines:
        line = raw.rstrip()
        if not line:
            flush_table()
            story.append(Spacer(1, 0.035 * inch))
            continue
        if line.startswith("|") and line.endswith("|"):
            table_buffer.append(line)
            continue
        flush_table()
        if line.startswith("# "):
            continue
        if line.startswith("## "):
            story.append(Paragraph(clean_inline(line[3:]), styles["EKPH1"]))
        elif line.startswith("### "):
            story.append(Paragraph(clean_inline(line[4:]), styles["EKPH2"]))
        elif line.startswith("- "):
            story.append(Paragraph("• " + clean_inline(line[2:]), styles["EKPBullet"]))
        elif re.match(r"^\d+\. ", line):
            story.append(Paragraph(clean_inline(line), styles["EKPBullet"]))
        elif line == "---":
            story.append(Spacer(1, 0.08 * inch))
        elif line.startswith("```"):
            continue
        elif line.startswith("    "):
            story.append(Preformatted(line, styles["EKPPre"]))
        else:
            story.append(Paragraph(clean_inline(line), styles["EKPBody"]))
    flush_table()
    return story


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.75)
    canvas.line(doc.leftMargin, 0.55 * inch, letter[0] - doc.rightMargin, 0.55 * inch)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(INK)
    canvas.drawString(doc.leftMargin, 0.38 * inch, "Emily Kathryn Photography | NXTLVL Digital")
    canvas.drawCentredString(letter[0] / 2, 0.38 * inch, f"Page {doc.page}")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.38 * inch, "May 4, 2026")
    canvas.restoreState()


def write_pdfs(md_paths: list[Path]) -> list[Path]:
    pdfs: list[Path] = []
    for md_path in md_paths:
        text = md_path.read_text(encoding="utf-8")
        title = text.splitlines()[0].lstrip("# ").strip()
        pdf_path = md_path.with_suffix(".pdf")
        doc = SimpleDocTemplate(
            str(pdf_path),
            pagesize=letter,
            rightMargin=0.58 * inch,
            leftMargin=0.58 * inch,
            topMargin=0.58 * inch,
            bottomMargin=0.72 * inch,
            title=title,
            author="NXTLVL Digital",
        )
        doc.build(md_to_story(text, title), onFirstPage=footer, onLaterPages=footer)
        pdfs.append(pdf_path)
    return pdfs


CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

:root {{
  --black: #000000;
  --ink: #211f1e;
  --gold: #c2a36c;
  --blush: #dcb6ad;
  --aqua: #b3d4cd;
  --gray: #d6d4d4;
  --paper: #f8f6f2;
  --white: #ffffff;
  --max: 1180px;
}}

* {{ box-sizing: border-box; }}
html {{ scroll-behavior: smooth; }}
body {{
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: Montserrat, Avenir, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  overflow-x: hidden;
}}
a {{ color: inherit; text-decoration: none; }}
img {{ max-width: 100%; display: block; }}
.site-shell {{ min-height: 100vh; }}
.topbar {{
  background: var(--black);
  color: var(--white);
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 0.7rem 1rem;
}}
.nav {{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem clamp(1rem, 4vw, 4rem);
  background: rgba(248, 246, 242, 0.96);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}}
.brand {{
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 0.9;
  letter-spacing: -0.01em;
}}
.nav-links {{
  display: flex;
  gap: clamp(0.8rem, 2vw, 1.6rem);
  align-items: center;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  flex-wrap: wrap;
  justify-content: flex-end;
}}
.button, button {{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.78rem 1.1rem;
  border: 1px solid var(--black);
  background: var(--black);
  color: var(--white);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
  transition: transform .2s ease, background .2s ease, color .2s ease;
}}
.button:hover {{ transform: translateY(-2px); background: var(--gold); color: var(--black); }}
.button.secondary {{ background: transparent; color: var(--black); }}
.button.secondary:hover {{ background: var(--black); color: var(--white); }}
.hero {{
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  min-height: 78vh;
  border-bottom: 1px solid rgba(0,0,0,.12);
}}
.hero-copy {{
  padding: clamp(2rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}}
.eyebrow {{
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #6d625b;
  font-weight: 700;
}}
h1, h2, h3 {{
  color: var(--black);
  line-height: 0.98;
  margin: 0;
}}
h1 {{
  font-family: 'Playfair Display', 'Cormorant Garamond', serif;
  font-size: clamp(3.3rem, 8vw, 7.8rem);
  max-width: 10ch;
  margin: 1rem 0 1.2rem;
}}
h2 {{
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 5rem);
  margin-bottom: 1rem;
}}
h3 {{
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  margin-bottom: 0.65rem;
}}
p {{ margin: 0 0 1rem; }}
.lede {{
  font-size: clamp(1rem, 1.5vw, 1.22rem);
  max-width: 48rem;
}}
.hero-media {{
  position: relative;
  min-height: 520px;
  overflow: hidden;
}}
.hero-media img {{
  width: 100%;
  height: 100%;
  object-fit: cover;
}}
.hero-badge {{
  position: absolute;
  left: 1.2rem;
  bottom: 1.2rem;
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(0,0,0,.14);
  padding: 0.9rem 1rem;
  max-width: 15rem;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}}
.section {{
  padding: clamp(3rem, 7vw, 6rem) clamp(1rem, 4vw, 4rem);
  overflow: hidden;
}}
.inner {{ max-width: var(--max); margin: 0 auto; }}
.split {{
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}}
.panel {{
  border-top: 1px solid var(--black);
  border-bottom: 1px solid var(--black);
  padding: 1.4rem 0;
}}
.grid-3 {{
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}}
.grid-2 {{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}}
.tile {{
  background: var(--white);
  border: 1px solid rgba(0,0,0,.12);
  padding: clamp(1.1rem, 2vw, 1.6rem);
  min-height: 190px;
}}
.tile strong {{
  display: block;
  color: var(--black);
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.55rem;
}}
.gallery {{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.8rem;
}}
.gallery figure {{
  margin: 0;
  min-height: 280px;
  overflow: hidden;
  position: relative;
}}
.gallery figure:nth-child(1), .gallery figure:nth-child(5) {{ grid-column: span 5; }}
.gallery figure:nth-child(2), .gallery figure:nth-child(4) {{ grid-column: span 4; }}
.gallery figure:nth-child(3), .gallery figure:nth-child(6) {{ grid-column: span 3; }}
.gallery img {{ width: 100%; height: 100%; object-fit: cover; }}
.gallery figcaption {{
  position: absolute;
  left: 0.6rem;
  bottom: 0.6rem;
  background: rgba(255,255,255,.9);
  padding: 0.35rem 0.55rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: .12em;
}}
.quote {{
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  line-height: 1.08;
}}
.band-black {{ background: var(--black); color: var(--white); }}
.band-black h2, .band-black h3 {{ color: var(--white); }}
.band-blush {{ background: #efe0dc; }}
.band-aqua {{ background: #dbeceb; }}
.band-white {{ background: var(--white); }}
.numbered {{
  counter-reset: item;
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 1px;
  background: rgba(0,0,0,.16);
}}
.step {{
  background: var(--paper);
  padding: 1.2rem;
}}
.step::before {{
  counter-increment: item;
  content: counter(item, decimal-leading-zero);
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.5rem;
}}
.faq details {{
  border-top: 1px solid rgba(0,0,0,.18);
  padding: 1rem 0;
}}
.faq summary {{
  cursor: pointer;
  font-weight: 700;
  color: var(--black);
}}
.footer {{
  padding: 3rem clamp(1rem, 4vw, 4rem);
  background: var(--black);
  color: var(--white);
}}
.footer-grid {{
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 2rem;
  max-width: var(--max);
  margin: 0 auto;
}}
.option-two {{
  --paper: #fbf7f6;
  --black: #121212;
}}
.option-two .topbar {{ background: var(--aqua); color: var(--black); }}
.option-two .button {{ background: var(--gold); color: var(--black); border-color: var(--gold); }}
.option-two .button.secondary {{ background: transparent; border-color: var(--black); }}
.option-two h1 {{ max-width: 11ch; }}
.option-two .hero {{ background: linear-gradient(90deg, #fbf7f6 0%, #fbf7f6 72%, #dbeceb 72%); }}
.option-two .tile {{ border-color: rgba(194,163,108,.65); }}
@media (max-width: 900px) {{
  .hero, .split, .grid-2, .footer-grid {{ grid-template-columns: 1fr; }}
  .hero-media {{ min-height: 420px; }}
  .grid-3, .numbered {{ grid-template-columns: 1fr 1fr; }}
  .gallery figure, .gallery figure:nth-child(n) {{ grid-column: span 6; }}
}}
@media (max-width: 620px) {{
  .site-shell,
  main,
  .topbar,
  .nav,
  .hero,
  .hero-copy,
  .hero-media,
  .section {{
    max-width: 100vw;
  }}
  .topbar {{
    white-space: normal;
    line-height: 1.45;
    font-size: 0.5rem;
    letter-spacing: 0.08em;
    padding: 0.5rem 1rem;
  }}
  .nav {{ align-items: flex-start; flex-direction: column; }}
  .nav-links {{
    justify-content: flex-start;
    width: 100%;
    gap: 0.7rem 1rem;
  }}
  .nav-links .button {{ flex-basis: 100%; }}
  .nav-links a:not(.button):nth-of-type(n+4) {{ display: none; }}
  .hero-copy {{
    min-width: 0;
    width: 100vw;
    padding: 2.25rem 1.25rem;
  }}
  .hero-copy > * {{
    max-width: min(330px, calc(100vw - 2rem));
  }}
  .hero-copy p:has(.button) {{
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    align-items: stretch;
    width: min(330px, calc(100vw - 2rem));
  }}
  .button {{
    width: 100%;
    white-space: normal;
    text-align: center;
  }}
  .grid-3, .numbered {{ grid-template-columns: 1fr; }}
  .gallery figure, .gallery figure:nth-child(n) {{ grid-column: span 12; }}
  h1 {{
    font-size: clamp(2.25rem, 13vw, 3.15rem);
    max-width: min(330px, calc(100vw - 2rem));
    overflow-wrap: break-word;
  }}
  .lede {{
    max-width: min(330px, calc(100vw - 2rem));
    font-size: 0.92rem;
  }}
  .eyebrow {{
    max-width: min(330px, calc(100vw - 2rem));
    white-space: normal;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
  }}
}}
"""


def schema_block(page_type: str, name: str, description: str) -> str:
    return f"""
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "{page_type}",
  "name": "{html.escape(name)}",
  "description": "{html.escape(description)}",
  "provider": {{
    "@type": "LocalBusiness",
    "name": "Emily Kathryn Photography",
    "url": "https://www.emilykathryn.com",
    "areaServed": ["Danville VA", "Gretna VA", "Chatham VA", "Altavista VA", "Lynchburg VA"]
  }}
}}
</script>
"""


def nav(option_dir: Path, labels: list[tuple[str, str]], cta: str) -> str:
    links = "\n".join(
        f'<a href="{file_url(option_dir / href)}">{label}</a>' for label, href in labels
    )
    return f"""
<div class="topbar">Now booking a limited number of senior sessions</div>
<nav class="nav" aria-label="Main navigation">
  <a class="brand" href="{file_url(option_dir / "index.html")}">emily kathryn</a>
  <div class="nav-links">
    {links}
    <a class="button" href="{file_url(option_dir / cta)}">Inquire</a>
  </div>
</nav>
"""


def html_page(
    option_dir: Path,
    option_class: str,
    title: str,
    description: str,
    body: str,
    labels: list[tuple[str, str]],
    cta: str,
    schema: str = "",
) -> str:
    css_url = file_url(ASSETS / "ekp-options.css")
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(description)}">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(description)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{file_url(IMG / "hero-1.jpeg")}">
  <link rel="stylesheet" href="{css_url}">
  {schema}
</head>
<body class="{option_class}">
<div class="site-shell">
{nav(option_dir, labels, cta)}
{body}
<footer class="footer">
  <div class="footer-grid">
    <div>
      <div class="brand">emily kathryn</div>
      <p>Senior and family portrait photography for Danville, Gretna, Chatham, Altavista, Lynchburg, and surrounding South-Central Virginia communities.</p>
    </div>
    <div>
      <p class="eyebrow">Contact</p>
      <p>emily@emilykathryn.com<br>Gretna, Virginia</p>
    </div>
    <div>
      <p class="eyebrow">Follow</p>
      <p>Instagram | Facebook | TikTok</p>
    </div>
  </div>
</footer>
</div>
</body>
</html>
"""


def img(name: str, alt: str) -> str:
    return f'<img src="{file_url(IMG / name)}" alt="{html.escape(alt)}">'


OPTION_1_NAV = [
    ("Senior Portraits", "senior-portraits.html"),
    ("Family", "family-portraits.html"),
    ("Gallery", "gallery.html"),
    ("Investment", "investment.html"),
    ("About", "about.html"),
]

OPTION_2_NAV = [
    ("Senior Year", "senior-year.html"),
    ("Families", "family-stories.html"),
    ("Portfolios", "portfolios.html"),
    ("Raves", "raves.html"),
    ("About", "about.html"),
]


def option_one_pages() -> dict[str, str]:
    return {
        "index.html": html_page(
            OPTION_1,
            "",
            "Emily Kathryn Photography | Editorial Senior Portraits in Virginia",
            "A refined senior and family portrait experience across Danville, Gretna, Chatham, Altavista, and Lynchburg.",
            f"""
<main>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">South-Central Virginia Senior Photographer</p>
      <h1>Senior portraits with heirloom polish.</h1>
      <p class="lede">A guided portrait experience for girls who want to feel confident, modern, and completely themselves - and for parents who want the milestone preserved beautifully.</p>
      <p><a class="button" href="{file_url(OPTION_1 / "contact.html")}">Check Senior Availability</a> <a class="button secondary" href="{file_url(OPTION_1 / "gallery.html")}">View Gallery</a></p>
    </div>
    <div class="hero-media">{img("hero-1.jpeg", "Senior portrait in beautiful natural light")}<div class="hero-badge">Danville | Gretna | Chatham | Altavista | Lynchburg</div></div>
  </section>
  <section class="section band-white">
    <div class="inner split">
      <div>
        <p class="eyebrow">The EKP Difference</p>
        <h2>Every detail is guided.</h2>
        <p>From outfits and locations to posing and printed artwork, Emily helps each senior feel prepared instead of pressured. The experience is built for confidence first, then finished with images that deserve more than a camera roll.</p>
      </div>
      <div class="grid-2">
        <div class="tile"><strong>For seniors</strong>Feel beautiful, relaxed, and styled around your personality.</div>
        <div class="tile"><strong>For parents</strong>Know the process, timeline, investment, and keepsake options.</div>
        <div class="tile"><strong>For search</strong>Clear local pages and answer blocks replace thin duplicated copy.</div>
        <div class="tile"><strong>For memory</strong>Albums and wall art make the milestone visible at home.</div>
      </div>
    </div>
  </section>
  <section class="section band-black">
    <div class="inner split">
      <div><h2>Because senior year is a threshold.</h2></div>
      <p class="quote">"You are not booking pictures. You are preserving the last season before everything starts to change."</p>
    </div>
  </section>
</main>
""",
            OPTION_1_NAV,
            "contact.html",
            schema_block("LocalBusiness", "Emily Kathryn Photography", "Senior and family portrait photographer in South-Central Virginia."),
        ),
        "senior-portraits.html": html_page(
            OPTION_1,
            "",
            "Senior Portrait Photographer in Danville, Gretna and Lynchburg VA",
            "Guided high school senior portraits with planning, posing, retouching, and heirloom product support.",
            f"""
<main>
  <section class="hero">
    <div class="hero-copy"><p class="eyebrow">Senior Experience</p><h1>For the girl becoming herself.</h1><p class="lede">Emily plans each senior session around style, location, light, and personality. You do not need to know how to pose. You only need to show up ready to be guided.</p><p><a class="button" href="{file_url(OPTION_1 / "contact.html")}">Request the Senior Magazine</a></p></div>
    <div class="hero-media">{img("senior-3.jpeg", "High school senior portrait with polished editorial styling")}</div>
  </section>
  <section class="section"><div class="inner numbered"><div class="step"><h3>Plan</h3><p>We choose outfits, locations, and the overall feel before session day.</p></div><div class="step"><h3>Photograph</h3><p>Emily directs posing, movement, and expression for 2 to 3 hours.</p></div><div class="step"><h3>Reveal</h3><p>Sneak peeks are shared first, then professionally retouched images follow.</p></div><div class="step"><h3>Preserve</h3><p>Albums, wall art, and prints turn the milestone into something lasting.</p></div></div></section>
  <section class="section band-aqua"><div class="inner faq"><h2>Senior portrait questions</h2><details open><summary>How far ahead should we book senior pictures?</summary><p>Senior season fills early, especially spring, summer, and fall dates. Families should inquire months ahead when possible.</p></details><details><summary>What if I feel awkward in photos?</summary><p>That is normal. Emily guides posing, hands, movement, and expression throughout the session.</p></details><details><summary>Where do sessions happen?</summary><p>Sessions are planned around style and light across Danville, Gretna, Chatham, Altavista, Lynchburg, and surrounding areas.</p></details></div></section>
</main>
""",
            OPTION_1_NAV,
            "contact.html",
            schema_block("Service", "High School Senior Portraits", "Boutique senior portrait sessions in South-Central Virginia."),
        ),
        "family-portraits.html": html_page(
            OPTION_1,
            "",
            "Family Photographer in South-Central Virginia | Emily Kathryn",
            "Warm, polished family portrait sessions for South-Central Virginia families.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">Family Portraits</p><h1>Family portraits with room to breathe.</h1><p class="lede">A calm, guided session for families who want connection, polish, and images that feel like this season of life.</p><p><a class="button" href="{file_url(OPTION_1 / "contact.html")}">Plan a Family Session</a></p></div><div class="hero-media">{img("family-1.jpeg", "Family portrait in warm natural light")}</div></section>
<section class="section band-white"><div class="inner grid-3"><div class="tile"><strong>Guided posing</strong>Natural direction keeps everyone comfortable.</div><div class="tile"><strong>Location help</strong>Choose a field, home setting, downtown texture, or seasonal location.</div><div class="tile"><strong>Artwork ready</strong>Design portraits for albums, frames, and gifts.</div></div></section></main>
""",
            OPTION_1_NAV,
            "contact.html",
            schema_block("Service", "Family Portraits", "Family portrait sessions in South-Central Virginia."),
        ),
        "gallery.html": html_page(
            OPTION_1,
            "",
            "Senior Portrait Gallery | Emily Kathryn Photography",
            "A curated gallery of senior and family portraits by Emily Kathryn Photography.",
            f"""
<main><section class="section"><div class="inner"><p class="eyebrow">Portfolio</p><h1>Light, color, confidence.</h1><p class="lede">Gallery paths are organized by the way clients actually choose: style, setting, and personality.</p><div class="gallery">
<figure>{img("senior-1.jpeg", "Senior portrait in a field")}<figcaption>Country light</figcaption></figure>
<figure>{img("senior-5.jpeg", "Senior portrait in an editorial pose")}<figcaption>Editorial</figcaption></figure>
<figure>{img("senior-8.jpeg", "Senior cap and gown portrait")}<figcaption>Graduation</figcaption></figure>
<figure>{img("family-3.jpeg", "Family portrait outdoors")}<figcaption>Family</figcaption></figure>
<figure>{img("senior-10.jpeg", "Senior portrait with colorful styling")}<figcaption>Color story</figcaption></figure>
<figure>{img("gallery-2.jpeg", "Portrait gallery image")}<figcaption>Signature</figcaption></figure>
</div></div></section></main>
""",
            OPTION_1_NAV,
            "contact.html",
        ),
        "investment.html": html_page(
            OPTION_1,
            "",
            "Senior Portrait Investment | Emily Kathryn Photography",
            "Starting investment and booking details for Emily Kathryn Photography.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">Investment</p><h1>Experience starts at $799.</h1><p class="lede">Your session includes planning, professional direction, retouched digital images, and product guidance so the final result is easy to love and easy to preserve.</p><p><a class="button" href="{file_url(OPTION_1 / "contact.html")}">Ask for Detailed Pricing</a></p></div><div class="hero-media">{img("senior-11.jpeg", "Senior portrait with elegant styling")}</div></section>
<section class="section band-white"><div class="inner grid-3"><div class="tile"><strong>Included guidance</strong>Style, location, posing, and session flow.</div><div class="tile"><strong>Digital ease</strong>Retouched images for sharing and safekeeping.</div><div class="tile"><strong>Heirloom finish</strong>Albums, fine art prints, and wall art support.</div></div></section></main>
""",
            OPTION_1_NAV,
            "contact.html",
        ),
        "about.html": html_page(
            OPTION_1,
            "",
            "Meet Emily | Emily Kathryn Photography",
            "Meet Emily, the photographer behind Emily Kathryn Photography in Gretna, Virginia.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">Meet Emily</p><h1>The calm behind the camera.</h1><p class="lede">Emily is a wife, mom, and senior photographer who built her business around helping girls see their own beauty and confidence.</p><p><a class="button" href="{file_url(OPTION_1 / "contact.html")}">Work With Emily</a></p></div><div class="hero-media">{img("emily.jpeg", "Emily Kathryn Photography founder portrait")}</div></section>
<section class="section"><div class="inner split"><div><h2>Warm guidance. Editorial finish.</h2></div><p>Emily's role is part photographer, part confidence guide, and part detail manager. She helps plan the session, directs posing, watches the light, and makes sure the final images feel personal.</p></div></section></main>
""",
            OPTION_1_NAV,
            "contact.html",
            schema_block("Person", "Emily Kathryn Walker", "Senior and family photographer in South-Central Virginia."),
        ),
        "contact.html": html_page(
            OPTION_1,
            "",
            "Contact Emily Kathryn Photography | Senior Portrait Inquiry",
            "Inquire about senior or family portrait availability with Emily Kathryn Photography.",
            """
<main><section class="section"><div class="inner split"><div><p class="eyebrow">Inquire</p><h1>Tell Emily what you are dreaming up.</h1><p class="lede">Share your senior's name, school, ideal season, and the kind of session you want. Emily will follow up with details, availability, and the senior magazine.</p></div><form class="panel" aria-label="Inquiry form"><p><label>Full name<br><input style="width:100%;min-height:46px;border:1px solid #000;padding:.8rem" type="text"></label></p><p><label>Email<br><input style="width:100%;min-height:46px;border:1px solid #000;padding:.8rem" type="email"></label></p><p><label>What are you interested in?<br><textarea style="width:100%;min-height:150px;border:1px solid #000;padding:.8rem"></textarea></label></p><button type="submit">Send Inquiry</button></form></div></section></main>
""",
            OPTION_1_NAV,
            "contact.html",
        ),
    }


def option_two_pages() -> dict[str, str]:
    return {
        "index.html": html_page(
            OPTION_2,
            "option-two",
            "Emily Kathryn Photography | Modern Senior Portrait Experience",
            "A fresh, confident senior portrait website concept for Emily Kathryn Photography.",
            f"""
<main>
  <section class="hero">
    <div class="hero-copy"><p class="eyebrow">Modern Muse Concept</p><h1>Photos that feel like your senior year.</h1><p class="lede">Colorful, confident, guided senior portraits for the girl who wants images with personality and the parent who wants the process handled.</p><p><a class="button" href="{file_url(OPTION_2 / "inquire.html")}">Start Your Session Plan</a> <a class="button secondary" href="{file_url(OPTION_2 / "portfolios.html")}">See the Looks</a></p></div>
    <div class="hero-media">{img("hero-2.jpeg", "Colorful senior portrait session")}<div class="hero-badge">Styled around your personality</div></div>
  </section>
  <section class="section"><div class="inner grid-3"><div class="tile"><strong>Country</strong>Fields, barns, golden light, and relaxed movement.</div><div class="tile"><strong>Editorial</strong>Clean lines, fashion-inspired posing, and confident portraits.</div><div class="tile"><strong>Signature</strong>A full story that feels polished, personal, and easy to share.</div></div></section>
  <section class="section band-blush"><div class="inner split"><div><h2>Senior-led. Parent-approved.</h2></div><p class="quote">The website speaks visually to the senior, then gives parents the clarity they need: pricing, timing, process, products, and trust.</p></div></section>
</main>
""",
            OPTION_2_NAV,
            "inquire.html",
            schema_block("LocalBusiness", "Emily Kathryn Photography", "Modern senior portrait photographer in South-Central Virginia."),
        ),
        "senior-year.html": html_page(
            OPTION_2,
            "option-two",
            "Senior Year Portrait Experience | Emily Kathryn Photography",
            "A personality-led senior portrait experience for South-Central Virginia seniors.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">Senior Year</p><h1>Bring the outfits, the ideas, the real you.</h1><p class="lede">Emily turns your style, school story, favorite places, and personality into portraits that feel confident without feeling copied.</p><p><a class="button" href="{file_url(OPTION_2 / "inquire.html")}">Get Session Details</a></p></div><div class="hero-media">{img("senior-4.jpeg", "Senior portrait with vibrant style")}</div></section>
<section class="section band-aqua"><div class="inner numbered"><div class="step"><h3>Choose a vibe</h3><p>Editorial, country, floral, downtown, sports, or a custom mix.</p></div><div class="step"><h3>Plan outfits</h3><p>Bring options so the final gallery has range.</p></div><div class="step"><h3>Get directed</h3><p>No guessing what to do with your hands or smile.</p></div><div class="step"><h3>Share and keep</h3><p>Digital images now, artwork for later.</p></div></div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
            schema_block("Service", "Senior Portrait Experience", "Personality-led senior portrait sessions in South-Central Virginia."),
        ),
        "family-stories.html": html_page(
            OPTION_2,
            "option-two",
            "Family Stories | Emily Kathryn Photography",
            "Fresh, polished family portraits for South-Central Virginia families.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">Family Stories</p><h1>The family chapter you are in right now.</h1><p class="lede">A lighter, warmer family portrait direction that still feels polished enough for artwork and gifts.</p><p><a class="button" href="{file_url(OPTION_2 / "inquire.html")}">Ask About Family Dates</a></p></div><div class="hero-media">{img("family-4.jpeg", "Family portrait session in South-Central Virginia")}</div></section>
<section class="section"><div class="inner grid-3"><div class="tile"><strong>Easy direction</strong>Natural prompts and polished portraits.</div><div class="tile"><strong>Seasonal locations</strong>Fields, farms, downtown corners, and home-like settings.</div><div class="tile"><strong>Finished keepsakes</strong>Albums, frames, and gift prints.</div></div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
            schema_block("Service", "Family Portraits", "Family portrait sessions in South-Central Virginia."),
        ),
        "portfolios.html": html_page(
            OPTION_2,
            "option-two",
            "Portfolio Looks | Emily Kathryn Photography",
            "Style-led senior and family portfolio for Emily Kathryn Photography.",
            f"""
<main><section class="section"><div class="inner"><p class="eyebrow">Portfolio Looks</p><h1>Find your photo personality.</h1><p class="lede">This gallery structure helps seniors self-identify and helps search engines understand the range of services.</p><div class="gallery">
<figure>{img("senior-2.jpeg", "Modern senior portrait")}<figcaption>Modern</figcaption></figure>
<figure>{img("senior-6.jpeg", "Senior portrait in flowers")}<figcaption>Floral</figcaption></figure>
<figure>{img("senior-7.jpeg", "Senior portrait in country setting")}<figcaption>Country</figcaption></figure>
<figure>{img("senior-12.jpeg", "Senior portrait with graduation style")}<figcaption>Graduate</figcaption></figure>
<figure>{img("gallery-3.jpeg", "Portrait gallery detail")}<figcaption>Color</figcaption></figure>
<figure>{img("family-5.jpeg", "Family portrait outdoors")}<figcaption>Family</figcaption></figure>
</div></div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
        ),
        "raves.html": html_page(
            OPTION_2,
            "option-two",
            "Senior Raves | Emily Kathryn Photography",
            "Testimonials and senior portrait client experience proof for Emily Kathryn Photography.",
            f"""
<main><section class="section band-white"><div class="inner"><p class="eyebrow">Raves</p><h1>They felt the difference.</h1><div class="grid-3"><div class="tile"><p class="quote">"I felt so comfortable behind the camera."</p><strong>Senior confidence</strong></div><div class="tile"><p class="quote">"Every picture came out magical and beautiful."</p><strong>Parent trust</strong></div><div class="tile"><p class="quote">"It was an experience of a lifetime."</p><strong>Milestone memory</strong></div></div><p><a class="button" href="{file_url(OPTION_2 / "inquire.html")}">Ask About Availability</a></p></div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
        ),
        "about.html": html_page(
            OPTION_2,
            "option-two",
            "About Emily | Emily Kathryn Photography",
            "About Emily Kathryn Photography, a senior and family photographer in Gretna, Virginia.",
            f"""
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">About Emily</p><h1>Part artist. Part hype woman. Part detail guide.</h1><p class="lede">Emily helps seniors feel relaxed, seen, and proud of how their portraits represent who they are right now.</p><p><a class="button" href="{file_url(OPTION_2 / "inquire.html")}">Meet Emily Through the Process</a></p></div><div class="hero-media">{img("emily.jpeg", "Emily Kathryn photographer portrait")}</div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
            schema_block("Person", "Emily Kathryn Walker", "Senior and family photographer in Gretna, Virginia."),
        ),
        "inquire.html": html_page(
            OPTION_2,
            "option-two",
            "Inquire | Emily Kathryn Photography",
            "Inquire for senior or family portrait sessions with Emily Kathryn Photography.",
            """
<main><section class="section"><div class="inner split"><div><p class="eyebrow">Inquire</p><h1>Start with your senior's story.</h1><p class="lede">Tell Emily the school year, preferred season, style ideas, and what you want the images to feel like. You will receive session details and next steps.</p></div><form class="panel" aria-label="Inquiry form"><p><label>Parent name<br><input style="width:100%;min-height:46px;border:1px solid #000;padding:.8rem" type="text"></label></p><p><label>Email<br><input style="width:100%;min-height:46px;border:1px solid #000;padding:.8rem" type="email"></label></p><p><label>Senior name, school, and vision<br><textarea style="width:100%;min-height:150px;border:1px solid #000;padding:.8rem"></textarea></label></p><button type="submit">Send Inquiry</button></form></div></section></main>
""",
            OPTION_2_NAV,
            "inquire.html",
        ),
    }


def write_websites():
    (ASSETS / "ekp-options.css").write_text(CSS.strip() + "\n", encoding="utf-8")
    for filename, content in option_one_pages().items():
        (OPTION_1 / filename).write_text(content, encoding="utf-8")
    for filename, content in option_two_pages().items():
        (OPTION_2 / filename).write_text(content, encoding="utf-8")


def main():
    for path in [RESEARCH, ASSETS, OPTION_1, OPTION_2]:
        path.mkdir(parents=True, exist_ok=True)
    md_paths = write_md()
    pdfs = write_pdfs(md_paths)
    write_websites()
    print("Generated markdown:")
    for path in md_paths:
        print(path)
    print("Generated PDFs:")
    for path in pdfs:
        print(path)
    print("Generated website options:")
    print(OPTION_1 / "index.html")
    print(OPTION_2 / "index.html")


if __name__ == "__main__":
    main()
