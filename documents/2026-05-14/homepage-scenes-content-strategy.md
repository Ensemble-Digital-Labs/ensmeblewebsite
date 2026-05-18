# Homepage content strategy — scenes, not sections

**Date:** 2026-05-14  
**Intent:** Suggested copy and **layout choreography** for the new `/` homepage, aligned with “controlled asymmetry” and premium healthcare growth positioning (Influx/Cardinal *patterns only* — not voice or asset clones).

**Current code:** `Home.jsx` uses five scroll bands: `intro`, `capabilities`, `proof`, `work`, `cta`. Below, **Scene A–E** map 1:1 to those bands. **Scene +** entries are optional splits if you later expand bands or add sub-scenes inside one viewport.

---

## Principles (for writers + builders)

| Avoid | Aim for |
|--------|---------|
| Perfect centered stacks | Broken grid, vertical offsets, varied card widths |
| “Section / heading / paragraph” only | **Scene**: foreground card + background bleed + one focal accent |
| Identical card heights | Intentional rhythm (tall / short / wide) |
| Hard horizontal “cuts” between blocks | Atmosphere and gradients **continue**; cards **float** over them |

**Ensemble voice:** Confident, practice-safe, growth- and revenue-clear; AI and tech as **healthcare growth engine**, not infrastructure theater.

---

## Scene A — `intro` (Introduction)

**Visual choreography:** Hero is **center-weighted** but not symmetrical: primary headline slightly **above optical center**; one **floating proof strip** or stat cluster **offset low-right**; optional soft **diagonal** edge or large type partially off-canvas (cropped) so the frame feels *designed*, not boxed.

**Eyebrow**  
Growth & compliance, built for medicine

**Headline**  
The growth partner your practice actually has time for.

**Supporting line**  
Ensemble Digital Labs helps independent and mid-size medical groups **turn marketing into predictable patient demand**—with creative that converts, systems that scale, and HIPAA-aware execution you can defend in the room.

**Primary CTA**  
Book a growth consult  

**Secondary CTA**  
See how we work  

**Micro-proof (floating chips, staggered)**  
- HIPAA-conscious workflows by design  
- Revenue clarity, not vanity metrics  
- One accountable team—not six vendors  

---

## Scene B — `capabilities` (Capabilities)

**Visual choreography:** **Heavy left**: photography or abstract clinical/growth art **bleeds** past the grid. **Heavy right**: a **large floating glass card** overlaps the image (Influx-style “white zone over photo”). Inside the card: **dot-grid texture** at low opacity, not flat white. Below or beside: **three smaller cards** staggered vertically (top-left high, middle-right lower, bottom-left)—**not** equal row heights.

**Scene title (on card, not centered on page)**  
Healthcare growth capability ecosystem

**Subhead**  
Everything you need to **earn attention**, **convert consults**, and **measure what matters**—without the stack of disconnected freelancers.

**Card 1 — Strategy & story**  
Positioning, offers, and campaigns that sound like your clinicians—not generic “med spa SEO.”

**Card 2 — Acquisition systems**  
Paid search, local presence, and landing experiences tuned for **high-intent** patients in your market.

**Card 3 — Trust & conversion**  
Reviews, social proof, and on-site journeys that reduce friction from **first click** to **first appointment**.

**Card 4 — Intelligence & reporting**  
Clear reporting on cost per lead, cost per booked consult, and revenue signals your leadership can use.

**Footer of scene (small, left-aligned)**  
Prefer a single accountable partner? **That’s the model we’re built for.**

---

## Scene C — `proof` (Proof)

**Visual choreography:** Shift to **immersive dark atmosphere** (your scroll-driven canvas already supports mood change). **Three testimonial cards** in a row but **not** identical: middle card **slightly lower**; avatars **overlap** the top edge of cards (circle breaking the rectangle). Subtle **carousel** or “more stories” affordance at bottom center—arrows quiet, premium, not gamer UI.

**Eyebrow**  
Outcomes, not adjectives

