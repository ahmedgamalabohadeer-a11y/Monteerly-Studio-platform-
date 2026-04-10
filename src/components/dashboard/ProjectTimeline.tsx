'use client';
import React from 'react';
import { CalendarDays } from 'lucide-react';

export function ProjectTimeline() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1); // Mock 2 weeks

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
       <div className="p-4 border-b border-border bg-muted/10 flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2"><CalendarDays size={16} /> الجدول الزمني (يناير 2026)</h3>
          <div className="flex gap-2 text-xs">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> تصوير</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> مونتاج</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> مراجعة</span>
          </div>
       </div>

       <div className="overflow-x-auto">
          <div className="min-w-[800px]">
             {/* Header Days */}
             <div className="flex border-b border-border">
                <div className="w-48 p-3 text-sm font-bold border-l border-border bg-muted/5 shrink-0">المهمة</div>
                {days.map(d => (
                   <div key={d} className="flex-1 min-w-[40px] text-center py-2 text-xs text-muted-foreground border-l border-border/50">
                      {d}
                   </div>
                ))}
             </div>

             {/* Task Rows */}
             <TimelineRow title="كتابة السكربت" start={1} duration={3} color="bg-blue-500" days={days} />
             <TimelineRow title="التصوير الميداني" start={4} duration={2} color="bg-blue-600" days={days} />
             <TimelineRow title="المونتاج الأولي" start={6} duration={4} color="bg-purple-500" days={days} />
             <TimelineRow title="تصحيح الألوان" start={9} duration={2} color="bg-purple-600" days={days} />
             <TimelineRow title="مراجعة العميل" start={11} duration={2} color="bg-emerald-500" days={days} />
          </div>
       </div>
    </div>
  );
}

function TimelineRow({ title, start, duration, color, days }: any) {
    return (
        <div className="flex border-b border-border hover:bg-muted/5 transition-colors">
            <div className="w-48 p-3 text-sm font-medium border-l border-border shrink-0 truncate">{title}</div>
            <div className="flex-1 flex relative py-3">
               {/* Grid Lines */}
               {days.map((d: number) => (
                   <div key={d} className="flex-1 border-l border-border/30 h-full absolute top-0 bottom-0" style={{ left: `${((d-1)/days.length)*100}%` }} />
               ))}
               
               {/* Bar */}
               <div 
                  className={`h-6 rounded-md shadow-sm ${color} relative z-10 opacity-90 hover:opacity-100 cursor-pointer`}
                  style={{
                     marginLeft: `${((start - 1) / days.length) * 100}%`,
                     width: `${(duration / days.length) * 100}%`
                  }}
               >
                   <span className="text-[10px] text-white px-2 leading-6 block truncate drop-shadow-md">
                      {duration} يوم
                   </span>
               </div>
            </div>
        </div>
    )
}
