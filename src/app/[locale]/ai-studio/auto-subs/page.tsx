'use client'
import React, { useState } from 'react';
import { Type, UploadCloud, Loader2, Download } from 'lucide-react';

export default function AutoSubtitles() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-block bg-amber-500/10 p-4 rounded-full mb-4">
            <Type className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl font-black mb-2">المترجم الديناميكي (Auto-Subtitles)</h1>
          <p className="text-slate-400">تفريغ صوتي وتوليد ملفات SRT/VTT تلقائياً مدعوم بـ AI.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
          <div 
            className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-amber-500 transition-colors cursor-pointer mb-8"
            onClick={() => { setStatus('processing'); setTimeout(() => setStatus('done'), 3000); }}
          >
            {status === 'idle' ? (
              <>
                <UploadCloud className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="font-bold text-white text-lg">اسحب ملف الفيديو أو الصوت هنا</p>
                <p className="text-slate-500 text-sm mt-2">MP4, MOV, MP3, WAV (الحد الأقصى 500MB)</p>
              </>
            ) : status === 'processing' ? (
              <>
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="font-bold text-amber-400 text-lg">جاري تحليل الصوت وتوليد النصوص...</p>
              </>
            ) : (
              <>
                <Type className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="font-bold text-emerald-400 text-lg">تم استخراج النصوص بنجاح</p>
              </>
            )}
          </div>

          {status === 'done' && (
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> تحميل (SRT)
              </button>
              <button className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> تحميل (VTT)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
