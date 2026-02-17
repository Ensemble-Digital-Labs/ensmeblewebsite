function Page5() {
  return (
    <section
      id="page5"
      className="relative h-[80vh] w-full mt-[-10vh]"
      data-scroll
      data-scroll-section
    >
      <div className="main-text2 absolute top-[40%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 font-antique text-[4vw] w-[60vw] flex flex-col leading-[8vw] text-white">
        <span>
          <h1 className="tracking-[-0.5vw]">let's make</h1>
        </span>
        <span id="m-txt" className="flex items-center justify-between relative left-[-8vw]">
          <h1 className="tracking-[-0.5vw]">great work</h1>
          <button className="menu nav-cta responsive-btn mt2-btn bg-[#FFD074] border-none rounded-[5vw] px-[2vw] py-[1vw] font-bold relative overflow-hidden">
            <span className="button-inner">
              <span className="button-inner-static initial">
                <p>Get in touch</p>
              </span>
              <span className="button-inner-hover hovered hovered-mtxt">
                <p>Get in touch</p>
              </span>
            </span>
            <div id="an-cir1" className="anim-circle"></div>
            <div id="an-cir2" className="anim-circle"></div>
          </button>
        </span>
        <span className="self-end relative left-[-15vw]">
          <h1 className="tracking-[-0.5vw]">together</h1>
        </span>
      </div>
    </section>
  )
}

export default Page5
