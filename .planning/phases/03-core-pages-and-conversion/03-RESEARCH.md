# Phase 3: Core Pages and Conversion - Research

**Researched:** 2026-02-22
**Domain:** Next.js App Router page architecture, Server Actions form handling, Resend email delivery, spam protection, OG metadata
**Confidence:** HIGH

## Summary

Phase 3 transforms the foundation and shared components from Phases 1-2 into 8 fully functional pages with a complete inquiry-to-email conversion funnel. The technical work spans four domains: (1) page composition using existing shared components (Section, GalleryGrid, PricingCard, Storyboard, AnswerBlock, ScarcityCue, JsonLd) with new Sanity queries, (2) inquiry form built on React 19 `useActionState` + Server Actions with Zod validation, (3) email delivery via Resend SDK with React Email templates for both notification and auto-responder, and (4) spam protection via honeypot field + in-memory rate limiting.

The existing codebase is well-prepared. Phase 2 established all shared UI components, Sanity schemas (gallery, testimonial, pricingTier, scarcityCue), GROQ queries with IMAGE_FIELDS projection, the sanityFetch ISR wrapper, and the SanityImage pipeline. Phase 3 composes these into pages and adds the inquiry form infrastructure. The site layout already has the persistent CTA in the header nav (gold button linking to /contact), footer CTA as text link, and the title template system (`%s | Emily Kathryn Photography`).

