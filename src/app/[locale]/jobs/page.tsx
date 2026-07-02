'use client'
import React, { useState } from 'react';
import { Briefcase, PlusCircle } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

export default function JobsMarketplace() {
  const [jobs] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-emerald-500" /> سوق العمل السيادي
            </h1>
            <p className="text-slate-400">نظام حماية مالي (Escrow) يضمن حقوق الطرفين.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-black flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> نشر مشروع جديد
          </button>
        </header>

        {jobs.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-12 h-12" />}
            title="لا توجد مشاريع متاحة حالياً"
            description="يبدو أن جميع المشاريع قد تم اقتناصها من قبل المبدعين. كن مستعداً للمشاريع القادمة أو قم بنشر مشروعك الخاص الآن."
            actionText="نشر مشروع جديد"
            actionLink="#"
          />
        ) : (
          <div className="space-y-4">
            {/* الأكواد السابقة لعرض المشاريع توضع هنا */}
          </div>
        )}
      </div>
    </div>
  );
}
