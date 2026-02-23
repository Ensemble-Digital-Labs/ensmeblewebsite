import Container from '../ui/Container'

function Page2() {
  return (
    <section
      id="page2"
      className="relative min-h-0 md:min-h-[60vh] w-full flex items-center justify-center py-6 px-4 md:py-0 md:px-0"
      data-scroll
      data-scroll-section
    >
      <div className="text-content w-full max-w-[90%] md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col gap-6 md:flex-row md:gap-[10vw] md:w-[60%] md:max-w-none items-start">
        <div className="sel-wrk">
          <h4 className="text-xs md:text-[1vw] text-brand-primary uppercase tracking-[2px] font-medium">Selected Work</h4>
        </div>
        <div className="main-txt text-text-primary text-lg leading-snug tracking-[-0.5px] md:text-[2.7vw] md:leading-tight md:tracking-[-1px]">
          <span id="col1" className="text-[#018BCF]">Explore our best work in healthcare websites and medical SEO</span>
          <br />
          <span id="col2" className="text-[#B45309]">and digital patient growth.</span>
        </div>
      </div>
    </section>
  )
}

export default Page2
