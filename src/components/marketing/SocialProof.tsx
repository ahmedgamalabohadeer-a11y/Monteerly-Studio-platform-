'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';

export function SocialProof() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-4 md:left-24 z-[9980] bg-slate-900 border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 shrink-0">
        <ShoppingBag size={20} />
      </div>

      <div>
        <p className="text-xs text-white font-bold">مستخدم من الرياض</p>
        <p className="text-[10px] text-slate-400">
          اشترى &ldquo;Cinematic LUTs Pack&rdquo; منذ دقيقتين.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShow(false)}
        className="absolute top-1 right-1 text-slate-500 hover:text-white transition-colors"
        aria-label="إغلاق إشعار الإثبات الاجتماعي"
      >
        <X size={12} />
      </button>
    </div>
  );
}
