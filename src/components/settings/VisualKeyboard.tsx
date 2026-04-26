'use client';
import React, { useState } from 'react';
import { Keyboard } from 'lucide-react';

export function VisualKeyboard() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // تعريف صفوف المفاتيح لمحاكاة الكيبورد
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const shortcuts: Record<string, string> = {
    'C': 'Cut (قص)',
    'V': 'Select (تحديد)',
    'M': 'Marker (علامة)',
    'Space': 'Play/Pause',
    'J': 'Rewind',
    'K': 'Pause',
    'L': 'Fast Forward'
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 overflow-hidden">
       <div className="flex items-center gap-2 mb-6">
          <Keyboard className="text-primary" />
          <h3 className="font-bold">خريطة الاختصارات البصرية</h3>
       </div>

       <div className="flex flex-col gap-2 items-center bg-muted/20 p-8 rounded-2xl border border-border">
          {rows.map((row, i) => (
             <div key={i} className="flex gap-2">
                {row.map((key) => {
                   const action = shortcuts[key];
                   return (
                      <div 
                         key={key}
                         onMouseEnter={() => setHoveredKey(key)}
                         onMouseLeave={() => setHoveredKey(null)}
                         className={`w-12 h-12 rounded-lg border-b-4 flex items-center justify-center font-bold transition-all cursor-pointer relative group
                            ${action ? 'bg-primary text-white border-primary/50 hover:translate-y-1 hover:border-b-0' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                         {key}
                         {/* Tooltip */}
                         {action && (
                            <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                               {action}
                            </div>
                         )}
                      </div>
                   );
                })}
             </div>
          ))}
          {/* Space Bar */}
          <div className="flex gap-2 mt-1">
             <div 
                className="w-64 h-12 bg-primary text-white rounded-lg border-b-4 border-primary/50 flex items-center justify-center font-bold cursor-pointer hover:translate-y-1 hover:border-b-0"
             >
                SPACE (تشغيل / إيقاف)
             </div>
          </div>
       </div>

       <div className="mt-6 text-center text-sm text-muted-foreground">
          {hoveredKey ? (
             <span className="font-bold text-primary">{shortcuts[hoveredKey] || 'غير مخصص'}</span>
          ) : (
             'مرر الماوس فوق المفاتيح لرؤية الأمر المخصص'
          )}
       </div>
    </div>
  );
}

