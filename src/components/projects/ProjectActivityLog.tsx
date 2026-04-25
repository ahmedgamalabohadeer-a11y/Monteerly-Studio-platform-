'use client';
import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

export function ProjectActivityLog() {
  const activities = [
    { id: 1, user: 'أحمد', action: 'رفع نسخة جديدة', target: 'v3.mp4', time: '10:30 AM' },
    { id: 2, user: 'سارة', action: 'أضافت 3 تعليقات', target: 'على v3.mp4', time: '10:45 AM' },
    { id: 3, user: 'محمد', action: 'قام بتغيير الحالة', target: 'إلى "مراجعة"', time: '11:00 AM' },
    { id: 4, user: 'النظام', action: 'أكمل المعالجة', target: 'Proxies', time: '11:05 AM' },
  ];

  return (
    <div className="h-full flex flex-col">
       <div className="p-4 border-b border-border font-bold text-sm">سجل نشاط المشروع</div>
       
       <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activities.map((act, i) => (
             <div key={act.id} className="relative pl-6 border-l border-border last:border-0 pb-2">
                {/* Timeline Dot */}
                <div className="absolute -left-1.5 top-1 w-3 h-3 bg-background border-2 border-primary rounded-full" />
                
                <div className="flex items-start gap-3">
                   <Avatar fallback={act.user[0]} size="xs" />
                   <div>
                      <p className="text-sm">
                         <span className="font-bold">{act.user}</span> {act.action} <span className="text-muted-foreground">{act.target}</span>
                      </p>
                      <span className="text-[10px] text-muted-foreground block mt-1">{act.time}</span>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################