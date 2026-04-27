import { useState } from 'react'
import { Send } from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [toast, setToast] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault(); setBusy(true)
    setTimeout(() => { setBusy(false); setToast(true); setForm({ name: '', email: '', organization: '', message: '' }) }, 800)
  }
  const chg = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all'

  return (
    <div style={{ paddingTop: '64px' }}>
      <section className="max-w-5xl mx-auto px-6" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="fade-up">
            <p className="text-sm font-medium text-blue-600 mb-3">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Let's talk</h1>
            <p className="text-base text-slate-500 leading-relaxed mb-16">
              Interested in transforming your hospital with edge AI? We'd love to hear from you.
            </p>
            <div className="space-y-8 text-sm">
              {[
                ['Email', 'contact@edgemedical.io'],
                ['Phone', '+1 (555) 234-5678'],
                ['Address', '123 Innovation Drive\nSan Francisco, CA 94105'],
                ['Hours', 'Mon–Fri, 8 AM – 6 PM PST'],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="font-medium text-slate-900 mb-1">{label}</p>
                  <p className="text-slate-500 whitespace-pre-line">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up-d1">
            <form onSubmit={submit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                  <input id="name" name="name" required value={form.name} onChange={chg} className={inputCls} placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={chg} className={inputCls} placeholder="jane@hospital.org" />
                </div>
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-slate-900 mb-2">Organization</label>
                <input id="organization" name="organization" value={form.organization} onChange={chg} className={inputCls} placeholder="General Hospital" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" required value={form.message} onChange={chg} className={`${inputCls} resize-none`} placeholder="Tell us about your needs..." />
              </div>
              <button type="submit" disabled={busy} className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">
                {busy ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <Toast message="Message sent! We'll respond within 24 hours." show={toast} onClose={() => setToast(false)} />
    </div>
  )
}
