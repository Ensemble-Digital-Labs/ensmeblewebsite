import { cn } from '../../lib/utils'
import HomeMaskReveal from './HomeMaskReveal'

/** Scroll-revealed capability pill strip (PopArt tech-tag pattern, healthcare stack). */
export default function HomeCapabilityTags({ tags, className }) {
  const list = Array.isArray(tags) ? tags : []
  if (!list.length) return null

  return (
    <ul
      data-home-mask-group
      className={cn(
        'home-capability-tags mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-2.5',
        className,
      )}
    >
      {list.map((tag, i) => (
        <li key={tag}>
          <HomeMaskReveal delay={i * 0.06} as="span" className="inline-block">
            <span className="home-capability-tag inline-flex rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/72 sm:px-3.5 sm:py-2 sm:text-[11px]">
              {tag}
            </span>
          </HomeMaskReveal>
        </li>
      ))}
    </ul>
  )
}
