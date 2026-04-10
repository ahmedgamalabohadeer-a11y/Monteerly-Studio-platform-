'use client';
import React, { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Handler functions
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    // Initial check
    if (typeof window !== 'undefined' && !navigator.onLine) {
       setIsOffline(true);
    }

    // Event Listeners
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] bg-red-600 text-white px-4 py-2 shadow-xl animate-in slide-in-from-top-full flex items-center justify-center gap-2">
       <WifiOff size={18} />
       <span className="font-bold text-sm">انقطع الاتصال بالإنترنت!</span>
       <span className="text-xs bg-red-800 px-2 py-0.5 rounded flex items-center gap-1">
          <AlertTriangle size={10} />
          لا تغلق الصفحة، سيتم حفظ التغييرات محلياً حتى عودة الاتصال.
       </span>
    </div>
  );
}
