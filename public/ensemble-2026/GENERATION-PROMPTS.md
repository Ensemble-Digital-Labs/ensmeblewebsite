# Asset generation prompts — Ensemble 2026

Use these with **Midjourney**, **Flux**, **Adobe Firefly**, or **ChatGPT/DALL·E**. Goal: **editorial healthcare marketing photography** — credible, human, agency-grade. **Not** glossy AI stock.

> **Best anti-AI move:** shoot or license **real photos** where possible (client clinics, team, devices). Use AI only for ambient plates, abstract backgrounds, or placeholders until real assets exist.

---

## 1. Master style prompt (prepend to every photo prompt)

Copy this block first on every generation:

```
Editorial commercial photography for a premium healthcare marketing agency website.
Shot on Canon EOS R5, 35mm or 50mm lens, natural window light mixed with soft fill,
slight film grain, muted color grade, navy and teal shadows, warm realistic skin tones.
Authentic modern medical practice environment — boutique clinic or physician office,
not a generic hospital corridor. Candid or lightly directed, not stock-photo posed.
Subtle imperfections: natural pores, uneven lighting, real furniture wear, shallow depth of field.
Documentary-meets-agency look like Influx Marketing or Cardinal Digital editorial shoots.
No CGI, no 3D render, no illustration, no oversaturated HDR, no plastic skin,
no perfect symmetry, no glowing eyes, no AI smoothness, no watermark, no text overlay.
```

---

## 2. Master negative prompt (append or use as “Exclude”)

```
AI art, hyperrealistic, 8k unreal engine, octane render, CGI, 3D, cartoon, illustration,
anime, plastic skin, waxy face, beauty filter, airbrushed, over-smoothed, uncanny valley,
stock photo cliché, stethoscope around neck, pointing at tablet, blue scrubs group photo,
empty white hospital hallway, surgery light bokeh, sci-fi HUD, dashboard UI overlay,
neon cyberpunk, lens flare spam, oversaturated, HDR crunch, duplicate limbs, malformed hands,
text, logo, watermark, frame border, vignette sticker, Canva template look
```

---

## 3. Post-processing (makes AI output believable)

After export, run every image through:

1. **Downscale slightly** (e.g. 2560 → 2400) — reduces AI sharpness tell
2. **Add 2–4% monochromatic grain** (Lightroom / Photoshop)
3. **Pull saturation down 8–15%**, lift shadows slightly into teal/navy
4. **Crop asymmetrically** — not dead center
5. **Optional:** one subtle color-grading LUT (Kodak Portra 400 or muted corporate LUT)
6. Export **WebP 82–85 quality**, sRGB

---

## 4. What NOT to generate with AI

| Asset | Better approach |
|-------|-----------------|
| Logos (`branding/*`) | Figma / Illustrator — human-designed wordmark |
| Capability icons (`icons/capabilities/*`) | Simple SVG icons (Lucide-style, 2px stroke) |
| Work preview scrolls (`previews/*`) | Real full-page screenshots of live client sites |
| Intro video (`videos/intro-loader.mp4`) | Real b-roll: clinic exterior, team at desk, slow pan |
| Testimonial portraits | Real client photos with permission, or licensed stock with model release |

---

## 5. Photo prompts by file

Each block = **Style master** + **Scene prompt** + **Negative master**.  
Replace `[FILENAME]` when saving to `public/ensemble-2026/...`.

---

### Home — Hero

#### `home/hero/hero-background.webp` (2560×1440, copy-safe left third)

**Scene:**
```
Wide environmental photograph of a modern physician-owned clinic reception area at dusk,
empty chair in foreground, soft desk lamp, glass partition, dark navy walls with warm wood accents,
large negative space on the left third for headline text, depth falling off to the right,
quiet premium atmosphere, no people in frame.
Aspect ratio 16:9, horizontal composition weighted left.
```

**Crop note:** Keep left 40% relatively calm (dark/muted) for white headline text.

---

#### `home/hero/hero-portrait.webp` (1200×1500)

**Scene:**
```
Vertical portrait of a confident female medical director age 45–55 in business casual
(blazer, no white coat), standing in a modern clinic consultation room, arms relaxed,
looking slightly off-camera, genuine expression, window light from camera left,
background softly blurred with teal-gray walls and subtle medical art on wall.
Three-quarter length, not a headshot only.
Aspect ratio 4:5 vertical.
```

---

#### `home/hero/masthead-01.webp` — Team collaboration

**Scene:**
```
Small healthcare marketing team and physician reviewing printed analytics at a conference table,
two laptops closed, paper reports visible, candid mid-conversation, modern office with plants,
mixed ethnicity, professional not model-like, overhead soft daylight.
Vertical 4:5 crop, medium shot.
```

#### `home/hero/masthead-02.webp` — Patient experience

