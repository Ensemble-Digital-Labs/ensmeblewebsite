/**
 * Full-bleed / section background imagery — `public/assets/images/backgrounds/`.
 * Direction: premium healthcare growth (navy / teal / warm accents), not cyber HUD overload.
 * Composition: detail weighted right; pair with left vignettes in `Hero.jsx` for legible copy.
 */
const base = '/assets/images/backgrounds'

export const backgroundAssets = {
  /** Optional: clinical dashboards — use sparingly; reads very “product UI” */
  medicalDataHud: `${base}/medical-data-hud-hero-bg.png`,
  /** Connected-care / growth ecosystem imagery — preferred default mood */
  digitalHealthNetwork: `${base}/digital-health-network-hero-bg.png`,
  /** Softer abstract tech — alternative when you want less network density */
  techPlexus: `${base}/tech-plexus-hero-bg.png`,
}
