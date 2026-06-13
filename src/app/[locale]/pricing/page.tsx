'use client'
import React from 'react';
import Image from 'next/image';
import { CheckCircle, ShieldCheck, CreditCard, DollarSign } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function ProfessionalPricing() {
  const plans = [
    {
      name: 'نواة التأسيس (Rookie)',
      fee: '20%',
      target: 'للمستقلين الجدد (Free Tier)',
      desc: 'انضم للنخبة. ابدأ رحلتك في عالم الإنتاج بدون رسوم اشتراك.',
      features: ['مساحة تخزين سحابية (5GB)', 'عروض عمل غير محدودة', 'حماية عسكرية للحقوق (Escrow)'],
      img: MCOS_ASSETS.workspace.laptop.src,
      color: 'emerald'
    },
    {
      name: 'تدفق الاحتراف (Pro)',
      fee: '12%',
      target: 'للمبدعين المستقلين (Creators)',
      desc: 'الأكثر شعبية. عمولة أقل (Revenue Share) وأدوات ذكاء اصطناعي متقدمة.',
      features: ['قبو الأصول السحابية (50GB)', 'المساعد الإخراجي (Co-Pilot)', 'أولوية في ترشيحات النظام', 'تخفيض نقاط رادار الاحتيال'],
      img: MCOS_ASSETS.workspace.dualScreen.src,
      color: 'indigo',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#05050A] text-slate-50 relative overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto py-24 px-4 md:px-6 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            استثمر في موهبتك، <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">لا تدفع إلا عندما تربح</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium text-slate-400 mb-8">
            نحن نقتطع العمولة من أرباحك فقط، لن ندفعك للاشتراكات الوهمية والأدوات المبعثرة.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <span className="bg-[#12121A] border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2"><CreditCard className="w-4 h-4 text-blue-400"/> Paymob (محلي والدول العربية)</span>
             <span className="bg-[#12121A] border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2"><DollarSign className="w-4 h-4 text-blue-500"/> PayPal (للعملاء الدوليين)</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-[2.5rem] overflow-hidden group border ${plan.popular ? 'bg-[#0A0A0F]/90 border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.2)]' : 'bg-[#0A0A0F]/80 border-white/5'}`}>
              {plan.popular && (
                <div className="absolute top-0 w-full bg-indigo-600 text-center py-2.5 text-xs font-black tracking-widest uppercase text-white z-30 shadow-md">
                  الأكثر اختياراً للمحترفين
                </div>
              )}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10 opacity-90"></div>
                <Image
                  src={plan.img}
                  alt={plan.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-6 right-6 z-20">
                  <h3 className="text-3xl font-black text-white drop-shadow-lg">{plan.name}</h3>
                  <p className={`text-${plan.color}-400 font-bold text-sm mt-1 drop-shadow-md`}>{plan.target}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6 border-b border-white/10 pb-8">
                  <span className="text-sm font-bold block mb-2 text-slate-400">حصة الإيرادات (Revenue Share)</span>
                  <div className="text-6xl font-black flex items-baseline gap-2 text-white">
                    {plan.fee} <span className="text-sm font-bold text-slate-500">من التدفق الرقمي</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-bold text-slate-300">
                      <CheckCircle className={`w-5 h-5 text-${plan.color}-500 shrink-0 mt-0.5`} /> {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${plan.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
                  <ShieldCheck className="w-5 h-5" /> تفعيل الهوية
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
