'use client';
import React from 'react';
import { FileVideo, User, Calendar, MoreHorizontal } from 'lucide-react';

export function OrderPipeline() {
  const orders = [
    { id: 'ORD-8821', client: 'Netflix MENA', project: 'Stranger Things S5 (Ep 1-5)', items: 5, status: 'processing', due: '2 Days', assignee: 'Team A' },
    { id: 'ORD-8822', client: 'MBC Group', project: 'Ramadan Promo', items: 12, status: 'pending', due: '5 Days', assignee: 'Unassigned' },
    { id: 'ORD-8823', client: 'Red Bull', project: 'Event Highlights', items: 1, status: 'completed', due: 'Done', assignee: 'Team B' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       {/* Header */}
       <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <div className="flex gap-4 text-sm font-bold text-slate-400">
             <button className="text-white border-b-2 border-indigo-500 pb-4 -mb-4">قيد التنفيذ (4)</button>
             <button className="hover:text-white pb-4 -mb-4">بانتظار الموافقة (2)</button>
             <button className="hover:text-white pb-4 -mb-4">مكتمل (58)</button>
          </div>
          <div className="text-xs text-slate-500">
             Showing latest orders
          </div>
       </div>

       {/* Table */}
       <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-slate-400 text-xs uppercase">
             <tr>
                <th className="p-4 text-right">المشروع / العميل</th>
                <th className="p-4 text-center">عدد الملفات</th>
                <th className="p-4 text-center">الفريق المسؤول</th>
                <th className="p-4 text-center">الموعد النهائي</th>
                <th className="p-4 text-right">الحالة</th>
                <th className="p-4"></th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                   <td className="p-4 text-right">
                      <div className="font-bold text-white">{order.project}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                         <User size={10} /> {order.client}
                         <span className="text-slate-600">•</span>
                         <span className="font-mono">{order.id}</span>
                      </div>
                   </td>
                   <td className="p-4 text-center">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-white flex items-center justify-center gap-1 w-fit mx-auto">
                         <FileVideo size={10} /> {order.items}
                      </span>
                   </td>
                   <td className="p-4 text-center text-slate-300 text-xs">{order.assignee}</td>
                   <td className="p-4 text-center text-xs text-orange-400 font-bold">{order.due}</td>
                   <td className="p-4 text-right">
                      <span className={`text-[10px] px-2 py-1 rounded border capitalize ${
                         order.status === 'processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                         order.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                         'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                         {order.status}
                      </span>
                   </td>
                   <td className="p-4 text-right">
                      <button className="text-slate-500 hover:text-white"><MoreHorizontal size={16}/></button>
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
}

