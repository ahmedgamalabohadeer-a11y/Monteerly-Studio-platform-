'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextType {
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

function createToastId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `toast-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

function getToastClasses(type: ToastType) {
  switch (type) {
    case 'success':
      return 'bg-green-900/80 border-green-500/30 text-white'
    case 'error':
      return 'bg-red-900/80 border-red-500/30 text-white'
    case 'warning':
      return 'bg-yellow-900/80 border-yellow-500/30 text-white'
    case 'info':
    default:
      return 'bg-slate-800/80 border-slate-500/30 text-white'
  }
}

function getToastIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} className="text-green-400" />
    case 'error':
      return <AlertTriangle size={20} className="text-red-400" />
    case 'warning':
      return <AlertTriangle size={20} className="text-yellow-400" />
    case 'info':
    default:
      return <Info size={20} className="text-blue-400" />
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = createToastId()

      setToasts((prev) => [...prev, { id, type, message }])

      window.setTimeout(() => {
        removeToast(id)
      }, 5000)
    },
    [removeToast]
  )

  const contextValue = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-[1000] flex flex-col gap-2 w-full max-w-sm px-4 md:px-0"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in ${getToastClasses(
              toast.type
            )}`}
          >
            {getToastIcon(toast.type)}

            <p className="text-sm font-medium flex-1">{toast.message}</p>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="opacity-60 hover:opacity-100"
              aria-label="إغلاق الإشعار"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
