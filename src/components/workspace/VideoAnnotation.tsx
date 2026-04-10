'use client';
import React, { useState } from 'react';
import { Pen, Circle, Square, Eraser } from 'lucide-react';

export function VideoAnnotation() {
  const [activeTool, setActiveTool] = useState<'pen' | 'circle' | 'square' | null>('pen');
  const [color, setColor] = useState('#ef4444');

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
       <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 pointer-events-auto shadow-2xl">
          <button onClick={() => setActiveTool('pen')} className={`p-2 rounded-lg transition-colors ${activeTool === 'pen' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}><Pen size={20} /></button>
          <button onClick={() => setActiveTool('circle')} className={`p-2 rounded-lg transition-colors ${activeTool === 'circle' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}><Circle size={20} /></button>
          <button onClick={() => setActiveTool('square')} className={`p-2 rounded-lg transition-colors ${activeTool === 'square' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}><Square size={20} /></button>
          <div className="h-px bg-white/10 my-1" />
          {['#ef4444', '#22c55e', '#3b82f6', '#eab308'].map(c => (
             <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
          ))}
          <div className="h-px bg-white/10 my-1" />
          <button className="p-2 text-slate-400 hover:text-red-400 transition-colors"><Eraser size={20} /></button>
       </div>
       <div className="w-full h-full pointer-events-none">
          <svg className="w-full h-full opacity-80">
             <path d="M100,100 Q150,50 200,100 T300,100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
             <circle cx="500" cy="300" r="40" fill="none" stroke={color} strokeWidth="4" />
          </svg>
       </div>
    </div>
  );
}
