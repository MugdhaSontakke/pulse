import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <Activity style={{ width: 16, height: 16, color: '#2563eb' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>EdgeMedical</span>
            </Link>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, maxWidth: 240 }}>
              Edge AI for real-time patient monitoring and predictive healthcare analytics.
            </p>
          </div>
          {[
            { title: 'Product', items: [['Monitoring', '/products'], ['Predictive AI', '/products'], ['Analytics', '/products']] },
            { title: 'Company', items: [['About', '/'], ['Careers', '/'], ['Blog', '/']] },
            { title: 'Support', items: [['Docs', '/'], ['Contact', '/contact'], ['Privacy', '/']] },
          ].map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 20 }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.items.map(([name, to]) => (
                  <Link key={name} to={to} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>{name}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid #f1f5f9', fontSize: 12, color: '#94a3b8' }}>
          © {new Date().getFullYear()} Edge Medical Solutions
        </div>
      </div>
    </footer>
  )
}
