'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div 
             key={toast.id} 
             className="bg-card border border-border shadow-lg rounded-lg p-4 flex items-center gap-3 w-80 animate-in slide-in-from-left-5"
          >
             {toast.type === 'success' && <CheckCircle className="text-emerald-500" size={20} />}
             {toast.type === 'error' && <XCircle className="text-red-500" size={20} />}
             {toast.type === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
             {toast.type === 'info' && <Info className="text-blue-500" size={20} />}
             
             <p className="text-sm font-medium flex-1">{toast.message}</p>
             <button onClick={() => removeToast(toast.id)} className="text-muted-foreground hover:text-foreground">
                <X size={14} />
             </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom Hook for usage
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

################################################################################