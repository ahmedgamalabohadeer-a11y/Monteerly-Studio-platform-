'use client'
import React from 'react';
import { Check, Zap, ShieldCheck, Crown } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Rookie (أساسي)",
      price: "مجانًا",
      desc: "للمبدعين المستقلين الجدد",
      features: ["تخزين 5GB سحابي (Firebase)", "عمولة المنصة 15%", "أدوات الذكاء الاصطناعي الأساسية", "عقود ذكية قياسية"],
      icon: <Zap className="w-8 h-8 text-slate-400" />,
      color: "border-slate-800",
      btnClass: "bg-slate-800 hover:bg-slate-700 text-white"
    },
    {
      name: "Pro (المحترفين)",
      price: "$29",
      period: "/ شهرياً",
      desc: "للنخب وصناع المحتوى المتقدمين",
      features: ["تخزين 50GB سيادي (Backblaze)", "عمولة المنصة 10% فقط", "رندر سحابي (Cloudflare R2)", "تصحيح ألوان بالذكاء الاصطناعي", "دعم فني ذو أولوية"],
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
      color: "border-indigo-500 shadow-2xl shadow-indigo-500/20",
      btnClass: "bg-indigo-600 hover:bg-indigo-500 text-white",
      popular: true
    },
    {
      name: "Studio (المؤسسات)",
      price: "$99",
      period: "/ شهرياً",
      desc: "لشركات الإنتاج ووكالات الدعاية",
      features: ["تخزين لا محدود (موزع)", "عمولة المنصة 5% فقط", "واجهة White-label بشعارك", "إدارة فريق العمل (God-Mode)", "مدير حساب شخصي"],
      icon: <Crown className="w-8 h-8 text-emerald-400" />,
      color: "border-emerald-500/50",
      btnClass: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 border border-emerald-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20 pt-10">
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-l from-white to-slate-500 bg-clip-text text-transparent">استثمر في سيادتك الرقمية</h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">اختر الباقة التي تتناسب مع حجم إنتاجك. لا رسوم خفية، ولا احتكار. أنت تمتلك أصولك بالكامل.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-10 border relative flex flex-col ${plan.color}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
                  الأكثر اختياراً للنخب
                </div>
              )}
              <div className="mb-8">
                {plan.icon}
                <h3 className="text-2xl font-black mt-4">{plan.name}</h3>
                <p className="text-slate-400 text-sm mt-2">{plan.desc}</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.period && <span className="text-slate-500 font-bold">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ar/dashboard" className={`w-full py-4 rounded-xl text-center font-black transition-all ${plan.btnClass}`}>
                تفعيل الباقة
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
