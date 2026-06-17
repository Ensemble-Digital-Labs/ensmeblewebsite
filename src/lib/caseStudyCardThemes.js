/** Per-card accent + panel gradient for the case studies gallery carousel. */

const DEFAULT_CARD_THEME = {
  accent: '#46cdff',
  bgFrom: 'rgba(8, 16, 36, 0.78)',
  bgTo: 'rgba(4, 8, 22, 0.92)',
}

/** @type {Record<string, { accent: string, bgFrom: string, bgTo: string }>} */
export const CASE_STUDY_CARD_THEMES = {
  'stl-ioir-clinics-interventional-oncology': {
    accent: '#2eb8e8',
    bgFrom: 'rgba(6, 38, 58, 0.82)',
    bgTo: 'rgba(3, 14, 28, 0.94)',
  },
  'arc-wellness-medical-aesthetics-website': {
    accent: '#d4b06a',
    bgFrom: 'rgba(38, 22, 48, 0.84)',
    bgTo: 'rgba(16, 10, 24, 0.94)',
  },
  'smart-pain-solutions-100-patients-month': {
    accent: '#5b8def',
    bgFrom: 'rgba(14, 28, 58, 0.82)',
    bgTo: 'rgba(6, 12, 32, 0.94)',
  },
  'mhw-surgery-digital-brand-identity': {
    accent: '#6a9fd4',
    bgFrom: 'rgba(12, 32, 52, 0.82)',
    bgTo: 'rgba(5, 14, 28, 0.94)',
  },
  'aipstl-member-acquisition-strategy': {
    accent: '#34d399',
    bgFrom: 'rgba(8, 42, 36, 0.82)',
    bgTo: 'rgba(4, 18, 16, 0.94)',
  },
  'spine-care-45-new-patients-monthly': {
    accent: '#2dd4bf',
    bgFrom: 'rgba(6, 40, 44, 0.82)',
    bgTo: 'rgba(3, 16, 20, 0.94)',
  },
  'cb-surgery-bariatric-brand-launch': {
    accent: '#fb923c',
    bgFrom: 'rgba(52, 28, 12, 0.82)',
    bgTo: 'rgba(24, 12, 6, 0.94)',
  },
  'agafay-weight-loss-social-media-ai': {
    accent: '#4ade80',
    bgFrom: 'rgba(10, 44, 28, 0.82)',
    bgTo: 'rgba(4, 18, 12, 0.94)',
  },
}

export function getCaseStudyCardTheme(slug) {
  return CASE_STUDY_CARD_THEMES[slug] ?? DEFAULT_CARD_THEME
}
