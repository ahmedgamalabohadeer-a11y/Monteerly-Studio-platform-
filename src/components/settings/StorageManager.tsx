'use client';

import React from 'react';
import { Archive, Cloud, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StorageManager() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Cloud size={20} className="text-blue-400" />
            مساحة التخزين
          </h3>
          <span className="text-sm text-slate-400">75GB / 100GB مستخدمة</span>
        </div>

        <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden mb-2 flex">
          <div className="h-full bg-indigo-500 w-[60%]" title="Active Projects" />
          <div className="h-full bg-blue-500 w-[15%]" title="Archived" />
          <div className="h-full bg-slate-700 w-[25%]" title="Free" />
        </div>

        <div className="flex gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            مشاريع نشطة (Hot)
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            أرشيف (Cold)
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            فارغ
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
        <h3 className="font-bold text-white mb-4">
          تحسين التخزين (Smart Optimization)
        </h3>

        <p className="text-sm text-slate-400 mb-6">
          نقل المشاريع القديمة إلى الأرشيف البارد (Cold Storage) يوفر لك مساحة ويقلل
          التكلفة. استعادة المشاريع المؤرشفة تستغرق 2-4 ساعات.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <Archive size={20} className="text-blue-400" />
              <div>
                <div className="text-white font-bold text-sm">
                  مشروع &ldquo;إعلان العيد 2024&rdquo;
                </div>
                <div className="text-xs text-slate-500">
                  آخر نشاط: منذ 8 أشهر • 45GB
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
            >
              أرشفة الآن (توفير 45GB)
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-red-400" />
              <div>
                <div className="text-white font-bold text-sm">
                  ملفات Render المؤقتة
                </div>
                <div className="text-xs text-slate-500">
                  يمكن إعادة توليدها • 12GB
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="text-red-400 border-red-500/20 hover:bg-red-500/10"
            >
              حذف نهائي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
