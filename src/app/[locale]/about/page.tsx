'use client'
import React from 'react';
import { ShieldCheck, Layers } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function AboutCompany() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-20 px-6 font-sans text-center" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <img src={MCOS_ASSETS.branding.logoMain} className="h-16 mx-auto mb-10" />
        <h1 className="text-5xl font-black mb-8">نحن نعيد صياغة <span className="text-indigo-400">صناعة الإنتاج</span></h1>
        <p className="text-xl text-slate-400 leading-relaxed mb-16">
          انطلقت منصة MCOS برؤية واحدة: تدمير المركزية والاحتكار في سوق المونتاج وإنتاج الفيديو. نحن نبني أول نظام تشغيل (Corporate OS) يمنح المبدعين المستقلين والوكالات أدوات سيادية (تخزين، ذكاء اصطناعي، وضمان مالي) كانت حكراً على استوديوهات هوليوود.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">رؤيتنا (Vision)</h3>
            <p className="text-slate-400">خلق اقتصاد منشئي محتوى آمن 100%، حيث لا تضيع حقوق مبدع، ولا تتأخر تسليمة عميل.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <Layers className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">مهمتنا (Mission)</h3>
            <p className="text-slate-400">تزويد السوق بأدوات الذكاء الاصطناعي (Gemini) والتخزين اللامحدود (R2) في بيئة عمل متكاملة.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
