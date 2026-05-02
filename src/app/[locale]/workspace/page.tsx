'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, ShieldCheck, FileVideo } from 'lucide-react';
import CloudUploadZone from '@/components/workspace/CloudUploadZone';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';
import LiveSync from '@/components/workspace/LiveSync';

export default function CorporateOSWorkspace() {
  const [windows, setWindows] = useState([
    { id: 'player', title: 'شاشة العرض السيادية', icon: <Monitor className="w-4 h-4" />, isOpen: true, zIndex: 10 },
    { id: 'upload', title: 'محرك R2 السحابي', icon: <FileVideo className="w-4 h-4" />, isOpen: true, zIndex: 11 },
  ]);

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: 20 } : { ...w, zIndex: 10 }));
  };

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden font-sans relative" dir="rtl">
      {/* محرك المزامنة الحية (يعمل في الخلفية لرسم المؤشرات) */}
      <LiveSync roomId="mcos-live-session-01" />

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564')] bg-cover bg-center opacity-10"></div>
      
      <header className="absolute top-0 w-full h-12 bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-[60] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-white font-black text-sm tracking-widest">MCOS V5.0</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> اتصال مشفر (E2EE)
        </div>
      </header>

      <div className="relative w-full h-full pt-12 p-4">
        {windows.find(w => w.id === 'player')?.isOpen && (
          <motion.div 
            drag dragMomentum={false}
            onMouseDown={() => bringToFront('player')}
            className="absolute top-20 left-20 w-[800px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{ zIndex: windows.find(w => w.id === 'player')?.zIndex }}
          >
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <Monitor className="w-4 h-4 text-indigo-400" /> شاشة العرض والتدقيق
              </div>
            </div>
            <div className="p-4">
              <ReviewPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4" orderId="mcos-live-01" ar={{system:{loading:'جاري..'}, legal:{vault:'مشفر'}}} />
            </div>
          </motion.div>
        )}

        {windows.find(w => w.id === 'upload')?.isOpen && (
          <motion.div 
            drag dragMomentum={false}
            onMouseDown={() => bringToFront('upload')}
            className="absolute top-40 right-20 w-[400px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{ zIndex: windows.find(w => w.id === 'upload')?.zIndex }}
          >
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <FileVideo className="w-4 h-4 text-emerald-400" /> محرك R2 السحابي
              </div>
            </div>
            <div className="p-4">
              <CloudUploadZone orderId="live-01" clientId="client-01" ar={{system:{gpu_alloc:'تخصيص مسار آمن..'}, legal:{vault:'مزامنة مشفرة'}}} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
