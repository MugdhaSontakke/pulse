import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Brain, BarChart3, Check, ArrowRight } from 'lucide-react'
import { products } from '../data/mockData'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import { SkeletonCard } from '../components/Skeleton'

const iconMap = { monitor: Monitor, brain: Brain, chart: BarChart3 }

export default function Products() {
  const [sel, setSel] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  return (
    <div style={{ paddingTop: '64px' }}>

      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="max-w-lg fade-up">
          <p className="text-sm font-medium text-blue-600 mb-3">Products</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Purpose-built for healthcare</h1>
          <p className="text-base text-slate-500 leading-relaxed">Edge AI solutions that enhance clinical decisions and improve outcomes.</p>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-16">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-16 fade-up-d1">
            {products.map((p) => {
              const Icon = iconMap[p.icon]
              return (
                <div key={p.id}>
                  <Icon className="w-5 h-5 text-slate-900 mb-4" />
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">{p.tagline}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{p.description.slice(0, 120)}...</p>
                  <div className="space-y-2 mb-6">
                    {p.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-500">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSel(p)} className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <div className="border-t border-slate-100" />

      <section className="max-w-5xl mx-auto px-6 text-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">See it in action</h2>
        <p className="text-base text-slate-500 mb-8">Schedule a demo tailored to your hospital.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors">
          Request Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Modal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.name || ''}>
        {sel && (() => { const Icon = iconMap[sel.icon]; return (
          <div>
            <Icon className="w-5 h-5 text-slate-900 mb-4" />
            <p className="text-sm text-blue-600 font-medium mb-3">{sel.tagline}</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">{sel.description}</p>
            <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Features</p>
            <div className="space-y-3 mb-8">
              {sel.features.map((f) => (
                <div key={f} className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /><span className="text-sm text-slate-500">{f}</span></div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link to="/contact" onClick={() => setSel(null)} className="text-sm font-medium text-white bg-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2">Request Demo <ArrowRight className="w-3.5 h-3.5" /></Link>
              <Link to="/dashboard" onClick={() => setSel(null)} className="text-sm font-medium text-slate-900 border border-slate-200 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">Live Demo</Link>
            </div>
          </div>
        )})()}
      </Modal>

      <Footer />
    </div>
  )
}
