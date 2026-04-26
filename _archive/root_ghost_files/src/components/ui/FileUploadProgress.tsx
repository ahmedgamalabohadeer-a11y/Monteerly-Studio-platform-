import React from 'react';
import { FileVideo, X, CheckCircle, Loader2 } from 'lucide-react';

interface UploadProps {
  fileName: string;
  progress: number; // 0 to 100
  status: 'uploading' | 'completed' | 'error';
  size?: string;
}

export function FileUploadProgress({ fileName, progress, status, size = '120 MB' }: UploadProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 shadow-sm">
      <div className={`p-2 rounded-lg ${status === 'error' ? 'bg-red-50 text-red-500' : 'bg-muted text-muted-foreground'}`}>
         <FileVideo size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
         <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-bold truncate">{fileName}</p>
            <span className="text-xs text-muted-foreground">{status === 'completed' ? '100%' : `${progress}%`}</span>
         </div>
         
         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${status === 'completed' ? 'bg-emerald-500' : status === 'error' ? 'bg-red-500' : 'bg-primary'}`} 
              style={{ width: `${progress}%` }} 
            />
         </div>
         
         <div className="flex justify-between mt-1">
             <span className="text-[10px] text-muted-foreground">{size}</span>
             {status === 'uploading' && <span className="text-[10px] text-primary">jary al-raf...</span>}
         </div>
      </div>

      <button className="text-muted-foreground hover:text-foreground">
         {status === 'uploading' ? <X size={16} /> : status === 'completed' ? <CheckCircle size={18} className="text-emerald-500" /> : <Loader2 size={16} className="animate-spin" />}
      </button>
    </div>
  );
}

################################################################################