'use client';
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-4 border border-slate-700">
       <span className="text-sm font-bold">ثبت تطبيق Monteerly لتجربة أفضل 🚀</span>
       <div className="flex items-center gap-2">
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90 rounded-full px-4 h-8 text-xs" onClick={handleInstall}>
             <Download size={14} className="mr-1" /> تثبيت
          </Button>
          <button onClick={() => setShow(false)} className="hover:text-red-400 transition-colors">
             <X size={16} />
          </button>
       </div>
    </div>
  );
}

