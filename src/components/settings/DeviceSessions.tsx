'use client';
import React, { useState } from 'react';
import { Smartphone, Monitor, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DeviceSessions() {
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', ip: '156.201.x.x', location: 'Cairo, Egypt', current: true, type: 'desktop', lastActive: 'الآن' },
    { id: 2, device: 'Safari on iPhone 14', ip: '41.233.x.x', location: 'Alexandria, Egypt', current: false, type: 'mobile', lastActive: 'منذ 2 ساعة' },
    { id: 3, device: 'Firefox on Mac', ip: '192.168.x.x', location: 'Dubai, UAE', current: false, type: 'desktop', lastActive: 'منذ 3 أيام' },
  ]);

  const revokeSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
             <h3 className="font-bold text-lg">الأجهزة والجلسات النشطة</h3>
             <p className="text-sm text-muted-foreground">أنت مسجل الدخول من هذه الأجهزة حالياً.</p>
          </div>
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
             تسجيل الخروج من كل الأجهزة
          </Button>
       </div>

       <div className="space-y-4">
          {sessions.map((session) => (
             <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-xl bg-card">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-muted rounded-full">
                      {session.type === 'mobile' ? <Smartphone size={24} /> : <Monitor size={24} />}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm flex items-center gap-2">
                         {session.device}
                         {session.current && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">الجهاز الحالي</span>}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                         <span className="flex items-center gap-1"><Globe size={10} /> {session.ip} • {session.location}</span>
                         <span>• نشط {session.lastActive}</span>
                      </div>
                   </div>
                </div>

                {!session.current && (
                   <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-red-500"
                      onClick={() => revokeSession(session.id)}
                      icon={<LogOut size={16} />}
                   >
                      تسجيل خروج
                   </Button>
                )}
             </div>
          ))}
       </div>
    </div>
  );
}
