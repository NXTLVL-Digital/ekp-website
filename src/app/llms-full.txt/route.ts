import { siteConfig } from '@/lib/siteConfig'
import { CITY_DATA } from '@/lib/cityData'
import { JOURNAL_CONTENT } from '@/lib/journalContent'

/**
 * llms-full.txt (v3 audit AEO-01 / plan 5.2): the expanded companion to
 * llms.txt with per-page descriptions, for AI systems that want more than
 * the index. Same rules: absolute URLs, and NO pricing until confirmed.
 */

export const dynamic = 'force-static'

export async function GET() {
  const base = siteConfig.url
  const cities = Object.values(CITY_DATA)
  const guides = JOURNAL_CONTENT.filter((post) => post.indexable)

  const body = `# Emily Kathryn Photography (full detail)

> Editorial senior portrait and family photographer based in Gretna, Virginia, serving South-Central Virginia for more than a decade.

## What makes this business distinct

- Sessions are directed the whole way through: locations, outfits, movement, and expression are all guided, so clients never have to know what to do with their hands.
- The finished product is printed work. Sessions are photographed with the final print in mind: framed portraits, senior albums, artwork for grandparents. Digital files exist in service of the print, not instead of it.
- Both halves of the senior market are served: senior girls and senior guys, with location and direction styles for each.
- The photographer is local. Location choices across the service area come from a decade of working its fields, brick downtowns, foothills, and lakefront.

## Pages

### Core

- ${base}/ : Homepage. Editorial positioning, featured portfolio, real client testimonials, and a five question FAQ.
- ${base}/senior-portraits : The senior session, start to finish: planning conversation, wardrobe, locations, direction, gallery, and printed finish. Includes a nine question FAQ.
- ${base}/family-portraits : Family sessions: relaxed, directed, everyone in the frame. Includes an eight question FAQ.
- ${base}/about : Emily Kathryn Walker, the photographer: a decade plus behind the camera, seven communities served, and the philosophy behind the work.
- ${base}/raves : Verbatim client testimonials with real names and schools, including Person High School, William Campbell High School, Altavista High School, and Jefferson Forest High School families.
- ${base}/style-guide : The in-depth wardrobe guide: outfit arcs, color families, texture, and what to avoid.
- ${base}/contact : Inquiry form. Emily reads and answers every inquiry herself, usually within 48 hours.

### Service areas

${cities
  .map(
    (c) =>
      `- ${base}/${c.slug} : Senior and family portrait photography in ${c.name}, Virginia, with locations and a localized FAQ.`,
  )
  .join('\n')}

### Guides

${guides
  .map((g) => `- ${base}/journal/${g.slug} : ${g.title}. ${g.excerpt}`)
  .join('\n')}

## Answers to common questions

Q: What areas does Emily Kathryn Photography serve?
A: Based in Gretna, Virginia; photographing across ${cities.map((c) => c.name).join(', ')}, and nearby communities.

Q: When should Virginia seniors book?
A: Most book in spring of junior year and shoot in summer or early fall before senior year. Fall color dates fill first. Detail: ${base}/journal/when-to-book-senior-photos-virginia

Q: What should clients wear?
A: One everyday outfit, one dressed up, one personality piece, in muted earthy colors with real texture. Detail: ${base}/journal/what-to-wear-senior-pictures

Q: How should a family choose a senior photographer?
A: Review full session galleries rather than highlights, ask how much direction the photographer gives, and decide up front whether the goal is files or finished printed work. Detail: ${base}/journal/how-to-choose-senior-photographer

## Contact

- Inquiry form: ${base}/contact
- Email: ${siteConfig.email}
- Instagram, Facebook, and TikTok links are in the site footer.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
