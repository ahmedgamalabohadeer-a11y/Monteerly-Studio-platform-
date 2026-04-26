'use client';
import React, { useState } from 'react';
import { ShieldAlert, Lock, Unlock, Radio, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function TrafficControl() {
  const [trafficLevel, setTrafficLevel] = useState(10); // تبدأ من 10%
  const [maintenance, setMaintenance] = useState(false);
  const [broadcast, setBroadcast] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Canary Release Control (التحكم في التحديثات التجريبية) */}
       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Radio className="text-indigo-400" />
            <h3 className="text-xl font-bold text-white">توجيه الترافيك (Canary Release)</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">التحكم في نسبة المستخدمين الذين تصلهم التحديثات الجديدة للنظام (الإصدار التجريبي).</p>

          <div className="mb-6">
             <div className="flex justify-between text-sm text-white font-bold mb-2">
                <span className="text-indigo-400">{trafficLevel}% V2 (الجديد)</span>
                <span className="text-slate-400">{100 - trafficLevel}% V1 (المستقر)</span>
             </div>
             <input
                type="range"
                min="0" max="100" step="10"
                value={trafficLevel}
                onChange={(e) => setTrafficLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
             />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
             تطبيق نسبة التوجيه
          </button>
       </div>

       {/* Emergency & Maintenance (الطوارئ والصيانة) */}
       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="text-red-400" />
            <h3 className="text-xl font-bold text-white">وضع الطوارئ والصيانة</h3>
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                <div>
                   <h4 className="font-bold text-white flex items-center gap-2">
                      {maintenance ? <Lock size={16} className="text-red-400"/> : <Unlock size={16} className="text-green-400"/>}
                      وضع الصيانة (Maintenance Mode)
                   </h4>
                   <p className="text-xs text-slate-400 mt-1">منع دخول المستخدمين باستثناء المدراء (Admins).</p>
                </div>
                <button
                   onClick={() => setMaintenance(!maintenance)}
                   className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${maintenance ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                   {maintenance ? 'إلغاء الصيانة' : 'تفعيل الصيانة'}
                </button>
             </div>

             <div>
                <label className="block text-sm text-slate-400 mb-2">رسالة بث عاجلة (Global Broadcast)</label>
                <div className="flex gap-2">
                   <input
                      type="text"
                      value={broadcast}
                      onChange={(e) => setBroadcast(e.target.value)}
                      placeholder="مثال: سيتم إيقاف السيرفر للتحديث بعد 10 دقائق..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                   />
                   <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-lg shadow-amber-600/20">
                      <AlertTriangle size={16} /> بث
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
