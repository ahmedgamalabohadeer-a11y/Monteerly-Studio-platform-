'use client';
import React from 'react';
import { Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function AiMatcher() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
       <div className="flex items-start justify-between">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-yellow-300" size={20} />
                <span className="font-bold text-sm uppercase tracking-wider text-purple-200">AI Matchmaker</span>
             </div>
             <h2 className="text-3xl font-bold mb-4">لا تضيع وقتك في البحث.</h2>
             <p className="text-purple-100 max-w-lg mb-6">
                خوارزمياتنا الذكية ستقوم بتحليل متطلبات مشروعك وترشيح أفضل 3 خبراء مناسبين لميزانيتك وأسلوبك فوراً.
             </p>
             <Button className="bg-white text-purple-700 hover:bg-purple-50 border-none">
                ابحث لي عن خبير الآن <ArrowRight size={16} className="ml-2" />
             </Button>
          </div>

          <div className="hidden md:block relative">
             <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20 w-64">
                <div className="text-xs text-purple-200 mb-3">أفضل تطابق (98%)</div>
                <div className="flex items-center gap-3">
                   <Avatar src="/images/expert1.jpg" fallback="AE" />
                   <div>
                      <div className="font-bold">أحمد السيد</div>
                      <div className="text-xs opacity-80">Motion Designer</div>
                   </div>
                   <UserCheck size={20} className="text-emerald-400 ml-auto" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################