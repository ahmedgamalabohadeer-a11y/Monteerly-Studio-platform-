'use client'
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Layers, EyeOff, Zap } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function AboutCompany() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen py-24 px-4 md:px-6 font-sans text-center transition-colors duration-700 ${isDarkMode ? 'bg-[#05050A] text-slate-50' : 'bg-slate-50 text-slate-900'} relative overflow-hidden`} dir="rtl">
      
      {/* خلفية زخرفية */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <img src={MCOS_ASSETS.hero.cyberGridPattern.src || ''} className="w-full h-full object-cover mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <img src={MCOS_ASSETS.branding.logoMain.src} alt="Monteerly OS" className={`h-16 mx-auto mb-12 drop-shadow-2xl ${isDarkMode ? 'opacity-90' : 'opacity-100 grayscale-0 brightness-0'}`} />
        
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          نحن نعيد صياغة <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400">صناعة الإنتاج</span>
        </h1>
        
        <p className={`text-xl md:text-2xl leading-relaxed mb-20 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          انطلقت منصة MCOS برؤية واحدة: تدمير الفوضى المركزية والاحتكار في سوق المونتاج وإنتاج الفيديو. نحن نبني أول نظام تشغيل سيادي يمنح المبدعين المستقلين والوكالات أدوات (تخزين، ذكاء اصطناعي، وضمان مالي) كانت حكراً على استوديوهات هوليوود.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right mb-20">
          <div className={`border p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#0A0A0F] border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6 relative z-10" />
            <h3 className="text-3xl font-black mb-4 relative z-10">رؤيتنا الإستراتيجية</h3>
            <p className={`text-lg leading-relaxed relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              تحويل الفوضى الإبداعية إلى تدفق رقمي منظم. خلق اقتصاد منشئي محتوى آمن 100%، حيث لا تضيع حقوق مبدع، ولا تتأخر تسليمة عميل بفضل العقود الذكية.
            </p>
          </div>
          
          <div className={`border p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#0A0A0F] border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none"></div>
            <Layers className="w-12 h-12 text-indigo-400 mb-6 relative z-10" />
            <h3 className="text-3xl font-black mb-4 relative z-10">الترسانة التقنية</h3>
            <p className={`text-lg leading-relaxed relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              تزويد السوق بالمساعد الإخراجي الذكي (Co-Pilot) وقبو الأصول اللامحدود (Cloud Vault) في بيئة عمل سيادية متكاملة تضمن عزل المشتتات.
            </p>
          </div>
        </div>

        {/* مؤسس الإمبراطورية */}
        <div className={`border p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-right ${isDarkMode ? 'bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border-indigo-500/20' : 'bg-white border-slate-200'}`}>
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
          <img src={MCOS_ASSETS.branding.founder.src} alt="Founder" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-xl relative z-10" />
          <div className="relative z-10">
             <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
               <Zap className="w-5 h-5 text-amber-400" /> ساهم في هندسة النظام
             </h3>
             <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
               "رسالتنا هي أن نمنح المبدع العربي المنصة السيادية التي يستحقها. هذه المنصة تُبنى بآرائكم ومقترحاتكم."
             </p>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all text-sm shadow-lg shadow-indigo-500/20">
               إرسال تقرير للمهندسين (Transmit)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
