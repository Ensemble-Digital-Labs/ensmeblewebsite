import { dashboardAssets } from './dashboardAssets.js'

const HERO_OUTCOMES = '/assets/images/hero-outcomes'
const HOME_PROBLEM = '/assets/images/home-problem'

/** One unique, topic-relevant cover per blog card — no duplicates. */
export const blogArticleImagesBySlug = {
  'ai-patient-acquisition-healthcare-2026': `${HERO_OUTCOMES}/ai-first-strategy.png`,
  'hipaa-safe-ai-marketing-guide-2026': `${HERO_OUTCOMES}/hipaa-safe-by-design.png`,
  'double-new-patient-flow-90-days': `${HERO_OUTCOMES}/revenue-obsessed.png`,
  'google-business-profile-medical-practice-guide': dashboardAssets.localSeoMap,
  'local-seo-doctors-complete-guide-2026': dashboardAssets.medicalAnalytics,
  'ai-chatbots-medical-practices-guide': dashboardAssets.patientProfile,
  'squarespace-vs-custom-website-medical-practice': `${HOME_PROBLEM}/website-friction.png`,
  'online-reviews-revenue-medical-practice': `${HOME_PROBLEM}/reputation-risk.png`,
  'eeat-healthcare-websites-seo-guide': dashboardAssets.growthAnalytics,
  'ai-ppc-medical-practices-hipaa-safe': `${HOME_PROBLEM}/wasted-ad-spend.png`,
  '5-signs-healthcare-website-costing-patients': `${HOME_PROBLEM}/invisible-online.png`,
}

/** @param {string} slug */
export function getBlogArticleImage(slug) {
  return blogArticleImagesBySlug[slug] ?? `${HERO_OUTCOMES}/ai-first-strategy.png`
}
