'use client';
import React from 'react';
import { Gift, Copy, Users, Trophy } from 'lucide-react';

export default function ReferralPage() {
  return (
    <div className="min-h-screen p-6 pb-24" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold font-cairo text-white mb-4">
          ادعُ أصدقاءك، <span className="text-brand-success">واربح المال!</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          لكل صديق تقوم بدعوته وينجز مشروعه الأول، ستحصل أنت على <span className="text-white font-bold">$50</span> وسيحصل هو على <span className="text-white font-bold">$20</span> رصيد مجاني.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Your Link Card */}
        <div className="bg-gradient-to-br from-purple-900 to-brand-dark p-8 rounded-2xl border border-purple-500/30 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">رابط الدعوة الخاص بك</h3>
            <div className="bg-black/50 border border-purple-500/50 rounded-xl p-4 flex items-center justify-between gap-4 mb-4">
              <code className="text-purple-300 font-mono text-sm">monteerly.com/r/ahmed-99</code>
              <button className="text-white hover:text-purple-400 transition-colors">
                <Copy size={20} />
              </button>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-colors">
              مشاركة عبر واتساب
            </button>
          </div>
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Stats Card */}
        <div className="bg-brand-surface p-8 rounded-2xl border border-gray-800">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> إحصائيات الأرباح
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="text-gray-400" />
                <span className="text-gray-300">الأصدقاء المسجلين</span>
              </div>
              <span className="font-bold text-2xl text-white">12</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-brand-success/20">
              <div className="flex items-center gap-3">
                <Gift className="text-brand-success" />
                <span className="text-gray-300">الأرباح المكتسبة</span>
              </div>
              <span className="font-bold text-2xl text-brand-success">$150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
