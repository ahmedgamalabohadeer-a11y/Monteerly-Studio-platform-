import React from 'react';
import Image from 'next/image';
import { X, Download, ExternalLink } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ src, isOpen, onClose }: ImageViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center animate-in fade-in">
       {/* Toolbar */}
       <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"><Download size={20} /></button>
          <button className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"><ExternalLink size={20} /></button>
          <button onClick={onClose} className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"><X size={20} /></button>
       </div>

       {/* Image */}
       <div className="relative w-full h-full max-w-5xl max-h-[80vh] p-4">
          <Image src={src} alt="Preview" fill className="object-contain" />
       </div>
    </div>
  );
}

