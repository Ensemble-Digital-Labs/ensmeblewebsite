import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initTheme } from './lib/theme'
import './index.css'
import './styles/cinematic-footer.css'
import './styles/popart-contact-orb.css'
import './styles/contact-orb-cursor-morph.css'
import './styles/fullscreen-nav-menu.css'
import './styles/experiments-logo-nav-preview.css'
import './styles/ensemble-editorial-type.css'
import './styles/dna-style-stat-ring.css'
import './styles/case-studies-portfolio.css'

// Initialize theme CSS variables
initTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
