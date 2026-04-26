'use client';
import React, { useState } from 'react';
import { Palette, Copy, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PaletteGenerator() {
  const [colors, setColors] = useState([
    { hex: '#1e293b', name: 'Slate 800' },
    { hex: '#3b82f6', name: 'Blue 500' },
    { hex: '#ef4444', name: 'Red 500' },
    { hex: '#eab308', name: 'Yellow 500' },
    { hex: '#10b981', name: 'Emerald 500' },
  ]);

  const generate = () => {
    // Simulation: Shuffle colors
    setColors([...colors].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
             <Palette className="text-purple-500" size={20} />
             <h3 className="font-bold text-lg">مستخرج الألوان (Palette)</h3>
          </div>
          <Button size="sm" variant="outline" onClick={generate} icon={<RefreshCw size={14} />}>تحديث من الإطار الحالي</Button>
       </div>

       {/* Video Frame Simulation */}
       <div className="aspect-video bg-slate-800 rounded-lg mb-6 relative flex items-center justify-center text-slate-600 border border-border">
          <ImageIcon size={32} />
          <span className="ml-2 text-sm">Video Preview Frame</span>
       </div>

       <div className="grid grid-cols-5 gap-2 h-24">
          {colors.map((color, idx) => (
             <div key={idx} className="h-full rounded-lg flex flex-col justify-end overflow-hidden group relative cursor-pointer" style={{ backgroundColor: color.hex }}>
                <div className="bg-black/40 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                   <p className="text-[10px] text-white/80 font-mono text-center">{color.hex}</p>
                </div>
                <button 
                   onClick={() => navigator.clipboard.writeText(color.hex)}
                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity"
                >
                   <Copy className="text-white drop-shadow-md" size={20} />
                </button>
             </div>
          ))}
       </div>
    </div>
  );
}

