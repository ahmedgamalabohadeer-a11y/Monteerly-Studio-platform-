'use client';
import React, { useState } from 'react';
import { Server, Globe, ShieldCheck, Map } from 'lucide-react';

export function DataResidency() {
  const [region, setRegion] = useState('ksa');

  const regions = [
    { id: 'ksa', name: 'Riyadh, KSA', flag: '🇸🇦', compliance: ['NCA', 'CITC'], latency: '12ms' },
    { id: 'eg', name: 'Cairo, Egypt', flag: '🇪🇬', compliance: ['EG-DPA'], latency: '45ms' },
    { id: 'eu', name: 'Frankfurt, DE', flag: '🇩🇪', compliance: ['GDPR'], latency: '85ms' },
    { id: 'us', name: 'Virginia, US', flag: '🇺🇸', compliance: ['CCPA', 'SOC2'], latency: '140ms' },
  ];

  return (
    <div className="space-y-6">
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
             <Globe className="text-blue-400" /> السيادة على البيانات (Data Sovereignty)
          </h3>
          <p className="text-sm text-slate-400 mb-6">
             اختر الموقع الجغرافي لتخزين ملفاتك للامتثال للقوانين المحلية.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {regions.map((r) => (
                <div 
                  key={r.id}
                  onClick={() => setRegion(r.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                     region === r.id 
                     ? 'bg-indigo-600/10 border-indigo-500' 
                     : 'bg-black/20 border-white/5 hover:border-white/20'
                  }`}
                >
                   <div className="text-3xl mb-3">{r.flag}</div>
                   <h4 className="font-bold text-white text-sm">{r.name}</h4>
                   <div className="mt-2 flex flex-wrap gap-1">
                      {r.compliance.map(c => (
                         <span key={c} className="text-[9px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded border border-white/5">{c}</span>
                      ))}
                   </div>
                   <div className="mt-2 text-[10px] text-green-400 flex items-center gap-1">
                      <Server size={10} /> Ping: {r.latency}
                   </div>
                   
                   {region === r.id && (
                      <div className="absolute top-2 right-2 text-indigo-400">
                         <ShieldCheck size={18} />
                      </div>
                   )}
                </div>
             ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-xs text-yellow-200">
             <strong>ملاحظة هامة:</strong> تغيير المنطقة يتطلب ترحيل البيانات (Data Migration) وقد يستغرق 24 ساعة.
          </div>
       </div>
    </div>
  );
}

