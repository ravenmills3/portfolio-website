# ravenleemills.dev

Development Portfolio for Raven-Lee Mills created using Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4 and Nuxt UI.

## Commands

| Command               | What it does                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm dev`            | Dev server with `@nuxt/a11y` hints                                                              |
| `pnpm generate`       | Static build into `.output/public`                                                              |
| `pnpm preview`        | Serve the build like Cloudflare does (port 4173)                                                |
| `pnpm typecheck`      | `vue-tsc` through Nuxt                                                                          |
| `pnpm test:unit`      | Node's built-in test runner                                                                     |
| `pnpm test:e2e`       | Builds, then runs Playwright on the installed Chrome                                            |
| `pnpm assets`         | Re-renders `og-image.png`, `favicon.ico` and `apple-touch-icon.png` (needs Chrome and internet) |
| `pnpm check`          | Runs `ramps:check`, `tile:check` and `i18n:check` (also in CI). Formatting is ignored           |
| `pnpm ramps:contrast` | Contrast of each theme's semantic colours against its background                                |
| `pnpm favicon`        | Regenerates `public/favicon.svg` from the wallpaper geometry                                    |

## Content

- **Career data:** `data/experience.ts` (roles, skills, credentials, currently learning). Each text has en, fr-ca and vi-vn versions.
- **Identity and links:** `data/profile.ts`.
- **Interface text:** `i18n/locales/*.json`.
- **Notes:** `content/notes/<slug>/en-US.md`, plus optional `fr-CA.md` and `vi-VN.md`. Missing translations fall back to English with a notice.

## Colours

`app/assets/css/palettes.css` is generated: The pinned anchors are defined in `scripts/ramps.py`. The script fills the other stops by interpolating in OKLab. `app/app.config.ts` maps the palettes to Nuxt UI's semantic colours (primary, secondary, success, info, warning, error, neutral). `app/assets/css/main.css` sets each theme's own values in `:root` (light) and `.dark`.

## Wallpaper

The floral tile is drawn with radial gradients only, generated into `app/assets/css/wallpaper.css` by `scripts/tile-geometry.mjs`. It has blooms only, no leaves. The favicon and the header mark use the same five-petal geometry.

## Header controls

- **Theme:** System, Light or Dark. It follows the device until changed.
- **Language:** Display site in English, Canadian French and Vietnamese.
- **Animations:** A pause/play button that stops every animation on the site. It follows the device's reduced-motion setting until changed. A small head script applies it before first paint. With animations off, the flowers show fully open and the petal layer is hidden. The petals also pause while the hero is scrolled out of view.

## Deploy to Cloudflare

The site deploys as a Cloudflare Worker with static assets only, no Worker script. `wrangler.toml` holds the settings.

- Build command: `pnpm generate`
- Deploy command: `npx wrangler deploy` (the default)
- Node: 24 (`.node-version`)
- `nuxt.config.ts` sets Nitro's `static` preset. Without it, Cloudflare's build is detected as a Worker server, and Nitro writes its own Wrangler config, which conflicts with this one.
- Pages are served without a trailing slash: `/experience/` redirects to `/experience`. Unknown addresses get `404.html` with a 404 status.
- `public/_headers` sets security and cache headers. The CSP allows inline scripts and styles because Nuxt writes small inline ones.

## Translations

`data/routes.ts` marks each locale `translated: true` or `false`. A `false` locale still builds and is linked from the language menu, but its pages carry `noindex`, and it is left out of `sitemap.xml` and the hreflang tags.

An empty string in a locale file means "not translated yet": the loaders in `i18n/locales/*.ts` drop it, so that text falls back to English. `pnpm i18n:check` keeps the three files' keys in sync and reports coverage.

## In Progress

- Reviewing fr-CA and vi-VN text with a native speaker. Once translations are confirmed, each locale will be updated to `translated: true`.
