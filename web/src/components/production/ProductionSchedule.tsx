'use client';
import React from 'react';
import { Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

export function ProductionSchedule() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1); // 2 Weeks

  const tasks = [
    { name: 'Pre-Production', start: 1, duration: 3, color: 'bg-blue-500' },
    { name: 'Casting', start: 2, duration: 2, color: 'bg-purple-500' },
    { name: 'Location Scout', start: 3, duration: 2, color: 'bg-yellow-500' },
    { name: 'Shooting (Principal)', start: 5, duration: 5, color: 'bg-red-500' },
    { name: 'Editing (Rough Cut)', start: 8, duration: 4, color: 'bg-green-500' },
    { name: 'Color & Sound', start: 11, duration: 3, color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[500px]">
       {/* Toolbar */}
       <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <h3 className="font-bold text-white flex items-center gap-2">
                <Calendar className="text-indigo-400" /> الجدول الزمني (Timeline)
             </h3>
             <div className="flex gap-2">
                <button className="p-1 hover:bg-white/10 rounded text-slate-400"><ChevronLeft size={16}/></button>
                <span className="text-xs text-white font-bold">January 2026</span>
                <button className="p-1 hover:bg-white/10 rounded text-slate-400"><ChevronRight size={16}/></button>
             </div>
          </div>
          <div className="text-xs text-slate-500">Project: Desert Storm</div>
       </div>

       {/* Chart Area */}
       <div className="flex-1 overflow-x-auto relative">
          <div className="min-w-[800px] h-full flex flex-col">
             {/* Days Header */}
             <div className="flex border-b border-white/10 bg-slate-900/50">
                <div className="w-48 p-3 border-r border-white/10 text-xs font-bold text-slate-400 sticky left-0 bg-slate-900 z-10">Task Name</div>
                {days.map(day => (
                   <div key={day} className="flex-1 min-w-[50px] p-3 text-center border-r border-white/5 text-xs text-slate-500">
                      {day}
                   </div>
                ))}
             </div>

             {/* Task Rows */}
             <div className="flex-1 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex pointer-events-none pl-48">
                   {days.map(day => (
                      <div key={day} className="flex-1 min-w-[50px] border-r border-white/5 h-full" />
                   ))}
                </div>

                {/* Bars */}
                {tasks.map((task, i) => (
                   <div key={i} className="flex items-center h-12 border-b border-white/5 relative hover:bg-white/5 transition-colors">
                      <div className="w-48 px-4 text-xs font-bold text-white sticky left-0 bg-slate-900 z-10 truncate h-full flex items-center border-r border-white/10">
                         {task.name}
                      </div>
                      <div className="flex-1 flex items-center px-1 relative">
                         <div 
                           className={`h-8 rounded-lg ${task.color} opacity-80 shadow-lg flex items-center px-2 text-[10px] font-bold text-white whitespace-nowrap overflow-hidden relative z-0`}
                           style={{ 
                              width: `${(task.duration / 14) * 100}%`,
                              marginLeft: `${((task.start - 1) / 14) * 100}%`
                           }}
                         >
                            {task.name}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

