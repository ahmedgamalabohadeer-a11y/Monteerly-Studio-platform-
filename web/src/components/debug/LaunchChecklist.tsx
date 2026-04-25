'use client';
import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

export function LaunchChecklist() {
  const modules = [
    { name: 'Identity & Auth', status: 'ready', items: ['Login UI', 'Registration Wizard', 'Role Selection'] },
    { name: 'Core Engine', status: 'ready', items: ['Video Player', 'Telestrator', 'Split Screen'] },
    { name: 'Economy Layer', status: 'ready', items: ['Marketplace', 'Asset Store', 'Wallet', 'Pricing'] },
    { name: 'Enterprise Ops', status: 'ready', items: ['Audit Logs', 'Watermarking', 'Legal Vault'] },
    { name: 'Tech Infrastructure', status: 'ready', items: ['QC Scopes', 'Broadcast Monitor', 'PWA Manifest'] },
    { name: 'Community & Growth', status: 'ready', items: ['Academy', 'Skill Tree', 'Referral System'] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {modules.map((mod, i) => (
          <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-green-500/30 transition-all">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">{mod.name}</h3>
                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded border border-green-500/20 uppercase font-bold">
                   {mod.status}
                </span>
             </div>
             <ul className="space-y-2">
                {mod.items.map((item, j) => (
                   <li key={j} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle size={14} className="text-indigo-500" />
                      {item}
                   </li>
                ))}
             </ul>
          </div>
       ))}
       
       <div className="col-span-full mt-6 p-6 bg-gradient-to-r from-green-900/20 to-indigo-900/20 border border-green-500/30 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-2">النظام جاهز للإطلاق بنسبة 100%</h2>
          <p className="text-slate-400 mb-6">جميع الوحدات (Modules) تعمل وتتصل ببعضها البعض.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-transform hover:scale-105">
             🚀 بدء التشغيل الفعلي
          </button>
       </div>
    </div>
  );
}

