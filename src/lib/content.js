// Home page content data — healthcare / medical practice focus

export const heroContent = {
  headline: 'Empowering Medical Practices to Thrive',
  subBrand: 'Ensemble Digital Labs',
  /** Hero section background video. Put your .mp4 in public/assets/videos/ or use any URL. Set to null to hide. */
  backgroundVideo: '/assets/videos/hero-background.mp4',
  subhead: 'We help local clinics amplify their strengths, grow their brand, and drive patient growth. Vision meets execution—results speak for themselves.',
  painPoints: [
    'Are your competitors getting ahead digitally while your practice still relies on word of mouth?',
    'Is your clinic showing up on Google when local patients search for care?',
    'Too busy running your clinic to focus on marketing and technology?',
    'Struggling to get more patients despite having great services?',
  ],
  primaryCTA: {
    text: 'Get in Touch',
    link: '/contact',
  },
  secondaryCTA: {
    text: 'Our Services',
    link: '/services',
  },
  trustLogos: [
    { id: 1, name: 'Client Logo 1', placeholder: 'Logo 1' },
    { id: 2, name: 'Client Logo 2', placeholder: 'Logo 2' },
    { id: 3, name: 'Client Logo 3', placeholder: 'Logo 3' },
  ],
}

export const servicesPreview = [
  {
    id: 1,
    title: 'Brand Strategy',
    description: 'Comprehensive brand positioning and identity development that resonates with your target audience.',
    icon: '🎯',
    accent: 'from-[#C084FC] to-[#E879F9]',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', // Strategic/Node visual
  },
  {
    id: 2,
    title: 'Digital Marketing',
    description: 'Data-driven campaigns across SEO, PPC, social media, and content marketing to maximize ROI.',
    icon: '📈',
    accent: 'from-[#3B82F6] to-[#0891B2]',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Growth/Data visual
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Custom, high-performance websites and web applications built with modern technologies.',
    icon: '💻',
    accent: 'from-[#10B981] to-[#3B82F6]',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', // Coding/Tech visual
  },
  {
    id: 4,
    title: 'Creative Design',
    description: 'Stunning visual designs that capture attention and communicate your brand message effectively.',
    icon: '🎨',
    accent: 'from-[#F59E0B] to-[#EF4444]',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80', // Creative/Design visual
  },
]

export const caseStudiesPreview = [
  {
    id: 1,
    title: 'E-commerce Growth Transformation',
    client: 'Tech Retail Co.',
    metric: '300%',
    metricLabel: 'Revenue Increase',
    description: 'Complete digital transformation resulting in 300% revenue growth and 250% increase in customer acquisition.',
    category: 'E-commerce',
  },
  {
    id: 2,
    title: 'Brand Reimagining Campaign',
    client: 'Luxury Fashion Brand',
    metric: '500%',
    metricLabel: 'Social Engagement',
    description: 'Strategic rebranding and multi-channel campaign that revitalized brand perception and engagement.',
    category: 'Branding',
  },
  {
    id: 3,
    title: 'SaaS Platform Launch',
    client: 'Enterprise Software',
    metric: '10K+',
    metricLabel: 'Sign-ups in 3 Months',
    description: 'End-to-end launch strategy that achieved 10,000+ sign-ups and established market presence.',
    category: 'SaaS',
  },
]

