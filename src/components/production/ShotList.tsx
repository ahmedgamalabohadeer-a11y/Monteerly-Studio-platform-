'use client';
import React from 'react';
import { CheckSquare, Camera, Clock, Move } from 'lucide-react';

export function ShotList() {
  const shots = [
    { id: '1A', type: 'Wide Shot', lens: '24mm', angle: 'Eye Level', desc: 'Establishing shot of the cafe.', status: 'Done' },
    { id: '1B', type: 'Medium', lens: '50mm', angle: 'Over Shoulder', desc: 'Ahmed tapping fingers.', status: 'Next' },
    { id: '1C', type: 'Close Up', lens: '85mm', angle: 'Low Angle', desc: 'Coffee cup steam.', status: 'Pending' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Camera className="text-pink-400" /> قائمة اللقطات (Shot List)
          </h3>
          <div className="text-xs text-slate-500">Day 1 • 3/12 Shots Completed</div>
       </div>

       <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-slate-400 text-xs uppercase">
             <tr>
                <th className="p-4 w-16">#</th>
                <th className="p-4">حجم اللقطة</th>
                <th className="p-4">العدسة</th>
                <th className="p-4">الوصف</th>
                <th className="p-4 text-right">الحالة</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {shots.map((shot) => (
                <tr key={shot.id} className="hover:bg-white/5 transition-colors group">
                   <td className="p-4 font-mono font-bold text-white">{shot.id}</td>
                   <td className="p-4 text-slate-300">{shot.type}</td>
                   <td className="p-4 font-mono text-indigo-400">{shot.lens}</td>
                   <td className="p-4 text-slate-400 text-xs">{shot.desc}</td>
                   <td className="p-4 text-right">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                         shot.status === 'Done' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                         shot.status === 'Next' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                         'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                         {shot.status}
                      </span>
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
}
