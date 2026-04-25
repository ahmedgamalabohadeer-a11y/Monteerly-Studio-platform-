'use client';
import React, { useState } from 'react';
import { Pen, Eraser, MousePointer2, Trash, Download } from 'lucide-react';

export function Whiteboard() {
  const [tool, setTool] = useState<'pen' | 'eraser' | 'select'>('pen');

  return (
    <div className="h-full flex flex-col bg-slate-50 border border-border rounded-xl overflow-hidden relative">
       {/* Toolbar */}
       <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-border rounded-full p-1.5 flex gap-2 z-10">
          <ToolBtn icon={MousePointer2} active={tool === 'select'} onClick={() => setTool('select')} />
          <ToolBtn icon={Pen} active={tool === 'pen'} onClick={() => setTool('pen')} />
          <ToolBtn icon={Eraser} active={tool === 'eraser'} onClick={() => setTool('eraser')} />
          <div className="w-[1px] h-6 bg-border mx-1" />
          <ToolBtn icon={Trash} onClick={() => alert('Clear')} color="text-red-500 hover:bg-red-50" />
       </div>

       <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white border border-border rounded-lg hover:bg-muted text-muted-foreground">
             <Download size={18} />
          </button>
       </div>

       {/* Canvas Mockup */}
       <div className="flex-1 cursor-crosshair relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
          {/* Simulated Drawings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
             <path d="M100,100 Q200,50 300,150 T500,100" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
             <text x="120" y="90" className="text-sm fill-slate-500">بداية الفيديو هنا</text>
             <circle cx="300" cy="150" r="20" fill="none" stroke="red" strokeWidth="2" />
             <text x="330" y="160" className="text-sm fill-red-500 font-bold">مهم!</text>
          </svg>
          
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
             Canvas: 1920x1080 • Zoom: 100%
          </div>
       </div>
    </div>
  );
}

function ToolBtn({ icon: Icon, active, onClick, color }: any) {
    return (
        <button 
           onClick={onClick}
           className={`p-2 rounded-full transition-all ${active ? 'bg-primary text-white shadow-md' : color || 'text-slate-500 hover:bg-slate-100'}`}
        >
           <Icon size={18} />
        </button>
    )
}

################################################################################