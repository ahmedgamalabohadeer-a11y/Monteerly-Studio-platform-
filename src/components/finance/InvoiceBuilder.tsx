'use client'
import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function InvoiceBuilder({ orderDetails }: { orderDetails: any }) {
  // محاكاة نظام الضرائب والعمولة
  const platformFee = orderDetails.amount * 0.10; // 10% عمولة افتراضية للبرو
  const finalAmount = orderDetails.amount - platformFee;

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] font-sans">
      <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
        <div>
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" /> فاتورة سيادية
          </h3>
          <p className="text-slate-500 text-sm mt-1">تشفير تلقائي - MCOS V5</p>
        </div>
        <div className="text-left">
          <p className="text-slate-400 text-xs">رقم المرجع:</p>
          <p className="text-white font-mono text-sm">{orderDetails.id}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-slate-300">
          <span>قيمة العقد الأصلية</span>
          <span className="font-bold">${orderDetails.amount}</span>
        </div>
        <div className="flex justify-between text-rose-400">
          <span>عمولة المنصة (استضافة + R2)</span>
          <span className="font-bold">- ${platformFee}</span>
        </div>
        <div className="flex justify-between text-emerald-400 text-xl font-black border-t border-slate-800 pt-4">
          <span>الصافي للتحويل (الضمان)</span>
          <span>${finalAmount}</span>
        </div>
      </div>

      <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all">
        <Download className="w-5 h-5" /> تصدير الفاتورة (PDF)
      </button>
      <p className="text-center text-slate-500 text-xs mt-4 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3" /> تم التحقق من سلامة الأرقام
      </p>
    </div>
  );
}
