'use client';
import React, { useState } from 'react';
import { Minimize2, Maximize2, X, Pause, Play, FileVideo, CheckCircle } from 'lucide-react';

export function TransferCenter() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-0 right-4 md:right-8 bg-card border border-border rounded-t-xl shadow-2xl transition-all duration-300 z-[999] flex flex-col ${isMinimized ? 'h-12 w-72' : 'h-96 w-96'}`}>
       {/* Header */}
       <div className="h-12 bg-slate-900 text-white flex items-center justify-between px-4 rounded-t-xl cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <span className="font-bold text-sm">جاري الرفع (3 ملفات)...</span>
          <div className="flex items-center gap-2">
             <button className="hover:text-primary">{isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}</button>
             <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:text-red-400"><X size={16} /></button>
          </div>
       </div>

       {/* List */}
       {!isMinimized && (
          <div className="flex-1 overflow-y-auto bg-background p-2 space-y-2">
             <TransferItem name="Project_Raw_Footage_CamA.mov" size="4.2 GB" progress={45} status="uploading" />
             <TransferItem name="Project_Raw_Footage_CamB.mov" size="3.8 GB" progress={12} status="paused" />
             <TransferItem name="Audio_Master.wav" size="150 MB" progress={100} status="completed" />
          </div>
       )}
    </div>
  );
}

function TransferItem({ name, size, progress, status }: any) {
   return (
      <div className="p-3 bg-muted/20 border border-border rounded-lg group">
         <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 overflow-hidden">
               <FileVideo size={16} className="shrink-0 text-primary" />
               <span className="text-xs font-bold truncate">{name}</span>
            </div>
            {status === 'completed' ? (
               <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            ) : (
               <button className="text-muted-foreground hover:text-foreground">
                  {status === 'paused' ? <Play size={14} /> : <Pause size={14} />}
               </button>
            )}
         </div>
         
         {status !== 'completed' && (
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-1">
               <div className={`h-full ${status === 'paused' ? 'bg-yellow-500' : 'bg-primary'} transition-all duration-300`} style={{ width: `${progress}%` }} />
            </div>
         )}
         
         <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{size}</span>
            <span>{status === 'completed' ? 'تم الرفع' : status === 'paused' ? 'متوقف' : `${progress}% • 2MB/s`}</span>
         </div>
      </div>
   );
}

################################################################################