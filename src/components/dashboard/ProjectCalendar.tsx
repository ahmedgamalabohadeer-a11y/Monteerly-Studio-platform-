'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock days grid

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       {/* Header */}
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <h3 className="font-bold text-lg">يناير 2026</h3>
          <div className="flex gap-2">
             <button className="p-1 hover:bg-muted rounded"><ChevronRight size={20} /></button>
             <button className="p-1 hover:bg-muted rounded"><ChevronLeft size={20} /></button>
          </div>
       </div>

       {/* Days Header */}
       <div className="grid grid-cols-7 border-b border-border text-center bg-muted/5">
          {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(d => (
             <div key={d} className="py-2 text-xs font-bold text-muted-foreground">{d}</div>
          ))}
       </div>

       {/* Grid */}
       <div className="grid grid-cols-7 auto-rows-[100px] divide-x divide-x-reverse divide-y divide-border">
          {days.map((day) => {
             const d = day > 31 ? day - 31 : day; // Mock wrap
             const isCurrentMonth = day <= 31;
             
             return (
                <div key={day} className={`p-2 relative ${!isCurrentMonth ? 'bg-muted/10 text-muted-foreground' : ''}`}>
                   <span className="text-xs font-bold block mb-1">{d}</span>
                   
                   {/* Events Mock */}
                   {day === 12 && (
                      <div className="bg-red-100 text-red-700 text-[10px] p-1 rounded mb-1 truncate font-bold border-l-2 border-red-500 cursor-pointer hover:opacity-80">
                         تسليم إعلان بيبسي
                      </div>
                   )}
                   {day === 15 && (
                      <div className="bg-blue-100 text-blue-700 text-[10px] p-1 rounded mb-1 truncate font-bold border-l-2 border-blue-500 cursor-pointer hover:opacity-80">
                         تصوير موقع خارجي
                      </div>
                   )}
                </div>
             );
          })}
       </div>
    </div>
  );
}

