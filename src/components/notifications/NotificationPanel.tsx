'use client';
import React from 'react';
import { Bell, Check, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotificationPanel() {
  const notifs = [
    { title: 'تم اعتماد الفيديو', desc: 'قام العميل بالموافقة على النسخة v3', type: 'success', time: 'منذ دقيقتين' },
    { title: 'تعليق جديد', desc: 'سارة: هل يمكن تعديل الموسيقى؟', type: 'info', time: 'منذ 15 دقيقة' },
    { title: 'اقترب الموعد النهائي', desc: 'مشروع إعلان رمضان ينتهي غداً', type: 'warning', time: 'منذ ساعة' },
  ];

  const icons = {
    success: <Check size={16} className="text-green-400" />,
    info: <Clock size={16} className="text-blue-400" />,
    warning: <AlertTriangle size={16} className="text-yellow-400" />,
  };

  return (
    <div className="absolute top-16 left-4 md:left-20 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2">
       <div className="p-3 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h4 className="font-bold text-white text-sm">الإشعارات</h4>
          <button className="text-[10px] text-indigo-400 hover:text-indigo-300">تحديد الكل كمقروء</button>
       </div>
       <div className="max-h-80 overflow-y-auto">
          {notifs.map((n, i) => (
             <div key={i} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                <div className={`mt-1 p-1.5 rounded-full shrink-0 ${
                   n.type === 'success' ? 'bg-green-500/10' : n.type === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                }`}>
                   {icons[n.type as keyof typeof icons]}
                </div>
                <div>
                   <h5 className="text-sm font-bold text-white mb-0.5">{n.title}</h5>
                   <p className="text-xs text-slate-400 leading-snug">{n.desc}</p>
                   <span className="text-[10px] text-slate-600 mt-1 block">{n.time}</span>
                </div>
             </div>
          ))}
       </div>
       <div className="p-2 bg-black/20 text-center">
          <button className="text-xs text-slate-400 hover:text-white transition-colors">عرض كل السجل</button>
       </div>
    </div>
  );
}