**Primary recommendation:** Build pages as Server Components composing existing shared components with new GROQ queries; implement the inquiry form as a single Server Action in `src/app/actions/inquiry.ts` handling validation, honeypot check, rate limiting, Resend notification email, and scheduled Resend auto-responder (~10 min delay via `scheduledAt`).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hero format, scroll journey order, scarcity cue placement, and testimonial format are all Claude's discretion -- informed by the brand board (editorial/magazine aesthetic, Yo Andy + Acrom fonts, black/gold/blush/sage/gray palette), PROJECT.md context, and existing emilykathryn.com patterns
- Hero must be gender-inclusive (boys AND girls) per requirements
- The "Inquire for Detailed Pricing" CTA must be visible in sticky nav and within 2 scrolls on mobile
- Form placement strategy: Claude's discretion on whether form lives only on Contact page, appears inline on service pages, or uses a modal pattern
- Auto-responder: Warm tone, thank by name, confirm what they inquired about, set response time expectation of "within 48 hours"
- Persistent CTA copy: Claude's discretion on exact wording (balancing clarity with mobile nav space)
- Session pricing visible on the site: "Starting At" with CMS-managed price per service
- Product package pricing is NOT shown on the website -- only shared after Emily's 15-minute discovery conversation
- Use placeholder prices in CMS that Emily updates in Sanity Studio before launch (senior and family prices managed independently)
- Whether to tease product packages on the Investment page: Claude's discretion
- Brand voice reference: the existing emilykathryn.com copy IS the voice -- Claude studies it and matches that tone
- Voice is "warm, confident, editorial" -- speaks to both teens and parents
- About page story angle: Claude's discretion
- Senior Style/Wardrobe Guide: Comprehensive guide with detailed sections -- outfit count, color theory, seasonal advice, layering, accessories, what to avoid, and guy-specific tips
- FAQ sections: Distinctly different between Senior and Family pages -- Senior FAQs address grad year, outfit changes, group sessions; Family FAQs address kids ages, pets, scheduling logistics
- Raves page layout, Experience Storyboard content, OG metadata strategy: Claude's discretion
- Emily's response time to inquiries is within 48 hours -- auto-responder must set this expectation
- Session shoots start at $400 -- this is the "Starting At" anchor
- Senior and Family prices are managed independently in CMS (not assumed same)
- The Style Guide should be a genuine resource, not a thin page -- it serves both conversion (demonstrates expertise) and SEO value
- Brand board shows editorial/magazine inspiration (Yo Andy serif + Acrom sans-serif, black/gold/blush/sage/gray palette, quatrefoil and geometric patterns)

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

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | Homepage -- senior-focused hero (boys AND girls), portfolio preview grid, testimonials, scarcity cue, persistent CTA | Existing components: GalleryGrid, ScarcityCue, Section. New: hero section with SanityImage priority loading, testimonial cards, portfolio preview GROQ query. Persistent CTA already in HeaderClient. |
| PAGE-02 | Senior Portraits service page -- gallery, session description, Experience Storyboard, "Starting At" pricing, FAQ section, CTA | Existing: GalleryGrid, Storyboard, PricingCard, AnswerBlock. New: GROQ queries for senior-specific gallery, testimonials, pricing tier. Distinct Senior FAQ content. |
| PAGE-03 | Family Portraits service page -- gallery, session description, "Starting At" pricing, FAQ section, CTA | Same component set as PAGE-02. Different GROQ params (category: "family"), different FAQ content, different pricing tier. No Storyboard per requirements (only Senior has Experience Storyboard). |
| PAGE-04 | About page -- Emily's professional photo, personal story, photography philosophy | SanityImage for Emily's photo, Section wrapper. Primarily content/copy page. May add Sanity schema for about page content or hardcode with future CMS migration path. |
| PAGE-05 | Contact page -- inquiry form as primary element, business info, service area | Server Action form with useActionState, Zod validation, honeypot, Resend integration. siteConfig for business info. |
| PAGE-06 | Investment/Pricing page -- package overview with "Starting At" pricing, what's included, CTA | PricingCard components fed by PRICING_TIERS_QUERY. "Starting At" anchor strategy. Product packages teased but not priced. |
| PAGE-07 | Raves/Testimonials page -- dedicated page with client reviews, photos where available | TESTIMONIALS_QUERY (all, no filter). Testimonial card layout with optional SanityImage. |
| PAGE-08 | Senior Style/Wardrobe Guide page -- outfit tips, color recommendations, seasonal advice | Content-heavy page. Section wrappers with structured content. Genuine resource page for SEO value. |
| CONV-01 | Inquiry form with fields: Name, Email, Phone (optional), Service Type dropdown, Grad Year (conditional), High School (conditional), "Tell us about your dream session" textarea | Server Action + useActionState + Zod schema. Conditional fields show/hide based on Service Type = "Senior". |
| CONV-02 | Inquiry form submissions send email notification to Emily | Resend SDK `emails.send()` with React Email template for notification. From: noreply@emilykathryn.com, To: Emily's email. |
| CONV-03 | Auto-responder email sent ~10 minutes after inquiry submission | Resend `scheduledAt: "in 10 min"` parameter on second `emails.send()` call. Warm tone, thank by name, confirm service type, "within 48 hours" expectation. |
| CONV-04 | Persistent "Inquire for Detailed Pricing" CTA in nav bar and high-contrast button on every page | Already implemented in HeaderClient (gold button). Success criterion: visible within 2 scrolls on mobile -- verify with page layouts. |
| CONV-05 | "Starting At" pricing displayed on Senior and Family service pages | PricingCard component already built. GROQ query filters pricingTier by service type or uses sortOrder. |
| CONV-06 | CMS-managed scarcity cues with visibility toggle | ScarcityCue component + scarcityCue schema + ACTIVE_SCARCITY_CUE_QUERY already built. Compose into homepage and optionally service pages. |
| CONV-07 | Client testimonials displayed on homepage, service pages, and city landing pages (CMS-managed) | Testimonial schema + TESTIMONIALS_QUERY already built with featured/service filtering. Compose testimonial display cards. |
| CONT-01 | Experience Storyboards on Senior Portraits page | Storyboard component already built. Content for steps: Consultation > Wardrobe Planning > Session Day > Gallery Reveal > Product Delivery. |
| CONT-02 | FAQ sections on service pages | AnswerBlock component already built. Distinct content: Senior vs Family FAQ items. |
| CONT-03 | All page copy written in Emily's brand voice -- warm, confident, editorial | Brand voice research: study emilykathryn.com patterns, match tone. Copy written during page implementation. |
| CONT-04 | SEO copy (partial -- city landing pages are Phase 5, but brand-voice copy across all Phase 3 pages) | Copy generation guided by voice reference. Partial fulfillment in Phase 3 for core pages. |
| INFRA-01 | Email delivery via Resend | Resend SDK installation, API key setup, domain verification (SPF/DKIM), React Email templates. |
| INFRA-03 | Form spam protection (honeypot + rate limiting) | Hidden honeypot field + in-memory Map rate limiter (IP-based, 5 submissions per 15 min). |
| SEO-09 | OG metadata and social sharing images per page | Next.js Metadata API with per-page exports. Static `metadata` objects for known pages. OG images via file-based `opengraph-image.tsx` or static image references. |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.12 | App Router, Server Actions, Metadata API, ISR | Already installed, foundation of project |
| react | 19.1.0 | useActionState for form state, useFormStatus for pending states | Already installed |
| sanity | ^4.22.0 | CMS for all content (galleries, testimonials, pricing, scarcity cues) | Already installed, schemas defined |
| next-sanity | ^11.6.12 | GROQ queries, sanityFetch wrapper, webhook parsing | Already installed |
| tailwindcss | ^4 | Styling with brand design tokens | Already installed with theme configured |
| schema-dts | ^1.1.5 | TypeScript types for JSON-LD structured data | Already installed |
| yet-another-react-lightbox | ^3.29.1 | Gallery lightbox | Already installed |

