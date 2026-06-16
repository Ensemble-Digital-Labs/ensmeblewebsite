import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const portfolioPages = [
  page(
    '/portfolio',
    'Our work',
    'Portfolio overview',
    'AI-enhanced healthcare websites and digital products built by Ensemble Digital Labs, selected launches and growth programs.',
    [
      {
        body: 'Explore project cards below. Many portfolio entries align with published case studies for deeper metrics and methodology.',
      },
    ]
  ),
  page(
    '/portfolio/stl-ioir-clinics',
    'Portfolio',
    'STL IOIR Clinics',
    'Interventional oncology and radiology, custom website plus AI local SEO for a competitive St. Louis footprint.',
    [{ body: 'See the case study for positioning, technical SEO, and performance outcomes.' }]
  ),
  page(
    '/portfolio/arc-wellness',
    'Portfolio',
    'Arc Wellness',
    'Medical aesthetics, Next.js custom build with AI SEO architecture and premium patient journeys.',
    [{ body: 'Pairs with the Arc Wellness case narrative on speed, booking, and competitive differentiation.' }]
  ),
  page(
    '/portfolio/smart-pain-solutions',
    'Portfolio',
    'Smart Pain Solutions',
    'Pain management, AI performance marketing and web upgrades supporting 100+ patients per month peaks.',
    [{ body: 'Deep-dive funnels, creative testing, and compliance-aware tracking in the matching case study.' }]
  ),
  page(
    '/portfolio/mhw-surgery',
    'Portfolio',
    'MHW Surgery',
    'Surgical practice, brand identity, custom website, and HIPAA-conscious lead capture.',
    [{ body: 'Brand-to-web cohesion and acquisition reporting in the case file.' }]
  ),
  page(
    '/portfolio/aipstl',
    'Portfolio',
    'AIPSTL',
    'Healthcare organization, AI-optimized member acquisition and digital engagement strategy.',
    [{ body: 'Conversion-focused landing architecture and outreach alignment.' }]
  ),
  page(
    '/portfolio/cb-surgery',
    'Portfolio',
    'CB Surgery',
    'Bariatric surgery, AI brand launch and performance marketing with rapid patient traction.',
    [{ body: 'Launch sequencing, creative, and paid strategy summarized in the case study.' }]
  ),
]
