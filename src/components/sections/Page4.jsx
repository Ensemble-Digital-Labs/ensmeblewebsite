import { useEffect, useRef, useState } from 'react'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'
import { initImageReveal } from '../../lib/popprAnimations'
import StandardCTA from '../StandardCTA'
import SparklesCore from '../ui/SparklesCore'

function Page4() {
  const sectionRef = useRef(null)
  useCinematicSectionReveal(sectionRef)

  const [particleDensity, setParticleDensity] = useState(72)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setParticleDensity(mq.matches ? 42 : 72)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Re-run after this section mounts so `.part` hover previews bind even if `initAllAnimations`
  // ran before loader revealed Home (no-op first pass). Safe if already bound (deduped in init).
  useEffect(() => {
    const t = window.setTimeout(() => initImageReveal(), 600)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="page4"
      className="relative min-h-screen h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#030712] text-white"
      data-scroll
    >
      <div className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-center gap-[12vh] sm:gap-[15vh] overflow-x-hidden">
      {/* Atmospheric base + sparkles (tsparticles) — no scroll-linked y% here so pin + scrub stays clean */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#071018] via-[#030712] to-[#020617]"
          aria-hidden
        />
        <SparklesCore
          className="absolute inset-0 opacity-90"
          background="transparent"
          particleColor="#bae6fd"
          particleDensity={particleDensity}
          minSize={0.4}
          maxSize={1.8}
          speed={1.8}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_40%,transparent_0%,rgba(2,6,12,0.75)_70%)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[min(96vw,1400px)] flex-col items-center justify-center gap-[12vh] sm:gap-[15vh] px-4 sm:px-6">
      <div
        data-cinematic-reveal="lead"
        className="top text-center text-cyan-200/90 uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-[0.85vw]"
      >
        <h4 className="font-medium">featured insights</h4>
      </div>

      <div
        data-cinematic-reveal="block"
        className="middle flex flex-col md:flex-row items-stretch md:items-center gap-10 md:gap-[8vw] lg:gap-[10vw] w-full justify-center"
      >
        <div className="part part1 relative flex flex-col items-start gap-4 sm:gap-[4vh] md:gap-[5vh] max-w-xl md:max-w-none">
          <div className="reveal-image absolute left-0 top-0 h-[12vw] min-h-[100px] w-[9vw] min-w-[76px] rounded-[15px] opacity-0 rotate-[-20deg] transition-opacity duration-300 ease-out pointer-events-none z-20 will-change-[opacity,transform]">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400"
              alt="VR in travel"
              className="h-[12vw] min-h-[100px] w-[9vw] min-w-[76px] object-cover rounded-[15px]"
            />
          </div>
          <h4 className="text-cyan-300/90 uppercase tracking-[0.12em] text-[10px] sm:text-xs md:text-sm font-medium">
            Virtual Reality
          </h4>
          <p className="text-white/90 text-xl sm:text-2xl md:text-[clamp(1.25rem,2.2vw,2.25rem)] leading-snug font-medium">
            Digital discoveries: how VR is <br className="hidden sm:block" /> reshaping the travel industry
          </p>
          <a
            href="#"
            className="relative text-white/75 text-sm sm:text-base md:text-lg no-underline transition-colors duration-300 ease-out hover:text-cyan-300"
          >
            Continue reading
            <span className="line1 absolute bottom-[-30%] left-0 h-[2px] w-0 bg-cyan-400/80 transition-all duration-1000 ease-out delay-100"></span>
            <span className="line2 absolute bottom-[-30%] right-0 h-[2px] w-full bg-cyan-400/80 transition-all duration-1000 ease-out"></span>
          </a>
        </div>

        <div className="part part2 relative flex flex-col items-start gap-4 sm:gap-[4vh] md:gap-[5vh] max-w-xl md:max-w-none">
          <div className="reveal-image absolute left-0 top-0 h-[12vw] min-h-[100px] w-[9vw] min-w-[76px] rounded-[15px] opacity-0 rotate-[-20deg] transition-opacity duration-300 ease-out pointer-events-none z-20 will-change-[opacity,transform]">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400"
              alt="VR headset"
              className="h-[12vw] min-h-[100px] w-[9vw] min-w-[76px] object-cover rounded-[15px]"
            />
          </div>
          <h4 className="text-cyan-400/95 uppercase tracking-[0.12em] text-[10px] sm:text-xs md:text-sm font-medium">
            Virtual Reality
          </h4>
          <p className="text-white/90 text-xl sm:text-2xl md:text-[clamp(1.25rem,2.2vw,2.25rem)] leading-snug font-medium">
            Business headset heads-up: Pico <br className="hidden sm:block" /> finishes the Quest
          </p>
          <a
            href="#"
            className="relative text-white/75 text-sm sm:text-base md:text-lg no-underline transition-colors duration-300 ease-out hover:text-cyan-300"
          >
            Continue reading
            <span className="line1 absolute bottom-[-30%] left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-1000 ease-out delay-100"></span>
            <span className="line2 absolute bottom-[-30%] right-0 h-[2px] w-full bg-cyan-400 transition-all duration-1000 ease-out"></span>
          </a>
        </div>
      </div>

      <div data-cinematic-reveal="block" className="third">
        <StandardCTA
          to="/insights"
          variant="outline"
          id="insight-btn"
          className="!rounded-xl !border-white/25 !text-white/95 !bg-white/[0.04] hover:!bg-white/[0.09] hover:!border-white/40 text-sm sm:text-base px-6 py-3"
        >
          Discover more insights
        </StandardCTA>
      </div>
      </div>
      </div>
    </section>
  )
}

export default Page4
