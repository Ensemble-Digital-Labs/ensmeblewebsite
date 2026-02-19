import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initFooterScroll, initEyeBall } from '../lib/popprAnimations'
import { prefersReducedMotion } from '../lib/utils'
import { contactInfo } from '../lib/content'

function Footer() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let refreshTimer
    const timer = setTimeout(() => {
      initFooterScroll()
      initEyeBall()
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh()
        const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
        if (lenis?.resize) {
          lenis.resize()
          ScrollTrigger.refresh()
        }
      }, 800)
    }, 1200)

    return () => {
      clearTimeout(timer)
      if (refreshTimer) clearTimeout(refreshTimer)
    }
  }, [])

  return (
    <footer>
      <div className="footer-cover-parallax">
        <div className="parallax-circle">
          <div className="footer-content">
            <div className="footer-top">
              {/* Newsletter */}
              <div className="newsletter">
                <h5>Stay up to date</h5>
                <p>
                  get our <br /> newsletter
                </p>
                <div className="input">
                  <input type="email" placeholder="your email" />
                  <span className="menu">
                    <i className="ri-arrow-right-line"></i>
                    <div id="an-cir1" className="anim-circle"></div>
                    <div id="an-cir2" className="anim-circle"></div>
                  </span>
                </div>
              </div>

              {/* Owl with Eyeball Tracking */}
              <div className="owl">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200"
                  alt="owl"
                />
                <div className="eyes">
                  <div id="left-eye" className="eye">
                    <div className="ball"></div>
                  </div>
                  <div id="right-eye" className="eye">
                    <div className="ball"></div>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="contacts">
                <h5>get in touch</h5>
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}<span className="line1"></span>
                </a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                  {contactInfo.phone} <span className="line1"></span>
                </a>
                <a href="#">
                  {contactInfo.address} <span className="line1"></span>
                </a>
                <a href="#">
                  {contactInfo.cityStateZip} <span className="line1"></span>
                </a>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
              <div className="footer-links">
                <Link to="/privacy">privacy policy</Link>
                <Link to="/disclaimer">disclaimer</Link>
                <Link to="/terms">terms and condition</Link>
                <span>© {new Date().getFullYear()}</span>
              </div>
              <div className="footer-socials">
                <p>see what we're up to</p>
                <div className="social-links">
                  <a href="#">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="#">
                    <i className="ri-instagram-fill"></i>
                  </a>
                  <a href="#">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a href="#">
                    <i className="ri-youtube-fill"></i>
                  </a>
                </div>
              </div>
              <div className="footer-language">
                <a href="#">netherlands</a>
                <a className="active" href="#">English</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
