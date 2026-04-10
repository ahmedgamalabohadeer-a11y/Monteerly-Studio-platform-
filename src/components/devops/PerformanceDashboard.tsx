'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Server, Cpu, Database, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function PerformanceDashboard() {
  const [load, setLoad] = useState(45);
  const [pods, setPods] = useState(3);

  // Simulate Load Spikes & Auto-Scaling
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const newLoad = prev + (Math.random() * 20 - 8);
        const clampedLoad = Math.min(100, Math.max(10, newLoad));
        
        // Auto-Scale Logic Simulation
        if (clampedLoad > 80) setPods(p => Math.min(12, p + 1));
        if (clampedLoad < 40) setPods(p => Math.max(2, p - 1));
        
        return clampedLoad;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* Live Metrics */}
       <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                   <Activity className="text-green-400" /> حمل النظام (System Load)
                </h3>
                <span className="text-xs font-mono text-slate-500">Live Update: 200ms</span>
             </div>
             
             {/* Chart Simulation */}
             <div className="h-48 flex items-end gap-1 overflow-hidden relative">
                <div className="absolute inset-0 border-t border-dashed border-red-500/30 top-[20%] text-[10px] text-red-500">Critical Threshold</div>
                {Array.from({length: 40}).map((_, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: '10%' }}
                     animate={{ height: `${Math.random() * load + 10}%` }}
                     transition={{ duration: 0.5 }}
                     className={`flex-1 rounded-t-sm ${load > 80 ? 'bg-red-500' : 'bg-indigo-500'}`}
                   />
                ))}
             </div>
             <div className="mt-4 flex justify-between text-xs text-slate-400 font-mono">
                <span>CPU: {Math.round(load)}%</span>
                <span>RAM: {Math.round(load * 0.8)}%</span>
                <span>IOPS: 4.2k</span>
             </div>
          </div>
       </div>

       {/* Kubernetes Cluster State */}
       <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
             <Server className="text-blue-400" /> البنية السحابية (K8s Cluster)
          </h3>
          
          <div className="flex-1 grid grid-cols-2 gap-4 content-start">
             {Array.from({length: pods}).map((_, i) => (
                <motion.div 
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={i}
                  className="bg-slate-900 border border-white/5 p-3 rounded-lg flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                >
                   <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                   <Cpu size={20} className="text-slate-400" />
                   <div className="text-[10px] font-mono text-slate-300">Node-{i+10}</div>
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                   </div>
                </motion.div>
             ))}
             
             {/* Scaling Indicator */}
             {load > 70 && (
                <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   className="border-2 border-dashed border-white/10 p-3 rounded-lg flex flex-col items-center justify-center gap-1 text-slate-500"
                >
                   <ArrowUp size={20} className="animate-bounce" />
                   <span className="text-[10px]">Scaling Up...</span>
                </motion.div>
             )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-slate-500 text-center">
             Auto-scaling enabled (Min: 2, Max: 50)
          </div>
       </div>
    </div>
  );
}
