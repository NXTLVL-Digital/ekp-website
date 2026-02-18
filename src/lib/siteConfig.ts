export const siteConfig = {
  name: 'Emily Kathryn Photography',
  tagline: 'Senior Portrait & Family Photographer',
  url: 'https://emilykathryn.com',
  phone: '(434) XXX-XXXX', // TODO: Get exact phone from Emily, must match GBP
  email: 'emily@emilykathryn.com', // TODO: Verify exact email
  address: {
    street: '123 Main Street', // TODO: Get exact address from Emily
    city: 'Gretna',
    state: 'VA',
    zip: '24557',
    formatted: '123 Main Street, Gretna, VA 24557',
  },
  social: {
    instagram: 'https://www.instagram.com/emilykathrynphotography/',
    facebook: 'https://www.facebook.com/emilykathrynphotography/',
    tiktok: 'https://www.tiktok.com/@emilykathrynphotography',
  },
  navigation: [
    { label: 'Senior Portraits', href: '/senior-portraits' },
    { label: 'Family Portraits', href: '/family-portraits' },
    { label: 'Investment', href: '/investment' },
    { label: 'About', href: '/about' },
    { label: 'Raves', href: '/raves' },
    { label: 'Style Guide', href: '/style-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Inquire for Detailed Pricing',
    href: '/contact',
  },
} as const

export type SiteConfig = typeof siteConfig
