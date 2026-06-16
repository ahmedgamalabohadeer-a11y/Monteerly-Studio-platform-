'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { User, Mic, Video, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DigitalTwinSetup() {
  const [step, setStep] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-[600px]">
      <div className="relative h-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
        {step < 3 ? (
          <div className="text-center p-8">
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <User size={64} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">جاري بناء نسختك الرقمية...</h3>
            <p className="text-slate-400 text-sm">أكمل الخطوات لإنشاء أفاتار يتحدث بصوتك وصورتك.</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/images/features/live.jpg"
              alt="معاينة التوأم الرقمي"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl">
              <p className="text-white text-sm font-medium">&quot;مرحباً، هذا هو التوأم الرقمي الخاص بي. يمكنني قراءة أي نص تكتبه بنفس نبرة صوتي!&quot;</p>
              <div className="flex gap-2 mt-2">
                <div className="h-1 w-1 bg-green-500 rounded-full animate-bounce" />
                <div className="h-1 w-1 bg-green-500 rounded-full animate-bounce delay-75" />
                <div className="h-1 w-1 bg-green-500 rounded-full animate-bounce delay-150" />
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">AI GENERATED</div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">التوأم الرقمي (Digital Twin)</h2>
          <p className="text-slate-400">اصنع محتوى لا نهائي دون الحاجة للتصوير كل مرة.</p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${step === 1 ? 'bg-indigo-900/20 border-indigo-500' : 'bg-slate-900 border-white/5 opacity-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-white flex items-center gap-2"><Mic size={18} /> بصمة الصوت</h4>
            {step > 1 && <Check size={16} className="text-green-500" />}
          </div>
          <p className="text-xs text-slate-400 mb-4">اقرأ نصاً قصيراً لمدة دقيقتين لتدريب النموذج على نبرة صوتك.</p>
          {step === 1 && <Button onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white">بدء التسجيل</Button>}
        </div>

        <div className={`p-4 rounded-xl border transition-all ${step === 2 ? 'bg-indigo-900/20 border-indigo-500' : 'bg-slate-900 border-white/5 opacity-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-white flex items-center gap-2"><Video size={18} /> ملامح الوجه</h4>
            {step > 2 && <Check size={16} className="text-green-500" />}
          </div>
          <p className="text-xs text-slate-400 mb-4">ارفع فيديو بدقة 4K لوجهك وأنت تتحدث بوضوح في إضاءة جيدة.</p>
          {step === 2 && <Button onClick={() => setStep(3)} className="w-full bg-indigo-600 text-white">رفع الفيديو</Button>}
        </div>

        <div className={`p-4 rounded-xl border transition-all ${step === 3 ? 'bg-indigo-900/20 border-indigo-500' : 'bg-slate-900 border-white/5 opacity-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-white flex items-center gap-2"><Sparkles size={18} /> المعالجة</h4>
          </div>
          <p className="text-xs text-slate-400 mb-4">سيقوم النظام بدمج الصوت والصورة لإنشاء النموذج.</p>
          {step === 3 && <Button className="w-full bg-green-600 text-white font-bold">حفظ النموذج</Button>}
        </div>
      </div>
    </div>
  );
}
