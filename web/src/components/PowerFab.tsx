'use client';
import { Zap } from 'lucide-react';

export function PowerFab() {
  return (
    <button 
      className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-[#0DB7B4] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group focus-visible:ring-4 focus-visible:ring-[#0DB7B4]/30"
      aria-label="Quick Actions"
    >
      <Zap className="w-8 h-8 group-hover:animate-pulse" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        إجراء سريع
      </span>
    </button>
  );
}
