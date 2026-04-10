'use client';
import React from 'react';
import { Truck, Clock, CheckCircle, AlertOctagon } from 'lucide-react';

export function VendorStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
       <div className="bg-slate-900 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
             <Truck size={24} />
          </div>
          <div>
             <div className="text-2xl font-bold text-white">45</div>
             <div className="text-xs text-slate-400">طلب نشط (Active)</div>
          </div>
       </div>

       <div className="bg-slate-900 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
             <CheckCircle size={24} />
          </div>
          <div>
             <div className="text-2xl font-bold text-white">98%</div>
             <div className="text-xs text-slate-400">معدل الالتزام (SLA)</div>
          </div>
       </div>

       <div className="bg-slate-900 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg">
             <Clock size={24} />
          </div>
          <div>
             <div className="text-2xl font-bold text-white">12h</div>
             <div className="text-xs text-slate-400">متوسط وقت التسليم</div>
          </div>
       </div>

       <div className="bg-slate-900 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-red-500/20 text-red-400 rounded-lg">
             <AlertOctagon size={24} />
          </div>
          <div>
             <div className="text-2xl font-bold text-white">2</div>
             <div className="text-xs text-slate-400">طلبات متأخرة</div>
          </div>
       </div>
    </div>
  );
}
