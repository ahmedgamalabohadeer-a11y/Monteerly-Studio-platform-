'use client';
import React, { useState, useEffect } from 'react';
import { Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Simulation: Trigger warning after "inactivity"
  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(true), 30000); // Demo: 30 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showWarning && timeLeft > 0) {
      const countdown = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timeLeft === 0) {
      // Logic to logout user
      alert("Logged out due to inactivity");
      setShowWarning(false);
    }
  }, [showWarning, timeLeft]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
       <div className="bg-card max-w-sm w-full rounded-2xl p-6 shadow-2xl border border-red-200 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
             <Clock size={32} />
          </div>
          
          <h2 className="text-xl font-bold mb-2">انتهاء الجلسة قريباً</h2>
          <p className="text-muted-foreground text-sm mb-6">
             لم نكتشف أي نشاط مؤخراً. سيتم تسجيل خروجك تلقائياً خلال <span className="font-bold text-red-600">{timeLeft} ثانية</span> لحماية حسابك.
          </p>

          <div className="flex flex-col gap-3">
             <Button 
                variant="primary" 
                onClick={() => { setShowWarning(false); setTimeLeft(60); }}
                className="w-full"
             >
                البقاء مسجلاً (أنا موجود)
             </Button>
             <Button 
                variant="ghost" 
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
