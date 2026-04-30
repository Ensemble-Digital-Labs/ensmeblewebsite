import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './app/layout'
import AnimatedRoutes from './app/AnimatedRoutes'

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  )
}

export default App
