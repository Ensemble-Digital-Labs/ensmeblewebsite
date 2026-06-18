// Home page content data, healthcare / medical practice focus

export { caseStudies, caseStudyFilters } from '../data/healthcareCaseStudies.js'

/** Hero subhead, segmented for `KeywordReveal` (emphasis = animated keyword spans). `growthHighlight` = static growth gradient on HomePageSections hero only. */
export const heroSubheadSegments = [
  { text: 'We are a ' },
  { text: 'healthcare-focused', growthHighlight: true },
  { text: ' product company that combines ' },
  { text: 'AI-powered marketing', emphasis: true },
  { text: ', ' },
  { text: 'clinical software', emphasis: true },
  { text: ', and ' },
  { text: 'IT infrastructure', emphasis: true },
  { text: ', uasdfaUnder one roof, built exclusively for practices that want to grow ' },
  { text: 'faster and smarter', emphasis: true },
  { text: '.' },
]

export const heroContent = {
  /** Optional line above scroll-expand title, empty when the shutter stack is the welcome lockup. */
  heroWelcomeLine: '',
  /**
   * `heroLayout: 'split'`, editorial gradients + optional right column (arcs / portrait).
   * `heroLayout: 'fullBleed'` (or omit with no portrait), full-bleed `heroBackgroundSrc` art behind copy.
   */
  heroLayout: 'split',
  /** Optional portrait in split layout; `null` = arcs only, no photo. */
  heroPortraitSrc: null,
  /** Which `headlineLines` index uses the warm accent (0-based). With a 2-line array, `HomePageSections` still accents the first word of line 2. */
  headlineAccentLineIndex: 1,
  /** Optional full-bleed hero photo (root-relative URL). Omit when using split layout + `heroPortraitSrc`, or use with `heroPortraitSrc: null`. */
  heroBackgroundSrc: null,
  /** Home headline: prefer `['Line 1', 'word gradient + rest']` (two lines). Legacy `['a','b','c']` (three lines) still supported. */
  headlineLines: ['Not just a', 'marketing agency'],
  /** Home `HeroScrollExpand`, first-phase three-line shutter (mobile + desktop pin). */
  heroScrollExpandHeadlineLines: ['Welcome to', 'Ensemble', 'Digital Labs'],
  /**
   * Phase-2 scrub: Arc-style split, left typographic lockup (small / big / small),
   * right supporting copy with gold corner brackets (same story as `subhead`).
   * Left lines align with the three-line shutter (“Not just a / marketing / agency”).
   */
  heroScrollExpandPhase2Lockup: {
    line1: 'Not just a',
    line2: 'marketing',
    line3: 'agency',
  },
  headline: 'Not just a marketing agency',
  subBrand: 'Ensemble Digital Labs',
  eyebrow: 'AI-powered · HIPAA-compliant · Built for healthcare',
  /** Hero background video (optional). */
  backgroundVideo: null,
  /** Optional full-bleed hero bitmap under ambient layers (null = particle field only). */
  backgroundImage: null,
  /**
   * Main `/` home hero, **full-viewport** background plate (`public/revamp-assets/...`).
   * Set `null` to use flat `#050816` only (no photo).
   */
  homeHeroFullBleedBackgroundSrc: '/revamp-assets/images/hero/home-hero-primary-2026-05.png',
  get subhead() {
    return heroSubheadSegments.map((s) => s.text).join('')
  },
  get heroScrollExpandPhase2Aside() {
    return heroSubheadSegments.map((s) => s.text).join('')
  },
  stats: [
    { value: '100+', label: 'NEW PATIENTS / MONTH' },
    { value: '3×', label: 'AVERAGE REVENUE GROWTH' },
    { value: '90', label: 'DAYS TO FIRST RESULTS' },
  ],
  primaryCTA: {
    text: 'Get your free practice audit',
    link: '/free-practice-audit',
  },
  secondaryCTA: {
    text: 'See what we build',
    link: '/case-studies',
  },
  trustLabel: 'HIPAA-compliant · Every industry · Results-first',
  trustLogos: [
    { id: 1, name: 'AI-powered stack', pill: 'Stack', placeholder: 'Stack' },
    { id: 2, name: 'Clinical software & IT', pill: 'Stack', placeholder: 'Stack' },
    { id: 3, name: 'Performance marketing', pill: 'Growth', placeholder: 'Growth' },
    { id: 4, name: 'AI & automation', pill: 'AI', placeholder: 'AI' },
    { id: 5, name: 'Full-stack delivery', pill: 'Growth', placeholder: 'Growth' },
  ],
}

