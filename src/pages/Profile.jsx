import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Edit3, Save, Award, Shield } from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const doc = {
  name: 'Dr. Sarah Chen', title: 'Senior Cardiologist', dept: 'Cardiology',
  hospital: 'Edge Medical Center', email: 'sarah.chen@edgemedical.io',
  phone: '+1 (555) 987-6543', location: 'San Francisco, CA', since: 'March 2019',
  license: 'CA-MED-2019-4827',
  bio: 'Dedicated cardiologist with 12+ years of experience in interventional cardiology. Passionate about leveraging AI to improve patient outcomes.',
  specs: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology'],
  certs: [{ name: 'Board Certified — Cardiovascular Disease', y: '2018' }, { name: 'Advanced Cardiac Life Support', y: '2023' }, { name: 'HIPAA Compliance', y: '2024' }],
  stats: [{ l: 'Patients', v: '342' }, { l: 'Critical', v: '28' }, { l: 'Response', v: '<3min' }, { l: 'Rating', v: '4.9' }],
  activity: [
    { t: 'Reviewed vitals for Marcus Thompson', w: '2h ago' },
    { t: 'Updated medication for Robert Kim', w: '4h ago' },
    { t: 'Discharged Lisa Chen', w: '6h ago' },
    { t: 'Critical alert responded — SpO2 drop', w: '8h ago' },
    { t: 'Added notes for Eleanor Vance', w: '1d ago' },
  ],
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState(false)
  const [form, setForm] = useState({ name: doc.name, email: doc.email, phone: doc.phone, dept: doc.dept, bio: doc.bio })

  const save = () => { setEditing(false); setToast(true) }
  const chg = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 32px 80px' }}>
        <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', textDecoration: 'none', marginBottom: 48 }}>
          <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Dashboard
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }} className="fade-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#475569' }}>SC</div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{doc.name}</h1>
              <p style={{ fontSize: 15, color: '#64748b' }}>{doc.title} · {doc.hospital}</p>
            </div>
          </div>
          <button onClick={() => editing ? save() : setEditing(true)} className={editing ? 'btn-dark btn-sm' : 'btn-outline btn-sm'}>
            {editing ? <><Save style={{ width: 14, height: 14 }} /> Save</> : <><Edit3 style={{ width: 14, height: 14 }} /> Edit</>}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, marginBottom: 64 }} className="fade-up-d1">
          {doc.stats.map(s => <div key={s.l}><p style={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>{s.v}</p><p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{s.l}</p></div>)}
        </div>

        <div style={{ borderTop: '1px solid #f1f5f9', marginBottom: 48 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80 }}>
          <div>
            {/* Info */}
            <div style={{ marginBottom: 48 }} className="fade-up-d2">
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 24 }}>Information</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {[{ l: 'Name', n: 'name' }, { l: 'Email', n: 'email' }, { l: 'Phone', n: 'phone' }, { l: 'Department', n: 'dept' }].map(f => (
                  <div key={f.n}>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{f.l}</p>
                    {editing ? <input name={f.n} value={form[f.n]} onChange={chg} className="input" /> : <p style={{ fontSize: 15, color: '#0f172a' }}>{form[f.n]}</p>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Bio</p>
                {editing ? <textarea name="bio" value={form.bio} onChange={chg} rows={3} className="input" style={{ resize: 'none' }} /> : <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>{form.bio}</p>}
              </div>
            </div>

            {/* Specs */}
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Specializations</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {doc.specs.map(s => <span key={s} style={{ padding: '6px 14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 6, fontSize: 13, color: '#475569' }}>{s}</span>)}
              </div>
            </div>

            {/* Certs */}
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Certifications</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {doc.certs.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Award style={{ width: 16, height: 16, color: '#94a3b8' }} /><span style={{ fontSize: 15, color: '#0f172a' }}>{c.name}</span></div>
                    <span style={{ fontSize: 13, color: '#94a3b8' }}>{c.y}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Compliance</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div><p style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>License</p><p style={{ fontSize: 15, color: '#0f172a' }}>{doc.license}</p></div>
                <div><p style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>HIPAA</p><p style={{ fontSize: 15, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 6 }}><Shield style={{ width: 14, height: 14 }} /> Compliant</p></div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="fade-up-d2">
            <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 24 }}>Recent Activity</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {doc.activity.map((a, i) => <div key={i}><p style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.5 }}>{a.t}</p><p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{a.w}</p></div>)}
            </div>
            <div style={{ borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Quick Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/dashboard" className="btn-link" style={{ fontSize: 14 }}>Dashboard</Link>
              <Link to="/products" className="btn-link" style={{ fontSize: 14 }}>Products</Link>
              <Link to="/contact" className="btn-link" style={{ fontSize: 14 }}>Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toast message="Profile updated" show={toast} onClose={() => setToast(false)} />
    </div>
  )
}
