'use client';
import React from 'react';
import { Tag, Check, RefreshCw, FileVideo } from 'lucide-react';

export function AutoTagLog() {
  const tasks = [
    { file: 'Interview_Raw_CamA.mp4', status: 'Completed', tags: ['Interview', 'Indoor', 'Male', 'Suit', 'Talking'], confidence: 99 },
    { file: 'Drone_Shot_City.mov', status: 'Processing', tags: ['City', 'Night', 'Lights'], confidence: 85 },
    { file: 'B-Roll_Coffee.mp4', status: 'Queued', tags: [], confidence: 0 },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Tag className="text-yellow-400" /> المعالجة الذكية (Auto-Tagging Queue)
          </h3>
          <div className="text-xs text-slate-500">Processing 1 file...</div>
       </div>

       <div className="divide-y divide-white/5">
          {tasks.map((task, i) => (
             <div key={i} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-slate-800 rounded text-slate-400">
                      <FileVideo size={20} />
                   </div>
                   <div>
                      <div className="font-bold text-white text-sm mb-1">{task.file}</div>
                      <div className="flex flex-wrap gap-2">
                         {task.tags.length > 0 ? task.tags.map(t => (
                            <span key={t} className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">#{t}</span>
                         )) : (
                            <span className="text-[10px] text-slate-600 italic">Waiting for analysis...</span>
                         )}
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   {task.status === 'Completed' && (
                      <span className="text-xs font-bold text-green-400 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                         <Check size={12} /> Done ({task.confidence}%)
                      </span>
                   )}
                   {task.status === 'Processing' && (
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded">
                         <RefreshCw size={12} className="animate-spin" /> Processing
                      </span>
                   )}
                   {task.status === 'Queued' && (
                      <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">
                         Queued
                      </span>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

