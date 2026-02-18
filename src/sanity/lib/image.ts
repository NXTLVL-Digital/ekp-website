import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

export type { SanityImageSource };

const builder = imageUrlBuilder(client);

/**
 * Build a Sanity image URL with chaining support.
 * Usage: urlFor(asset).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Custom Next.js image loader that bypasses Vercel image optimization
 * and serves images directly from Sanity CDN. This avoids the 5,000/month
 * free-tier limit on Vercel image transformations.
 *
 * Sanity CDN handles format negotiation (WebP/AVIF) via the `auto=format`
 * parameter based on the browser's Accept header.
 */
export function sanityLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("auto", "format"); // WebP/AVIF based on Accept header
  url.searchParams.set("fit", "max");
  if (quality) url.searchParams.set("q", quality.toString());
  return url.toString();
}
