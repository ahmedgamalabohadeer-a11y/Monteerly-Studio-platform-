'use client';
import React, { useState } from 'react';
import { Bell, ShieldAlert, Landmark, GraduationCap } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'dispute', text: 'نزاع جديد: مشروع #99 يحتاج تحكيم فوراً', time: 'منذ دقيقتين', icon: ShieldAlert, color: 'text-red-400' },
  { id: 2, type: 'finance', text: 'تم استلام مبلغ $1,200 من شريك تجاري', time: 'منذ ساعة', icon: Landmark, color: 'text-emerald-400' },
  { id: 3, type: 'academy', text: 'أكمل الموظف (محمد) مسار المونتاج بنجاح', time: 'منذ 3 ساعات', icon: GraduationCap, color: 'text-amber-400' },
];

export function NotificationHub() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShow(!show)}
        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all relative"
      >
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
      </button>

      {show && (
        <>
          <div className="fixed inset-0 z-[140]" onClick={() => setShow(false)} />
          <div className="absolute left-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-in fade-in zoom-in duration-200" dir="rtl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
               <span className="font-bold text-sm">التنبيهات الإدارية</span>
               <span className="text-[10px] text-indigo-400 font-bold cursor-pointer hover:underline">تحديد الكل كمقروء</span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <div key={notif.id} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors flex gap-3 items-start cursor-pointer">
                    <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${notif.color}`}>
                       <Icon size={16} />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs text-slate-200 leading-relaxed mb-1">{notif.text}</p>
                       <span className="text-[10px] text-slate-500">{notif.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 text-center bg-slate-950/50 border-t border-slate-800">
               <button className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors">عرض جميع التنبيهات</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
