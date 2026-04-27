import { Link } from 'react-router-dom'
import { Activity, Brain, Zap, ArrowRight, Shield, Clock, Server, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Continuous patient vital sign tracking with sub-millisecond edge processing. Detect anomalies the instant they occur.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    icon: Brain,
    title: 'AI Risk Prediction',
    description: 'Deep learning models predict patient deterioration up to 6 hours in advance with 94% accuracy, enabling proactive intervention.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: Zap,
    title: 'Low-latency Edge Processing',
    description: 'Process data locally on edge devices for instant insights. No cloud dependency means zero network latency and full HIPAA compliance.',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'rgba(245, 158, 11, 0.15)',
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
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern" />

        {/* Animated Orbs */}
        <div className="orb orb-blue w-[500px] h-[500px] top-[-100px] right-[-100px]" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-[-50px] left-[-100px]" />
        <div className="orb orb-green w-[300px] h-[300px] top-[40%] left-[60%]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-gray-300">Now processing 2M+ patients daily</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Edge AI for{' '}
              <span className="text-gradient">
                Real-Time
              </span>{' '}
              Patient Monitoring
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Harness the power of edge computing and AI to transform hospital workflows. Monitor vitals in real-time, predict complications before they arise, and deliver faster, smarter care.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="btn-primary text-base py-3.5 px-8">
                View Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-secondary text-base py-3.5 px-8">
                Explore Products
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl px-6 py-5 group cursor-default"
              >
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="orb orb-blue w-[400px] h-[400px] top-[10%] right-[-200px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-semibold text-gray-300">Core Platform</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Intelligence at the Edge
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Our platform combines edge computing with advanced AI to deliver actionable clinical insights in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 stagger">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 animate-fade-in-up relative overflow-hidden group"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${feature.glow}, transparent 70%)` }}
                />

                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-transparent" />
        <div className="orb orb-purple w-[500px] h-[500px] top-[-100px] left-[30%]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
              Ready to Transform Patient Care?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join 200+ hospitals already using Edge Medical to deliver faster diagnoses, reduce alert fatigue, and improve patient outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-base py-4 px-8">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/dashboard" className="btn-secondary text-base py-4 px-8">
                Explore Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
