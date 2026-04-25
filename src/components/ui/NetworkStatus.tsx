'use client';
import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // هذه الدالة تعمل فقط في المتصفح
    if (typeof window !== 'undefined') {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
       <WifiOff size={18} />
       <div className="text-sm">
          <p className="font-bold">انقطع الاتصال</p>
          <p className="text-xs text-slate-400">جاري محاولة إعادة الاتصال...</p>
       </div>
    </div>
  );
}

################################################################################