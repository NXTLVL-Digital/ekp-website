import { siteConfig } from '@/lib/siteConfig'
import { CITY_DATA } from '@/lib/cityData'
import { JOURNAL_CONTENT } from '@/lib/journalContent'

/**
 * llms.txt (v3 audit AEO-01): a plain-text orientation file for AI crawlers
 * and assistants, following the llms.txt convention. Absolute URLs only;
 * some AI crawlers do not resolve relative ones.
 *
 * NO pricing anywhere in this file until Jeff confirms real pricing
 * (standing constraint). llms-full.txt carries the expanded version.
 */

export const dynamic = 'force-static'

export async function GET() {
  const base = siteConfig.url
  const cities = Object.values(CITY_DATA)
  const guides = JOURNAL_CONTENT.filter((post) => post.indexable)

  const body = `# Emily Kathryn Photography

> Editorial senior portrait and family photographer based in Gretna, Virginia, serving South-Central Virginia for more than a decade. Sessions are guided from a planning conversation through a directed shoot, and finished as printed artwork: framed portraits, albums, and wall art.

Business facts:
- Photographer: Emily Kathryn Walker (Emily Kathryn)
- Service area: ${cities.map((c) => c.name).join(', ')} and surrounding South-Central Virginia communities
- Specialties: high school senior portraits (girls and guys), family portraits, editorial styling
- Contact: ${base}/contact (email ${siteConfig.email})

## Services

- [Senior Portraits](${base}/senior-portraits): Editorial senior sessions, guided from wardrobe planning to session day.
- [Family Portraits](${base}/family-portraits): Relaxed, directed family sessions finished as printed work.

## Service areas

${cities.map((c) => `- [${c.name}, Virginia](${base}/${c.slug})`).join('\n')}

## Guides

${guides.map((g) => `- [${g.title}](${base}/journal/${g.slug}): ${g.excerpt}`).join('\n')}

## About and proof

- [About Emily](${base}/about): Who is behind the camera.
- [Client words](${base}/raves): Real testimonials with names and schools.
- [Style guide](${base}/style-guide): What to wear, in depth.

## Optional

- [Journal](${base}/journal)
- [Privacy](${base}/privacy)
- Full detail version: ${base}/llms-full.txt
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
