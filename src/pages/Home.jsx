import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Brain, Zap } from 'lucide-react'
import Footer from '../components/Footer'

const features = [
  { icon: Activity, title: 'Real-time Monitoring', desc: 'Track patient vitals with sub-millisecond edge processing. Detect anomalies the moment they occur.' },
  { icon: Brain, title: 'AI Risk Prediction', desc: 'Deep learning models predict patient deterioration up to 6 hours before onset, with 94% accuracy.' },
  { icon: Zap, title: 'Edge Processing', desc: 'Process data locally on edge devices. Zero network latency, full HIPAA compliance, always available.' },
]

export default function Home() {
  return (
    <div style={{ paddingTop: 72 }}>

      {/* ─── Hero ─── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 32px 140px' }}>
        <div style={{ maxWidth: 600 }} className="fade-up">
          <p style={{ fontSize: 14, fontWeight: 500, color: '#2563eb', marginBottom: 24 }}>
            Edge AI Healthcare Platform
          </p>

          <h1 style={{ fontSize: 52, fontWeight: 700, color: '#0f172a', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Smarter patient care,<br />
            <span style={{ color: '#94a3b8' }}>delivered in real-time.</span>
          </h1>

          <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.7, marginBottom: 48, maxWidth: 520 }}>
            Monitor vitals, predict complications, and act faster — all processed at the edge for instant, private, reliable insights.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/dashboard" className="btn-dark">
              View Dashboard <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/products" className="btn-outline">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <div style={{ borderTop: '1px solid #f1f5f9' }} />
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }} className="fade-up-d1">
          {[
            { val: '200+', label: 'Hospitals worldwide' },
            { val: '<10ms', label: 'Processing latency' },
            { val: '99.9%', label: 'Platform uptime' },
            { val: '2M+', label: 'Patients monitored' },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{s.val}</p>
              <p style={{ fontSize: 14, color: '#64748b' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <div style={{ borderTop: '1px solid #f1f5f9' }} />
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px' }}>
        <div style={{ maxWidth: 440, marginBottom: 80 }} className="fade-up-d1">
          <p style={{ fontSize: 14, fontWeight: 500, color: '#2563eb', marginBottom: 12 }}>Platform</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 16 }}>
            Built for clinical precision
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7 }}>
            Three core capabilities that power smarter healthcare decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64 }} className="fade-up-d2">
          {features.map((f) => (
            <div key={f.title}>
              <f.icon style={{ width: 22, height: 22, color: '#0f172a', marginBottom: 20 }} />
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <div style={{ borderTop: '1px solid #f1f5f9' }} />
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }} className="fade-up-d1">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.015em', marginBottom: 16 }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, marginBottom: 40 }}>
            Join 200+ hospitals delivering faster, smarter patient care.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Link to="/contact" className="btn-dark">
              Request a Demo <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/dashboard" className="btn-outline">
              Try Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
