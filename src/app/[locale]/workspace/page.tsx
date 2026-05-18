'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileVideo, ShieldCheck, Smartphone, EyeOff } from 'lucide-react';
import CloudUploadZone from '@/components/workspace/CloudUploadZone';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';

export default function CorporateOSWorkspace() {
  const [windows, setWindows] = useState([
    { id: 'player', title: 'شاشة العرض المباشر', isOpen: true, zIndex: 10 },
    { id: 'upload', title: 'قبو الأصول السحابية', isOpen: true, zIndex: 11 },
  ]);
  const [zenMode, setZenMode] = useState(false);

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: 20 } : { ...w, zIndex: 10 }));
  };

  return (
    <div className={`h-screen w-full transition-colors duration-700 overflow-hidden font-sans relative ${zenMode ? 'bg-black' : 'bg-[#05050A]'}`} dir="rtl">
      
      {/* شريط المهام الموحد السيادي */}
      <header className={`absolute top-0 w-full h-14 backdrop-blur-xl border-b z-50 flex items-center justify-between px-4 md:px-6 transition-all ${zenMode ? 'bg-black/50 border-white/5 opacity-30 hover:opacity-100' : 'bg-[#05050A]/90 border-white/10'}`}>
        <div className="flex items-center gap-4">
           <span className="text-white font-black text-sm tracking-widest hidden md:block">MCOS <span className="text-indigo-500">WORKSPACE</span></span>
           <span className="text-white font-black text-sm tracking-widest md:hidden flex items-center gap-2"><Smartphone className="w-4 h-4"/> MCOS MOBILE</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* زر وضع التركيز (Zen Mode) من الدستور النصي */}
          <button onClick={() => setZenMode(!zenMode)} className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${zenMode ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-[#12121A] text-slate-400 border-white/10 hover:text-white'}`}>
            <EyeOff className="w-4 h-4" /> {zenMode ? 'العودة للعالم' : 'عزل المشتتات وبدء التدفق'}
          </button>
          
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" /> هذا المشروع محمي بتشفير 256-bit
          </div>
        </div>
      </header>

      {/* --- واجهة الهاتف المحمول --- */}
      <div className="md:hidden w-full h-full pt-20 px-4 pb-20 overflow-y-auto space-y-6">
        <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#12121A] p-3 border-b border-white/5 font-bold text-sm text-indigo-400 flex items-center gap-2">
            <Monitor className="w-4 h-4" /> العرض والتدقيق
          </div>
          <div className="p-2">
            <ReviewPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4" orderId="mobile-01" ar={{system:{loading:'جاري تجهيز طاولة المونتاج...'}, legal:{vault:'تم التشفير والحفظ السحابي'}}} />
          </div>
        </div>

        <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#12121A] p-3 border-b border-white/5 font-bold text-sm text-emerald-400 flex items-center gap-2">
            <FileVideo className="w-4 h-4" /> قبو الأصول (مشفر)
          </div>
          <div className="p-2">
            <CloudUploadZone orderId="mobile-01" clientId="client-01" ar={{system:{gpu_alloc:'تخصيص مسار GPU..'}, legal:{vault:'مشفر'}}} />
          </div>
        </div>
      </div>

      {/* --- واجهة سطح المكتب --- */}
      <div className="hidden md:block relative w-full h-full pt-14">
        {windows.find(w => w.id === 'player')?.isOpen && (
          <motion.div drag dragMomentum={false} onMouseDown={() => bringToFront('player')} className="absolute top-24 left-24 w-[800px] bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden" style={{ zIndex: windows.find(w => w.id === 'player')?.zIndex }}>
            <div className="bg-[#12121A] px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm"><Monitor className="w-4 h-4 text-indigo-400" /> {windows.find(w => w.id === 'player')?.title}</div>
            </div>
            <div className="p-4"><ReviewPlayer url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4" orderId="desktop-01" ar={{system:{loading:'جاري تجهيز طاولة المونتاج...'}, legal:{vault:'تم التشفير والحفظ السحابي'}}} /></div>
          </motion.div>
        )}

        {windows.find(w => w.id === 'upload')?.isOpen && (
          <motion.div drag dragMomentum={false} onMouseDown={() => bringToFront('upload')} className="absolute top-40 right-24 w-[450px] bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden" style={{ zIndex: windows.find(w => w.id === 'upload')?.zIndex }}>
            <div className="bg-[#12121A] px-4 py-3 flex items-center justify-between cursor-move border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm"><FileVideo className="w-4 h-4 text-emerald-400" /> {windows.find(w => w.id === 'upload')?.title}</div>
            </div>
            <div className="p-4"><CloudUploadZone orderId="desktop-01" clientId="client-01" ar={{system:{gpu_alloc:'تخصيص مسار GPU..'}, legal:{vault:'مشفر'}}} /></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
