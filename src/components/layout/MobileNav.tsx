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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !overlayRef.current) return
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
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
      className={`fixed inset-0 z-40 transition-all duration-700 lg:hidden ${
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-foreground" />

      {/* Content — magazine table of contents style.
          Top padding clears the fixed header (logo + padding is ~180px tall
          when unscrolled) so the first entry never sits under the top bar.
          my-auto centers the block when there is room and lets it scroll when
          there is not, which justify-center alone would clip on short phones. */}
      <div className="relative flex h-full flex-col overflow-y-auto px-8 pt-44 pb-12 lg:pt-32">
        <div className="my-auto w-full">
          {/* Gold accent rule */}
          <div
            className={`mb-10 h-px bg-brand-gold transition-all duration-700 delay-200 ${
              isOpen ? 'w-12 opacity-100' : 'w-0 opacity-0'
            }`}
          />

        <nav className="flex flex-col gap-1">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={onClose}
              className={`group flex items-baseline gap-4 py-2 transition-all duration-500 ${
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${300 + i * 70}ms` : '0ms' }}
            >
              <span className="font-body text-[0.625rem] tracking-[0.2em] text-brand-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-heading text-3xl font-light text-white transition-colors duration-300 group-hover:text-brand-gold sm:text-4xl">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div
          className={`mt-12 transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? `${300 + navigation.length * 70 + 100}ms` : '0ms' }}
        >
          <div className="mb-6 h-px w-full bg-brand-gold/30" />
          <Link
            href={cta.href}
            onClick={onClose}
            className="editorial-label inline-flex min-h-11 items-center gap-3 text-brand-gold transition-colors duration-300 hover:text-brand-gold-light"
          >
            <span>{cta.label}</span>
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="mt-px">
              <path d="M0 4H18M18 4L14.5 0.5M18 4L14.5 7.5" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
