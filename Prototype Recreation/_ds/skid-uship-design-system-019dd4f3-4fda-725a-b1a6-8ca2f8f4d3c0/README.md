# Skid · uShip Design System

Skid is the design system for **uShip** — the marketplace for shipping big and
bulky things. Skid is the shared component & token library used across uShip's
shipper, carrier, and broker surfaces (web app, marketing, dashboard).

> **Mission:** Delivering the Impossible.
> **Positioning:** Ship the big stuff with peace of mind.

## Sources

- **2026 uShip Brand Guidelines** (PDF, official) — mission, vision,
  positioning, brand values, personality, tone, logo + badge rules,
  brand color (`#0073AD`).
- **Writing & Grammar Standards** (March 2026, Marketing — Carly Roye) —
  voice in practice, CTAs, capitalization, grammar, punctuation, numbers,
  dates, money, headlines, terminology constraints.
- **Skid Design System.fig** (Figma file, 48 pages, 211 frames) — every
  component, token, and visual primitive. The component CSS in this project
  is derived directly from the Figma pseudocode + screenshots.
- **Figma Variable JSON dumps** (`uploads/primitive.json`,
  `uploads/skid-semantic.json`, `uploads/component.json`) — auto-generated
  `tokens.css`. Don't hand-edit `tokens.css`; regenerate from those JSONs.
- **Official logo** (`uploads/uShip-logo.svg`) — copied into `assets/`.

## Index

- `README.md` — this file
- `SKILL.md` — agent skill manifest (writing rules + system shortcuts)
- `tokens.css` — primitives + semantic + component tokens (auto-generated from Figma JSONs)
- `colors_and_type.css` — fonts + type utility classes + legacy alias shims
- `components.css` — every `.skid-*` component class
- `assets/` — uShip logos (blue, white, dark)
- `fonts/` — self-hosted Lato webfonts
- `preview/` — design-system review cards (rendered in the Design System tab)

## Brand at a glance

- **Name:** **uShip** — lowercase "u", uppercase "S". Always. Never "Uship",
  "USHIP", "uShip.com" (except when actually directing to the site).
- **Mission:** Delivering the Impossible.
- **Positioning:** Ship the big stuff with peace of mind.
- **Brand purpose:** *The go-to solution for confidence in shipping big and
  bulky. Find the best option for your parameters. Get it there safe and
  sound, exactly as you sent it.*
- **Audiences:** shippers (people / businesses with something to move),
  carriers (independent transport professionals), brokers (multi-load
  coordinators). Refer to all three in lowercase as roles.

### Brand values

| Value           | What it means in product                                                                                            |
|-----------------|----------------------------------------------------------------------------------------------------------------------|
| **Helpfulness** | Shipping is complicated. Maximize value, minimize headaches. Inline guidance, helper text, sensible defaults.        |
| **Honesty**     | Transparency builds trust — tracking, protected payments, clear pricing, real status badges, no dark patterns.       |
| **Reliability** | A clear and effective marketplace. Predictable layouts, no surprise state changes, confirmations on destructive ops. |
| **Caring**      | We respect the human element. Long-haulers, busy business owners, families moving across the country.               |

### Personality

- **Dependable** — proven track record; the UI should never feel improvised.
- **Confident** — assured language, firm digital handshake. Don't hedge.
- **Wise** — technical knowledge bolstered by experience; we explain things plainly.
- **Empathetic** — there's a real person on the other side of every shipment.

### Tone of voice (four facets)

| Facet                              | Purpose                          |
|------------------------------------|----------------------------------|
| Honest & Thoughtful                | How we back up our experience    |
| Helpful & Informative              | How we show we're supportive     |
| Caring & Guiding                   | How we express our empathy       |
| Positive, Confident, Straightforward | How we show our expertise        |

**Our copy is:** conversational · timely · educational · intuitive · simple · friendly · consistent.
**Our copy is not:** long-winded · deflective · silly · salesy · scary.

## The Big Three — critical content rules

These show up in every review. Memorize them.

1. **Refer to uShip as `uShip`** — lowercase "u", uppercase "S". Don't use
   `uShip.com` unless directing someone to the website.

2. **Carrier language.** Carriers are **independent professionals** — they do
   not work for uShip. uShip is a marketplace connecting shippers with carriers.
   - ✅ Use: `feedback-rated`, `top-rated`, `professional`, `experienced`.
   - 🚫 Don't use: `vetted`, `verified`, `fully insured`, `licensed`.

3. **Insurance vs. Protection.** Many carriers carry liability insurance, and
   uShip also offers the **uShip Protection Plan**. We are **not** legally
   permitted to call the Protection Plan "insurance."

