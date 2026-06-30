'use client';
import React from 'react';
import { Loader2, CheckCircle, XCircle, Pause, Play, ArrowUp } from 'lucide-react';

export function ExportQueue() {
  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
       <div className="p-3 border-b border-border bg-muted/10 text-xs font-bold uppercase text-muted-foreground flex justify-between">
          <span>Export Queue</span>
          <span className="text-primary">Active (1)</span>
       </div>

       <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {/* Active Item */}
          <QueueItem
             name="Final_Vlog_Ep1.mp4"
             status="processing"
             progress={45}
             format="H.264 • 4K"
          />

          {/* Queued Item */}
          <QueueItem
             name="Instagram_Story_Cut.mp4"
             status="queued"
             format="H.265 • 1080p"
          />

          {/* Finished Item */}
          <QueueItem
             name="Client_Draft_Review.mov"
             status="completed"
             format="ProRes • 1080p"
          />

          {/* Failed Item */}
          <QueueItem
             name="Raw_Backup_Archive.zip"
             status="failed"
             format="ZIP Archive"
          />
       </div>
    </div>
  );
}

// تعريف الواجهة وجعل progress اختيارية (?)
interface QueueItemProps {
  name: string;
  status: string;
  progress?: number;
  format: string;
}

function QueueItem({ name, status, progress = 0, format }: QueueItemProps) {
    // تم التعديل هنا لاستخدام React.ReactNode بدلاً من JSX.Element
    const statusIcons: Record<string, React.ReactNode> = {
        processing: <Loader2 size={14} className="animate-spin text-blue-500" />,
        queued: <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />,
        completed: <CheckCircle size={14} className="text-emerald-500" />,
        failed: <XCircle size={14} className="text-red-500" />
    };

    return (
        <div className="p-3 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors group relative overflow-hidden">
           {status === 'processing' && progress > 0 && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
           )}

           <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2 overflow-hidden">
                 <div className="shrink-0 pt-0.5">{statusIcons[status]}</div>
                 <span className={`text-xs font-bold truncate ${status === 'completed' ? 'text-muted-foreground line-through' : ''}`}>{name}</span>
              </div>
           </div>

           <div className="flex justify-between items-center text-[10px] text-muted-foreground pl-6">
              <span>{format}</span>
              <span className="capitalize">{status === 'processing' ? `${progress}%` : status}</span>
           </div>

           {/* Hover Actions */}
           <div className="absolute right-2 top-2 hidden group-hover:flex gap-1 bg-background shadow-sm border border-border rounded p-0.5">
              {status === 'processing' && <button className="p-1 hover:text-yellow-600"><Pause size={10} /></button>}
              {status === 'queued' && <button className="p-1 hover:text-emerald-600"><Play size={10} /></button>}
              {status === 'queued' && <button className="p-1 hover:text-blue-600"><ArrowUp size={10} /></button>}
           </div>
        </div>
    )
}
