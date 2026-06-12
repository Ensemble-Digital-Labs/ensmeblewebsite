import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeDeckActs'
import { scrollMainToTarget } from '../../lib/utils'
import HomeSectionIndex from './HomeSectionIndex'

const HomeStoryContext = createContext(null)

export function useHomeStory() {
  return useContext(HomeStoryContext)
}

/** Home `/`: continuous scroll through all sections (no act pin / cutoff). */
export default function HomeStoryViewport({ children }) {
  const location = useLocation()
  const [activeSectionId, setActiveSectionId] = useState(
    HOME_NARRATIVE_SECTIONS[0]?.id ?? '',
  )

  const goToSlideById = useCallback((sectionId) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    scrollMainToTarget(el, { duration: 0.88 })
    setActiveSectionId(sectionId)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const main = document.querySelector('#main')
    if (!main) return undefined

    const sections = HOME_NARRATIVE_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    )

    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id)
        }
      },
      { root: main, rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.12, 0.35, 0.6] },
    )

    sections.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [location.pathname])

  const value = useMemo(
    () => ({
      activeSectionId,
      setActiveSectionId,
      goToSlideById,
      narrative: HOME_NARRATIVE_SECTIONS,
    }),
    [activeSectionId, goToSlideById],
  )

  if (location.pathname !== '/') {
    return <>{children}</>
  }

  return (
    <HomeStoryContext.Provider value={value}>
      <HomeSectionIndex />
      <div id="home-scroll-story-region" className="relative w-full">
        {children}
      </div>
    </HomeStoryContext.Provider>
  )
}
