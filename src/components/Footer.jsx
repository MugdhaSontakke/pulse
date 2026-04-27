import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

const footerLinks = {
  Product: [
    { name: 'Monitoring', path: '/products' },
    { name: 'Predictive AI', path: '/products' },
    { name: 'Analytics', path: '/products' },
  ],
  Company: [
    { name: 'About', path: '/' },
    { name: 'Careers', path: '/' },
    { name: 'Blog', path: '/' },
  ],
  Support: [
    { name: 'Documentation', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy', path: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-text">EdgeMedical</span>
            </Link>
            <p className="text-[13px] text-muted leading-relaxed">
              Edge AI for real-time patient monitoring and predictive healthcare.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[13px] font-semibold text-text mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-[13px] text-muted hover:text-text transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-gray-100 text-[12px] text-muted">
          © {new Date().getFullYear()} Edge Medical Solutions
        </div>
      </div>
    </footer>
  )
}
