'use client';
import React, { useState } from 'react';
import { Fingerprint, Eye, EyeOff, ShieldAlert, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WatermarkManager() {
  const [mode, setMode] = useState<'visible' | 'invisible'>('invisible');
  const [detectedLeak, setDetectedLeak] = useState<any>(null);

  const simulateDetection = () => {
    setDetectedLeak({
      user: 'Khaled Omar (Freelancer)',
      ip: '197.55.x.x',
      time: 'Yesterday 14:30',
      device: 'iPhone 14 Pro'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Configuration */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
                <Fingerprint size={24} />
             </div>
             <div>
                <h3 className="font-bold text-white">العلامة المائية الجنائية</h3>
                <p className="text-xs text-slate-400">حماية المحتوى من التسريب (Anti-Piracy).</p>
             </div>
          </div>

          <div className="space-y-6">
             <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
                <label className="text-xs text-slate-300 font-bold mb-3 block">نوع البصمة</label>
                <div className="flex gap-4">
                   <button 
                     onClick={() => setMode('invisible')}
                     className={`flex-1 p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-2 ${mode === 'invisible' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                   >
                      <EyeOff size={20} />
                      غير مرئية (Forensic)
                   </button>
                   <button 
                     onClick={() => setMode('visible')}
                     className={`flex-1 p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-2 ${mode === 'visible' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                   >
                      <Eye size={20} />
                      مرئية (Burn-in)
                   </button>
                </div>
                <p className="mt-3 text-[10px] text-slate-500">
                   {mode === 'invisible' 
                      ? 'يتم دمج كود تسلسلي مشفر داخل بيكسلات الفيديو لا يرى بالعين المجردة، ولكنه يقاوم الضغط وتصوير الشاشة.' 
                      : 'يتم حرق اسم المستخدم والبريد الإلكتروني وتاريخ المشاهدة بشكل باهت على الفيديو.'}
                </p>
             </div>

             <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <span className="text-sm font-bold text-white">تفعيل الحماية لكل المشاريع</span>
                <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow" />
                </div>
             </div>
          </div>
       </div>

       {/* Leak Detector */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <ShieldAlert size={120} />
          </div>
          
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
             <ScanLine className="text-yellow-400" /> كاشف التسريب (Leak Detector)
          </h3>
          
          <div className="border-2 border-dashed border-white/10 rounded-xl h-48 flex flex-col items-center justify-center mb-6 bg-black/20">
             <Button variant="outline" onClick={simulateDetection} className="border-white/10 text-white hover:bg-white/5">
                رفع ملف مسرب للتحليل
             </Button>
          </div>

          {detectedLeak && (
             <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-in slide-in-from-bottom-2">
                <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                   <ShieldAlert size={14} /> تم كشف المصدر!
                </h4>
                <div className="space-y-2 text-xs text-white">
                   <div className="flex justify-between"><span className="text-slate-400">المسرب:</span> <b>{detectedLeak.user}</b></div>
                   <div className="flex justify-between"><span className="text-slate-400">العنوان (IP):</span> <span className="font-mono">{detectedLeak.ip}</span></div>
                   <div className="flex justify-between"><span className="text-slate-400">الجهاز:</span> <span>{detectedLeak.device}</span></div>
                   <div className="flex justify-between"><span className="text-slate-400">وقت المشاهدة:</span> <span>{detectedLeak.time}</span></div>
                </div>
             </div>
          )}
       </div>
    </div>
  );
}

