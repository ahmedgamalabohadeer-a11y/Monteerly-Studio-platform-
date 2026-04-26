'use client';
import React, { useState } from 'react';
import { Moon, BellOff, Timer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DeepFocusMode() {
  const [active, setActive] = useState(false);

  return (
    <div className={`fixed inset-0 z-[99999] transition-all duration-700 ${active ? 'bg-slate-900' : 'pointer-events-none opacity-0'}`}>
       {active && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-300">
             <div className="w-32 h-32 rounded-full border-4 border-slate-700 flex items-center justify-center mb-8 animate-pulse">
                <Moon size={64} className="text-indigo-400" />
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">Deep Focus Mode</h1>
             <p className="text-xl max-w-md mb-8">الإشعارات متوقفة. الألوان هادئة. ركز على إبداعك فقط.</p>
             
             <div className="flex items-center gap-6 mb-12">
                <div className="flex flex-col items-center gap-2">
                   <BellOff size={24} />
                   <span className="text-xs">Silenced</span>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div className="flex flex-col items-center gap-2">
                   <Timer size={24} />
                   <span className="text-xs">Tracking</span>
                </div>
             </div>

             <Button size="lg" variant="outline" onClick={() => setActive(false)} className="border-slate-600 hover:bg-slate-800 text-white">
                إيقاف التركيز والعودة
             </Button>
          </div>
       )}
       
       {/* Trigger Button (Only visible when NOT active, usually placed in header) */}
       {!active && (
          <button onClick={() => setActive(true)} className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50 pointer-events-auto" title="Enter Focus Mode">
             <Moon size={20} />
          </button>
       )}
    </div>
  );
}

