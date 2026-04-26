'use client';
import React from 'react';
import { Menu, Zap } from 'lucide-react';

export function MobileHeader({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
  return (
    <header className="lg:hidden h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-[100]" dir="rtl">
      <div className="flex items-center gap-3">
        <Zap className="text-indigo-500" size={24} />
        <span className="text-white font-black text-lg">MONTEERLY</span>
      </div>
      <button onClick={() => setIsOpen(true)} className="p-2 text-slate-400 bg-slate-900 rounded-lg">
        <Menu size={24} />
      </button>
    </header>
  );
}
