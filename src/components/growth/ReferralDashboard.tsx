'use client';
import React, { useState } from 'react';
import { Gift, Copy, Users, Trophy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function ReferralDashboard() {
  const { addToast } = useToast();
  const referralLink = 'https://monteer.ly/r/mohamed-k99';

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    addToast('success', 'تم نسخ رابط الدعوة!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Main Card */}
       <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Gift size={200} />
          </div>
          
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white mb-4 border border-white/20">
                <Trophy size={12} className="text-yellow-400" /> برنامج السفراء
             </div>
             <h2 className="text-3xl font-black text-white mb-4">ادعُ أصدقاءك، اربح مساحة تخزين</h2>
             <p className="text-indigo-200 mb-8 max-w-sm">
                احصل على <span className="text-white font-bold">10GB</span> إضافية لكل صديق يسجل، ويحصل صديقك على شهر مجاني من خطة Pro.
             </p>

             <div className="bg-black/30 border border-white/10 rounded-xl p-2 flex items-center gap-2 mb-6">
                <code className="flex-1 bg-transparent text-white px-3 font-mono text-sm truncate">
                   {referralLink}
                </code>
                <Button onClick={copyLink} className="bg-white text-black font-bold hover:bg-indigo-50">
                   <Copy size={16} className="mr-2" /> نسخ
                </Button>
             </div>

             <div className="flex gap-4 text-xs font-bold text-indigo-200">
                <span className="flex items-center gap-1"><Users size={14}/> 12 دعوة ناجحة</span>
                <span className="flex items-center gap-1"><Gift size={14}/> 120GB مكتسبة</span>
             </div>
          </div>
       </div>

       {/* Progress & Leaderboard */}
       <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">مستواك الحالي</h3>
             <div className="flex justify-between text-sm mb-2">
                <span className="text-white font-bold">سفير فضي</span>
                <span className="text-slate-400">12 / 20 دعوة</span>
             </div>
             <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-[60%]" />
             </div>
             <p className="text-xs text-slate-500">
                باقي 8 دعوات للوصول للمستوى الذهبي (تخزين غير محدود).
             </p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">آخر الدعوات</h3>
             <div className="space-y-4">
                {[
                   { name: 'خالد عمر', date: 'منذ ساعتين', status: 'completed' },
                   { name: 'سارة يوسف', date: 'أمس', status: 'pending' },
                   { name: 'Ali Ahmed', date: 'منذ يومين', status: 'completed' }
                ].map((inv, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                            {inv.name[0]}
                         </div>
                         <div>
                            <div className="text-sm font-bold text-white">{inv.name}</div>
                            <div className="text-[10px] text-slate-500">{inv.date}</div>
                         </div>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                         inv.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                         {inv.status === 'completed' ? 'سجل بنجاح' : 'معلق'}
                      </span>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

