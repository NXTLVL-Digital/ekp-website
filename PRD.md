# Emily Kathryn Photography Website Replacement PRD

## Objective

Replace the current Emily Kathryn Photography website with the newly provided static site package from Jeff.

The new website package is the approved source of truth for this deployment unless otherwise noted.

## Source Package

- File: `Emily-Kathryn-Portable-Site.zip`
- Root folder: `ekp-heirloom-preview/`
- Website type: static HTML/CSS/image site
- Intended launch: GitHub + Vercel
- Domain hookup: deferred; Jeff will connect the domain later

## Deployment Goal

Publish the new Emily Kathryn Photography site so it is accessible through a Vercel deployment URL and ready for Jeff to connect the production domain later.

## Required Pages

The deployed site should include:

- Home: `/`
- About: `/about`
- Contact: `/contact`
- Journal: `/journal`
- Family portraits: `/family`
- Senior portraits: `/senior`
- Investment: `/investment`
- Portfolio: `/portfolio`

## Assets

Preserve all included image assets from the provided package, including:

- Brand images
- Senior portrait images
- Family portrait images

No image deletion, compression, renaming, or replacement should happen unless required to make the site build/deploy correctly.

## Implementation Plan

1. Preserve current repo state in git history.
2. Create a working branch for the replacement.
3. Import the provided static site files into the Emily Kathryn repo.
4. Adapt only what is necessary for Vercel hosting.
5. Verify links, images, and page routing locally.
6. Build/test the site.
7. Commit changes to GitHub.
8. Push branch to `NXTLVL-Digital/ekp-website`.
9. Deploy to Vercel.
10. Verify the deployed Vercel URL loads publicly.
11. Report back with:
    - GitHub commit SHA
    - Branch name
    - Vercel deployment URL
    - Any known limitations

## Non-Goals

- Do not connect or modify the production domain.
- Do not change DNS.
- Do not delete existing GitHub repository history.
- Do not remove original site files unless required for replacement and covered by git history.
- Do not add CMS functionality unless already present in the package.
- Do not redesign the provided site.

## Approval

Approved by Jeff in Discord message `1527142416019095684`.
