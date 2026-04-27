import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Brain, Zap } from 'lucide-react'
import Footer from '../components/Footer'

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Track patient vitals with sub-millisecond edge processing. Detect anomalies instantly.',
  },
  {
    icon: Brain,
    title: 'AI Risk Prediction',
    description: 'Predict deterioration up to 6 hours in advance with 94% accuracy.',
  },
  {
    icon: Zap,
    title: 'Edge Processing',
    description: 'Process data locally. Zero network latency, full HIPAA compliance.',
  },
]

export default function Home() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <div className="max-w-2xl animate-in">
          <p className="text-[13px] font-medium text-primary mb-4">Edge AI Healthcare Platform</p>

          <h1 className="text-4xl sm:text-5xl font-bold text-text leading-[1.15] tracking-tight mb-6">
            Smarter patient care,{' '}
            <span className="text-muted">delivered in real-time.</span>
          </h1>

          <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-lg">
            Monitor vitals, predict complications, and act faster — all processed at the edge for instant, private, reliable insights.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-text px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-text border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8 animate-in delay-1">
          {[
            { value: '200+', label: 'Hospitals' },
            { value: '<10ms', label: 'Latency' },
            { value: '99.9%', label: 'Uptime' },
            { value: '2M+', label: 'Patients' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-text">{s.value}</p>
              <p className="text-[13px] text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-md mb-16 animate-in">
          <p className="text-[13px] font-medium text-primary mb-3">Platform</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
            Built for clinical precision
          </h2>
          <p className="text-base text-text-secondary mt-4 leading-relaxed">
            Three core capabilities that power smarter healthcare decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div key={f.title} className={`animate-in delay-${i + 1}`}>
              <f.icon className="w-5 h-5 text-text mb-5" />
              <h3 className="text-base font-semibold text-text mb-2">{f.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <div className="max-w-md mx-auto animate-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-base text-text-secondary mb-8">
            Join 200+ hospitals delivering faster, smarter patient care.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-text px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
              Request a Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center text-[13px] font-medium text-text border border-gray-200 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Try Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
