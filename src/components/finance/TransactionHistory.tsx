'use client';
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Download, Search, Filter } from 'lucide-react';

export function TransactionHistory() {
  const transactions = [
    { id: 'TRX-9901', desc: 'دفعة مشروع "إعلان رمضان"', date: '15 Jan 2026', amount: '+$1,500.00', status: 'completed', type: 'in' },
    { id: 'TRX-9902', desc: 'شراء قالب "Cinematic LUTS"', date: '12 Jan 2026', amount: '-$25.00', status: 'completed', type: 'out' },
    { id: 'TRX-9903', desc: 'سحب رصيد إلى PayPal', date: '10 Jan 2026', amount: '-$500.00', status: 'processing', type: 'out' },
    { id: 'TRX-9904', desc: 'مكافأة إحالة (Referral)', date: '05 Jan 2026', amount: '+$20.00', status: 'completed', type: 'in' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       {/* Toolbar */}
       <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
          <h3 className="font-bold text-white">سجل المعاملات</h3>
          <div className="flex gap-2">
             <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث..." className="bg-black/30 border border-white/10 rounded-lg px-8 py-1.5 text-xs text-white outline-none w-40" />
             </div>
             <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white"><Filter size={16}/></button>
             <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white"><Download size={16}/></button>
          </div>
       </div>

       {/* Table */}
       <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
             <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                <tr>
                   <th className="p-4 text-right">المعاملة</th>
                   <th className="p-4 text-right">التاريخ</th>
                   <th className="p-4 text-right">المبلغ</th>
                   <th className="p-4 text-right">الحالة</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {transactions.map((trx) => (
                   <tr key={trx.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                         <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${trx.type === 'in' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                               {trx.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            </div>
                            <div>
                               <div className="font-bold text-white">{trx.desc}</div>
                               <div className="text-[10px] text-slate-500 font-mono">{trx.id}</div>
                            </div>
                         </div>
                      </td>
                      <td className="p-4 text-slate-400 text-right">{trx.date}</td>
                      <td className={`p-4 text-right font-bold ${trx.type === 'in' ? 'text-green-400' : 'text-white'}`}>
                         {trx.amount}
                      </td>
                      <td className="p-4 text-right">
                         <span className={`text-[10px] px-2 py-1 rounded border capitalize ${
                            trx.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                         }`}>
                            {trx.status}
                         </span>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

