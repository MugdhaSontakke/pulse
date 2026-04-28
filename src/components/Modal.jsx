import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
      <div onClick={e => e.stopPropagation()} className="fade-up" style={{
        position: 'relative', background: '#fff', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        width: '100%', maxWidth: 560, maxHeight: '82vh', overflowY: 'auto',
      }}>
        <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '20px 20px 0 0', zIndex: 10 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{title}</h2>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  )
}
