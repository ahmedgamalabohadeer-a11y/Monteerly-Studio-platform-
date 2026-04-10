'use client';
import React, { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export function ZenModeToggle() {
  const [isZen, setIsZen] = useState(false);

  const toggleZen = () => {
    setIsZen(!isZen);
    // In a real app, this would use Context/Redux to hide Layout components
    // Here we toggle a class on the body for demonstration
    if (!isZen) {
        document.body.classList.add('zen-mode');
    } else {
        document.body.classList.remove('zen-mode');
    }
  };

  return (
    <button 
       onClick={toggleZen}
       className={`fixed top-4 right-20 z-[9999] p-2 rounded-full transition-all shadow-lg border backdrop-blur-sm
          ${isZen ? 'bg-primary text-white border-primary rotate-180' : 'bg-background/80 text-foreground border-border hover:bg-background'}`}
       title={isZen ? "Exit Zen Mode" : "Enter Zen Mode (Focus)"}
    >
       {isZen ? <Minimize size={20} /> : <Maximize size={20} />}
    </button>
  );
}
