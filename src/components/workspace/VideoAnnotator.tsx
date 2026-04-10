'use client';
import React, { useState } from 'react';
import { Play, Pause, MessageSquarePlus, PenTool, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function VideoAnnotator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [markers, setMarkers] = useState<{ x: number; y: number; text: string }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const comment = prompt("أضف تعليقك على هذا الإطار:");
    if (comment) {
      setMarkers([...markers, { x, y, text: comment }]);
      setIsDrawing(false); // Reset mode
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group border border-border">
       {/* Video Placeholder */}
       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center cursor-crosshair" onClick={handleVideoClick}>
          <p className="text-white/20 select-none">Video Player Area</p>
          
          {/* Markers */}
          {markers.map((m, i) => (
             <div key={i} className="absolute w-8 h-8 -ml-4 -mt-4 group/marker" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
                <div className="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-lg animate-bounce" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity z-10">
                   {m.text}
                </div>
             </div>
          ))}
       </div>

       {/* Controls Overlay */}
       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
             </button>
             <span className="text-white font-mono text-sm">00:04:12 / 00:10:00</span>
          </div>

          <div className="flex gap-2">
             <Button 
                size="sm" 
                variant={isDrawing ? 'primary' : 'secondary'} 
                className={isDrawing ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/30'}
                onClick={() => setIsDrawing(!isDrawing)}
                icon={<MessageSquarePlus size={16} />}
             >
                {isDrawing ? 'اضغط على الفيديو' : 'إضافة تعليق'}
             </Button>
          </div>
       </div>

       {/* Timeline Marker (Visual only) */}
       <div className="absolute bottom-0 left-0 h-1 bg-red-500 w-[42%]" />
    </div>
  );
}
