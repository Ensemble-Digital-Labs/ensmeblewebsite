import { BsAmazon, BsGoogle, BsSpotify, BsYoutube } from 'react-icons/bs'
import { cn } from '../../lib/utils'

const BRANDS = [
  { Icon: BsSpotify, label: 'Spotify' },
  { Icon: BsYoutube, label: 'YouTube' },
  { Icon: BsAmazon, label: 'Amazon' },
  { Icon: BsGoogle, label: 'Google' },
]

/**
 * Infinite brand row — four duplicated segments + CSS `translateX(-25%)` loop.
 * Matches the common “BrandScroller” pattern (react-icons + mask + marquee).
 */
function BrandScroller({ className = '', reverse = false }) {
  return (
    <div
      className={cn(
        'group flex max-w-full flex-row overflow-hidden py-2 [--duration:40s] [--gap:2rem]',
        '[gap:var(--gap)]',
        '[mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0))]',
        '[-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0))]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 flex-row items-center',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex shrink-0 flex-row items-center justify-around gap-[var(--gap)]"
          >
            {BRANDS.map(({ Icon, label }) => (
              <div key={`${i}-${label}`} className="flex w-28 shrink-0 items-center gap-3">
                <Icon className="shrink-0 text-2xl text-white/90" aria-hidden />
                <p className="text-lg font-semibold text-white/80">{label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandScrollerReverse({ className = '' }) {
  return <BrandScroller className={className} reverse />
}

export { BrandScroller, BrandScrollerReverse }
