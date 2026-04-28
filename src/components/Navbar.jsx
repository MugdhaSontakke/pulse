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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 72, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #f1f5f9',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Activity style={{ width: 20, height: 20, color: '#2563eb' }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>EdgeMedical</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 14, fontWeight: pathname === l.to ? 500 : 400,
              color: pathname === l.to ? '#0f172a' : '#64748b',
              textDecoration: 'none', transition: 'color 0.2s',
            }}>
              {l.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="hidden md:flex">
          <Link to="/profile" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Profile</Link>
          <Link to="/contact" className="btn-dark btn-sm">Get Started</Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
          {open ? <X style={{ width: 22, height: 22, color: '#64748b' }} /> : <Menu style={{ width: 22, height: 22, color: '#64748b' }} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 32px 24px' }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 0', fontSize: 15,
              color: pathname === l.to ? '#0f172a' : '#64748b',
              textDecoration: 'none', fontWeight: pathname === l.to ? 500 : 400,
            }}>
              {l.name}
            </Link>
          ))}
          <Link to="/profile" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: 15, color: '#64748b', textDecoration: 'none' }}>Profile</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-dark" style={{ marginTop: 12, justifyContent: 'center', width: '100%' }}>Get Started</Link>
        </div>
      )}
    </nav>
  )
}
