import { BarChart3, Brain, Clapperboard, Globe2, Laptop, LineChart, Server } from 'lucide-react'
import { services } from '../data/services'

export const SERVICE_PATHS = {
  1: '/services/software-product',
  2: '/services/it-infrastructure',
  3: '/services/websites-local-seo',
  4: '/services/performance-marketing',
  5: '/services/creative-production',
}

export const SERVICE_ICONS = {
  1: Laptop,
  2: Server,
  3: Globe2,
  4: LineChart,
  5: Clapperboard,
}

const CAPABILITY_ICONS = {
  'Governed AI': Brain,
  'Analytics & reporting': BarChart3,
}

const FALLBACK_ACCENTS = [
  'from-[#10B981] to-[#3B82F6]',
  'from-[#64748B] to-[#f17245]',
  'from-[#3B82F6] to-[#6366F1]',
  'from-[#EC4899] to-[#F97316]',
  'from-[#C084FC] to-[#E879F9]',
]

export function findServiceByTitle(title) {
  return services.find((s) => s.title === title)
}

export function accentForServiceTitle(title, fallbackIndex = 0) {
  return findServiceByTitle(title)?.accent ?? FALLBACK_ACCENTS[fallbackIndex % FALLBACK_ACCENTS.length]
}

export function imageForServiceTitle(title, fallbackIndex = 0) {
  return findServiceByTitle(title)?.image ?? services[fallbackIndex % services.length]?.image
}

export function iconForServiceTitle(title, serviceId) {
  if (serviceId && SERVICE_ICONS[serviceId]) return SERVICE_ICONS[serviceId]
  return CAPABILITY_ICONS[title] ?? Laptop
}

export { contextualIconForServiceTitle } from './ensemble2026Icons'

export function pathForServiceId(serviceId, fallback = '/services') {
  return SERVICE_PATHS[serviceId] ?? fallback
}
