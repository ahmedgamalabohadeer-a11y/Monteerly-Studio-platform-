'use client';
import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial state
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-xs font-bold text-center py-1 z-[9999] flex items-center justify-center gap-2 animate-in slide-in-from-top-full">
       <WifiOff size={12} />
       <span>انقطع الاتصال بالإنترنت. يتم حفظ التغييرات محلياً.</span>
    </div>
  );
}