### New Dependencies Required
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| resend | ^4.x | Email delivery SDK (notification + auto-responder) | Official Resend Node.js SDK, integrates with React Email templates |
| @react-email/components | ^1.0.8 | Email template components (Html, Body, Container, Text, Heading, etc.) | Official React Email library by Resend team, renders JSX to email-safe HTML |
| zod | ^3.24.x or ^4.x | Server-side form validation with type inference | Next.js docs recommend Zod for Server Action validation, zero dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| zod | Native FormData validation | Zod provides type inference, structured errors, better DX; worth the ~2kb |
| @react-email/components | Raw HTML strings | React Email provides cross-client compatibility (Gmail, Outlook, Apple Mail); worth it for the notification + auto-responder templates |
| In-memory rate limiter | @upstash/ratelimit + Redis | Upstash is better for multi-instance/serverless but adds external dependency + cost; in-memory Map is sufficient for a single-photographer inquiry form with low volume |
| Static OG images | Dynamic opengraph-image.tsx (ImageResponse) | Dynamic generation adds edge compute cost and complexity; for 8 known pages, curated static images or simple branded OG images are more reliable and performant |

**Installation:**
```bash
npm install resend @react-email/components zod
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                    # Homepage (PAGE-01)
│   │   ├── senior-portraits/
│   │   │   └── page.tsx                # Senior service page (PAGE-02)
│   │   ├── family-portraits/
│   │   │   └── page.tsx                # Family service page (PAGE-03)
│   │   ├── about/
│   │   │   └── page.tsx                # About page (PAGE-04)
│   │   ├── contact/
│   │   │   └── page.tsx                # Contact + form (PAGE-05)
│   │   ├── investment/
│   │   │   └── page.tsx                # Pricing page (PAGE-06)
│   │   ├── raves/
│   │   │   └── page.tsx                # Testimonials page (PAGE-07)
│   │   ├── style-guide/
│   │   │   └── page.tsx                # Wardrobe guide (PAGE-08)
│   │   └── layout.tsx                  # Existing site layout
│   └── actions/
│       └── inquiry.ts                  # Server Action for form submission
├── components/
│   ├── layout/                         # Existing (Header, Footer, MobileNav)
│   ├── shared/                         # Existing (Section, PricingCard, etc.)
│   ├── home/                           # Homepage-specific sections
│   │   ├── Hero.tsx                    # Hero section with SanityImage
│   │   ├── PortfolioPreview.tsx        # Portfolio preview grid
│   │   ├── TestimonialCarousel.tsx     # Homepage testimonials
│   │   └── HomeCTA.tsx                 # Mid-page CTA section
│   ├── forms/
│   │   ├── InquiryForm.tsx             # Client component with useActionState
│   │   └── SubmitButton.tsx            # useFormStatus submit button
│   └── testimonials/
│       └── TestimonialCard.tsx         # Reusable testimonial display
├── emails/
│   ├── InquiryNotification.tsx         # React Email: notification to Emily
│   └── InquiryAutoResponder.tsx        # React Email: auto-reply to client
├── lib/
│   ├── siteConfig.ts                   # Existing NAP config
│   ├── inquiry-schema.ts              # Zod schema for inquiry form
│   └── rate-limit.ts                   # In-memory rate limiter
└── sanity/
    ├── schemas/                        # Existing schemas
    └── lib/
        ├── queries.ts                  # Existing + new page-specific queries
        └── fetch.ts                    # Existing sanityFetch wrapper
```

