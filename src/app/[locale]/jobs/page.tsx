'use client'
import React, { useState } from 'react';
import { Briefcase, Search, PlusCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function JobsMarketplace() {
  const [jobs, setJobs] = useState([
    { id: 'job-1', title: 'مونتاج فيديو يوتيوب (وثائقي)', budget: 150, tags: ['Premiere', 'Documentary'], status: 'open' },
    { id: 'job-2', title: 'تصميم إعلان تيك توك متحرك', budget: 80, tags: ['After Effects', 'Social Media'], status: 'open' }
  ]);

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
          <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all">
            <PlusCircle className="w-5 h-5" /> نشر مشروع جديد
          </button>
        </header>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 mb-8 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
          <p className="text-sm text-slate-300">
            <strong className="text-amber-500">نظام الضمان النشط:</strong> أي عرض يتم قبوله هنا سيقوم باقتطاع المبلغ من العميل وتخزينه في الخزنة المشفرة. لن يحصل المونتير على الأموال إلا بعد تسليم الملفات.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center hover:border-emerald-500/50 transition-all">
              <div>
                <h3 className="text-xl font-black text-white mb-2">{job.title}</h3>
                <div className="flex gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <div className="text-left">
                  <span className="block text-xs text-slate-500">الميزانية المرصودة</span>
                  <span className="text-2xl font-black text-emerald-400">${job.budget}</span>
                </div>
                <button className="bg-white text-slate-900 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-xl font-black transition-all">
                  تقديم عرض
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
