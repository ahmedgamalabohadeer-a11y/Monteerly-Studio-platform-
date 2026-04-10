'use client';
import React from 'react';
import { Activity, CheckCircle, Users, DollarSign } from 'lucide-react';

export function LiveTicker() {
  return (
    <div className="w-full bg-indigo-950/30 border-b border-indigo-500/20 backdrop-blur-sm overflow-hidden py-2.5 z-40 relative">
       <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs font-medium text-indigo-200">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> النظام يعمل بكفاءة 100%</span>
          <span className="flex items-center gap-2"><Users size={14} /> انضم <span className="text-white font-bold">12 مبدع</span> جديد في آخر ساعة</span>
          <span className="flex items-center gap-2"><CheckCircle size={14} /> تم تسليم مشروع <span className="text-white font-bold">#9021</span> بنجاح (الرياض)</span>
          <span className="flex items-center gap-2"><DollarSign size={14} /> إجمالي مدفوعات اليوم: <span className="text-white font-bold">$14,500</span></span>
          <span className="flex items-center gap-2"><Activity size={14} /> وقت الريندر الحالي: <span className="text-green-400 font-bold">0.4s</span> (Fast)</span>
          
          {/* تكرار للشريط لضمان استمرارية الحركة */}
          <span className="flex items-center gap-2 text-slate-500"> | </span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> النظام يعمل بكفاءة 100%</span>
          <span className="flex items-center gap-2"><Users size={14} /> انضم <span className="text-white font-bold">5 شركات</span> جديدة</span>
       </div>
       
       <style jsx>{`
         .animate-marquee { animation: marquee 30s linear infinite; }
         @keyframes marquee {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
       `}</style>
    </div>
  );
}