### Pattern 1: Server Component Pages with sanityFetch
**What:** Each page is a Server Component that fetches data via sanityFetch, passes to shared components.
**When to use:** Every page in Phase 3 (all 8 core pages).
**Example:**
```typescript
// Source: Established project pattern from Phase 1-2
import { sanityFetch } from '@/sanity/lib/fetch'
import { TESTIMONIALS_QUERY, ACTIVE_SCARCITY_CUE_QUERY } from '@/sanity/lib/queries'
import { Section } from '@/components/shared/Section'
import { ScarcityCue } from '@/components/shared/ScarcityCue'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Senior Portraits',
  description: 'Editorial-style senior portrait photography...',
  openGraph: {
    title: 'Senior Portraits | Emily Kathryn Photography',
    description: 'Editorial-style senior portrait photography...',
    images: [{ url: '/og/senior-portraits.jpg', width: 1200, height: 630 }],
  },
}

export default async function SeniorPortraitsPage() {
  const [testimonials, scarcityCue] = await Promise.all([
    sanityFetch<Testimonial[]>({
      query: TESTIMONIALS_QUERY,
      params: { featured: null, service: 'senior' },
      tags: ['testimonial'],
    }),
    sanityFetch<ScarcityCue | null>({
      query: ACTIVE_SCARCITY_CUE_QUERY,
      tags: ['scarcityCue'],
    }),
  ])
  // ... compose with shared components
}
```

### Pattern 2: Server Action with useActionState for Inquiry Form
**What:** Form submission handled by a Server Action that validates with Zod, checks honeypot, rate-limits, sends emails via Resend, and returns state to the client.
**When to use:** Contact page inquiry form (CONV-01, CONV-02, CONV-03).
**Example:**
```typescript
// Source: Next.js official forms guide (https://nextjs.org/docs/app/guides/forms)
// Server Action: src/app/actions/inquiry.ts
'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limit'
import { InquiryNotification } from '@/emails/InquiryNotification'
import { InquiryAutoResponder } from '@/emails/InquiryAutoResponder'

const resend = new Resend(process.env.RESEND_API_KEY)

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  serviceType: z.enum(['senior', 'family', 'other']),
  gradYear: z.string().optional(),
  highSchool: z.string().optional(),
  message: z.string().min(1, 'Please tell us about your dream session'),
  // Honeypot field -- must be empty
  website: z.string().max(0, 'Bot detected').optional(),
})

export type InquiryState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  // 1. Honeypot check
  if (formData.get('website')) {
    // Silently reject -- don't reveal detection
    return { success: true, message: 'Thank you!' }
  }

  // 2. Rate limiting
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return { success: false, message: 'Too many submissions. Please try again later.' }
  }

  // 3. Validation
  const validatedFields = inquirySchema.safeParse(
    Object.fromEntries(formData)
  )
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data

  try {
    // 4. Send notification to Emily
    await resend.emails.send({
      from: 'Emily Kathryn Photography <noreply@emilykathryn.com>',
      to: [process.env.NOTIFICATION_EMAIL!],
      replyTo: data.email,
      subject: `New ${data.serviceType} inquiry from ${data.name}`,
      react: InquiryNotification({ ...data }),
    })

    // 5. Schedule auto-responder (~10 min delay)
    await resend.emails.send({
      from: 'Emily Kathryn Photography <hello@emilykathryn.com>',
      to: [data.email],
      subject: `Thanks for reaching out, ${data.name}!`,
      react: InquiryAutoResponder({ name: data.name, serviceType: data.serviceType }),
      scheduledAt: 'in 10 min',
    })

    return { success: true, message: 'Your inquiry has been sent!' }
  } catch {
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
```

```typescript
// Client form: src/components/forms/InquiryForm.tsx
'use client'

import { useActionState } from 'react'
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry'
import { SubmitButton } from './SubmitButton'

const initialState: InquiryState = { success: false, message: '' }

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState)

  return (
    <form action={formAction}>
      {/* Honeypot -- visually hidden, labeled to avoid a11y warnings */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Visible fields */}
      <input name="name" required ... />
      <input name="email" type="email" required ... />
      <input name="phone" type="tel" ... />
      <select name="serviceType" required>...</select>
      {/* Conditional: gradYear, highSchool -- show when serviceType === 'senior' */}
      <textarea name="message" required ... />

      <SubmitButton />
      {state.message && <p aria-live="polite">{state.message}</p>}
    </form>
  )
}
```

### Pattern 3: In-Memory Rate Limiter
**What:** Simple Map-based IP rate limiting for serverless functions.
**When to use:** Server Action spam protection (INFRA-03).
**Example:**
```typescript
// Source: https://www.freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs/
// src/lib/rate-limit.ts
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5 // 5 submissions per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_REQUESTS) {
    return false
  }

  entry.count++
  return true
}

// Cleanup stale entries periodically (prevent memory leak)
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, WINDOW_MS)
```

