# Design note — Hover preview links (draft)

**Status:** Saved for later — **not wired into the live site**  
**Draft component:** `src/components/drafts/HoverPreview.jsx`  
**Saved:** 2026-06-14

---

## What it is

Inline text links that show a **floating preview card** (image + title + subtitle) on hover. The card follows the cursor with viewport boundary checks.

**Pattern name:** Hover preview / link tooltip card / contextual preview on hover.

---

## Why we might use it

Good for dense copy where we want **short readable sentences** but still surface **proof** (tool screenshots, case study thumbs, service visuals) without leaving the paragraph.

Fits a premium agency site when adapted to Ensemble tokens — not the default rainbow/cyber grid from the reference snippet.

---

## Candidate placements (undecided)

| Area | Idea |
|------|------|
| **Home — Story / Brand** (`home-brand`) | Shorten body copy; hover **marketing**, **software**, **IT**, **creative** → preview cards |
| **Home — Expertise** | Hover specialty names → expertise card art or case study still |
| **Services index** | Hover service pillars → mini proof or deliverable screenshot |
| **About** | Hover “HIPAA-aware”, “revenue-focused” → metric or testimonial card |
| **Insights / Blog hub** | Hover category tags → featured article preview |

**Mobile:** Hover-only is not enough — need tap-to-open preview or inline expand (`responsive-mobile-first.mdc`).

---

## Ensemble adaptation (before shipping)

Reference snippet is **UI-tool demo content** (Figma / Sketch / Adobe). When we use this on Ensemble:

1. **Copy** — Replace `previewData` with healthcare growth content (services, case studies, capabilities).
2. **Underline** — Swap rainbow gradient for **teal → gold** or **cyan accent** (`design-direction.mdc` — no rainbow neon default).
3. **Typography** — Use existing **Plus Jakarta Sans** / **Fraunces**, not Space Grotesk import.
4. **Background** — Do **not** drop the full dark grid + red ambient glow into home sections; keep section atmosphere as-is; preview card only floats above content.
5. **Images** — Use `public/ensemble-2026/` assets or case study covers, not Unsplash placeholders.
6. **Motion** — Honor `prefers-reduced-motion`; disable follow-cursor or show static inline card.
7. **Performance** — Preload images (already in draft); cap card size on mobile.

---

## Integration sketch (when ready)

```jsx
// Example — HomeChapterBrand.jsx (future)
import HoverPreviewParagraph from '../drafts/HoverPreviewParagraph' // split from draft

<HoverPreviewParagraph
  links={[
    { key: 'marketing', label: 'performance marketing', preview: HOME_PREVIEW.marketing },
    // ...
  ]}
/>
```

Prefer extracting **HoverLink + PreviewCard** into `src/components/ui/` and keeping section-specific copy in `homeInfluxContent.js` or `content.js`.

---

## Reference source

User-provided self-contained React snippet (HoverPreview with inline `<style>`). Preserved in draft file with TypeScript types removed for this repo’s JSX setup.

---

## Open questions

- [ ] Which section first?
- [ ] One global preview card vs per-section data?
- [ ] Touch behavior on mobile/tablet?
- [ ] Wire to router (`Link`) on click after preview?
