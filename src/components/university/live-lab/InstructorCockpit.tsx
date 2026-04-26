'use client';
import React from 'react';
import { LayoutGrid, Maximize, Mic, Video, Hand, MoreVertical } from 'lucide-react';

export function InstructorCockpit() {
  const students = [
    { id: 1, name: 'Ahmed', status: 'Working', screen: '/images/features/live.jpg', active: true },
    { id: 2, name: 'Sara', status: 'Idle (2m)', screen: '/images/features/ai-brain.jpg', active: true },
    { id: 3, name: 'Khaled', status: 'Need Help', screen: '/images/features/speed.jpg', active: true, handRaised: true },
    { id: 4, name: 'Mona', status: 'Offline', screen: '', active: false },
    { id: 5, name: 'Youssef', status: 'Working', screen: '/images/features/live.jpg', active: true },
    { id: 6, name: 'Layla', status: 'Working', screen: '/images/features/ai-brain.jpg', active: true },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
       {/* Toolbar */}
       <div className="bg-slate-900 border border-white/10 p-4 rounded-xl mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded animate-pulse">ON AIR</div>
             <h3 className="font-bold text-white">Workshop: Advanced VFX (Session 3)</h3>
          </div>
          <div className="flex gap-2">
             <button className="p-2 bg-indigo-600 rounded text-white hover:bg-indigo-700" title="Share Screen"><LayoutGrid size={18}/></button>
             <button className="p-2 bg-slate-800 rounded text-white hover:bg-slate-700" title="Mute All"><Mic size={18}/></button>
          </div>
       </div>

       {/* Grid */}
       <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
          {students.map((student) => (
             <div key={student.id} className={`bg-slate-900 border rounded-lg overflow-hidden relative group ${student.handRaised ? 'border-yellow-500' : 'border-white/10'}`}>
                {/* Screen Preview */}
                <div className="aspect-video bg-black relative">
                   {student.active ? (
                      <img src={student.screen} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Signal</div>
                   )}
                   
                   {/* Overlay Actions */}
                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      <button className="px-3 py-1 bg-white text-black text-xs font-bold rounded hover:bg-slate-200">Take Control</button>
                      <button className="p-2 bg-slate-800 text-white rounded hover:bg-slate-700"><Maximize size={14}/></button>
                   </div>
                </div>

                {/* Info Bar */}
                <div className="p-2 flex justify-between items-center bg-slate-950">
                   <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${student.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-xs font-bold text-white">{student.name}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      {student.handRaised && <Hand size={14} className="text-yellow-500 animate-bounce" />}
                      <button className="text-slate-500 hover:text-white"><MoreVertical size={14}/></button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