### Pattern 4: React Email Templates
**What:** JSX-based email templates using @react-email/components for cross-client rendering.
**When to use:** Notification to Emily (CONV-02), auto-responder to client (CONV-03).
**Example:**
```typescript
// Source: Resend + React Email docs (https://resend.com/docs/send-with-nextjs)
// src/emails/InquiryAutoResponder.tsx
import { Html, Head, Body, Container, Text, Heading, Hr } from '@react-email/components'

interface AutoResponderProps {
  name: string
  serviceType: string
}

export function InquiryAutoResponder({ name, serviceType }: AutoResponderProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading as="h1" style={{ fontSize: '24px', fontWeight: 'normal' }}>
            Thank you, {name}!
          </Heading>
          <Text>
            We received your {serviceType === 'senior' ? 'senior portrait' : 'family portrait'} inquiry
            and are so excited to hear from you!
          </Text>
          <Text>
            Emily will personally review your message and get back to you within 48 hours.
            In the meantime, feel free to browse our portfolio for inspiration.
          </Text>
          <Hr />
          <Text style={{ fontSize: '14px', color: '#737373' }}>
            Emily Kathryn Photography | Gretna, VA
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Pattern 5: Per-Page Static Metadata with OG
**What:** Export `metadata` object from each page.tsx with OpenGraph fields.
**When to use:** All 8 core pages (SEO-09).
**Example:**
```typescript
// Source: Next.js Metadata API (https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Senior Portraits',
  description: 'Editorial-style senior portrait photography in South-Central Virginia. Boys and girls. Serving Chatham, Danville, Lynchburg, Smith Mountain Lake.',
  openGraph: {
    title: 'Senior Portraits | Emily Kathryn Photography',
    description: 'Editorial-style senior portrait photography in South-Central Virginia.',
    url: 'https://emilykathryn.com/senior-portraits',
    siteName: 'Emily Kathryn Photography',
    images: [
      {
        url: '/og/senior-portraits.jpg',
        width: 1200,
        height: 630,
        alt: 'Senior portrait by Emily Kathryn Photography',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Portraits | Emily Kathryn Photography',
    description: 'Editorial-style senior portrait photography in South-Central Virginia.',
    images: ['/og/senior-portraits.jpg'],
  },
}
```

### Anti-Patterns to Avoid
- **Client-side-only form validation:** Always validate server-side with Zod in the Server Action. Client HTML validation (required, type="email") is progressive enhancement only.
- **Exposing Resend API key to client:** The `resend` import and `emails.send()` MUST only run inside Server Actions or API routes. Never import in a `'use client'` component.
- **Using API route for form submission:** Server Actions are the recommended Next.js pattern. Don't create `/api/inquiry/route.ts` when a Server Action does the same with better DX and progressive enhancement.
- **Fetching all data in layout.tsx:** Each page should fetch its own data. Layout provides structure only (header/footer). This avoids waterfall fetches and keeps each page independently cacheable.
- **Hardcoding pricing values:** All prices come from Sanity pricingTier schema. Even placeholder values go in Sanity, not in TSX.
- **Using `generateMetadata` for static pages:** When page metadata is known at build time (all 8 core pages), use the simpler `export const metadata` object, not the async `generateMetadata` function.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email rendering | Custom HTML email strings | @react-email/components | Email clients (Outlook, Gmail, Apple Mail) have wildly inconsistent HTML/CSS support; React Email handles cross-client compatibility |
| Form validation | Manual `if/else` chains | Zod schema + safeParse | Zod provides structured error messages, TypeScript type inference from schema, and composable validation |
| Email delivery | SMTP transport / nodemailer | Resend SDK | Resend handles deliverability, bounce tracking, scheduling (scheduledAt), and provides React template integration |
| Rate limiting (production scale) | Custom distributed solution | @upstash/ratelimit (if needed) | In-memory Map works for single-instance serverless; if Emily scales to multiple inquiry forms or higher traffic, Upstash is the upgrade path |
| OG images (known pages) | Dynamic ImageResponse generation | Static OG images (1200x630) in /public/og/ | For 8 known pages, static images are simpler, faster, and more reliable than edge-computed dynamic images |

**Key insight:** The inquiry form is the critical conversion piece. Resend's `scheduledAt` parameter handles the auto-responder delay natively -- don't build a cron job, queue, or setTimeout-based solution. The scheduling happens server-side at Resend.

## Common Pitfalls

### Pitfall 1: Resend Domain Not Verified Before Form Testing
**What goes wrong:** Emails silently fail or get rejected because the sending domain (emilykathryn.com) hasn't been verified with Resend.
**Why it happens:** Resend requires DNS records (SPF TXT + DKIM CNAME) before sending from a custom domain. Development uses `onboarding@resend.dev` but production needs the real domain.
**How to avoid:** Set up Resend domain verification FIRST. Add DNS records to emilykathryn.com: SPF TXT record and DKIM CNAME records from Resend dashboard. Use subdomain strategy (e.g., `send.emilykathryn.com`) to isolate sending reputation. During development, use `onboarding@resend.dev` as the `from` address.
**Warning signs:** `emails.send()` returns error object instead of `{ id }` response; emails don't arrive.

### Pitfall 2: Server Action Body Size / FormData Gotchas
**What goes wrong:** `Object.fromEntries(formData)` creates an object with `$ACTION_` prefixed internal keys that confuse Zod validation.
**Why it happens:** React Server Actions inject internal metadata fields into FormData.
**How to avoid:** Use explicit `formData.get('fieldName')` for each field and construct the validation object manually, or filter out `$ACTION_` keys before passing to Zod.
**Warning signs:** Zod `.passthrough()` reveals unexpected keys; validation fails on fields that shouldn't exist.

### Pitfall 3: Honeypot Field Visible to Screen Readers
**What goes wrong:** Screen reader users encounter the honeypot field and fill it in, causing false positives that block legitimate submissions.
**Why it happens:** Using `display: none` or `visibility: hidden` hides from visual users but may still be announced. Using only `aria-hidden` without proper positioning may not hide it visually.
**How to avoid:** Combine `aria-hidden="true"`, `tabIndex={-1}`, and absolute positioning off-screen (`left: -9999px`). Add `autoComplete="off"` to prevent browser autofill.
**Warning signs:** Legitimate users report form submission silently "succeeding" but Emily never receives the inquiry.

### Pitfall 4: Rate Limiter Memory Leak in Serverless
**What goes wrong:** In-memory Map grows unbounded because serverless function cold starts create new Maps, but warm instances accumulate stale entries.
**Why it happens:** `setInterval` for cleanup may not fire reliably in serverless environments; Map is per-instance and not shared across instances.
**How to avoid:** Add stale entry cleanup at the START of each `checkRateLimit` call (lazy cleanup), not just via `setInterval`. Accept that in-memory rate limiting is approximate in serverless -- it protects against rapid-fire bots on the same instance, not sophisticated distributed attacks. The honeypot catches most bots; rate limiting is defense-in-depth.
**Warning signs:** Server memory usage creeping up; different serverless instances allowing the same IP to exceed limits.

### Pitfall 5: Conditional Form Fields Not Validated Correctly
**What goes wrong:** When Service Type is "Senior", gradYear and highSchool should be required but Zod schema makes them optional for all cases, allowing seniors to submit without required info.
**Why it happens:** Simple flat schema doesn't account for conditional requirements.
**How to avoid:** Use Zod `.refine()` or `.superRefine()` to add conditional validation: if serviceType === 'senior', gradYear must be present.
**Warning signs:** Emily receives senior inquiries missing graduation year.

### Pitfall 6: Metadata Merging Overwrites OG Description
**What goes wrong:** Page sets `openGraph.title` but not `openGraph.description`, expecting to inherit from layout -- but Next.js metadata merging is SHALLOW, so the entire `openGraph` object from layout is replaced.
**Why it happens:** Next.js metadata merge replaces entire nested objects, not individual fields.
**How to avoid:** Every page that sets ANY `openGraph` field must set ALL required OG fields (title, description, image, url). Use a shared helper function or spread from a shared object.
**Warning signs:** Social media previews show missing descriptions or wrong images.

### Pitfall 7: Auto-Responder Reveals Internal Errors
**What goes wrong:** The auto-responder `scheduledAt` call fails silently and the customer never gets a confirmation email, or the error surfaces to the user.
**Why it happens:** Two sequential `emails.send()` calls -- if the notification succeeds but the auto-responder fails, the inquiry was received but the user experience is broken.
**How to avoid:** Wrap each Resend call independently. Log auto-responder failures but don't fail the entire submission. The notification to Emily is critical; the auto-responder is nice-to-have. Return success to the user if the notification sent, even if auto-responder scheduling fails.
**Warning signs:** Emily receives inquiries but customers report never getting a confirmation.

## Code Examples

### Homepage Hero with Priority Loading
```typescript
// Verified pattern from project codebase (SanityImage + priority loading from Phase 2)
<Section>
  <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-lg">
    <SanityImage
      asset={hero.asset}
      alt={hero.alt || "Senior portrait session"}
      hotspot={hero.hotspot}
      fill
      sizes="100vw"
      priority
      fetchPriority="high"
      className="object-cover"
    />
    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent p-8 md:p-12">
      <div className="text-white">
        <h1 className="font-heading text-4xl font-light md:text-6xl">
          Your Story. Your Session. Your Moment.
        </h1>
        <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded bg-brand-gold px-6 py-3 text-sm tracking-wide text-white">
          Inquire for Detailed Pricing
        </Link>
      </div>
    </div>
  </div>
</Section>
```

### Testimonial Card Component
```typescript
// New component for Phase 3, follows project patterns
interface TestimonialCardProps {
  name: string
  quote: string
  service?: string
  image?: SanityImageAsset
}

export function TestimonialCard({ name, quote, service, image }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      {image && (
        <div className="mb-4 h-16 w-16 overflow-hidden rounded-full">
          <SanityImage asset={image} alt={name} sizes="64px" className="h-full w-full object-cover" />
        </div>
      )}
      <blockquote className="text-muted-foreground italic">"{quote}"</blockquote>
      <p className="mt-3 font-heading text-sm">
        — {name}
        {service && <span className="text-muted-foreground"> · {service === 'senior' ? 'Senior Session' : 'Family Session'}</span>}
      </p>
    </div>
  )
}
```

### Conditional Form Fields (Senior-specific)
```typescript
// Follows Next.js forms guide pattern with useActionState
const [serviceType, setServiceType] = useState('senior')

