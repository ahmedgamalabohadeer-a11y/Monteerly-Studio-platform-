'use client';
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export function ZenModeToggle() {
  const [isZen, setIsZen] = useState(false);

  useEffect(() => {
    if (isZen) {
      document.body.classList.add('zen-mode');
    } else {
      document.body.classList.remove('zen-mode');
    }
  }, [isZen]);

  return (
    <button 
      onClick={() => setIsZen(!isZen)}
      className={`fixed top-4 right-20 z-[60] p-2 rounded-full transition-all ${
         isZen ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-black/20 text-slate-400 hover:text-white'
      }`}
      title={isZen ? "Exit Focus" : "Enter Focus Mode"}
    >
       {isZen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
    </button>
  );
}

################################################################################