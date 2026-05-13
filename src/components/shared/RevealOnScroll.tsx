'use client'

import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  variant?: 'up' | 'fade' | 'scale' | 'left' | 'right' | 'stagger'
  delay?: number
  threshold?: number
}

export function RevealOnScroll({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add('visible'), delay)
          } else {
            el.classList.add('visible')
          }
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  const variantClass = {
    up: 'reveal',
    fade: 'reveal reveal-fade',
    scale: 'reveal reveal-scale',
    left: 'reveal reveal-left',
    right: 'reveal reveal-right',
    stagger: 'reveal-stagger',
  }[variant]

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  )
}
