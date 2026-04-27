import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Activity } from 'lucide-react'

const links = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-900 text-sm">EdgeMedical</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`text-sm ${pathname === l.to ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/profile" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Profile</Link>
          <Link to="/contact" className="text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            Get Started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-500" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-2 fade-up">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`block py-2 text-sm ${pathname === l.to ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
              {l.name}
            </Link>
          ))}
          <Link to="/profile" onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-500">Profile</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block mt-2 text-center text-sm font-medium text-white bg-slate-900 py-2.5 rounded-lg">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
