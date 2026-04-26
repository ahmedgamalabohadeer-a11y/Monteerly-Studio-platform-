'use client';
import React, { useState } from 'react';
import { Play, Clock, Plus, Trash, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
interface SubtitleLine {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}
export function SubtitleEditor() {
  const [lines, setLines] = useState<SubtitleLine[]>([
    { id: 1, startTime: '00:00:01,000', endTime: '00:00:04,500', text: 'مرحباً بكم في هذا الفيديو التعليمي الجديد.' },
    { id: 2, startTime: '00:00:05,000', endTime: '00:00:08,200', text: 'سنتعلم اليوم كيفية استخدام أدوات المونتاج.' },
  ]);
  const updateText = (id: number, newText: string) => {
    setLines(lines.map(l => l.id === id ? { ...l, text: newText } : l));
  };
  return (
    <div className="flex flex-col h-full bg-card border-l border-border w-80">
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <h3 className="font-bold text-sm">الترجمة والنصوص (CC)</h3>
          <Button size="sm" variant="ghost" icon={<Download size={14} />}>SRT</Button>
       </div>
       <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {lines.map((line) => (
             <div key={line.id} className="p-3 border border-border rounded-lg bg-background hover:border-primary/50 transition-colors group focus-within:ring-1 focus-within:ring-primary">
                <div className="flex justify-between items-center mb-2 text-xs text-muted-foreground font-mono">
                   <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>{line.startTime}</span>
                   </div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="hover:text-primary"><Play size={12} /></button>
                      <button className="hover:text-red-500"><Trash size={12} /></button>
                   </div>
                </div>
                <textarea 
                   value={line.text}
                   onChange={(e) => updateText(line.id, e.target.value)}
                   className="w-full bg-transparent resize-none text-sm outline-none h-auto min-h-[40px]"
                />
             </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm font-bold">
             <Plus size={16} /> إضافة سطر جديد
          </button>
       </div>
    </div>
  );
}
