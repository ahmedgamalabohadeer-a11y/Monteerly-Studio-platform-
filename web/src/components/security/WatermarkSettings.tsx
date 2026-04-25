'use client';
import React from 'react';
import { Fingerprint, Eye, ShieldAlert, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WatermarkSettings() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <ShieldAlert className="text-indigo-400" size={20} /> الحماية الجنائية (Forensic)
          </h3>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-xs text-green-400 font-bold">نشط</span>
          </div>
       </div>

       <div className="space-y-4 mb-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-start gap-4">
             <div className="p-2 bg-black rounded-lg text-slate-400"><Eye size={20} /></div>
             <div className="flex-1">
                <div className="flex justify-between mb-1">
                   <h4 className="font-bold text-white text-sm">علامة مائية مرئية</h4>
                   <input type="checkbox" defaultChecked className="toggle-checkbox" />
                </div>
                <p className="text-xs text-slate-400">يظهر اسم العميل والوقت ورقم IP في منتصف الشاشة.</p>
             </div>
          </div>

          <div className="p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/30 flex items-start gap-4">
             <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Fingerprint size={20} /></div>
             <div className="flex-1">
                <div className="flex justify-between mb-1">
                   <h4 className="font-bold text-white text-sm">البصمة الخفية (Invisible DNA)</h4>
                   <Check size={16} className="text-indigo-400" />
                </div>
                <p className="text-xs text-indigo-200">
                   تقنية تشفير بيكسلات غير مرئية تمكنك من تتبع مصدر التسريب حتى لو تم تصوير الشاشة بكاميرا خارجية.
                </p>
             </div>
          </div>
       </div>

       <Button variant="outline" className="w-full border-white/10 text-slate-300 hover:text-white">تخصيص نمط العلامة المائية</Button>
    </div>
  );
}

