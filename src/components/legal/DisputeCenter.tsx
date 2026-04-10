'use client';
import React from 'react';
import { AlertTriangle, MessageSquare, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DisputeCenter() {
  return (
    <div className="border border-red-500/20 bg-red-900/5 rounded-xl p-6">
       <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border border-red-500/20">
             <Gavel size={24} />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white">مركز النزاعات</h3>
             <p className="text-sm text-slate-400">لا تقلق، أموالك محفوظة في الضمان (Escrow) حتى حل المشكلة.</p>
          </div>
          <Button variant="outline" className="mr-auto border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
             <AlertTriangle size={16} className="mr-2" /> فتح نزاع جديد
          </Button>
       </div>

       <div className="space-y-4">
          <div className="bg-slate-900 border border-white/10 rounded-lg p-4">
             <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">قيد التحقيق</span>
                <span className="text-xs text-slate-500">Case #DSP-992</span>
             </div>
             <h4 className="font-bold text-white mb-1">العميل يرفض استلام المشروع رغم تنفيذ التعديلات</h4>
             <p className="text-sm text-slate-400 mb-4">مشروع: فيديو موشن جرافيك - شركة الاتحاد</p>
             
             <div className="bg-black/40 p-3 rounded border border-white/5 text-xs text-slate-300 flex items-center gap-2">
                <MessageSquare size={14} />
                <span>رد فريق الدعم: "تم استلام الأدلة، سيصدر الحكم خلال 24 ساعة."</span>
             </div>
          </div>
       </div>
    </div>
  );
}