**Headline**  
Practices grow when the story and the system match.

**Testimonial placeholders (replace with real names/locations when cleared)**  

1. **Quote**  
   “We stopped guessing which campaigns drove consults. Ensemble tied spend to **booked appointments**—finally something we could take to our board.”  
   **Attribution** — Practice Administrator, multi-location specialty group  

2. **Quote**  
   “Creative felt **clinical and credible**. Compliance questions were answered before we had to ask.”  
   **Attribution** — Medical Director, independent surgical practice  

3. **Quote**  
   “One team for site, ads, and reporting. Our front desk noticed the difference in **call quality** within weeks.”  
   **Attribution** — Owner, outpatient clinic  

**Metrics strip (staggered numerals or offset pills, not one flat bar)**  
- ↑ Consult requests from digital (range you can defend)  
- ↓ Cost per qualified lead  
- → Time-to-launch on major initiatives  

---

## Scene D — `work` (Selected work)

**Visual choreography:** **Broken grid** case study tiles: one **large** tile (2× visual weight), two **medium** stacked with vertical offset, one **wide shallow** tile—rhythm **L → R → L** so the eye travels diagonally. Optional **thin connector line** or shared gradient corner so tiles read as one **ecosystem**, not four isolated boxes.

**Eyebrow**  
Selected work

**Headline**  
Campaigns and platforms built for **real clinical brands**.

**Case teases (titles only—pair with real case routes)**  
- **Rebuilding trust after a repositioning** — Specialty care, new brand, same surgeons.  
- **From invisible to fully booked** — High-competition metro, search + landing redesign.  
- **Compliance-first relaunch** — Forms, tracking, and content reviewed for **practice-safe** rollout.  

**CTA**  
Explore case studies  

---

## Scene E — `cta` (Contact / handoff to footer)

**Visual choreography:** **Center immersive** but not static: single **strong headline** aligned slightly **left of center** with a **CTA cluster** offset right, or vice versa on the next refresh—**alternating composition** vs Scene B. Let the **cinematic footer** feel like continuation of the same atmosphere (no hard “new section” bar).

**Eyebrow**  
Next step

**Headline**  
Ready to grow your practice?

**Supporting line**  
Tell us where you are today—volume, markets, compliance constraints—and we’ll map a **realistic growth sequence**, not a generic audit PDF.

**Primary CTA**  
Start a conversation  

**Secondary**  
Download positioning overview *(only if you have a real asset)*  

---

## Optional “+” scenes (if you split bands later)

| Scene | Role | Layout note |
|--------|------|----------------|
| **B2 — Tension** | “Why practices stall” | Problem cards **diagonal stagger**; no full-width divider—**bleed** into Scene B. |
| **C2 — Verticals** | Who you serve | Pills or tabs **floating above** a partial-bleed image; active vertical loads **one overlapping detail card**. |
| **D2 — Process** | How engagement works | **Four numbered steps**, vertical zig-zag (Influx-style 1–4), light background + **dot grid**. |

---

## Implementation reminders

- **Motion:** Stagger can be **mostly layout** (CSS grid + transforms); reserve GSAP for scroll-linked **parallax** or subtle reveals—avoid competing timelines.  
- **Reduced motion:** Asymmetry must remain **static** (offsets still ok); use `motion-reduce:` to zero transforms where motion-sensitive. **Live on `/`:** `HomePageSections.jsx` uses `motion-reduce:*` on stagger utilities.  
- **Accessibility:** Asymmetry must not scramble reading order; use logical DOM order, visual offset via CSS.  
- **Brand:** Warm orange / gold for primary conversion; teal for “digital clarity”; **no** dense HUD or cyber chrome.

---

## Next steps

1. Replace placeholder `<section>` shells in `Home.jsx` with scene components that encode **offset grids** and **overlap**.  
2. Swap testimonial and case placeholders for approved client copy.  
3. Align atmosphere keyframes in `homeAtmosphereScenes.js` so Scene C (proof) lands on the **richest dark** blend if you want maximum card pop.
