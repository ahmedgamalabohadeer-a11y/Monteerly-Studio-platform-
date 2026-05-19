'use client'
import React, { useState, useEffect } from 'react';
import { CheckCircle, ShieldCheck, Zap, Server } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function ProfessionalPricing() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const plans = [
    {
      name: 'نواة التأسيس (Rookie)',
      fee: '15%',
      target: 'للمستقلين الجدد (Free Tier)',
      desc: 'انضم للنخبة. ابدأ رحلتك في عالم الإنتاج بدون أي رسوم اشتراك شهرية.',
      features: ['مساحة تخزين سحابية أولية (5GB)', 'عروض عمل غير محدودة', 'حماية عسكرية للحقوق (Escrow)'],
      img: MCOS_ASSETS.pricing.rookieBg,
      color: 'emerald'
    },
    {
      name: 'تدفق الاحتراف (Pro)',
      fee: '10%',
      target: 'للمبدعين المستقلين (Creators)',
      desc: 'الأكثر شعبية. عمولة أقل (Revenue Share) وأدوات ذكاء اصطناعي لتقليص وقت التحضير.',
      features: ['قبو الأصول السحابية (50GB)', 'المساعد الإخراجي (Co-Pilot)', 'أولوية في ترشيحات النظام', 'تحرير سريع للأموال'],
      img: MCOS_ASSETS.pricing.proBg,
      color: 'indigo',
      popular: true
    },
    {
      name: 'السيادة المطلقة (Studio)',
      fee: '5%',
      target: 'لوكالات الإنتاج (Agencies)',
      desc: 'شريك النجاح (Growth Partner). أدر فريقك حول العالم في شاشة مركزية واحدة بأقل عمولة.',
      features: ['تخزين سحابي غير محدود (Cloud Vault)', 'مساحات عمل تعاونية (Live Sync)', 'إصدار مطالبات مالية رسمية', 'مولد العقود الذكية (NDA)'],
      img: MCOS_ASSETS.pricing.studioBg,
      color: 'amber'
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${isDarkMode ? 'bg-[#05050A] text-slate-50' : 'bg-slate-50 text-slate-900'} relative overflow-hidden`} dir="rtl">
      {/* خلفية جمالية */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img src={MCOS_ASSETS.hero.cyberGridPattern.src || ''} className="w-full h-full object-cover mix-blend-screen" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 py-24 px-4 md:px-6">
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black mb-8 border backdrop-blur-md shadow-lg bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            <Zap className="w-4 h-4" /> التسعير العادل (Revenue Share)
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            استثمر في موهبتك، <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">لا تدفع إلا عندما تربح</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            لقد صممنا هيكل التسعير في Monteerly OS ليكون الأعدل عالمياً. نحن نقتطع العمولة من أرباحك فقط، لن ندفعك للاشتراكات الوهمية والأدوات المبعثرة.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border ${isDarkMode ? (plan.popular ? 'bg-[#0A0A0F]/90 border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.2)]' : 'bg-[#0A0A0F]/80 border-white/5') : (plan.popular ? 'bg-white border-indigo-500 shadow-xl' : 'bg-white border-slate-200 shadow-md')}`}>
              
              {plan.popular && (
                <div className="absolute top-0 w-full bg-indigo-600 text-center py-2.5 text-xs font-black tracking-widest uppercase text-white z-30 shadow-md">
                  الأكثر اختياراً للمحترفين
                </div>
              )}

              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10 opacity-90"></div>
                <img src={plan.img || MCOS_ASSETS.hero.banner.src} alt={plan.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-6 right-6 z-20">
                  <h3 className="text-3xl font-black text-white drop-shadow-lg">{plan.name}</h3>
                  <p className={`text-${plan.color}-400 font-bold text-sm mt-1 drop-shadow-md`}>{plan.target}</p>
                </div>
              </div>
              
              <div className={`p-8 ${isDarkMode ? '' : 'bg-white'}`}>
                <div className="mb-6 border-b border-white/10 pb-8">
                  <span className={`text-sm font-bold block mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>حصة الإيرادات (Revenue Share)</span>
                  <div className={`text-6xl font-black flex items-baseline gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {plan.fee} <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>من التدفق الرقمي</span>
                  </div>
                </div>
                
                <p className={`mb-8 h-20 leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{plan.desc}</p>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className={`flex items-start gap-3 font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CheckCircle className={`w-5 h-5 text-${plan.color}-500 shrink-0 mt-0.5`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button className={`w-full text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                  plan.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' : 
                  plan.color === 'amber' ? 'bg-amber-600 hover:bg-amber-500' : 
                  'bg-indigo-600 hover:bg-indigo-500'
                }`}>
                  <ShieldCheck className="w-5 h-5" /> تفعيل المعالجة النهائية
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
