'use client';
import React, { useState } from 'react';
import { Type, Eye, Move } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function WatermarkEditor() {
  const [text, setText] = useState('DRAFT - MONTEERLY');
  const [opacity, setOpacity] = useState(30);
  const [size, setSize] = useState(24);

  return (
    <div className="space-y-6">
       <div className="bg-slate-900 aspect-video rounded-xl relative overflow-hidden flex items-center justify-center border border-border">
          {/* Preview Canvas */}
          <div className="absolute inset-0 grid grid-cols-3 gap-8 p-8 transform -rotate-12 pointer-events-none">
             {Array.from({ length: 9 }).map((_, i) => (
                <div 
                   key={i} 
                   className="flex items-center justify-center font-black text-white border-2 border-white rounded"
                   style={{ opacity: opacity / 100, fontSize: `${size}px` }}
                >
                   {text}
                </div>
             ))}
          </div>
          <span className="text-slate-600 font-mono text-sm">Video Preview Area</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-4 rounded-xl border border-border">
          <Input 
             label="نص العلامة المائية" 
             value={text} 
             onChange={(e: any) => setText(e.target.value)}
             icon={<Type size={16} />}
          />
          
          <div className="space-y-2">
             <label className="text-sm font-bold flex items-center gap-2"><Eye size={16} /> الشفافية ({opacity}%)</label>
             <input 
                type="range" min="10" max="100" 
                value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
             />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold flex items-center gap-2"><Move size={16} /> الحجم ({size}px)</label>
             <input 
                type="range" min="12" max="72" 
                value={size} onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
             />
          </div>
       </div>
    </div>
  );
}

################################################################################