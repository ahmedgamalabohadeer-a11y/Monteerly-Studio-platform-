'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { X } from 'lucide-react';

type SocialEvent = {
  name: string;
  action: string;
  image: string;
};

const events: SocialEvent[] = [
  { name: 'سارة من الرياض', action: 'اشترت باقة Pro', image: '/avatars/sara.jpg' },
  { name: 'استوديو لمسات', action: 'أنشأ مشروع جديد', image: '/images/features/agency.jpg' },
  { name: 'محمد من دبي', action: 'وظف محرر فيديو', image: '/avatars/mohamed.jpg' },
  { name: 'أحمد كمال', action: 'سحب أرباحه للتو', image: '/avatars/ahmed.jpg' },
];

export function LiveSocialProof() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<SocialEvent>(events[0]);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerNotification = useCallback(() => {
    const randomEvent = events[Math.floor(Math.random() * events.length)];

    setData(randomEvent);
    setVisible(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerNotification();
    }, 5000);

    const interval = setInterval(() => {
      triggerNotification();
    }, 20000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [triggerNotification]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 p-3 pr-8 rounded-xl shadow-2xl flex items-center gap-3 relative max-w-sm">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-1 right-1 text-slate-500 hover:text-white p-1"
          aria-label="إغلاق الإشعار"
        >
          <X size={12} />
        </button>

        <div className="relative">
          <Avatar src={data.image} fallback={data.name[0] ?? '؟'} />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse" />
        </div>

        <div>
          <div className="text-sm font-bold text-white">{data.name}</div>
          <div className="text-xs text-indigo-300">{data.action}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">منذ دقيقة</div>
        </div>
      </div>
    </div>
  );
}