## Voice in practice — the four pillars

1. **Confident** — *uShip gives you access to the most comprehensive shipping
   options available.* (not "might be able to help.")
2. **Straightforward** — *Ship the big stuff with peace of mind.* (not
   "provides customers with a platform through which large item shipping can
   be facilitated.")
3. **Considerate** — *We know your shipment matters. That's why we partner
   with feedback-rated carriers who treat it like their own.* (not "uShip
   connects shippers with carriers in our nationwide network.")
4. **Memorable** — *Delivering the Impossible.* (not "Shipping made easy.")

## CTAs

**Title Case, 1–3 words.** Specific, never generic.

✅ `Get an Estimate` · `Log In` · `Get a Quote` · `Get Started Now` · `Book Now` · `Track Shipment` · `Post a Shipment`

🚫 `Click Here` · `Submit` · `Learn More About Our Secure Payment System` · `get a quote` (sentence case) · `GET QUOTE` (all-caps) · `Get quote` (only first word capped)


## Grammar essentials

- **Oxford comma** — always. `toothbrush, toothpaste, and floss`
- **Contractions** — yes. *We're glad you're here.*
- **Em dashes** — sparingly. No spaces. *Em dashes can be addictive—be careful.*
- **Exclamation points** — very sparingly. Never more than one per paragraph.
- **No semicolons** — split the sentence or use an em dash.
- **Abbreviations** — spell out on first use with abbreviation in parentheses.
  `Less Than Truckload (LTL)` → `LTL` thereafter. Well-known (API, URL) don't need it.

## Numbers, dates, money

- **Numbers** — spell out 1–9, numerals for 10 and up. Always spell out a
  number that begins a sentence. Numerals over 3 digits get commas
  (`1,000`, `200,000`).
- **Dates** — spell out the day, abbreviate the month except May.
  `Friday, Feb. 16, 2026`. Month + year: spell out (`February 2026`).
- **Time** — numerals with `am`/`pm`, no space, no periods. Hyphen for ranges.
  `8am`, `8:45pm`, `8am–8:45pm`. US zones: ET, CT, MT, PT.
- **Money** — symbol + amount, no decimal for even amounts.
  `$20`, `$9.99`, `€1`.
- **Percentages** — `45 percent of respondents` (body), `97% Positive` (headline/UI).
- **Ranges** — hyphen. `3–5 days`, `7–7:30pm`.

## States, countries, URLs

- **State alone** → spell out. `She lives in Texas.`
- **State with city in body** → spell out. `She's based in Austin, Texas.`
- **State with city in tight UI** (labels, headlines, data tables) → abbreviation OK. `Austin, TX`.
- **AP always-spell-out states** (even with a city): Alaska, Hawaii, Idaho, Iowa, Maine, Ohio, Texas, Utah.
- **Countries** — `United States` on first mention, `US` after. Same for EU, UK.
- **URLs** — drop the `http://www.`. `uShip.com` (not `www.uship.com`).

## Visual foundations

**Colors.** The system is built on a 13-stop **gray** scale plus 8 hue ramps
(Red, Green, Blue, Orange, Purple, Sky, Lime, Magenta). Brand identity is
carried by **`#0073AD` (uShip Blue)** — the logo-only color from the brand
guide. Interactive UI surfaces (buttons, links, focus rings, info chips) use
**Blue-600 `rgb(2,124,177)`** from the Figma component tokens; this is a
slightly more saturated tone that hits AA contrast against white at smaller
text sizes. Action / confirm CTAs use **Green-700 `rgb(0,108,33)`**
(uShip's distinctive "go" color). Destructive uses **Red-700/800**.

**Type.** Lato everywhere (Bold for headers / labels / buttons / badges;
Regular for body and helpers). **No monospace.** Skid does not use Roboto
Mono — numerics (rates, distances, quote counts, IDs) are set in Lato with
`font-variant-numeric: tabular-nums` for column alignment, exposed via the
`.skid-num-*` utility classes. Type tops out at 32 px (h1) — the system
prefers density over display drama.

**Spacing.** 4-px base. Scale: 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 /
64 / 80 / 96 / 160. Named multiplicatively (`1x = 4px`, `4x = 16px`).
Inline gaps default to `2x` (8 px); section gaps to `8x` (32 px); page
padding `20x` (80 px) marketing / `6x` (24 px) app.

**Backgrounds.** Solid colors, **layered.** Three semantic layer tokens:
`--surface-layer-01` (page bg — `gray-50` light / `gray-800` dark),
`--surface-layer-02` (component-level — cards, side panels, table headers
on `gray-100` / `gray-750`), and `--surface-layer-03` (high-emphasis
call-outs, selected rows, highlight strips on `gray-200` / `gray-700`).
Always layer up — page → component → highlight. White cards explicitly use
`--surface-card` (which is `gray-0` light, `gray-800` dark). No gradients,
no patterns, no full-bleed photography in the system itself. The brand
thumbnail dark surface is `rgb(0,31,51)`.

**Cards.** White (`gray-0`) on `gray-50/100` page bg, 1 px `gray-300` border,
**8 px radius**, optional `--elev-1` shadow. Display surfaces (component
sheets) use 32 px radius. Borders over shadows; shadows are reserved for
floating UI (popovers, tooltips, dropdowns, modals).

**Borders.** 1 px solid `gray-300` default. Strong = `gray-500`. Soft =
`gray-200`. Focus = 2 px Blue-400 ring + 2 px white halo.

**Shadows / elevation.** Five levels, all built from
`rgba(55,65,80,0.08)` + `rgba(0,0,0,0.04)`. Subtle. Toast/Modal use a single
sharper `0 4px 4px rgba(0,0,0,0.25)` per the Figma source.

**Animation.** Restrained. `cubic-bezier(0.2, 0, 0, 1)`, 120–200 ms for
state changes, 240 ms for entry/exit. Toasts slide-in from top-right;
modals fade + scale-from-98%; accordions height-tween; skeletons pulse
`gray-200 ↔ gray-300`. No bounces.

**Hover.** Filled buttons darken one ramp step. Ghost / tertiary fill
`gray-50`. Links darken `blue-600 → blue-700`. Cards never hover-lift.

**Press.** Filled buttons darken two ramp steps. Ghost / secondary fill
`gray-100`. No transform-shrinks.

**Disabled.** Bg `gray-300`, text `gray-500` / `gray-400`. Skeleton loading
is a flat `gray-300` block of identical dimensions.

**Transparency / blur.** Almost none. Solid-color-first. The only blur
appears behind modals (`rgba(0,31,51,0.32)` scrim, no actual blur).

**Imagery.** Real shipments, drivers, container yards — warm, golden-hour
when possible. No B&W. No cool studio shots. No grain.

**Layout.** Header sticky, 77 px tall, white with `gray-300` bottom border.
Nav tabs underline only (no pills). Footer full-bleed dark blue
(`rgb(0,31,51)`) with white text + white logo. Content max-width 1280 px
marketing, fluid app.

## Iconography

Skid uses **[Lucide icons](https://lucide.dev/icons/)** exclusively (1500+
icons in the Figma file). Stroke-based, 1.5 px stroke, 24 × 24 default;
16 / 20 / 24 / 32 sizes used in components. Icons inherit
`var(--icon-default)` (`gray-700`) and `currentColor` from text.

Load via CDN: `<script src="https://unpkg.com/lucide@latest"></script>`, then
`lucide.createIcons()` after placing `<i data-lucide="icon-name"></i>` elements.
Or inline SVGs directly from lucide.dev for tighter stroke/color control.

**Styled Icon wrapper:** 36 × 36 px circle, `background: var(--blue-100)`,
`padding: 8px`, icon inside at 20 × 20 px.

Do not use emoji, custom SVG illustrations, or other icon libraries in
product or deck work.

uShip also has a "Badge" mark (the secondary logo). It supports the primary
logo but never replaces it. Available in Blue, White, Black (see
`assets/uship-logo-*`).

**Emoji are not used in product UI.** Unicode `•` and `…` only.

## Logo rules

- Use **uShip Blue (`#0073AD`)** on light backgrounds.
- Use **white knockout** on uShip Blue or similar dark backgrounds.
- Never use any other color.
- Clear space on all sides = the height of the "u" in the wordmark.
- Don't combine the logo with other graphics, don't imply uShip endorses
  things, don't use the logo as part of another product name.

## Caveats / known approximations

- **Brand Blue vs. UI Blue.** The Brand Guidelines name `#0073AD` as the
  only valid logo color; Figma's component tokens use
  `rgb(2,124,177)` (`#027CB1`) for interactive UI. These are visually close
  but not identical. Keep them distinct: use `--brand-blue` for the
  wordmark, `--blue-600` for buttons / links / chips.
- **Per-color in-between stops** were color-picked from the rendered Color
  page of Figma to within ~1–2 RGB units before the JSON dumps replaced
  them with exact values; the current `tokens.css` matches the JSON exactly.
- **Lucida Grande / Inter** mentions in Figma metadata are Figma's internal
  annotation typefaces, not Skid tokens. Runtime type is **Lato only** —
  no monospace, no Roboto Mono.
