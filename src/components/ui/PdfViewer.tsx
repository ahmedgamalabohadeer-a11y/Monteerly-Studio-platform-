'use client';
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PdfViewerProps {
  src: string; // URL of the PDF
  title: string;
}

export function PdfViewer({ src, title }: PdfViewerProps) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-[600px] border border-border rounded-xl bg-slate-100 overflow-hidden">
       {/* Toolbar */}
       <div className="h-14 bg-white border-b border-border flex items-center justify-between px-4 shadow-sm z-10">
          <span className="font-bold text-sm truncate max-w-[200px]">{title}</span>
          
          <div className="flex items-center gap-2">
             <Button size="sm" variant="ghost" onClick={() => setZoom(z => Math.max(50, z - 10))}><ZoomOut size={16} /></Button>
             <span className="text-xs font-mono w-12 text-center">{zoom}%</span>
             <Button size="sm" variant="ghost" onClick={() => setZoom(z => Math.min(200, z + 10))}><ZoomIn size={16} /></Button>
          </div>

          <div className="flex items-center gap-2">
             <a href={src} download target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" icon={<Download size={16} />}>تحميل</Button>
             </a>
             <a href={src} target="_blank" rel="noreferrer">
                <Button size="sm" variant="ghost"><ExternalLink size={16} /></Button>
             </a>
          </div>
       </div>

       {/* View Area */}
       <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-200/50">
          <iframe 
             src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
             className="shadow-xl transition-all duration-200 bg-white"
             style={{ width: `${zoom}%`, height: '100%', minWidth: '300px' }}
             title="PDF Preview"
          />
       </div>
    </div>
  );
}

