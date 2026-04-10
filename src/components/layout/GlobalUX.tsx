'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GlobalUX() {
  const [showCookie, setShowCookie] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Check Cookie Consent
    if (!localStorage.getItem('cookie_consent')) {
      setShowCookie(true);
    }

    // Scroll Listener
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScroll(true);
      else setShowScroll(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookie(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-40 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={20} />
      </button>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur border-t border-border p-4 z-50 animate-in slide-in-from-bottom-full">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                 <Cookie size={24} />
              </div>
              <p className="text-sm text-muted-foreground">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك في Monteerly. باستمرارك، أنت توافق على سياستنا.
              </p>
            </div>
            <div className="flex gap-2">
               <Button variant="ghost" size="sm" onClick={acceptCookies}>رفض</Button>
               <Button variant="primary" size="sm" onClick={acceptCookies}>موافق، لنبدأ</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
