# DNA Capital `/companies` — extraction & analysis

**Source:** [https://dnacapital.com/companies](https://dnacapital.com/companies)  
**Extracted:** 2026-06-12 (SSR HTML, Nuxt payload, inline Vue scoped CSS)  
**Agency:** [Immersive Garden](https://immersive-garden.com/) (known from prior home-page recreation + [Codrops DNA Capital tutorial](https://tympanus.net/codrops/2021/10/18/replicating-the-particles-animation-from-dna-capital-with-three-js/))

---

## 1. Page purpose

Single-purpose **portfolio index**: browse ~26 healthcare portfolio companies with **Geography / Stage / Status** filters, inside a **full-viewport horizontal carousel** over a **fixed WebGL starfield + DNA helix** background. Each card links to `/companies/{slug}` detail pages.

Meta description: **“Network of healthcare companies”**.

---

## 2. Tech stack

| Layer | Technology |
|--------|------------|
| Framework | **Nuxt.js** (Vue 2 SSR) — `__nuxt`, `/_nuxt/*.modern.js`, static payload |
| Styling | **Vue scoped CSS** + fluid `rem` via `html { font-size: 1vw }` |
| Background | **Three.js WebGL** — fixed `<canvas class="background">`, preloads `dna-02.glb`, Draco, displacement texture |
| Fonts | **Graphik** (UI), **Darius** (display headings) |
| Logo motion | **Bitmap font sprite** canvas (`darius-light-v2/data.json` + texture) |
| Menu logo | **GLTF** `menu-logo.gltf` |
| Carousel | **Custom Vue carousel** — absolute-positioned `<li>` items, `cursor: grab`, **not** native `overflow-x: scroll` |
| Animation | GSAP-style timelines (inferred from home + section `opacity: 0` initial states; minified bundles) |
| i18n | EN / PT (`/pt/companies`) |
| CMS data | Nuxt async payload — company list baked at build time |

Preloaded assets (from `<head>`):

- `/models/dna-02.glb`
- `/images/webgl/displacement-texture.jpg`
- `/libs/draco-r151/*`
- `/fonts/dom/graphik-*.woff2`, `bwdarius-light.woff2`

---

## 3. DOM structure (simplified)

```
.layout
├── canvas.background          ← fixed WebGL (full viewport)
├── .container > .content > .page
│   └── section.section.section-carousel     ← ~100svh, starts opacity:0
│       ├── .row.row-filters                 ← absolute top-right
│       │   └── ul.team-filters
│       │       ├── Geography dropdown
│       │       ├── Stage dropdown
│       │       └── Status dropdown
│       └── .row.row-carousel                ← full height
│           └── ul.carousel                  ← position absolute, grab cursor
│               └── li (×N)                  ← each li also position:absolute
│                   └── a.portfolio-item.item
│                       ├── .background      ← dark glass panel
│                       ├── img.logo         ← white company mark
│                       ├── span.title       ← company name (uppercase)
│                       ├── .title-line      ← 1px blue accent
│                       └── .learn-more
│                           ├── span.label   ← "Learn more"
│                           └── svg.arrow    ← pink stroke →
├── .navigation                              ← fixed logo + tagline + MENU
├── .menu                                    ← full-screen overlay nav
├── .transition                              ← route transition heading
└── .preloader
```

---

## 4. Visual design tokens (from inline CSS @ 850px+)

| Token | Value | Usage |
|--------|--------|--------|
| Page bg | `#1f1f26` | `body`, layout |
| Canvas / deep | `#070708` (approx, matches home extraction) | WebGL wash |
| Body text | `#c0c9df` | Descriptions, muted UI |
| Headings | `#fff` | Titles, nav |
| Blue accent | `#1954ec` | `.title-line` vertical rule |
| Pink accent | `#ff3d7d` | `.arrow` SVG stroke |
| Focus | `#46cdff` | `:focus-visible` |
| Panel fill | `rgba(0, 0, 7, 0.25)` | `.portfolio-item .background` |
| Nav tagline | `hsla(0,0%,100%,.75)` | “Network of healthcare companies” |

**Typography (desktop):**

- Filter buttons: Graphik **0.8125rem**, uppercase, letter-spacing ~0.04em, underline on active
- Card title label: **0.75rem**, uppercase, letter-spacing **0.2em**
- Learn more: **0.75rem**, uppercase, letter-spacing **0.15em**

**Fluid scale:** breakpoints at **375 / 500 / 850 / 2000px** — `html` font-size is vw-based so all `rem` dimensions scale with viewport.

---

## 5. Carousel behavior (critical)

This is **not** a CSS scroll-snap strip. From scoped CSS:

```css
.carousel { cursor: grab; position: absolute; width/height 100%; }
.carousel > li { position: absolute; left: 0; top: 0; display: flex; align-items: center; height: 100%; }
.carousel.disable > li, .carousel > li { pointer-events: none; }
.item { pointer-events: auto; }
.portfolio-item { will-change: transform; }
```

**Implications:**

1. All slides share the same anchor; **JS sets `transform: translateX(...)`** (and likely scale/Y offset) per item.
2. **Drag** moves the carousel; inactive slides are dimmed/smaller; **center slide is “hero”**.
3. **Active/center state** (from screenshot + CSS defaults):
   - `.logo` default `opacity: 0` on desktop → **visible + large** when centered (e.g. “Clover” wordmark fills panel).
   - `.title`, `.label` default `opacity: 0` → fade in above/below when centered.
   - `.title-line` blue vertical segment appears beside title.
4. Side cards show **smaller logo marks** only; center card dominates.
5. Section is **`height: 100svh`** — the companies page is essentially **one screen**; vertical scroll is minimal.

**Card dimensions (desktop, 850px+):**

- Outer `.portfolio-item`: **13.125rem × 20rem** (~210×320px at 16px root)
- Inner `.background` panel: **11.25rem × 17.5rem**, offset from outer box
- Logo max width: **5rem** (inactive); scales up when active

---

## 6. Filters

Three **dropdown** controls (not always-visible option rows):

| Filter | Options |
|--------|---------|
| **Geography** | All, North America, South America, Europe |
| **Stage** | All, Venture Capital, Private Equity |
| **Status** | All, Current (Active), Exited |

- **Desktop:** inline text buttons; label shows dimension name (“Geography”); options in custom dropdown.
- **Mobile:** native `<select>` (hidden) + `.substitude` faux UI.
- Filtering re-builds carousel list (Vue `fade` transition on section, 0.5s).

**Data mapping (from Nuxt payload):**

- `geography`: `"North America" | "South America" | "Europe"`
- `division`: `"Venture Capital" | "Private Equity"` → Stage filter
- `status`: `"Active" | "Exited"` → Status filter (UI label “Current” maps to Active)

---

## 7. Company content model

Each item in `payload.js`:

```json
{
  "name": "Clover Health",
  "slug": "clover-health",
  "logo": "/uploads/companies/clover_logo.png",
  "geography": "North America",
  "division": "Venture Capital",
  "status": "Active",
  "website": "http://cloverhealth.com",
  "description": "<p>…HTML…</p>",
  "footnote": "" | "Note: …"
}
```

**26 companies** in payload (Inspirali duplicated once in SSR HTML — likely CMS quirk).

Logos are **white/light PNG or SVG** on transparent background — designed for dark UI, not photo thumbnails.

---

## 8. Navigation chrome

Same global shell as rest of site:

- Fixed **DNA CAPITAL** wordmark + animated **DNA sprite** canvas
- Tagline on companies route: **“Network of healthcare companies”** (`.tag` beside logo)
- **MENU** + diamond icon (rotated squares)
- Full-screen menu: Darius serif links (Our DNA, Approach, Team, Companies, Contact)
- EN / PT language toggle
- Route transition overlay with large heading

---

## 9. Comparison: DNA vs Ensemble `/case-studies` (current)

| Aspect | DNA Capital `/companies` | Ensemble `/case-studies` (current) |
|--------|--------------------------|-------------------------------------|
| Gallery engine | JS absolute carousel + drag | Native horizontal scroll + proximity scale |
| Viewport | Single **100svh** screen | Scrollable page + filters header |
| Filters | 3 dropdowns, top-right | 3 expanded filter groups |
| Card asset | White **logo** SVG/PNG | Photo thumbnail |
| Active card | Logo scales to wordmark; title + line + CTA fade in | Typography swap center vs side |
| Accents | Blue `#1954ec` line + pink `#ff3d7d` arrow | Cyan/coral generic accents |
| Background | Shared site WebGL canvas | Separate `CaseStudiesDnaCanvas` (home helix) |
| Detail route | `/companies/{slug}` | `/case-studies/{slug}` |

---

## 10. Recreation checklist (faithful clone)

To match [dnacapital.com/companies](https://dnacapital.com/companies) on Ensemble:

1. **Replace scroll track** with **transform-based carousel** (drag + optional inertia), one item centered at a time.
2. **Lock section to ~100svh** — minimal vertical page scroll on hub.
3. **Filters:** three dropdowns top-right (Geography → Discipline, Stage → Capability, Status → Outcome mapping).
4. **Cards:** dark glass panel + **white logo**; active state reveals uppercase title above, blue vertical line, “Learn more” + pink arrow.
5. **Assets:** client logo marks (or typographic fallback from client name), not Unsplash photos.
6. **Typography:** light weight, uppercase micro-labels, large centered wordmark on focus slide.
7. **Background:** fixed WebGL particle field (reuse `dna-02.glb` pattern from clone, not plum atmosphere).
8. **Fluid rem scaling** at 320 → 1440 → 2560.

---

## 11. Extracted artifacts (this session)

| File | Description |
|------|-------------|
| `documents/2026-06-12/dnacapital-companies.html` | Full SSR HTML |
| `documents/2026-06-12/dnacapital-companies-payload.js` | Nuxt company JSON |
| `documents/2026-06-12/session-2026-06-12-dnacapital-companies-extraction.md` | This document |

Prior home-page extraction tokens: `src/lib/dnaCapitalTokens.js` (colors, type scale).

---

## 12. References

- Live page: [dnacapital.com/companies](https://dnacapital.com/companies)
- Particle helix: [Codrops — Replicating DNA Capital with Three.js](https://tympanus.net/codrops/2021/10/18/replicating-the-particles-animation-from-dna-capital-with-three-js/)
- Local clone (home pattern): `/dna-capital-clone` in this repo
