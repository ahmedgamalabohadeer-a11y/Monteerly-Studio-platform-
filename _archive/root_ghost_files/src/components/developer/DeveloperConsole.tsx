'use client';
import React, { useState } from 'react';
import { Key, Globe, BarChart3, Plus, Copy, Eye, EyeOff } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';
import { motion } from 'framer-motion';

export function DeveloperConsole() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey] = useState('sk_live_51Mxq8...');

  const apps = [
    { id: 1, name: 'AI Color Grader Pro', status: 'Live', users: '12.5k', revenue: '$4,200' },
    { id: 2, name: 'Tiktok Auto-Clipper', status: 'Review', users: '-', revenue: '-' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Sidebar / Overview */}
       <div className="lg:col-span-2 space-y-6">
          {/* API Keys Section */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                   <Key className="text-yellow-400" /> مفاتيح الربط (API Keys)
                </h3>
                <InteractiveButton size="sm" variant="secondary" icon={<Plus size={14}/>}>مفتاح جديد</InteractiveButton>
             </div>
             
             <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex justify-between items-center">
                <div>
                   <div className="text-xs text-slate-400 font-bold mb-1">Production Key</div>
                   <div className="font-mono text-white text-sm tracking-wider">
                      {showKey ? apiKey : 'sk_live_••••••••••••••••'}
                   </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setShowKey(!showKey)} className="p-2 hover:bg-white/10 rounded text-slate-400">
                      {showKey ? <EyeOff size={16}/> : <Eye size={16}/>}
                   </button>
                   <button className="p-2 hover:bg-white/10 rounded text-slate-400">
                      <Copy size={16}/>
                   </button>
                </div>
             </div>
             <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1">
                ⚠️ لا تشارك هذا المفتاح أبداً في كود الواجهة الأمامية (Client-side).
             </p>
          </div>

          {/* My Apps */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="text-blue-400" /> تطبيقاتي (My Plugins)
             </h3>
             <div className="space-y-4">
                {apps.map((app) => (
                   <div key={app.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                      <div>
                         <div className="font-bold text-white">{app.name}</div>
                         <div className="flex items-center gap-2 text-xs mt-1">
                            <span className={`px-2 py-0.5 rounded ${
                               app.status === 'Live' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                            }`}>{app.status}</span>
                            <span className="text-slate-500">• ID: app_{app.id}882</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-white">{app.revenue}</div>
                         <div className="text-xs text-slate-500">{app.users} installs</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Analytics Panel */}
       <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black border border-white/10 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-6">
             <BarChart3 className="text-indigo-400" />
             <h3 className="font-bold">إحصائيات الاستخدام</h3>
          </div>
          
          <div className="space-y-6">
             <div>
                <div className="text-3xl font-black mb-1">1.2M</div>
                <div className="text-xs text-indigo-200">API Calls (This Month)</div>
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-indigo-500" />
                </div>
             </div>
             
             <div>
                <div className="text-3xl font-black mb-1">99.9%</div>
                <div className="text-xs text-green-200">Uptime Reliability</div>
             </div>

             <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="text-xs text-slate-400 mb-2">Most Used Endpoint</div>
                <div className="font-mono text-xs bg-black p-2 rounded text-green-400">POST /v1/render</div>
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################