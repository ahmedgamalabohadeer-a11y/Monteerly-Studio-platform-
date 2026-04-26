'use client';
import React from 'react';
import { Wand2, Users, Radio, ShieldCheck, Zap, MonitorPlay } from 'lucide-react';

export function StrategicFeatures() {
  const features = [
    {
      icon: <Wand2 className="text-purple-400" />, 
      title: "الذكاء الاصطناعي", 
      desc: "مطابقة تلقائية للمواهب وتلخيص للمهام اليومية."
    },
    {
      icon: <MonitorPlay className="text-blue-400" />, 
      title: "مساحة عمل 2.0", 
      desc: "مقارنة النسخ، دعم VR، وتصدير مباشر لبرامج المونتاج."
    },
    {
      icon: <Radio className="text-red-400" />, 
      title: "بث مباشر", 
      desc: "غرف مراجعة حية مع العملاء بتقنية Low Latency."
    },
    {
      icon: <Users className="text-emerald-400" />, 
      title: "إدارة الوكالات", 
      desc: "لوحات تحكم مخصصة للفرق، المحاسبين، والمديرين."
    },
    {
      icon: <ShieldCheck className="text-yellow-400" />, 
      title: "أمان متقدم", 
      desc: "حماية الملفات، أرشيف مشفر، وتتبع الدفعات."
    },
    {
      icon: <Zap className="text-orange-400" />, 
      title: "سرعة فائقة", 
      desc: "أداء محسن وتجربة مستخدم سلسة على الويب والجوال."
    }
  ];

  return (
    <section className="py-24 bg-slate-900/50 border-t border-white/5">
       <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">كل ما تحتاجه في منصة واحدة</h2>
             <p className="text-slate-400">بناءً على أحدث تقنيات الويب والذكاء الاصطناعي</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {features.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group">
                   <div className="w-12 h-12 rounded-lg bg-black/50 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

