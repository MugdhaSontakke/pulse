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
    <div style={{ paddingTop: '64px' }}>

      {/* ─── Hero ─── */}
      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="max-w-xl fade-up">
          <p className="text-sm font-medium text-blue-600 mb-5">Edge AI Healthcare Platform</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Smarter patient care,<br />
            <span className="text-slate-400">delivered in real-time.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            Monitor vitals, predict complications, and act faster — all processed at the edge for instant, private, reliable insights.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              View Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products" className="inline-flex items-center text-sm font-medium text-slate-900 border border-slate-200 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <div className="border-t border-slate-100" />
      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 fade-up-d1">
          {[
            { val: '200+', label: 'Hospitals' },
            { val: '<10ms', label: 'Latency' },
            { val: '99.9%', label: 'Uptime' },
            { val: '2M+', label: 'Patients monitored' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-slate-900 mb-1">{s.val}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <div className="border-t border-slate-100" />
      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-md mb-16 fade-up-d1">
          <p className="text-sm font-medium text-blue-600 mb-3">Platform</p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Built for clinical precision</h2>
          <p className="text-base text-slate-500 leading-relaxed">Three core capabilities that power smarter healthcare decisions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 fade-up-d2">
          {features.map((f) => (
            <div key={f.title}>
              <f.icon className="w-5 h-5 text-slate-900 mb-4" />
              <h3 className="text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <div className="border-t border-slate-100" />
      <section className="max-w-5xl mx-auto px-6 text-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-md mx-auto fade-up-d1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-base text-slate-500 mb-10">Join 200+ hospitals delivering faster, smarter patient care.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-900 border border-slate-200 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
              Try Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