<select
  name="serviceType"
  required
  value={serviceType}
  onChange={(e) => setServiceType(e.target.value)}
  className="min-h-11 rounded border border-border px-3"
>
  <option value="senior">Senior Portraits</option>
  <option value="family">Family Portraits</option>
  <option value="other">Other / Not Sure</option>
</select>

{serviceType === 'senior' && (
  <>
    <input name="gradYear" placeholder="Graduation Year (e.g., 2027)" required className="..." />
    <input name="highSchool" placeholder="High School" required className="..." />
  </>
)}
```

### Zod Schema with Conditional Validation
```typescript
// Source: Zod docs (https://zod.dev)
const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(20).optional().or(z.literal('')),
  serviceType: z.enum(['senior', 'family', 'other'], {
    errorMap: () => ({ message: 'Please select a service type' }),
  }),
  gradYear: z.string().optional().or(z.literal('')),
  highSchool: z.string().optional().or(z.literal('')),
  message: z.string().min(10, 'Please tell us a bit more about your dream session').max(2000),
  website: z.string().max(0).optional(), // honeypot
}).refine(
  (data) => {
    if (data.serviceType === 'senior') {
      return data.gradYear && data.gradYear.length > 0
    }
    return true
  },
  { message: 'Graduation year is required for senior sessions', path: ['gradYear'] }
).refine(
  (data) => {
    if (data.serviceType === 'senior') {
      return data.highSchool && data.highSchool.length > 0
    }
    return true
  },
  { message: 'High school is required for senior sessions', path: ['highSchool'] }
)
```

### Environment Variables Required
```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx          # From Resend dashboard
NOTIFICATION_EMAIL=emily@emilykathryn.com  # Where inquiry notifications go
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API route handler for forms | Server Actions with `'use server'` | React 19 / Next.js 14+ (stable) | Progressive enhancement, no client JS required for form submission |
| `useFormState` (React DOM) | `useActionState` (React) | React 19 | Renamed and moved from `react-dom` to `react`; `useFormState` deprecated |
| nodemailer + SMTP | Resend SDK with React Email | 2023-present | Better DX, built-in scheduling, React template support, free tier |
| reCAPTCHA for spam | Honeypot + rate limiting | Ongoing | No third-party scripts, no CAPTCHA friction, no Google dependency; sufficient for low-volume inquiry forms |
| getServerSideProps data fetching | Server Component async functions + sanityFetch | Next.js 13+ App Router | Data fetches at component level, automatic ISR with tag-based revalidation |
| `metadata` object only | Streaming metadata with `generateMetadata` | Next.js 15.2+ | Metadata can stream for dynamic pages, but static `metadata` object is still preferred for known pages |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: Use `useActionState` from `react` instead
- `themeColor`/`colorScheme` in metadata object: Use `generateViewport` instead
- Nodemailer for transactional email in Next.js: Resend is the modern standard with better DX

