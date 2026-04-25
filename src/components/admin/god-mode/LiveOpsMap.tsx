'use client';
import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Activity, AlertOctagon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveOpsMap() {
  const [activeUsers, setActiveUsers] = useState(1240);
  const [revenue, setRevenue] = useState(15400);
  const [errorRate, setErrorRate] = useState(0.2);

  // محاكاة تدفق البيانات الحية للسيرفر
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10 - 3));
      setRevenue(prev => prev + Math.floor(Math.random() * 50));
      setErrorRate(prev => Math.max(0, prev + (Math.random() * 0.1 - 0.05)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
       <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="text-indigo-400" /> خريطة العمليات الحية
          </h2>
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> متصل (Live)
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl hover:border-slate-600 transition-colors">
             <div className="flex items-center gap-2 text-slate-400 mb-2"><Users size={16}/> المستخدمين المتصلين</div>
             <div className="text-3xl font-black text-white">{activeUsers.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl hover:border-slate-600 transition-colors">
             <div className="flex items-center gap-2 text-slate-400 mb-2"><DollarSign size={16}/> الإيرادات اللحظية</div>
             <div className="text-3xl font-black text-green-400">${revenue.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl hover:border-slate-600 transition-colors">
             <div className="flex items-center gap-2 text-slate-400 mb-2"><AlertOctagon size={16}/> معدل الأخطاء (Error Rate)</div>
             <div className={`text-3xl font-black ${errorRate > 0.5 ? 'text-red-400' : 'text-blue-400'}`}>{errorRate.toFixed(2)}%</div>
          </div>
       </div>
    </div>
  );
}
