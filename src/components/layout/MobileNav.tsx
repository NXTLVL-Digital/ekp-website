'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface MobileNavProps {
  navigation: ReadonlyArray<{ readonly label: string; readonly href: string }>
  cta: { readonly label: string; readonly href: string }
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ navigation, cta, isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Focus first link when overlay opens
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  // ESC key closes the menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !overlayRef.current) return

      const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    },
    []
  )

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Close button */}
      <div className="flex justify-end px-4 py-3">
        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col items-center gap-2 px-8 pt-8">
        {navigation.map((item, index) => (
          <Link
            key={item.href}
            ref={index === 0 ? firstLinkRef : undefined}
            href={item.href}
            onClick={onClose}
            className="flex min-h-11 items-center font-heading text-2xl tracking-wide text-foreground transition-colors hover:text-foreground/70"
          >
            {item.label}
          </Link>
        ))}

        {/* CTA button */}
        <Link
          href={cta.href}
          onClick={onClose}
          className="mt-8 flex min-h-11 w-full items-center justify-center rounded bg-brand-gold px-8 py-4 text-lg tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
        >
          {cta.label}
        </Link>
      </nav>
    </div>
  )
}
