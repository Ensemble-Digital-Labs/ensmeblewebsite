/**
 * Homepage copy, Ensemble Digital Labs (layout inspired by agency reference sites).
 * Routes and CTAs point to Ensemble pages.
 */

import {
  aboutPageContent,
  contactInfo,
  ctaContent,
  heroContent,
  homeRoadmapContent,
  homeSelectedWorkContent,
  parallaxShowcaseContent,
  servicesPreview,
  testimonialsPreview,
} from './content'
import { HOME_WHY_ENSEMBLE } from './homePageCopy'
import { ENSEMBLE_HERO_LINES } from './ensembleHeroLines'

export const HOME_INFLUX_HERO = {
  lines: ENSEMBLE_HERO_LINES,
  primaryCta: heroContent.primaryCTA,
  secondaryCta: heroContent.secondaryCTA,
}

export const HOME_INFLUX_BRAND = {
  term: 'Ensemble',
  definition: 'One accountable partner for your full growth stack.',
  body:
    'A healthcare-focused product company delivering AI-powered marketing, software, IT infrastructure, and creative production for clinical practices. HIPAA-compliant and revenue-obsessed. Physicians and practice leaders work with one accountable team for fewer handoffs, clearer ownership, and outcomes tied to patients and revenue.',
}

export const HOME_INFLUX_EXPERTISE = {
  lines: ['Healthcare growth', 'Under one roof', 'not five vendors'],
  accentIndex: 1,
  lead:
    'From physician-grade websites and local SEO to performance marketing, product, and IT, one team owns the stack your practice runs on.',
}

export { HOME_EXPERTISE_CARDS, HOME_INFLUX_TESTIMONIALS } from './homeImagery'

export const HOME_INFLUX_TESTIMONIALS_INTRO = {
  eyebrow: 'Client outcomes',
  lines: ['Partnerships built on', 'trust', 'and measurable growth'],
  accentIndex: 1,
  lead:
    'Practice leaders choose Ensemble when they need a partner who understands clinical credibility, HIPAA-aware delivery, and revenue, not vanity metrics.',
}

export const HOME_INFLUX_PARTNER = {
  title: 'We help practices grow with outcomes you can measure',
}

/** Sentence-case labels for DNA-style proof stats (source labels stay uppercase in heroContent). */
export const HOME_PROOF_STATS = heroContent.stats.map((stat) => ({
  ...stat,
  displayLabel: stat.label
    .toLowerCase()
    .replace(/\s*\/\s*/g, ' per ')
    .replace(/^./, (c) => c.toUpperCase()),
  scriptLabel: true,
}))

export const HOME_INFLUX_PASSION = {
  eyebrow: 'Our mission',
  lines: ['Our mission'],
  body: aboutPageContent.mission.description,
}

export const HOME_INFLUX_WORK = {
  eyebrow: homeSelectedWorkContent.sectionLabel,
  title: homeSelectedWorkContent.sectionLabel,
  scrollHint: 'View case study',
}

export const HOME_INFLUX_CAPABILITIES_SECTION = {
  title: 'Our Services',
}

export const HOME_INFLUX_PROCESS = homeRoadmapContent.phases.map((phase, i) => ({
  step: String(i + 1).padStart(2, '0'),
  title: phase.title.split('·')[0]?.trim() ?? phase.title,
  line: phase.items.slice(0, 2).join(' · '),
}))

export const HOME_INFLUX_CAPABILITIES = [
  ...servicesPreview.map((svc) => ({
    title: svc.title,
    line: svc.description,
    icon: 'icon-website.svg',
    to:
      svc.title === 'Software & Product'
        ? '/services/software-product'
        : svc.title === 'IT Infrastructure'
          ? '/services/it-infrastructure'
          : svc.title === 'Websites & Local SEO'
            ? '/services/websites-local-seo'
            : svc.title === 'Performance Marketing'
              ? '/services/performance-marketing'
              : '/services/creative-production',
  })),
  {
    title: 'Governed AI',
    line: 'Automation and intelligence with guardrails your practice can trust, HIPAA-aware workflows, not risky experiments.',
    icon: 'icon-website.svg',
    to: '/ai',
  },
  {
    title: 'Analytics & reporting',
    line: 'Clear reporting on booked visits, pipeline contribution, and campaign performance, so leadership sees one coherent growth story.',
    icon: 'icon-website.svg',
    to: '/services',
  },
]

export const HOME_INFLUX_WIN = {
  eyebrow: parallaxShowcaseContent.eyebrow,
  title: `${parallaxShowcaseContent.headlineLine1} ${parallaxShowcaseContent.headlineLine2}`,
  body: parallaxShowcaseContent.lead,
}

/** PopArt-style stack tags, healthcare growth capabilities band. */
export const HOME_CAPABILITY_TAGS = [
  'HIPAA-aware workflows',
  'Local SEO',
  'Performance marketing',
  'Custom software',
  'Clinical IT',
  'Websites & conversion',
  'Governed AI',
  'Analytics & reporting',
  'Creative production',
  'Patient acquisition',
]

export const HOME_INFLUX_CTA = {
  eyebrow: 'Free practice audit',
  title: ctaContent.headline,
  body: ctaContent.subhead,
  lead: 'In 30 minutes, see where patients are slipping away, and what a 90-day growth plan looks like for your specialty.',
  includes: [
    'Local visibility & Google Business Profile health',
    'Reputation scan across review platforms',
    'Competitor and market gap analysis',
    'ROI forecast & two-week campaign roadmap',
  ],
  phone: contactInfo.phone,
}

export { HOME_WHY_ENSEMBLE }
