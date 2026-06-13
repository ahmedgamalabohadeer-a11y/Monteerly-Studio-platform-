'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

function getInitialOfflineState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return !window.navigator.onLine;
}

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState<boolean>(() => getInitialOfflineState());

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[10000] flex items-center justify-center gap-2 bg-red-600 px-4 py-2 text-white shadow-xl animate-in slide-in-from-top-full"
      role="status"
      aria-live="assertive"
    >
      <WifiOff size={18} />
      <span className="text-sm font-bold">انقطع الاتصال بالإنترنت</span>
      <span className="flex items-center gap-1 rounded bg-red-800 px-2 py-0.5 text-xs">
        <AlertTriangle size={10} />
        لا تغلق الصفحة، سيتم حفظ التغييرات محلياً حتى عودة الاتصال.
      </span>
    </div>
  );
}
