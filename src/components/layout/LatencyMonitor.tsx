'use client';
import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function LatencyMonitor() {
  const [ping, setPing] = useState(24);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
       const newPing = Math.floor(Math.random() * 40) + 15; // Mock 15-55ms
       setPing(newPing);
       setHistory(prev => [...prev.slice(1), newPing]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (p: number) => {
    if (p < 50) return 'text-emerald-500';
    if (p < 100) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-black/20 rounded-full backdrop-blur-sm border border-white/5">
       <Activity size={14} className={getColor(ping)} />
       
       {/* Mini Graph */}
       <div className="flex items-end gap-[1px] h-4 w-20">
          {history.map((h, i) => (
             <div 
                key={i} 
                className={`w-1 rounded-t-sm transition-all duration-300 ${getColor(h).replace('text-', 'bg-')}`} 
                style={{ height: `${(h / 100) * 100}%` }}
             />
          ))}
       </div>

       <span className={`text-[10px] font-mono font-bold w-8 text-right ${getColor(ping)}`}>
          {ping}ms
       </span>
    </div>
  );
}

################################################################################