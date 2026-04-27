import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User, Mail, Phone, MapPin, Calendar, Award, Activity,
  Shield, Clock, FileText, Edit3, Save, ArrowLeft,
  Heart, Users, Bell, Star, TrendingUp, Building2,
} from 'lucide-react'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const doctorProfile = {
  name: 'Dr. Sarah Chen',
  title: 'Senior Cardiologist',
  department: 'Cardiology',
  hospital: 'Edge Medical Center',
  email: 'sarah.chen@edgemedical.io',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  joinDate: 'March 2019',
  licenseNo: 'CA-MED-2019-4827',
  specializations: ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology'],
  certifications: [
    { name: 'Board Certified — Cardiovascular Disease', year: '2018' },
    { name: 'Advanced Cardiac Life Support (ACLS)', year: '2023' },
    { name: 'HIPAA Compliance Certification', year: '2024' },
  ],
  stats: [
    { label: 'Patients Managed', value: '342', icon: Users, color: 'text-primary-400' },
    { label: 'Critical Cases', value: '28', icon: Heart, color: 'text-rose-400' },
    { label: 'Avg. Response Time', value: '< 3min', icon: Clock, color: 'text-emerald-400' },
    { label: 'Rating', value: '4.9/5', icon: Star, color: 'text-amber-400' },
  ],
  recentActivity: [
    { action: 'Reviewed vitals for Marcus Thompson', time: '2 hours ago', type: 'review' },
    { action: 'Updated medication for Robert Kim', time: '4 hours ago', type: 'update' },
    { action: 'Discharged Lisa Chen — Post-Appendectomy', time: '6 hours ago', type: 'discharge' },
    { action: 'Critical alert responded — SpO2 drop', time: '8 hours ago', type: 'alert' },
    { action: 'Added clinical notes for Eleanor Vance', time: '1 day ago', type: 'note' },
  ],
}

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [profile, setProfile] = useState({
    name: doctorProfile.name,
    email: doctorProfile.email,
    phone: doctorProfile.phone,
    department: doctorProfile.department,
    bio: 'Dedicated cardiologist with 12+ years of experience in interventional cardiology and heart failure management. Passionate about leveraging AI and edge computing to improve patient outcomes.',
  })

  const handleSave = () => {
    setEditing(false)
    setShowToast(true)
  }

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="pt-16">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="orb orb-blue w-[500px] h-[500px] top-[-100px] right-[-150px]" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-[10%] left-[-150px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Profile Header */}
          <div className="glass-strong rounded-3xl p-8 mb-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-primary-500/25 ring-4 ring-white/10">
                SC
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-extrabold text-white">{doctorProfile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                </div>
                <p className="text-primary-400 font-medium">{doctorProfile.title}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{doctorProfile.hospital}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{doctorProfile.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Since {doctorProfile.joinDate}</span>
                </div>
              </div>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className={editing ? 'btn-primary' : 'btn-secondary'}
              >
                {editing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {doctorProfile.stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <stat.icon className={`w-5 h-5 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Editable Info */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                    {editing ? (
                      <input name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl glass-input text-sm" />
                    ) : (
                      <p className="text-white font-medium flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                    {editing ? (
                      <input name="email" value={profile.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl glass-input text-sm" />
                    ) : (
                      <p className="text-white font-medium flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500" />{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                    {editing ? (
                      <input name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl glass-input text-sm" />
                    ) : (
                      <p className="text-white font-medium flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" />{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Department</label>
                    {editing ? (
                      <input name="department" value={profile.department} onChange={handleChange} className="w-full px-4 py-3 rounded-xl glass-input text-sm" />
                    ) : (
                      <p className="text-white font-medium flex items-center gap-2"><Activity className="w-4 h-4 text-gray-500" />{profile.department}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
                  {editing ? (
                    <textarea name="bio" value={profile.bio} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none" />
                  ) : (
                    <p className="text-sm text-gray-400 leading-relaxed">{profile.bio}</p>
                  )}
                </div>
              </div>

              {/* Specializations & Certifications */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Specializations</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {doctorProfile.specializations.map((spec) => (
                    <span key={spec} className="px-3 py-1.5 glass rounded-lg text-xs font-medium text-primary-400 border border-primary-500/20">
                      {spec}
                    </span>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Certifications</h3>
                <div className="space-y-3">
                  {doctorProfile.certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                      <Award className="w-5 h-5 text-amber-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{cert.name}</p>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* License Info */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">License & Compliance</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-500">Medical License</span>
                    </div>
                    <p className="text-sm font-medium text-white">{doctorProfile.licenseNo}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-500">HIPAA Status</span>
                    </div>
                    <p className="text-sm font-medium text-emerald-400">✓ Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Activity */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-primary-400" />
                  <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                  {doctorProfile.recentActivity.map((item, i) => {
                    const typeColors = {
                      review: 'bg-primary-400',
                      update: 'bg-amber-400',
                      discharge: 'bg-emerald-400',
                      alert: 'bg-red-400',
                      note: 'bg-violet-400',
                    }
                    return (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-2 h-2 rounded-full ${typeColors[item.type] || 'bg-gray-500'} mt-2`} />
                          {i < doctorProfile.recentActivity.length - 1 && (
                            <div className="w-px h-full bg-white/5 mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-sm text-gray-300">{item.action}</p>
                          <p className="text-xs text-gray-600 mt-1">{item.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/dashboard" className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <Activity className="w-4 h-4 text-primary-400" />
                    Open Dashboard
                  </Link>
                  <Link to="/products" className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <FileText className="w-4 h-4 text-violet-400" />
                    View Products
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                    <Bell className="w-4 h-4 text-amber-400" />
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Toast message="Profile updated successfully!" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  )
}
