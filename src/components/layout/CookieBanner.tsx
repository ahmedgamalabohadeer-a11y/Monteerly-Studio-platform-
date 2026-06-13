'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

type CookieConsent = 'accepted' | 'rejected';

function getInitialBannerState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return !localStorage.getItem('cookie_consent');
}

export function CookieBanner() {
  const [show, setShow] = useState<boolean>(() => getInitialBannerState());

  const handleConsent = (value: CookieConsent) => {
    localStorage.setItem('cookie_consent', value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-emerald-500/10 p-2 text-emerald-400">
          <ShieldCheck size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="mb-1 text-sm font-semibold text-white">إعدادات ملفات تعريف الارتباط</h3>
          <p className="text-sm leading-6 text-slate-300">
            نستخدم ملفات تعريف الارتباط لتحسين الأداء، وتخصيص التجربة، وفهم كيفية استخدام المنصة. يمكنك
            قبولها أو رفض غير الضروري منها.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleConsent('accepted')}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              قبول
            </button>

            <button
              type="button"
              onClick={() => handleConsent('rejected')}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              رفض غير الضروري
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
