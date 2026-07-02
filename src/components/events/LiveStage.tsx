'use client';

import React from 'react';
import Image from 'next/image';
import { Users, MessageSquare, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function LiveStage() {
  const upcoming = [
    { title: 'ورشة تصحيح الألوان مع DaVinci', date: 'غداً, 8:00 PM', speaker: 'محمد كمال' },
    { title: 'كيف تسعر خدماتك كمستقل؟', date: 'الخميس, 6:00 PM', speaker: 'سارة علي' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      <div className="lg:col-span-2 flex flex-col">
        <div className="bg-black border border-white/10 rounded-xl overflow-hidden relative flex-1 mb-4">
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold animate-pulse flex items-center gap-2 z-10">
            <span className="w-2 h-2 bg-white rounded-full" /> LIVE
          </div>
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-2 z-10">
            <Users size={14} /> 1,240 مشاهد
          </div>

          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-4 border-4 border-slate-800 overflow-hidden relative">
                <Image
                  src="/avatars/mohamed.jpg"
                  alt="صورة المتحدث محمد كمال"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">ماستر كلاس: صناعة الوثائقيات</h2>
              <p className="text-slate-400">مع المخرج العالمي: ديفيد أتينبارو (محاكاة)</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white">Masterclass: Documentary Filmmaking</h3>
            <p className="text-xs text-slate-400">بدأ البث منذ 15 دقيقة</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-2">
              <Heart size={16} /> إعجاب
            </Button>
            <Button className="bg-indigo-600 text-white gap-2">مشاركة</Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/10 bg-slate-950 font-bold text-white text-sm">
            المحادثة المباشرة
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-2 items-start">
                <Avatar size="xs" fallback={`U${i}`} />
                <div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-xs font-bold text-slate-300">User {i}</span>
                    <span className="text-[10px] text-slate-600">10:3{i}</span>
                  </div>
                  <p className="text-xs text-white">هل سيتم حفظ البث للمشاهدة لاحقاً؟</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-slate-950 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب تعليقاً..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button className="p-2 bg-indigo-600 rounded-lg text-white">
                <MessageSquare size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
          <h4 className="font-bold text-white text-sm mb-3">القادم قريباً</h4>
          <div className="space-y-3">
            {upcoming.map((evt, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-black rounded-lg flex flex-col items-center justify-center border border-white/10">
                  <Calendar size={14} className="text-indigo-400 mb-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-xs truncate">{evt.title}</div>
                  <div className="text-[10px] text-slate-500">
                    {evt.speaker} • {evt.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