/** Home, `HeroStatsTrustBand` header (below `#page1`). */
export const heroPracticeOutcomeSection = {
  eyebrow: 'Practice outcomes',
  kicker: 'Ensemble Digital Labs',
  headline: 'How we grow your practice?',
  /** CTA in this band only; keeps hero `primaryCTA` unchanged for `#page1`. */
  cta: {
    text: 'Talk with our team',
    link: '/contact',
  },
}

/** Home, `HeroStatsTrustBand`: auto-cycling feature list + hero image (below `#page1`). `iconKey` maps to Lucide in the section. */
export const heroPracticeOutcomeFeatures = [
  {
    id: 1,
    iconKey: 'Sparkles',
    title: 'AI-first strategy',
    description:
      'Every campaign is powered by predictive AI, audience modeling, patient journey mapping, and real-time optimization that outperforms manual targeting.',
    image: '/assets/images/hero-outcomes/ai-first-strategy.png',
  },
  {
    id: 2,
    iconKey: 'ShieldCheck',
    title: 'HIPAA-safe by design',
    description:
      'AI compliance monitoring scans every pixel, form, and ad in real time. Our stack is built so AI never puts your practice at regulatory risk.',
    image: '/assets/images/hero-outcomes/hipaa-safe-by-design.png',
  },
  {
    id: 3,
    iconKey: 'CircleDot',
    title: 'Revenue-obsessed',
    description:
      'Every AI model, every automation, every campaign is calibrated to one outcome: more patients through your door and more revenue in your practice.',
    image: '/assets/images/hero-outcomes/revenue-obsessed.png',
  },
]

/** Home, ParallaxLayerShowcase (directly after `HeroScrollExpand`; copy complements `HeroStatsTrustBand` rail without repeating it). */
export const parallaxShowcaseContent = {
  eyebrow: 'Who we are',
  headlineLine1: 'The only partner',
  headlineLine2: 'Built like this.',
  lead:
    'Outcomes are the goal; how we work is the difference, fewer handoffs, clearer ownership, and decisions grounded in how your practice actually runs, not one-size-fits-all retail playbooks.',
  /**
   * Each pillar uses glass + clip reveal (no split-door curtain art).
   */
  pillars: [
    {
      label: 'Specialty-native nuance',
      text: 'Care models, payer mix, and local competition change the story patients need to hear. We map growth to how people choose a practice in your specialty and market, not retail playbooks with a clinic logo swapped in.',
    },
    {
      label: 'Privacy woven into delivery',
      text: 'BAAs, access controls, and release discipline are part of how we ship, not a sticker added after launch. Compliance gets documentation and predictability, not last-minute scrambles.',
    },
    {
      label: 'One roadmap, shared velocity',
      text: 'Creative, code, media, and IT chase the same priorities on the same calendar. When experiments do not wait on ticket queues between vendors, learning compounds and launches stay honest.',
    },
    {
      label: 'Numbers leadership trusts',
      text: 'We tie investment to booked visits and downstream contribution, not vanity dashboards, so operations, finance, and physicians see one coherent story when it is time to scale or tighten spend.',
    },
  ],
}

/**
 * Home, Selected Work device showcase (slides)
 *
 * - `image`, poster / static cover; also used when iframe embedding is blocked for that host.
 * - `scrollImage`, tall full-page screenshot (e.g. `/assets/previews/stl-ioir-fullpage.webp`); scrolls inside both bezels.
 * - `previewUrl`, live site in an iframe (fills the frame). Blocked hosts show poster + “Open live site” until `scrollImage` or framing is allowed.
 * - `launchUrl`, optional link for “Open live site” (defaults to `previewUrl`).
 */
