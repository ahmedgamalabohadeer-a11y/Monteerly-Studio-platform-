'use client';

import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type BeforeInstallPromptOutcome = 'accepted' | 'dismissed';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: BeforeInstallPromptOutcome;
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShow(false);
    }

    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <div className="fixed left-1/2 top-4 z-[100] flex -translate-x-1/2 items-center gap-4 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-white shadow-2xl animate-in slide-in-from-top-4">
      <span className="text-sm font-bold">
        ثبت تطبيق Monteerly لتجربة أفضل 🚀
      </span>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="h-8 rounded-full bg-primary px-4 text-xs text-white hover:bg-primary/90"
          onClick={handleInstall}
        >
          <Download size={14} className="mr-1" />
          تثبيت
        </Button>

        <button
          type="button"
          onClick={() => setShow(false)}
          className="transition-colors hover:text-red-400"
          aria-label="إغلاق إشعار تثبيت التطبيق"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
