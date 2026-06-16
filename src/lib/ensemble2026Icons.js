/**
 * Ensemble 2026 icons.
 * - Service / capability cards → `icons/contextual/` (Jun 14 neon set).
 * - Homepage accents & PopArt overlays → `icons/blend/` (Jun 15 background-matched set).
 */

import { ensembleAsset } from './ensemble2026Assets'

const CONTEXTUAL_VERSION = '20260614b'
const BLEND_VERSION = '20260615'

/** @param {string} slug Filename without extension */
export function contextualIconPath(slug) {
  return `${ensembleAsset(`icons/contextual/${slug}.png`)}?v=${CONTEXTUAL_VERSION}`
}

/** @param {string} slug Filename without extension */
export function blendIconPath(slug) {
  return `${ensembleAsset(`icons/blend/${slug}.png`)}?v=${BLEND_VERSION}`
}

/** @typedef {{ slug: string, src: string, alt: string, fit?: 'contain' | 'cover', variant?: 'contextual' | 'blend' }} ContextualIcon */

/** @param {string} slug @param {string} alt @param {'contain' | 'cover'} [fit] */
function contextualEntry(slug, alt, fit = 'cover') {
  return { slug, src: contextualIconPath(slug), alt, fit, variant: 'contextual' }
}

/** @param {string} slug @param {string} alt @param {'contain' | 'cover'} [fit] */
function blendEntry(slug, alt, fit = 'cover') {
  return { slug, src: blendIconPath(slug), alt, fit, variant: 'blend' }
}

/** Capability / service vertical tiles — keep Jun 14 contextual icons. */
/** @type {Record<string, ContextualIcon>} */
export const ENSEMBLE_CONTEXTUAL_ICONS = {
  'ai-laptop-care': contextualEntry(
    'ai-laptop-care',
    'Clinician using an AI-powered laptop for digital care',
  ),
  'hipaa-secure-cloud': contextualEntry(
    'hipaa-secure-cloud',
    'HIPAA-secure healthcare cloud infrastructure',
  ),
  'responsive-web': contextualEntry(
    'responsive-web',
    'Responsive healthcare website on desktop and mobile',
  ),
  'medical-marketing': contextualEntry(
    'medical-marketing',
    'Healthcare marketing and patient outreach',
  ),
  'creative-video': contextualEntry('creative-video', 'Creative video and content production'),
  'ai-marketing-growth': contextualEntry(
    'ai-marketing-growth',
    'AI-powered marketing and growth analytics dashboard',
  ),
  'ai-analytics-dashboard': contextualEntry(
    'ai-analytics-dashboard',
    'AI analytics dashboard with performance metrics',
  ),
}

/** Homepage section accents & PopArt — Jun 15 icons with matched dark backgrounds. */
/** @type {Record<string, ContextualIcon>} */
export const ENSEMBLE_BLEND_ICONS = {
  'clinical-team': blendEntry(
    'clinical-team',
    'Connected clinical care team and digital health services',
  ),
  'practice-growth': blendEntry(
    'practice-growth',
    'Physician with practice growth chart and upward trend',
  ),
  'telehealth-heartbeat': blendEntry(
    'telehealth-heartbeat',
    'Telehealth messaging with patient vitals monitoring',
  ),
  'healthcare-ecosystem': blendEntry(
    'healthcare-ecosystem',
    'Integrated healthcare digital ecosystem network',
  ),
  'workflow-automation': blendEntry('workflow-automation', 'Clinical workflow automation cycle'),
  'appointment-calendar': blendEntry(
    'appointment-calendar',
    'Medical appointment calendar with confirmed booking',
  ),
  'seo-growth-analytics': blendEntry(
    'seo-growth-analytics',
    'SEO and growth analytics with magnified performance chart',
  ),
  'patient-privacy': blendEntry('patient-privacy', 'Patient data privacy and secure access'),
  'patient-reviews': blendEntry(
    'patient-reviews',
    'Patient reviews and five-star satisfaction ratings',
  ),
  'digital-health-network': blendEntry(
    'digital-health-network',
    'Connected digital health care network',
  ),
  'healthcare-partnership': blendEntry(
    'healthcare-partnership',
    'Trusted healthcare partnership and patient acquisition growth',
  ),
  'telehealth-nurse': blendEntry(
    'telehealth-nurse',
    'Telehealth nurse with medical consultation badge',
  ),
}

/** @param {string} slug @returns {ContextualIcon | undefined} */
export function getContextualIcon(slug) {
  return ENSEMBLE_BLEND_ICONS[slug] ?? ENSEMBLE_CONTEXTUAL_ICONS[slug]
}

/** PopArt overlay config for home brand section */
export const HOME_BRAND_CONTEXTUAL_OVERLAYS = {
  top: ENSEMBLE_BLEND_ICONS['clinical-team'],
  bottom: ENSEMBLE_BLEND_ICONS['practice-growth'],
}

/** PopArt overlay config for home expertise section */
export const HOME_EXPERTISE_CONTEXTUAL_OVERLAYS = {
  top: ENSEMBLE_BLEND_ICONS['telehealth-heartbeat'],
  bottom: ENSEMBLE_BLEND_ICONS['healthcare-ecosystem'],
}

/** PopArt main visual — single icon (full growth stack under one roof) */
export const HOME_EXPERTISE_MAIN_VISUAL = ENSEMBLE_BLEND_ICONS['healthcare-ecosystem']

/** Capability / service vertical — unique icon per offering (contextual set only). */
const CAPABILITY_ICON_BY_TITLE = {
  'Software & Product': 'ai-laptop-care',
  'IT Infrastructure': 'hipaa-secure-cloud',
  'Websites & Local SEO': 'responsive-web',
  'Performance Marketing': 'medical-marketing',
  'Creative Production': 'creative-video',
  'Governed AI': 'ai-marketing-growth',
  'Analytics & reporting': 'ai-analytics-dashboard',
}

/** 90-day process phases — one icon per step */
export const HOME_PROCESS_CONTEXTUAL_ICONS = [
  ENSEMBLE_BLEND_ICONS['workflow-automation'],
  ENSEMBLE_BLEND_ICONS['appointment-calendar'],
  ENSEMBLE_BLEND_ICONS['seo-growth-analytics'],
]

/** Section accent icons — each unique on the homepage */
export const HOME_SECTION_ACCENT_ICONS = {
  proof: ENSEMBLE_BLEND_ICONS['patient-privacy'],
  testimonials: ENSEMBLE_BLEND_ICONS['patient-reviews'],
  passion: ENSEMBLE_BLEND_ICONS['digital-health-network'],
  work: ENSEMBLE_BLEND_ICONS['healthcare-partnership'],
  cta: ENSEMBLE_BLEND_ICONS['telehealth-nurse'],
}

/** @param {string} title Capability or service title */
export function contextualIconForServiceTitle(title) {
  const slug = CAPABILITY_ICON_BY_TITLE[title]
  return slug ? ENSEMBLE_CONTEXTUAL_ICONS[slug] : undefined
}
