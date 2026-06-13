'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function getInitialCookieBannerState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return !localStorage.getItem('cookie_consent');
}

export function GlobalUX() {
  const [showCookie, setShowCookie] = useState<boolean>(() => getInitialCookieBannerState());
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setCookieConsent = (value: 'accepted' | 'rejected') => {
    localStorage.setItem('cookie_consent', value);
    setShowCookie(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="العودة إلى أعلى الصفحة"
        className={`fixed bottom-8 left-8 z-40 rounded-full bg-primary p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 ${
          showScroll ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      >
        <ArrowUp size={20} />
      </button>

      {showCookie && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-4 backdrop-blur animate-in slide-in-from-bottom-full"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Cookie size={24} />
              </div>
              <p className="text-sm text-muted-foreground">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك في Monteerly. يمكنك قبولها أو رفض غير الضروري
                منها.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCookieConsent('rejected')}>
                رفض
              </Button>
              <Button variant="primary" size="sm" onClick={() => setCookieConsent('accepted')}>
                موافق، لنبدأ
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
