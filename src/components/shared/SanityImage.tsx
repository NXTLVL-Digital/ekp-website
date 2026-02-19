import Image, { type ImageProps } from "next/image";
import { urlFor, sanityLoader } from "@/sanity/lib/image";

interface SanityImageAsset {
  _ref?: string;
  _id?: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width: number;
      height: number;
      aspectRatio?: number;
    };
  };
}

export interface SanityImageProps
  extends Omit<ImageProps, "src" | "loader" | "alt"> {
  asset: SanityImageAsset;
  alt: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/**
 * Reusable Sanity image component with LQIP blur placeholders.
 *
 * - Uses a custom Sanity CDN loader (bypasses Vercel image optimization billing)
 * - Serves WebP/AVIF automatically via Sanity CDN `auto=format`
 * - Supports blur placeholder from Sanity LQIP metadata
 * - Supports hotspot-aware cropping via objectPosition
 * - Does NOT set priority by default -- callers opt in for hero images (PERF-04)
 *
 * @example
 * ```tsx
 * <SanityImage
 *   asset={data.heroImage.asset}
 *   alt={data.heroImage.alt || ""}
 *   hotspot={data.heroImage.hotspot}
 *   sizes="100vw"
 *   priority // only for the single LCP hero image
 *   fill
 * />
 * ```
 */
export function SanityImage({
  asset,
  alt,
  hotspot,
  crop,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  style,
  ...props
}: SanityImageProps) {
  // Build the base image URL from the asset reference, applying crop if provided
  const imageBuilder = urlFor({ ...asset, hotspot, crop }).auto("format");
  const imageUrl = imageBuilder.url();

  // Derive width/height from asset metadata when not explicitly provided
  const width =
    props.width ?? (props.fill ? undefined : asset.metadata?.dimensions?.width);
  const height =
    props.height ??
    (props.fill ? undefined : asset.metadata?.dimensions?.height);

  // Hotspot-aware object position for crop control
  const hotspotStyle = hotspot
    ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` }
    : undefined;

  // Merge hotspot style with any provided style
  const mergedStyle = hotspotStyle
    ? { ...hotspotStyle, ...style }
    : style;

  return (
    <Image
      loader={sanityLoader}
      src={imageUrl}
      alt={alt}
      width={width as number | undefined}
      height={height as number | undefined}
      sizes={sizes}
      placeholder={asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={asset.metadata?.lqip}
      style={mergedStyle}
      {...props}
    />
  );
}
