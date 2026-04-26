'use client';
import React from 'react';
import { Cpu, Clock, CheckCircle, Loader2, AlertOctagon } from 'lucide-react';

export function RenderFarmMonitor() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4 bg-slate-900 text-white p-6 rounded-xl">
          <div className="p-4 bg-white/10 rounded-full"><Cpu size={32} /></div>
          <div>
             <h2 className="text-2xl font-bold">حالة المعالجة السحابية (Render Farm)</h2>
             <p className="text-slate-400">نستخدم 12 عقدة معالجة (Nodes) حالياً.</p>
          </div>
          <div className="mr-auto text-right">
             <div className="text-3xl font-mono font-bold text-emerald-400">98%</div>
             <div className="text-xs text-slate-400">كفاءة التشغيل</div>
          </div>
       </div>

       <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm text-right">
             <thead className="bg-muted text-muted-foreground font-bold">
                <tr>
                   <th className="p-4">المشروع</th>
                   <th className="p-4">الملف</th>
                   <th className="p-4">الصيغة</th>
                   <th className="p-4">الحالة</th>
                   <th className="p-4">الوقت المتبقي</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                <JobRow 
                   project="إعلان بيبسي" 
                   file="Final_Export_v3.mp4" 
                   format="4K H.264" 
                   status="processing" 
                   time="12 دقيقة" 
                   progress={45} 
                />
                <JobRow 
                   project="فيلم وثائقي" 
                   file="Master_ProRes.mov" 
                   format="ProRes 422" 
                   status="queued" 
                   time="في الانتظار" 
                />
                <JobRow 
                   project="سوشيال ميديا" 
                   file="Story_1.mp4" 
                   format="1080p" 
                   status="completed" 
                   time="تم" 
                />
             </tbody>
          </table>
       </div>
    </div>
  );
}

function JobRow({ project, file, format, status, time, progress }: any) {
    return (
        <tr className="group hover:bg-muted/20">
            <td className="p-4 font-bold">{project}</td>
            <td className="p-4 font-mono text-xs">{file}</td>
            <td className="p-4"><span className="bg-muted px-2 py-1 rounded text-xs">{format}</span></td>
            <td className="p-4">
               {status === 'processing' && (
                  <div className="w-32">
                     <div className="flex justify-between text-xs mb-1 text-blue-600 font-bold">
                        <span className="flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> معالجة</span>
                        <span>{progress}%</span>
                     </div>
                     <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                     </div>
                  </div>
               )}
               {status === 'queued' && <span className="text-yellow-600 text-xs font-bold flex items-center gap-1"><Clock size={12} /> في الطابور</span>}
               {status === 'completed' && <span className="text-emerald-600 text-xs font-bold flex items-center gap-1"><CheckCircle size={12} /> مكتمل</span>}
            </td>
            <td className="p-4 text-muted-foreground text-xs">{time}</td>
        </tr>
    )
}

################################################################################