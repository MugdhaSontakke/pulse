import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, Users, Bell, Settings, ChevronRight, RefreshCw,
  Heart, Thermometer, Wind, Droplets, AlertTriangle, Search,
  LogOut, Menu, X,
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

// ===== Sidebar Navigation =====
const sidebarItems = [
  { icon: Users, label: 'Patients', active: true },
  { icon: Bell, label: 'Alerts' },
  { icon: Settings, label: 'Settings' },
]

// ===== Risk color helper =====
function riskColor(score) {
  if (score >= 70) return { bg: 'bg-risk-red/10', text: 'text-risk-red', ring: 'ring-risk-red/20', label: 'Critical' }
  if (score >= 40) return { bg: 'bg-risk-yellow/10', text: 'text-risk-yellow', ring: 'ring-risk-yellow/20', label: 'Moderate' }
  return { bg: 'bg-risk-green/10', text: 'text-risk-green', ring: 'ring-risk-green/20', label: 'Low' }
}

export default function Dashboard() {
  const [patients, setPatients] = useState(initialPatients)
  const [vitalsHistory, setVitalsHistory] = useState(generateVitalsHistory)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setPatients((prev) => refreshPatientData(prev))
      setVitalsHistory(generateVitalsHistory())
      setRefreshing(false)
    }, 600)
  }, [])

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const criticalAlerts = alertsData.filter((a) => a.type === 'critical')

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface-sidebar text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">EdgeMedical</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.label === 'Alerts' && (
                <span className="ml-auto bg-risk-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {criticalAlerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
            <LogOut className="w-5 h-5" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-48 sm:w-64 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-risk-red rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                SC
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">Dr. Sarah Chen</p>
                <p className="text-xs text-gray-500">Cardiology</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-xs font-semibold mb-1 ${stat.trend === 'up' ? 'text-risk-red' : 'text-risk-green'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-6">
              <SkeletonChart />
              <SkeletonChart />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {/* Heart Rate Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    <h3 className="text-sm font-semibold text-gray-900">Heart Rate Trend</h3>
                  </div>
                  <span className="text-xs text-gray-400">24h</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={vitalsHistory}>
                    <defs>
                      <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis domain={[60, 120]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2} fill="url(#hrGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* SpO2 Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-semibold text-gray-900">SpO2 Levels</h3>
                  </div>
                  <span className="text-xs text-gray-400">24h</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalsHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Line type="monotone" dataKey="spO2" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Patient Table */}
            <div className="lg:col-span-2">
              {loading ? (
                <SkeletonTable />
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-semibold text-gray-900">Patient List</h3>
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 disabled:opacity-50 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                      Refresh Data
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                          <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Room</th>
                          <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">HR</th>
                          <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SpO2</th>
                          <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Temp</th>
                          <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                          <th className="px-5 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredPatients.map((patient) => {
                          const risk = riskColor(patient.riskScore)
                          return (
                            <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-full ${risk.bg} flex items-center justify-center shrink-0 ring-2 ${risk.ring}`}>
                                    <span className={`text-xs font-bold ${risk.text}`}>{patient.name.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{patient.name}</p>
                                    <p className="text-xs text-gray-400">{patient.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-gray-600 hidden sm:table-cell">{patient.room}</td>
                              <td className="px-5 py-3.5 text-center font-medium">{patient.vitals.heartRate}</td>
                              <td className="px-5 py-3.5 text-center font-medium">{patient.vitals.spO2}%</td>
                              <td className="px-5 py-3.5 text-center font-medium hidden md:table-cell">{patient.vitals.temperature}°F</td>
                              <td className="px-5 py-3.5 text-center">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${risk.bg} ${risk.text}`}>
                                  {patient.riskScore}%
                                </span>
                              </td>
                              <td className="px-5 py-3.5">
                                <button
                                  onClick={() => setSelectedPatient(patient)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
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

            {/* Alerts Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                <AlertTriangle className="w-4 h-4 text-risk-red" />
                <h3 className="text-sm font-semibold text-gray-900">Active Alerts</h3>
              </div>
              <div className="divide-y divide-gray-50 max-h-[460px] overflow-y-auto">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        alert.type === 'critical' ? 'bg-risk-red animate-pulse' :
                        alert.type === 'warning' ? 'bg-risk-yellow' : 'bg-primary-400'
                      }`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{alert.patient}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Patient Detail Modal */}
      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title={selectedPatient ? `${selectedPatient.name} — ${selectedPatient.id}` : ''}>
        {selectedPatient && <PatientDetail patient={selectedPatient} />}
      </Modal>
    </div>
  )
}

// ===== Patient Detail Component =====
function PatientDetail({ patient }) {
  const risk = riskColor(patient.riskScore)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${risk.bg} flex items-center justify-center ring-2 ${risk.ring}`}>
          <span className={`text-xl font-bold ${risk.text}`}>{patient.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{patient.name}</p>
          <p className="text-sm text-gray-500">{patient.age}y • {patient.gender} • {patient.room}</p>
          <p className="text-sm text-primary-600 font-medium">{patient.condition}</p>
        </div>
      </div>

      {/* Risk Score */}
      <div className={`rounded-2xl ${risk.bg} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">AI Risk Score</span>
          <span className={`text-2xl font-bold ${risk.text}`}>{patient.riskScore}%</span>
        </div>
        <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${
            patient.riskScore >= 70 ? 'bg-risk-red' : patient.riskScore >= 40 ? 'bg-risk-yellow' : 'bg-risk-green'
          }`} style={{ width: `${patient.riskScore}%` }} />
        </div>
        <p className={`text-xs font-medium mt-1.5 ${risk.text}`}>{risk.label} Risk</p>
      </div>

      {/* Vitals Grid */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Live Vitals</h4>
        <div className="grid grid-cols-2 gap-3">
          <VitalCard icon={Heart} label="Heart Rate" value={`${patient.vitals.heartRate} bpm`} color="text-rose-500" bg="bg-rose-50" />
          <VitalCard icon={Droplets} label="SpO2" value={`${patient.vitals.spO2}%`} color="text-blue-500" bg="bg-blue-50" />
          <VitalCard icon={Thermometer} label="Temperature" value={`${patient.vitals.temperature}°F`} color="text-amber-500" bg="bg-amber-50" />
          <VitalCard icon={Wind} label="Resp. Rate" value={`${patient.vitals.respiratoryRate}/min`} color="text-emerald-500" bg="bg-emerald-50" />
        </div>
      </div>

      {/* Alerts */}
      {patient.alerts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Active Alerts</h4>
          <div className="space-y-2">
            {patient.alerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-2 bg-risk-red/5 border border-risk-red/10 rounded-xl px-4 py-2.5">
                <AlertTriangle className="w-4 h-4 text-risk-red shrink-0" />
                <span className="text-sm text-gray-700">{alert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Medications</h4>
        <div className="flex flex-wrap gap-2">
          {patient.medications.map((med) => (
            <span key={med} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">{med}</span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Clinical Notes</h4>
        <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 leading-relaxed">{patient.notes}</p>
      </div>

      {/* Info */}
      <div className="text-xs text-gray-400 flex items-center justify-between pt-2 border-t border-gray-100">
        <span>Admitted: {patient.admitDate}</span>
        <span>Attending: {patient.doctor}</span>
      </div>
    </div>
  )
}

function VitalCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-3.5`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  )
}
