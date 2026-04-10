'use client';
import React from 'react';
import { Download, RefreshCw, CheckCircle, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DeliveryReview() {
  return (
    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-center animate-in zoom-in-95">
       <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileVideo size={32} />
       </div>
       
       <h3 className="text-xl font-bold text-emerald-900 mb-2">قام المستقل بتسليم المشروع</h3>
       <p className="text-emerald-700/80 mb-6 max-w-md mx-auto">
          يرجى مراجعة الملفات المرفقة أدناه. لديك 48 ساعة للموافقة أو طلب تعديلات قبل أن يتم تحرير الأموال تلقائياً.
       </p>

       <div className="bg-white border border-emerald-100 rounded-xl p-4 mb-6 flex items-center justify-between max-w-lg mx-auto shadow-sm">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-50 rounded text-emerald-600"><FileVideo size={20} /></div>
             <div className="text-left">
                <p className="font-bold text-sm">Final_Cut_v2.mp4</p>
                <p className="text-xs text-muted-foreground">250 MB • MP4</p>
             </div>
          </div>
          <Button size="sm" variant="ghost" icon={<Download size={16} />}>تحميل</Button>
       </div>

       <div className="flex justify-center gap-4">
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300" icon={<RefreshCw size={16} />}>
             طلب تعديلات
          </Button>
          <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 border-none" icon={<CheckCircle size={16} />}>
             قبول وإنهاء المشروع
          </Button>
       </div>
    </div>
  );
}
