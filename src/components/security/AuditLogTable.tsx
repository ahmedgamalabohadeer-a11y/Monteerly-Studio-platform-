'use client';
import React from 'react';
import { Search, Filter, Download, ShieldAlert, ShieldCheck } from 'lucide-react';

export function AuditLogTable() {
  const logs = [
    { id: 'evt_1', actor: 'Sarah Ali', action: 'PROJECT_DELETE', resource: 'Ramadan_Ad_Final.mp4', ip: '192.168.1.1', location: 'Riyadh, SA', date: 'Just now', severity: 'high' },
    { id: 'evt_2', actor: 'Mohamed Kamal', action: 'MEMBER_INVITE', resource: 'Khaled Omar', ip: '10.0.0.5', location: 'Cairo, EG', date: '2 mins ago', severity: 'low' },
    { id: 'evt_3', actor: 'System', action: 'BACKUP_COMPLETE', resource: 'Daily Backup', ip: 'AWS-Lambda', location: 'Frankfurt, DE', date: '1 hour ago', severity: 'low' },
    { id: 'evt_4', actor: 'Unknown', action: 'LOGIN_FAILED', resource: 'Admin Panel', ip: '45.22.11.9', location: 'Moscow, RU', date: '3 hours ago', severity: 'critical' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       {/* Toolbar */}
       <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
          <h3 className="font-bold text-white flex items-center gap-2">
             <ShieldCheck size={18} className="text-green-400" /> سجل العمليات (Audit Trail)
          </h3>
          <div className="flex gap-2">
             <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث بالـ IP أو المستخدم..." className="bg-black/30 border border-white/10 rounded-lg px-8 py-1.5 text-xs text-white outline-none w-64" />
             </div>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 hover:text-white">
                <Download size={14} /> تصدير CSV
             </button>
          </div>
       </div>

       {/* Logs Table */}
       <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
             <thead className="bg-white/5 text-slate-400 uppercase font-mono">
                <tr>
                   <th className="p-4 text-right">المستخدم (Actor)</th>
                   <th className="p-4 text-right">الحدث (Action)</th>
                   <th className="p-4 text-right">المورد (Resource)</th>
                   <th className="p-4 text-right">المصدر (IP/Location)</th>
                   <th className="p-4 text-right">الوقت</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                   <tr key={log.id} className="hover:bg-white/5 transition-colors font-mono">
                      <td className="p-4 text-right font-bold text-white">{log.actor}</td>
                      <td className="p-4 text-right">
                         <span className={`px-2 py-1 rounded border ${
                            log.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            log.severity === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                         }`}>
                            {log.action}
                         </span>
                      </td>
                      <td className="p-4 text-right text-slate-300">{log.resource}</td>
                      <td className="p-4 text-right">
                         <div className="text-white">{log.ip}</div>
                         <div className="text-slate-500">{log.location}</div>
                      </td>
                      <td className="p-4 text-right text-slate-500">{log.date}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

