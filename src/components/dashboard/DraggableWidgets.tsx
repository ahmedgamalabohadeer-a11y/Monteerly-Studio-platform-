'use client';
import React from 'react';
import { GripVertical } from 'lucide-react';

export function DraggableWidgets() {
  // In a real app, use dnd-kit or react-beautiful-dnd
  // This is a static layout simulation for the prototype

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {/* Widget 1: Revenue */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-5 relative group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-4 right-4 text-slate-600 cursor-grab opacity-0 group-hover:opacity-100"><GripVertical size={16}/></div>
          <div className="text-slate-400 text-xs font-bold uppercase mb-2">صافي الأرباح</div>
          <div className="text-3xl font-black text-white">$12,450</div>
          <div className="h-16 mt-4 flex items-end gap-1">
             {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500 transition-colors" />
             ))}
          </div>
       </div>

       {/* Widget 2: Tasks */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-5 relative group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-4 right-4 text-slate-600 cursor-grab opacity-0 group-hover:opacity-100"><GripVertical size={16}/></div>
          <div className="text-slate-400 text-xs font-bold uppercase mb-4">المهام العاجلة</div>
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-slate-500" />
                <span className="text-sm text-slate-300">مراجعة عقد نيتفلكس</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-slate-500" />
                <span className="text-sm text-slate-300">تصدير فيديو يوتيوب</span>
             </div>
          </div>
       </div>

       {/* Widget 3: Storage */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-5 relative group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-4 right-4 text-slate-600 cursor-grab opacity-0 group-hover:opacity-100"><GripVertical size={16}/></div>
          <div className="text-slate-400 text-xs font-bold uppercase mb-2">التخزين السحابي</div>
          <div className="flex items-end justify-between mb-2">
             <span className="text-2xl font-bold text-white">850 GB</span>
             <span className="text-xs text-slate-500">of 1 TB</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[85%]" />
          </div>
       </div>
    </div>
  );
}
