import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Brain, BarChart3, Check, ArrowRight } from 'lucide-react'
import { products } from '../data/mockData'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import { SkeletonCard } from '../components/Skeleton'

const iconMap = { monitor: Monitor, brain: Brain, chart: BarChart3 }

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="pt-14">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-lg animate-in">
          <p className="text-[13px] font-medium text-primary mb-3">Products</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-text tracking-tight mb-4">
            Purpose-built for healthcare
          </h1>
          <p className="text-base text-text-secondary leading-relaxed">
            Edge AI solutions that enhance clinical decisions and improve outcomes.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const Icon = iconMap[product.icon]
              return (
                <div key={product.id} className={`animate-in delay-${i + 1}`}>
                  <Icon className="w-5 h-5 text-text mb-5" />
                  <h3 className="text-base font-semibold text-text mb-1">{product.name}</h3>
                  <p className="text-[13px] text-primary font-medium mb-3">{product.tagline}</p>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
                    {product.description.slice(0, 140)}...
                  </p>

                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-risk-green mt-0.5 shrink-0" />
                        <span className="text-[13px] text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <div className="border-t border-gray-100" />

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-text mb-3">See it in action</h2>
        <p className="text-base text-text-secondary mb-8">Schedule a demo tailored to your hospital.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-text px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
          Request Demo <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name || ''}>
        {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </Modal>

      <Footer />
    </div>
  )
}

function ProductDetail({ product, onClose }) {
  const Icon = iconMap[product.icon]
  return (
    <div>
      <Icon className="w-6 h-6 text-text mb-4" />
      <p className="text-[13px] text-primary font-medium mb-3">{product.tagline}</p>
      <p className="text-[14px] text-text-secondary leading-relaxed mb-8">{product.description}</p>

      <h4 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">Features</h4>
      <div className="space-y-3 mb-8">
        {product.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5">
            <Check className="w-3.5 h-3.5 text-risk-green mt-0.5 shrink-0" />
            <span className="text-[14px] text-text-secondary">{f}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link to="/contact" onClick={onClose} className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-text px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Request Demo <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link to="/dashboard" onClick={onClose} className="inline-flex items-center text-[13px] font-medium text-text border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Live Demo
        </Link>
      </div>
    </div>
  )
}
