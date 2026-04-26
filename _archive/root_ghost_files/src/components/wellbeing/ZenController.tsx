'use client';
import React, { useState, useEffect } from 'react';
import { Moon, Music, BellOff, Clock, Maximize, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveButton } from '@/components/system/InteractiveButton';

export function ZenController() {
  const [isZen, setIsZen] = useState(false);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes (Pomodoro)
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {/* Zen Overlay (When Active) */}
      <AnimatePresence>
        {isZen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-white"
          >
             <div className="absolute top-8 right-8">
                <InteractiveButton variant="ghost" onClick={() => { setIsZen(false); setActive(false); }}>
                   خروج (ESC)
                </InteractiveButton>
             </div>
             
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl absolute"
             />

             <h2 className="text-6xl font-black font-mono tracking-widest mb-4 z-10">{formatTime(timer)}</h2>
             <p className="text-indigo-300 text-sm tracking-widest uppercase mb-8 z-10">Deep Work Session</p>
             
             <div className="flex gap-8 text-slate-500 z-10">
                <div className="flex flex-col items-center gap-2">
                   <BellOff size={24} className="text-white"/>
                   <span className="text-[10px]">Silenced</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <Music size={24} className="text-white"/>
                   <span className="text-[10px]">Lo-Fi On</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <Maximize size={24} className="text-white"/>
                   <span className="text-[10px]">Fullscreen</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Widget */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black border border-white/10 rounded-xl p-6 overflow-hidden relative">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wind size={120} />
         </div>

         <div className="relative z-10">
            <h3 className="font-bold text-white text-lg mb-1 flex items-center gap-2">
               <Moon className="text-indigo-400" /> وضع الراهب (Zen Mode)
            </h3>
            <p className="text-slate-400 text-sm mb-6">احجب المشتتات وادخل في حالة التدفق (Flow).</p>

            <div className="flex gap-4 mb-6">
               <div className="flex-1 bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="font-mono text-xl font-bold text-white">25m</div>
                  <div className="text-[10px] text-slate-500">Focus</div>
               </div>
               <div className="flex-1 bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="font-mono text-xl font-bold text-white">5m</div>
                  <div className="text-[10px] text-slate-500">Short Break</div>
               </div>
               <div className="flex-1 bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="font-mono text-xl font-bold text-white">15m</div>
                  <div className="text-[10px] text-slate-500">Long Break</div>
               </div>
            </div>

            <InteractiveButton 
              onClick={() => { setIsZen(true); setActive(true); }}
              className="w-full"
              icon={<Wind size={18} />}
            >
               بدء الجلسة (Enter Zen)
            </InteractiveButton>
         </div>
      </div>
    </div>
  );
}

################################################################################