**Scene:**
```
Patient checking in at a sleek clinic front desk, staff member partially visible,
warm interior, natural light, focus on welcoming environment not medical procedure,
vertical 4:5, documentary style, motion slightly implied not frozen glamour pose.
```

#### `home/hero/masthead-03.webp` — Digital / growth

**Scene:**
```
Close-medium shot of hands holding phone showing appointment booking screen (generic UI blur,
no readable brand names), clinic waiting area softly blurred behind,
vertical 4:5, shallow depth of field, realistic screen glow not neon.
```

#### `home/hero/masthead-04.webp` — Clinical credibility

**Scene:**
```
Interventional radiology or specialty clinic hallway detail — framed diploma, clean equipment cart,
no patients, no procedure, architectural detail suggesting high-acuity specialty care,
vertical 4:5, moody but not scary, navy and warm wood tones.
```

---

### Home — Brand collage

#### `home/brand/story-main.webp` (1400×1600)

**Scene:**
```
Editorial photograph of diverse healthcare leadership team walking through modern medical office corridor,
candid stride, natural laughter, business casual, large vertical composition for magazine-style layout,
environment feels established and trustworthy not startup gimmick.
Aspect ratio near 7:8 vertical.
```

#### `home/brand/story-overlay-top.webp` (600×750)

**Scene:**
```
Tight crop: physician hands typing on laptop at standing desk, coffee cup edge of frame,
shallow depth of field, vertical crop suitable for rotated card overlay.
```

#### `home/brand/story-overlay-bottom.webp` (600×750)

**Scene:**
```
Tight crop: close-up of clinic brand signage on frosted glass door, subtle depth,
premium typography on glass (generic "Medical Group" style, no real trademark),
vertical crop for overlay card.
```

---

### Home — Expertise (1200×900 each, 4:3)

#### `home/expertise/specialty-practices.webp`

**Scene:**
```
Specialty surgical practice consultation room, physician explaining imaging on wall-mounted monitor,
patient silhouette from behind (no identifiable face), high-end specialty care mood,
horizontal 4:3, calm authoritative tone.
```

#### `home/expertise/pain-msk.webp`

**Scene:**
```
Musculoskeletal pain clinic treatment room, physical therapy table, anatomical model on shelf,
bright but soft daylight, hopeful recovery mood not emergency room,
horizontal 4:3.
```

#### `home/expertise/wellness-aesthetics.webp`

**Scene:**
```
Physician-led med spa reception, stone counter, soft neutral palette, luxury wellness not nightclub,
single staff member arranging flowers or brochure, horizontal 4:3, aspirational premium.
```

---

### Home — Passion

#### `home/passion/mission-band.webp` (1600×900)

**Scene:**
```
Wide cinematic band: sunrise through windows of a medical office overlooking city treeline,
empty chairs suggesting early morning preparation, warm gold light with navy shadows,
horizontal 16:9, emotional but restrained, no people or silhouettes.
```

---

### Home — Work covers (1600×900 each)

**Do not fake full websites in AI.** Prefer **screenshot of real site** on monitor, or abstract brand mood plate.

#### `home/work/stl-ioir-clinics/cover.webp`

**Scene (monitor mockup):**
```
Photograph of a desktop monitor on a dark desk showing a blurred healthcare website homepage
(interventional oncology aesthetic, deep blue and white), slight screen reflection,
office environment out of focus, horizontal 16:9, realistic not rendered mockup.
```

#### `home/work/arc-wellness/cover.webp`

**Scene:**
```
Laptop on marble counter showing blurred luxury wellness website (dark elegant UI),
soft ambient light, horizontal 16:9, premium med spa brand mood.
```

#### `home/work/smart-pain-solutions/cover.webp`

**Scene:**
```
Tablet propped on clinic table showing blurred pain management practice website (clean medical green-blue palette),
horizontal 16:9, documentary desk setup.
```

#### `home/work/mhw-surgery/cover.webp`

**Scene:**
```
Desktop in surgical practice admin office, monitor showing blurred surgical group website,
diploma frames on wall softly visible, horizontal 16:9.
```

#### `home/work/aipstl/cover.webp`

**Scene:**
```
Community healthcare organization workspace, monitor with blurred membership-focused website,
warm inclusive office, horizontal 16:9.
```

---

### Home — Testimonials (800×1000 each)

Use **real client headshots** when possible. If generating placeholders until real photos exist:

#### `client-01.webp` through `client-05.webp`

**Scene template (vary gender/age each time):**
```
Professional corporate headshot portrait of a [male/female] physician age [40–60],
neutral gray or soft clinic background, softbox lighting but not glamour,
natural skin texture, slight asymmetry, business attire or white coat open,
looking at camera with calm confidence, vertical 4:5, LinkedIn-quality not fashion editorial.
No teeth-heavy smile, no beauty retouching.
```

#### `client-default.webp`

