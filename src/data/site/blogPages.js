import { page } from './buildPage.js'
import { getBlogArticleImage } from '../../lib/blogArticleImages.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const blogPages = [
  page(
    '/blog/ai-patient-acquisition-healthcare-2026',
    'Insights · AI',
    'How AI is transforming patient acquisition in 2026',
    'Predictive targeting, AI compliance, chatbots, and nurture automation are changing how practices grow, here is the practical playbook.',
    [
      {
        body: 'Long-form article scaffold: connect each trend to measurable KPIs (CAC, consult rate, show rate) and to HIPAA-safe implementation choices.',
      },
    ],
    { tags: ['BLOG', 'AI'] }
  ),
  page(
    '/blog/hipaa-safe-ai-marketing-guide-2026',
    'Insights · Compliance',
    'HIPAA-safe AI marketing: what is allowed in 2026',
    'Which AI tools are HIPAA-aligned, which create exposure, and how to audit your stack without slowing marketing down.',
    [{ body: 'Article scaffold: include decision trees for vendors, BAAs, logging, and PHI boundaries in ads and analytics.' }],
    { tags: ['BLOG', 'AI'] }
  ),
  page(
    '/blog/double-new-patient-flow-90-days',
    'Insights · Growth',
    'How to double new patient flow in 90 days',
    'Step-by-step AI-powered plan spanning local SEO, PPC, reputation, and chatbot automation, sequenced for momentum.',
    [{ body: 'Article scaffold: weekly milestones, owners, and metrics so practices can execute with accountability.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/google-business-profile-medical-practice-guide',
    'Insights · Local',
    'Why your Google Business Profile is your #1 patient tool',
    'GBP optimization with AI-assisted content strategy to dominate local search and capture 20–40 new inquiries per month where markets allow.',
    [{ body: 'Article scaffold: categories, photos, Q&A governance, review velocity, and landing page pairing.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/local-seo-doctors-complete-guide-2026',
    'Insights · SEO',
    'Local SEO for doctors: a 2026 complete guide',
    'Schema, E-E-A-T, AI keyword strategy, and ethical citation building for medical practices.',
    [{ body: 'Article scaffold: entity modeling, service pages, and measurement with Search Console + CRM.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/ai-chatbots-medical-practices-guide',
    'Insights · AI',
    'AI chatbots for medical practices: the complete guide',
    'How chatbots pre-qualify patients, book appointments, and run 24/7 without creating HIPAA surprises.',
    [{ body: 'Article scaffold: triage scripts, escalation, logging, and vendor evaluation criteria.' }],
    { tags: ['BLOG', 'AI'] }
  ),
  page(
    '/blog/squarespace-vs-custom-website-medical-practice',
    'Insights · Strategy',
    'Squarespace vs custom build: the real cost for medical practices',
    'Platform matrix covering SEO ceilings, HIPAA risk, AI readiness, and conversion control.',
    [{ body: 'Article scaffold: total cost of ownership including integrations and growth ceilings.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/online-reviews-revenue-medical-practice',
    'Insights · Reputation',
    'Online reviews are revenue: the $187K per star explained',
    'Research-backed framing for reputation programs and how AI automation grows ratings without ethical drift.',
    [{ body: 'Article scaffold: operational cadence, staff coaching, and compliant request flows.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/eeat-healthcare-websites-seo-guide',
    'Insights · SEO',
    'What is E-E-A-T and why it matters for healthcare websites',
    'How Google evaluates medical content and how AI-assisted strategy still builds human trust signals.',
    [{ body: 'Article scaffold: author entities, citations, and clinical review workflows.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/ai-ppc-medical-practices-hipaa-safe',
    'Insights · Paid media',
    'PPC for medical practices: a HIPAA-safe AI playbook',
    'Running AI-optimized Google and Meta ads without triggering violations, step by step.',
    [{ body: 'Article scaffold: consent mode, pixels, forms, offline conversions, and documentation.' }],
    { tags: ['BLOG', 'AI'] }
  ),
  page(
    '/blog/5-signs-healthcare-website-costing-patients',
    'Insights · Web',
    '5 signs your healthcare website is costing you patients',
    'Speed, template look, missing booking, weak reviews, and absent HIPAA notices, and how AI-assisted fixes close the gap.',
    [{ body: 'Article scaffold: diagnostic checklist with prioritized fixes.' }],
    { tags: ['BLOG', 'AI'] }
  ),
  page(
    '/blog/category/ai-healthcare-technology',
    'Blog category',
    'AI & healthcare technology',
    'All articles on AI in healthcare marketing, automation, and compliance, curated for operators who need decisions, not hype.',
    [{ body: 'Use this hub to cross-link into /ai capability pages and the free practice audit funnel.' }],
    { tags: ['BLOG'] }
  ),
  page(
    '/blog/category/hipaa-compliance',
    'Blog category',
    'HIPAA & compliance',
    'Articles on HIPAA-safe marketing, AI compliance, and PHI-safe workflows for modern practices.',
    [{ body: 'Pair reading with our monitoring capability page and your legal counsel for policy-specific questions.' }],
    { tags: ['BLOG'] }
  ),
]

/** Card grid metadata for `/blog` hub */
export const blogArticleSummaries = [
  {
    slug: 'ai-patient-acquisition-healthcare-2026',
    title: 'How AI Is Transforming Patient Acquisition in 2026',
    excerpt: 'Predictive targeting, compliance, chatbots, and nurture automation.',
    tags: ['AI'],
    category: 'AI',
    image: getBlogArticleImage('ai-patient-acquisition-healthcare-2026'),
  },
  {
    slug: 'hipaa-safe-ai-marketing-guide-2026',
    title: "HIPAA-Safe AI Marketing: What's Allowed in 2026",
    excerpt: 'Which tools are compliant and how to audit your stack.',
    tags: ['AI', 'Compliance'],
    category: 'Compliance',
    image: getBlogArticleImage('hipaa-safe-ai-marketing-guide-2026'),
  },
  {
    slug: 'double-new-patient-flow-90-days',
    title: 'How to Double New Patient Flow in 90 Days',
    excerpt: 'Local SEO, PPC, reputation, and chatbot automation in sequence.',
    tags: ['Growth'],
    category: 'Growth',
    image: getBlogArticleImage('double-new-patient-flow-90-days'),
  },
  {
    slug: 'google-business-profile-medical-practice-guide',
    title: 'Why Your Google Business Profile is Your #1 Patient Tool',
    excerpt: 'GBP optimization with AI content strategy for local dominance.',
    tags: ['Local SEO'],
    category: 'Local SEO',
    image: getBlogArticleImage('google-business-profile-medical-practice-guide'),
  },
  {
    slug: 'local-seo-doctors-complete-guide-2026',
    title: 'Local SEO for Doctors: A 2026 Complete Guide',
    excerpt: 'Schema, E-E-A-T, AI keywords, and citations for practices.',
    tags: ['SEO'],
    category: 'SEO',
    image: getBlogArticleImage('local-seo-doctors-complete-guide-2026'),
  },
  {
    slug: 'ai-chatbots-medical-practices-guide',
    title: 'AI Chatbots for Medical Practices: The Complete Guide',
    excerpt: 'Pre-qualify, book, and operate 24/7 with HIPAA-safe workflows.',
    tags: ['AI'],
    category: 'AI',
    image: getBlogArticleImage('ai-chatbots-medical-practices-guide'),
  },
  {
    slug: 'squarespace-vs-custom-website-medical-practice',
    title: 'Squarespace vs Custom Build: The Real Cost',
    excerpt: 'SEO ceiling, HIPAA risk, AI readiness, and conversion control.',
    tags: ['Strategy'],
    category: 'Strategy',
    image: getBlogArticleImage('squarespace-vs-custom-website-medical-practice'),
  },
  {
    slug: 'online-reviews-revenue-medical-practice',
    title: 'Online Reviews Are Revenue: The $187K Per Star Explained',
    excerpt: 'Reputation economics and systematic rating growth.',
    tags: ['Reputation'],
    category: 'Reputation',
    image: getBlogArticleImage('online-reviews-revenue-medical-practice'),
  },
  {
    slug: 'eeat-healthcare-websites-seo-guide',
    title: 'What Is E-E-A-T and Why It Matters for Healthcare Websites',
    excerpt: 'Trust signals Google expects from medical content.',
    tags: ['SEO'],
    category: 'SEO',
    image: getBlogArticleImage('eeat-healthcare-websites-seo-guide'),
  },
  {
    slug: 'ai-ppc-medical-practices-hipaa-safe',
    title: 'PPC for Medical Practices: A HIPAA-Safe AI Playbook',
    excerpt: 'Google and Meta ads without compliance landmines.',
    tags: ['AI', 'Paid media'],
    category: 'Paid media',
    image: getBlogArticleImage('ai-ppc-medical-practices-hipaa-safe'),
  },
  {
    slug: '5-signs-healthcare-website-costing-patients',
    title: '5 Signs Your Healthcare Website Is Costing You Patients',
    excerpt: 'Speed, templates, booking, reviews, and notices, fixed with intent.',
    tags: ['Web', 'AI'],
    category: 'Web',
    image: getBlogArticleImage('5-signs-healthcare-website-costing-patients'),
  },
]
