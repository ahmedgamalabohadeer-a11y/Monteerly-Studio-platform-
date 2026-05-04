import React from 'react';
import { CreateJobForm } from '@/components/forms/CreateJobForm';
import { ShieldCheck } from 'lucide-react';

export default function NewJobPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto pt-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20 mb-4">
            <ShieldCheck className="w-4 h-4" />
            نظام دفع مؤمن عبر Monteerly Escrow
          </div>
          <h1 className="text-4xl font-black mb-4">ابدأ مشروعك الاحترافي</h1>
          <p className="text-slate-400">بمجرد إنشاء المشروع، سيتم توليد عقد قانوني وحجز الميزانية في نظام الضمان لضمان حقوقك.</p>
        </header>

        <CreateJobForm />
      </div>
    </main>
  );
}
