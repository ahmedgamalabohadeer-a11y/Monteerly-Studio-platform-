'use client';
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Activity, Server, Database, Globe, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export function ServiceStatus() {
  const services = [
    { name: 'Web Application', status: 'operational', icon: Globe, uptime: '100%' },
    { name: 'Studio Editor (Core)', status: 'operational', icon: Activity, uptime: '99.9%' },
    { name: 'Render Farm (GPU)', status: 'degraded', icon: Server, uptime: '98.5%', note: 'High Load' },
    { name: 'Cloud Storage', status: 'operational', icon: Database, uptime: '99.99%' },
    { name: 'Payments & Escrow', status: 'operational', icon: CreditCard, uptime: '100%' },
  ];

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'operational': return { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Operational', icon: CheckCircle };
      case 'degraded': return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Degraded Performance', icon: AlertTriangle };
      case 'outage': return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Major Outage', icon: XCircle };
      default: return { color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', label: 'Unknown', icon: Activity };
    }
  };

  return (
    <div className="space-y-4">
       {/* Global Status Banner */}
       <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex items-center gap-4 mb-8">
          <div className="p-3 bg-green-500 rounded-full text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]">
             <CheckCircle size={32} />
          </div>
          <div>
             <h2 className="text-2xl font-bold text-white">All Systems Operational</h2>
             <p className="text-green-200">Monteerly OS is running at peak performance.</p>
          </div>
       </div>

       {/* Services Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc, i) => {
             const config = getStatusConfig(svc.status);
             return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900 border border-white/10 p-5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-colors"
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-black/50 text-slate-400 group-hover:text-white transition-colors`}>
                         <svc.icon size={20} />
                      </div>
                      <div>
                         <div className="font-bold text-white text-sm">{svc.name}</div>
                         <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>Uptime: {svc.uptime}</span>
                            {svc.note && <span className="text-yellow-500">• {svc.note}</span>}
                         </div>
                      </div>
                   </div>
                   
                   <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.color} ${config.border}`}>
                      <config.icon size={14} />
                      <span className="hidden sm:inline">{config.label}</span>
                   </div>
                </motion.div>
             );
          })}
       </div>
    </div>
  );
}

################################################################################