'use client';
import React, { useState } from 'react';
import { RotateCcw, Scissors, Type, Palette, Move, MousePointer2 } from 'lucide-react';

export function HistoryPanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const history = [
    { id: 1, action: 'Move Clip "Scene 1"', time: '10:45:20', icon: Move },
    { id: 2, action: 'Cut at 00:04:12', time: '10:45:15', icon: Scissors },
    { id: 3, action: 'Add Text Layer', time: '10:44:50', icon: Type },
    { id: 4, action: 'Change Color Grade', time: '10:44:10', icon: Palette },
    { id: 5, action: 'Select "Audio 2"', time: '10:43:00', icon: MousePointer2 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl h-full flex flex-col w-72">
       <div className="p-3 border-b border-border bg-muted/10 flex justify-between items-center">
          <h3 className="font-bold text-sm">سجل العمليات (History)</h3>
          <span className="text-[10px] text-muted-foreground">50 خطوة</span>
       </div>

       <div className="flex-1 overflow-y-auto">
          {history.map((item, index) => (
             <div 
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-3 p-3 cursor-pointer border-l-4 transition-colors ${
                   index === activeIndex 
                   ? 'bg-primary/10 border-l-primary' 
                   : index > activeIndex 
                      ? 'bg-muted/5 border-l-transparent opacity-50' // Future/Undone steps
                      : 'bg-background border-l-transparent hover:bg-muted/20' // Past steps
                }`}
             >
                <item.icon size={16} className={index === activeIndex ? 'text-primary' : 'text-muted-foreground'} />
                <div className="flex-1 min-w-0">
                   <p className={`text-sm truncate ${index === activeIndex ? 'font-bold' : ''}`}>{item.action}</p>
                   <p className="text-[10px] text-muted-foreground font-mono">{item.time}</p>
                </div>
                {index === activeIndex && <RotateCcw size={14} className="text-primary animate-pulse" />}
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################