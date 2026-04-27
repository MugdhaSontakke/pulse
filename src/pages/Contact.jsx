import { useState } from 'react'
import { Mail, Phone, MapPin, Building2, Send } from 'lucide-react'
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
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Get in Touch</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Interested in transforming your hospital with edge AI? Let's start a conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Edge Medical Solutions</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">contact@edgemedical.io</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-500">+1 (555) 234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-500">123 Innovation Drive<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Business Hours</p>
                      <p className="text-sm text-gray-500">Mon–Fri: 8:00 AM – 6:00 PM PST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" placeholder="John Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" placeholder="john@hospital.org" />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1.5">Organization</label>
                  <input id="organization" name="organization" type="text" value={form.organization} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" placeholder="General Hospital" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea id="message" name="message" rows="4" required value={form.message} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none" placeholder="Tell us about your needs..." />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25 disabled:opacity-60 transition-all duration-200">
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
      <Toast message="Request Submitted" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
