'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000); // Auto remove after 5s
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-[1000] flex flex-col gap-2 w-full max-w-sm px-4 md:px-0">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in ${
               toast.type === 'success' ? 'bg-green-900/80 border-green-500/30 text-white' :
               toast.type === 'error' ? 'bg-red-900/80 border-red-500/30 text-white' :
               toast.type === 'warning' ? 'bg-yellow-900/80 border-yellow-500/30 text-white' :
               'bg-slate-800/80 border-slate-500/30 text-white'
            }`}
          >
             {toast.type === 'success' && <CheckCircle size={20} className="text-green-400" />}
             {toast.type === 'error' && <AlertTriangle size={20} className="text-red-400" />}
             {toast.type === 'warning' && <AlertTriangle size={20} className="text-yellow-400" />}
             {toast.type === 'info' && <Info size={20} className="text-blue-400" />}
             
             <p className="text-sm font-medium flex-1">{toast.message}</p>
             <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100"><X size={16} /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

################################################################################