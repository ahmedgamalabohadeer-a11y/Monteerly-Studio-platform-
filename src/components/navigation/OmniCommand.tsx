'use client';
import React, { useState, useEffect } from 'react';
import { Command, Search, FileVideo, User, GraduationCap, CreditCard, ArrowRight, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function OmniCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Toggle with CMD+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // نتائج بحث تحاكي الذكاء الاصطناعي
  const results = [
    { id: 1, type: 'studio', icon: FileVideo, label: 'Project: Dubai Doc_v3', sub: 'Last edited 2h ago' },
    { id: 2, type: 'market', icon: User, label: 'Hire: VFX Artist', sub: 'Find talent in Marketplace' },
    { id: 3, type: 'learn', icon: GraduationCap, label: 'Course: Advanced Grading', sub: 'Continue learning' },
    { id: 4, type: 'finance', icon: CreditCard, label: 'Action: Create Invoice', sub: 'Billing System' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Input Field */}
        <div className="flex items-center p-4 border-b border-white/10">
          <Command className="text-slate-400 mr-4" size={20} />
          <input 
            autoFocus
            placeholder="ابحث في النظام الشامل (ملفات، أشخاص، دروس، فواتير)..."
            className="flex-1 bg-transparent text-lg text-white placeholder-slate-600 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2">
            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-400">ESC</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
           <div className="text-[10px] font-bold text-slate-500 uppercase px-3 py-2">Quick Access</div>
           {results.map((item) => (
             <button 
               key={item.id}
               className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group transition-colors text-left"
               onClick={() => { setIsOpen(false); /* Navigate logic */ }}
             >
                <div className={`p-2 rounded-lg ${
                  item.type === 'studio' ? 'bg-indigo-500/20 text-indigo-400' :
                  item.type === 'market' ? 'bg-green-500/20 text-green-400' :
                  item.type === 'learn' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                   <item.icon size={18} />
                </div>
                <div className="flex-1">
                   <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{item.label}</div>
                   <div className="text-xs text-slate-500">{item.sub}</div>
                </div>
                <CornerDownLeft size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
           ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/50 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
           <div className="flex gap-4">
              <span>ProTip: Type <span className="text-white">/invoice</span> to generate a bill instantly.</span>
           </div>
           <div>Monteerly OS v1.0</div>
        </div>
      </motion.div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
    </div>
  );
}

