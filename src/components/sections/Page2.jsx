function Page2() {
  return (
    <section
      id="page2"
      className="relative min-h-0 md:min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary py-6 px-4 md:py-0 md:px-0"
      data-scroll
      data-scroll-section
    >
      <div
        data-parallax-layers
        className="relative flex w-full max-w-none flex-col items-center justify-center overflow-hidden md:min-h-[56vh]"
      >
      {/* Blend from Hero (#page1): dark space + horizon hues → page surface */}
      <div
        data-parallax-layer="1"
        data-parallax-y="46"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(56vh,460px)]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #000000 0%, #060a0e 14%, #0e141c 38%, #161d26 58%, rgba(250, 250, 250, 0) 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[min(28vh,220px)] bg-gradient-to-b from-cyan-400/12 via-violet-500/6 to-transparent mix-blend-screen opacity-80" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(34,211,238,0.08)_0%,transparent_58%)]" />
        <div className="absolute inset-x-0 top-[min(18vh,120px)] h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent opacity-70" />
      </div>

      <div
        data-parallax-layer="2"
        data-parallax-y="17"
        className="text-content relative z-10 w-full max-w-[90%] md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col gap-6 md:flex-row md:gap-[10vw] md:w-[60%] md:max-w-none items-start"
      >
        <div className="sel-wrk">
          <h4 className="text-xs md:text-[1vw] text-brand-primary uppercase tracking-[2px] font-medium">Selected Work</h4>
        </div>
        <div className="main-txt text-text-primary text-lg leading-snug tracking-[-0.5px] md:text-[2.7vw] md:leading-tight md:tracking-[-1px]">
          <span id="col1" className="text-[#018BCF]">Explore our best work in healthcare websites and medical SEO</span>
          <br />
          <span id="col2" className="text-[#B45309]">and digital patient growth.</span>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Page2
