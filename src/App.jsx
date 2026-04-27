import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
