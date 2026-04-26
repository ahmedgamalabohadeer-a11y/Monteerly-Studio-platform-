'use client';
import React from 'react';

export function EdgeStatus() {
  const regions = [
    { code: 'EG-CAI', name: 'Cairo, Egypt', latency: '12ms', status: 'good' },
    { code: 'SA-RUH', name: 'Riyadh, KSA', latency: '24ms', status: 'good' },
    { code: 'AE-DXB', name: 'Dubai, UAE', latency: '28ms', status: 'good' },
    { code: 'EU-FRA', name: 'Frankfurt, DE', latency: '85ms', status: 'fair' },
    { code: 'US-EST', name: 'N. Virginia, US', latency: '140ms', status: 'fair' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 mt-8">
       <h3 className="font-bold text-white mb-6">Regional Latency (Edge Network)</h3>
       <div className="space-y-1">
          {regions.map((reg) => (
             <div key={reg.code} className="flex items-center justify-between p-3 rounded hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                   <span className="font-mono text-xs text-slate-500 w-12">{reg.code}</span>
                   <span className="text-sm text-slate-300">{reg.name}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${reg.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`} 
                        style={{ width: reg.status === 'good' ? '90%' : '60%' }}
                      />
                   </div>
                   <span className={`text-xs font-mono font-bold w-12 text-right ${reg.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {reg.latency}
                   </span>
                </div>
             </div>
          ))}
       </div>
       <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-slate-500 text-right">
          Powered by Monteerly Edge Network™
       </div>
    </div>
  );
}

################################################################################