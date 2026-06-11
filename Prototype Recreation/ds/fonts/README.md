# Skid fonts

Skid uses **Lato** as its only runtime typeface — sans for everything
(headers, body, labels, buttons, badges, numerics).

## Lato — self-hosted

The full Lato family is bundled here as TTF files and wired up via
`@font-face` declarations at the top of `colors_and_type.css`. No CDN
fetch is needed for Lato. Available weights:

| Weight | File                       | Italic file                       |
|-------:|---------------------------|-----------------------------------|
| 100    | `Lato-Thin.ttf`           | `Lato-ThinItalic.ttf`             |
| 300    | `Lato-Light.ttf`          | `Lato-LightItalic.ttf`            |
| 400    | `Lato-Regular.ttf`        | `Lato-Italic.ttf`                 |
| 700    | `Lato-Bold.ttf`           | `Lato-BoldItalic.ttf`             |
| 900    | `Lato-Black.ttf`          | `Lato-BlackItalic.ttf`            |

Skid runtime UI uses **400** (body) and **700** (headers, labels, buttons,
badges) almost exclusively. Light/Black are available for marketing display.

## No monospace

Skid does **not** use Roboto Mono or any other monospace face. Numerics
(prices, distances, IDs, quote counts, data tables) are set in **Lato**
with `font-variant-numeric: tabular-nums` for column alignment — see the
`.skid-num-xs/sm/md/lg` utility classes in `colors_and_type.css`. Do not
load Roboto Mono in product, marketing, or deck work.

## Substitution flag

The Figma metadata also references **Lucida Grande** and **Inter** — these
are Figma's *internal* annotation typefaces, not Skid type tokens. Skid
runtime type is **Lato only**.
