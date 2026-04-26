import React from 'react';

interface WatermarkProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function Watermark({ children, enabled = true }: WatermarkProps) {
  if (!enabled) return <>{children}</>;

  return (
    <div className="relative overflow-hidden group">
       {children}
       
       {/* Watermark Pattern */}
       <div className="absolute inset-0 z-10 pointer-events-none opacity-30 select-none flex flex-wrap content-center justify-center gap-12 rotate-[-15deg] scale-125">
          {Array.from({ length: 12 }).map((_, i) => (
             <div key={i} className="text-white font-black text-2xl uppercase tracking-widest drop-shadow-md border-2 border-white/50 px-2 rounded">
                Monteerly
             </div>
          ))}
       </div>

       {/* Protection Message */}
       <div className="absolute bottom-2 right-2 z-20 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
          Protected by Monteerly Shield™
       </div>
    </div>
  );
}

