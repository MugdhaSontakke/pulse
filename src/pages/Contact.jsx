import { useState } from 'react'
import { Send } from 'lucide-react'
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
    }, 800)
  }

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div className="pt-14">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left */}
          <div className="animate-in">
            <p className="text-[13px] font-medium text-primary mb-3">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text tracking-tight mb-4">
              Let's talk
            </h1>
            <p className="text-base text-text-secondary leading-relaxed mb-12">
              Interested in transforming your hospital with edge AI? We'd love to hear from you.
            </p>

            <div className="space-y-6 text-[14px]">
              <div>
                <p className="font-medium text-text">Email</p>
                <p className="text-muted">contact@edgemedical.io</p>
              </div>
              <div>
                <p className="font-medium text-text">Phone</p>
                <p className="text-muted">+1 (555) 234-5678</p>
              </div>
              <div>
                <p className="font-medium text-text">Address</p>
                <p className="text-muted">123 Innovation Drive<br />San Francisco, CA 94105</p>
              </div>
              <div>
                <p className="font-medium text-text">Hours</p>
                <p className="text-muted">Mon–Fri, 8 AM – 6 PM PST</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="animate-in delay-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-text mb-1.5">Name</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-text mb-1.5">Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="jane@hospital.org" />
                </div>
              </div>
              <div>
                <label htmlFor="organization" className="block text-[13px] font-medium text-text mb-1.5">Organization</label>
                <input id="organization" name="organization" type="text" value={form.organization} onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" placeholder="General Hospital" />
              </div>
              <div>
                <label htmlFor="message" className="block text-[13px] font-medium text-text mb-1.5">Message</label>
                <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none" placeholder="Tell us about your needs..." />
              </div>
              <button type="submit" disabled={submitting}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-text px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors">
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Send className="w-3.5 h-3.5" /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <Toast message="Message sent! We'll respond within 24 hours." show={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
