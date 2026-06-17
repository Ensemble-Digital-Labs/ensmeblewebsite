import { aiPages } from '../data/site/aiPages.js'

/** @typedef {{ id: string, step: string, eyebrow: string, title: string, subtitle: string, bullets: string[], body: string, tags?: string[], image?: string, imagePosition?: string }} AiCapability */

/** Focal point for parallax-inside art inside tall card crops (object-position). */
const AI_CARD_IMAGE_POSITION = {
  'predictive-patient-targeting': '52% 42%',
  'hipaa-compliance-monitoring': '66% 44%',
  'chatbot-lead-capture': '50% 52%',
  'campaign-optimization': '54% 46%',
  'patient-nurture-automation': '50% 50%',
}

function splitBullets(text) {
  return (text ?? '')
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean)
}

const AI_HUB = aiPages.find((page) => page.path === '/ai')

/** Merge hub cards + sub-page copy into one scrollable AI hub. */
export function getAiHubCapabilities() {
  const links = AI_HUB?.relatedLinks ?? []

  return links.map((link, index) => {
    const sub = aiPages.find((page) => page.path === link.to)
    const id = link.to.replace('/ai/', '')

    return {
      id,
      step: String(index + 1).padStart(2, '0'),
      eyebrow: sub?.eyebrow ?? 'AI · Capability',
      title: link.title,
      subtitle: link.description,
      bullets: splitBullets(link.description),
      body: sub?.sections?.[0]?.body ?? '',
      tags: link.tags ?? sub?.tags ?? [],
      image: link.image ?? '',
      imagePosition: link.imagePosition ?? AI_CARD_IMAGE_POSITION[id] ?? 'center center',
    }
  })
}

export const aiHubContent = {
  hero: {
    title: 'Governed AI for healthcare growth',
    subtitle:
      'Predictive targeting, workflow automation, and reporting — HIPAA-aware, measurable, and under your team\'s control.',
  },
  intro:
    AI_HUB?.sections?.[0]?.body ??
    'Predictive targeting, workflow automation, and reporting — HIPAA-aware, measurable, under your team\'s control.',
  headlineLines: ['Governed AI for', 'healthcare', 'growth'],
  stats: AI_HUB?.stats ?? [
    { value: '5', label: 'Capability playbooks' },
    { value: 'HIPAA', label: 'Governed workflows' },
    { value: '24/7', label: 'Intake coverage' },
  ],
  capabilities: getAiHubCapabilities(),
}

/** Legacy `/ai/:slug` → hash on unified hub. */
export function aiSlugToHubHash(slug) {
  if (!slug) return '/ai'
  const match = getAiHubCapabilities().find((cap) => cap.id === slug)
  return match ? `/ai#ai-${slug}` : '/ai'
}
