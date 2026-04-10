'use client';
import React, { useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

export function GlobalDragOverlay() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      dragCounter = 0;
      // Here you would trigger the global upload handler
      // console.log('Dropped files:', e.dataTransfer?.files);
    };

    const handleDragOver = (e: DragEvent) => e.preventDefault();

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
    <div className="fixed inset-0 z-[10000] bg-primary/10 backdrop-blur-sm border-[6px] border-primary border-dashed rounded-xl m-4 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 pointer-events-none">
       <div className="bg-card p-8 rounded-3xl shadow-2xl flex flex-col items-center border border-primary/20">
          <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 animate-bounce">
             <UploadCloud size={48} />
          </div>
          <h2 className="text-3xl font-black text-primary">أفلت الملفات هنا</h2>
          <p className="text-muted-foreground mt-2">لإضافتها فوراً إلى مشروعك الحالي</p>
       </div>
    </div>
  );
}
