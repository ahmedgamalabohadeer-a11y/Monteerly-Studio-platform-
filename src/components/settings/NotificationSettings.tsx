'use client';
import React from 'react';
import { Mail, Smartphone, Bell } from 'lucide-react';

export function NotificationSettings() {
  const groups = [
    {
      title: 'تحديثات المشاريع',
      items: [
        { label: 'تعليق جديد على الفيديو', email: true, push: true },
        { label: 'تم تغيير حالة المشروع', email: true, push: true },
        { label: 'تم رفع ملف جديد', email: false, push: true },
      ]
    },
    {
      title: 'السوق والمالية',
      items: [
        { label: 'استلمت عرض عمل جديد', email: true, push: true },
        { label: 'تم إصدار الفاتورة', email: true, push: false },
        { label: 'تنبيهات العروض والخصومات', email: false, push: false },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-3xl">
       {groups.map((group, i) => (
          <div key={i} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
             <div className="p-4 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-white">{group.title}</h3>
             </div>
             <div className="divide-y divide-white/5">
                {group.items.map((item, j) => (
                   <div key={j} className="p-4 flex items-center justify-between">
                      <span className="text-sm text-slate-300">{item.label}</span>
                      <div className="flex gap-4">
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={item.email} className="rounded bg-black/30 border-white/20 accent-indigo-500" />
                            <Mail size={16} className={item.email ? "text-white" : "text-slate-600"} />
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={item.push} className="rounded bg-black/30 border-white/20 accent-indigo-500" />
                            <Smartphone size={16} className={item.push ? "text-white" : "text-slate-600"} />
                         </label>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       ))}
    </div>
  );
}
