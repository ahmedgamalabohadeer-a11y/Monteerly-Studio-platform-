'use client';
import React from 'react';
import { ShieldAlert, Download, Filter, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AuditLogViewer() {
  const logs = [
    { id: 'LOG-001', action: 'LOGIN_SUCCESS', user: 'أحمد كمال (Admin)', ip: '192.168.1.1', location: 'Riyadh, SA', time: 'Just now', risk: 'low' },
    { id: 'LOG-002', action: 'FILE_DOWNLOAD', user: 'سارة علي (Editor)', ip: '45.20.12.9', location: 'Cairo, EG', time: '2 mins ago', risk: 'medium' },
    { id: 'LOG-003', action: 'FAILED_LOGIN', user: 'Unknown', ip: '10.0.0.5', location: 'Moscow, RU', time: '1 hour ago', risk: 'high' },
    { id: 'LOG-004', action: 'PROJECT_DELETE', user: 'أحمد كمال (Admin)', ip: '192.168.1.1', location: 'Riyadh, SA', time: '3 hours ago', risk: 'critical' },
  ];

  const riskColor = (risk: string) => {
    switch(risk) {
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       {/* Toolbar */}
       <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2">
             <ShieldAlert size={20} className="text-indigo-400" />
             <h3 className="font-bold text-white">سجل النشاط الأمني</h3>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث بالاسم أو IP..." className="w-full bg-slate-900 border border-white/10 rounded-lg pr-8 pl-3 py-2 text-xs text-white focus:border-indigo-500 outline-none" />
             </div>
             <Button variant="outline" className="h-9 text-xs border-white/10 text-slate-300 gap-2"><Download size={14} /> CSV</Button>
          </div>
       </div>

       {/* Table */}
       <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
             <thead className="bg-white/5 text-slate-400 font-medium border-b border-white/5 uppercase tracking-wider">
                <tr>
                   <th className="p-4 text-right">الحدث</th>
                   <th className="p-4 text-right">المستخدم</th>
                   <th className="p-4 text-right">الموقع / IP</th>
                   <th className="p-4 text-right">الوقت</th>
                   <th className="p-4 text-center">المستوى</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                   <tr key={log.id} className="hover:bg-white/5 transition-colors font-mono">
                      <td className="p-4 font-bold text-white">{log.action}</td>
                      <td className="p-4 text-slate-300">{log.user}</td>
                      <td className="p-4 text-slate-400 flex items-center gap-2 justify-end">
                         <span>{log.ip}</span>
                         <span className="text-[10px] bg-white/5 px-1 rounded text-slate-500">{log.location}</span>
                      </td>
                      <td className="p-4 text-slate-400 text-right">{log.time}</td>
                      <td className="p-4 text-center">
                         <span className={`px-2 py-1 rounded border text-[10px] uppercase font-bold ${riskColor(log.risk)}`}>
                            {log.risk}
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

################################################################################