## Open Questions

1. **Resend domain verification status**
   - What we know: Resend requires SPF + DKIM DNS records on emilykathryn.com before sending from custom domain
   - What's unclear: Whether Emily has DNS access ready; whether to use main domain or subdomain for sending
   - Recommendation: Use `onboarding@resend.dev` during development; verify domain before go-live. Flag as blocker concern (already noted in STATE.md blockers).

2. **Resend scheduled email on free plan**
   - What we know: `scheduledAt` parameter exists and supports "in 10 min" natural language. Free plan: 100 emails/day, 3,000/month.
   - What's unclear: Whether `scheduledAt` is available on the free plan (docs don't explicitly restrict it to paid plans)
   - Recommendation: Test during implementation. Fallback: send auto-responder immediately if scheduling unavailable on free plan (still meets the spirit of CONV-03).

3. **OG images -- static vs dynamic**
   - What we know: 8 known pages need OG images. Dynamic `opengraph-image.tsx` generates at edge. Static images in `/public/og/` are simpler.
   - What's unclear: Whether Emily will provide branded photos for each page's OG image or if we need to generate branded overlays
   - Recommendation: Create static OG images (1200x630) with brand overlay (logo + page title on a branded background). If specific photos aren't available, use brand-colored gradient with text. Can upgrade to dynamic later.

