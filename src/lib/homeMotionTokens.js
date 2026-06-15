/**
 * Shared homepage motion — matches hero entrance (`useHomeHeroEntrance` + `home-hero-line-in`).
 * Headline: 1.15s · standard reveal: 0.78s · stagger: 0.14s / 0.2s · ease: power3.out
 */
export const HOME_MOTION_EASE = 'power3.out'
export const HOME_MOTION_EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const HOME_MOTION = {
  ease: HOME_MOTION_EASE,
  easeCss: HOME_MOTION_EASE_CSS,
  /** Hero headline slide (`home-hero-line-in`) */
  headlineDuration: 1.15,
  /** Hero CTAs + standard scroll reveals */
  revealDuration: 0.78,
  /** Scroll hint, light secondary */
  shortDuration: 0.62,
  /** Hero CTA stagger */
  stagger: 0.14,
  /** Hero headline line stagger */
  lineStagger: 0.2,
  /** When hero CTAs begin (while headline still moving) */
  ctaStart: 0.92,
  y: 32,
  ySubtle: 10,
  yPercent: 110,
  /** PopArt collage — slower, softer than standard scroll reveals */
  popArtRevealDuration: 1.12,
  popArtStagger: 0.24,
  popArtEase: 'power2.out',
  popArtCtaStart: 1.05,
  popArtRotationDelta: { main: 0.85, card: 2 },
  /** Scroll-scrub smoothing for collage parallax (PopArt-style) */
  popArtScrollScrub: 1.15,
}
