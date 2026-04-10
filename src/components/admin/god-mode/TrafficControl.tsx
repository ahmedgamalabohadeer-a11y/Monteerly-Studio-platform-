'use client';
import React, { useState } from 'react';
import { InteractiveButton } from '@/components/system/InteractiveButton';
import { ShieldAlert, Lock, Unlock, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export function TrafficControl() {
  const [trafficLevel, setTrafficLevel] = useState(10); // Start at 10%
  const [maintenance, setMaintenance] = useState(false);
  const [broadcast, setBroadcast] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Canary Release Control */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <Radio className="text-blue-400" /> التحكم بالتدفق (Canary Rollout)
          </h3>
          
          <div className="mb-8">
             <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                <span>Safe Mode</span>
                <span>Full Scale</span>
             </div>
             <input 
               type="range" 
               min="0" max="100" 
               value={trafficLevel} 
               onChange={(e) => setTrafficLevel(parseInt(e.target.value))}
               className="w-full h-4 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
             />
             <div className="text-center mt-4">
                <span className="text-4xl font-black text-white">{trafficLevel}%</span>
                <p className="text-xs text-slate-500 mt-1">من المستخدمين لديهم حق الوصول الكامل</p>
             </div>
          </div>

          <div className="flex gap-4">
             {[10, 25, 50, 100].map((val) => (
                <button 
                  key={val}
                  onClick={() => setTrafficLevel(val)}
                  className={`flex-1 py-2 rounded border text-xs font-bold transition-colors ${
                     trafficLevel === val 
                     ? 'bg-indigo-500 text-white border-indigo-500' 
                     : 'border-white/10 text-slate-400 hover:bg-white/5'
                  }`}
                >
                   {val}%
                </button>
             ))}
          </div>
       </div>

       {/* Emergency Controls */}
       <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-8 flex flex-col justify-between">
          <div>
             <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                <ShieldAlert /> إجراءات الطوارئ (Emergency)
             </h3>
             
             <div className="flex items-center justify-between p-4 bg-black/40 border border-red-500/20 rounded-xl mb-6">
                <div>
                   <div className="text-white font-bold">وضع الصيانة (Maintenance Mode)</div>
                   <div className="text-xs text-red-300">يغلق الموقع لجميع المستخدمين باستثناء الأدمن.</div>
                </div>
                <button 
                   onClick={() => setMaintenance(!maintenance)}
                   className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 ${
                      maintenance ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
                   }`}
                >
                   {maintenance ? <Lock size={14}/> : <Unlock size={14}/>}
                   {maintenance ? 'ACTIVE' : 'INACTIVE'}
                </button>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400">بث رسالة عاجلة (Global Toast)</label>
                <div className="flex gap-2">
                   <input 
                     value={broadcast}
                     onChange={(e) => setBroadcast(e.target.value)}
                     placeholder="مثال: يرجى حفظ العمل، سنقوم بإعادة التشغيل..." 
                     className="flex-1 bg-black border border-white/10 rounded-lg px-3 text-sm text-white"
                   />
                   <InteractiveButton variant="danger" size="sm">بث الآن</InteractiveButton>
                </div>
             </div>
          </div>
          
          <div className="mt-4 text-[10px] text-red-500/50 font-mono text-center">
             AUTHORIZED PERSONNEL ONLY • IP LOGGED
          </div>
       </div>
    </div>
  );
}
