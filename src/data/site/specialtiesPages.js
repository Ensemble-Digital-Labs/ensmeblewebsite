import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const specialtiesPages = [
  page(
    '/specialties',
    'Specialties',
    'Specialties overview',
    'AI-powered marketing for medical specialties — physician-led positioning, HIPAA-compliant execution, and performance reporting.',
    [
      {
        body: 'Choose a specialty playbook below. Each page outlines acquisition angles, compliance considerations, and the Ensemble stack we typically deploy.',
      },
    ]
  ),
  page(
    '/specialties/bariatric-surgery-marketing',
    'Specialty',
    'Bariatric & weight loss surgery',
    'AI patient acquisition for bariatric practices — performance marketing engineered for consult volume and long-term outcomes storytelling.',
    [
      {
        body: 'We emphasize trust, candidacy education, and local dominance so high-intent patients find you before commodity competitors.',
      },
    ],
    { tags: ['KEY PAGE'] }
  ),
  page(
    '/specialties/spine-orthopedics-marketing',
    'Specialty',
    'Spine & orthopedics',
    'AI local SEO and predictive ads for spine and orthopedic practices — built for high-acuity search patterns and competitive metros.',
    [
      {
        body: 'Content and landing architecture reflect procedure mix, insurance realities, and the consult paths patients actually take.',
      },
    ],
    { tags: ['KEY PAGE'] }
  ),
  page(
    '/specialties/pain-management-marketing',
    'Specialty',
    'Pain management',
    'AI performance marketing for pain practices — compliant demand gen that respects category sensitivity and platform policies.',
    [
      {
        body: 'We focus on defensible tracking, conservative creative, and landing clarity that improves lead quality, not just volume.',
      },
    ],
    { tags: ['KEY PAGE'] }
  ),
  page(
    '/specialties/medical-wellness-aesthetics-marketing',
    'Specialty',
    'Medical wellness & aesthetics',
    'AI-driven marketing for physician-led aesthetics, longevity, and functional medicine — premium brand, premium acquisition.',
    [
      {
        body: 'Visual systems and offers are tuned for consult value, cross-sell ethics, and review velocity without medspa clichés.',
      },
    ]
  ),
  page(
    '/specialties/primary-care-marketing',
    'Specialty',
    'Primary care & family medicine',
    'AI patient acquisition and reputation automation for primary care — panels, access, and community trust.',
    [
      {
        body: 'Programs balance continuity, seasonal demand, and local competitors with practical automation your staff can sustain.',
      },
    ]
  ),
  page(
    '/specialties/multi-location-practice-marketing',
    'Specialty',
    'Multi-location group practices',
    'AI-centralized analytics with location-specific campaigns — scalable governance and shared learning across sites.',
    [
      {
        body: 'We align GBP entities, landing templates, and reporting so leadership sees group performance and each clinic improves locally.',
      },
    ]
  ),
  page(
    '/specialties/health-startup-digital-strategy',
    'Specialty',
    'Health startups',
    'Full AI-stack digital launch strategy for clinical startups and new practices — brand, web, acquisition, and instrumentation from day one.',
    [
      {
        body: 'Roadmaps prioritize credible launch narratives, HIPAA-aware capture, and measurable traction for investors and patients alike.',
      },
    ]
  ),
]
