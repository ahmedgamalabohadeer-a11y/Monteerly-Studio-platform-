'use client';
import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WalletOverview() {
  return (
    <div className="space-y-6">
       {/* Balance Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-500/30 p-6 rounded-2xl relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-indigo-200 text-sm mb-1">الرصيد القابل للسحب</p>
                <h2 className="text-4xl font-bold text-white mb-6">$2,450.00</h2>
                <div className="flex gap-2">
                   <Button size="sm" className="bg-white text-indigo-900 hover:bg-slate-200 font-bold">سحب الرصيد</Button>
                   <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">إيداع</Button>
                </div>
             </div>
             <Wallet className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
          </div>

          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
             <p className="text-slate-400 text-sm mb-1">قيد الانتظار (Escrow)</p>
             <h2 className="text-3xl font-bold text-white mb-2">$850.00</h2>
             <p className="text-xs text-slate-500">سيتاح خلال 7 أيام</p>
          </div>

          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
             <p className="text-slate-400 text-sm mb-1">إجمالي الأرباح</p>
             <h2 className="text-3xl font-bold text-green-400 mb-2">$15,200</h2>
             <p className="text-xs text-slate-500">+12% عن الشهر الماضي</p>
          </div>
       </div>

       {/* Transactions */}
       <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
             <h3 className="font-bold text-white">سجل المعاملات</h3>
             <Button variant="outline" size="sm" className="text-xs gap-2 border-white/10 text-slate-300"><Download size={14}/> كشف حساب</Button>
          </div>
          <div className="divide-y divide-white/5">
             {[
                { type: 'in', title: 'دفعة مشروع: إعلان نون', date: 'اليوم, 10:30 ص', amount: '+$450.00' },
                { type: 'out', title: 'سحب إلى PayPal', date: 'أمس, 04:15 م', amount: '-$1,200.00' },
                { type: 'in', title: 'دفعة مشروع: فيديو يوتيوب', date: '12 يناير, 09:00 ص', amount: '+$150.00' },
             ].map((tx, i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                         {tx.type === 'in' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                         <div className="font-bold text-white text-sm">{tx.title}</div>
                         <div className="text-xs text-slate-500">{tx.date}</div>
                      </div>
                   </div>
                   <div className={`font-mono font-bold ${tx.type === 'in' ? 'text-green-400' : 'text-white'}`}>
                      {tx.amount}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
