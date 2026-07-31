export const siteConfig = {
  name: 'Emily Kathryn Photography',
  tagline: 'Senior Portrait & Family Photographer',
  url: 'https://emilykathryn.com',
  // TODO(Jeff): real phone from Emily before launch — must exactly match GBP.
  // While empty, the phone is omitted from the footer, contact page, and JSON-LD.
  phone: '' as string,
  email: 'emily@emilykathryn.com', // TODO: Verify exact email
  address: {
    // Service-area business: the street address goes to Google privately for
    // GBP verification only. It is never published on the site or in schema.
    city: 'Gretna',
    state: 'VA',
    zip: '24557',
    formatted: 'Gretna, VA 24557',
  },
  social: {
    instagram: 'https://www.instagram.com/emilykathrynphotography/',
    facebook: 'https://www.facebook.com/emilykathrynphotography/',
    tiktok: 'https://www.tiktok.com/@emilykathrynphotography',
  },
  navigation: [
    { label: 'Senior Portraits', href: '/senior-portraits' },
    { label: 'Family Portraits', href: '/family-portraits' },
    // Investment page hidden until Emily confirms pricing — restore by uncommenting:
    // { label: 'Investment', href: '/investment' },
    { label: 'About', href: '/about' },
    { label: 'Raves', href: '/raves' },
    { label: 'Journal', href: '/journal' },
    { label: 'Style Guide', href: '/style-guide' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Inquire for Detailed Pricing',
    href: '/contact',
  },
} as const

export type SiteConfig = typeof siteConfig
