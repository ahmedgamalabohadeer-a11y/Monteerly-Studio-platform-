'use client';
import React, { useState } from 'react';
import { Skull, Database, WifiOff, ShieldAlert, Play, RotateCcw } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';
import { motion, AnimatePresence } from 'framer-motion';

export function ChaosControl() {
  const [logs, setLogs] = useState<string[]>([]);
  const [systemHealth, setSystemHealth] = useState(100);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const triggerChaos = (type: string) => {
    addLog(`[CHAOS] Initiating ${type} attack...`);
    setSystemHealth(prev => Math.max(0, prev - 30));
    
    // Simulate Self-Healing
    setTimeout(() => {
       addLog(`[SYSTEM] Anomaly detected. Rerouting traffic.`);
    }, 1500);
    setTimeout(() => {
       addLog(`[SYSTEM] New replica spawned. Health restoring.`);
       setSystemHealth(prev => Math.min(100, prev + 30));
    }, 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Attack Panel */}
       <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10 rotate-12"><Skull size={150} /></div>
          
          <h3 className="font-bold text-red-400 mb-6 flex items-center gap-2">
             <Skull size={24} /> منطقة اختبار الكوارث (Chaos Zone)
          </h3>
          
          <div className="space-y-4 relative z-10">
             <div className="flex items-center justify-between p-4 bg-black/40 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-red-500/10 rounded text-red-400"><Database size={20}/></div>
                   <div>
                      <div className="text-white font-bold text-sm">Kill Primary DB</div>
                      <div className="text-[10px] text-red-300">Simulate database crash</div>
                   </div>
                </div>
                <InteractiveButton variant="danger" size="sm" onClick={() => triggerChaos('DB_CRASH')}>EXECUTE</InteractiveButton>
             </div>

             <div className="flex items-center justify-between p-4 bg-black/40 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-red-500/10 rounded text-red-400"><WifiOff size={20}/></div>
                   <div>
                      <div className="text-white font-bold text-sm">Sever Region EU</div>
                      <div className="text-[10px] text-red-300">Cut connection to Europe</div>
                   </div>
                </div>
                <InteractiveButton variant="danger" size="sm" onClick={() => triggerChaos('NET_SPLIT')}>EXECUTE</InteractiveButton>
             </div>
          </div>
       </div>

       {/* System Response Console */}
       <div className="bg-black border border-white/10 rounded-xl p-6 font-mono text-xs flex flex-col h-[300px]">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
             <span className="text-slate-400">System Logs</span>
             <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${systemHealth === 100 ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                <span className={systemHealth === 100 ? 'text-green-400' : 'text-red-400'}>Health: {systemHealth}%</span>
             </div>
          </div>
          
          <div className="flex-1 overflow-hidden relative space-y-2">
             <AnimatePresence>
                {logs.map((log, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex gap-2"
                   >
                      <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log.includes('CHAOS') ? 'text-red-400 font-bold' : 'text-green-400'}>{log}</span>
                   </motion.div>
                ))}
             </AnimatePresence>
             {logs.length === 0 && <div className="text-slate-700 italic">System stable. Waiting for input...</div>}
          </div>
       </div>
    </div>
  );
}

################################################################################