// Full case studies data for listing and detail pages
export const caseStudies = [
  {
    id: 1,
    slug: 'ecommerce-growth-transformation',
    title: 'E-commerce Growth Transformation',
    client: 'Tech Retail Co.',
    category: 'Web',
    tags: ['E-commerce', 'Web Development', 'SEO'],
    primaryMetric: {
      value: '300%',
      label: 'Revenue Increase',
    },
    excerpt: 'Complete digital transformation resulting in 300% revenue growth and 250% increase in customer acquisition through strategic marketing and UX optimization.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    challenge: 'Tech Retail Co. was struggling with low conversion rates and declining customer engagement. Their existing e-commerce platform lacked modern features, had poor mobile experience, and their marketing efforts were not generating the desired ROI. They needed a comprehensive digital transformation to compete in the competitive retail market.',
    approach: 'We conducted extensive user research and competitive analysis to understand the market landscape. We redesigned the entire e-commerce platform with a focus on mobile-first design, implemented advanced SEO strategies, and created a data-driven marketing campaign. We also integrated analytics tools to track performance and optimize continuously.',
    results: 'The transformation resulted in a 300% increase in revenue within the first year. Customer acquisition increased by 250%, and the mobile conversion rate improved by 180%. The new platform also reduced bounce rate by 45% and increased average session duration by 65%.',
    metrics: [
      {
        value: '300%',
        label: 'Revenue Increase',
        description: 'Year-over-year growth',
      },
      {
        value: '250%',
        label: 'Customer Acquisition',
        description: 'New customers acquired',
      },
      {
        value: '180%',
        label: 'Mobile Conversion',
        description: 'Improvement in mobile sales',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    ],
  },
  {
    id: 2,
    slug: 'brand-reimagining-campaign',
    title: 'Brand Reimagining Campaign',
    client: 'Luxury Fashion Brand',
    category: 'Branding',
    tags: ['Branding', 'Social Media', 'Design'],
    primaryMetric: {
      value: '500%',
      label: 'Social Engagement',
    },
    excerpt: 'Strategic rebranding and multi-channel campaign that revitalized brand perception and engagement across all digital platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    challenge: 'The luxury fashion brand had an outdated brand identity that no longer resonated with their target audience. Their social media presence was weak, and they were losing market share to competitors. They needed a complete brand refresh and a strategic campaign to re-engage their audience and attract new customers.',
    approach: 'We developed a comprehensive brand strategy that included a complete visual identity redesign, brand positioning, and messaging framework. We created a multi-channel campaign spanning social media, digital advertising, and content marketing. The campaign focused on storytelling and authentic brand experiences that connected with the target audience emotionally.',
    results: 'The rebranding campaign achieved a 500% increase in social media engagement and a 350% increase in brand awareness. Website traffic increased by 280%, and the brand saw a 200% increase in online sales. The campaign also generated significant media coverage and positioned the brand as a leader in the luxury fashion space.',
    metrics: [
      {
        value: '500%',
        label: 'Social Engagement',
        description: 'Increase in interactions',
      },
      {
        value: '350%',
        label: 'Brand Awareness',
        description: 'Growth in brand recognition',
      },
      {
        value: '280%',
        label: 'Website Traffic',
        description: 'Increase in visitors',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    ],
  },
  {
    id: 3,
    slug: 'saas-platform-launch',
    title: 'SaaS Platform Launch',
    client: 'Enterprise Software',
    category: 'Web',
    tags: ['SaaS', 'Growth', 'Content'],
    primaryMetric: {
      value: '10K+',
      label: 'Sign-ups in 3 Months',
    },
    excerpt: 'End-to-end launch strategy that achieved 10,000+ sign-ups and established market presence through targeted content and growth marketing.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    challenge: 'Enterprise Software needed to launch their new SaaS platform in a highly competitive market. They had limited brand recognition and needed to quickly establish market presence and acquire early adopters. The challenge was to create awareness, generate interest, and convert prospects into paying customers within a tight timeline.',
    approach: 'We developed a comprehensive launch strategy that included content marketing, SEO optimization, paid advertising campaigns, and strategic partnerships. We created educational content that addressed pain points of the target audience, implemented a referral program, and leveraged industry influencers to amplify the message. We also optimized the onboarding process to ensure high conversion rates.',
    results: 'The launch campaign exceeded all expectations, achieving over 10,000 sign-ups within the first three months. The platform gained significant market traction with a 40% conversion rate from free trial to paid subscription. The content marketing efforts resulted in top rankings for key search terms, and the paid campaigns achieved a 5:1 ROI. The platform is now recognized as a leader in its category.',
    metrics: [
      {
        value: '10K+',
        label: 'Sign-ups',
        description: 'In first 3 months',
      },
      {
        value: '40%',
        label: 'Conversion Rate',
        description: 'Trial to paid',
      },
      {
        value: '5:1',
        label: 'ROI',
        description: 'On paid campaigns',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },
  {
    id: 4,
    slug: 'seo-optimization-success',
    title: 'SEO Optimization Success',
    client: 'Digital Services Co.',
    category: 'SEO',
    tags: ['SEO', 'Content', 'Analytics'],
    primaryMetric: {
      value: '450%',
      label: 'Organic Traffic',
    },
    excerpt: 'Comprehensive SEO strategy that increased organic traffic by 450% and improved search rankings across all target keywords.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    challenge: 'Digital Services Co. was struggling with low organic visibility and poor search rankings. Their website had technical SEO issues, thin content, and no clear keyword strategy. They were heavily dependent on paid advertising, which was becoming unsustainable. They needed a comprehensive SEO strategy to improve organic visibility and reduce dependency on paid channels.',
    approach: 'We conducted a complete SEO audit and identified technical issues, content gaps, and optimization opportunities. We implemented technical SEO fixes, created a content strategy focused on high-value keywords, and built a strong backlink profile through strategic outreach. We also optimized on-page elements, improved site speed, and implemented structured data markup.',
    results: 'The SEO optimization campaign resulted in a 450% increase in organic traffic within 12 months. The website now ranks in the top 3 for 85% of target keywords, and organic leads increased by 320%. The improved SEO performance reduced dependency on paid advertising, resulting in significant cost savings while maintaining growth.',
    metrics: [
      {
        value: '450%',
        label: 'Organic Traffic',
        description: 'Year-over-year growth',
      },
      {
        value: '85%',
        label: 'Top 3 Rankings',
        description: 'For target keywords',
      },
      {
        value: '320%',
        label: 'Organic Leads',
        description: 'Increase in conversions',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },
  {
    id: 5,
    slug: 'paid-ads-campaign-excellence',
    title: 'Paid Ads Campaign Excellence',
    client: 'E-commerce Startup',
    category: 'Paid Ads',
    tags: ['Paid Ads', 'PPC', 'Conversion'],
    primaryMetric: {
      value: '280%',
      label: 'ROAS',
    },
    excerpt: 'Strategic paid advertising campaign that achieved 280% return on ad spend and increased revenue by 200% through optimized targeting and creative.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    challenge: 'The e-commerce startup was spending significant budget on paid advertising but not seeing the desired results. Their campaigns had low conversion rates, high cost per acquisition, and unclear targeting. They needed a data-driven approach to optimize their paid advertising strategy and improve ROI.',
    approach: 'We analyzed existing campaign performance and identified optimization opportunities. We restructured campaigns with better audience targeting, created compelling ad creatives with A/B testing, and optimized landing pages for conversion. We implemented advanced tracking and attribution models to understand the customer journey and optimize at each touchpoint.',
    results: 'The optimized paid advertising campaign achieved a 280% return on ad spend (ROAS) and increased overall revenue by 200%. Cost per acquisition decreased by 45%, and conversion rates improved by 120%. The campaign also provided valuable insights into customer behavior that informed broader marketing strategy.',
    metrics: [
      {
        value: '280%',
        label: 'ROAS',
        description: 'Return on ad spend',
      },
      {
        value: '200%',
        label: 'Revenue Increase',
        description: 'Year-over-year growth',
      },
      {
        value: '45%',
        label: 'Cost Reduction',
        description: 'Lower cost per acquisition',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },
]

export const caseStudyFilters = ['All', 'SEO', 'Paid Ads', 'Branding', 'Web']

// About page content — healthcare focus
export const aboutPageContent = {
  hero: {
    title: 'Who We Are',
    subtitle: 'Ensemble Digital Labs',
    description: 'Ensemble Digital Labs delivers digital transformation for healthcare practices. We help local clinics amplify their strengths, grow their brand, and drive patient growth fast. Vision meets execution and results speak for themselves.',
    tagline: 'Advancing Medical Practices Through Digital & AI Innovation',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80',
    video: null,
  },
  mission: {
    title: 'Our Mission',
    subtitle: 'Empowering Healthcare Providers',
    description: 'Running a successful medical practice today requires more than clinical expertise. We understand the challenges—competing with established groups, attracting new patients in a digital world, and administrative tasks that take you away from patient care. We help you compete and thrive with comprehensive digital and AI-powered solutions.',
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
    title: 'Why Choose Ensemble?',
    stats: [
      {
        id: 1,
        value: '✓',
        label: 'HIPAA-Compliant Approach',
        description: 'Every solution is designed with healthcare compliance in mind, ensuring the protection of patient information.',
      },
      {
        id: 2,
        value: '✓',
        label: 'Comprehensive One-Stop Solution',
        description: 'Everything your practice needs under one roof—from branding to automation—ensuring seamless integration and consistent results.',
      },
      {
        id: 3,
        value: '✓',
        label: 'Local Market Knowledge',
        description: 'Deep local experience with a cost-effective development team delivering enterprise-grade solutions.',
      },
      {
        id: 4,
        value: '✓',
        label: 'Healthcare Focused Expertise',
        description: 'Exclusive focus on medical practices backed by Fortune 100 healthcare industry experience and advanced technology expertise.',
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
  headline: 'Ready to Transform Your Practice?',
  subhead: 'Don\'t let digital marketing challenges hold your practice back. Whether it\'s building your online presence, automating administrative tasks, or competing with established healthcare groups, we have the expertise and solutions to help you succeed.',
  primaryCTA: {
    text: 'Get in Touch',
    link: '/contact',
  },
  secondaryCTA: {
    text: 'Our Services',
    link: '/services',
  },
}

// Contact / company info (footer, contact page)
export const contactInfo = {
  address: '11715 Administration Dr, Suite 103',
  cityStateZip: 'St. Louis, MO 63146',
  website: 'www.ensembledigitallabs.com',
  email: 'info@ensembledigitallabs.com',
  phone: '+1 (469) 704-0457',
}

// How our services help clients: outcome levels (Essentials → Growth → Dominate)
export const howWeHelpClients = [
  {
    id: 1,
    name: 'Essentials',
    description: 'Get the foundations in place—website, compliance, and basic visibility.',
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
    title: 'Our Services',
    subtitle: 'Comprehensive digital marketing solutions tailored to your business goals',
  },
  howWeWork: {
    hero: {
      icon: '✨',
      title: 'How We Delivers Results',
      description: 'Our proven process combines strategic thinking with creative execution to deliver exceptional results for your business.',
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
        description: 'We start by understanding your business, goals, target audience, and market position. Through workshops and research, we develop a comprehensive strategy that aligns with your objectives.',
        icon: '🔍',
        visualElements: {
          type: 'search',
          placeholder: 'What are your business goals?',
          tags: ['Market Research', 'Customer Insights', 'Competitive Analysis', 'Goal Setting'],
        },
      },
      {
        id: 2,
        step: 'Phase 2',
        title: 'Strategy & Design',
        description: 'Our team creates detailed strategies and designs that bring your vision to life. We focus on user experience, brand consistency, and measurable outcomes.',
        icon: '🎨',
        visualElements: {
          type: 'icons',
          items: ['Brand Identity', 'UX Design', 'Content Strategy', 'Visual Design'],
        },
      },
      {
        id: 3,
        step: 'Phase 3',
        title: 'Execution & Optimization',
        description: 'We implement the strategy with precision and continuously monitor performance. Through data-driven optimization, we ensure maximum ROI and long-term success.',
        icon: '🚀',
        visualElements: {
          type: 'team',
          members: ['Sarah', 'Michael', 'Emily', 'David', 'Jessica'],
          action: 'Schedule Consultation',
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
      answer: 'We combine strategic thinking with creative excellence and technical expertise. Our data-driven approach ensures measurable results, while our focus on user experience and brand consistency creates lasting impact. We\'re not just service providers—we\'re your strategic partners in growth.',
    },
  ],
}
