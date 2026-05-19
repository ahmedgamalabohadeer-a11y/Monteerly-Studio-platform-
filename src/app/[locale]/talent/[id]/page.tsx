'use client'
import React from 'react';
import { Star, ShieldCheck, MapPin, PlayCircle, Award, CheckCircle2 } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function TalentProfile({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 font-sans pt-20 pb-20" dir="rtl">
      
      {/* الغلاف البصري */}
      <div className="h-64 md:h-80 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/40 to-transparent z-10"></div>
        <img src={MCOS_ASSETS.workspace.timeline.src} className="w-full h-full object-cover opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-20 -mt-24 md:-mt-32">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
          <img src={MCOS_ASSETS.market.arabEditor.src} className="w-40 h-40 rounded-[2rem] object-cover border-4 border-[#05050A] shadow-2xl" />
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-4xl font-black text-white">أحمد جمال</h1>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
            <p className="text-indigo-400 font-bold text-lg mb-2">مخرج سينمائي ومونتير سيادي</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> القاهرة، مصر</span>
              <span className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> 5.0 (124 تقييم)</span>
              <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-4 h-4" /> هوية موثقة 100%</span>
            </div>
          </div>
          <div className="w-full md:w-auto mt-6 md:mt-0">
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] text-lg">
              تأسيس عقد مشفر
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-xl font-black mb-4">نبذة عن المبدع</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                متخصص في صناعة المحتوى البصري الفاخر. أمتلك خبرة 7 سنوات في التلوين السينمائي، المؤثرات البصرية، وإخراج الإعلانات التجارية. التزم بالتسليم في الموعد وأعمل حصرياً عبر نظام الضمان المالي (Escrow) الخاص بـ Monteerly.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-black mb-6">قبو الأعمال (Portfolio)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[MCOS_ASSETS.heritageAndLibrary.cityDrone.src, MCOS_ASSETS.heritageAndLibrary.saudiTraditional.src, MCOS_ASSETS.workspace.dualScreen.src, MCOS_ASSETS.techAndAi.advisor.src].map((img, i) => (
                  <div key={i} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-white/5">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-black mb-6">إحصائيات النظام</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm">المشاريع المنجزة</span>
                  <span className="font-black text-white">243</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm">معدل التسليم بالوقت</span>
                  <span className="font-black text-emerald-400">99.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">مستوى التلعيب</span>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Award className="w-3 h-3"/> Top Rated</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-black mb-4">الترسانة والمهارات</h3>
              <div className="flex flex-wrap gap-2">
                {['DaVinci Resolve', 'Adobe Premiere', 'After Effects', 'Color Grading', 'VFX', 'Cinematography'].map((skill, i) => (
                  <span key={i} className="bg-[#12121A] border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
