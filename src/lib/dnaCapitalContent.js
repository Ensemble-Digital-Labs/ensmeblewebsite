/** Public copy structure from dnacapital.com — dev preview / recreation only. */

export const DNA_CAPITAL_NAV = [
  { id: 'hero', label: 'Our DNA', href: '#dna-clone-hero' },
  { id: 'approach', label: 'Approach', href: '#approach' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'companies', label: 'Companies', href: '#our-dna' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const DNA_CAPITAL_STATS_HERO = [
  { value: 27, suffix: '', label: 'Healthcare companies we have partnered with to-date' },
  { value: 30, suffix: 'M+', label: 'Million patients treated annually by our companies' },
]

export const DNA_CAPITAL_STATS_APPROACH = [
  { value: 80, suffix: '+', label: 'Acquisitions by our companies' },
  { value: 1, suffix: '', label: 'Sector in which we invest' },
]

export const DNA_CAPITAL_SECTIONS = [
  {
    id: 'our-dna',
    eyebrow: 'Companies',
    title: 'We help build companies transforming healthcare',
    body: 'We partner with exceptional founders and management teams across all stages to build leading healthcare businesses.',
    columns: [
      {
        title: 'Early\nStage',
        body: 'We partner with early-stage companies that have the potential to shape the future of healthcare.',
      },
      {
        title: 'Late\nStage',
        body: 'We work across the length and breadth of healthcare, partnering with companies that share our passion for high-quality, ethical and humane products and services.',
      },
    ],
  },
  {
    id: 'team',
    eyebrow: 'Team',
    title: 'We have deep healthcare experience',
    body: 'Our team is passionate about solving healthcare problems facing humanity. We have invested in and operated multiple businesses. We value strong partnerships with founders and management teams and we stand behind our companies through their evolution.',
  },
  {
    id: 'approach',
    eyebrow: 'Approach',
    title: 'We work hand in hand with our companies to accelerate growth',
    body: 'With our capital, experienced partners, investment professionals, operators and network of advisors, we help healthcare businesses thrive.',
    body2:
      'We are experts in fueling the best companies that want to be the driving force of the future of healthcare.',
    stats: DNA_CAPITAL_STATS_APPROACH,
  },
]
