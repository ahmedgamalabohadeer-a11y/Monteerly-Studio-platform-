'use client';
import React from 'react';
import { Download, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function IntegrationsHub() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Premiere Pro Plugin Card */}
       <div className="bg-[#00005c] border border-blue-900/50 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <img src="/icons/premiere-logo.svg" alt="Pr" className="w-32 h-32" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#9999ff] text-[#00005c] font-black text-xl flex items-center justify-center rounded-lg">Pr</div>
                <h3 className="text-2xl font-bold text-white">Adobe Premiere Pro</h3>
             </div>
             <p className="text-blue-100 mb-6 leading-relaxed">
                لا تغادر برنامجك المفضل. حمل إضافة Monteerly لرفع الفيديوهات، استقبال التعليقات، ومزامنة الـ Markers مباشرة داخل التايم لاين.
             </p>
             <ul className="space-y-2 mb-8 text-sm text-blue-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> مزامنة التعليقات كـ Markers</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> رفع Render بضغطة زر</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> استيراد ملفات من التخزين السحابي</li>
             </ul>
             <Button className="bg-white text-[#00005c] font-bold hover:bg-blue-50 w-full">
                <Download size={18} className="mr-2" /> تحميل الإضافة (v2.1)
             </Button>
          </div>
       </div>

       {/* Other Integrations */}
       <div className="space-y-4">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#e01e5a] rounded-lg flex items-center justify-center text-white font-bold">Sl</div>
                <div>
                   <h4 className="font-bold text-white">Slack Notifications</h4>
                   <p className="text-xs text-slate-400">تلقي تنبيهات المشاريع في قنوات سلاك.</p>
                </div>
             </div>
             <Button variant="outline" size="sm" className="border-white/10 text-white">Connect</Button>
          </div>
          
          <div className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0079bf] rounded-lg flex items-center justify-center text-white font-bold">Tr</div>
                <div>
                   <h4 className="font-bold text-white">Trello Sync</h4>
                   <p className="text-xs text-slate-400">تحويل التعليقات إلى بطاقات مهام.</p>
                </div>
             </div>
             <Button variant="outline" size="sm" className="border-white/10 text-white">Connect</Button>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-center justify-between opacity-50">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black border border-white/20 rounded-lg flex items-center justify-center text-white font-bold">Da</div>
                <div>
                   <h4 className="font-bold text-white">DaVinci Resolve</h4>
                   <p className="text-xs text-slate-400">قريباً</p>
                </div>
             </div>
             <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">Soon</span>
          </div>
       </div>
    </div>
  );
}

