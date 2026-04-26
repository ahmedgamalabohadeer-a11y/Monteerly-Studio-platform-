'use client';
import React, { useState, useEffect } from 'react';
import { Command, ArrowRight, Search, Plus, UserPlus, Film, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MagicCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // Toggle with Cmd+K
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

  const suggestions = [
    { icon: Plus, text: 'إنشاء مشروع جديد...', shortcut: 'N' },
    { icon: UserPlus, text: 'دعوة عضو للفريق...', shortcut: 'I' },
    { icon: Film, text: 'البحث في الأرشيف...', shortcut: 'S' },
  ];

  if (!isOpen) return (
    <div className="fixed bottom-8 left-8 text-slate-500 text-xs font-mono bg-black/50 px-3 py-1 rounded border border-white/10 hidden md:block">
       Press <span className="bg-white/10 px-1 rounded text-white">⌘ K</span> for Magic
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-[20vh]">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
       >
          <div className="flex items-center px-4 py-4 border-b border-white/10">
             <Command className="text-slate-400 mr-3" />
             <input 
               autoFocus
               placeholder="ماذا تريد أن تفعل؟ (مثال: أنشئ مجلد لعميل جديد)"
               className="flex-1 bg-transparent text-xl text-white outline-none placeholder-slate-600"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
             />
             <div className="text-xs bg-white/10 px-2 py-1 rounded text-slate-400">ESC</div>
          </div>

          <div className="p-2">
             {query ? (
                <div className="p-3">
                   <div className="text-xs font-bold text-indigo-400 uppercase mb-2">AI Interpretation</div>
                   <div className="flex items-center gap-3 p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-lg text-white">
                      <Sparkles size={16} className="text-indigo-400" />
                      <span>هل تقصد: <span className="font-bold">إنشاء مجلد باسم "{query}"</span>؟</span>
                      <button className="ml-auto bg-indigo-600 px-3 py-1 rounded text-xs font-bold">نفذ</button>
                   </div>
                </div>
             ) : (
                <div className="space-y-1">
                   <div className="text-xs font-bold text-slate-500 px-3 py-2 uppercase">مقترحات</div>
                   {suggestions.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition-colors group">
                         <item.icon size={18} className="text-slate-500 group-hover:text-white" />
                         <span>{item.text}</span>
                         <span className="ml-auto text-xs bg-black/40 px-2 py-1 rounded font-mono text-slate-500">{item.shortcut}</span>
                      </div>
                   ))}
                </div>
             )}
          </div>
          
          <div className="bg-black/30 px-4 py-2 text-[10px] text-slate-500 border-t border-white/5 flex justify-between">
             <span>Pro Tip: You can type natural language like "Email Sarah regarding the edit".</span>
             <span>Monteerly AI v2.0</span>
          </div>
       </motion.div>
       
       {/* Click outside to close */}
       <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
    </div>
  );
}

################################################################################