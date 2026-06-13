/** Homepage copy — lamalama.com (extraction recreation) */

import { LAMA_LAMA_ASSETS } from './lamaLamaAssets'

export const LAMA_LAMA_NAV = [
  { label: 'Work', href: '#ll-work' },
  {
    label: 'What we do',
    href: '#ll-services',
    children: [
      { label: 'Branding', href: '#ll-services' },
      { label: 'Websites', href: '#ll-services' },
      { label: 'E-commerce', href: '#ll-services' },
      { label: 'Marketing', href: '#ll-services' },
    ],
  },
  { label: 'About us', href: '#ll-culture' },
  { label: 'Careers', href: '#ll-culture' },
  { label: 'Contact', href: '#ll-contact' },
]

export const LAMA_LAMA_HERO = {
  videoLabel: 'This is us',
  bracket: '[ We are Lama Lama ]',
  title: 'A creative digital agency that goes all in or not at all.',
  body:
    'We craft brands, products and experiences that hit harder, work smarter and connect deeper. With heart, with craft, and with a team that’s all in or not at all.',
  stats: [
    { value: '20+', label: 'digital freaks' },
    { value: 'Amsterdam', label: 'based' },
  ],
}

export const LAMA_LAMA_FEATURED_INTRO = {
  eyebrow: '[ Featured work ]',
  title:
    'We partner with brands that dare to lead and help them grow through digital. Here’s a taste of the work we’ve loved making and others have loved using.',
}

export const LAMA_LAMA_PROJECTS = [
  {
    id: 'hear',
    name: 'Hear',
    tags: ['Branding', 'Experience', 'Portfolio'],
    body:
      'A tight team of composers, music supervisors, and sound designers, united by one goal: the best sound for every story.',
    image: LAMA_LAMA_ASSETS.projects.hear,
    tone: '#1a1c1c',
  },
  {
    id: 'moov',
    name: 'Moov',
    tags: ['Branding', 'Corporate'],
    body:
      'Moov is a movement brand redefining fitness through sustainable routines. Real change starts with one step, then another.',
    image: LAMA_LAMA_ASSETS.projects.moov,
    tone: '#302020',
  },
  {
    id: 'gardeners',
    name: 'Gardeners',
    tags: ['Experience', 'Portfolio'],
    body:
      'Sharp at work and lighthearted in our approach. A creative and committed team without egos, with attention to you, your brand, and the work.',
    image: LAMA_LAMA_ASSETS.projects.gardeners,
    tone: '#2a3d32',
  },
  {
    id: 'neurons',
    name: 'Neurons Lab',
    tags: ['Corporate', 'Portfolio'],
    body:
      'AI transformation services to guide organizations into the new era of AI — leadership alignment with technology integration.',
    image: LAMA_LAMA_ASSETS.projects.neurons,
    tone: '#1f2433',
  },
]

export const LAMA_LAMA_SERVICES = {
  eyebrow: 'What we do.',
  body:
    'We create meaningful brands, design digital experiences that move people and build products that perform. Sharp design, smart code and marketing that drives impact.',
  phone: '+31 20 6220440',
  columns: [
    {
      title: '[ Branding ]',
      items: ['Brand identity', 'Logo design', 'Campaign', 'Motion design', 'Photo direction', 'Video direction', '3D'],
    },
    {
      title: '[ Digital ]',
      items: [
        'Digital strategy',
        'Content',
        'UI/UX Design',
        'Art direction',
        'Digital design',
        'Front-end development',
        'Back-end development',
        'E-commerce',
      ],
    },
    {
      title: '[ Market ]',
      items: [
        'Growth Strategy',
        'B2B Lead Generation',
        'Paid Media',
        'Inbound Marketing',
        'Content Activation',
        'SEO & Organic Growth',
        'AI Optimization',
      ],
    },
  ],
}

export const LAMA_LAMA_CLIENTS = LAMA_LAMA_ASSETS.clients

export const LAMA_LAMA_CULTURE = {
  location: 'Based in the beating heart of Amsterdam',
  body:
    'We’re a crew that works hard, thinks sharp and keeps the vibe solid. No politics, no games. Just people who care, push and create.',
  cta: 'Our culture',
}

export const LAMA_LAMA_CONTACT = {
  eyebrow: '[ Get in touch ]',
  title: 'Brief us something.',
  phone: '+31 20 6220440',
  body: 'Feel free to reach out and discuss your project. We’ll make it sharper.',
}
