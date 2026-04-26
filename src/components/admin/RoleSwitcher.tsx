'use client';
import React, { useState, useEffect } from 'react';
import { Users, Check } from 'lucide-react';

export function RoleSwitcher() {
  const [role, setRole] = useState('Creator');
  const [visible, setVisible] = useState(false);

  // Keyboard shortcut to toggle (Ctrl+.)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '.' && (e.ctrlKey || e.metaKey)) {
        setVisible(v => !v);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!visible) return null;

  const roles = [
    { id: 'Creator', label: 'مبدع مستقل', color: 'bg-indigo-500' },
    { id: 'Agency', label: 'مدير وكالة', color: 'bg-purple-500' },
    { id: 'Client', label: 'عميل (Viewer)', color: 'bg-green-500' },
    { id: 'Admin', label: 'مسؤول نظام', color: 'bg-red-500' },
  ];

  return (
    <div className="fixed bottom-20 left-4 z-[100] bg-slate-900 border border-white/20 rounded-lg shadow-2xl p-4 w-64 animate-in slide-in-from-left-5">
       <div className="flex items-center justify-between mb-3 text-xs uppercase font-bold text-slate-500">
          <span>User View Mode</span>
          <kbd className="bg-white/10 px-1 rounded">Ctrl + .</kbd>
       </div>
       <div className="space-y-2">
          {roles.map((r) => (
             <button
               key={r.id}
               onClick={() => setRole(r.id)}
               className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all ${
                  role === r.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'
               }`}
             >
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${r.color}`} />
                   {r.label}
                </div>
                {role === r.id && <Check size={14} />}
             </button>
          ))}
       </div>
       <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-center text-yellow-500">
          وضع المعاينة (Demo Mode)
       </div>
    </div>
  );
}

