# Session Handoff — EKP SEO/AEO work

**Written:** 2026-07-31, end of the launch-day SEO session.

> **⚠️ LARGELY SUPERSEDED (2026-08-04).** Everything this file names as "next" has shipped: Phases 0, 1, 1.5, 3 (non-gated), 4 (on-site), 5, and PERF-04 all landed 2026-08-01 (PRs #18-#27) and are verified live. Current truth: **`docs/seo-aeo-10-10-plan.md`** (state paragraph at the top) and the Brain client page. The one open operational workstream has its own handoff: **`docs/gsc-indexing-handoff.md`** (Request-Indexing tabled by Jeff 2026-08-04). Still accurate here: the Vercel deploy-via-CLI caveat, the blocked-on-Jeff/Emily list, and the decisions-not-bugs section.

**Read next, in order:**
1. `Brain/wiki/clients/emily-kathryn.md` (agency-wide truth for this client — required by the workspace CLAUDE.md anyway)
2. `docs/seo-aeo-10-10-plan.md` — the phased plan you'll be executing
3. This file's "Do this next" section

**Audit reports** (outside the repo, in the agency skills output dir):
`AI Projects/Skills/SEO-Auditor/Output/SEO-AUDIT-emilykathryn.com.md` (baseline) and `-v2.md` (post-migration, authoritative). Both have PDFs alongside.

---

## What happened this session

The site went live on Vercel the same day (Jeff switched nameservers from WordPress.com to Vercel DNS). Two SEO/AEO audits ran — one caught the site mid-migration with the old GoHighLevel site still serving stale-DNS traffic, the second after propagation completed. Then the critical findings were fixed and shipped.

**Shipped to production** (PR #12, commit `b5cd590`, verified live):
- 308 redirects for all 9 legacy GoHighLevel URLs (`/home`, `/meet-emily`, `/experience`, `/gallery`, `/blog`, `/blog/b/:slug`, `/privacy-policy`, `/terms-conditions`, `/test_path`) — these were 404ing while being the exact URLs Google had indexed
- `www` → apex 308 redirect (app-level rule in `next.config.ts`)
- Self-referencing canonicals sitewide (`alternates: { canonical: "./" }` in `src/app/layout.tsx`)
- Real brand logos extracted from `Official Brand Board.jpg` → `public/brand/{logo-primary,logo-stacked,logo-submark}.png`; header uses the stacked mark with `shrink-0` (it was being squeezed horizontally by flexbox, rendering ~23% too narrow)

**Recovered, not yet used** — `docs/legacy-content/` (12 markdown files): all 6 old blog posts, the ~1,561-word testimonial corpus, and old page copy, scraped from the decommissioned GHL origin by direct IP. GHL account access is gone and public DNS no longer reaches that origin, so **this is the only surviving copy.** 82 images backed up to `deliverables/legacy-scrape/` (gitignored). See that folder's `README.md` for caveats (duplicate desktop/mobile paragraph variants, slug weirdness).

---

## ⚠️ Read before you try to deploy

**Merging to `main` does NOT deploy.** After the repo transfer to the NXTLVL-Digital org, the Vercel GitHub integration stopped firing — the merge commit's GitHub status sits at "pending" forever and no deployment is created. PR #12 shipped via CLI instead.

```sh
# after merging a PR:
cd "Clients/EmilyKathryn" && git checkout main && git pull --ff-only
vercel deploy --prod        # repo is already `vercel link`ed to the right project
```

Two things for Jeff to fix so this becomes unnecessary:
- Grant the Vercel GitHub app access to the **NXTLVL-Digital** org
- Review/remove the **duplicate team-scope Vercel project** named `ekp-website` — the domain-owning project is `emilykathryn-photography` (under `jeff-walkers-projects`), and the stray one takes Production deploys of its own

Also note `main` requires a PR + passing "Validate project" CI — no direct pushes. Use `gh pr create --repo NXTLVL-Digital/ekp-website` (the old `pumpkinsfan/ekp-website` remote URL still works for pushes but breaks PR creation).

---

## Current state, verified live 2026-07-31

| | Status |
|---|---|
| Legacy redirects, www→apex, canonicals, real logo | ✅ live and verified |
| Performance | mobile 90 / desktop 99, CLS 0, 559KiB total (this is *good* — see the correction note below) |
| Accessibility | 91–92, not 100 — 6 low-contrast footer elements + unnamed header logo link |
| `/gretna`, `/terms`, `/llms.txt`, `/apple-icon.png` | 404 — all still open, all in the plan |
| `/journal` | published and in the sitemap but **empty** (146 words, zero posts) |
| `/raves` | 180 words (was ~1,561 on the old site — the corpus is in `docs/legacy-content/`) |
| Security headers | HSTS only; Observatory grade C (50/100) |
| Social links + schema `sameAs` | point at `@emilykathrynphotography` on IG/TikTok — **evidence says the live accounts are `@emilykathrynphotos`**; needs Emily's confirmation before changing |

**Correction worth knowing:** the baseline audit reported mobile perf 42 / LCP 6.8s / CLS 0.27. Those numbers came from the **old GoHighLevel stack** — the Lighthouse runs picked it up through stale DNS (110 of 126 requests went to `leadconnectorhq.com`). The v2 report documents this and supersedes it. Don't "fix" a performance crisis that doesn't exist; the real remaining item is mobile LCP at 3.2s.

---

## Do this next: Phase 1

Phase 0 is complete. **Phase 1 is a single PR** — the mechanical technical/a11y/security sprint. Full task table with acceptance criteria is in `docs/seo-aeo-10-10-plan.md`; the short version:

1. Security headers in `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; CSP in Report-Only first)
2. Branded 404 page — `src/app/not-found.tsx`. Also kills the double `<title>` tag the default page emits
3. `src/app/apple-icon.png` (180×180, from `public/brand/logo-submark.png`)
4. Footer contrast — 6 elements in `Footer.tsx` fail WCAG AA; likely one token (`text-white/50` → ~`/70`)
5. `aria-label` on the footer "ek." SVG link in `Footer.tsx`
6. Hero LCP — `priority` + accurate `sizes` on the homepage hero image
7. `/smith-mountain-lake` title is 69 chars, trim to ≤60
8. Explicit dimensions/aspect-ratio on gallery grid images (CLS insurance — currently 0, keep it there)

Then Phase 2 (content restoration from `docs/legacy-content/`), Phase 3 (schema — **gated on the social-handle confirmation**), Phase 4 (local/GBP), Phase 5 (AEO), Phase 6 (verification + final re-audit).

---

## Blocked on Jeff/Emily — collect these to unblock

1. **Confirmed social handles** — gates Phase 3.1. Audit evidence points to `@emilykathrynphotos` on IG (2,184 followers) and TikTok; Facebook is correctly `@emilykathrynphotography`
2. **Real phone number** → `src/lib/siteConfig.ts` (one line unhides it in footer, contact page, and JSON-LD)
3. **Real pricing** — Sanity still has the `$400` placeholder; `/investment` is hidden. Gates the pricing line in `llms.txt` and un-hiding that page
4. **GBP verification** + the private street address (service-area business — street goes to Google only, never on the site)
5. **Emily's proof numbers** — years shooting, sessions delivered, schools served (for the E-E-A-T proof lines on service pages)
6. **Do real star ratings exist anywhere?** If yes, testimonials can carry `reviewRating`; if not, quotes-only Review schema

---

## Decisions, not bugs — do not "fix" these

- **No street address or phone in the site or schema.** Emily is a service-area business; the street address goes to Google privately via GBP. Phone stays hidden until a real number lands in `siteConfig.ts`. The audits flag both as NAP gaps — that flag is superseded by this decision.
- **Free tiers only** for this client. No purchases, no paid fonts/tools.
- **Nothing that states a price ships** until pricing is confirmed.
- **Client isolation:** this session is EKP only. Don't read or reference other NXTLVL clients' folders, and nothing from another client appears in EKP deliverables.
- Sanity CMS is still empty — hardcoded fallbacks are the current pattern and are fine. Don't block content work on CMS plumbing.

---

## Re-verifying state in a fresh session

```sh
# legacy redirects should all be 308
for p in home meet-emily experience gallery blog privacy-policy; do
  printf "/%-16s %s\n" "$p" "$(curl -s -o /dev/null -D - "https://emilykathryn.com/$p" | tr -d '\r' | grep -iE '^HTTP/2|^location:' | tr '\n' ' ')"
done

# canonical present, www redirects, logo serving
curl -s https://emilykathryn.com/ | grep -o '<link rel="canonical"[^>]*>'
curl -s -o /dev/null -D - https://www.emilykathryn.com/about | grep -i '^location:'
curl -s -o /dev/null -w '%{http_code}\n' https://emilykathryn.com/brand/logo-stacked.png

# still-open (404 until their phases ship)
for p in gretna terms llms.txt apple-icon.png; do
  printf "/%-14s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "https://emilykathryn.com/$p")"
done
```

Lighthouse locally (the PSI API was quota-limited all session): `lighthouse https://emilykathryn.com/ --output=json --output-path=/tmp/lh.json --chrome-flags="--headless=new" --quiet`. **Confirm the trace hosts are `emilykathryn.com`** before trusting the numbers — that's the exact check that would have caught the baseline misattribution.

---

## Model / effort guidance

Session default is now **Opus 5** (`claude-opus-5`, $5/$25 per MTok) — the right workhorse for these phases. Optional swaps: **Sonnet 5** ($2/$10 intro through 2026-08-31) for the mechanical PRs (P1, P3) on a free-tier-budget client; **Fable 5** ($10/$50) for the copy-heavy content phases (P2, P5) and the Phase 6 re-audit, where brand voice and adversarial verification actually earn the premium. Effort: `xhigh` for content/judgment work, `low`/`medium` is plenty for the mechanical tasks.