**Scene:**
```
Neutral professional placeholder portrait, soft gradient background navy to gray,
silhouette or abstract human shape NOT a detailed face — use only if no photo available.
Prefer a simple illustrated avatar in SVG instead of AI face.
```

---

### Marketing page heroes (1920×1080)

Shared formula — change subject per page:

#### `pages/about/hero.webp`

```
Team of four healthcare marketing professionals and clinicians in modern open office,
candid group not lined up, warm daylight, wide 16:9, space for headline lower left.
```

#### `pages/about/team.webp`

```
Medium-wide shot of collaborative workspace, people at whiteboard with strategy notes (illegible),
authentic agency-meets-healthcare culture, 16:9.
```

#### `pages/services/hero.webp`

```
Flat lay on dark desk: service deliverables — printed SEO report, phone with analytics,
branded folder, stethoscope at edge of frame as accent only, 16:9, organized not cluttered.
```

#### `pages/case-studies/hero.webp`

```
Wall-mounted grid of framed clinic photography prints in agency office hallway,
meta reference to portfolio work, 16:9, subtle not cheesy.
```

#### `pages/contact/hero.webp`

```
Inviting clinic reception phone and appointment book on desk, morning light,
empty chair suggesting "we're ready to talk", 16:9, warm approachable mood.
```

#### `pages/insights/hero.webp`

```
Physician reading industry report at desk with coffee, laptop closed, thoughtful moment,
library-style medical journals on shelf blurred, 16:9 editorial.
```

---

### Shared ambient & backgrounds

These can be **abstract** — less risk of AI uncanny valley.

#### `shared/ambient/wash-01.webp` & `wash-02.webp`

```
Abstract soft photographic bokeh, dark navy and teal color fields, subtle grain,
no objects, no figures, seamless tile-friendly gradient wash, 1920×1080,
looks like out-of-focus clinic window light not digital gradient banding.
```

#### `shared/backgrounds/section-dark.webp`

```
Minimal dark navy textured paper or fabric photograph, subtle noise, no objects,
16:9 plate for web section background.
```

#### `shared/backgrounds/section-light.webp`

```
Off-white warm paper texture photograph, subtle fiber grain, no objects, 16:9.
```

---

## 6. Capability icons (SVG — design, don’t AI-photo)

Prompt for **vector tool** or hand-off to designer:

```
Set of 8 minimal line icons for healthcare marketing agency: SEO, web design, PPC, social media,
content, analytics, automation, strategy. 24×24 grid, 1.75px stroke, rounded caps,
single color #05e0b4 on transparent, geometric not playful, Lucide/Feather style consistency.
Export SVG, no fills except optional subtle accent dot.
```

Files: `icons/capabilities/seo.svg`, `web-design.svg`, `ppc.svg`, `social.svg`, `content.svg`, `analytics.svg`, `automation.svg`, `strategy.svg`

---

## 7. Branding (design brief — not image gen)

```
Wordmark: "Ensemble Digital Labs" — modern grotesk sans, confident spacing,
light version for dark UI, dark version for light UI. Optional abstract mark suggesting
connection/partnership (two arcs or linked forms), not medical cross cliché.
Colors: white/near-white on dark; navy #0f1231 + teal accent #05e0b4 on light.
Deliver SVG + PNG @2x lockup.
```

---

## 8. Intro video brief (`videos/intro-loader.mp4`)

**Do not use AI video generators for final asset.**

Shoot or compile 8–12s from:

- Slow dolly past clinic reception (empty or soft activity)
- Hands closing laptop after strategy session
- Exterior sign golden hour (generic clinic name)

Grade: muted, match site navy/teal. Export 1920×1080 H.264, muted, **no loop**.

---

## 9. One-shot mega prompt (batch direction for an AI assistant)

Paste this into ChatGPT / Claude when you want a full brief in one go:

```
You are an art director for Ensemble Digital Labs, a premium healthcare digital marketing agency.
I need generation prompts for a complete website photo library. Every image must look like
real editorial photography (Canon R5, natural light, film grain, muted grade) — NOT AI stock.

Brand mood: trustworthy, growth-focused, physician-friendly, navy/teal/warm accents.
Avoid: hospital corridors, HUD dashboards, cyberpunk, plastic AI faces, stethoscope clichés.

For each filename below, write one optimized Midjourney/Flux prompt (under 400 chars) plus crop notes:

[Paste file list from ASSET-MANIFEST.md]

Always include anti-AI negatives and specify aspect ratio per file.
Prioritize real-photo alternatives where AI would look fake (logos, icons, website previews, testimonials).
```

---

## 10. Consistency checklist before dropping files in

- [ ] Same color grade across all photos (navy shadows, warm skin)
- [ ] No readable fake text or gibberish UI on screens
- [ ] Faces: max 2–3 distinct AI-generated people reused across site (or use real photos)
- [ ] Filenames match `ASSET-MANIFEST.md` exactly
- [ ] Exported as WebP, sRGB, dimensions per manifest
