// ===== Patient Mock Data =====
export const patients = [
  {
    id: 'P-101',
    name: 'Eleanor Vance',
    age: 67,
    gender: 'Female',
    room: 'ICU-4A',
    condition: 'Post-Cardiac Surgery',
    admitDate: '2026-04-20',
    doctor: 'Dr. Sarah Chen',
    vitals: {
      heartRate: 78,
      spO2: 97,
      temperature: 98.4,
      bloodPressure: '128/82',
      respiratoryRate: 16,
    },
    riskScore: 24,
    alerts: [],
    medications: ['Metoprolol', 'Aspirin', 'Lisinopril'],
    notes: 'Recovery progressing well. Continue monitoring cardiac output.',
  },
  {
    id: 'P-102',
    name: 'Marcus Thompson',
    age: 54,
    gender: 'Male',
    room: 'ICU-2B',
    condition: 'Acute Respiratory Distress',
    admitDate: '2026-04-22',
    doctor: 'Dr. James Park',
    vitals: {
      heartRate: 112,
      spO2: 89,
      temperature: 101.2,
      bloodPressure: '145/95',
      respiratoryRate: 28,
    },
    riskScore: 82,
    alerts: ['SpO2 below threshold', 'Elevated heart rate', 'High fever detected'],
    medications: ['Dexamethasone', 'Remdesivir', 'Heparin'],
    notes: 'Critical condition. Ventilator support required. Closely monitor ABG.',
  },
  {
    id: 'P-103',
    name: 'Aisha Patel',
    age: 41,
    gender: 'Female',
    room: 'W-12',
    condition: 'Diabetic Ketoacidosis',
    admitDate: '2026-04-24',
    doctor: 'Dr. Emily Rodriguez',
    vitals: {
      heartRate: 94,
      spO2: 95,
      temperature: 99.1,
      bloodPressure: '118/76',
      respiratoryRate: 22,
    },
    riskScore: 56,
    alerts: ['Blood glucose elevated'],
    medications: ['Insulin Drip', 'Normal Saline', 'Potassium Chloride'],
    notes: 'Fluid resuscitation ongoing. Monitor serum potassium closely.',
  },
  {
    id: 'P-104',
    name: 'Robert Kim',
    age: 72,
    gender: 'Male',
    room: 'ICU-1A',
    condition: 'Sepsis',
    admitDate: '2026-04-21',
    doctor: 'Dr. Sarah Chen',
    vitals: {
      heartRate: 105,
      spO2: 91,
      temperature: 102.8,
      bloodPressure: '88/58',
      respiratoryRate: 26,
    },
    riskScore: 91,
    alerts: ['Septic shock risk', 'Low blood pressure', 'Critical temperature'],
    medications: ['Vancomycin', 'Piperacillin', 'Norepinephrine', 'Vasopressin'],
    notes: 'Hemodynamically unstable. Vasopressor support initiated. Blood cultures pending.',
  },
  {
    id: 'P-105',
    name: 'Lisa Chen',
    age: 35,
    gender: 'Female',
    room: 'W-8',
    condition: 'Post-Appendectomy',
    admitDate: '2026-04-25',
    doctor: 'Dr. Michael Torres',
    vitals: {
      heartRate: 72,
      spO2: 99,
      temperature: 98.6,
      bloodPressure: '115/72',
      respiratoryRate: 14,
    },
    riskScore: 8,
    alerts: [],
    medications: ['Acetaminophen', 'Ondansetron'],
    notes: 'Routine post-op recovery. Discharge planned for tomorrow.',
  },
  {
    id: 'P-106',
    name: 'David Okafor',
    age: 58,
    gender: 'Male',
    room: 'ICU-3C',
    condition: 'Acute MI',
    admitDate: '2026-04-23',
    doctor: 'Dr. James Park',
    vitals: {
      heartRate: 88,
      spO2: 93,
      temperature: 98.9,
      bloodPressure: '135/88',
      respiratoryRate: 20,
    },
    riskScore: 67,
    alerts: ['Troponin levels elevated'],
    medications: ['Heparin', 'Clopidogrel', 'Atorvastatin', 'Nitroglycerin'],
    notes: 'PCI performed successfully. Monitor for re-occlusion and arrhythmias.',
  },
];

// ===== Vitals History (for charts) =====
export const generateVitalsHistory = () => {
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  return hours.map((time) => ({
    time,
    heartRate: Math.floor(70 + Math.random() * 40),
    spO2: Math.floor(90 + Math.random() * 10),
    temperature: +(97.5 + Math.random() * 4).toFixed(1),
    respiratoryRate: Math.floor(12 + Math.random() * 16),
  }));
};

