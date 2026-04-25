'use client';
import React, { useState, useEffect } from 'react';
import { PersonStanding, Type, Sun, Eye, X } from 'lucide-react';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    reduceMotion: false
  });

  // Apply settings to document body
  useEffect(() => {
    if (settings.largeText) document.documentElement.classList.add('text-lg-mode');
    else document.documentElement.classList.remove('text-lg-mode');

    if (settings.highContrast) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed bottom-20 left-4 z-[9985]">
       {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors"
            title="إعدادات الوصول (Accessibility)"
            aria-label="Open Accessibility Menu"
          >
             <PersonStanding size={24} />
          </button>
       )}

       {isOpen && (
          <div className="bg-slate-900 border border-white/20 rounded-xl p-4 w-64 shadow-2xl animate-in slide-in-from-left-5 mb-2">
             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="font-bold text-white text-sm">أدوات الوصول</h3>
                <button onClick={() => setIsOpen(false)}><X size={16} className="text-slate-400 hover:text-white"/></button>
             </div>

             <div className="space-y-2">
                <button 
                  onClick={() => toggleSetting('largeText')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold transition-colors ${settings.largeText ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                   <span className="flex items-center gap-2"><Type size={14}/> تكبير النصوص</span>
                   <div className={`w-3 h-3 rounded-full ${settings.largeText ? 'bg-white' : 'bg-slate-600'}`} />
                </button>

                <button 
                  onClick={() => toggleSetting('highContrast')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold transition-colors ${settings.highContrast ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                   <span className="flex items-center gap-2"><Sun size={14}/> تباين عالي</span>
                   <div className={`w-3 h-3 rounded-full ${settings.highContrast ? 'bg-white' : 'bg-slate-600'}`} />
                </button>

                <button 
                  onClick={() => toggleSetting('reduceMotion')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold transition-colors ${settings.reduceMotion ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                   <span className="flex items-center gap-2"><Eye size={14}/> تقليل الحركة</span>
                   <div className={`w-3 h-3 rounded-full ${settings.reduceMotion ? 'bg-white' : 'bg-slate-600'}`} />
                </button>
             </div>
          </div>
       )}
    </div>
  );
}
