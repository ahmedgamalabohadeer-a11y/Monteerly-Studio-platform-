'use client'
import React from 'react';
import { Star, MapPin, CheckCircle, Trophy, PlayCircle } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function TalentProfile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* هيدر البروفايل */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 mb-8 relative overflow-hidden">
          <img src={MCOS_ASSETS.roles.editorCard} className="absolute inset-0 w-full h-48 object-cover opacity-20" />
          <div className="relative z-10 pt-20 flex flex-col md:flex-row items-end gap-6">
            <div className="w-32 h-32 bg-slate-800 rounded-2xl border-4 border-slate-950 shrink-0 overflow-hidden">
               <img src={MCOS_ASSETS.testimonials.user2} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-black text-white flex items-center gap-2">أحمد المبدع <CheckCircle className="w-6 h-6 text-emerald-500" /></h1>
              <p className="text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> القاهرة، مصر • متخصص في المونتاج السينمائي</p>
            </div>
            <div className="pb-2">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-black w-full">وظفني الآن (Escrow)</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* الجانب الأيمن (معلومات) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500"/> إحصائيات النخبة</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between"><span>مشاريع مكتملة</span><span className="font-bold text-white">42</span></div>
                <div className="flex justify-between"><span>ساعات العمل (R2)</span><span className="font-bold text-white">120h</span></div>
                <div className="flex justify-between"><span>التقييم</span><span className="font-bold text-amber-400 flex items-center gap-1">4.9 <Star className="w-3 h-3 fill-amber-400"/></span></div>
              </div>
            </div>
          </div>
          
          {/* الجانب الأيسر (معرض الأعمال) */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black mb-6">سابقة الأعمال (Portfolio)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-slate-800 rounded-xl aspect-video relative group overflow-hidden cursor-pointer">
                  <img src={MCOS_ASSETS.library.rawVideoCover} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
