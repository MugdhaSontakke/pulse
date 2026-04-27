import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Edit3, Save, Award, Clock, Users, Star,
  Heart, Activity, Mail, Phone, MapPin, Shield,
} from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const doctor = {
  name: 'Dr. Sarah Chen',
  title: 'Senior Cardiologist',
  department: 'Cardiology',
  hospital: 'Edge Medical Center',
  email: 'sarah.chen@edgemedical.io',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  since: 'March 2019',
  license: 'CA-MED-2019-4827',
  bio: 'Dedicated cardiologist with 12+ years of experience in interventional cardiology. Passionate about leveraging AI to improve patient outcomes.',
  specializations: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology'],
  certifications: [
    { name: 'Board Certified — Cardiovascular Disease', year: '2018' },
    { name: 'Advanced Cardiac Life Support', year: '2023' },
    { name: 'HIPAA Compliance', year: '2024' },
  ],
  stats: [
    { label: 'Patients', value: '342', icon: Users },
    { label: 'Critical Cases', value: '28', icon: Heart },
    { label: 'Avg Response', value: '<3min', icon: Clock },
    { label: 'Rating', value: '4.9', icon: Star },
  ],
  activity: [
    { text: 'Reviewed vitals for Marcus Thompson', time: '2h ago' },
    { text: 'Updated medication for Robert Kim', time: '4h ago' },
    { text: 'Discharged Lisa Chen', time: '6h ago' },
    { text: 'Critical alert responded — SpO2 drop', time: '8h ago' },
    { text: 'Added notes for Eleanor Vance', time: '1d ago' },
  ],
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [form, setForm] = useState({
    name: doctor.name, email: doctor.email, phone: doctor.phone,
    department: doctor.department, bio: doctor.bio,
  })

  const handleSave = () => { setEditing(false); setShowToast(true) }
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <div className="pt-14">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-text mb-10 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 animate-in">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-text">SC</div>
            <div>
              <h1 className="text-xl font-bold text-text">{doctor.name}</h1>
              <p className="text-[14px] text-muted">{doctor.title} · {doctor.hospital}</p>
            </div>
          </div>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors ${
              editing ? 'text-white bg-text hover:bg-gray-800' : 'text-text border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {editing ? <><Save className="w-3.5 h-3.5" /> Save</> : <><Edit3 className="w-3.5 h-3.5" /> Edit</>}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-6 mb-16 animate-in delay-1">
          {doctor.stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-text">{s.value}</p>
              <p className="text-[13px] text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mb-12" />

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            {/* Info */}
            <div className="animate-in delay-2">
              <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-6">Information</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Name', name: 'name', icon: null },
                  { label: 'Email', name: 'email', icon: Mail },
                  { label: 'Phone', name: 'phone', icon: Phone },
                  { label: 'Department', name: 'department', icon: Activity },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[12px] text-muted mb-1.5">{field.label}</label>
                    {editing ? (
                      <input name={field.name} value={form[field.name]} onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
                    ) : (
                      <p className="text-[14px] text-text">{form[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-[12px] text-muted mb-1.5">Bio</label>
                {editing ? (
                  <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] text-text focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none" />
                ) : (
                  <p className="text-[14px] text-text-secondary leading-relaxed">{form.bio}</p>
                )}
              </div>
            </div>

            {/* Specializations */}
            <div className="animate-in delay-3">
              <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-[12px] text-text-secondary">{s}</span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="animate-in delay-4">
              <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">Certifications</h3>
              <div className="space-y-3">
                {doctor.certifications.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-muted" />
                      <span className="text-[14px] text-text">{c.name}</span>
                    </div>
                    <span className="text-[12px] text-muted">{c.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* License */}
            <div className="animate-in delay-4">
              <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">Compliance</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[12px] text-muted mb-1">Medical License</p>
                  <p className="text-[14px] text-text">{doctor.license}</p>
                </div>
                <div>
                  <p className="text-[12px] text-muted mb-1">HIPAA Status</p>
                  <p className="text-[14px] text-emerald-600 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Compliant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Activity */}
          <div className="animate-in delay-2">
            <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-6">Recent Activity</h3>
            <div className="space-y-5">
              {doctor.activity.map((a, i) => (
                <div key={i}>
                  <p className="text-[13px] text-text leading-snug">{a.text}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 my-8" />

            <h3 className="text-[13px] font-semibold text-text uppercase tracking-wide mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-[13px] text-primary hover:underline">Open Dashboard</Link>
              <Link to="/products" className="block text-[13px] text-primary hover:underline">View Products</Link>
              <Link to="/contact" className="block text-[13px] text-primary hover:underline">Contact Support</Link>
            </div>

            <div className="mt-8">
              <p className="text-[12px] text-muted">
                <MapPin className="w-3 h-3 inline mr-1" />{doctor.location} · Since {doctor.since}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toast message="Profile updated" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
