import { cn } from '../../lib/utils'
import { HomePhoto } from './influx/HomePhoto'

const LEFT_TILES = [
  { rotate: -8, tiltX: -10, tiltY: 18, float: 'a', aspect: 'aspect-[4/5]', slot: 'primary', objectPosition: '50% 22%' },
  { rotate: 11, tiltX: 7, tiltY: 22, float: 'c', aspect: 'aspect-[3/4]', slot: 'secondary', objectPosition: '50% 30%' },
]

const RIGHT_TILES = [
  { rotate: 9, tiltX: -9, tiltY: -18, float: 'b', aspect: 'aspect-[5/4]', slot: 'primary', objectPosition: '50% 28%' },
  { rotate: -10, tiltX: 6, tiltY: -20, float: 'd', aspect: 'aspect-[4/3]', slot: 'secondary', objectPosition: '50% 35%' },
]

function tileTiltStyle(meta) {
  return {
    '--hero-tile-rotate': `${meta.rotate}deg`,
    '--hero-tile-tilt-x': `${meta.tiltX}deg`,
    '--hero-tile-tilt-y': `${meta.tiltY}deg`,
  }
}

function HeroRailTile({ src, meta, side, slot, priority }) {
  if (!src) return null

  return (
    <div
      data-home-hero-tile
      data-home-hero-tile-rotate={meta.rotate}
      data-home-hero-rail-tile={slot}
      data-home-hero-rail-side={side}
      className={cn(
        'home-hero-rail-tile home-influx-masthead-tile absolute',
        side === 'left'
          ? `home-hero-rail-tile--l-${slot}`
          : `home-hero-rail-tile--r-${slot}`,
      )}
      style={tileTiltStyle(meta)}
    >
      <div className={cn('home-hero-collage__float', `home-hero-collage__float--${meta.float}`)}>
        <div
          className={cn(
            'home-hero-collage__frame overflow-hidden rounded-2xl border border-white/[0.12]',
            meta.aspect,
          )}
        >
          <HomePhoto
            src={src}
            alt=""
            priority={priority}
            objectPosition={meta.objectPosition}
            sizes="(max-width: 1024px) 22vw, 16vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/30 via-transparent to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}

/** Desktop/tablet flanking column — rotated photo tiles only. */
export default function HomeHeroSideRail({ side, images = [] }) {
  const tileMeta = side === 'left' ? LEFT_TILES : RIGHT_TILES

  return (
    <aside
      className={cn(
        'home-hero-rail relative hidden min-h-[clamp(24rem,40vw,32rem)] md:block',
        side === 'left' ? 'home-hero-rail--left' : 'home-hero-rail--right',
      )}
      aria-hidden
    >
      {images.map((src, i) => (
        <HeroRailTile
          key={`${side}-tile-${i}`}
          src={src}
          meta={tileMeta[i]}
          side={side}
          slot={tileMeta[i]?.slot ?? 'primary'}
          priority={i === 0}
        />
      ))}
    </aside>
  )
}
