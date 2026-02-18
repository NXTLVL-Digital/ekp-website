'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  navigation: ReadonlyArray<{ readonly label: string; readonly href: string }>
  cta: { readonly label: string; readonly href: string }
  logoText: string
}

export function HeaderClient({ navigation, cta, logoText }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollThreshold = 80

    if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
      // Scrolling down past threshold — hide
      setIsHidden(true)
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up — reveal
      setIsHidden(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm transition-transform duration-300 ${
          isHidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-lg tracking-wide text-foreground"
          >
            {logoText.toLowerCase()}
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center px-3 text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              className="ml-4 flex min-h-11 items-center rounded bg-brand-gold px-5 py-2.5 text-sm tracking-wide text-white transition-colors hover:bg-brand-gold-dark"
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full bg-foreground transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile nav overlay */}
      <MobileNav
        navigation={navigation}
        cta={cta}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
