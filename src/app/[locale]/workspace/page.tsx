'use client';

import React, { useState } from 'react';
import { EyeOff, FileVideo, Monitor, ShieldCheck } from 'lucide-react';
import CloudUploadZone from '@/components/workspace/CloudUploadZone';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';

export default function CorporateOSWorkspace() {
  const [zenMode, setZenMode] = useState(false);

  return (
    <section
      className={`mx-auto w-full max-w-7xl space-y-6 px-4 py-6 transition-colors duration-500 md:px-6 md:py-8 ${
        zenMode ? 'bg-black/20' : ''
      }`}
    >
      <header className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#0A0A0F] p-5 shadow-xl md:flex-row md:items-center md:justify-between md:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-50">مساحة العمل</h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-400">
            بيئة تنفيذ مركزة لمراجعة المخرجات وإدارة الأصول السحابية بدون تحويل
            الصفحة نفسها إلى shell مستقل أو نظام نوافذ منفصل.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={() => setZenMode(!zenMode)}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              zenMode
                ? 'border-indigo-500 bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.35)]'
                : 'border-white/10 bg-[#12121A] text-slate-300 hover:text-white'
            }`}
          >
            <EyeOff className="h-4 w-4" />
            {zenMode ? 'إنهاء وضع التركيز' : 'بدء وضع التركيز'}
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            هذا المشروع محمي بتشفير 256-bit
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_minmax(320px,0.9fr)]">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0F] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#12121A] px-4 py-3 text-sm font-bold text-indigo-400">
            <Monitor className="h-4 w-4" />
            العرض والتدقيق
          </div>

          <div className="p-3 md:p-4">
            <ReviewPlayer
              url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4"
              orderId="workspace-review"
              ar={{
                system: { loading: 'جاري تجهيز طاولة المونتاج...' },
                legal: { vault: 'تم التشفير والحفظ السحابي' },
              }}
            />
          </div>
        </section>

        <aside className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0F] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#12121A] px-4 py-3 text-sm font-bold text-emerald-400">
            <FileVideo className="h-4 w-4" />
            قبو الأصول السحابية
          </div>

          <div className="space-y-4 p-3 md:p-4">
            <CloudUploadZone
              orderId="workspace-upload"
              clientId="client-01"
              ar={{
                system: { gpu_alloc: 'تخصيص مسار GPU..' },
                legal: { vault: 'مشفر' },
              }}
            />

            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
              <h2 className="mb-2 text-sm font-bold text-slate-200">
                ملاحظات التشغيل
              </h2>
              <p className="text-xs leading-6 text-slate-400">
                هذه المنطقة مخصصة لرفع الأصول ومتابعة الجاهزية التشغيلية، مع إبقاء
                واجهة العمل في عمود واضح وثابت بدل النوافذ الطافية القابلة للسحب.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
