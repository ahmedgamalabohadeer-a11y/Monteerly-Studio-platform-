'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';

export function SocialProofToast() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ name: '', action: '', time: '' });

  const notifications = [
    { name: 'أحمد من مصر', action: 'اشترى قالب Premiere', time: 'منذ 5 دقائق' },
    { name: 'سارة من السعودية', action: 'وظفت مونتير محترف', time: 'منذ دقيقتين' },
    { name: 'خالد من الإمارات', action: 'انضم لباقة الوكالة', time: 'الآن' },
  ];

  useEffect(() => {
    // Show first notification after 5 seconds
    const timer = setTimeout(() => {
      setData(notifications[0]);
      setShow(true);
    }, 5000);

    // Rotate notifications every 15 seconds
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        const random = notifications[Math.floor(Math.random() * notifications.length)];
        setData(random);
        setShow(true);
      }, 500); // Wait for fade out
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 md:bottom-4 md:left-4 z-40 bg-slate-900/90 backdrop-blur border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-500 max-w-xs">
       <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center shrink-0">
          <ShoppingBag size={18} />
       </div>
       <div className="flex-1">
          <p className="text-xs text-white font-bold">{data.name}</p>
          <p className="text-[10px] text-slate-400">{data.action} • {data.time}</p>
       </div>
       <button onClick={() => setShow(false)} className="text-slate-500 hover:text-white"><X size={12}/></button>
    </div>
  );
}
