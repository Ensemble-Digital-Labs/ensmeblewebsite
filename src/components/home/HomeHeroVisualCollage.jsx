import { cn } from '../../lib/utils'
import { HomePhoto } from './influx/HomePhoto'

/** Per-tile layout — organic collage with perspective tilt, not flat rotation. */
const COLLAGE_TILES = [
  {
    key: 'main',
    rotate: -6,
    tiltX: -8,
    tiltY: 4,
    float: 'a',
    sizes: '(max-width: 768px) 78vw, 38vw',
    className:
      'home-hero-collage__tile--main z-[3] w-[min(100%,20rem)] sm:w-[min(90%,24rem)] lg:w-[clamp(15rem,38%,22rem)]',
    aspect: 'aspect-[4/5]',
    objectPosition: '50% 22%',
    priority: true,
  },
  {
    key: 'top-right',
    rotate: 10,
    tiltX: -6,
    tiltY: -12,
    float: 'b',
    sizes: '(max-width: 768px) 42vw, 18vw',
    className:
      'home-hero-collage__tile--tr z-[5] w-[clamp(7rem,44%,11rem)] sm:w-[clamp(7.5rem,40%,12rem)] lg:w-[clamp(8.5rem,24%,12.5rem)]',
    aspect: 'aspect-[5/4]',
    objectPosition: '50% 28%',
    priority: true,
  },
  {
    key: 'mid-left',
    rotate: -12,
    tiltX: 8,
    tiltY: 14,
    float: 'c',
    sizes: '(max-width: 768px) 44vw, 20vw',
    className:
      'home-hero-collage__tile--ml z-[4] w-[clamp(7.5rem,48%,12rem)] sm:w-[clamp(8rem,42%,12.5rem)] lg:w-[clamp(9rem,26%,13rem)]',
    aspect: 'aspect-[3/4]',
    objectPosition: '50% 30%',
    priority: false,
  },
  {
    key: 'bottom-right',
    rotate: 7,
    tiltX: 5,
    tiltY: -10,
    float: 'd',
    sizes: '(max-width: 768px) 40vw, 17vw',
    className:
      'home-hero-collage__tile--br z-[2] w-[clamp(6.75rem,42%,10.5rem)] sm:w-[clamp(7.25rem,38%,11rem)] lg:w-[clamp(8rem,22%,11.25rem)]',
    aspect: 'aspect-[4/3]',
    objectPosition: '50% 35%',
    priority: false,
  },
]

function tileTiltStyle(tile) {
  return {
    '--hero-tile-rotate': `${tile.rotate}deg`,
    '--hero-tile-tilt-x': `${tile.tiltX}deg`,
    '--hero-tile-tilt-y': `${tile.tiltY}deg`,
  }
}

/** Hero masthead — scattered editorial collage with light rotation and overlap. */
export default function HomeHeroVisualCollage({ images = [] }) {
  const tiles = COLLAGE_TILES.map((tile, i) => ({
    ...tile,
    src: images[i],
  })).filter((tile) => tile.src)

  if (tiles.length === 0) return null

  return (
    <div
      className="home-hero-collage relative mx-auto w-full max-w-[min(100%,44rem)] lg:max-w-3xl xl:max-w-4xl"
      aria-hidden
    >
      {tiles.map((tile) => (
        <div
          key={tile.key}
          data-home-hero-tile
          data-home-hero-collage-layer={tile.key}
          data-home-hero-tile-rotate={tile.rotate}
          className={cn(
            'home-hero-collage__tile home-influx-masthead-tile absolute',
            tile.className,
          )}
          style={tileTiltStyle(tile)}
        >
          <div className={cn('home-hero-collage__float', `home-hero-collage__float--${tile.float}`)}>
            <div
              className={cn(
                'home-hero-collage__frame overflow-hidden rounded-2xl border border-white/[0.12] sm:rounded-[18px]',
                tile.aspect,
              )}
            >
              <HomePhoto
                src={tile.src}
                alt=""
                priority={tile.priority}
                objectPosition={tile.objectPosition}
                sizes={tile.sizes}
                className="transition-transform duration-700 hover:scale-[1.04] motion-reduce:hover:scale-100"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
