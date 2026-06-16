'use client'

import { useEffect, useState } from 'react'

interface MarqueeItem {
  text: string
  highlight: boolean
}

interface MarqueeProps {
  items: MarqueeItem[]
}

export function Marquee({ items }: MarqueeProps) {
  const [offset, setOffset] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let animationFrameId: number
    const speed = 0.3

    const scroll = () => {
      setOffset((prev) => {
        const newValue = prev - speed
        return Math.abs(newValue) >= 100 ? 0 : newValue
      })
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isClient])

  // Duplicate items for seamless scrolling
  const combinedItems = [...items, ...items]
  const totalWidth = combinedItems.length * 100

  return (
    <section className="relative overflow-hidden bg-foreground py-4">
      <div
        className="flex will-change-transform"
        style={{
          transform: `translateX(${offset}%)`,
          width: `${totalWidth}%`,
        }}
      >
        {combinedItems.map((item, index) => (
          <span key={index} className="inline-flex shrink-0 items-center px-8">
            <span className="editorial-label text-white">
              {item.text}
            </span>
            {item.highlight && (
              <em className="ml-6 mr-12 inline-block h-2 w-2 rounded-full bg-brand-gold" />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}
