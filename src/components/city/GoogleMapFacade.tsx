'use client'

import { useState, useCallback } from 'react'

interface GoogleMapFacadeProps {
  query: string
  cityName: string
}

/**
 * Facade pattern for lazy Google Maps embed. Renders a static placeholder
 * button that loads the real iframe on click, saving ~500KB of initial JS.
 *
 * If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is not set, shows a graceful fallback
 * linking to Google Maps search for the city.
 */
export function GoogleMapFacade({ query, cityName }: GoogleMapFacadeProps) {
  const [loaded, setLoaded] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY

  const loadMap = useCallback(() => setLoaded(true), [])

  // Graceful fallback when API key is not configured
  if (!apiKey) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-lg bg-muted">
        <div className="text-center">
          {/* Map pin icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="mx-auto h-12 w-12 text-brand-gold"
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
          <p className="mt-3 text-sm text-muted-foreground">Map coming soon</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-brand-gold underline underline-offset-2 hover:text-brand-gold-dark"
          >
            View {cityName} on Google Maps
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
        className="rounded-lg"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={loadMap}
      className="relative flex min-h-[400px] w-full cursor-pointer items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80"
      aria-label={`Load map of ${cityName}, Virginia`}
    >
      <div className="text-center">
        {/* Map pin icon (inline SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="mx-auto h-12 w-12 text-brand-gold"
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
        <p className="mt-2 text-sm text-muted-foreground">
          Click to view map of {cityName}, VA
        </p>
      </div>
    </button>
  )
}
