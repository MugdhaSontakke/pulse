import { Link } from 'react-router-dom'
import { Activity, Brain, Zap, ArrowRight, Shield, Clock, Server } from 'lucide-react'
import Footer from '../components/Footer'

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Continuous patient vital sign tracking with sub-millisecond edge processing. Detect anomalies the instant they occur.',
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Brain,
    title: 'AI Risk Prediction',
    description: 'Deep learning models predict patient deterioration up to 6 hours in advance with 94% accuracy, enabling proactive intervention.',
    color: 'from-violet-500 to-purple-400',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Zap,
    title: 'Low-latency Edge Processing',
    description: 'Process data locally on edge devices for instant insights. No cloud dependency means zero network latency and full HIPAA compliance.',
    color: 'from-amber-500 to-orange-400',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const stats = [
  { value: '200+', label: 'Hospitals', icon: Shield },
  { value: '<10ms', label: 'Latency', icon: Clock },
  { value: '99.9%', label: 'Uptime', icon: Server },
  { value: '2M+', label: 'Patients Monitored', icon: Activity },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Gradient Orbs */}
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              Now processing 2M+ patients daily
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Edge AI for{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Real-Time
              </span>{' '}
              Patient Monitoring
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl">
              Harness the power of edge computing and AI to transform hospital workflows. Monitor patient vitals in real-time, predict complications before they arise, and deliver faster, smarter care—all processed locally for instant results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-700 hover:to-primary-600 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-200"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl px-6 py-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-primary-500" />
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Core Platform</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Intelligence at the Edge
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our platform combines edge computing with advanced AI to deliver actionable clinical insights in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              >
                {/* Gradient top border */}
                <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${feature.color} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Join 200+ hospitals already using Edge Medical to deliver faster diagnoses, reduce alert fatigue, and improve patient outcomes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-primary-700 bg-white rounded-2xl hover:bg-primary-50 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all duration-200"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
