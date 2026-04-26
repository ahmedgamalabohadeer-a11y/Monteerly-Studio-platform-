'use client';
import React, { useEffect, useState } from 'react';
import { X, Command } from 'lucide-react';

export function ShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === '?') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl border border-border shadow-2xl">
          <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border p-6 flex justify-between items-center z-10">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Command size={24} /></div>
                <h2 className="text-2xl font-bold">دليل الاختصارات السريعة</h2>
             </div>
             <button onClick={() => setIsOpen(false)} className="hover:bg-muted p-2 rounded-full"><X size={24} /></button>
          </div>

          <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <ShortcutGroup title="التنقل والتشغيل">
                <ShortcutRow keys={['Space']} desc="تشغيل / إيقاف" />
                <ShortcutRow keys={['J', 'K', 'L']} desc="إرجاع / إيقاف / تقديم" />
                <ShortcutRow keys={['←', '→']} desc="إطار للخلف / للأمام" />
                <ShortcutRow keys={['Shift', 'Z']} desc="توسيع للكل (Zoom to Fit)" />
             </ShortcutGroup>

             <ShortcutGroup title="أدوات التحرير">
                <ShortcutRow keys={['C']} desc="أداة القطع (Razor)" />
                <ShortcutRow keys={['V']} desc="أداة التحديد (Selection)" />
                <ShortcutRow keys={['A']} desc="تحديد المسار للأمام" />
                <ShortcutRow keys={['Delete']} desc="حذف وتموج (Ripple Delete)" />
             </ShortcutGroup>

             <ShortcutGroup title="العلامات والنقاط">
                <ShortcutRow keys={['I', 'O']} desc="تحديد نقطة الدخول / الخروج" />
                <ShortcutRow keys={['M']} desc="إضافة علامة (Marker)" />
                <ShortcutRow keys={['Ctrl', 'S']} desc="حفظ المشروع" />
             </ShortcutGroup>
          </div>
       </div>
    </div>
  );
}

function ShortcutGroup({ title, children }: any) {
    return (
        <div>
            <h3 className="font-bold text-muted-foreground mb-4 uppercase text-xs tracking-wider">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    )
}

function ShortcutRow({ keys, desc }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm">{desc}</span>
            <div className="flex gap-1">
               {keys.map((k: string) => (
                  <kbd key={k} className="bg-muted border border-border px-2 py-0.5 rounded text-xs font-mono font-bold min-w-[24px] text-center shadow-sm text-foreground">
                     {k}
                  </kbd>
               ))}
            </div>
        </div>
    )
}

