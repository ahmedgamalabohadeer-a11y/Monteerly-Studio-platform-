'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileVideo, ShieldCheck, Smartphone } from 'lucide-react';
import CloudUploadZone from '@/components/workspace/CloudUploadZone';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';

export default function CorporateOSWorkspace() {
  const [windows, setWindows] = useState([
    { id: 'player', title: 'شاشة العرض', isOpen: true, zIndex: 10 },
    { id: 'upload', title: 'الرفع السحابي', isOpen: true, zIndex: 11 },
  ]);

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: 20 } : { ...w, zIndex: 10 }));
  };

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden font-sans relative" dir="rtl">
      {/* شريط المهام الموحد */}
      <header className="absolute top-0 w-full h-14 bg-slate-900/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-6">
        <span className="text-white font-black text-sm tracking-widest hidden md:block">MCOS WORKSPACE</span>
        <span className="text-white font-black text-sm tracking-widest md:hidden flex items-center gap-2"><Smartphone className="w-4 h-4"/> MCOS MOBILE</span>
        <div className="flex items-center gap-3 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> مشفر
        </div>
      </header>

      {/* --- واجهة الهاتف المحمول (Mobile View) --- */}
      <div className="md:hidden w-full h-full pt-16 px-4 pb-20 overflow-y-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-950 p-3 border-b border-slate-800 font-bold text-sm text-indigo-400 flex items-center gap-2">
            <Monitor className="w-4 h-4" /> العرض والتدقيق
          </div>
          <div className="p-2">
            <ReviewPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4" orderId="mobile-01" ar={{system:{loading:'جاري..'}, legal:{vault:'مشفر'}}} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-slate-950 p-3 border-b border-slate-800 font-bold text-sm text-emerald-400 flex items-center gap-2">
            <FileVideo className="w-4 h-4" /> الرفع السيادي
          </div>
          <div className="p-2">
            <CloudUploadZone orderId="mobile-01" clientId="client-01" ar={{system:{gpu_alloc:'تخصيص مسار..'}, legal:{vault:'مشفر'}}} />
          </div>
        </div>
      </div>

      {/* --- واجهة سطح المكتب (Desktop OS Windows) --- */}
      <div className="hidden md:block relative w-full h-full pt-14">
        {windows.find(w => w.id === 'player')?.isOpen && (
          <motion.div drag dragMomentum={false} onMouseDown={() => bringToFront('player')} className="absolute top-20 left-20 w-[800px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden" style={{ zIndex: windows.find(w => w.id === 'player')?.zIndex }}>
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm"><Monitor className="w-4 h-4 text-indigo-400" /> {windows.find(w => w.id === 'player')?.title}</div>
            </div>
            <div className="p-4"><ReviewPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4" orderId="desktop-01" ar={{system:{loading:'جاري..'}, legal:{vault:'مشفر'}}} /></div>
          </motion.div>
        )}

        {windows.find(w => w.id === 'upload')?.isOpen && (
          <motion.div drag dragMomentum={false} onMouseDown={() => bringToFront('upload')} className="absolute top-40 right-20 w-[450px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden" style={{ zIndex: windows.find(w => w.id === 'upload')?.zIndex }}>
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm"><FileVideo className="w-4 h-4 text-emerald-400" /> {windows.find(w => w.id === 'upload')?.title}</div>
            </div>
            <div className="p-4"><CloudUploadZone orderId="desktop-01" clientId="client-01" ar={{system:{gpu_alloc:'تخصيص مسار..'}, legal:{vault:'مشفر'}}} /></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
