import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Activity } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-[15px] font-semibold text-text">EdgeMedical</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-text'
                    : 'text-muted hover:text-text'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/profile" className="text-[13px] font-medium text-muted hover:text-text transition-colors">
              Profile
            </Link>
            <Link
              to="/contact"
              className="text-[13px] font-medium text-white bg-text px-4 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-muted"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === link.path ? 'text-text' : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-muted">Profile</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block mt-2 text-center text-sm font-medium text-white bg-text px-4 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
