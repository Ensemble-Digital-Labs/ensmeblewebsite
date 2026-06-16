import { navLinks } from './navigation'
import { ensembleAsset } from '../lib/ensemble2026Assets'
import { ENSEMBLE_BLEND_ICONS, ENSEMBLE_CONTEXTUAL_ICONS } from '../lib/ensemble2026Icons'

const NAV_MENU_ICON_VERSION = '20260615'

/** @param {string} slug Filename without extension under `icons/nav-menu/` */
function navMenuIcon(slug, alt) {
  return {
    slug,
    src: `${ensembleAsset(`icons/nav-menu/${slug}.png`)}?v=${NAV_MENU_ICON_VERSION}`,
    alt,
    fit: 'contain',
    variant: 'nav-menu',
  }
}

/**
 * Primary nav icons — custom neon menu set in `public/ensemble-2026/icons/nav-menu/`.
 * AI + Contact still use blend/contextual icons until dedicated menu assets are added.
 */
const NAV_ICON_BY_PATH = {
  '/ai': ENSEMBLE_CONTEXTUAL_ICONS['ai-marketing-growth'],
  '/services': navMenuIcon('services', 'Healthcare services and digital ecosystem'),
  '/case-studies': navMenuIcon('case-studies', 'Case studies and practice growth outcomes'),
  '/blog': navMenuIcon('blogs', 'Blogs and growth analytics insights'),
  '/about': navMenuIcon('about', 'About Ensemble and clinical team'),
  '/contact': ENSEMBLE_BLEND_ICONS['telehealth-nurse'],
}

/**
 * Logo E accordion — left/right columns, three bars each, one logo color per item.
 * Left (cool): blue → orange → lime. Right (warm): teal → coral → purple.
 */
const NAV_LOGO_LAYOUT_BY_PATH = {
  '/ai': { column: 'left', row: 1, accent: 'blue', accentColor: '#1fa7f2' },
  '/services': { column: 'left', row: 2, accent: 'orange', accentColor: '#ffaf53' },
  '/case-studies': { column: 'right', row: 1, accent: 'teal', accentColor: '#3da993' },
  '/blog': { column: 'right', row: 2, accent: 'coral', accentColor: '#f77b74' },
  '/about': { column: 'left', row: 3, accent: 'lime', accentColor: '#d4c42a' },
  '/contact': { column: 'right', row: 3, accent: 'purple', accentColor: '#a857e5' },
}

export const navAppTiles = navLinks.map((link) => ({
  ...link,
  icon: NAV_ICON_BY_PATH[link.path],
  ...NAV_LOGO_LAYOUT_BY_PATH[link.path],
}))

export const navLogoColumns = {
  left: navAppTiles
    .filter((tile) => tile.column === 'left')
    .sort((a, b) => a.row - b.row),
  right: navAppTiles
    .filter((tile) => tile.column === 'right')
    .sort((a, b) => a.row - b.row),
}
