'use client';
import React, { useState, useRef } from 'react';
import { UploadCloud, FileVideo, FileAudio, X } from 'lucide-react';

export function FileDropzone() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles && newFiles.length > 0) {
      // Convert to array and add mock progress
      const fileArray = Array.from(newFiles).map(f => ({ 
         file: f, 
         progress: 0, 
         status: 'queue' 
      }));
      setFiles(prev => [...prev, ...fileArray]);
      
      // Simulate Upload
      fileArray.forEach((f, i) => {
         setTimeout(() => {
            setFiles(current => current.map((item, idx) => idx === current.length - 1 ? { ...item, progress: 100, status: 'done' } : item));
         }, 1500);
      });
    }
  };

  return (
    <div className="w-full">
       <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
       >
          <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <UploadCloud size={32} />
          </div>
          <h4 className="font-bold text-lg mb-1">اضغط أو اسحب الملفات هنا</h4>
          <p className="text-xs text-muted-foreground">ندعم الفيديو (MP4, MOV)، الصوت (WAV, MP3)، والصور.</p>
       </div>

       {/* File List */}
       {files.length > 0 && (
          <div className="mt-6 space-y-3">
             {files.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg animate-in slide-in-from-bottom-2">
                   <div className="p-2 bg-muted rounded text-muted-foreground">
                      {item.file.type.includes('video') ? <FileVideo size={20} /> : <FileAudio size={20} />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                         <span className="font-bold truncate">{item.file.name}</span>
                         <span>{item.status === 'done' ? '100%' : 'Jari...'}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                         <div className="h-full bg-primary transition-all duration-500" style={{ width: item.status === 'done' ? '100%' : '40%' }} />
                      </div>
                   </div>
                   <button onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="text-muted-foreground hover:text-red-500">
                      <X size={16} />
                   </button>
                </div>
             ))}
          </div>
       )}
    </div>
  );
}
