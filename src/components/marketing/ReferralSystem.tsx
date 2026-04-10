'use client';
import React from 'react';
import { Gift, Copy, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ReferralSystem() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
       
       <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
             <Gift size={32} className="text-yellow-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">ادعُ صديقاً، واربحا معاً!</h2>
          <p className="text-indigo-200 mb-8">
             شارك رابط الدعوة الخاص بك. عندما يسجل صديقك ويشترك، ستحصل أنت على <span className="text-white font-bold">$20 رصيد</span> وسيحصل هو على <span className="text-white font-bold">شهر مجاني</span>.
          </p>
          
          <div className="bg-black/40 p-2 rounded-xl flex items-center gap-2 border border-white/10 mb-8 max-w-lg mx-auto">
             <code className="flex-1 text-left text-white font-mono px-4">monteerly.com/invite/ahmed_k</code>
             <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                <Copy size={16} className="mr-2" /> نسخ
             </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
             <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-indigo-300 uppercase">نقرات</div>
             </div>
             <div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-indigo-300 uppercase">مشتركين</div>
             </div>
             <div>
                <div className="text-2xl font-bold text-green-400">$60</div>
                <div className="text-xs text-indigo-300 uppercase">رصيد مكتسب</div>
             </div>
          </div>
       </div>
    </div>
  );
}
