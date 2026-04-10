'use client';
import React from 'react';
import Link from 'next/link';

export function ViralWatermark() {
  return (
    <div className="absolute bottom-4 right-4 z-50 pointer-events-auto group">
       <Link href="/" className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all text-xs font-bold border border-white/10">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Powered by Monteerly
       </Link>
    </div>
  );
}
