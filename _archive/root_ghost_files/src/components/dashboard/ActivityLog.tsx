'use client';
import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

export function ActivityLog() {
  const activities = [
    { user: 'سارة أحمد', action: 'رفعت ملف جديد', target: 'Final_Render_v3.mp4', time: 'منذ 5 دقائق', avatar: '/avatars/sara.jpg' },
    { user: 'محمد علي', action: 'أضاف تعليقاً في', target: 'مشروع إعلان السيارات', time: 'منذ 12 دقيقة', avatar: '/avatars/mohamed.jpg' },
    { user: 'النظام', action: 'تم إصدار الفاتورة', target: '#INV-2026-001', time: 'منذ ساعة', avatar: '' },
    { user: 'أحمد كمال', action: 'انضم للفريق', target: 'Agency Team', time: 'منذ ساعتين', avatar: '/avatars/ahmed.jpg' },
  ];

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 h-full">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white">النشاط الأخير</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300">عرض الكل</button>
       </div>
       
       <div className="space-y-6">
          {activities.map((act, i) => (
             <div key={i} className="flex gap-3 relative">
                {/* Connector Line */}
                {i !== activities.length - 1 && (
                   <div className="absolute top-10 right-4 w-px h-full bg-white/5" />
                )}
                
                <Avatar src={act.avatar} fallback={act.user[0]} size="sm" />
                
                <div>
                   <p className="text-sm text-slate-300">
                      <span className="font-bold text-white">{act.user}</span> {act.action} <span className="text-indigo-300">{act.target}</span>
                   </p>
                   <span className="text-xs text-slate-500">{act.time}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################