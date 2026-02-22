# Deferred Items — Phase 03

## Pre-existing Type Errors (Out of Scope)

1. **`src/app/(site)/page.tsx:176`** — `TestimonialData[]` not assignable to `Testimonial[]`. Image type mismatch between Sanity fetch result and TestimonialCarousel prop types.
2. **`src/app/(site)/raves/page.tsx:73`** — `SanityImageAsset` not assignable to `TestimonialImage`. Same root cause as #1 — Sanity image type definitions need alignment.

These errors existed before plan 03-04 execution and are not caused by the inquiry form work. They should be addressed when the testimonial/raves pages are revisited.
