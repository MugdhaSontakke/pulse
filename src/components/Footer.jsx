import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-900 text-sm">EdgeMedical</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Edge AI for real-time patient monitoring and predictive healthcare.
            </p>
          </div>
          {[
            { title: 'Product', items: [['Monitoring', '/products'], ['Predictive AI', '/products'], ['Analytics', '/products']] },
            { title: 'Company', items: [['About', '/'], ['Careers', '/'], ['Blog', '/']] },
            { title: 'Support', items: [['Docs', '/'], ['Contact', '/contact'], ['Privacy', '/']] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-900 mb-4">{col.title}</p>
              <div className="space-y-3">
                {col.items.map(([name, to]) => (
                  <Link key={name} to={to} className="block text-sm text-slate-500 hover:text-slate-900 transition-colors">{name}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-8 border-t border-slate-100 text-xs text-slate-400">
          © {new Date().getFullYear()} Edge Medical Solutions
        </div>
      </div>
    </footer>
  )
}
