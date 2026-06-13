'use client';
import React, { useEffect, useState } from 'react';
import { Keyboard, X } from 'lucide-react';

export function ShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.metaKey || e.ctrlKey)) {
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
       <div className="bg-card w-full max-w-2xl rounded-2xl p-8 shadow-2xl border border-border relative">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"><X size={24} /></button>
          
          <div className="flex items-center gap-3 mb-8">
             <Keyboard size={32} className="text-primary" />
             <h2 className="text-2xl font-bold">اختصارات لوحة المفاتيح</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <ShortcutGroup title="عام">
                <Shortcut keys={['Ctrl', 'K']} desc="البحث السريع" />
                <Shortcut keys={['Ctrl', '?']} desc="فتح هذه القائمة" />
                <Shortcut keys={['Esc']} desc="إغلاق النوافذ" />
             </ShortcutGroup>

             <ShortcutGroup title="مساحة العمل (Workspace)">
                <Shortcut keys={['Space']} desc="تشغيل / إيقاف الفيديو" />
                <Shortcut keys={['J', 'K', 'L']} desc="تحكم في السرعة" />
                <Shortcut keys={['M']} desc="إضافة تعليق (Marker)" />
                <Shortcut keys={['F']} desc="ملء الشاشة" />
             </ShortcutGroup>
          </div>
       </div>
    </div>
  );
}

function ShortcutGroup({ title, children }: unknown) {
    return (
        <div>
            <h3 className="font-bold text-muted-foreground mb-4 border-b border-border pb-2">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    )
}

function Shortcut({ keys, desc }: { keys: string[], desc: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{desc}</span>
            <div className="flex gap-1">
                {keys.map(k => (
                    <kbd key={k} className="px-2 py-1 bg-muted border border-border rounded-md text-xs font-mono font-bold text-foreground min-w-[24px] text-center shadow-sm">
                        {k}
                    </kbd>
                ))}
            </div>
        </div>
    )
}

