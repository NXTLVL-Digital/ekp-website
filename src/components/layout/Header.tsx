import { siteConfig } from '@/lib/siteConfig'
import { HeaderClient } from './HeaderClient'

export function Header() {
  return (
    <HeaderClient
      navigation={siteConfig.navigation}
      cta={siteConfig.cta}
      logoText={siteConfig.name}
    />
  )
}
