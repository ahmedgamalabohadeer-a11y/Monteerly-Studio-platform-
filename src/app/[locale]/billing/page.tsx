'use client'
import React from 'react';
import { CreditCard, FileText, Download, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-emerald-500" /> المركز المالي والضريبي
          </h1>
          <p className="text-slate-400">إدارة الباقات، بوابات الدفع، وإصدار الفواتير الرسمية.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-indigo-900/20 to-[#0A0A0F] border border-indigo-500/20 rounded-[2rem] p-8">
            <div className="inline-block bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-4">الباقة الحالية</div>
            <h2 className="text-3xl font-black text-white mb-2">تدفق الاحتراف (Pro)</h2>
            <p className="text-slate-400 text-sm mb-6">مفعلة وتتجدد تلقائياً.</p>
            <button className="bg-[#12121A] border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl text-sm font-bold w-full transition-all">ترقية للسيادة المطلقة</button>
          </div>

          <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> بوابات الدفع المشفرة</h3>
            <div className="bg-[#12121A] border border-white/10 p-4 rounded-xl flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                <span className="font-mono text-sm">**** **** **** 4242</span>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">الأساسية</span>
            </div>
            <button className="text-indigo-400 text-sm font-bold">+ ربط بطاقة ائتمانية جديدة</button>
          </div>
        </div>

        <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-[#12121A]"><h3 className="font-bold">سجل الفواتير الضريبية</h3></div>
          <div className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors border-b border-white/5">
            <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-slate-500"/><div><p className="font-bold">فاتورة شحن محفظة</p><p className="text-xs text-slate-500">1 مايو 2026</p></div></div>
            <button className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 transition-colors"><Download className="w-4 h-4 text-white"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