// ===== Dashboard Stats =====
export const dashboardStats = [
  { label: 'Total Patients', value: '127', change: '+12', trend: 'up' },
  { label: 'Critical Alerts', value: '8', change: '+3', trend: 'up' },
  { label: 'Avg Risk Score', value: '34%', change: '-5%', trend: 'down' },
  { label: 'Beds Available', value: '23', change: '-2', trend: 'down' },
];

// ===== Products Data =====
export const products = [
  {
    id: 1,
    name: 'Patient Monitoring System',
    tagline: 'Real-time edge-powered vitals tracking',
    description:
      'Our flagship patient monitoring system leverages edge AI to process vital signs in real-time, directly at the bedside. With sub-millisecond latency, clinicians receive instant alerts for abnormal readings—heart rate irregularities, SpO2 drops, and temperature spikes—before they become critical events.',
    features: [
      'Continuous 12-lead ECG monitoring',
      'Real-time SpO2 and pulse oximetry',
      'Non-invasive blood pressure trending',
      'Core temperature tracking with predictive alerts',
      'Edge-processed waveform analysis',
      'HIPAA-compliant local data processing',
    ],
    icon: 'monitor',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    name: 'Predictive AI Engine',
    tagline: 'Anticipate complications before they occur',
    description:
      'Powered by deep learning models trained on millions of patient records, our Predictive AI Engine identifies deterioration patterns up to 6 hours before clinical onset. Running entirely on edge hardware, it ensures data privacy while delivering hospital-grade predictive analytics.',
    features: [
      'Early sepsis detection (AUC 0.94)',
      'Cardiac arrest risk prediction',
      'Readmission probability scoring',
      'Automated MEWS/NEWS calculation',
      'Federated learning for model updates',
      'Explainable AI with clinical rationale',
    ],
    icon: 'brain',
    color: 'from-violet-500 to-purple-400',
  },
  {
    id: 3,
    name: 'Hospital Analytics Dashboard',
    tagline: 'Actionable insights for healthcare leaders',
    description:
      'Transform raw patient data into strategic insights. Our analytics dashboard aggregates data across departments, providing hospital administrators with real-time visibility into bed utilization, staffing efficiency, patient flow, and quality metrics—all processed at the edge for instant responsiveness.',
    features: [
      'Real-time bed occupancy tracking',
      'Department-level performance KPIs',
      'Patient flow optimization',
      'Staff workload balancing',
      'Regulatory compliance reporting',
      'Custom dashboard builder',
    ],
    icon: 'chart',
    color: 'from-emerald-500 to-teal-400',
  },
];

// ===== Alerts Data =====
export const alertsData = [
  { id: 1, patientId: 'P-102', patient: 'Marcus Thompson', type: 'critical', message: 'SpO2 dropped below 90%', time: '2 min ago' },
  { id: 2, patientId: 'P-104', patient: 'Robert Kim', type: 'critical', message: 'Blood pressure critically low', time: '5 min ago' },
  { id: 3, patientId: 'P-104', patient: 'Robert Kim', type: 'critical', message: 'Temperature exceeding 102°F', time: '8 min ago' },
  { id: 4, patientId: 'P-103', patient: 'Aisha Patel', type: 'warning', message: 'Blood glucose trending upward', time: '12 min ago' },
  { id: 5, patientId: 'P-106', patient: 'David Okafor', type: 'warning', message: 'Troponin levels above normal', time: '18 min ago' },
  { id: 6, patientId: 'P-102', patient: 'Marcus Thompson', type: 'critical', message: 'Heart rate exceeding 110 bpm', time: '22 min ago' },
  { id: 7, patientId: 'P-101', patient: 'Eleanor Vance', type: 'info', message: 'Scheduled medication administered', time: '30 min ago' },
  { id: 8, patientId: 'P-105', patient: 'Lisa Chen', type: 'info', message: 'Post-op vitals stable', time: '45 min ago' },
];

// ===== Refresh mock data (randomize vitals slightly) =====
export const refreshPatientData = (patientList) => {
  return patientList.map((p) => ({
    ...p,
    vitals: {
      heartRate: p.vitals.heartRate + Math.floor(Math.random() * 10 - 5),
      spO2: Math.min(100, Math.max(85, p.vitals.spO2 + Math.floor(Math.random() * 4 - 2))),
      temperature: +(p.vitals.temperature + (Math.random() * 0.6 - 0.3)).toFixed(1),
      bloodPressure: p.vitals.bloodPressure,
      respiratoryRate: Math.max(10, p.vitals.respiratoryRate + Math.floor(Math.random() * 4 - 2)),
    },
    riskScore: Math.min(100, Math.max(0, p.riskScore + Math.floor(Math.random() * 6 - 3))),
  }));
};
