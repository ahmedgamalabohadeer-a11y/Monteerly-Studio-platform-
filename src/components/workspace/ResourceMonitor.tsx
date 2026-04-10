'use client';
import React, { useEffect, useState } from 'react';
import { Cpu, Activity } from 'lucide-react';

export function ResourceMonitor() {
  const [memory, setMemory] = useState(0); // in MB
  const [load, setLoad] = useState(0); // percentage

  useEffect(() => {
    // Simulation of monitoring loop
    const interval = setInterval(() => {
      setMemory(Math.floor(Math.random() * 200) + 400); // Mock 400-600MB
      setLoad(Math.floor(Math.random() * 30) + 10); // Mock 10-40%
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 bg-black/80 backdrop-blur text-white p-2 rounded-lg text-xs font-mono border border-white/10 flex items-center gap-4 shadow-lg select-none">
       <div className="flex items-center gap-2">
          <Cpu size={14} className={load > 80 ? 'text-red-500' : 'text-emerald-500'} />
          <span>CPU: {load}%</span>
       </div>
       <div className="w-[1px] h-3 bg-white/20" />
       <div className="flex items-center gap-2">
          <Activity size={14} className="text-blue-500" />
          <span>RAM: {memory}MB</span>
       </div>
       {memory > 800 && (
          <span className="text-red-400 font-bold ml-2">High Usage!</span>
       )}
    </div>
  );
}
