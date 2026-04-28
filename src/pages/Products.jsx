import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Brain, BarChart3, Check, ArrowRight } from 'lucide-react'
import { products } from '../data/mockData'
import Modal from '../components/Modal'
import Footer from '../components/Footer'

const iconMap = { monitor: Monitor, brain: Brain, chart: BarChart3 }

export default function Products() {
  const [sel, setSel] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px' }}>
        <div style={{ maxWidth: 520 }} className="fade-up">
          <p style={{ fontSize: 14, fontWeight: 500, color: '#2563eb', marginBottom: 12 }}>Products</p>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Purpose-built for healthcare
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7 }}>
            Edge AI solutions that enhance clinical decisions and improve outcomes.
          </p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #f1f5f9' }} />

      {/* Grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64 }}>
            {[1,2,3].map(i => <div key={i}><div className="skeleton" style={{ height: 32, width: 32, marginBottom: 20 }} /><div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 12 }} /><div className="skeleton" style={{ height: 14, width: '100%', marginBottom: 8 }} /><div className="skeleton" style={{ height: 14, width: '80%' }} /></div>)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64 }} className="fade-up-d1">
            {products.map((p) => {
              const Icon = iconMap[p.icon]
              return (
                <div key={p.id}>
                  <Icon style={{ width: 22, height: 22, color: '#0f172a', marginBottom: 20 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: 14, color: '#2563eb', fontWeight: 500, marginBottom: 14 }}>{p.tagline}</p>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>{p.description.slice(0, 130)}...</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {p.features.slice(0, 3).map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <Check style={{ width: 14, height: 14, color: '#16a34a', marginTop: 3, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: '#64748b' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setSel(p)} className="btn-link">
                    Learn more <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <div style={{ borderTop: '1px solid #f1f5f9' }} />

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>See it in action</h2>
        <p style={{ fontSize: 16, color: '#64748b', marginBottom: 36 }}>Schedule a demo tailored to your hospital.</p>
        <Link to="/contact" className="btn-dark">Request Demo <ArrowRight style={{ width: 16, height: 16 }} /></Link>
      </section>

      <Modal isOpen={!!sel} onClose={() => setSel(null)} title={sel?.name || ''}>
        {sel && (() => { const Icon = iconMap[sel.icon]; return (
          <div>
            <Icon style={{ width: 22, height: 22, color: '#0f172a', marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: '#2563eb', fontWeight: 500, marginBottom: 16 }}>{sel.tagline}</p>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 32 }}>{sel.description}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Features</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {sel.features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check style={{ width: 14, height: 14, color: '#16a34a', marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#64748b' }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/contact" onClick={() => setSel(null)} className="btn-dark btn-sm">Request Demo <ArrowRight style={{ width: 14, height: 14 }} /></Link>
              <Link to="/dashboard" onClick={() => setSel(null)} className="btn-outline btn-sm">Live Demo</Link>
            </div>
          </div>
        )})()}
      </Modal>

      <Footer />
    </div>
  )
}
