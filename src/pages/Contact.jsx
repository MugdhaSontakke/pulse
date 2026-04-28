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

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 140px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
          {/* Left */}
          <div className="fade-up">
            <p style={{ fontSize: 14, fontWeight: 500, color: '#2563eb', marginBottom: 12 }}>Contact</p>
            <h1 style={{ fontSize: 42, fontWeight: 700, color: '#0f172a', lineHeight: 1.15, marginBottom: 16 }}>Let's talk</h1>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, marginBottom: 64 }}>
              Interested in transforming your hospital with edge AI? We'd love to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[['Email', 'contact@edgemedical.io'], ['Phone', '+1 (555) 234-5678'], ['Address', '123 Innovation Drive\nSan Francisco, CA 94105'], ['Hours', 'Mon–Fri, 8 AM – 6 PM PST']].map(([l, v]) => (
                <div key={l}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{l}</p>
                  <p style={{ fontSize: 14, color: '#64748b', whiteSpace: 'pre-line' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Form */}
          <div className="fade-up-d1">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Name</label>
                  <input name="name" required value={form.name} onChange={chg} className="input" placeholder="Jane Smith" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Email</label>
                  <input name="email" type="email" required value={form.email} onChange={chg} className="input" placeholder="jane@hospital.org" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Organization</label>
                <input name="organization" value={form.organization} onChange={chg} className="input" placeholder="General Hospital" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#0f172a', marginBottom: 8 }}>Message</label>
                <textarea name="message" rows="5" required value={form.message} onChange={chg} className="input" style={{ resize: 'none' }} placeholder="Tell us about your needs..." />
              </div>
              <div>
                <button type="submit" disabled={busy} className="btn-dark" style={{ opacity: busy ? 0.6 : 1 }}>
                  {busy ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> : <><Send style={{ width: 16, height: 16 }} /> Send Message</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <Toast message="Message sent! We'll respond within 24 hours." show={toast} onClose={() => setToast(false)} />
    </div>
  )
}
