'use client';
import React from 'react';
import { Smartphone, Monitor, Globe, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DeviceSessions() {
  const sessions = [
    { id: 1, device: 'MacBook Pro M3', os: 'macOS Sonoma', app: 'Chrome', ip: '156.204.x.x', location: 'Cairo, Egypt', current: true, icon: Monitor },
    { id: 2, device: 'iPhone 15 Pro', os: 'iOS 18', app: 'Mobile App', ip: '192.168.x.x', location: 'Alexandria, Egypt', current: false, icon: Smartphone },
    { id: 3, device: 'Windows PC', os: 'Windows 11', app: 'Firefox', ip: '45.33.xx.xx', location: 'London, UK', current: false, icon: Monitor },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">الأجهزة المتصلة</h3>
          <Button variant="outline" className="text-red-400 border-red-500/20 hover:bg-red-500/10 text-xs gap-2">
             <LogOut size={14} /> تسجيل خروج من جميع الأجهزة
          </Button>
       </div>

       <div className="space-y-4">
          {sessions.map((session) => (
             <div key={session.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                      <session.icon size={24} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2">
                         <span className="font-bold text-white text-sm">{session.device}</span>
                         {session.current && <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">الجهاز الحالي</span>}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                         <span>{session.os} • {session.app}</span>
                         <span className="w-1 h-1 bg-slate-600 rounded-full" />
                         <span className="flex items-center gap-1"><Globe size={10} /> {session.location}</span>
                      </div>
                   </div>
                </div>
                
                {!session.current && (
                   <button className="text-slate-500 hover:text-red-400 p-2 hover:bg-white/5 rounded-full transition-colors" title="Revoke Access">
                      <Trash2 size={16} />
                   </button>
                )}
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################