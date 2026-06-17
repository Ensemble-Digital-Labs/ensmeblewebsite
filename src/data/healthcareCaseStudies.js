/** Portfolio case studies, aligned with Ensemble positioning & PDF narrative */

import { ensemble2026Home } from '../lib/ensemble2026Assets.js'

const { partners, work } = ensemble2026Home

export const caseStudyFilters = ['All', 'Healthcare', 'Web', 'Marketing', 'SEO']

export const caseStudies = [
  {
    id: 1,
    slug: 'stl-ioir-clinics-interventional-oncology',
    title: 'Interventional Oncology & Radiology Digital Presence',
    client: 'STL IOIR Clinics',
    category: 'Healthcare',
    tags: ['Healthcare', 'Web', 'SEO', 'HIPAA'],
    primaryMetric: {
      value: 'Live',
      label: 'Physician-grade presence',
    },
    excerpt:
      'Full-stack digital presence for a specialized interventional oncology and radiology practice, physician-grade design, local SEO, and patient acquisition built for a highly competitive St. Louis market.',
    image: work.stlIoir.cover,
    logo: partners.stlIoir,
    challenge:
      'A highly specialized practice needed to stand out in a crowded metro market with credible clinical positioning, fast performance, and HIPAA-aligned web execution, not a generic template.',
    approach:
      'We engineered a custom site architecture focused on service clarity, trust signals, and technical SEO. Local intent was reinforced with structured content, performance tuning, and conversion paths tuned for high-intent patient searches.',
    results:
      'The practice launched a differentiated digital flagship: clearer positioning, stronger local relevance, and a conversion-focused experience aligned with how patients evaluate specialty care online.',
    metrics: [
      {
        value: 'Custom',
        label: 'Website build',
        description: 'Physician-grade UX & clinical positioning',
      },
      {
        value: 'Local SEO',
        label: 'Search visibility',
        description: 'Structured for high-intent care queries',
      },
      {
        value: 'HIPAA',
        label: 'Aligned delivery',
        description: 'Security-conscious implementation',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    ],
  },
  {
    id: 2,
    slug: 'arc-wellness-medical-aesthetics-website',
    title: 'Luxury Aesthetics & Longevity Website',
    client: 'Arc Wellness',
    category: 'Web',
    tags: ['Web', 'Healthcare', 'SEO', 'Booking'],
    primaryMetric: {
      value: 'Next.js',
      label: 'Premium build',
    },
    excerpt:
      'Premium Next.js build for a physician-led aesthetics and functional medicine clinic, dark luxury aesthetic, inline booking integration, Core Web Vitals optimized, and built to position Dr. Jabbar above medspa competitors.',
    image: work.arcWellness.cover,
    logo: partners.arcWellness,
    challenge:
      'The brand needed a premium digital experience that matched an elevated in-clinic standard, fast, polished, and built to win comparisons against local medspa competitors.',
    approach:
      'We delivered a modern Next.js architecture with strict performance budgets, refined visual direction, and booking pathways designed to reduce friction for high-value consultations.',
    results:
      'A flagship web experience that supports premium positioning, improves perceived quality, and creates a smoother path from discovery to booked appointment.',
    metrics: [
      {
        value: 'CWV',
        label: 'Performance',
        description: 'Engineered for speed & stability',
      },
      {
        value: 'Booking',
        label: 'Integration',
        description: 'Inline scheduling flow',
      },
      {
        value: 'SEO',
        label: 'Architecture',
        description: 'Structured for growth',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    ],
  },
  {
    id: 3,
    slug: 'smart-pain-solutions-100-patients-month',
    title: 'Performance Marketing at Scale',
    client: 'Smart Pain Solutions',
    category: 'Marketing',
    tags: ['Marketing', 'Healthcare', 'PPC'],
    primaryMetric: {
      value: '100+',
      label: 'New patients / mo',
    },
    excerpt:
      'Performance marketing and website strategy that drove targeted traffic, generated leads, and converted patients at scale, reaching 100+ new patient registrations in a single month.',
    image: work.smartPain.cover,
    logo: partners.smartPain,
    challenge:
      'Pain management is fiercely competitive. The practice needed compliant performance marketing, tighter funnel tracking, and landing experiences that convert, without wasting budget on low-intent clicks.',
    approach:
      'We rebuilt the acquisition system around intent-led campaigns, clearer offer structure, and rapid optimization loops, paired with web improvements that reduce friction for appointment requests.',
    results:
      'The program reached an all-time high of 100+ new patient registrations in one month while improving lead quality through tighter targeting and conversion-focused landing paths.',
    metrics: [
      {
        value: '100+',
        label: 'Peak month',
        description: 'New patient registrations',
      },
      {
        value: 'PPC',
        label: 'Paid demand',
        description: 'Search & social optimization',
      },
      {
        value: 'CRO',
        label: 'Conversion focus',
        description: 'Landing + funnel improvements',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      'https://images.unsplash.com/photo-1666214280557-f1f502a374ae?w=800&q=80',
    ],
  },
  {
    id: 4,
    slug: 'mhw-surgery-digital-brand-identity',
    title: 'Surgical Practice Brand & Acquisition Engine',
    client: 'MHW Surgery',
    category: 'Healthcare',
    tags: ['Healthcare', 'Web', 'Branding', 'HIPAA'],
    primaryMetric: {
      value: 'HIPAA',
      label: 'Compliant stack',
    },
    excerpt:
      'Digital brand identity and patient acquisition engine for a surgical practice, built from the ground up with physician-led positioning, HIPAA-compliant forms, and local SEO to drive high-intent patient inquiries.',
    image: work.mhwSurgery.cover,
    logo: partners.mhwSurgery,
    challenge:
      'A surgical brand needed authority and clarity online, plus compliant capture paths, so patients could evaluate expertise quickly and contact the practice without friction or regulatory risk.',
    approach:
      'We aligned identity, messaging, and site UX around surgical credibility, implemented HIPAA-conscious lead capture, and built local SEO relevance around the practice’s core procedures and markets.',
    results:
      'A cohesive brand-to-web system that supports trust at first glance and drives qualified inquiries from patients searching for surgical solutions.',
    metrics: [
      {
        value: 'Brand',
        label: 'Identity system',
        description: 'Cohesive physician-led positioning',
      },
      {
        value: 'Web',
        label: 'Custom build',
        description: 'Conversion-led patient journeys',
      },
      {
        value: 'Local',
        label: 'SEO footprint',
        description: 'High-intent procedure queries',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551190822-a9333d879042?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-cb93fc710f65?w=800&q=80',
    ],
  },
  {
    id: 5,
    slug: 'aipstl-member-acquisition-strategy',
    title: 'Member Acquisition for a Healthcare Organization',
    client: 'Alliance of Independent Physicians',
    category: 'Marketing',
    tags: ['Marketing', 'Healthcare', 'Web'],
    primaryMetric: {
      value: 'Growth',
      label: 'Digital engagement',
    },
    excerpt:
      'Member acquisition and digital engagement strategy for a healthcare organization, conversion-optimized landing pages, targeted outreach, and a digital presence built to grow membership and community impact.',
    image: work.aipstl.cover,
    logo: partners.aipstl,
    challenge:
      'The organization needed a digital engine that could attract members efficiently, without generic nonprofit templates, while supporting campaigns and community credibility.',
    approach:
      'We focused on conversion clarity, trust-building narrative, and measurable landing experiences, paired with outreach-aligned messaging and iterative optimization.',
    results:
      'A stronger acquisition footprint with clearer conversion paths and a digital presence aligned with mission-driven growth goals.',
    metrics: [
      {
        value: 'CRO',
        label: 'Landing pages',
        description: 'Built for conversion clarity',
      },
      {
        value: 'Outreach',
        label: 'Campaign support',
        description: 'Aligned messaging & targeting',
      },
      {
        value: 'Strategy',
        label: 'Digital roadmap',
        description: 'Membership growth focus',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    ],
  },
  {
    id: 6,
    slug: 'spine-care-45-new-patients-monthly',
    title: 'Spine Center, Consistent Monthly Patient Growth',
    client: 'Spine Care',
    category: 'Healthcare',
    tags: ['Healthcare', 'SEO', 'Marketing', 'AI'],
    primaryMetric: {
      value: '45+',
      label: 'New patients / mo',
    },
    excerpt:
      'Ground-up AI digital strategy delivering consistent monthly patient growth for a spine center, local SEO, predictive ads, and conversion-led landing paths.',
    image: work.spineCare.cover,
    logo: partners.spineCare,
    challenge:
      'Spine and orthopedics demand high-intent visibility across competitive keywords and map packs while keeping messaging clinically precise.',
    approach:
      'We structured entity-rich service content, GBP reinforcement, and paid campaigns with rapid learning loops tied to consult requests.',
    results:
      'Sustained 45+ new patients per month with improved lead quality and clearer attribution from search to booked visits.',
    metrics: [
      { value: '45+', label: 'Monthly patients', description: 'Recurring acquisition pace' },
      { value: 'Local', label: 'SEO + maps', description: 'High-intent procedure coverage' },
      { value: 'Paid', label: 'Predictive ads', description: 'Budget aligned to consults' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    ],
  },
  {
    id: 7,
    slug: 'cb-surgery-bariatric-brand-launch',
    title: 'CB Surgery, AI Brand Launch in 60 Days',
    client: 'CB Surgery',
    category: 'Healthcare',
    tags: ['Marketing', 'Branding', 'Healthcare', 'AI'],
    primaryMetric: {
      value: '60 days',
      label: 'Launch window',
    },
    excerpt:
      'New private bariatric practice: 90+ visitors and 20+ new patients in 60 days using AI targeting, brand systems, and performance marketing.',
    image: work.chesterfieldBariatric.cover,
    logo: partners.chesterfieldBariatric,
    challenge:
      'Launching without an established digital footprint requires fast credibility, compliant capture, and efficient paid learning.',
    approach:
      'We paired brand identity, landing architecture, and AI-assisted audience modeling with disciplined creative testing and review velocity.',
    results:
      'Strong early traction: meaningful site traffic and 20+ new patients within the first 60 days post-launch.',
    metrics: [
      { value: '20+', label: 'Patients (60d)', description: 'Early acquisition proof' },
      { value: 'AI', label: 'Targeting', description: 'Modeled high-intent cohorts' },
      { value: 'Brand', label: 'Launch system', description: 'Cohesive digital identity' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879042?w=800&q=80',
    ],
  },
  {
    id: 8,
    slug: 'agafay-weight-loss-social-media-ai',
    title: 'Agafay Weight Loss, Social Media Growth',
    client: 'Agafay Weight Loss',
    category: 'Marketing',
    tags: ['Marketing', 'Social', 'Healthcare', 'AI'],
    primaryMetric: {
      value: 'Social',
      label: 'Engagement lift',
    },
    excerpt:
      'AI-assisted social campaigns driving patient engagement and bookings for a physician-led weight loss program.',
    image: work.agafayWeightLoss.cover,
    logo: partners.agafayWeightLoss,
    challenge:
      'Social proof and education must coexist with platform policies and clinical credibility for weight loss offers.',
    approach:
      'Creative systems, UGC-style authenticity, and automated nurture hooks were aligned to consult booking and compliance guardrails.',
    results:
      'Improved engagement and appointment requests with a repeatable content cadence tuned to the practice’s capacity.',
    metrics: [
      { value: 'AI', label: 'Creative assist', description: 'Faster iteration cycles' },
      { value: 'CRM', label: 'Follow-up', description: 'Lead routing discipline' },
      { value: 'Reviews', label: 'Trust', description: 'Reputation reinforcement' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    ],
  },
]
