'use client';
import React from 'react';
import { CreditCard, Check, Download, Zap, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BillingSettings() {
  return (
    <div className="space-y-8">
       {/* Current Plan */}
       <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Zap size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="text-xl font-bold text-white">الخطة الاحترافية (Pro Plan)</h3>
                   <span className="bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">نشط</span>
                </div>
                <p className="text-indigo-200 text-sm mb-4">يتم التجديد في 15 فبراير 2026 • $19/شهرياً</p>
                <div className="flex gap-2 text-xs text-slate-300">
                   <span className="flex items-center gap-1"><Check size={12} className="text-green-400"/> مساحة 1TB</span>
                   <span className="flex items-center gap-1"><Check size={12} className="text-green-400"/> 4K Export</span>
                   <span className="flex items-center gap-1"><Check size={12} className="text-green-400"/> بدون علامة مائية</span>
                </div>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">إلغاء الاشتراك</Button>
                <Button className="bg-white text-indigo-900 font-bold hover:bg-slate-200">ترقية للخطة المؤسسية</Button>
             </div>
          </div>
       </div>

       {/* Payment Methods */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white">طرق الدفع المحفوظة</h3>
             <button className="text-xs text-indigo-400 hover:text-white flex items-center gap-1">
                <Plus size={14}/> إضافة بطاقة
             </button>
          </div>
          
          <div className="space-y-3">
             <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-4" alt="Mastercard" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-white">•••• •••• •••• 4242</div>
                      <div className="text-xs text-slate-500">تنتهي في 12/28</div>
                   </div>
                </div>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">الافتراضية</span>
             </div>

             <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl opacity-60">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[8px]">VISA</div>
                   <div>
                      <div className="text-sm font-bold text-white">•••• •••• •••• 8899</div>
                      <div className="text-xs text-slate-500">منتهية الصلاحية</div>
                   </div>
                </div>
                <div className="text-red-400 flex items-center gap-1 text-xs">
                   <AlertTriangle size={12} /> تحتاج تحديث
                </div>
             </div>
          </div>
       </div>

       {/* Billing History */}
       <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-slate-950">
             <h3 className="font-bold text-white">سجل الفواتير</h3>
          </div>
          <table className="w-full text-sm text-left">
             <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                <tr>
                   <th className="p-4 text-right">التاريخ</th>
                   <th className="p-4 text-right">المبلغ</th>
                   <th className="p-4 text-right">الحالة</th>
                   <th className="p-4 text-right">الفاتورة</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map((i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-right text-slate-300">Jan 15, 2026</td>
                      <td className="p-4 text-right font-bold text-white">$19.00</td>
                      <td className="p-4 text-right">
                         <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">مدفوع</span>
                      </td>
                      <td className="p-4 text-right">
                         <button className="text-slate-400 hover:text-white flex items-center gap-1 text-xs ml-auto">
                            <Download size={14} /> PDF
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

################################################################################