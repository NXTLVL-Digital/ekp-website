# Handoff: GSC Request-Indexing for emilykathryn.com

**Written:** 2026-08-04 · **Status: TABLED by Jeff** (decision pending, no retries armed)
**This file is the canonical protocol + state for this workstream.** The project memory file `gsc-submission-queue.md` mirrors it for session recall and holds the live tick-off log.

---

## Where things stand (verified facts, 2026-08-04)

| Item | State |
|---|---|
| Property `sc-domain:emilykathryn.com` | ✅ Verified 2026-08-01 under jeff@nxtlvl-digital.com. Two `google-site-verification` TXT records live in Vercel DNS. **Keep both, forever** — removing the active one un-verifies the property |
| Sitemap | ✅ Submitted 2026-08-01, status Success — the current 20-URL sitemap with honest per-page lastmod. This drives recrawl on its own; nothing below blocks it |
| Request Indexing | ❌ **0 of 20 submitted.** "Quota Exceeded" at the first click on 08-01, 08-02 (07:58, fresh quota, pre-Hughes), and 08-03 — three consecutive zero days |
| Diagnosis | **Post-verification owner throttle** on this property. The 08-02 morning run on fresh quota ruled out account contention with Hughes as the primary cause. These cooldowns typically clear within ~a week of verification (so ≈08-08) |
| Index baseline (recovery scoreboard) | 9 indexed / 40 not indexed (report data 07-23, fully pre-launch). `/meet-emily` last crawled **Jul 29 = pre-redirect**, so Google had not yet seen any 308 as of 08-01 |

## The tabled decision

Three ways to resume; Jeff picks one (or the throttle simply expires first):

1. **Light retries** — re-attempt the queue every other day until it unblocks. Zero human effort. Was the recommendation on 08-03.
2. **Delegated ownership for Emily** — Search Console → Settings → Users and permissions → add Emily's Google account as **Owner** (instant, no DNS token needed). Her login gets its own per-user submission allowance; submit from her session. Also the correct long-term ownership structure for a client property.
3. **Sitemap-only** — no manual submissions at all. Legitimate: the sitemap + 308s + honest lastmods already do the real work; Request Indexing is only an accelerant.

**Do not** use the Indexing API as a workaround — Google restricts it to job postings/livestream content.

## Exact resume procedure (any session, any day)

1. Chrome open, extension connected, signed in (jeff@ or, under option 2, Emily's account), property `emilykathryn.com`.
2. For each unsubmitted URL below, in order: paste into the top "Inspect any URL" bar → Enter → wait for inspection → **Request indexing** → wait for confirmation. Stop for the day on "Quota Exceeded" (~10-12/day allowance once unthrottled).
3. Tick progress in the memory file's outcome log (and update this file's status line when the queue completes).

### Day 1 (priority order)
1. `https://emilykathryn.com/`
2. `/senior-portraits`
3. `/family-portraits`
4. `/contact`
5. `/danville`
6. `/lynchburg`
7. `/about`
8. `/raves`
9. `/chatham`
10. `/smith-mountain-lake`
11. `/gretna` ← deliberately replaces /forest: the one page Google has never seen

### Day 2
12. `/forest` · 13. `/altavista` · 14. `/evington` · 15. `/journal/when-to-book-senior-photos-virginia` · 16. `/journal/what-to-wear-senior-pictures` · 17. `/journal/how-to-choose-senior-photographer` · 18. `/style-guide` · 19. `/journal` · 20. `/privacy`

**Never submit:** the 5 archive journal posts — they are `noindex, follow` by decision (#16), and requesting indexing on them contradicts the directive.
**Client isolation:** never open or submit on `hughespa.com` from an EKP session. If quota questions recur, only the *outcome* of Hughes' runs is needed, reported from the ops side.

## Monitoring that continues regardless (plan Phase 6)

- **Weekly** (through mid-September): GSC → Indexing → Pages. Expect: not-indexed count falling as old WordPress/GHL relics (`?p=…`, `/products/simply-southern-*`, `/blog/b/*`) resolve into redirects, and indexed count climbing from 9 toward ~20. URL-inspect `/home`, `/meet-emily`, `/experience`, `/gallery` once each to confirm "Page with redirect" replaces the stale 404-era state.
- These checks are free — inspection has a separate, generous quota; only *Request indexing* is throttled.

## Re-open triggers

- Jeff picks an option above, **or**
- ≈**2026-08-08**: the throttle's typical expiry — a single opportunistic attempt costs nothing and, if it succeeds, just run the procedure to completion, **or**
- The weekly Pages check shows recovery stalling (no movement by ~08-18) — then the manual nudge actually matters and option 2 is the strongest lever.

## Context links

- Master plan + scores: `docs/seo-aeo-10-10-plan.md` (§6.1a is this workstream's row)
- Live tick-off log: project memory `gsc-submission-queue.md`
- Full outcome history: Brain `wiki/log.md` entries 2026-08-01 → 08-03, and the client page's Active workstreams table
- Everything else about the site (Phases 0-5, PERF-04, human-dependency list) shipped or is tracked in the plan doc — this handoff covers only the GSC workstream
