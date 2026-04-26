'use client';
import React from 'react';
import { Command } from 'lucide-react';

export function KeyboardShortcuts() {
  const keys = [
    { key: 'Space', action: 'تشغيل / إيقاف' },
    { key: 'J', action: 'رجوع 10 ثواني' },
    { key: 'K', action: 'إيقاف مؤقت' },
    { key: 'L', action: 'تقديم 10 ثواني' },
    { key: 'F', action: 'ملء الشاشة' },
    { key: 'M', action: 'كتم الصوت' },
    { key: '/', action: 'بحث سريع' },
  ];

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-40 group">
       <button className="bg-slate-900 border border-white/10 p-3 rounded-full text-slate-400 hover:text-white hover:border-indigo-500 transition-all shadow-lg">
          <Command size={20} />
       </button>
       
       <div className="absolute bottom-14 right-0 w-64 bg-slate-900/95 backdrop-blur border border-white/10 rounded-xl p-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0 duration-200">
          <h4 className="font-bold text-white text-xs mb-3 border-b border-white/10 pb-2">اختصارات المحترفين</h4>
          <div className="space-y-2">
             {keys.map((k) => (
                <div key={k.key} className="flex justify-between items-center text-xs">
                   <span className="text-slate-400">{k.action}</span>
                   <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-mono min-w-[24px] text-center border border-white/5">{k.key}</kbd>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

