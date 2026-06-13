'use client'
import React from 'react';
import Image from 'next/image';
import { Video, Calendar, Star, Clock } from 'lucide-react';

export default function ConsultationsPage() {
  const experts = [
    { name: 'أحمد جمال', role: 'مخرج سينمائي', price: '$150/ساعة', img: '/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png' },
    { name: 'سارة محمد', role: 'خبيرة تأثيرات بصرية', price: '$100/ساعة', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200' }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center md:justify-start gap-3">
            <Video className="w-10 h-10 text-rose-500" /> الاستشارات السيادية
          </h1>
          <p className="text-slate-400 text-lg">احجز مكالمات فيديو مشفرة 1-on-1 مع قادة الصناعة ونخب الإنتاج الإعلامي.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((exp, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8 hover:border-rose-500/50 transition-all group relative">
              <div className="absolute top-0 right-0 w-full h-full bg-rose-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src={exp.img}
                  alt={`صورة ${exp.name}`}
                  fill
                  sizes="96px"
                  className="rounded-full object-cover border-4 border-white/5 shadow-xl"
                />
              </div>
              <h3 className="text-2xl font-black mb-1">{exp.name}</h3>
              <p className="text-rose-400 font-bold text-sm mb-4">{exp.role}</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-slate-400 text-sm"><Clock className="w-4 h-4"/> 60 دقيقة</div>
                <div className="flex items-center gap-1 text-amber-400 text-sm"><Star className="w-4 h-4 fill-amber-400"/> 5.0</div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-black">{exp.price}</span>
                <button className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> حجز جلسة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
