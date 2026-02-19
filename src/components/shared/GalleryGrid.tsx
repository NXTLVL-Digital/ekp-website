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
}

/**
 * Detect whether an image URL is from the Sanity CDN.
 * If not (e.g., picsum.photos for testing), we use next/image directly.
 */
function isSanityUrl(url?: string): boolean {
  return !!url && url.includes("cdn.sanity.io");
}

/**
 * Render a single gallery image, choosing SanityImage for Sanity CDN URLs
 * and standard next/image for external URLs (test/dev).
 */
function GalleryImage({
  image,
  fill,
  className,
}: {
  image: GalleryImageData;
  fill?: boolean;
  className?: string;
}) {
  const sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  if (isSanityUrl(image.asset.url)) {
    return (
      <SanityImage
        asset={image.asset}
        alt={image.alt || ""}
        hotspot={image.hotspot}
        crop={image.crop}
        fill={fill}
        sizes={sizes}
        className={className}
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
      />
    );
  }

  return (
    <Image
      src={image.asset.url || ""}
      alt={image.alt || ""}
      width={image.asset.metadata?.dimensions?.width || 800}
      height={image.asset.metadata?.dimensions?.height || 1200}
      sizes={sizes}
      className={className}
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
}: GalleryGridProps) {
  if (displayStyle === "grid") {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image._key}
            type="button"
            className="group relative aspect-[3/4] w-full overflow-hidden rounded"
            onClick={() => onImageClick?.(index)}
            aria-label={`View ${image.alt || "gallery image"} in lightbox`}
          >
            <GalleryImage
              image={image}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>
    );
  }

  // Masonry layout using CSS columns
  return (
    <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
      {images.map((image, index) => (
        <div key={image._key} className="mb-3 break-inside-avoid md:mb-4">
          <button
            type="button"
            className="group relative w-full overflow-hidden rounded"
            onClick={() => onImageClick?.(index)}
            aria-label={`View ${image.alt || "gallery image"} in lightbox`}
          >
            <GalleryImage
              image={image}
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
          {image.caption && (
            <p className="mt-1.5 text-xs text-stone-500">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
