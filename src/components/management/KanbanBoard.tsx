'use client';
import React, { useState } from 'react';
import { MoreHorizontal, Plus, User } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  assignee: string;
  tag: string;
  color: string;
}

export function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: {
      title: 'قائمة المهام (To Do)',
      items: [
        { id: '1', title: 'اختيار الموسيقى الخلفية', assignee: 'سارة', tag: 'Audio', color: 'bg-pink-500' },
        { id: '2', title: 'تصميم الثامبنيل', assignee: 'أحمد', tag: 'Design', color: 'bg-purple-500' },
      ]
    },
    progress: {
      title: 'جاري التنفيذ (In Progress)',
      items: [
        { id: '3', title: 'القص المبدئي (Rough Cut)', assignee: 'محمد', tag: 'Editing', color: 'bg-blue-500' },
      ]
    },
    review: {
      title: 'قيد المراجعة (Review)',
      items: [
        { id: '4', title: 'تصحيح الألوان للمشهد 3', assignee: 'خالد', tag: 'Color', color: 'bg-yellow-500' },
      ]
    },
    done: {
      title: 'مكتمل (Done)',
      items: [
        { id: '5', title: 'استلام المواد الخام', assignee: 'محمد', tag: 'Ingest', color: 'bg-green-500' },
      ]
    }
  });

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-300px)] min-h-[400px]">
       {Object.entries(columns).map(([key, col]) => (
          <div key={key} className="w-80 shrink-0 flex flex-col">
             <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-bold text-slate-300 text-sm">{col.title}</h3>
                <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">{col.items.length}</span>
             </div>
             
             <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-xl p-3 space-y-3 overflow-y-auto">
                {col.items.map((item) => (
                   <div key={item.id} className="bg-slate-800 border border-white/10 p-4 rounded-lg hover:border-indigo-500/50 cursor-grab active:cursor-grabbing shadow-sm group transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-[10px] px-2 py-1 rounded text-white font-bold ${item.color} bg-opacity-20 text-opacity-100 border border-white/10`}>
                            {item.tag}
                         </span>
                         <button className="text-slate-500 hover:text-white"><MoreHorizontal size={14}/></button>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-3">{item.title}</h4>
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px]">{item.assignee[0]}</div>
                            {item.assignee}
                         </div>
                      </div>
                   </div>
                ))}
                
                <button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg border border-dashed border-white/10 text-xs transition-colors">
                   <Plus size={14} /> إضافة مهمة
                </button>
             </div>
          </div>
       ))}
    </div>
  );
}

################################################################################