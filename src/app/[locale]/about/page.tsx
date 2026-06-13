'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Layers, Zap, Sun, Moon } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function AboutCompany() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-4 py-24 text-center font-sans transition-colors duration-700 md:px-6 ${
        isDarkMode ? 'bg-[#05050A] text-slate-50' : 'bg-slate-50 text-slate-900'
      }`}
      dir="rtl"
    >
      <div className="absolute left-6 top-6 z-20">
        <button
          type="button"
          onClick={() => setIsDarkMode((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
            isDarkMode
              ? 'bg-white/10 text-white hover:bg-white/15'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
        </button>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-[0.02]">
        <Image
          src={MCOS_ASSETS.hero.banner.src || ''}
          alt=""
          fill
          className="object-cover mix-blend-screen"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <Image
          src={MCOS_ASSETS.branding.logoMain.src}
          alt="Monteerly OS"
          width={220}
          height={64}
          className={`mx-auto mb-12 h-16 w-auto drop-shadow-2xl ${
            isDarkMode ? 'opacity-90' : 'brightness-0 grayscale-0 opacity-100'
          }`}
        />

        <h1 className="mb-8 text-4xl font-black leading-tight md:text-6xl">
          نحن نعيد صياغة{' '}
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-400 bg-clip-text text-transparent">
            صناعة الإنتاج
          </span>
        </h1>

        <p
          className={`mb-20 text-xl font-medium leading-relaxed md:text-2xl ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          انطلقت منصة MCOS برؤية واحدة: تدمير الفوضى المركزية والاحتكار في سوق المونتاج وإنتاج الفيديو.
          نحن نبني أول نظام تشغيل سيادي يمنح المبدعين المستقلين والوكالات أدوات (تخزين، ذكاء
          اصطناعي، وضمان مالي) كانت حكراً على استوديوهات هوليوود.
        </p>

        <div className="mb-20 grid grid-cols-1 gap-8 text-right md:grid-cols-2">
          <div
            className={`relative overflow-hidden rounded-[2.5rem] border p-10 shadow-xl transition-transform duration-500 hover:-translate-y-2 ${
              isDarkMode ? 'border-white/5 bg-[#0A0A0F]' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-[50px]" />
            <ShieldCheck className="relative z-10 mb-6 h-12 w-12 text-emerald-400" />
            <h3 className="relative z-10 mb-4 text-3xl font-black">رؤيتنا الإستراتيجية</h3>
            <p
              className={`relative z-10 text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              تحويل الفوضى الإبداعية إلى تدفق رقمي منظم. خلق اقتصاد منشئي محتوى آمن 100%، حيث لا
              تضيع حقوق مبدع، ولا تتأخر تسليمة عميل بفضل العقود الذكية.
            </p>
          </div>

          <div
            className={`relative overflow-hidden rounded-[2.5rem] border p-10 shadow-xl transition-transform duration-500 hover:-translate-y-2 ${
              isDarkMode ? 'border-white/5 bg-[#0A0A0F]' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-[50px]" />
            <Layers className="relative z-10 mb-6 h-12 w-12 text-indigo-400" />
            <h3 className="relative z-10 mb-4 text-3xl font-black">الترسانة التقنية</h3>
            <p
              className={`relative z-10 text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              تزويد السوق بالمساعد الإخراجي الذكي (Co-Pilot) وقبو الأصول اللامحدود (Cloud Vault) في
              بيئة عمل سيادية متكاملة تضمن عزل المشتتات.
            </p>
          </div>
        </div>

        <div
          className={`relative flex flex-col items-center gap-8 overflow-hidden rounded-[3rem] border p-10 text-right shadow-2xl md:flex-row ${
            isDarkMode
              ? 'border-indigo-500/20 bg-gradient-to-br from-[#0A0A0F] to-[#05050A]'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-indigo-500/5 blur-[100px]" />
          <Image
            src={MCOS_ASSETS.branding.founder.src}
            alt="Founder"
            width={128}
            height={128}
            className="relative z-10 h-32 w-32 rounded-full border-4 border-indigo-500/30 object-cover shadow-xl"
          />
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center gap-2 text-2xl font-black">
              <Zap className="h-5 w-5 text-amber-400" /> ساهم في هندسة النظام
            </h3>
            <p className={`mb-4 text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              &quot;رسالتنا هي أن نمنح المبدع العربي المنصة السيادية التي يستحقها. هذه المنصة تُبنى
              بآرائكم ومقترحاتكم.&quot;
            </p>
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500">
              إرسال تقرير للمهندسين (Transmit)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
