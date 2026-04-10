'use client';
import React, { useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFiles([...files, 'New_Footage_01.mp4', 'Audio_Track.wav']);
  };

  return (
    <div className="mb-8">
       {files.length > 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
             <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white text-sm">جاري الرفع (2 ملفات)</h4>
                <button onClick={() => setFiles([])}><X size={16} className="text-slate-500 hover:text-white"/></button>
             </div>
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-500/20 rounded text-indigo-400"><File size={16}/></div>
                   <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-white">New_Footage_01.mp4</span>
                         <span className="text-slate-400">45%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-indigo-500 h-full w-[45%] animate-[shimmer_1s_infinite]" />
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-purple-500/20 rounded text-purple-400"><File size={16}/></div>
                   <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-white">Audio_Track.wav</span>
                         <span className="text-slate-400">Waiting...</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-white/10 h-full w-0" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       ) : (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${
               isDragging ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-xl">
                <UploadCloud size={32} className={isDragging ? 'text-indigo-400' : 'text-slate-400'} />
             </div>
             <h3 className="text-lg font-bold text-white mb-1">اسحب الملفات هنا للرفع</h3>
             <p className="text-slate-400 text-sm mb-6">يدعم MP4, MOV, WAV, PNG (الحد الأقصى 50GB)</p>
             <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">تصفح جهازك</Button>
          </div>
       )}
    </div>
  );
}
