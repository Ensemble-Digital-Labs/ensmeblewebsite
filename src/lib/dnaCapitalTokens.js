/** Design tokens from extraction tool — output/www.dnacapital.com (2026-06-12) */

import { ENSEMBLE_HERO_LINES } from './ensembleHeroLines'

export const DNA_CAPITAL_TOKENS = {
  colors: {
    canvas: '#070708',
    ink: '#ffffff',
    muted: '#c0c9df',
    link: '#ffffff',
    particle1: '#612574',
    particle2: '#293583',
    particle3: '#1954ec',
    line: 'rgba(255, 255, 255, 0.12)',
  },
  fonts: {
    display: '"Cormorant Garamond", "Instrument Serif", Georgia, serif',
    ui: '"Inter", "Plus Jakarta Sans", system-ui, sans-serif',
  },
  type: {
    hero: { size: '54px', lineHeight: '72px', weight: 300 },
    statValue: { size: '59px', lineHeight: '53px', weight: 300 },
    sectionTitle: { size: '45px', lineHeight: '51px', weight: 300 },
    sectionTitleLg: { size: '72px', lineHeight: '81px', weight: 300 },
    body: { size: '18px', lineHeight: '32px', weight: 300 },
    eyebrow: { size: '18px', lineHeight: '18px', weight: 400, letterSpacing: '4.14px' },
    statLabel: { size: '15px', lineHeight: '21px', weight: 200 },
    nav: { size: '14px', lineHeight: '22px', weight: 400, letterSpacing: '0.288px' },
    menuBtn: { size: '11.7px', lineHeight: '16px', weight: 300 },
    scrollHint: { size: '12px', lineHeight: '16px', weight: 300, letterSpacing: '0.2em' },
  },
  layout: {
    contentInset: 'clamp(1.5rem, 8vw, 7.5rem)',
    sectionPadY: 'clamp(5rem, 14vh, 9rem)',
  },
}

export const DNA_CAPITAL_HERO_LINES = [
  'We empower exceptional',
  'teams and companies in',
  'healthcare and healthtech',
]

/** `/experiments` ensemble theme — same lockup as homepage hero */
export const ENSEMBLE_DNA_HERO_LINES = ENSEMBLE_HERO_LINES
