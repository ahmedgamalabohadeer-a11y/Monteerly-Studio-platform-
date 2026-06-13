'use client';
import React from 'react';
import { FileCog, CheckCircle, Loader2 } from 'lucide-react';

export function IngestStatus() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 w-72">
       <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <FileCog size={18} />
          <h3 className="font-bold text-sm">حالة المعالجة (Ingest)</h3>
       </div>

       <div className="space-y-4">
          <StatusItem 
             name="A001_C004.mxf" 
             task="Generating Proxy (720p)" 
             status="processing" 
             progress={65} 
          />
          <StatusItem 
             name="Drone_Shot_05.mov" 
             task="Optimizing Audio" 
             status="processing" 
             progress={30} 
          />
          <StatusItem 
             name="Interview_Cam_B.mp4" 
             task="Ready to Edit" 
             status="completed" 
          />
       </div>
    </div>
  );
}

function StatusItem({ name, task, status, progress }: unknown) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-start">
               <span className="text-xs font-bold truncate w-40 block">{name}</span>
               {status === 'completed' ? (
                  <CheckCircle size={14} className="text-emerald-500" />
               ) : (
                  <Loader2 size={14} className="text-blue-500 animate-spin" />
               )}
            </div>
            
            <p className="text-[10px] text-muted-foreground flex justify-between">
               <span>{task}</span>
               {status === 'processing' && <span>{progress}%</span>}
            </p>

            {status === 'processing' && (
               <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
               </div>
            )}
        </div>
    )
}

