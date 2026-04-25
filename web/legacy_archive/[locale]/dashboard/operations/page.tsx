'use client';
import React from 'react';
import { ShieldAlert, Briefcase, FileText } from 'lucide-react';

// استدعاء المكونات التي قمنا بدمجها مسبقاً
import { AiMorningBrief } from '@/components/dashboard/AiMorningBrief';
import { KanbanBoard } from '@/components/dashboard/KanbanBoard';
import { InvoiceBuilder } from '@/components/admin/InvoiceBuilder';
import { DigitalSigner } from '@/components/contracts/DigitalSigner';

export default function OperationsDashboard() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      
      {/* رأس الصفحة - Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="text-indigo-500" size={32} />
            مركز العمليات الموحد (OS)
          </h1>
          <p className="text-slate-400 mt-2 text-sm">لوحة التحكم العليا لإدارة العمليات، المالية، والعقود.</p>
        </div>
      </div>

      {/* المكون الأول: الملخص الإداري (Ai Brief) */}
      <section>
        <AiMorningBrief />
      </section>

      {/* المكون الثاني: العمليات الجارية (Kanban) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="text-indigo-400" />
          <h2 className="text-xl font-bold text-white">العمليات التشغيلية (Live Operations)</h2>
        </div>
        {/* Kanban Board Container */}
        <div className="overflow-x-auto pb-4">
           <KanbanBoard />
        </div>
      </section>

      {/* المكونات الإدارية (المالية والقانونية) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* العمود المالي */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-green-400" />
            <h2 className="text-xl font-bold text-white">إصدار الفواتير (Billing)</h2>
          </div>
          <InvoiceBuilder />
        </div>

        {/* العمود القانوني */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="text-amber-400" />
            <h2 className="text-xl font-bold text-white">الاعتماد القانوني (Contracts)</h2>
          </div>
          <DigitalSigner onSign={(sig) => console.log('تم توقيع العقد بواسطة:', sig)} />
        </div>

      </section>
    </div>
  );
}
