'use client'

import { useState, useCallback } from 'react'

interface GoogleMapFacadeProps {
  query: string
  cityName: string
}

/** Shared pin mark. Gold, hairline weight, sharp edges. */
function PinMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className="mx-auto h-10 w-10 text-brand-gold"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  )
}

/**
 * Facade pattern for a lazy Google Maps embed. Renders a static placeholder
 * that only swaps in the real iframe once the visitor interacts, so no map
 * payload is loaded on first paint.
 *
 * If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is not set, shows a graceful fallback
 * linking to a Google Maps search for the city.
 */
export function GoogleMapFacade({ query, cityName }: GoogleMapFacadeProps) {
  const [loaded, setLoaded] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY

  const loadMap = useCallback(() => setLoaded(true), [])

  // Graceful fallback when the API key is not configured
  if (!apiKey) {
    return (
      <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden border border-border bg-muted">
        <div className="pattern-hex absolute inset-0 opacity-60" />
        <div className="relative text-center">
          <PinMark />
          <p className="editorial-label mt-5 text-muted-foreground">
            Map coming soon
          </p>
          <div className="mx-auto mt-5 h-px w-8 bg-brand-gold/40" />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex min-h-11 items-center gap-3"
          >
            <span className="editorial-label text-foreground transition-colors duration-300 group-hover:text-brand-gold">
              View {cityName} on Google Maps
            </span>
            <svg
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-brand-gold"
              />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  if (loaded) {
    return (
      <iframe
        title={`Map of ${cityName}, Virginia`}
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border border-border"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={loadMap}
      className="group relative flex min-h-[400px] w-full cursor-pointer items-center justify-center overflow-hidden border border-border bg-muted transition-colors duration-300 hover:border-brand-gold/40"
      aria-label={`Load map of ${cityName}, Virginia`}
    >
      <div className="pattern-hex absolute inset-0 opacity-60" />
      <div className="relative text-center">
        <PinMark />
        <div className="mx-auto mt-5 h-px w-8 bg-brand-gold/40" />
        <span className="editorial-label mt-5 block text-foreground transition-colors duration-300 group-hover:text-brand-gold">
          View the map of {cityName}, VA
        </span>
      </div>
    </button>
  )
}
