'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';

export function SocialProof() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after 5 seconds
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-4 md:left-24 z-[9980] bg-slate-900 border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-xs animate-in slide-in-from-bottom-10 fade-in duration-500">
       <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 shrink-0">
          <ShoppingBag size={20} />
       </div>
       <div>
          <p className="text-xs text-white font-bold">مستخدم من الرياض</p>
          <p className="text-[10px] text-slate-400">اشترى "Cinematic LUTs Pack" منذ دقيقتين.</p>
       </div>
       <button onClick={() => setShow(false)} className="absolute top-1 right-1 text-slate-500 hover:text-white">
          <X size={12} />
       </button>
    </div>
  );
}

