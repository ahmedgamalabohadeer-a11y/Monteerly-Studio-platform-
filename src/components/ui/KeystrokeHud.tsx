'use client';
import React, { useState, useEffect } from 'react';

export function KeystrokeHud() {
  const [keys, setKeys] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: any;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing in inputs
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      const newKeys = [];
      if (e.ctrlKey) newKeys.push('Ctrl');
      if (e.metaKey) newKeys.push('Cmd');
      if (e.altKey) newKeys.push('Alt');
      if (e.shiftKey) newKeys.push('Shift');
      if (!['Control', 'Meta', 'Alt', 'Shift'].includes(e.key)) {
         newKeys.push(e.key.toUpperCase());
      }

      if (newKeys.length > 0) {
         setKeys(newKeys);
         setVisible(true);
         clearTimeout(timeout);
         timeout = setTimeout(() => setVisible(false), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex gap-2 animate-in slide-in-from-bottom-5 fade-in duration-200">
       {keys.map((k, i) => (
          <div key={i} className="bg-slate-900/90 text-white font-mono font-bold text-xl px-4 py-3 rounded-lg shadow-2xl border border-white/10 backdrop-blur-md min-w-[50px] text-center">
             {k}
          </div>
       ))}
    </div>
  );
}

