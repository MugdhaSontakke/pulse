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

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Patients', id: 'patients' },
  { icon: Bell, label: 'Alerts', id: 'alerts' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

function riskColor(score) {
  if (score >= 70) return { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', label: 'Critical' }
  if (score >= 40) return { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500', label: 'Moderate' }
  return { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', label: 'Low' }
}

export default function Dashboard() {
  const [patients, setPatients] = useState(initialPatients)
  const [vitalsHistory, setVitalsHistory] = useState(generateVitalsHistory)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t) }, [])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setPatients((prev) => refreshPatientData(prev))
      setVitalsHistory(generateVitalsHistory())
      setRefreshing(false)
    }, 500)
  }, [])

  const filteredPatients = patients.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const criticalCount = alertsData.filter((a) => a.type === 'critical').length

  return (
    <div className="flex h-screen bg-bg-subtle overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/10 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-semibold text-text">EdgeMedical</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1"><X className="w-4 h-4 text-muted" /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                activeTab === item.id ? 'bg-gray-50 text-text' : 'text-muted hover:text-text hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.id === 'alerts' && <span className="ml-auto text-[11px] font-semibold text-red-500">{criticalCount}</span>}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
          <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted hover:text-text hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-text">SC</div>
            Dr. Sarah Chen
          </Link>
          <Link to="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted hover:text-text hover:bg-gray-50 transition-colors">
            <LogOut className="w-4 h-4" />Exit
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5"><Menu className="w-4 h-4 text-muted" /></button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search patients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 w-48 sm:w-56 border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleRefresh} disabled={refreshing} className="p-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors" title="Refresh">
              <RefreshCw className={`w-4 h-4 text-muted ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="relative p-1.5 rounded-lg hover:bg-gray-50">
              <Bell className="w-4 h-4 text-muted" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <Link to="/profile" className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-text ml-2">SC</Link>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-100 rounded-xl px-5 py-4">
                <p className="text-[12px] text-muted mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-text">{stat.value}</span>
                  <span className={`text-[11px] font-medium mb-0.5 ${stat.trend === 'up' ? 'text-red-500' : 'text-emerald-500'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-6"><SkeletonChart /><SkeletonChart /></div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 animate-in delay-1">
              <div className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <h3 className="text-[13px] font-semibold text-text">Heart Rate</h3>
                  </div>
                  <span className="text-[11px] text-muted">24h</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={vitalsHistory}>
                    <defs><linearGradient id="hrG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.08} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <YAxis domain={[60, 120]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={1.5} fill="url(#hrG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <h3 className="text-[13px] font-semibold text-text">SpO2</h3>
                  </div>
                  <span className="text-[11px] text-muted">24h</span>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="transparent" />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Line type="monotone" dataKey="spO2" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Patient Table */}
            <div className="lg:col-span-2">
              {loading ? <SkeletonTable /> : (
                <div className="bg-white border border-gray-100 rounded-xl animate-in delay-2">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
                    <h3 className="text-[13px] font-semibold text-text">Patients</h3>
                    <button onClick={handleRefresh} disabled={refreshing} className="text-[12px] font-medium text-primary hover:underline disabled:opacity-50">
                      {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-gray-50">
                          <th className="text-left px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">Patient</th>
                          <th className="text-left px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider hidden sm:table-cell">Room</th>
                          <th className="text-center px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">HR</th>
                          <th className="text-center px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">SpO2</th>
                          <th className="text-center px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider hidden md:table-cell">Temp</th>
                          <th className="text-center px-5 py-2.5 text-[11px] font-medium text-muted uppercase tracking-wider">Risk</th>
                          <th className="px-3 py-2.5"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.map((p) => {
                          const r = riskColor(p.riskScore)
                          return (
                            <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedPatient(p)}>
                              <td className="px-5 py-3">
                                <p className="font-medium text-text">{p.name}</p>
                                <p className="text-[11px] text-muted">{p.id}</p>
                              </td>
                              <td className="px-5 py-3 text-muted hidden sm:table-cell">{p.room}</td>
                              <td className="px-5 py-3 text-center text-text">{p.vitals.heartRate}</td>
                              <td className="px-5 py-3 text-center text-text">{p.vitals.spO2}%</td>
                              <td className="px-5 py-3 text-center text-text hidden md:table-cell">{p.vitals.temperature}°</td>
                              <td className="px-5 py-3 text-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${r.bg} ${r.text}`}>
                                  <span className={`w-1 h-1 rounded-full ${r.dot}`} />{p.riskScore}%
                                </span>
                              </td>
                              <td className="px-3 py-3">
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Alerts */}
            <div className="bg-white border border-gray-100 rounded-xl animate-in delay-3">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
                <h3 className="text-[13px] font-semibold text-text">Alerts</h3>
                <span className="text-[11px] text-muted">{alertsData.length} total</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="px-5 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => {
                    const p = patients.find(pt => pt.id === alert.patientId)
                    if (p) setSelectedPatient(p)
                  }}>
                    <div className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-400'
                      }`} />
                      <div>
                        <p className="text-[13px] font-medium text-text">{alert.patient}</p>
                        <p className="text-[12px] text-muted mt-0.5">{alert.message}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title={selectedPatient ? `${selectedPatient.name}` : ''}>
        {selectedPatient && <PatientDetail patient={selectedPatient} />}
      </Modal>
    </div>
  )
}

function PatientDetail({ patient }) {
  const r = riskColor(patient.riskScore)
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${r.bg} ${r.text}`}>
            <span className={`w-1 h-1 rounded-full ${r.dot}`} />{r.label} · {patient.riskScore}%
          </span>
        </div>
        <p className="text-[14px] text-muted">{patient.age}y · {patient.gender} · {patient.room} · {patient.condition}</p>
      </div>

      {/* Risk Bar */}
      <div>
        <div className="flex items-center justify-between text-[13px] mb-2">
          <span className="text-muted">AI Risk Score</span>
          <span className={`font-semibold ${r.text}`}>{patient.riskScore}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${patient.riskScore >= 70 ? 'bg-red-500' : patient.riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${patient.riskScore}%` }} />
        </div>
      </div>

      {/* Vitals */}
      <div>
        <h4 className="text-[13px] font-semibold text-text mb-3">Vitals</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Heart, label: 'Heart Rate', value: `${patient.vitals.heartRate} bpm`, color: 'text-rose-500' },
            { icon: Droplets, label: 'SpO2', value: `${patient.vitals.spO2}%`, color: 'text-blue-500' },
            { icon: Thermometer, label: 'Temp', value: `${patient.vitals.temperature}°F`, color: 'text-amber-500' },
            { icon: Wind, label: 'Resp Rate', value: `${patient.vitals.respiratoryRate}/min`, color: 'text-emerald-500' },
          ].map((v) => (
            <div key={v.label} className="border border-gray-100 rounded-lg px-3.5 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <v.icon className={`w-3.5 h-3.5 ${v.color}`} />
                <span className="text-[11px] text-muted">{v.label}</span>
              </div>
              <span className="text-[15px] font-semibold text-text">{v.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {patient.alerts.length > 0 && (
        <div>
          <h4 className="text-[13px] font-semibold text-text mb-3">Alerts</h4>
          <div className="space-y-2">
            {patient.alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] text-text bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />{a}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      <div>
        <h4 className="text-[13px] font-semibold text-text mb-3">Medications</h4>
        <div className="flex flex-wrap gap-1.5">
          {patient.medications.map((m) => (
            <span key={m} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[12px] text-text-secondary">{m}</span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 className="text-[13px] font-semibold text-text mb-2">Notes</h4>
        <p className="text-[13px] text-muted leading-relaxed">{patient.notes}</p>
      </div>

      <div className="text-[11px] text-gray-400 flex justify-between pt-3 border-t border-gray-100">
        <span>Admitted {patient.admitDate}</span>
        <span>{patient.doctor}</span>
      </div>
    </div>
  )
}
