'use client';
import React, { useState } from 'react';
import { Database, Download, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DataExport() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready'>('idle');

  const handleRequest = () => {
    setStatus('processing');
    setTimeout(() => setStatus('ready'), 3000); // Simulating 3s process
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-full"><Database size={24} /></div>
          <div className="flex-1">
             <h3 className="font-bold text-lg mb-1">نسخة من بياناتك (Data Portability)</h3>
             <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                لديك الحق في الحصول على نسخة من جميع البيانات التي نحتفظ بها عنك. يشمل ذلك: تفاصيل الحساب، سجل النشاط، الفواتير، والبيانات الوصفية للمشاريع (JSON Format).
             </p>

             {status === 'idle' && (
                <Button onClick={handleRequest} variant="outline" icon={<Download size={16} />}>
                   طلب أرشيف البيانات
                </Button>
             )}

             {status === 'processing' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg animate-pulse">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                   جاري تجميع بياناتك... قد يستغرق هذا بضع دقائق.
                </div>
             )}

             {status === 'ready' && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-center justify-between">
                   <div className="flex items-center gap-2 text-emerald-800 text-sm font-bold">
                      <CheckCircle size={18} />
                      الأرشيف جاهز للتحميل (45 KB)
                   </div>
                   <Button size="sm" variant="primary" icon={<Download size={16} />}>تحميل ZIP</Button>
                </div>
             )}
             
             <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                <Lock size={10} /> هذا الرابط صالح لمدة 24 ساعة فقط لأسباب أمنية.
             </p>
          </div>
       </div>
    </div>
  );
}
