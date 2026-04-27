import { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] toast-enter">
      <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/20 border border-gray-700/50">
        <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-accent-400" />
        </div>
        <p className="text-sm font-medium pr-2">{message}</p>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