4. **Brand voice fidelity**
   - What we know: emilykathryn.com is the voice reference. Voice is "warm, confident, editorial" targeting both teens and parents.
   - What's unclear: Full current site copy was only partially accessible (403 on about page). Brand board visual reference is available.
   - Recommendation: Write copy matching the established voice patterns -- warm personal tone, editorial confidence, inclusive language. Emily reviews and refines copy in Sanity Studio post-launch.

## Sources

### Primary (HIGH confidence)
- Next.js Forms Guide -- Server Actions, useActionState, Zod validation, pending states (https://nextjs.org/docs/app/guides/forms, verified 2026-02-22, doc version 16.1.6)
- Next.js Metadata API -- generateMetadata, openGraph, twitter card, metadata merging (https://nextjs.org/docs/app/api-reference/functions/generate-metadata, verified 2026-02-22, doc version 16.1.6)
- Resend Send Email API -- from, to, react, scheduledAt, replyTo parameters (https://resend.com/docs/api-reference/emails/send-email, verified 2026-02-22)
- Resend + Next.js Setup -- installation, API key, EmailTemplate pattern (https://resend.com/docs/send-with-nextjs, verified 2026-02-22)
- Resend Domain Verification -- SPF, DKIM, verification states, subdomain strategy (https://resend.com/docs/dashboard/domains/introduction, verified 2026-02-22)
- Resend Scheduling -- scheduledAt natural language, ISO 8601, 30-day max, cancel/reschedule (https://resend.com/docs/dashboard/emails/schedule-email, verified 2026-02-22)
- Project codebase -- existing components, schemas, queries, patterns (Phase 1-2 artifacts, verified 2026-02-22)

### Secondary (MEDIUM confidence)
- React Email components library -- @react-email/components v1.0.8, Html/Body/Container/Text/Heading/Hr components (https://www.npmjs.com/package/@react-email/components)
- Zod validation -- v3.24.x / v4.x, safeParse, refine, flatten (https://zod.dev, https://www.npmjs.com/package/zod)
- In-memory rate limiting pattern -- Map-based, IP-tracking, window approach (https://www.freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs/)
- Resend free plan limits -- 100 emails/day, 3,000/month, 2 req/s rate limit, 1 domain (https://resend.com/docs/knowledge-base/account-quotas-and-limits)

### Tertiary (LOW confidence)
- Resend scheduledAt availability on free plan -- docs don't explicitly confirm or deny; needs testing during implementation
- Dynamic OG image generation patterns -- documented but not recommended for this project (static preferred for 8 known pages)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all core libraries already installed except Resend + Zod; versions pinned and verified
- Architecture: HIGH -- patterns established in Phase 1-2; new patterns (Server Actions, Resend) verified with official docs
- Email delivery: HIGH -- Resend API is well-documented, scheduledAt confirmed, React Email integration verified
- Form handling: HIGH -- Next.js official guide covers exact pattern (useActionState + Server Action + Zod)
- Spam protection: MEDIUM -- honeypot + in-memory rate limiting is well-established but approximate in serverless; sufficient for low-volume inquiry form
- Pitfalls: HIGH -- common issues documented from official sources and community patterns
- Brand voice: MEDIUM -- voice direction is clear ("warm, confident, editorial") but full current site copy was only partially accessible

**Research date:** 2026-02-22
**Valid until:** 2026-03-22 (stable domain, well-established patterns)
