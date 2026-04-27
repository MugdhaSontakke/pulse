import { useState } from 'react'
import { Mail, Phone, MapPin, Building2, Send, ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [showToast, setShowToast] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setShowToast(true)
      setForm({ name: '', email: '', organization: '', message: '' })
    }, 1000)
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="pt-16">
      <section className="relative py-24 overflow-hidden min-h-screen">
        <div className="absolute inset-0 grid-pattern" />
        <div className="orb orb-blue w-[400px] h-[400px] top-[-50px] right-[-100px]" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-[10%] left-[-100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
              <Mail className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-semibold text-gray-300">Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
              Interested in transforming your hospital with edge AI? Let's start a conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Edge Medical Solutions</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@edgemedical.io' },
                    { icon: Phone, label: 'Phone', value: '+1 (555) 234-5678' },
                    { icon: MapPin, label: 'Address', value: '123 Innovation Drive\nSan Francisco, CA 94105' },
                    { icon: Building2, label: 'Business Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM PST' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-sm text-gray-400 whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <a href="mailto:contact@edgemedical.io" className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Send us an email
                  </a>
                  <a href="tel:+15552345678" className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Call sales team
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm" placeholder="John Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm" placeholder="john@hospital.org" />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1.5">Organization</label>
                  <input id="organization" name="organization" type="text" value={form.organization} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm" placeholder="General Hospital" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none" placeholder="Tell us about your needs..." />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full btn-primary justify-center py-3.5 disabled:opacity-60">
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Toast message="Demo request submitted successfully! We'll be in touch within 24 hours." show={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
