'use client';
import React from 'react';
import Image from 'next/image';
import { X, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
  file: { type: 'image' | 'video' | 'code'; url: string; name: string };
}

export function FilePreviewModal({ isOpen, onClose, file }: PreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex flex-col animate-in fade-in">
       {/* Toolbar */}
       <div className="h-16 flex items-center justify-between px-6 text-white">
          <h3 className="font-bold truncate">{file.name}</h3>
          <div className="flex gap-4">
             <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" icon={<Download size={18} />}>تحميل</Button>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
          </div>
       </div>

       {/* Content */}
       <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          {file.type === 'image' && (
             <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                <Image src={file.url} alt={file.name} fill className="object-contain" />
             </div>
          )}
          
          {file.type === 'video' && (
             <video src={file.url} controls className="max-w-4xl max-h-[80vh] w-full rounded-lg shadow-2xl" />
          )}

          {file.type === 'code' && (
             <div className="bg-slate-900 text-slate-300 p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto font-mono text-sm border border-slate-700">
                <div className="flex items-center gap-2 mb-4 text-slate-500 pb-2 border-b border-slate-800">
                   <FileText size={16} /> Preview Mode
                </div>
                <pre>{`import React from 'react';\n\nexport function Component() {\n  return <div>Hello World</div>;\n}`}</pre>
             </div>
          )}
       </div>
    </div>
  );
}

