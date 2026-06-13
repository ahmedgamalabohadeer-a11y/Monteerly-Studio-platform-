'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const WARNING_DELAY_MS = 30_000;
const SESSION_COUNTDOWN_SECONDS = 60;

export function SessionTimeout() {
  const [timeLeft, setTimeLeft] = useState(SESSION_COUNTDOWN_SECONDS);

  useEffect(() => {
    const warningTimer = window.setTimeout(() => {
      setTimeLeft(SESSION_COUNTDOWN_SECONDS - 1);
    }, WARNING_DELAY_MS);

    return () => window.clearTimeout(warningTimer);
  }, []);

  useEffect(() => {
    if (timeLeft === SESSION_COUNTDOWN_SECONDS || timeLeft <= 0) {
      return;
    }

    const countdownTimer = window.setTimeout(() => {
      setTimeLeft((currentTime) => currentTime - 1);
    }, 1000);

    return () => window.clearTimeout(countdownTimer);
  }, [timeLeft]);

  const showWarning = useMemo(
    () => timeLeft > 0 && timeLeft < SESSION_COUNTDOWN_SECONDS,
    [timeLeft]
  );

  const handleStayLoggedIn = () => {
    setTimeLeft(SESSION_COUNTDOWN_SECONDS);
  };

  const handleLogoutNow = () => {
    alert('Logged out manually');
    setTimeLeft(SESSION_COUNTDOWN_SECONDS);
  };

  const handleSessionExpired = () => {
    alert('Logged out due to inactivity');
    setTimeLeft(SESSION_COUNTDOWN_SECONDS);
  };

  if (timeLeft === 0) {
    handleSessionExpired();
    return null;
  }

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-sm rounded-2xl border border-red-200 bg-card p-6 text-center shadow-2xl animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-live="assertive"
        aria-label="تحذير انتهاء الجلسة"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 animate-pulse">
          <Clock size={32} />
        </div>

        <h2 className="mb-2 text-xl font-bold">انتهاء الجلسة قريباً</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          لم نكتشف أي نشاط مؤخراً. سيتم تسجيل خروجك تلقائياً خلال{' '}
          <span className="font-bold text-red-600">{timeLeft} ثانية</span> لحماية حسابك.
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={handleStayLoggedIn} className="w-full">
            البقاء مسجلاً (أنا موجود)
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogoutNow}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            icon={<LogOut size={16} />}
          >
            تسجيل الخروج الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
