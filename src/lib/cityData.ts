/**
 * Static city metadata for the 7 target cities.
 *
 * This is the source of truth for which city slugs exist, used by
 * generateStaticParams (so builds work even before CMS content exists)
 * and by the JSON-LD builder for geo coordinates.
 */

export interface CityGeoData {
  name: string
  slug: string
  latitude: number
  longitude: number
  mapQuery: string
  marketTier: 'large' | 'mid' | 'small'
}

export const CITY_DATA: Record<string, CityGeoData> = {
  chatham: {
    name: 'Chatham',
    slug: 'chatham',
    latitude: 36.826,
    longitude: -79.3981,
    mapQuery: 'Chatham, Virginia',
    marketTier: 'mid',
  },
  danville: {
    name: 'Danville',
    slug: 'danville',
    latitude: 36.586,
    longitude: -79.395,
    mapQuery: 'Danville, Virginia',
    marketTier: 'large',
  },
  lynchburg: {
    name: 'Lynchburg',
    slug: 'lynchburg',
    latitude: 37.4138,
    longitude: -79.1422,
    mapQuery: 'Lynchburg, Virginia',
    marketTier: 'large',
  },
  'smith-mountain-lake': {
    name: 'Smith Mountain Lake',
    slug: 'smith-mountain-lake',
    latitude: 37.038,
    longitude: -79.5345,
    mapQuery: 'Smith Mountain Lake, Virginia',
    marketTier: 'mid',
  },
  forest: {
    name: 'Forest',
    slug: 'forest',
    latitude: 37.3692,
    longitude: -79.2867,
    mapQuery: 'Forest, Virginia',
    marketTier: 'small',
  },
  altavista: {
    name: 'Altavista',
    slug: 'altavista',
    latitude: 37.1118,
    longitude: -79.2856,
    mapQuery: 'Altavista, Virginia',
    marketTier: 'small',
  },
  evington: {
    name: 'Evington',
    slug: 'evington',
    latitude: 37.2338,
    longitude: -79.2895,
    mapQuery: 'Evington, Virginia',
    marketTier: 'small',
  },
}

export const CITY_SLUGS = Object.keys(CITY_DATA) as string[]
