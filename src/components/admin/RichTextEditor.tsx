'use client';
import React from 'react';
import { Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter } from 'lucide-react';

export function RichTextEditor() {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
       {/* Toolbar */}
       <div className="flex gap-1 p-2 border-b border-border bg-muted/30 flex-wrap">
          <ToolbarBtn icon={Bold} />
          <ToolbarBtn icon={Italic} />
          <div className="w-[1px] h-6 bg-border mx-2" />
          <ToolbarBtn icon={AlignLeft} active />
          <ToolbarBtn icon={AlignCenter} />
          <div className="w-[1px] h-6 bg-border mx-2" />
          <ToolbarBtn icon={List} />
          <ToolbarBtn icon={LinkIcon} />
          <ToolbarBtn icon={ImageIcon} />
       </div>

       {/* Text Area */}
       <textarea 
         className="w-full h-96 p-4 bg-transparent outline-none resize-none font-serif text-lg leading-relaxed" 
         placeholder="ابدأ كتابة مقالك هنا..."
       />
    </div>
  );
}

function ToolbarBtn({ icon: Icon, active = false }: any) {
   return (
      <button className={`p-2 rounded hover:bg-muted ${active ? 'bg-muted text-primary' : 'text-muted-foreground'}`}>
         <Icon size={18} />
      </button>
   );
}
