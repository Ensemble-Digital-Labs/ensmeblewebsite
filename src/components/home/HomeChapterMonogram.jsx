import { cn } from '../../lib/utils'
import PopArtBigLetter, { bigLetterFromTitle } from '../ui/PopArtBigLetter'

/** Large chapter letter — PopArt wipe reveal on scroll; letter follows heading when omitted. */
export default function HomeChapterMonogram({ letter, title, className, delay = 0.12 }) {
  const resolved = letter ?? bigLetterFromTitle(title)
  if (!resolved) return null

  return (
    <PopArtBigLetter
      letter={resolved}
      delay={delay}
      className={cn('home-chapter-monogram', className)}
    />
  )
}
