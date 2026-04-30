'use client'

import React, { useState } from 'react';
import { getUploadTicket, finalizeDelivery } from '@/app/[locale]/workspace/actions';
import { UploadCloud, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CloudUploadZone({ orderId, clientId, ar }: { orderId: string, clientId: string, ar: any }) {
  const [status, setStatus] = useState<'idle' | 'preparing' | 'uploading' | 'finalizing' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setStatus('preparing');
      // 1. استخدام عبارة "تخصيص المعالجة" من الدستور
      console.log(ar.system.gpu_alloc); 

      const ticket = await getUploadTicket(orderId, file.name, file.type);
      
      setStatus('uploading');
      // 2. الرفع المباشر لـ Cloudflare R2
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', ticket.uploadUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          setStatus('finalizing');
          await finalizeDelivery(orderId, ticket.publicUrl, "تم الرفع عبر محرك MCOS السحابي");
          setStatus('success');
        } else {
          setError('فشل الاتصال بالقمر الصناعي أثناء الرفع');
        }
      };

      xhr.send(file);
    } catch (err: any) {
      setError(err.message);
      setStatus('idle');
    }
  };

  if (status === 'success') return (
    <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center animate-in fade-in zoom-in">
      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
      <p className="text-emerald-800 font-black">تم التسليم وتشفير الأصول بنجاح!</p>
    </div>
  );

  return (
    <div className="relative group">
      <input type="file" onChange={handleUpload} disabled={status !== 'idle'} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed" />
      <div className={`p-8 border-2 border-dashed rounded-[2.5rem] transition-all flex flex-col items-center justify-center gap-4 ${status !== 'idle' ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-50'}`}>
        
        {status === 'idle' && (
          <>
            <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-black text-slate-900 text-lg">أطلق المسودة النهائية</p>
              <p className="text-slate-400 text-xs mt-1">اسحب الملف هنا أو انقر لاستدعاء الأصول</p>
            </div>
          </>
        )}

        {status !== 'idle' && status !== 'success' && (
          <div className="w-full space-y-4 text-center">
            <Loader2 className="w-10 h-10 text-slate-900 animate-spin mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">
                {status === 'preparing' && ar.system.gpu_alloc}
                {status === 'uploading' && `جاري تشفير ونقل البيانات... ${progress}%`}
                {status === 'finalizing' && "تمت المزامنة مع السحابة (مشفر)..."}
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold mt-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}
