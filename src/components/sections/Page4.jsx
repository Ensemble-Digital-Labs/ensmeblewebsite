import { useEffect } from 'react'
import { initImageReveal } from '../../lib/popprAnimations'
import { prefersReducedMotion } from '../../lib/utils'
import StandardCTA from '../StandardCTA'

function Page4() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const timer = setTimeout(() => {
      initImageReveal()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="page4"
      className="relative h-screen w-full flex flex-col items-center justify-center gap-[15vh]"
      data-scroll
      data-scroll-section
    >
      <div className="top text-text-primary uppercase tracking-[1px] text-[0.9vw]">
        <h4>featured insights</h4>
      </div>

      <div className="middle flex items-center gap-[10vw]">
        <div className="part part1 flex flex-col items-start gap-[5vh]">
          <div className="reveal-image absolute h-[12vw] w-[9vw] rounded-[15px] opacity-0 rotate-[-20deg] transition-all duration-1000 ease-out pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400"
              alt="VR in travel"
              className="h-[12vw] w-[9vw] object-cover rounded-[15px]"
            />
          </div>
          <h4 className="text-brand-secondary uppercase text-[0.9vw]">Virtual Reality</h4>
          <p className="text-text-primary text-[2.4vw] leading-tight">
            Digital discoveries: how VR is <br /> reshaping the travel industry
          </p>
          <a
            href="#"
            className="relative text-text-primary text-[1.3vw] no-underline transition-all duration-1000 ease-out hover:text-brand-primary"
          >
            Continue reading
            <span className="line1 absolute bottom-[-30%] left-0 h-[2px] w-0 bg-brand-secondary transition-all duration-1000 ease-out delay-100"></span>
            <span className="line2 absolute bottom-[-30%] right-0 h-[2px] w-full bg-brand-secondary transition-all duration-1000 ease-out"></span>
          </a>
        </div>

        <div className="part part2 flex flex-col items-start gap-[5vh]">
          <div className="reveal-image absolute h-[12vw] w-[9vw] rounded-[15px] opacity-0 rotate-[-20deg] transition-all duration-1000 ease-out pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400"
              alt="VR headset"
              className="h-[12vw] w-[9vw] object-cover rounded-[15px]"
            />
          </div>
          <h4 className="text-brand-primary uppercase text-[0.9vw]">Virtual Reality</h4>
          <p className="text-text-primary text-[2.4vw] leading-tight">
            Business headset heads-up: Pico <br /> finishes the Quest
          </p>
          <a
            href="#"
            className="relative text-text-primary text-[1.3vw] no-underline transition-all duration-1000 ease-out hover:text-brand-primary"
          >
            Continue reading
            <span className="line1 absolute bottom-[-30%] left-0 h-[2px] w-0 bg-brand-primary transition-all duration-1000 ease-out delay-100"></span>
            <span className="line2 absolute bottom-[-30%] right-0 h-[2px] w-full bg-brand-primary transition-all duration-1000 ease-out"></span>
          </a>
        </div>
      </div>

      <div className="third">
        <StandardCTA to="/insights" variant="outline" id="insight-btn" className="text-[1.1vw]">
          Discover more insights
        </StandardCTA>
      </div>
    </section>
  )
}

export default Page4
