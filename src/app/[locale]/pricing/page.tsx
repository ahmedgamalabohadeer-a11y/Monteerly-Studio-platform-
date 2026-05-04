'use client'
import React from 'react';
import { CheckCircle, Star, Zap, ShieldCheck } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function ProfessionalPricing() {
  const plans = [
    {
      name: 'Rookie (المبتدئ)',
      fee: '15%',
      target: 'للمستقلين الجدد',
      desc: 'ابدأ رحلتك في عالم المونتاج بدون أي رسوم اشتراك شهرية.',
      features: ['مساحة تخزين R2 محدودة (5GB)', 'عروض عمل غير محدودة', 'نظام الضمان المالي (Escrow)'],
      img: MCOS_ASSETS.pricing.rookieBg,
      color: 'emerald'
    },
    {
      name: 'Pro (المحترف)',
      fee: '10%',
      target: 'للمبدعين المستقلين',
      desc: 'الأكثر شعبية. عمولة أقل وأدوات ذكاء اصطناعي متقدمة لمضاعفة إنتاجيتك.',
      features: ['مساحة تخزين (50GB)', 'الكاتب الذكي للعروض (Gemini)', 'أولوية في ترشيحات العملاء', 'سحب مالي سريع'],
      img: MCOS_ASSETS.pricing.proBg,
      color: 'indigo',
      popular: true
    },
    {
      name: 'Studio (الوكالة)',
      fee: '5%',
      target: 'لشركات الإنتاج والفرق',
      desc: 'أقل عمولة في السوق لشركات الإنتاج الكبرى مع نظام إدارة فرق العمل.',
      features: ['تخزين R2 غير محدود', 'مساحات عمل تعاونية (Team Workspace)', 'مدير حسابات شخصي', 'عقود IP متقدمة'],
      img: MCOS_ASSETS.pricing.studioBg,
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-20 px-6 font-sans relative overflow-hidden" dir="rtl">
      {/* خلفية جمالية */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black mb-6">استثمر في موهبتك، <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">لا تدفع إلا عندما تربح</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            لقد صممنا هيكل التسعير في MCOS ليكون الأعدل عالمياً. نحن نقتطع العمولة من أرباحك فقط، لن ندفعك للاشتراكات الوهمية.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-slate-900/80 backdrop-blur-xl border-2 ${plan.popular ? 'border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.2)]' : 'border-slate-800'} rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}>
              {plan.popular && (
                <div className="absolute top-0 w-full bg-indigo-600 text-center py-2 text-xs font-black tracking-widest uppercase">
                  الأكثر اختياراً للمحترفين
                </div>
              )}
              
              <div className="h-40 relative">
                <div className="absolute inset-0 bg-slate-950/60 z-10 group-hover:bg-slate-950/40 transition-colors"></div>
                <img src={plan.img} alt={plan.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-6 z-20">
                  <h3 className="text-3xl font-black text-white">{plan.name}</h3>
                  <p className={`text-${plan.color}-400 font-bold text-sm`}>{plan.target}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6 border-b border-slate-800 pb-6">
                  <span className="text-sm text-slate-400 font-bold block mb-2">عمولة المنصة</span>
                  <div className="text-5xl font-black text-white flex items-baseline gap-2">
                    {plan.fee} <span className="text-sm font-medium text-slate-500">فقط من كل مشروع</span>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 h-16">{plan.desc}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium">
                      <CheckCircle className={`w-5 h-5 text-${plan.color}-500 shrink-0`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button className={`w-full bg-${plan.color}-600 hover:bg-${plan.color}-500 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2`}>
                  <ShieldCheck className="w-5 h-5" /> ابدأ بهذه الباقة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
