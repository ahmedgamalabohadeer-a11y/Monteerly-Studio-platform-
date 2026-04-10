'use client';
import React from 'react';
import { Eye, Briefcase, Star, TrendingUp, ArrowUpRight } from 'lucide-react';

export function CreatorAnalytics() {
  return (
    <div className="space-y-6">
       {/* Top Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-white/10 p-5 rounded-xl">
             <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-xs">زيارات البروفايل</span>
                <Eye size={16} className="text-indigo-400" />
             </div>
             <div className="text-2xl font-bold text-white">1,240</div>
             <div className="text-[10px] text-green-400 flex items-center mt-1"><ArrowUpRight size={10}/> +12% هذا الشهر</div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-5 rounded-xl">
             <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-xs">طلبات التوظيف</span>
                <Briefcase size={16} className="text-purple-400" />
             </div>
             <div className="text-2xl font-bold text-white">8</div>
             <div className="text-[10px] text-green-400 flex items-center mt-1"><ArrowUpRight size={10}/> 2 قيد التفاوض</div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-5 rounded-xl">
             <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-xs">معدل التقييم</span>
                <Star size={16} className="text-yellow-400" />
             </div>
             <div className="text-2xl font-bold text-white">4.9</div>
             <div className="text-[10px] text-slate-500 mt-1">بناءً على 45 مشروع</div>
          </div>
          <div className="bg-slate-900 border border-white/10 p-5 rounded-xl">
             <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-xs">معدل التحويل</span>
                <TrendingUp size={16} className="text-green-400" />
             </div>
             <div className="text-2xl font-bold text-white">3.2%</div>
             <div className="text-[10px] text-slate-500 mt-1">من زائر إلى عميل</div>
          </div>
       </div>

       {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earnings Chart */}
          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
             <h3 className="font-bold text-white mb-6 text-sm">الأرباح (آخر 6 أشهر)</h3>
             <div className="h-48 flex items-end justify-between gap-2 px-2">
                {[30, 45, 25, 60, 80, 65].map((h, i) => (
                   <div key={i} className="w-full flex flex-col justify-end group cursor-pointer">
                      <div 
                        className="bg-indigo-600/50 group-hover:bg-indigo-500 transition-all rounded-t-sm w-full relative" 
                        style={{ height: `${h}%` }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                            ${h * 100}
                         </div>
                      </div>
                      <div className="text-[10px] text-slate-500 text-center mt-2">M{i+1}</div>
                   </div>
                ))}
             </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
             <h3 className="font-bold text-white mb-6 text-sm">مصدر العملاء</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>بحث المنصة (Marketplace)</span>
                      <span>60%</span>
                   </div>
                   <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 w-[60%] h-full"/></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>رابط مباشر (Direct)</span>
                      <span>25%</span>
                   </div>
                   <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 w-[25%] h-full"/></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>إحالات (Referrals)</span>
                      <span>15%</span>
                   </div>
                   <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-green-500 w-[15%] h-full"/></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
