'use client';
import React from 'react';
import { MoreHorizontal, Shield, Plus } from 'lucide-react';

export function AgencyTeamList() {
  const members = [
     { name: 'أحمد كمال', role: 'Owner', email: 'ahmed@agency.com', access: 'Full Access', status: 'active' },
     { name: 'سارة علي', role: 'Project Manager', email: 'sara@agency.com', access: 'Edit & Review', status: 'active' },
     { name: 'خالد عمر', role: 'Editor', email: 'khaled@agency.com', access: 'View Only', status: 'pending' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
       <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <div>
             <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Shield className="text-indigo-400" size={20} /> صلاحيات الفريق (RBAC)
             </h3>
             <p className="text-sm text-slate-400 mt-1">إدارة أعضاء فريق الوكالة وتحديد مستويات الوصول لكل فرد.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Plus size={16} /> دعوة عضو جديد
          </button>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-slate-300">
             <thead className="text-xs text-slate-400 bg-slate-800/50 uppercase border-b border-slate-800">
                <tr>
                   <th className="px-6 py-4 font-bold">العضو</th>
                   <th className="px-6 py-4 font-bold">الدور</th>
                   <th className="px-6 py-4 font-bold">مستوى الوصول</th>
                   <th className="px-6 py-4 font-bold">الحالة</th>
                   <th className="px-6 py-4"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-800">
                {members.map((m, i) => (
                   <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                               {m.name.charAt(0)}
                            </div>
                            <div>
                               <p className="font-bold text-white">{m.name}</p>
                               <p className="text-xs text-slate-500">{m.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono">{m.role}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{m.access}</td>
                      <td className="px-6 py-4">
                         {m.status === 'active' ? 
                            <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded-full text-xs border border-green-500/20">نشط</span> : 
                            <span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full text-xs border border-amber-500/20">بانتظار القبول</span>
                         }
                      </td>
                      <td className="px-6 py-4 text-center">
                         <button className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-lg hover:bg-slate-700">
                            <MoreHorizontal size={16} />
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
