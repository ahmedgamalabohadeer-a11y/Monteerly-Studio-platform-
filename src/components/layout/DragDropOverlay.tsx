'use client';
import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

export function DragDropOverlay() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set false if leaving the window, not entering a child element
      if (e.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      // Here you would trigger the upload modal globally
      console.log('Files dropped:', e.dataTransfer?.files);
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-primary/90 backdrop-blur-sm flex flex-col items-center justify-center text-white animate-in fade-in duration-200">
       <div className="w-64 h-64 border-4 border-white border-dashed rounded-3xl flex items-center justify-center mb-8 animate-bounce">
          <UploadCloud size={80} />
       </div>
       <h2 className="text-4xl font-bold font-heading mb-2">أفلت الملفات هنا</h2>
       <p className="text-white/80 text-lg">سيتم رفعها مباشرة إلى مكتبتك</p>
    </div>
  );
}
