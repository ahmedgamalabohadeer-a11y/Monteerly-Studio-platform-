'use client';
import React, { useState } from 'react';
import { Bell, X, Check, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationHub() {
  const [isOpen, setIsOpen] = useState(true); // Open for demo
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'تم الريندر بنجاح', msg: 'مشروع "Ramadan Ad" جاهز للتحميل.', time: 'الآن' },
    { id: 2, type: 'info', title: 'دفعة مستلمة', msg: 'استلمت $450 من العميل خالد.', time: 'منذ 5 د' },
    { id: 3, type: 'warning', title: 'مساحة التخزين', msg: 'اقتربت من استهلاك 80% من المساحة.', time: 'منذ 1س' },
  ]);

  const removeNotif = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-24 right-8 z-40 w-80 flex flex-col gap-2 pointer-events-none">
       <AnimatePresence>
          {notifications.map((notif) => (
             <motion.div 
               key={notif.id}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 50, scale: 0.9 }}
               layout
               className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-2xl pointer-events-auto flex items-start gap-3 relative overflow-hidden"
             >
                {/* Icon */}
                <div className={`p-2 rounded-full shrink-0 ${
                   notif.type === 'success' ? 'bg-green-500/10 text-green-400' :
                   notif.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                   'bg-blue-500/10 text-blue-400'
                }`}>
                   {notif.type === 'success' ? <Check size={16}/> :
                    notif.type === 'warning' ? <AlertTriangle size={16}/> :
                    <Info size={16}/>}
                </div>

                <div className="flex-1">
                   <h4 className="text-sm font-bold text-white leading-none mb-1">{notif.title}</h4>
                   <p className="text-xs text-slate-400 leading-tight mb-1">{notif.msg}</p>
                   <span className="text-[9px] text-slate-600">{notif.time}</span>
                </div>

                <button 
                  onClick={() => removeNotif(notif.id)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                   <X size={14} />
                </button>

                {/* Progress Bar for Auto-dismiss */}
                <motion.div 
                   initial={{ width: '100%' }}
                   animate={{ width: '0%' }}
                   transition={{ duration: 5, ease: 'linear' }}
                   className={`absolute bottom-0 right-0 h-0.5 ${
                      notif.type === 'success' ? 'bg-green-500' :
                      notif.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                   }`}
                />
             </motion.div>
          ))}
       </AnimatePresence>
    </div>
  );
}

################################################################################