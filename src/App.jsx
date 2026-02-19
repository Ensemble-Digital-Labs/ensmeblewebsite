import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './app/layout'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Services from './pages/Services'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Layout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </Layout>
    </Router>
  )
}

export default App
