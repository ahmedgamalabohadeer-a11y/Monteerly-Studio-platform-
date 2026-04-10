'use client';
import React from 'react';
import { MoreHorizontal, Mail, Shield } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function AgencyTeamList() {
  const members = [
     { name: 'أحمد كمال', role: 'Owner', email: 'ahmed@agency.com', access: 'Full Access', status: 'active' },
     { name: 'سارة علي', role: 'Project Manager', email: 'sara@agency.com', access: 'Edit & Review', status: 'active' },
     { name: 'خالد عمر', role: 'Editor', email: 'khaled@agency.com', access: 'View Only', status: 'pending' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-white">أعضاء الفريق</h3>
          <button className="text-indigo-400 text-sm hover:text-indigo-300">+ إضافة عضو</button>
       </div>
       <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-slate-400 font-medium">
             <tr>
                <th className="p-4 text-right">العضو</th>
                <th className="p-4 text-right hidden md:table-cell">الصلاحية</th>
                <th className="p-4 text-right hidden sm:table-cell">الحالة</th>
                <th className="p-4"></th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {members.map((m, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                   <td className="p-4">
                      <div className="flex items-center gap-3">
                         <Avatar fallback={m.name[0]} size="sm" />
                         <div>
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-xs text-slate-500">{m.role} • {m.email}</div>
                         </div>
                      </div>
                   </td>
                   <td className="p-4 hidden md:table-cell text-slate-300">
                      <div className="flex items-center gap-2">
                         <Shield size={14} className="text-indigo-400" /> {m.access}
                      </div>
                   </td>
                   <td className="p-4 hidden sm:table-cell">
                      <span className={`px-2 py-1 rounded-full text-[10px] border ${m.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                         {m.status === 'active' ? 'نشط' : 'معلق'}
                      </span>
                   </td>
                   <td className="p-4 text-left">
                      <button className="p-2 text-slate-500 hover:text-white"><MoreHorizontal size={16} /></button>
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
}
