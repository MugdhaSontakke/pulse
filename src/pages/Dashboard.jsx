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
import { SkeletonTable, SkeletonChart } from '../components/Skeleton'

const tabs = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Patients', id: 'patients' },
  { icon: Bell, label: 'Alerts', id: 'alerts' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function risk(s) {
  if (s >= 70) return { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', label: 'Critical' }
  if (s >= 40) return { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500', label: 'Moderate' }
  return { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', label: 'Low' }
}

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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {sidebar && <div className="fixed inset-0 bg-black/10 z-40 lg:hidden" onClick={() => setSidebar(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-white border-r border-slate-100 flex flex-col transition-transform duration-200 lg:translate-x-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-14 px-5 flex items-center justify-between border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">EdgeMedical</span>
          </Link>
          <button onClick={() => setSidebar(false)} className="lg:hidden p-1"><X className="w-4 h-4 text-slate-400" /></button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${tab === t.id ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
              <t.icon className="w-4 h-4" />{t.label}
              {t.id === 'alerts' && <span className="ml-auto text-xs font-semibold text-red-500">{criticals}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1">
          <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">SC</div>
            Dr. Sarah Chen
          </Link>
          <Link to="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <LogOut className="w-4 h-4" />Exit
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-slate-100 px-4 lg:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebar(true)} className="lg:hidden p-1.5"><Menu className="w-4 h-4 text-slate-500" /></button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Search patients..." value={query} onChange={e => setQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 w-48 sm:w-56 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} disabled={refreshing} className="p-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-50" title="Refresh">
              <RefreshCw className={`w-4 h-4 text-slate-500 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="relative p-1.5 rounded-lg hover:bg-slate-50">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <Link to="/profile" className="ml-2 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">SC</Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 fade-up">
            {dashboardStats.map(s => (
              <div key={s.label} className="bg-white border border-slate-100 rounded-xl px-5 py-4">
                <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-slate-900">{s.value}</span>
                  <span className={`text-xs font-medium mb-0.5 ${s.trend === 'up' ? 'text-red-500' : 'text-emerald-500'}`}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-6"><SkeletonChart /><SkeletonChart /></div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 fade-up-d1">
              <div className="bg-white border border-slate-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" /><span className="text-sm font-semibold text-slate-900">Heart Rate</span></div>
                  <span className="text-xs text-slate-400">24h</span>
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
              <div className="bg-white border border-slate-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-500" /><span className="text-sm font-semibold text-slate-900">SpO2</span></div>
                  <span className="text-xs text-slate-400">24h</span>
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Table */}
            <div className="lg:col-span-2">
              {loading ? <SkeletonTable /> : (
                <div className="bg-white border border-slate-100 rounded-xl fade-up-d2">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
                    <span className="text-sm font-semibold text-slate-900">Patients</span>
                    <button onClick={refresh} disabled={refreshing} className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50">{refreshing ? 'Refreshing...' : 'Refresh'}</button>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-50">
                        {['Patient','Room','HR','SpO2','Temp','Risk',''].map((h,i) => (
                          <th key={i} className={`py-3 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider ${i>=2&&i<=5?'text-center':''} ${i===1?'hidden sm:table-cell':''} ${i===4?'hidden md:table-cell':''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(p => { const r = risk(p.riskScore); return (
                        <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 cursor-pointer transition-colors" onClick={() => setSelected(p)}>
                          <td className="px-5 py-3.5"><p className="font-medium text-slate-900">{p.name}</p><p className="text-xs text-slate-400">{p.id}</p></td>
                          <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">{p.room}</td>
                          <td className="px-5 py-3.5 text-center text-slate-700">{p.vitals.heartRate}</td>
                          <td className="px-5 py-3.5 text-center text-slate-700">{p.vitals.spO2}%</td>
                          <td className="px-5 py-3.5 text-center text-slate-700 hidden md:table-cell">{p.vitals.temperature}°</td>
                          <td className="px-5 py-3.5 text-center"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.bg} ${r.text}`}><span className={`w-1 h-1 rounded-full ${r.dot}`} />{p.riskScore}%</span></td>
                          <td className="px-3"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Alerts */}
            <div className="bg-white border border-slate-100 rounded-xl fade-up-d3">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
                <span className="text-sm font-semibold text-slate-900">Alerts</span>
                <span className="text-xs text-slate-400">{alertsData.length}</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-[420px] overflow-y-auto">
                {alertsData.map(a => (
                  <div key={a.id} className="px-5 py-3.5 hover:bg-slate-50/60 cursor-pointer transition-colors" onClick={() => { const p = patients.find(pt => pt.id === a.patientId); if (p) setSelected(p) }}>
                    <div className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${a.type === 'critical' ? 'bg-red-500' : a.type === 'warning' ? 'bg-amber-500' : 'bg-blue-400'}`} />
                      <div><p className="text-sm font-medium text-slate-900">{a.patient}</p><p className="text-xs text-slate-500 mt-0.5">{a.message}</p><p className="text-xs text-slate-400 mt-1">{a.time}</p></div>
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
  const r = risk(p.riskScore)
  return (
    <div className="space-y-8">
      <div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.bg} ${r.text} mb-2`}><span className={`w-1 h-1 rounded-full ${r.dot}`} />{r.label} · {p.riskScore}%</span>
        <p className="text-sm text-slate-500 mt-1">{p.age}y · {p.gender} · {p.room} · {p.condition}</p>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">AI Risk Score</span><span className={`font-semibold ${r.text}`}>{p.riskScore}%</span></div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full"><div className={`h-full rounded-full ${p.riskScore >= 70 ? 'bg-red-500' : p.riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${p.riskScore}%` }} /></div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 mb-4">Vitals</p>
        <div className="grid grid-cols-2 gap-4">
          {[{i:Heart,l:'Heart Rate',v:`${p.vitals.heartRate} bpm`,c:'text-rose-500'},{i:Droplets,l:'SpO2',v:`${p.vitals.spO2}%`,c:'text-blue-500'},{i:Thermometer,l:'Temp',v:`${p.vitals.temperature}°F`,c:'text-amber-500'},{i:Wind,l:'Resp Rate',v:`${p.vitals.respiratoryRate}/min`,c:'text-emerald-500'}].map(v=>(
            <div key={v.l} className="border border-slate-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1"><v.i className={`w-3.5 h-3.5 ${v.c}`} /><span className="text-xs text-slate-500">{v.l}</span></div>
              <span className="text-base font-semibold text-slate-900">{v.v}</span>
            </div>
          ))}
        </div>
      </div>
      {p.alerts.length > 0 && <div><p className="text-sm font-semibold text-slate-900 mb-3">Alerts</p>{p.alerts.map((a,i) => <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />{a}</div>)}</div>}
      <div><p className="text-sm font-semibold text-slate-900 mb-3">Medications</p><div className="flex flex-wrap gap-2">{p.medications.map(m => <span key={m} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded text-xs text-slate-600">{m}</span>)}</div></div>
      <div><p className="text-sm font-semibold text-slate-900 mb-2">Notes</p><p className="text-sm text-slate-500 leading-relaxed">{p.notes}</p></div>
      <div className="text-xs text-slate-400 flex justify-between pt-4 border-t border-slate-100"><span>Admitted {p.admitDate}</span><span>{p.doctor}</span></div>
    </div>
  )
}
