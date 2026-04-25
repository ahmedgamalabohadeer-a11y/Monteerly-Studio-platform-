'use client';
import React from 'react';
import { Gavel, ShieldAlert, Scale, FileCheck, AlertCircle } from 'lucide-react';
import { DisputeCenter } from '@/components/legal/DisputeCenter';
import { ArbitrationConsole } from '@/components/admin/ArbitrationConsole';
import { DisputeWizard } from '@/components/legal/DisputeWizard';

export default function DisputesPage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      
      {/* Header - الرأس القانوني */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gavel className="text-red-500" size={32} />
            مركز النزاعات والتحكيم الرقمي
          </h1>
          <p className="text-slate-400 mt-2 text-sm">منصة الفصل في الخلافات التعاقدية وضمان الحقوق المالية للأطراف.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle size={14} /> 3 قضايا قيد الانتظار
          </div>
        </div>
      </div>

      {/* لوحة التحكم الرئيسية للنزاعات */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* العمود الرئيسي: القضايا والتحكيم */}
        <div className="xl:col-span-2 space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-950/50">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="text-indigo-400" /> لوحة التحكيم الإداري
               </h2>
            </div>
            <div className="p-6">
               <ArbitrationConsole />
            </div>
          </section>

          <section>
             <DisputeCenter />
          </section>
        </div>

        {/* العمود الجانبي: تقديم بلاغ جديد ومعايير الامتثال */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <FileCheck size={18} className="text-green-400" /> تقديم طلب تحكيم
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
               يمكنك بدء إجراءات النزاع إذا لم يتم الالتزام بالبنود التعاقدية. سيقوم النظام بتجميد المبالغ المعلقة تلقائياً.
            </p>
            <DisputeWizard />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-amber-400" /> تنبيهات الامتثال
             </h3>
             <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded-lg border-r-4 border-amber-500">
                   <p className="text-xs text-slate-300 font-bold">تأخر في التسليم</p>
                   <p className="text-[10px] text-slate-500 mt-1">المشروع #MNT-99 تجاوز الموعد بـ 48 ساعة.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border-r-4 border-blue-500">
                   <p className="text-xs text-slate-300 font-bold">طلب مراجعة عقد</p>
                   <p className="text-[10px] text-slate-500 mt-1">تلقيت طلب مراجعة قانونية من شريك خارجي.</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
