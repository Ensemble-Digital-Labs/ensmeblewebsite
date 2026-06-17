import { contactInfo } from '../lib/content'

const phoneTel = contactInfo.phone.replace(/[^\d+]/g, '')

/** Fixed left-rail social dock — keep in sync with footer socials where possible. */
export const SITE_SOCIAL_LINKS = [
  { platform: 'linkedin', href: 'https://www.linkedin.com/company/ensemble-digital-labs' },
  { platform: 'instagram', href: 'https://www.instagram.com/ensembledigitallabs' },
  { platform: 'facebook', href: 'https://www.facebook.com/ensembledigitallabs' },
  { platform: 'mail', href: `mailto:${contactInfo.email}` },
  { platform: 'phone', href: `tel:${phoneTel}`, label: contactInfo.phone },
]
