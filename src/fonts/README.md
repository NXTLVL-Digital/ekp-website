# Acrom Font Files

This directory is for self-hosted Acrom font files (commercial font by Inhouse Type).

## Required Files

- `Acrom-Regular.woff2` (weight 400)
- `Acrom-Medium.woff2` (weight 500)
- `Acrom-Bold.woff2` (weight 700)

## How to Obtain

1. Purchase a web font license from [MyFonts](https://www.myfonts.com/collections/acrom-font-inhouse-type/)
2. Download the .woff2 web font files
3. Place them in this directory
4. Uncomment the `localFont` configuration in `src/app/(site)/layout.tsx`

Until the font files are available, the site uses system sans-serif as a fallback
(via the `--font-acrom` CSS variable falling back to `ui-sans-serif, system-ui, sans-serif`).
