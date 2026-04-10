'use client';
import React from 'react';
import { Download, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ClientDeliveryView() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
       <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-center text-white">
             <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                <CheckCircle size={32} />
             </div>
             <h1 className="text-2xl font-bold mb-2">مشروعك جاهز للاستلام! 🎉</h1>
             <p className="text-slate-300">قام المونتير بتسليم النسخة النهائية المعتمدة.</p>
          </div>

          {/* Content */}
          <div className="p-8">
             <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <div className="w-20 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-xs">PREVIEW</div>
                <div className="flex-1">
                   <h3 className="font-bold text-slate-900">Final_Cut_Master_v3.mp4</h3>
                   <p className="text-xs text-slate-500">4K UHD • 2.4 GB • H.264</p>
                </div>
                <Button size="lg" variant="primary" icon={<Download size={20} />}>تحميل</Button>
             </div>

             <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-xl border border-yellow-100 flex gap-2">
                <Lock size={16} className="shrink-0 mt-0.5" />
                <p>
                   بتحميلك لهذا الملف، يتم تحرير المبلغ المتبقي في الضمان (Escrow) تلقائياً للمستقل وتنتقل حقوق الملكية الفكرية إليك بالكامل.
                </p>
             </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-200">
             تم التسليم عبر منصة Monteerly Studio الآمنة.
          </div>
       </div>
    </div>
  );
}
