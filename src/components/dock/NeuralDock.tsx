'use client';
import React, { useState } from 'react';
import { Home, Briefcase, Film, Bell, Settings, Plus, DollarSign, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function NeuralDock() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const apps = [
    { id: 1, icon: Home, label: 'الرئيسية', path: '/dashboard' },
    { id: 2, icon: Film, label: 'الاستوديو', path: '/studio' },
    { id: 3, icon: Briefcase, label: 'السوق', path: '/marketplace' },
    { id: 4, icon: DollarSign, label: 'المالية', path: '/wallet' },
    { id: 5, icon: Bell, label: 'تنبيهات', path: '/notifications', badge: 3 },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
       
       {/* Quick Actions Menu (Popup) */}
       <AnimatePresence>
          {showQuickMenu && (
             <motion.div 
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.9 }}
               className="bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl mb-2 min-w-[200px]"
             >
                <div className="text-[10px] text-slate-500 font-bold px-3 py-2 uppercase">إنشاء سريع</div>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-white text-sm transition-colors text-right">
                   <div className="bg-indigo-600 p-1.5 rounded-md"><Film size={14}/></div> مشروع جديد
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-white text-sm transition-colors text-right">
                   <div className="bg-green-600 p-1.5 rounded-md"><DollarSign size={14}/> فاتورة جديدة</div>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-white text-sm transition-colors text-right">
                   <div className="bg-purple-600 p-1.5 rounded-md"><User size={14}/> دعوة عضو</div>
                </button>
             </motion.div>
          )}
       </AnimatePresence>

       {/* The Dock */}
       <motion.div 
         className="flex items-end gap-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl"
         layout
       >
          {apps.map((app) => (
             <button
               key={app.id}
               onMouseEnter={() => setHovered(app.id)}
               onMouseLeave={() => setHovered(null)}
               onClick={() => router.push(app.path)}
               className="relative group p-2 rounded-xl transition-all duration-300 ease-out hover:bg-white/10"
             >
                {/* Icon Scaling Effect */}
                <motion.div
                   animate={{ 
                      scale: hovered === app.id ? 1.2 : 1,
                      y: hovered === app.id ? -5 : 0 
                   }}
                   className="relative"
                >
                   <app.icon size={24} className="text-slate-300 group-hover:text-white" />
                   {app.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] flex items-center justify-center rounded-full border-2 border-black">
                         {app.badge}
                      </span>
                   )}
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                   {hovered === app.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -45 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20 whitespace-nowrap pointer-events-none"
                      >
                         {app.label}
                      </motion.div>
                   )}
                </AnimatePresence>
             </button>
          ))}

          {/* Separator */}
          <div className="w-px h-8 bg-white/10 mx-1" />

          {/* Magic Button */}
          <button 
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className={`p-3 rounded-xl transition-all duration-300 ${showQuickMenu ? 'bg-indigo-600 rotate-45' : 'bg-white/10 hover:bg-white/20'}`}
          >
             <Plus size={24} className="text-white" />
          </button>
       </motion.div>
    </div>
  );
}

