import Container from '../ui/Container'

function Page2() {
  return (
    <section
      id="page2"
      className="relative h-[60vh] w-full flex items-center justify-center"
      data-scroll
      data-scroll-section
    >
      <div className="text-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-[10vw] w-[60%] items-start">
        <div className="sel-wrk">
          <h4 className="text-[1vw] text-brand-primary uppercase tracking-[2px]">Selected Work</h4>
        </div>
        <div className="main-txt text-white text-[2.7vw] leading-tight tracking-[-1px]">
          Enjoy some of our best work<br />
          in immersive <span id="col1" className="text-[#018BCF]">web</span>,<br />
          <span id="col2" className="text-[#D6D6D2]">augmented reality</span> and{' '}
          <span id="col3" className="text-[#DFB679]">virtual<br />reality</span> experience
        </div>
      </div>
    </section>
  )
}

export default Page2
