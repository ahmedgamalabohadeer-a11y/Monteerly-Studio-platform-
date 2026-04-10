'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Undo, Trash2 } from 'lucide-react';

export function Telestrator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444'); // Red default
  const [active, setActive] = useState(false);

  // Setup Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Fit canvas to parent
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4;
    }
  }, [active]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={`absolute inset-0 z-20 ${active ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
      />

      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 transition-opacity">
         <button 
           onClick={() => setActive(!active)}
           className={`p-2 rounded-lg transition-colors ${active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
           title="Toggle Drawing"
         >
            <Pencil size={20} />
         </button>
         
         {active && (
           <div className="flex flex-col gap-2 animate-in slide-in-from-left-2 fade-in">
              <div className="h-px bg-white/10 my-1" />
              <button onClick={() => setColor('#ef4444')} className={`w-6 h-6 rounded-full bg-red-500 border-2 ${color === '#ef4444' ? 'border-white' : 'border-transparent'}`} />
              <button onClick={() => setColor('#22c55e')} className={`w-6 h-6 rounded-full bg-green-500 border-2 ${color === '#22c55e' ? 'border-white' : 'border-transparent'}`} />
              <button onClick={() => setColor('#3b82f6')} className={`w-6 h-6 rounded-full bg-blue-500 border-2 ${color === '#3b82f6' ? 'border-white' : 'border-transparent'}`} />
              <button onClick={() => setColor('#eab308')} className={`w-6 h-6 rounded-full bg-yellow-500 border-2 ${color === '#eab308' ? 'border-white' : 'border-transparent'}`} />
              <div className="h-px bg-white/10 my-1" />
              <button onClick={clearCanvas} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                 <Trash2 size={20} />
              </button>
           </div>
         )}
      </div>
    </>
  );
}
