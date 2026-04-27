import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) { const t = setTimeout(onClose, 4000); return () => clearTimeout(t) }
  }, [show, onClose])
  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="flex items-center gap-3 bg-text text-white pl-4 pr-3 py-3 rounded-xl shadow-lg text-sm">
        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10 shrink-0"><X className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  )
}