export const homeCarouselItems = [
  {
    title: 'STL IOIR Clinics',
    description:
      'Full-stack digital presence for a specialized interventional oncology and radiology practice, physician-grade design, local SEO, and patient acquisition built for a highly competitive St. Louis market.',
    category: 'Healthcare · Web',
    color: '#e94e77',
    image: '/ensemble-2026/home/work/stl-ioir-clinics/cover.webp',
    previewUrl: 'https://stlioirclinics.com/',
    launchUrl: 'https://stlioirclinics.com/',
  },
  {
    title: 'Arc Wellness',
    description:
      'Premium Next.js build for a physician-led aesthetics and functional medicine clinic, dark luxury aesthetic, inline booking integration, Core Web Vitals optimized, and built to position Dr. Jabbar above medspa competitors.',
    category: 'Web · Luxury',
    color: '#A855F7',
    image: '/ensemble-2026/home/work/arc-wellness/cover.webp',
  },
  {
    title: 'Smart Pain Solutions',
    description:
      'Performance marketing and website strategy that drove targeted traffic, generated leads, and converted patients at scale, reaching an all-time high of 100+ new patient registrations in a single month.',
    category: 'Marketing · PPC',
    color: '#22C55E',
    image: '/ensemble-2026/home/work/smart-pain-solutions/cover.webp',
  },
  {
    title: 'MHW Surgery',
    description:
      'Digital brand identity and patient acquisition engine for a surgical practice, built from the ground up with physician-led positioning, HIPAA-compliant forms, and local SEO to drive high-intent patient inquiries.',
    category: 'Brand · Web',
    color: '#F97316',
    image: '/ensemble-2026/home/work/mhw-surgery/cover.webp',
  },
  {
    title: 'AIPSTL',
    description:
      'Member acquisition and digital engagement strategy for a healthcare organization, conversion-optimized landing pages, targeted outreach, and a digital presence built to grow membership and community impact.',
    category: 'Strategy · CRO',
    color: '#38BDF8',
    image: '/ensemble-2026/home/work/aipstl/cover.webp',
  },
]

/** Home, Selected Work (carousel header + lead). Source: ensemble website v2-updated.pdf */
export const homeSelectedWorkContent = {
  sectionLabel: 'Our work',
  headlineLine1: 'Built by Ensemble.',
  headlineLine2: 'Performing in the market.',
  leadSegments: [
    { text: 'Every site we build is engineered for ' },
    { text: 'speed', emphasis: true },
    { text: ', ' },
    { text: 'SEO', emphasis: true },
    { text: ', ' },
    { text: 'HIPAA compliance', emphasis: true },
    { text: ', and ' },
    { text: 'patient conversion', emphasis: true },
    { text: ", not just aesthetics. Here's a sample of what we've delivered." },
  ],
}

/**
 * Home, problem band (headline two lines, uppercase in UI).
 * Per-pain `image`: full-bleed card art under HTML text (design should leave clear copy zones). Stub PNGs in `public/assets/images/home-problem/` match invisible-online until replaced.
 */
export const homeProblemContent = {
  eyebrow: 'The problem',
  headlineLine1: "What's holding your",
  headlineLine2: 'practice back?',
  lead:
    'Every day without a unified digital strategy costs your practice real patients and real revenue. These are the gaps we close fastest.',
  /** Pain `image`: full-width strip; fixed height + `object-cover`. Optional `imageObjectPosition` (e.g. `center 70%`) nudges which part of the art stays visible when cropped. */
  pains: [
    {
      title: 'Invisible online',
      text: 'Weak local SEO, outdated Google Business Profiles, missing medical schema markup, your competitors rank while you’re buried on page two.',
      image: '/assets/images/home-problem/invisible-online.png',
    },
    {
      title: 'Wasted ad spend',
      text: 'Broad targeting, non-compliant tracking, and generic landing pages inflate your cost-per-lead and deliver the wrong patients, if any at all.',
      image: '/assets/images/home-problem/wasted-ad-spend.png',
      imageObjectPosition: 'center 58%',
    },
    {
      title: 'Reputation risk',
      text: 'Few reviews, slow responses, no systematic process to generate positive feedback, 76% of patients choose based on reputation. Inaction is losing.',
      image: '/assets/images/home-problem/reputation-risk.png',
    },
    {
      title: 'Website friction',
      text: 'Slow load times, poor mobile UX, template platform limitations, no online scheduling, patients hit your site and bounce to competitors.',
      image: '/assets/images/home-problem/website-friction.png',
    },
    {
      title: 'HIPAA exposure',
      text: 'Non-compliant pixels, unsecured forms, and unvetted hosting environments put your practice at serious regulatory and reputational risk daily.',
      image: '/assets/images/home-problem/hipaa-exposure.png',
      imageObjectPosition: 'center 30%',
    },
    {
      title: 'Fragmented vendors',
      text: 'Your website team doesn’t talk to your SEO agency. Your IT provider doesn’t understand marketing. Gaps between vendors create gaps in your pipeline.',
      image: '/assets/images/home-problem/fragmented-vendors.png',
    },
  ],
}

