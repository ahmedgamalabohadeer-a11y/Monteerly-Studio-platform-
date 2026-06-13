'use client'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  msg: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

function createToastId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `toast-${Math.floor(Math.random() * 1000000)}`
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (msg: string, type: ToastType = 'info') => {
      const id = createToastId()
      setToasts((prev) => [...prev, { id, msg, type }])

      window.setTimeout(() => {
        removeToast(id)
      }, 3000)
    },
    [removeToast]
  )

  const contextValue = useMemo(
    () => ({ toast, removeToast }),
    [toast, removeToast]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toastItem) => (
          <div
            key={toastItem.id}
            role="status"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full
              ${toastItem.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : ''}
              ${toastItem.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
              ${toastItem.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
            `}
          >
            {toastItem.type === 'success' && <CheckCircle size={18} />}
            {toastItem.type === 'error' && <AlertTriangle size={18} />}
            {toastItem.type === 'info' && <Info size={18} />}

            <span className="text-sm font-medium">{toastItem.msg}</span>

            <button
              type="button"
              onClick={() => removeToast(toastItem.id)}
              className="hover:opacity-70"
              aria-label="إغلاق الإشعار"
            >
              <X size={14} />
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
