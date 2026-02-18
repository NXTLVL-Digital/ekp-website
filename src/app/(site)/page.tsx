import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emily Kathryn Photography | Senior & Family Portraits",
  description:
    "Editorial-style senior portrait and family photography in South-Central Virginia. Serving Chatham, Danville, Lynchburg, Smith Mountain Lake, and beyond.",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-section-sm md:py-section">
      <h1 className="font-heading text-4xl font-light tracking-wide md:text-5xl lg:text-6xl">
        Emily Kathryn Photography
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Editorial-style senior portrait and family photography in
        South-Central Virginia. We believe every session should feel like a
        magazine shoot — relaxed, authentic, and uniquely you.
      </p>

      {/* Theme token test element -- gold accent (< 5% of page area) */}
      <div className="mt-10 inline-block rounded bg-brand-gold px-5 py-2.5 text-sm font-medium tracking-wide text-white">
        Inquire for Detailed Pricing
      </div>
    </div>
  );
}
