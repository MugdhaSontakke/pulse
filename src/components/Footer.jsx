import { Link } from 'react-router-dom'
import { Activity, Mail, Phone, MapPin, Globe, MessageCircle, Link2 } from 'lucide-react'

const footerLinks = {
  Product: [
    { name: 'Patient Monitoring', path: '/products' },
    { name: 'Predictive AI', path: '/products' },
    { name: 'Analytics Dashboard', path: '/products' },
    { name: 'Pricing', path: '/contact' },
  ],
  Company: [
    { name: 'About Us', path: '/' },
    { name: 'Careers', path: '/contact' },
    { name: 'Blog', path: '/' },
    { name: 'Press', path: '/' },
  ],
  Resources: [
    { name: 'Documentation', path: '/' },
    { name: 'API Reference', path: '/' },
    { name: 'Case Studies', path: '/' },
    { name: 'Support', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Glow Line Separator */}
      <div className="glow-line" />

      <div className="bg-mesh-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Edge<span className="text-primary-400">Medical</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                Pioneering edge AI solutions for real-time patient monitoring and predictive healthcare analytics. Trusted by 200+ hospitals worldwide.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span>contact@edgemedical.io</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span>+1 (555) 234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span>San Francisco, CA 94105</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3">
                {[Globe, MessageCircle, Link2].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-500 hover:text-primary-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="glow-line mt-14 mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Edge Medical Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
