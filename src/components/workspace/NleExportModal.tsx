'use client';
import React from 'react';
import { FileCode, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NleExportModal() {
  const formats = [
    { name: 'Adobe Premiere (.xml)', icon: 'Pr', bg: 'bg-[#9999FF] text-[#00005B]', desc: 'Final Cut Pro XML' },
    { name: 'DaVinci Resolve (.edl)', icon: 'Dv', bg: 'bg-[#FF8A65] text-[#3E2723]', desc: 'Edit Decision List' },
    { name: 'Final Cut Pro X (.fcpxml)', icon: 'Fc', bg: 'bg-[#F06292] text-[#880E4F]', desc: 'FCPXML v1.9' },
    { name: 'Avid Media Composer (.aaf)', icon: 'Av', bg: 'bg-[#BA68C8] text-[#4A148C]', desc: 'Advanced Authoring' },
  ];

  return (
    <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg"><FileCode size={24} /></div>
          <div><h3 className="font-bold text-lg text-white">تصدير للمونتاج (NLE Export)</h3><p className="text-slate-400 text-xs">تحميل العلامات (Markers) لبرنامجك.</p></div>
       </div>
       <div className="space-y-3 mb-8">
          {formats.map((fmt) => (
             <button key={fmt.name} className="w-full flex items-center gap-4 p-3 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all group text-left">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold font-serif shadow-lg ${fmt.bg}`}>{fmt.icon}</div>
                <div className="flex-1"><div className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">{fmt.name}</div><div className="text-[10px] text-slate-500">{fmt.desc}</div></div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-indigo-600 rounded-lg text-white"><Download size={16} /></div>
             </button>
          ))}
       </div>
       <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 mb-6">
          <AlertCircle className="text-yellow-500 shrink-0" size={18} />
          <p className="text-xs text-yellow-200/80 leading-relaxed">تأكد من مطابقة أسماء الملفات لضمان عمل Link Media.</p>
       </div>
       <div className="flex gap-3"><Button className="flex-1 bg-white/10 hover:bg-white/20">إلغاء</Button><Button className="flex-1" variant="primary">تصدير</Button></div>
    </div>
  );
}

################################################################################