/** Home, Roadmap teaser. Source: ensemble website v2-updated.pdf */
export const homeRoadmapContent = {
  eyebrow: 'The roadmap',
  headline: '90 days to impact. 12 months to dominance.',
  lead:
    'Our 90-Day Quick-Win Plan prioritizes the highest-ROI actions first so you see measurable results fast, then we build the 12-month engine for sustained market leadership.',
  phases: [
    {
      title: 'Days 1–30 · Foundation',
      items: [
        'Website audit, speed, mobile, ADA compliance',
        'HIPAA-compliant tracking & analytics setup',
        'Google Business Profile claimed & optimized',
      ],
    },
    {
      title: 'Days 31–60 · Demand generation',
      items: [
        'NAP consistency across all directories',
        'Automated review generation system launched',
        '3–5 high-intent service landing pages live',
        'Online scheduling & secure patient forms added',
      ],
    },
    {
      title: 'Days 61–90 · Conversion & scale',
      items: [
        'Call tracking & conversation analytics live',
        'PPC launched, Search + Local Service Ads',
        'Geo-targeted campaigns for highest-intent services',
        'A/B testing, headlines, CTAs, landing pages',
        'Negative keyword lists & intent-matching built',
        'Social campaigns launched (Facebook / Instagram / LinkedIn)',
        'First SEO content cluster published',
        'Custom site build commissioned if on template',
      ],
    },
  ],
  primaryCta: { text: 'Request your free audit', link: '/free-practice-audit' },
  secondaryCta: { text: 'Explore services', link: '/services' },
}

export const servicesPreview = [
  {
    id: 1,
    title: 'Software & Product',
    description:
      'We build the digital infrastructure your practice runs on, custom-engineered, HIPAA-compliant, and AI-ready by design to scale with your growth.',
    icon: '💻',
    accent: 'from-[#10B981] to-[#3B82F6]',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    id: 2,
    title: 'IT Infrastructure',
    description:
      'Reliable, secure, compliant clinical IT, built to support AI tools, data pipelines, and digital growth without creating compliance risk.',
    icon: '🔌',
    accent: 'from-[#64748B] to-[#f17245]',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    id: 3,
    title: 'Websites & Local SEO',
    description:
      'Physician-grade websites engineered for Core Web Vitals, AI-assisted content strategy, and local search dominance that makes your practice the obvious choice.',
    icon: '🌐',
    accent: 'from-[#3B82F6] to-[#6366F1]',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 4,
    title: 'Performance Marketing',
    description:
      'AI-powered campaigns with HIPAA-safe tracking, predictive audience targeting, and automated patient nurture that drives high-intent patients, and converts them.',
    icon: '📈',
    accent: 'from-[#EC4899] to-[#F97316]',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
  },
  {
    id: 5,
    title: 'Creative Production',
    description:
      'AI-assisted content strategy paired with human-led clinical production, physician video, photography, and social content that builds authority and drives conversions.',
    icon: '🎬',
    accent: 'from-[#C084FC] to-[#E879F9]',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
  },
]

export const caseStudiesPreview = [
  {
    id: 1,
    title: 'STL IOIR Clinics',
    client: 'Interventional Oncology & Radiology',
    metric: 'Live',
    metricLabel: 'Physician-grade presence',
    description:
      'Full-stack digital presence for a specialized interventional oncology and radiology practice, local SEO and patient acquisition for a competitive St. Louis market.',
    category: 'Healthcare',
  },
  {
    id: 2,
    title: 'Arc Wellness',
    client: 'Medical Wellness · Aesthetics & Longevity',
    metric: 'Next.js',
    metricLabel: 'Premium build',
    description:
      'Premium Next.js build for a physician-led aesthetics and functional medicine clinic, dark luxury aesthetic, booking integration, and Core Web Vitals.',
    category: 'Web',
  },
  {
    id: 3,
    title: 'Smart Pain Solutions',
    client: 'Pain Management',
    metric: '100+',
    metricLabel: 'Patients / peak month',
    description:
      'Performance marketing and website strategy that drove targeted traffic and conversions, all-time high of 100+ new patient registrations in a single month.',
    category: 'Marketing',
  },
]

