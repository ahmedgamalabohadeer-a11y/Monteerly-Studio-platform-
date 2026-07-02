'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Bell, Clock } from 'lucide-react';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  const notifications = [
    {
      id: 1,
      text: 'تمت الموافقة على مشروع "إعلان رمضان"',
      time: 'منذ دقيقتين',
      type: 'success',
    },
    {
      id: 2,
      text: 'فاتورة جديدة مستحقة بقيمة $150',
      time: 'منذ ساعة',
      type: 'warning',
    },
    {
      id: 3,
      text: 'سارة علي علقت على الفيديو',
      time: 'منذ 3 ساعات',
      type: 'info',
    },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 transition-colors hover:text-white"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-black bg-red-500" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="animate-in fade-in slide-in-from-top-2 absolute left-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 p-3">
              <span className="text-sm font-bold text-white">الإشعارات</span>

              <button
                type="button"
                className="text-[10px] text-indigo-400 hover:underline"
                onClick={() => setUnread(0)}
              >
                تحديد الكل كمقروء
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex cursor-pointer items-start gap-3 border-b border-white/5 p-3 last:border-0 hover:bg-white/5"
                  >
                    <div
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        notif.type === 'success'
                          ? 'bg-green-500'
                          : notif.type === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                    />

                    <div>
                      <p className="text-sm leading-tight text-slate-200">
                        {notif.text}
                      </p>

                      <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                        <Clock size={10} />
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  لا توجد إشعارات جديدة
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-black/20 p-2 text-center">
              <Link
                href="/notifications"
                className="text-xs text-slate-400 hover:text-white"
              >
                عرض كل الإشعارات
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
