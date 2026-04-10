'use client';
import React from 'react';
import { ChevronUp, MessageSquare, Clock } from 'lucide-react';

export function CommunityBoard() {
  const features = [
     { id: 1, title: 'وضع العمل بدون إنترنت (Offline Mode)', votes: 1420, status: 'In Progress', tag: 'Core' },
     { id: 2, title: 'إضافة مكتبة موسيقى عربية شرقية', votes: 890, status: 'Planned', tag: 'Assets' },
     { id: 3, title: 'دعم تصدير 8K للمشاريع الضخمة', votes: 540, status: 'Under Review', tag: 'Performance' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white text-lg">طلبات المجتمع (Roadmap)</h3>
          <button className="text-xs text-indigo-400 hover:text-white font-bold">عرض الكل</button>
       </div>

       <div className="space-y-4">
          {features.map((feat) => (
             <div key={feat.id} className="flex gap-4 p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-colors group">
                <button className="flex flex-col items-center justify-center bg-slate-800 w-12 h-12 rounded-lg border border-white/5 hover:border-indigo-500 hover:text-indigo-400 transition-all group-hover:scale-110">
                   <ChevronUp size={20} />
                   <span className="text-[10px] font-bold">{feat.votes}</span>
                </button>
                
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-sm">{feat.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                         feat.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                         feat.status === 'Planned' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                         'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                         {feat.status}
                      </span>
                   </div>
                   <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="bg-white/5 px-2 py-0.5 rounded">{feat.tag}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12}/> 24 تعليق</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> منذ يومين</span>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
