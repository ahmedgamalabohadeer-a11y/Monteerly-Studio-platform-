'use client';
import React, { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TimeTracker() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-full p-1 pl-4 shadow-sm">
       <div className="flex items-center gap-2 text-sm font-mono font-bold w-20">
          <Clock size={14} className="text-muted-foreground" />
          <span className={isActive ? "text-primary animate-pulse" : "text-foreground"}>
             {formatTime(seconds)}
          </span>
       </div>

       <div className="h-6 w-[1px] bg-border mx-1" />

       <input 
          placeholder="ماذا تعمل الآن؟" 
          className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground hidden md:block"
          disabled={isActive}
       />

       <Button 
          size="sm" 
          variant={isActive ? "danger" : "primary"} 
          className="rounded-full h-8 px-4"
          onClick={() => setIsActive(!isActive)}
          icon={isActive ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
       >
          {isActive ? 'إيقاف' : 'بدء'}
       </Button>
    </div>
  );
}
