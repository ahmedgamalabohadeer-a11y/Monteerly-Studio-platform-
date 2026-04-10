'use client';
import React from 'react';

interface Props {
  userId: string;
  ip: string;
  visible?: boolean;
}

export function ForensicWatermark({ userId, ip, visible = true }: Props) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden select-none">
       {/* Visible Floating Watermark */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-[-15deg]">
          <div className="text-4xl font-black text-white whitespace-nowrap">
             PREVIEW COPY • {userId}
          </div>
          <div className="text-xl text-center text-white mt-2 font-mono">
             {ip} • DO NOT DISTRIBUTE
          </div>
       </div>

       {/* Invisible Pattern Grid (Simulated Forensic Dots) */}
       <div className="w-full h-full opacity-[0.03]" 
            style={{ 
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
              backgroundSize: '50px 50px' 
            }} 
       />
    </div>
  );
}
