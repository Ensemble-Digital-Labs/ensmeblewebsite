import { cn } from '../../lib/utils'
import PopArtBigLetter from '../ui/PopArtBigLetter'

/** Large chapter letter — PopArt wipe reveal on scroll. */
export default function HomeChapterMonogram({ letter, className, delay = 0.12 }) {
  return (
    <PopArtBigLetter
      letter={letter}
      delay={delay}
      className={cn('home-chapter-monogram', className)}
    />
  )
}
