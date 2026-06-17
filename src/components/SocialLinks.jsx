import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Share2, X } from 'lucide-react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa6'
import { cn } from '../lib/utils'

function isSameWindowHref(href) {
  return href.startsWith('mailto:') || href.startsWith('tel:')
}

/** @typedef {'linkedin' | 'instagram' | 'github' | 'mail' | 'facebook' | 'x' | 'dribbble' | 'website' | 'phone'} Platform */

/** @type {Record<string, { label: string, icon: import('react').ComponentType<{ size?: number, className?: string }>, gradient: string, hoverGradient: string, expandWidth?: string }>} */
const PLATFORM_STYLES = {
  linkedin: {
    label: 'LinkedIn',
    icon: FaLinkedin,
    gradient: 'from-blue-600 to-blue-400',
    hoverGradient: 'from-blue-500 to-blue-300',
  },
  instagram: {
    label: 'Instagram',
    icon: FaInstagram,
    gradient: 'from-pink-600 via-purple-600 to-orange-500',
    hoverGradient: 'from-pink-500 via-purple-500 to-orange-400',
  },
  mail: {
    label: 'Mail',
    icon: FaEnvelope,
    gradient: 'from-cyan-600 to-blue-500',
    hoverGradient: 'from-cyan-500 to-blue-400',
  },
  facebook: {
    label: 'Facebook',
    icon: FaFacebook,
    gradient: 'from-blue-700 to-blue-500',
    hoverGradient: 'from-blue-600 to-blue-400',
  },
  phone: {
    label: 'Call',
    icon: FaPhone,
    gradient: 'from-orange-500 to-amber-400',
    hoverGradient: 'from-orange-400 to-amber-300',
    expandWidth: 'w-52',
  },
}

/**
 * Left-edge social rail (desktop) + bottom-left mobile dock.
 * Portaled to `document.body` so peek tabs are not clipped by `overflow-x: hidden`.
 * @param {{ links: Array<{ platform: string, href: string, label?: string }>, showOnMobile?: boolean, className?: string }} props
 */
export default function SocialLinks({
  links,
  showOnMobile = true,
  className,
}) {
  const [hoveredPlatform, setHoveredPlatform] = useState(null)
  const [mobileDockOpen, setMobileDockOpen] = useState(false)

  if (!links?.length || typeof document === 'undefined') return null

  return createPortal(
    <>
      {/* Desktop — icon tips always visible at left edge; expand on hover */}
      <nav
        className={cn(
          showOnMobile ? 'hidden lg:block' : 'hidden md:block',
          'ensemble-social-rail pointer-events-none fixed left-0 top-[35%] z-[999990]',
          className,
        )}
        aria-label="Social links"
      >
        <ul className="pointer-events-auto flex flex-col gap-2">
          {links.map(({ platform, href, label: linkLabel }) => {
            const style = PLATFORM_STYLES[platform]
            if (!style) return null
            const Icon = style.icon
            const displayLabel = linkLabel ?? style.label

            return (
              <li
                key={platform}
                className="group"
                onMouseEnter={() => setHoveredPlatform(platform)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                <a
                  href={href}
                  target={isSameWindowHref(href) ? undefined : '_blank'}
                  rel={isSameWindowHref(href) ? undefined : 'noreferrer'}
                  aria-label={platform === 'phone' ? `Call ${displayLabel}` : displayLabel}
                  className={cn(
                    'relative flex h-10 w-7 items-center justify-center overflow-hidden rounded-r-lg border border-white/12 bg-[#0C0E13]/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[width,height,padding,box-shadow] duration-500 ease-out group-hover:h-12 group-hover:justify-start group-hover:gap-2.5 group-hover:px-3 group-hover:shadow-[0_14px_40px_-14px_rgba(0,0,0,0.75)] group-focus-within:h-12 group-focus-within:justify-start group-focus-within:gap-2.5 group-focus-within:px-3',
                    style.expandWidth === 'w-52'
                      ? 'group-hover:w-52 group-focus-within:w-52'
                      : 'group-hover:w-44 group-focus-within:w-44',
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-r opacity-95 transition-all duration-500',
                      hoveredPlatform === platform ? style.hoverGradient : style.gradient,
                    )}
                    aria-hidden
                  />
                  <Icon
                    size={16}
                    className="relative z-10 h-4 w-4 shrink-0 text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="relative z-10 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wide text-white opacity-0 transition-all duration-300 group-hover:max-w-[11rem] group-hover:opacity-100 group-hover:tracking-wide group-focus-within:max-w-[11rem] group-focus-within:opacity-100">
                    {displayLabel}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile — bottom-left dock (matches contact orb FAB) */}
      {showOnMobile ? (
        <div
          className={cn('ensemble-social-dock lg:hidden', mobileDockOpen && 'is-open')}
        >
          {mobileDockOpen ? (
            <button
              type="button"
              className="ensemble-social-dock__backdrop"
              aria-label="Close social links"
              onClick={() => setMobileDockOpen(false)}
            />
          ) : null}

          <div className="relative">
            <div className="ensemble-social-dock__stack">
              {links.map(({ platform, href, label: linkLabel }, index) => {
                const style = PLATFORM_STYLES[platform]
                if (!style) return null
                const Icon = style.icon
                const displayLabel = linkLabel ?? style.label

                return (
                  <a
                    key={platform}
                    href={href}
                    target={isSameWindowHref(href) ? undefined : '_blank'}
                    rel={isSameWindowHref(href) ? undefined : 'noreferrer'}
                    aria-label={platform === 'phone' ? `Call ${displayLabel}` : displayLabel}
                    className="ensemble-social-dock__orb ensemble-social-dock__link-orb"
                    style={{ animationDelay: mobileDockOpen ? `${0.08 + index * 0.1}s` : '0s' }}
                    onClick={() => setMobileDockOpen(false)}
                  >
                    <Icon size={24} className="text-white" aria-hidden />
                  </a>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileDockOpen((open) => !open)}
              className="ensemble-social-dock__orb ensemble-social-dock__toggle"
              aria-label={mobileDockOpen ? 'Close social links' : 'Open social links'}
              aria-expanded={mobileDockOpen}
            >
              {mobileDockOpen ? <X size={24} aria-hidden /> : <Share2 size={24} aria-hidden />}
            </button>
          </div>
        </div>
      ) : null}
    </>,
    document.body,
  )
}
