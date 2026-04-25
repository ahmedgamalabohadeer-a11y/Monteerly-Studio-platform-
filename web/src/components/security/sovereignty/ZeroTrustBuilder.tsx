'use client';
import React, { useState } from 'react';
import { Lock, Plus, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ZeroTrustBuilder() {
  const [rules, setRules] = useState([
    { if: 'User Role', is: 'Freelancer', then: 'Require MFA' },
    { if: 'Location', is: 'Outside KSA', then: 'Block Access' },
    { if: 'Device', is: 'Unmanaged', then: 'Read-Only Mode' },
  ]);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Lock className="text-purple-400" /> سياسات الثقة الصفرية (ZTNA)
          </h3>
          <Button size="sm" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 gap-2">
             <Plus size={14} /> إضافة قاعدة
          </Button>
       </div>

       <div className="space-y-3">
          {rules.map((rule, i) => (
             <div key={i} className="flex items-center gap-2 bg-black/40 border border-white/5 p-3 rounded-lg overflow-x-auto">
                <div className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300 font-bold min-w-[80px] text-center">IF</div>
                <div className="px-3 py-1 bg-indigo-900/30 border border-indigo-500/30 rounded text-xs text-indigo-300 font-mono">{rule.if}</div>
                <span className="text-slate-600 text-xs">is</span>
                <div className="px-3 py-1 bg-indigo-900/30 border border-indigo-500/30 rounded text-xs text-indigo-300 font-mono">{rule.is}</div>
                <ArrowRight size={14} className="text-slate-600" />
                <div className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300 font-bold min-w-[80px] text-center">THEN</div>
                <div className={`px-3 py-1 rounded text-xs font-bold border ${
                   rule.then.includes('Block') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                   rule.then.includes('MFA') ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                   'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                   {rule.then}
                </div>
                <button className="ml-auto text-slate-600 hover:text-red-400"><X size={14}/></button>
             </div>
          ))}
       </div>
    </div>
  );
}

