'use client';
import React from 'react';
import { MessageSquare, Clock, Check, Play } from 'lucide-react';

export function AdobePanel() {
  const comments = [
    { time: '00:01:20:05', author: 'Sarah', text: 'القصة هنا بطيئة قليلاً، هل يمكن تسريعها؟' },
    { time: '00:02:15:12', author: 'Ahmed', text: 'اللون الأزرق في الخلفية مشبع جداً.' },
    { time: '00:03:40:00', author: 'Khaled', text: 'ممتاز! هذا المقطع تم اعتماده.' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-[#262626] border border-[#3d3d3d] rounded-sm text-[#cccccc] font-sans text-xs shadow-2xl overflow-hidden">
       {/* Adobe Panel Header */}
       <div className="bg-[#383838] px-3 py-1 border-b border-[#1f1f1f] flex justify-between items-center select-none">
          <span className="font-bold text-[10px] text-[#eeeeee]">Monteerly Panel</span>
          <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-[#505050]" />
             <div className="w-2 h-2 rounded-full bg-[#505050]" />
          </div>
       </div>

       {/* Panel Content */}
       <div className="p-3">
          <div className="flex items-center justify-between mb-3 bg-[#333] p-2 rounded">
             <span className="font-bold text-white">Ramadan_Ad_v3</span>
             <span className="text-green-400 text-[9px] uppercase border border-green-500/30 px-1 rounded">Active</span>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
             {comments.map((c, i) => (
                <div key={i} className="bg-[#333] hover:bg-[#444] p-2 rounded border-l-2 border-indigo-500 cursor-pointer group transition-colors">
                   <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1 text-indigo-400 font-mono font-bold">
                         <Clock size={10} /> {c.time}
                      </div>
                      <span className="text-[9px] text-[#888]">{c.author}</span>
                   </div>
                   <p className="text-[#ddd] leading-tight mb-2">{c.text}</p>
                   <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="bg-[#222] hover:bg-indigo-600 text-white px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
                         <Play size={8} /> Jump to
                      </button>
                      <button className="bg-[#222] hover:bg-green-600 text-white px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
                         <Check size={8} /> Resolve
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#3d3d3d]">
             <button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-2 rounded font-bold transition-colors">
                Upload New Version
             </button>
          </div>
       </div>
    </div>
  );
}
