'use client';
import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Activity, AlertOctagon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveOpsMap() {
  const [activeUsers, setActiveUsers] = useState(1240);
  const [revenue, setRevenue] = useState(15400);
  const [errorRate, setErrorRate] = useState(0.2);

  // Simulate Live Data Feed
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10 - 3));
      setRevenue(prev => prev + Math.floor(Math.random() * 50));
      setErrorRate(prev => Math.max(0, Math.min(5, prev + (Math.random() * 0.1 - 0.05))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
       {/* Real-time Metrics */}
       <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
          <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">Active Sessions</div>
          <div className="text-4xl font-black text-green-400 flex items-center gap-2">
             <Users size={32} /> {activeUsers.toLocaleString()}
          </div>
          <div className="text-[10px] text-green-600 mt-2 flex items-center gap-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Live
          </div>
       </div>

       <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
          <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">Day 0 Revenue</div>
          <div className="text-4xl font-black text-white flex items-center gap-2">
             <DollarSign size={32} className="text-yellow-400" /> {revenue.toLocaleString()}
          </div>
       </div>

       <div className={`border p-6 rounded-2xl transition-colors ${errorRate > 1 ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-900 border-white/10'}`}>
          <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">Error Rate</div>
          <div className={`text-4xl font-black flex items-center gap-2 ${errorRate > 1 ? 'text-red-500' : 'text-blue-400'}`}>
             <AlertOctagon size={32} /> {errorRate.toFixed(2)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-2">Threshold: 1.0%</div>
       </div>

       <div className="bg-black border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
          <Globe size={48} className="text-indigo-500 animate-pulse mb-2" />
          <div className="text-xs font-bold text-white">Global Nodes: 12 Active</div>
          <div className="text-[9px] text-slate-500">Cairo • Riyadh • Dubai • London</div>
       </div>
    </div>
  );
}
