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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    setIsScrolled(currentScrollY > 20)

    if (currentScrollY > 120 && currentScrollY > lastScrollY) {
      setIsHidden(true)
    } else if (currentScrollY < lastScrollY) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label={logoText}>
            {/* This is the LCP element on mobile, not the hero photo: it sits
                at the top of every page and the hero sits behind a gradient.
                fetchpriority="high" pulls it out of the default low-priority
                queue images start in, and Header.tsx preloads the same URL
                from the document head. Lossless WebP: pixel-identical to the
                PNG at 13KB vs 22KB. Intrinsic width/height are the file's
                real pixels (the h-20/h-36 classes still drive layout).
                Deliberately a raw img, not next/image, so the brightness-0
                invert transition and shrink-0 sizing keep working. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-stacked.webp"
              alt={logoText}
              width={507}
              height={318}
              fetchPriority="high"
              decoding="sync"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? 'h-20' : 'h-36 brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop navigation — editorial style */}
          <div className="hidden items-center gap-0 lg:ml-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`editorial-label relative flex min-h-11 items-center px-4 transition-colors duration-300 ${
                  isScrolled ? 'text-foreground/70 hover:text-foreground' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-2 left-4 right-4 h-px origin-left scale-x-0 bg-brand-gold transition-transform duration-300 hover:scale-x-100" />
              </Link>
            ))}

            {/* CTA — editorial gold underline style, not a filled button */}
            <Link
              href={cta.href}
              className={`editorial-label ml-6 flex min-h-11 items-center border-b border-brand-gold pb-0.5 transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-brand-gold' : 'text-white hover:text-brand-gold'
              }`}
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="relative z-10 flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {/* span, not div: flow content inside button is invalid HTML and
                was the site's only W3C error (v3 audit A-03) */}
            <span className="flex w-7 flex-col items-end gap-1.5">
              <span
                className={`block h-[1.5px] transition-all duration-500 ${
                  isScrolled ? 'bg-foreground' : 'bg-white'
                } ${isMenuOpen ? 'w-7 translate-y-[7.5px] rotate-45' : 'w-7'}`}
              />
              <span
                className={`block h-[1.5px] w-5 transition-all duration-500 ${
                  isScrolled ? 'bg-foreground' : 'bg-white'
                } ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-[1.5px] transition-all duration-500 ${
                  isScrolled ? 'bg-foreground' : 'bg-white'
                } ${isMenuOpen ? 'w-7 -translate-y-[7.5px] -rotate-45' : 'w-4'}`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Full-screen editorial mobile nav */}
      <MobileNav
        navigation={navigation}
        cta={cta}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
