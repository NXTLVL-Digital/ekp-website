import Image from "next/image";
import { SanityImage } from "./SanityImage";

/**
 * Shape of a gallery image as returned from GROQ queries.
 * Supports both Sanity CDN images and external URLs (for test pages).
 */
export interface GalleryImageData {
  _key: string;
  alt?: string;
  caption?: string;
  asset: {
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
  };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface GalleryGridProps {
  images: GalleryImageData[];
  displayStyle?: "masonry" | "grid";
  onImageClick?: (index: number) => void;
  /** Number of above-the-fold images to load eagerly with fetchpriority="high". Default: 4 */
  priorityCount?: number;
}

/**
 * Detect whether an image URL is from the Sanity CDN.
 * If not (for example, local portfolio images), we use next/image directly.
 */
function isSanityUrl(url?: string): boolean {
  return !!url && url.includes("cdn.sanity.io");
}

/** Portrait 2:3, the shape most of the portfolio is shot in. */
const FALLBACK_DIMENSIONS = { width: 800, height: 1200 };

/**
 * Resolve an intrinsic width and height for an image so the browser can
 * reserve the right box before the file arrives. Every local portfolio image
 * carries real dimensions, and Sanity supplies them on upload, so the
 * fallback only catches a CMS asset whose metadata failed to populate.
 * Without it that image would render unsized and shift the grid on load.
 */
function resolveDimensions(image: GalleryImageData) {
  const dims = image.asset.metadata?.dimensions;
  if (dims?.width && dims?.height) {
    return { width: dims.width, height: dims.height };
  }
  if (dims?.aspectRatio && dims.aspectRatio > 0) {
    return {
      width: FALLBACK_DIMENSIONS.width,
      height: Math.round(FALLBACK_DIMENSIONS.width / dims.aspectRatio),
    };
  }
  return FALLBACK_DIMENSIONS;
}

/**
 * Render a single gallery image, choosing SanityImage for Sanity CDN URLs
 * and standard next/image for external URLs (test/dev).
 */
function GalleryImage({
  image,
  fill,
  className,
  priority,
}: {
  image: GalleryImageData;
  fill?: boolean;
  className?: string;
  /** When true, sets loading="eager" and fetchpriority="high" for above-the-fold LCP images */
  priority?: boolean;
}) {
  const sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
  const { width, height } = resolveDimensions(image);

  if (isSanityUrl(image.asset.url)) {
    return (
      <SanityImage
        asset={image.asset}
        alt={image.alt || ""}
        hotspot={image.hotspot}
        crop={image.crop}
        fill={fill}
        {...(fill ? {} : { width, height })}
        sizes={sizes}
        className={className}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={image.asset.url || ""}
        alt={image.alt || ""}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    <Image
      src={image.asset.url || ""}
      alt={image.alt || ""}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

/**
 * Gallery grid component supporting masonry (CSS columns) and uniform grid layouts.
 *
 * - Masonry: Uses CSS `columns` for a Pinterest-style layout with varied image heights.
 *   Column counts: 2 mobile, 3 tablet (md), 4 desktop (lg).
 * - Grid: Uses CSS Grid with `aspect-[3/4]` containers and `object-cover` for uniform sizing.
 *
 * This is a Server Component (no 'use client'). It accepts an onImageClick callback
 * and is always rendered within the GalleryClient client boundary.
 *
 * For non-Sanity URLs (test/dev), falls back to standard next/image instead of SanityImage.
 */
export function GalleryGrid({
  images,
  displayStyle = "masonry",
  onImageClick,
  priorityCount = 4,
}: GalleryGridProps) {
  if (displayStyle === "grid") {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image._key}
            type="button"
            className="group relative aspect-[3/4] w-full overflow-hidden"
            onClick={() => onImageClick?.(index)}
            aria-label={`View ${image.alt || "gallery image"} in lightbox`}
          >
            <GalleryImage
              image={image}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority={index < priorityCount}
            />
          </button>
        ))}
      </div>
    );
  }

  // Masonry layout using CSS columns
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
      {images.map((image, index) => {
        const { width, height } = resolveDimensions(image);
        return (
        <div key={image._key} className="mb-3 break-inside-avoid md:mb-4">
          <button
            type="button"
            className="group relative w-full overflow-hidden"
            // Reserves the exact box before the image resolves. The ratio comes
            // from the same metadata the img tag is sized from, so the two
            // always agree and the column never reflows mid-load.
            style={{ aspectRatio: `${width} / ${height}` }}
            onClick={() => onImageClick?.(index)}
            aria-label={`View ${image.alt || "gallery image"} in lightbox`}
          >
            <GalleryImage
              image={image}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority={index < priorityCount}
            />
          </button>
          {image.caption && (
            <p className="mt-1.5 text-xs text-stone-500">{image.caption}</p>
          )}
        </div>
        );
      })}
    </div>
  );
}
