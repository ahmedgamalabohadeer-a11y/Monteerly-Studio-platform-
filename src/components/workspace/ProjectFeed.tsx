'use client';
import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

export function ProjectFeed() {
  const activities = [
    { id: 1, user: 'أحمد', action: 'رفع نسخة جديدة', target: 'v3.mp4', time: 'الآن' },
    { id: 2, user: 'سارة', action: 'أضافت تعليقاً', target: 'في الدقيقة 02:14', time: 'منذ 5 دقيقة' },
    { id: 3, user: 'النظام', action: 'اكتملت المعالجة', target: 'Proxies', time: 'منذ 10 دقيقة' },
  ];

  return (
    <div className="bg-muted/10 border-l border-border w-72 h-full flex flex-col">
       <div className="p-3 border-b border-border font-bold text-xs uppercase text-muted-foreground">
          النشاطات الأخيرة
       </div>
       
       <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activities.map((act) => (
             <div key={act.id} className="relative pl-6 border-l border-border last:border-0">
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-background border border-primary rounded-full" />
                
                <div className="flex items-center gap-2 mb-1">
                   <Avatar size="xs" fallback={act.user[0]} />
                   <span className="text-xs font-bold">{act.user}</span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                   {act.action} <span className="text-foreground font-medium">{act.target}</span>
                </p>
                <span className="text-[10px] text-muted-foreground/50 mt-1 block">{act.time}</span>
             </div>
          ))}
       </div>
    </div>
  );
}
