'use client';
import React from 'react';

export function ShortcutsGuide() {
  const groups = [
    {
      title: 'التحكم بالفيديو',
      keys: [
        { k: 'Space', desc: 'تشغيل / إيقاف' },
        { k: 'J', desc: 'إرجاع للخلف' },
        { k: 'K', desc: 'إيقاف مؤقت' },
        { k: 'L', desc: 'تقديم للأمام' },
        { k: 'F', desc: 'ملء الشاشة' },
      ]
    },
    {
      title: 'الأدوات',
      keys: [
        { k: 'C', desc: 'إضافة تعليق' },
        { k: 'D', desc: 'أداة الرسم' },
        { k: 'M', desc: 'كتم الصوت' },
      ]
    },
    {
      title: 'عام',
      keys: [
        { k: 'Cmd + K', desc: 'لوحة الأوامر' },
        { k: '/', desc: 'بحث' },
        { k: 'Esc', desc: 'إغلاق القوائم' },
      ]
    }
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
       <h3 className="text-xl font-bold text-white mb-6">اختصارات لوحة المفاتيح</h3>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group, i) => (
             <div key={i}>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">{group.title}</h4>
                <div className="space-y-2">
                   {group.keys.map((item, j) => (
                      <div key={j} className="flex justify-between items-center text-sm">
                         <span className="text-slate-300">{item.desc}</span>
                         <kbd className="bg-white/10 border border-white/10 px-2 py-1 rounded text-xs text-white min-w-[30px] text-center font-mono">
                            {item.k}
                         </kbd>
                      </div>
                   ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