// About page content, healthcare focus
export const aboutPageContent = {
  hero: {
    title: 'Who We Are',
    subtitle: 'Ensemble Digital Labs',
    description:
      'A healthcare-focused product company delivering AI-powered marketing, software, IT infrastructure, and creative production, exclusively for clinical practices. HIPAA-compliant. Revenue-obsessed.',
    tagline: 'AI-powered healthcare marketing · Built to grow',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=75',
    video: null,
  },
  mission: {
    title: 'Our Mission',
    subtitle: 'Empowering Healthcare Providers',
    description: 'Running a successful medical practice today requires more than clinical expertise. We understand the challenges, competing with established groups, attracting new patients in a digital world, and administrative tasks that take you away from patient care. We help you compete and thrive with comprehensive digital and AI-powered solutions.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  },
  vision: {
    title: 'Our Vision',
    subtitle: 'Your Trusted Digital Partner',
    description: 'To be a trusted digital partner for medical practices, empowering healthcare providers to focus on patient care while we manage their digital growth and operational efficiency.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
  },
  values: {
    title: 'Pain Points We Solve',
    subtitle: 'From Struggle to Solution',
    description: 'We address struggling patient attraction, time-consuming communication, high marketing costs, outdated technology, and lack of local support with professional SEO, AI chatbots, cost-effective expertise, HIPAA-compliant systems, and a local specialist team.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  },
  team: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years of experience in digital marketing and brand strategy.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Creative Director',
      bio: 'Award-winning designer specializing in brand identity and user experience design.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Head of Strategy',
      bio: 'Data-driven strategist with expertise in growth marketing and digital transformation.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Technical Lead',
      bio: 'Full-stack developer and technical architect with a passion for building scalable solutions.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
  ],
  whyChooseUs: {
    title: 'Product company first',
    stats: [
      {
        id: 1,
        value: '✓',
        label: 'Healthcare exclusive',
        description:
          'No generic clients. No learning curve. We speak HIPAA, EHR, and clinical workflow, fluently.',
      },
      {
        id: 2,
        value: '✓',
        label: 'Full-stack delivery',
        description:
          'Software, IT infrastructure, and marketing in one relationship, one point of accountability for outcomes.',
      },
      {
        id: 3,
        value: '✓',
        label: 'Revenue-obsessed',
        description:
          'Measured in patient acquisition and practice revenue growth, not vanity metrics.',
      },
      {
        id: 4,
        value: '✓',
        label: 'One contract · all five verticals',
        description:
          'Stop managing five agencies. We own every layer from infrastructure to acquisition.',
      },
    ],
  },
}

export const processSteps = [
  {
    id: 1,
    step: '01',
    title: 'Discovery & Vision Alignment',
    description: 'Understand your practice goals and align vision for growth.',
  },
  {
    id: 2,
    step: '02',
    title: 'Brand Identity & Market Positioning',
    description: 'Craft a strong visual brand supported by competitive analysis and audience insights.',
  },
  {
    id: 3,
    step: '03',
    title: 'Enhanced Digital Presence & Patient Engagement',
    description: 'Establish online assets: website, SEO, ads, and seamless access for patients, with accessibility and HIPAA in mind.',
  },
  {
    id: 4,
    step: '04',
    title: 'Integration & Strategy Analytics',
    description: 'Integrate tools, track performance metrics and live dashboards.',
  },
  {
    id: 5,
    step: '05',
    title: 'Automation & Custom Development',
    description: 'Deploy workflows, bots, portals and custom tools to reduce manual work.',
  },
  {
    id: 6,
    step: '06',
    title: 'Innovation & Holistic Growth',
    description: 'Offer end-to-end support, innovation, and long-term value beyond marketing.',
  },
]

export const testimonialsPreview = [
  {
    id: 1,
    quote: 'Ensemble team was pivotal in launching my new clinic from branding to digital marketing. Their team built a strong online presence that significantly increased patient inquiries. Their digital marketing expertise dramatically boosted our online visibility, helping more patients discover our services. They also collaborate in person and fine-tune strategies.',
    author: 'Dr. Amit Bhandarkar, MD',
    role: 'Spine',
    company: '',
  },
  {
    id: 2,
    quote: 'Ensemble Digital Labs corrected our online presence. Their local market knowledge and expertise in SEO, Ad Campaigns and Content Marketing, all at competitive rates, helped increase patient engagement and appointments. I couldn\'t be happier with the results.',
    author: 'Dr. Robert "Bo" Andel',
    role: 'Smart Pain Solutions',
    company: '',
  },
  {
    id: 3,
    quote: 'Ensemble Digital Labs played a pivotal role in launching my clinic\'s digital presence. Their expertise helped build a strong brand identity and drive patient growth. The clean, intuitive interface makes it effortless for patients to access the care they need and the glowing expectations and confidence in our services. I confidently recommend them to anyone seeking top-tier digital solutions.',
    author: 'Dr. Deepu Sudhakaran, MD',
    role: 'Chesterfield Bariatric Surgery',
    company: '',
  },
]

export const ctaContent = {
  headline: 'No cost. No commitment.',
  subhead:
    'Get your free practice growth audit, local visibility (Google rankings, GBP health, directory accuracy), reputation check across major platforms, competitor scan, ROI forecast, and a clear path to first campaigns in about two weeks. In 30 minutes, we show where you are losing patients and what a 90-day plan looks like for your specialty and market.',
  primaryCTA: {
    text: 'Request your free audit',
    link: '/contact',
  },
  secondaryCTA: {
    text: 'See our work',
    link: '/case-studies',
  },
}

// Contact / company info (footer, contact page)
export const contactInfo = {
  address: '11715 Administration Dr, Suite 103',
  cityStateZip: 'St. Louis, MO 63146',
  website: 'www.ensembledigitallabs.com',
  email: 'support@ensembledigilabs.com',
  phone: '+1 (469) 704-0457',
}

/** Contact form — 10 independent-practice pain points (multi-select). */
export const practicePainPointOptions = [
  {
    id: 'digital-visibility',
    category: 'Digital visibility',
    label: "You're not showing up when patients search for you.",
  },
  {
    id: 'hipaa-compliance',
    category: 'HIPAA compliance',
    label: 'Your website and ads may be violating HIPAA right now.',
  },
  {
    id: 'website-experience',
    category: 'Website experience',
    label: 'Patients visit your website and call your competitor.',
  },
  {
    id: 'workflow-automation',
    category: 'Workflow & automation',
    label: 'Your staff is drowning in tasks a computer should handle.',
  },
  {
    id: 'software-crm',
    category: 'Software & CRM',
    label: 'Your practice runs on workarounds and spreadsheets.',
  },
  {
    id: 'reputation',
    category: 'Reputation',
    label: 'One bad review is hurting your whole practice.',
  },
  {
    id: 'patient-acquisition',
    category: 'Patient acquisition',
    label: "You're spending on ads but the wrong patients are calling.",
  },
  {
    id: 'it-infrastructure',
    category: 'IT infrastructure',
    label: 'Your IT is held together with duct tape and prayers.',
  },
  {
    id: 'vendor-fragmentation',
    category: 'Vendor fragmentation',
    label: 'You manage 8 vendors. None of them talk to each other.',
  },
  {
    id: 'competition',
    category: 'Competition',
    label: 'Hospital systems are taking your patients. Quietly.',
  },
]

// How our services help clients: outcome levels (Essentials → Growth → Dominate)
export const howWeHelpClients = [
  {
    id: 1,
    name: 'Essentials',
    description: 'Get the foundations in place, website, compliance, and basic visibility.',
    features: [
      'Website update & maintenance',
      'Brand management (basic)',
      'HIPAA compliance',
      'Web analytics portal (basic tracking)',
      'Secure lead forms',
      'SEO (on-page basics)',
      'Email campaigns (standard)',
      'Infrastructure guidance (Email setup, hosting, device support)',
    ],
  },
  {
    id: 2,
    name: 'Growth',
    description: 'Scale your presence with ongoing marketing, automation, and patient engagement.',
    features: [
      'All Essentials features plus:',
      'Ongoing SEO content production',
      'Advanced service pages',
      'Appointment scheduling setup',
      'Video marketing',
      'Standard reviews & testimonials',
      'Social media management',
      'A/B testing for paid ads',
      'PPC campaigns (Google & Meta ads)',
      'Advanced analytics & reporting',
      'Marketing operational automation',
      'HIPAA-compliant custom website development',
      'EHR/EMR integrations',
    ],
  },
  {
    id: 3,
    name: 'Dominate',
    description: 'Lead your market with advanced ads, AI, and full-stack digital operations.',
    features: [
      'All Growth features plus:',
      'Advanced paid advertising with local search optimization',
      'Campaign-focused landing pages',
      'Paid ad strategy and management',
      'Reputation management & review generation',
      'GA4 & GTM-based performance tracking dashboards',
      'Branding & offline design (visiting cards, flyers, rack cards, brochures)',
      'Advanced CRM relationship manager',
      'AI virtual assistants (appointment booking, patient queries)',
      'Custom IT solutions & consultation',
    ],
  },
]

// Services page content
export const servicesPageContent = {
  hero: {
    title: 'Five verticals. One partner. Zero gaps.',
    subtitle:
      'Every service is AI-enhanced and purpose-built for healthcare, predictive targeting, automated compliance, intelligent content, and smart patient nurture baked into every layer. HIPAA-safe. Zero gaps.',
  },
  howWeWork: {
    hero: {
      title: 'How We Deliver Results',
      description:
        'Our proven process blends healthcare strategy, creative, and technology — so every phase moves your practice toward measurable patient and revenue growth.',
      cta: {
        text: 'Start Today',
        link: '/contact',
      },
    },
    steps: [
      {
        id: 1,
        step: 'Phase 1',
        title: 'Discovery & Planning',
        description:
          'We learn your specialty, market, and growth goals. Through workshops and research, we map patient journeys and build a strategy aligned with HIPAA-safe execution.',
        visualElements: {
          type: 'search',
          placeholder: 'What are your practice growth goals?',
          tags: ['Competitive landscape', 'Patient journey audit', 'KPI alignment', 'Compliance check'],
        },
      },
      {
        id: 2,
        step: 'Phase 2',
        title: 'Strategy & Creative',
        description:
          'We translate strategy into brand, web, content, and campaign concepts — designed for clinical credibility and conversion across every touchpoint.',
        visualElements: {
          type: 'icons',
          items: ['Brand positioning', 'Web & UX', 'Content & SEO', 'Campaign creative'],
        },
      },
      {
        id: 3,
        step: 'Phase 3',
        title: 'Launch & Optimization',
        description:
          'We deploy, monitor, and optimize across ads, SEO, and automation — reporting on patient acquisition and revenue, not vanity metrics.',
        visualElements: {
          type: 'team',
          members: ['Growth strategist', 'Creative lead', 'SEO & paid media'],
          action: 'Book a strategy call',
        },
      },
    ],
  },
  faq: [
    {
      id: 1,
      question: 'What services do you offer?',
      answer: 'We offer comprehensive digital marketing services including brand strategy, digital marketing campaigns, web development, creative design, analytics & insights, and growth consulting. Each service is tailored to meet your specific business needs.',
    },
    {
      id: 2,
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on scope and complexity. A typical website project takes 6-12 weeks, while a comprehensive brand strategy can take 4-8 weeks. We provide detailed timelines during the discovery phase and keep you updated throughout the process.',
    },
    {
      id: 3,
      question: 'What is your pricing structure?',
      answer: 'Our pricing is customized based on your specific needs and project scope. We offer both project-based and retainer options. During our initial consultation, we\'ll discuss your requirements and provide a detailed proposal with transparent pricing.',
    },
    {
      id: 4,
      question: 'Do you work with businesses of all sizes?',
      answer: 'Yes, we work with businesses of all sizes, from startups to enterprise-level companies. Our services are scalable and tailored to fit your budget and objectives. We\'ve successfully helped businesses at every stage of growth.',
    },
    {
      id: 5,
      question: 'What makes your approach different?',
      answer: 'We combine strategic thinking with creative excellence and technical expertise. Our data-driven approach ensures measurable results, while our focus on user experience and brand consistency creates lasting impact. We\'re not just service providers, we\'re your strategic partners in growth.',
    },
  ],
}
