// Home page content data

export const heroContent = {
  headline: 'We Transform Brands Through Digital Excellence',
  subhead: 'Premium digital marketing solutions that drive growth, engagement, and measurable results for forward-thinking brands.',
  primaryCTA: {
    text: 'Start Your Project',
    link: '/contact',
  },
  secondaryCTA: {
    text: 'View Our Work',
    link: '/casestudies',
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
    accent: 'from-[#3B82F6] to-[#8B5CF6]',
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

// About page content
export const aboutPageContent = {
  hero: {
    title: 'About Ensemble',
    subtitle: 'Who We Are',
    description: 'Ensemble Digital Labs is a premium digital marketing agency dedicated to transforming brands through innovative digital experiences. We combine strategic thinking, creative excellence, and technical expertise to deliver results that matter.',
    tagline: 'Crafting Digital Legacies',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80', // High-tech/Atmospheric office or lab
    video: null, // Placeholder for potential cinematic video background
  },
  mission: {
    title: 'Our Mission',
    subtitle: 'Transforming Imagination into Reality',
    description: 'To empower forward-thinking brands with digital solutions that drive growth, build lasting connections, and create measurable impact.',
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80',
  },
  vision: {
    title: 'Our Vision',
    subtitle: 'Building the Future Together',
    description: 'To be the leading force in digital transformation, setting new standards for creativity and technical excellence in the global market.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
  },
  values: {
    title: 'Our Values',
    subtitle: 'Excellence, Innovation, Partnership',
    description: 'We strive for excellence, embrace cutting-edge technologies, and build lasting relationships with our clients.',
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
    title: 'Why Clients Choose Us',
    stats: [
      {
        id: 1,
        value: '50+',
        label: 'Projects Delivered',
        description: 'Successfully completed projects',
      },
      {
        id: 2,
        value: '98%',
        label: 'Client Satisfaction',
        description: 'Happy clients and counting',
      },
      {
        id: 3,
        value: '15+',
        label: 'Team Members',
        description: 'Expert professionals',
      },
      {
        id: 4,
        value: '10+',
        label: 'Years Experience',
        description: 'In digital marketing',
      },
    ],
  },
}

export const processSteps = [
  {
    id: 1,
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your business, goals, and target audience to understand what makes you unique.',
  },
  {
    id: 2,
    step: '02',
    title: 'Strategy',
    description: 'We develop a comprehensive strategy tailored to your objectives and market positioning.',
  },
  {
    id: 3,
    step: '03',
    title: 'Execution',
    description: 'Our team brings the strategy to life with precision, creativity, and attention to detail.',
  },
  {
    id: 4,
    step: '04',
    title: 'Optimization',
    description: 'We continuously monitor, analyze, and optimize to ensure maximum performance and ROI.',
  },
]

export const testimonialsPreview = [
  {
    id: 1,
    quote: 'Working with Ensemble transformed our digital presence. The results exceeded all expectations, and the team\'s expertise is unmatched. We saw immediate improvements in engagement and conversions.',
    author: 'Sarah Johnson',
    role: 'CEO',
    company: 'Tech Innovations',
  },
  {
    id: 2,
    quote: 'The strategic approach and creative execution delivered exactly what we needed. Our brand has never been stronger, and we\'ve seen consistent growth month over month.',
    author: 'Michael Chen',
    role: 'Marketing Director',
    company: 'Global Brands Inc.',
  },
  {
    id: 3,
    quote: 'Outstanding service from start to finish. They understood our vision and brought it to life with exceptional results. The team is professional, creative, and results-driven.',
    author: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Startup Ventures',
  },
]

export const ctaContent = {
  headline: 'Ready to Transform Your Digital Presence?',
  subhead: 'Let\'s discuss how we can help you achieve your business goals with premium digital marketing solutions.',
  primaryCTA: {
    text: 'Schedule a Consultation',
    link: '/contact',
  },
  secondaryCTA: {
    text: 'View Our Portfolio',
    link: '/casestudies',
  },
}

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
