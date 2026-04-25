'use client';
import React from 'react';
import { FileText, Download, Eye, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LegalVault() {
  const docs = [
    { id: 'CNT-001', title: 'عقد مونتاج - شركة المستقبل', type: 'Service Agreement', date: 'Jan 15, 2026', status: 'signed' },
    { id: 'NDA-004', title: 'NDA - مشروع سري X', type: 'Non-Disclosure', date: 'Jan 10, 2026', status: 'pending' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-4 bg-slate-950 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Lock size={16} className="text-yellow-400" /> الخزنة (The Vault)
          </h3>
          <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-400">مشفرة بتشفير AES-256</span>
       </div>

       <div className="p-4 grid gap-4">
          {docs.map(doc => (
             <div key={doc.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === 'signed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                   }`}>
                      <FileText size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white text-sm">{doc.title}</h4>
                      <div className="text-xs text-slate-500 flex gap-2">
                         <span>{doc.id}</span>
                         <span>•</span>
                         <span>{doc.type}</span>
                         <span>•</span>
                         <span>{doc.date}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   {doc.status === 'signed' ? (
                      <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">موقع</span>
                   ) : (
                      <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20 flex items-center gap-1">
                         <Clock size={10} /> بانتظار الطرف الثاني
                      </span>
                   )}
                   
                   <div className="w-px h-6 bg-white/10 mx-1" />
                   
                   <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg" title="معاينة"><Eye size={16}/></button>
                   <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg" title="تحميل"><Download size={16}/></button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################