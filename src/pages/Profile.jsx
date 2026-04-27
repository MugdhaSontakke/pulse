import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Edit3, Save, Award, Clock, Users, Star, Heart, Activity, Shield } from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const doc = {
  name: 'Dr. Sarah Chen', title: 'Senior Cardiologist', dept: 'Cardiology',
  hospital: 'Edge Medical Center', email: 'sarah.chen@edgemedical.io',
  phone: '+1 (555) 987-6543', location: 'San Francisco, CA', since: 'March 2019',
  license: 'CA-MED-2019-4827',
  bio: 'Dedicated cardiologist with 12+ years of experience in interventional cardiology. Passionate about leveraging AI to improve patient outcomes.',
  specs: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology'],
  certs: [
    { name: 'Board Certified — Cardiovascular Disease', y: '2018' },
    { name: 'Advanced Cardiac Life Support', y: '2023' },
    { name: 'HIPAA Compliance', y: '2024' },
  ],
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
  const inputCls = 'w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all'

  return (
    <div style={{ paddingTop: '64px' }}>
      <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors" style={{ marginBottom: '48px', display: 'inline-flex' }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 fade-up" style={{ marginTop: '48px', marginBottom: '48px' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-700">SC</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{doc.name}</h1>
              <p className="text-sm text-slate-500">{doc.title} · {doc.hospital}</p>
            </div>
          </div>
          <button onClick={() => editing ? save() : setEditing(true)}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${editing ? 'text-white bg-slate-900' : 'text-slate-900 border border-slate-200 hover:bg-slate-50'}`}>
            {editing ? <><Save className="w-3.5 h-3.5" /> Save</> : <><Edit3 className="w-3.5 h-3.5" /> Edit</>}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 fade-up-d1" style={{ marginBottom: '64px' }}>
          {doc.stats.map(s => <div key={s.l}><p className="text-2xl font-bold text-slate-900">{s.v}</p><p className="text-sm text-slate-500 mt-1">{s.l}</p></div>)}
        </div>

        <div className="border-t border-slate-100" style={{ marginBottom: '48px' }} />

        <div className="grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-12">
            {/* Info */}
            <div className="fade-up-d2">
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-6">Information</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[{l:'Name',n:'name'},{l:'Email',n:'email'},{l:'Phone',n:'phone'},{l:'Department',n:'dept'}].map(f => (
                  <div key={f.n}>
                    <p className="text-xs text-slate-500 mb-1.5">{f.l}</p>
                    {editing ? <input name={f.n} value={form[f.n]} onChange={chg} className={inputCls} /> : <p className="text-sm text-slate-900">{form[f.n]}</p>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <p className="text-xs text-slate-500 mb-1.5">Bio</p>
                {editing ? <textarea name="bio" value={form.bio} onChange={chg} rows={3} className={`${inputCls} resize-none`} /> : <p className="text-sm text-slate-500 leading-relaxed">{form.bio}</p>}
              </div>
            </div>

            {/* Specializations */}
            <div className="fade-up-d3">
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {doc.specs.map(s => <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs text-slate-600">{s}</span>)}
              </div>
            </div>

            {/* Certs */}
            <div>
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Certifications</p>
              <div className="space-y-4">
                {doc.certs.map(c => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5"><Award className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-900">{c.name}</span></div>
                    <span className="text-xs text-slate-400">{c.y}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div>
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Compliance</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div><p className="text-xs text-slate-500 mb-1">License</p><p className="text-sm text-slate-900">{doc.license}</p></div>
                <div><p className="text-xs text-slate-500 mb-1">HIPAA</p><p className="text-sm text-emerald-600 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Compliant</p></div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="fade-up-d2">
            <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-6">Recent Activity</p>
            <div className="space-y-6">
              {doc.activity.map((a, i) => <div key={i}><p className="text-sm text-slate-900 leading-snug">{a.t}</p><p className="text-xs text-slate-400 mt-1">{a.w}</p></div>)}
            </div>

            <div className="border-t border-slate-100" style={{ marginTop: '32px', marginBottom: '32px' }} />

            <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Quick Links</p>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-sm text-blue-600 hover:underline">Dashboard</Link>
              <Link to="/products" className="block text-sm text-blue-600 hover:underline">Products</Link>
              <Link to="/contact" className="block text-sm text-blue-600 hover:underline">Support</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toast message="Profile updated" show={toast} onClose={() => setToast(false)} />
    </div>
  )
}
