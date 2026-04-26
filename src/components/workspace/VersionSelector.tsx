'use client';
import React, { useState } from 'react';
import { History, ChevronDown, CheckCircle, Clock } from 'lucide-react';
export function VersionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVersion, setActiveVersion] = useState(3);
  const versions = [
    { id: 3, label: 'v3 (Final Cut)', date: 'الآن', status: 'active', color: 'text-emerald-500' },
    { id: 2, label: 'v2 (Color Grade)', date: 'منذ 2 ساعة', status: 'pending', color: 'text-blue-500' },
    { id: 1, label: 'v1 (Rough Cut)', date: 'أمس', status: 'archived', color: 'text-slate-400' },
  ];
  const current = versions.find(v => v.id === activeVersion);
  return (
    <div className="relative z-50">
       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors"
       >
          <div className={`w-2 h-2 rounded-full ${current?.id === 3 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          <span className="font-bold font-mono">{current?.label}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
       </button>
       {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2">
             <div className="p-3 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                تاريخ النسخ
             </div>
             {versions.map((ver) => (
                <div 
                   key={ver.id}
                   onClick={() => { setActiveVersion(ver.id); setIsOpen(false); }}
                   className={`p-3 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors ${activeVersion === ver.id ? 'bg-slate-800/50' : ''}`}
                >
                   <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                         <div className={`text-xs font-bold ${ver.color}`}>V{ver.id}</div>
                         {activeVersion === ver.id && <div className="w-1 h-1 bg-white rounded-full" />}
                      </div>
                      <div>
                         <p className={`text-sm font-medium ${activeVersion === ver.id ? 'text-white' : 'text-slate-300'}`}>{ver.label}</p>
                         <div className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Clock size={10} /> {ver.date}
                         </div>
                      </div>
                   </div>
                   {activeVersion === ver.id && <CheckCircle size={16} className="text-emerald-500" />}
                </div>
             ))}
          </div>
       )}
    </div>
  );
}
