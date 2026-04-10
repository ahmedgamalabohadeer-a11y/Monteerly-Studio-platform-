'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  targetId?: string; // ID of the element to attach to (simulated here)
  title: string;
  desc: string;
}

export function FeatureHotspots({ title, desc }: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="absolute top-0 right-0 z-50 pointer-events-none">
       {/* The Pulsing Dot (Positioned relatively for demo) */}
       <div className="relative">
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>

          {/* The Popover */}
          <div className="absolute top-6 right-0 w-64 bg-primary text-primary-foreground p-4 rounded-xl shadow-xl pointer-events-auto animate-in slide-in-from-top-2">
             <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm">{title}</h4>
                <button onClick={() => setVisible(false)} className="hover:bg-black/20 rounded p-0.5"><X size={14} /></button>
             </div>
             <p className="text-xs opacity-90 leading-relaxed mb-3">{desc}</p>
             <button 
                onClick={() => setVisible(false)} 
                className="text-xs bg-white text-primary px-3 py-1.5 rounded font-bold hover:bg-white/90 w-full"
             >
                فهمت
             </button>
             
             {/* Arrow */}
             <div className="absolute -top-1 right-1 w-3 h-3 bg-primary transform rotate-45" />
          </div>
       </div>
    </div>
  );
}
