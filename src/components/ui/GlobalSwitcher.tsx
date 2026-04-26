'use client';
import React, { useState } from 'react';
import { Moon, Sun, Languages } from 'lucide-react';

export function GlobalSwitcher() {
  const [lang, setLang] = useState('AR');
  const [dark, setDark] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-40 flex flex-col gap-2">
       <button 
         onClick={() => setLang(l => l === 'AR' ? 'EN' : 'AR')}
         className="w-10 h-10 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white hover:bg-indigo-600 transition-colors shadow-lg group"
         title="Change Language"
       >
          {lang}
       </button>
       <button 
         onClick={() => setDark(!dark)}
         className="w-10 h-10 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors shadow-lg"
         title="Toggle Theme"
       >
          {dark ? <Moon size={16} /> : <Sun size={16} />}
       </button>
    </div>
  );
}

