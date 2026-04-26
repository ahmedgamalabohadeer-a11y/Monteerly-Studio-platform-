'use client';
import React from 'react';
import { Library, FolderPlus, Search, Filter } from 'lucide-react';
import { GlobalAssetLibrary } from '@/components/dashboard/GlobalAssetLibrary';

export default function LibraryPage() {
  return (
    <div className="space-y-6 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Library className="text-indigo-400" size={32} />
            مكتبة الأصول الرقمية
          </h1>
          <p className="text-slate-400 mt-1 text-sm">إدارة الفيديوهات، اللقطات الخام، والمؤثرات الصوتية للمشاريع.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
          <FolderPlus size={18} /> رفع أصول جديدة
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
         <GlobalAssetLibrary />
      </div>
    </div>
  );
}
