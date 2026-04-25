'use client';
import React, { useState, useRef } from 'react';
import { Pen, Eraser, Undo, Trash, MousePointer } from 'lucide-react';
export function AnnotationCanvas() {
  const [tool, setTool] = useState<'draw' | 'erase' | 'none'>('none');
  const [color, setColor] = useState('#ef4444'); // Red default
  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
       {/* Toolbar */}
       <div className="absolute top-4 left-4 pointer-events-auto bg-black/80 backdrop-blur border border-white/10 rounded-lg p-1 flex flex-col gap-2">
          <ToolBtn icon={MousePointer} active={tool === 'none'} onClick={() => setTool('none')} />
          <ToolBtn icon={Pen} active={tool === 'draw'} onClick={() => setTool('draw')} />
          {tool === 'draw' && (
             <div className="flex flex-col gap-1 p-1 bg-white/10 rounded">
                <ColorDot color="#ef4444" active={color === '#ef4444'} onClick={() => setColor('#ef4444')} />
                <ColorDot color="#3b82f6" active={color === '#3b82f6'} onClick={() => setColor('#3b82f6')} />
                <ColorDot color="#10b981" active={color === '#10b981'} onClick={() => setColor('#10b981')} />
                <ColorDot color="#eab308" active={color === '#eab308'} onClick={() => setColor('#eab308')} />
             </div>
          )}
          <div className="h-[1px] bg-white/20 w-full my-1" />
          <ToolBtn icon={Undo} onClick={() => {}} />
          <ToolBtn icon={Trash} color="text-red-500 hover:bg-red-500/20" onClick={() => {}} />
       </div>
       {/* Canvas Layer */}
       {tool !== 'none' && (
          <div className="absolute inset-0 pointer-events-auto cursor-crosshair">
             {/* Simulated Drawing for UI Demo */}
             <svg className="w-full h-full">
                <path 
                   d="M200,300 Q250,200 400,250" 
                   stroke={color} 
                   strokeWidth="4" 
                   fill="none" 
                   strokeLinecap="round"
                   className="animate-in fade-in duration-500"
                />
                <circle cx="400" cy="250" r="30" stroke={color} strokeWidth="4" fill="none" />
                {/* Arrow Head */}
                <path d="M390,240 L400,250 L385,260" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
             </svg>
          </div>
       )}
    </div>
  );
}
function ToolBtn({ icon: Icon, active, onClick, color }: any) {
    return (
        <button 
           onClick={onClick}
           className={`p-2 rounded-md transition-colors ${active ? 'bg-primary text-white' : color || 'text-slate-300 hover:bg-white/10'}`}
        >
           <Icon size={18} />
        </button>
    )
}
function ColorDot({ color, active, onClick }: any) {
    return (
        <button 
           onClick={onClick}
           className={`w-4 h-4 rounded-full transition-transform ${active ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'}`}
           style={{ backgroundColor: color }}
        />
    )
}
