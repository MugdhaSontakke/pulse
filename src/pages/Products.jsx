import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Brain, BarChart3, Check, ArrowRight, Sparkles } from 'lucide-react'
import { products } from '../data/mockData'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import { SkeletonCard } from '../components/Skeleton'

const iconMap = {
  monitor: Monitor,
  brain: Brain,
  chart: BarChart3,
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
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-violet-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5" />
            Edge-Powered Healthcare
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Our Products
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Purpose-built edge AI solutions designed to enhance clinical decision-making, reduce response times, and improve patient outcomes.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
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
                return (
                  <div
                    key={product.id}
                    className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 animate-fade-in-up"
                  >
                    {/* Card Gradient Top */}
                    <div className={`h-1.5 bg-gradient-to-r ${product.color}`} />

                    <div className="p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium mb-4">
                        {product.tagline}
                      </p>
                      <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Features Preview */}
                      <div className="space-y-2 mb-8">
                        {product.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-600">{f}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-primary-700 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors duration-200 group/btn"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Schedule a personalized demo to see how our edge AI platform can transform your hospital&apos;s operations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-700 hover:to-primary-600 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Request Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
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

      <p className="text-sm text-primary-600 font-semibold mb-3">
        {product.tagline}
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        {product.description}
      </p>

      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Key Features
      </h4>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {product.features.map((f) => (
          <div
            key={f}
            className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3"
          >
            <Check className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
            <span className="text-sm text-gray-700">{f}</span>
          </div>
        ))}
      </div>

      <Link
        to="/contact"
        onClick={onClose}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:from-primary-700 hover:to-primary-600 shadow-lg transition-all"
      >
        Request Demo
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
