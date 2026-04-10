'use client';
import React, { useState, useEffect } from 'react';
import { Search, Command, File, User, Settings, CreditCard, ArrowRight, Shield, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  const actions = [
    { icon: File, label: 'مشروع جديد...', shortcut: 'N', href: '/projects/create' },
    { icon: Search, label: 'بحث في السوق...', shortcut: 'S', href: '/marketplace' },
    { icon: Video, label: 'استوديو الذكاء (AI)', href: '/ai-studio' }, // Assuming mapped
    { icon: Shield, label: 'مركز الأمان (Logs)', href: '/settings/security' },
    { icon: CreditCard, label: 'المحفظة', href: '/wallet' },
    { icon: User, label: 'الملف الشخصي', href: '/settings/profile' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200" onClick={() => setOpen(false)}>
       <div className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center px-4 border-b border-white/10">
             <Search size={20} className="text-slate-500" />
             <input 
               autoFocus
               placeholder="اكتب أمراً أو ابحث... (مثال: مشروع جديد)" 
               className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none text-lg placeholder:text-slate-500"
             />
             <div className="flex gap-1">
                <kbd className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-slate-400">ESC</kbd>
             </div>
          </div>
          
          <div className="py-2">
             <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase">مقترحات سريعة</div>
             {actions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => { setOpen(false); router.push(action.href); }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors group"
                >
                   <action.icon size={18} />
                   <span className="flex-1 text-left">{action.label}</span>
                   {action.shortcut && (
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded group-hover:bg-white/20 border border-white/5">{action.shortcut}</span>
                   )}
                   <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
             ))}
          </div>
          
          <div className="bg-black/30 px-4 py-2 text-[10px] text-slate-500 flex justify-between">
             <span>Monteerly OS v2.0</span>
             <div className="flex gap-2">
                <span>Select <kbd className="bg-white/5 px-1 rounded">↵</kbd></span>
                <span>Navigate <kbd className="bg-white/5 px-1 rounded">↕</kbd></span>
             </div>
          </div>
       </div>
    </div>
  );
}
