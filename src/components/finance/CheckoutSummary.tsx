'use client';
import React from 'react';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CheckoutSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
       {/* Left: Payment Form */}
       <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-indigo-400" /> تفاصيل الدفع
             </h3>
             
             <div className="space-y-4">
                <div>
                   <label className="block text-xs text-slate-400 mb-1.5">الاسم على البطاقة</label>
                   <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="AHMED KAMAL" />
                </div>
                <div>
                   <label className="block text-xs text-slate-400 mb-1.5">رقم البطاقة</label>
                   <div className="relative">
                      <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none font-mono" placeholder="0000 0000 0000 0000" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                         <div className="w-8 h-5 bg-white/10 rounded"></div>
                         <div className="w-8 h-5 bg-white/10 rounded"></div>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs text-slate-400 mb-1.5">تاريخ الانتهاء</label>
                      <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none text-center" placeholder="MM/YY" />
                   </div>
                   <div>
                      <label className="block text-xs text-slate-400 mb-1.5">CVC</label>
                      <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none text-center" placeholder="123" />
                   </div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 bg-green-900/10 p-4 rounded-xl border border-green-900/20">
             <ShieldCheck size={16} className="text-green-500 shrink-0" />
             <p>مدفوعاتك مؤمنة بتشفير SSL 256-bit. لا نقوم بتخزين معلومات بطاقتك.</p>
          </div>
       </div>

       {/* Right: Order Summary */}
       <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">ملخص الطلب</h3>
             <div className="space-y-3 mb-6 border-b border-white/5 pb-6">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-300">خطة Monteerly Pro (سنوي)</span>
                   <span className="text-white font-bold">$180.00</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-300">ضريبة (VAT 15%)</span>
                   <span className="text-white font-bold">$27.00</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                   <span>خصم (WELCOME20)</span>
                   <span>-$36.00</span>
                </div>
             </div>
             <div className="flex justify-between items-end mb-6">
                <span className="text-slate-400 text-sm">الإجمالي</span>
                <span className="text-3xl font-bold text-white">$171.00</span>
             </div>
             <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 font-bold text-lg shadow-lg shadow-indigo-500/20">
                <Lock size={18} className="mr-2" /> إتمام الدفع
             </Button>
          </div>
       </div>
    </div>
  );
}

################################################################################