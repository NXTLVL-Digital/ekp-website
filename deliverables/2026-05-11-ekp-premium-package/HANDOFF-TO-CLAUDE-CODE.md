# Handoff Brief — Claude Code

Pick up where Cowork left off. Single goal: get **Concept A (Editorial Heirloom)** live on surge.sh.

## The task

Deploy the static site at:

```
/Users/jeff/AI Projects/NXTLVL-Digital/Clients/EmilyKathryn/deliverables/2026-05-11-ekp-premium-package/concept-a-editorial-heirloom
```

to surge.sh at the domain:

```
ekp-heirloom.surge.sh
```

## What you need to know

- Jeff has an existing surge.sh account — credentials should be on his keychain or in `~/.netrc`. If surge prompts for email/password, ask Jeff rather than guessing.
- The folder is pure static HTML/CSS/JS. No build step. All assets (Unsplash imagery, Google Fonts) are served over absolute HTTPS so nothing needs bundling.
- `index.html` is the homepage. It used to be renamed to `heirloomindex.html` locally but Cowork already renamed it back. Sanity-check that `index.html` exists in the folder before deploying.
- The folder contains a few non-production files Cowork emitted: `_build.py`, `_rationale.md`, `_preview-home.pdf`. They're harmless if deployed but cleaner to skip. Use `surge --ignore "_*"` or strip them first.

## npm caveat

Jeff is being cautious about npm right now due to recent supply-chain incidents. He's OK installing surge specifically for this — surge is mature and unmaintained-stable, not a typical attack target. But don't suggest installing other packages along the way unless necessary. Install with:

```bash
npm install -g surge
```

Then deploy:

```bash
cd "/Users/jeff/AI Projects/NXTLVL-Digital/Clients/EmilyKathryn/deliverables/2026-05-11-ekp-premium-package/concept-a-editorial-heirloom"
surge . ekp-heirloom.surge.sh --ignore "_*"
```

## After deploy

Verify the URL loads (`curl -s -o /dev/null -w "%{http_code}\n" https://ekp-heirloom.surge.sh` should return 200) and confirm `index.html` renders as the homepage. Then report the live URL back to Jeff.

## Two other concepts also available

There are two more concepts in the package — `concept-b-modern-muse/` and `concept-c-boutique-atelier/` — that Jeff may want deployed later under `ekp-modern-muse.surge.sh` and `ekp-atelier.surge.sh`. Don't deploy them yet, but mention they're ready to go.

## Bigger context

This is one engagement in a multi-deliverable package. The full README at `../README.md` walks through the research and three concepts. You don't need to read it to deploy, but reach for it if Jeff asks broader questions.
