'use client';

import React, { useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export function ZenModeToggle() {
  const [isZen, setIsZen] = useState(false);

  const toggleZen = () => {
    setIsZen(!isZen);

    if (!isZen) {
      document.body.classList.add('zen-mode');
    } else {
      document.body.classList.remove('zen-mode');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleZen}
      className={`fixed right-20 top-4 z-[9999] rounded-full border p-2 shadow-lg backdrop-blur-sm transition-all ${
        isZen
          ? 'rotate-180 border-primary bg-primary text-white'
          : 'border-border bg-background/80 text-foreground hover:bg-background'
      }`}
      title={isZen ? 'Exit Zen Mode' : 'Enter Zen Mode (Focus)'}
    >
      {isZen ? <Minimize size={20} /> : <Maximize size={20} />}
    </button>
  );
}
