import { preload } from 'react-dom'
import { siteConfig } from '@/lib/siteConfig'
import { HeaderClient } from './HeaderClient'

export function Header() {
  // The header logo is the LCP element on every page (v3 audit PERF-04).
  // preload() emits a <link rel="preload"> in the document head during SSR,
  // so the browser starts the fetch with the HTML instead of waiting to
  // discover the img tag. Lives here, next to the component that renders it,
  // so every route that mounts a Header gets the hint automatically.
  preload('/brand/logo-stacked.webp', { as: 'image', fetchPriority: 'high' })

  return (
    <HeaderClient
      navigation={siteConfig.navigation}
      cta={siteConfig.cta}
      logoText={siteConfig.name}
    />
  )
}
