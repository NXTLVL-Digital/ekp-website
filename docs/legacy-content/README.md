# Legacy Content Recovery — pre-2026 GoHighLevel site

Scraped **2026-07-31**, the day after DNS cut over to the new Next.js site. GHL account
access was already lost; content was recovered by fetching the still-running old origin
directly by IP (`162.159.140.166`, SNI `emilykathryn.com`) — the old site no longer
answers on any public DNS path, so this is the only remaining copy.

## What's here

| File | Source URL | Use for |
|------|-----------|---------|
| `page-raves-testimonials.md` | /raves | Rebuild /raves (~1,561 words of client quotes) + Review schema — plan C-02/SD-03 |
| `blog-*.md` (6 posts) | /blog/b/* | Seed /journal + 1:1 redirects — plan C-01/C-03 |
| `page-meet-emily.md` | /meet-emily | Bio reference for /about + Person schema |
| `page-experience.md` | /experience | Old process/pricing copy ($799 anchor) |
| `page-contact.md` | /contact | Old areas-served list |
| `page-home.md` | / | Old positioning copy reference |
| `manifest.json` | — | Block/image counts per page |

## Caveats

- **Near-duplicate paragraphs**: GHL rendered separate desktop/mobile variants of the same
  copy with different line-breaking; the exact-match dedupe kept both. When porting, use
  whichever variant reads complete and discard its twin.
- **Slug weirdness preserved**: `valentines-day--ellery-1193` is actually "The Best and
  Worst Photos I Took in 2018..." and `-6520` is "First Shoot of 2019!" (GHL clone-slug
  artifacts). The redirect map's blanket `/blog/b/:slug → /journal` covers them; upgrade
  to 1:1 only for posts that get republished.
- **Images**: every unique content image (82) is backed up in
  `deliverables/legacy-scrape/images/` (gitignored) with `url-map.txt` mapping hashes to
  original CDN URLs. The `images.leadconnectorhq.com` / `filesafe.space` URLs in each
  MD's manifest may die whenever the GHL account is closed — treat the local backup as
  canonical. Emily has full-res originals; these are web-res references for layout/context.
- Post publish dates were not exposed in the old markup; the school years in titles
  (2018/2019) are the best dating available.
