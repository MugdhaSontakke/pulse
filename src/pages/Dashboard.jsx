import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, Users, Bell, ChevronRight, RefreshCw,
  Heart, Thermometer, Wind, Droplets, AlertTriangle, Search,
  LogOut, Menu, X, Settings, LayoutDashboard, FileText,
} from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  patients as initialPatients, dashboardStats, alertsData,
  generateVitalsHistory, refreshPatientData,
} from '../data/mockData'
import Modal from '../components/Modal'

const tabs = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Patients', id: 'patients' },
  { icon: Bell, label: 'Alerts', id: 'alerts' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function riskStyle(s) {
  if (s >= 70) return { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444', label: 'Critical' }
  if (s >= 40) return { bg: '#fefce8', color: '#ca8a04', dot: '#eab308', label: 'Moderate' }
  return { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e', label: 'Low' }
}

const card = { background: '#fff', border: '1px solid #f1f5f9', borderRadius: 14 }

export default function Dashboard() {
  const [patients, setPatients] = useState(initialPatients)
  const [vitals, setVitals] = useState(generateVitalsHistory)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selected, setSelected] = useState(null)
  const [sidebar, setSidebar] = useState(false)
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('overview')

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t) }, [])

  const refresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => { setPatients(p => refreshPatientData(p)); setVitals(generateVitalsHistory()); setRefreshing(false) }, 500)
  }, [])

  const filtered = patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()))
  const criticals = alertsData.filter(a => a.type === 'critical').length

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
      {sidebar && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.08)', zIndex: 40 }} className="lg:hidden" onClick={() => setSidebar(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-200 lg:translate-x-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 240, background: '#fff', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 72, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Activity style={{ width: 18, height: 18, color: '#2563eb' }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>EdgeMedical</span>
          </Link>
          <button onClick={() => setSidebar(false)} className="lg:hidden" style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}><X style={{ width: 18, height: 18, color: '#94a3b8' }} /></button>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10,
              fontSize: 14, fontWeight: tab === t.id ? 500 : 400,
              color: tab === t.id ? '#0f172a' : '#64748b',
              background: tab === t.id ? '#f8fafc' : 'transparent',
              border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s',
            }}>
              <t.icon style={{ width: 18, height: 18 }} />{t.label}
              {t.id === 'alerts' && <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#dc2626' }}>{criticals}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#64748b', textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#475569' }}>SC</div>
            Dr. Sarah Chen
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, fontSize: 14, color: '#64748b', textDecoration: 'none' }}>
            <LogOut style={{ width: 18, height: 18 }} />Exit
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{ height: 72, background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSidebar(true)} className="lg:hidden" style={{ padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}><Menu style={{ width: 20, height: 20, color: '#64748b' }} /></button>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#94a3b8' }} />
              <input type="text" placeholder="Search patients..." value={query} onChange={e => setQuery(e.target.value)} className="input" style={{ paddingLeft: 36, width: 240, padding: '10px 14px 10px 36px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={refresh} disabled={refreshing} style={{ padding: 8, borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', opacity: refreshing ? 0.5 : 1 }} title="Refresh">
              <RefreshCw style={{ width: 18, height: 18, color: '#64748b', animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            </button>
            <button style={{ position: 'relative', padding: 8, borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
              <Bell style={{ width: 18, height: 18, color: '#64748b' }} />
              <span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: '#ef4444', borderRadius: '50%' }} />
            </button>
            <Link to="/profile" style={{ marginLeft: 8, width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#475569', textDecoration: 'none' }}>SC</Link>
          </div>
        </header>

        {/* Body */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="fade-up">
            {dashboardStats.map(s => (
              <div key={s.label} style={{ ...card, padding: '20px 24px' }}>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{s.label}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{s.value}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: s.trend === 'up' ? '#dc2626' : '#16a34a', marginBottom: 2 }}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          {!loading && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }} className="fade-up-d1">
              <div style={{ ...card, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Heart style={{ width: 16, height: 16, color: '#f43f5e' }} /><span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Heart Rate</span></div>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>24h</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={vitals}>
                    <defs><linearGradient id="hrG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.06} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <YAxis domain={[60, 120]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} />
                    <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={1.5} fill="url(#hrG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ ...card, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Droplets style={{ width: 16, height: 16, color: '#3b82f6' }} /><span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>SpO2</span></div>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>24h</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={vitals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }} />
                    <Line type="monotone" dataKey="spO2" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            {/* Table */}
            <div style={card} className="fade-up-d2">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Patients</span>
                <button onClick={refresh} className="btn-link" style={{ fontSize: 13 }} disabled={refreshing}>{refreshing ? 'Refreshing...' : 'Refresh'}</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    {['Patient','Room','HR','SpO2','Temp','Risk',''].map((h,i) => (
                      <th key={i} style={{ padding: '12px 24px', fontSize: 11, fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: i >= 2 && i <= 5 ? 'center' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => { const r = riskStyle(p.riskScore); return (
                    <tr key={p.id} onClick={() => setSelected(p)} style={{ borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background='#fafbfc'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      <td style={{ padding: '14px 24px' }}>
                        <p style={{ fontWeight: 500, color: '#0f172a', marginBottom: 2 }}>{p.name}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8' }}>{p.id}</p>
                      </td>
                      <td style={{ padding: '14px 24px', color: '#64748b' }}>{p.room}</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', color: '#334155' }}>{p.vitals.heartRate}</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', color: '#334155' }}>{p.vitals.spO2}%</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center', color: '#334155' }}>{p.vitals.temperature}°</td>
                      <td style={{ padding: '14px 24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: r.bg, color: r.color }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.dot }} />{p.riskScore}%
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px' }}><ChevronRight style={{ width: 14, height: 14, color: '#cbd5e1' }} /></td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            {/* Alerts */}
            <div style={card} className="fade-up-d3">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Alerts</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{alertsData.length}</span>
              </div>
              <div style={{ maxHeight: 440, overflowY: 'auto' }}>
                {alertsData.map(a => (
                  <div key={a.id} onClick={() => { const p = patients.find(pt => pt.id === a.patientId); if (p) setSelected(p) }}
                    style={{ padding: '14px 24px', borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#fafbfc'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: a.type === 'critical' ? '#ef4444' : a.type === 'warning' ? '#eab308' : '#3b82f6' }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{a.patient}</p>
                        <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>{a.message}</p>
                        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{a.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''}>
        {selected && <PatientDetail patient={selected} />}
      </Modal>
    </div>
  )
}

function PatientDetail({ patient: p }) {
  const r = riskStyle(p.riskScore)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: r.bg, color: r.color, marginBottom: 8 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.dot }} />{r.label} · {p.riskScore}%
        </span>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>{p.age}y · {p.gender} · {p.room} · {p.condition}</p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
          <span style={{ color: '#64748b' }}>AI Risk Score</span>
          <span style={{ fontWeight: 600, color: r.color }}>{p.riskScore}%</span>
        </div>
        <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 999 }}>
          <div style={{ height: '100%', borderRadius: 999, background: r.dot, width: `${p.riskScore}%`, transition: 'width 0.5s' }} />
        </div>
      </div>

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 14 }}>Vitals</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { i: Heart, l: 'Heart Rate', v: `${p.vitals.heartRate} bpm`, c: '#f43f5e' },
            { i: Droplets, l: 'SpO2', v: `${p.vitals.spO2}%`, c: '#3b82f6' },
            { i: Thermometer, l: 'Temp', v: `${p.vitals.temperature}°F`, c: '#f59e0b' },
            { i: Wind, l: 'Resp Rate', v: `${p.vitals.respiratoryRate}/min`, c: '#10b981' },
          ].map(v => (
            <div key={v.l} style={{ border: '1px solid #f1f5f9', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <v.i style={{ width: 14, height: 14, color: v.c }} /><span style={{ fontSize: 12, color: '#64748b' }}>{v.l}</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>{v.v}</span>
            </div>
          ))}
        </div>
      </div>

      {p.alerts.length > 0 && (
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Alerts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.alerts.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px' }}>
                <AlertTriangle style={{ width: 14, height: 14, color: '#ef4444', flexShrink: 0 }} />{a}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Medications</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {p.medications.map(m => <span key={m} style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 6, fontSize: 13, color: '#475569' }}>{m}</span>)}
        </div>
      </div>

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Notes</p>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{p.notes}</p>
      </div>

      <div style={{ fontSize: 12, color: '#94a3b8', display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
        <span>Admitted {p.admitDate}</span><span>{p.doctor}</span>
      </div>
    </div>
  )
}
