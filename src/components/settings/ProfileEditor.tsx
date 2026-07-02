'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Save, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProfileEditor() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <Camera className="text-white" />
          </div>
        </div>
        <div className="absolute -bottom-12 right-8 flex items-end">
          <div className="w-24 h-24 bg-black rounded-2xl p-1 relative group cursor-pointer">
            <Image
              src="/avatars/mohamed.jpg"
              alt="الصورة الشخصية لمحمد كمال"
              fill
              sizes="96px"
              className="rounded-xl object-cover"
            />
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">المعلومات الأساسية</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">الاسم الأول</label>
                <input
                  type="text"
                  defaultValue="محمد"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">اسم العائلة</label>
                <input
                  type="text"
                  defaultValue="كمال"
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-1">المسمى الوظيفي</label>
              <input
                type="text"
                defaultValue="Senior Video Editor"
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">النبذة التعريفية (Bio)</label>
              <textarea
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none h-24 resize-none"
                defaultValue="محرر فيديو شغوف بخبرة 7 سنوات..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8">
              <Save size={16} className="mr-2" /> حفظ التغييرات
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">التواجد الرقمي</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                <MapPin size={16} className="text-slate-500" />
                <input
                  type="text"
                  defaultValue="القاهرة، مصر"
                  className="bg-transparent text-sm text-white outline-none w-full"
                />
              </div>
              <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                <Globe size={16} className="text-slate-500" />
                <input
                  type="text"
                  defaultValue="behance.net/mohamed"
                  className="bg-transparent text-sm text-white outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
