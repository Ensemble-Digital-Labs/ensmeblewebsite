# Removed elements — re-evaluate later (2026-06-17)

Use this list when deciding what to bring back, redesign, or keep hidden. Each item notes **where it was**, **what changed**, and **how to restore** if needed.

---

## 1. Home — Process section (chapter VI)

| | |
|---|---|
| **Page** | Homepage (`/`) |
| **Section** | Process / deck chapter between Work and Services |
| **What we did** | Hidden via feature flag — component file kept |
| **Restore** | In `src/lib/homeDeckActs.js`, set `HOME_PROCESS_SECTION_ENABLED = true` |
| **Also restores** | Right-rail label **PROCESS VI** in scroll nav |

---

## 2. Fullscreen nav — “How We Measure AI Marketing ROI” card

| | |
|---|---|
| **Page** | Any page (menu open) |
| **Section** | Selected work rail (left scrolling case study cards) |
| **What we did** | Filtered out in nav only — case study page still exists |
| **Restore** | Remove slug from `NAV_SHOWCASE_EXCLUDED_SLUGS` in `src/components/FullscreenNav.jsx` |
| **Data still at** | `/case-studies/how-we-measure-ai-marketing-roi` |

---

## 3. About — “View Capability >” on SYS.MOD grid cards

| | |
|---|---|
| **Page** | About (`/about`) |
| **Section** | Why Choose Us capability grid |
| **What we did** | Removed link/CTA block from each card |
| **Re-evaluate** | Whether cards should link to `/services`, `/ai`, or capability anchors |
| **Restore** | Re-add CTA in `src/components/sections/WhyChooseUs.jsx` (check git history) |

---

## 4. Contact — long form + “Estimated Flux” field

| | |
|---|---|
| **Page** | Contact (`/contact`) |
| **Section** | Main contact form |
| **What we did** | Replaced with shorter **Start a growth consult** form (3 fields + send); orb “Growth consult” → `/contact#contact-form` |
| **Re-evaluate** | Whether pain-point checkboxes (10 challenges) should return alongside or instead of short form |
| **Related files** | `Contact.jsx`, `GrowthConsultForm.jsx`, `PopArtContactOrb.jsx`, `content.js` |

---

## 5. AI — separate sub-pages (`/ai/:slug`)

| | |
|---|---|
| **Page** | AI hub + 5 playbook URLs |
| **Section** | Marketing doc layout per playbook |
| **What we did** | Unified all playbook content on `/ai`; legacy URLs redirect to `#ai-{slug}` anchors |
| **Re-evaluate** | SEO/indexing of individual playbook URLs; sticky jump nav on hub |
| **Restore sub-pages** | Route `/ai/:slug` back to `DynamicSitePage` in `AnimatedRoutes.jsx`; remove or keep redirect |
| **Current hub** | `src/pages/AiPage.jsx`, `src/components/ai/AiHubView.jsx`, `src/lib/aiHubContent.js` |

---

## 6. Blog index — “Free audit” + duplicate “Read article” link

| | |
|---|---|
| **Page** | Blog (`/blog`) |
| **Section** | Article cards (`BlogImpactCard`) |
| **What we did** | Removed underlined **Read article** text link; replaced **Free audit** pill with single **READ ARTICLE** gradient button (links to article) |
| **Re-evaluate** | Whether blog cards should also promote free audit (secondary CTA) |
| **Restore** | `src/components/blog/BlogImpactCard.jsx` — add second link or swap button target to `/free-practice-audit` |

---

## 7. Services — “Learn More” on tier cards

| | |
|---|---|
| **Page** | Services (`/services`) |
| **Section** | **How Our Services Help You** (`ServiceTiers.jsx`) |
| **What we did** | Removed footer **Learn More →** button + divider on Essentials / Growth / Dominate cards |
| **Re-evaluate** | Destination if restored (`/plans`, `/contact`, tier detail pages) |
| **Restore** | Re-add footer block in `src/components/sections/ServiceTiers.jsx` (check git history) |

---

## 8. Home masonry — large left tile click (laptop only)

| | |
|---|---|
| **Page** | Homepage Work masonry |
| **Section** | Large left tile (AIPSTL) at 1024px+ |
| **What we did** | Preview-only on laptop — no link until design ready |
| **Restore** | `HomeWorkMasonryGrid.jsx` — remove `laptop-static` / use `Link` at all breakpoints |
| **CSS** | `.home-work-masonry__tile--laptop-static` in `index.css` |

---

## Not removed (still elsewhere)

- **Case study cards** on `/case-studies` still use **Free audit** + **Read case study** (`CaseStudyImpactCard.jsx`)
- **Services grid** (`Services.jsx`) may still have its own **Learn More** links — different from tier section above
- **Blog images** switched from Unsplash → local assets (not a removal; re-evaluate if stock photos preferred)

---

## Quick restore checklist

| Item | One-line restore |
|------|------------------|
| Process section | `HOME_PROCESS_SECTION_ENABLED = true` |
| Nav ROI card | Remove from `NAV_SHOWCASE_EXCLUDED_SLUGS` |
| AI sub-pages | Restore `DynamicSitePage` route for `/ai/:slug` |
| Blog Free audit CTA | Edit `BlogImpactCard.jsx` |
| Services Learn More | Edit `ServiceTiers.jsx` |
| Masonry laptop link | Remove laptop-static tile behavior |

---

*Last updated: 2026-06-17 — append here when more UI is temporarily removed.*

---

## 9. Legal pages — old marketing doc layout

| | |
|---|---|
| **Pages** | `/privacy-policy`, `/terms` |
| **What we did** | Replaced `MarketingDocLayout` with home-deck `LegalDocView` (starfield, mesh backdrop, glass panels) |
| **Restore old layout** | Route back to `DynamicSitePage` in `AnimatedRoutes.jsx` |
| **New files** | `LegalPage.jsx`, `components/legal/LegalDocView.jsx` |
