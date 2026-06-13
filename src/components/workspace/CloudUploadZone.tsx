'use client'
import React, { useState, useRef } from 'react';
import { UploadCloud, FileVideo, ShieldCheck, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function CloudUploadZone({ orderId, clientId, ar }: unknown) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'preparing' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startSecureUpload = async () => {
    if (!file) return;
    setUploadStatus('preparing');

    try {
      // 1. طلب تصريح الرفع (Presigned URL) من السيرفر الخاص بنا
      const { data: { session } } = await supabase.auth.getSession();
      
      const presignRes = await fetch('/api/storage/r2', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || 'demo-token'}`
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          projectId: orderId
        })
      });

      const { uploadUrl, finalFileUrl, error } = await presignRes.json();
      if (error) throw new Error(error);

      setUploadStatus('uploading');

      // 2. الرفع المباشر (Direct Upload) إلى Cloudflare R2
      // نستخدم XMLHttpRequest لمتابعة نسبة التقدم بدقة للملفات الكبيرة
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadStatus('success');
          // هنا يمكن إرسال finalFileUrl لقاعدة البيانات لحفظ رابط الفيديو النهائي
          console.log("File successfully uploaded to:", finalFileUrl);
        } else {
          throw new Error('فشل الرفع إلى السحابة');
        }
      };

      xhr.onerror = () => { throw new Error('انقطع الاتصال بالسحابة'); };
      xhr.send(file);

    } catch (err) {
      console.error(err);
      setUploadStatus('error');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 text-center" dir="rtl">
      <h3 className="text-xl font-black text-white mb-2 flex justify-center items-center gap-2">
        <UploadCloud className="w-6 h-6 text-emerald-400" />
        بوابة R2 للرفع المباشر
      </h3>
      <p className="text-slate-400 text-sm mb-6">سرعة فائقة. لا يمر الفيديو بخوادمنا لمنع انهيار الذاكرة.</p>

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="video/*" />

      {uploadStatus === 'idle' || uploadStatus === 'error' ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 rounded-2xl p-10 hover:border-emerald-500 cursor-pointer transition-colors"
        >
          <FileVideo className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="font-bold text-white mb-2">{file ? file.name : 'اختر ملف الفيديو (بلا حدود للحجم)'}</p>
          <p className="text-xs text-slate-500">يتم الرفع عبر شبكة Cloudflare العالمية</p>
        </div>
      ) : uploadStatus === 'success' ? (
        <div className="border-2 border-emerald-500/30 bg-emerald-500/10 rounded-2xl p-10">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <p className="font-bold text-emerald-400">تم تأمين الملف في الخزنة السيادية بنجاح.</p>
        </div>
      ) : (
        <div className="border-2 border-slate-700 rounded-2xl p-10">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="font-bold text-white mb-2">جاري الرفع السحابي...</p>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-4">
            <div className="bg-indigo-500 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-indigo-300 mt-2">{progress}%</p>
        </div>
      )}

      {file && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
        <button 
          onClick={startSecureUpload}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
        >
          <ShieldCheck className="w-5 h-5" /> بدء التشفير والرفع
        </button>
      )}

      {uploadStatus === 'error' && (
        <p className="text-rose-400 text-sm font-bold mt-4">حدث خطأ أثناء الرفع. تأكد من اتصالك وحاول مجدداً.</p>
      )}
    </div>
  );
}
