import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const servicesPages = [
  page(
    '/services/software-product',
    'Vertical 01',
    'Software & product',
    'HIPAA-compliant healthcare web apps, AI-assisted patient portals, EHR integrations, and mobile health experiences, one product-minded team.',
    [
      {
        body: 'We ship secure, measurable software: authentication, audit trails, accessibility, and performance budgets that hold up under real patient traffic.',
      },
    ],
    { tags: ['Services'] }
  ),
  page(
    '/services/software-product/healthcare-web-applications',
    'Software & product',
    'Healthcare web applications',
    'Custom HIPAA-compliant clinical web apps built on AI-ready architecture, designed for conversion and clinical credibility.',
    [
      {
        body: 'From intake to post-visit education, we architect flows that clinicians approve and patients actually finish.',
      },
    ]
  ),
  page(
    '/services/software-product/mobile-health-apps',
    'Software & product',
    'Mobile health apps',
    'iOS and Android apps for medical practices with AI-assisted features where they improve safety and speed, not gimmicks.',
    [
      {
        body: 'Mobile surfaces are tuned for thumb reach, offline resilience where needed, and integration with your existing stack.',
      },
    ]
  ),
  page(
    '/services/it-infrastructure',
    'Vertical 02',
    'IT infrastructure',
    'AI-ready clinical IT design, HIPAA-conscious hosting, secure data environments, and facility setup that keeps care online.',
    [
      {
        body: 'We align network, identity, backups, and monitoring with how your practice actually operates, including vendor coordination.',
      },
    ],
    { tags: ['Services'] }
  ),
  page(
    '/services/websites-local-seo',
    'Vertical 03',
    'Websites & local SEO',
    'Physician-grade websites, AI-assisted SEO strategy, Google Business Profile excellence, and Core Web Vitals discipline.',
    [
      {
        body: 'Search is treated as a clinical front door: structured data, E-E-A-T, and local relevance engineered for your procedures and geography.',
      },
    ],
    { tags: ['Services'] }
  ),
  page(
    '/services/websites-local-seo/medical-website-design',
    'Websites & SEO',
    'Medical website design',
    'ADA-conscious, HIPAA-secure, AI-content-ready physician websites with premium composition and restrained motion.',
    [
      {
        body: 'Design systems stay consistent with your brand while keeping readability and trust signals first on every breakpoint.',
      },
    ]
  ),
  page(
    '/services/websites-local-seo/healthcare-local-seo',
    'Websites & SEO',
    'Healthcare local SEO',
    'GBP optimization, medical schema, AI keyword strategy, and local pack competitiveness for high-intent care queries.',
    [
      {
        body: 'We connect citations, reviews, on-page entities, and landing experiences so maps and organic reinforce each other.',
      },
    ]
  ),
  page(
    '/services/performance-marketing',
    'Vertical 04',
    'Performance marketing',
    'AI-targeted PPC, predictive audience modeling, automated HIPAA monitoring, and patient nurture automation, revenue-obsessed.',
    [
      {
        body: 'Campaigns are instrumented end-to-end: from first click to booked consult, with creative and landing tests that respect compliance.',
      },
    ],
    { tags: ['Services', 'AI', 'KEY PAGE'] }
  ),
  page(
    '/services/performance-marketing/hipaa-compliant-ppc',
    'Performance marketing',
    'HIPAA-compliant PPC',
    'AI-targeted Google Ads and Meta Ads with real-time HIPAA compliance monitoring, built for medical offers and sensitive categories.',
    [
      {
        body: 'We pair policy-aware tracking with conservative defaults, documented approvals, and rapid shutdown paths when platforms change rules.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/services/performance-marketing/reputation-management',
    'Performance marketing',
    'Reputation management',
    'Automated review generation, AI sentiment analysis, and multi-platform monitoring that protects stars and revenue.',
    [
      {
        body: 'Programs emphasize ethical requests, staff-friendly workflows, and escalation when sentiment shifts.',
      },
    ]
  ),
  page(
    '/services/creative-production',
    'Vertical 05',
    'Creative production',
    'AI-assisted content strategy, physician video, clinical photography, and social management that elevates trust.',
    [
      {
        body: 'Creative is treated as performance infrastructure: briefs tied to procedures, proof points, and distribution channels that actually reach patients.',
      },
    ],
    { tags: ['Services'] }
  ),
]
