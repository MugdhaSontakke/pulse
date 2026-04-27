import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Brain, BarChart3, Check, ArrowRight, Sparkles, ExternalLink } from 'lucide-react'
import { products } from '../data/mockData'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import { SkeletonCard } from '../components/Skeleton'

const iconMap = {
  monitor: Monitor,
  brain: Brain,
  chart: BarChart3,
}

const gradientGlows = {
  'from-blue-500 to-cyan-400': 'rgba(59, 130, 246, 0.15)',
  'from-violet-500 to-purple-400': 'rgba(139, 92, 246, 0.15)',
  'from-emerald-500 to-teal-400': 'rgba(16, 185, 129, 0.15)',
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="orb orb-blue w-[400px] h-[400px] top-[-100px] right-[-50px]" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-[-50px] left-[-50px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-semibold text-gray-300">Edge-Powered Healthcare</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Our Products
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Purpose-built edge AI solutions designed to enhance clinical decision-making, reduce response times, and improve patient outcomes.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 stagger">
              {products.map((product) => {
                const Icon = iconMap[product.icon]
                const glow = gradientGlows[product.color] || 'rgba(59, 130, 246, 0.15)'
                return (
                  <div
                    key={product.id}
                    className="glass-card rounded-2xl overflow-hidden animate-fade-in-up group relative"
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${glow}, transparent 70%)` }}
                    />

                    {/* Gradient Top Line */}
                    <div className={`h-1 bg-gradient-to-r ${product.color}`} />

                    <div className="relative p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-primary-400 font-medium mb-4">
                        {product.tagline}
                      </p>
                      <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Features Preview */}
                      <div className="space-y-2.5 mb-8">
                        {product.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-400">{f}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold glass rounded-xl text-primary-400 hover:text-white hover:bg-primary-500/20 transition-all duration-300 group/btn"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Request Demo CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="orb orb-green w-[400px] h-[400px] top-[-100px] left-[40%]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              See It in Action
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Schedule a personalized demo to see how our edge AI platform can transform your hospital&apos;s operations.
            </p>
            <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ''}
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Modal>

      <Footer />
    </div>
  )
}

function ProductDetail({ product, onClose }) {
  const Icon = iconMap[product.icon]
  return (
    <div>
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <p className="text-sm text-primary-400 font-semibold mb-3">
        {product.tagline}
      </p>
      <p className="text-gray-400 leading-relaxed mb-8">
        {product.description}
      </p>

      <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        Key Features
      </h4>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {product.features.map((f) => (
          <div
            key={f}
            className="flex items-start gap-2.5 glass rounded-xl px-4 py-3"
          >
            <Check className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
            <span className="text-sm text-gray-300">{f}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to="/contact"
          onClick={onClose}
          className="btn-primary"
        >
          Request Demo
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/dashboard"
          onClick={onClose}
          className="btn-secondary"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </Link>
      </div>
    </div>
  )
}
