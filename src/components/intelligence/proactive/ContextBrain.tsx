'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ArrowRight, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ContextBrain() {
  const [context, setContext] = useState<'studio' | 'finance' | 'idle'>('idle');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Simulate user navigating between pages
  useEffect(() => {
    const scenarios = [
      { ctx: 'studio', text: 'لاحظت أن الإضاءة منخفضة في المشهد 3. هل تريد تطبيق فلتر "Brighten"؟' },
      { ctx: 'finance', text: 'مشروع "إعلان رمضان" اكتمل. هل أصدر الفاتورة النهائية الآن؟' },
      { ctx: 'idle', text: 'لديك 3 مهام معلقة. هل نبدأ بـ "مراجعة الصوت"؟' }
    ];

    let i = 0;
    const interval = setInterval(() => {
      setContext(scenarios[i].ctx as any);
      setSuggestion(scenarios[i].text);
      i = (i + 1) % scenarios.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
       {/* The Bubble */}
       <AnimatePresence mode="wait">
          {suggestion && (
             <motion.div 
               key={suggestion}
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 10, scale: 0.9 }}
               className="bg-white text-black p-4 rounded-2xl rounded-br-none shadow-2xl max-w-xs border border-indigo-100 pointer-events-auto cursor-pointer hover:bg-slate-50 transition-colors"
             >
                <div className="flex items-center gap-2 mb-2">
                   <Sparkles size={14} className="text-indigo-600" />
                   <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">
                      {context === 'studio' ? 'AI Assistant' : context === 'finance' ? 'FinBot' : 'Manager'}
                   </span>
                </div>
                <p className="text-sm font-medium leading-relaxed">{suggestion}</p>
                <div className="mt-3 flex gap-2">
                   <button className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-indigo-600 transition-colors">
                      <Zap size={12} /> نفذ الآن
                   </button>
                   <button className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
                      تجاهل
                   </button>
                </div>
             </motion.div>
          )}
       </AnimatePresence>

       {/* The Avatar Trigger */}
       <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 pointer-events-auto cursor-pointer hover:scale-110 transition-transform relative group">
          <div className="absolute inset-0 bg-indigo-500/50 rounded-full animate-ping opacity-20" />
          <img src="/logo-icon.png" alt="AI" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/4712/4712038.png'} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
       </div>
    </div>
  );
}
