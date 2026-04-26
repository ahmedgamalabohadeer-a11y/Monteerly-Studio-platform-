'use client';
import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CookieSettingsModal } from './CookieSettings'; // نفترض وجود الملف السابق

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // محاكاة التحقق من الكوكيز
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 md:p-6 shadow-2xl border-t border-slate-800 animate-in slide-in-from-bottom-full">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-slate-800 rounded-full hidden sm:block">
                  <Cookie className="text-yellow-400" />
               </div>
               <div>
                  <h4 className="font-bold text-sm mb-1">نحن نستخدم ملفات تعريف الارتباط 🍪</h4>
                  <p className="text-xs text-slate-400 max-w-xl">
                     نستخدم الكوكيز لتحسين تجربتك وتحليل زيارات الموقع. استمرارك في التصفح يعني موافقتك على سياسة الخصوصية.
                  </p>
               </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
               <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 md:flex-none border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => setShowSettings(true)}
               >
                  تخصيص
               </Button>
               <Button 
                  size="sm" 
                  className="flex-1 md:flex-none bg-white text-slate-900 hover:bg-slate-100 font-bold"
                  onClick={() => { localStorage.setItem('cookie_consent', 'true'); setShow(false); }}
               >
                  موافق للكل
               </Button>
            </div>
         </div>
      </div>
      
      {/* Settings Modal Hookup */}
      <CookieSettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

################################################################################