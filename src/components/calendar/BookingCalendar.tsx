'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => i + 12); // Mock dates
  const times = ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white">احجز جلسة استشارة</h3>
          <div className="flex gap-2">
             <button className="p-1 hover:bg-white/10 rounded"><ChevronRight size={16} className="text-slate-400" /></button>
             <span className="text-sm font-bold text-white">يناير 2026</span>
             <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={16} className="text-slate-400" /></button>
          </div>
       </div>

       {/* Days */}
       <div className="grid grid-cols-7 gap-2 mb-6 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
             <div key={i} className="text-[10px] text-slate-500 font-bold uppercase">{d}</div>
          ))}
          {dates.map((d) => (
             <button 
               key={d}
               onClick={() => setSelectedDate(d)}
               className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  selectedDate === d ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300 hover:bg-white/5'
               }`}
             >
                {d}
             </button>
          ))}
       </div>

       {/* Time Slots */}
       <div className="space-y-3 mb-6">
          <h4 className="text-xs text-slate-400 font-bold uppercase mb-2">المواعيد المتاحة</h4>
          <div className="grid grid-cols-2 gap-2">
             {times.map((t) => (
                <button 
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all flex justify-between items-center ${
                     selectedTime === t 
                     ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' 
                     : 'bg-black/20 border-white/5 text-slate-300 hover:border-white/10'
                  }`}
                >
                   <span className="flex items-center gap-2"><Clock size={12} /> {t}</span>
                   {selectedTime === t && <Check size={12} />}
                </button>
             ))}
          </div>
       </div>

       <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between items-center mb-4">
             <span className="text-slate-400 text-sm">السعر (ساعة)</span>
             <span className="text-white font-bold">$150.00</span>
          </div>
          <Button className="w-full bg-white text-black font-bold hover:bg-slate-200" disabled={!selectedTime}>
             تأكيد الحجز والدفع
          </Button>
       </div>
    </div>
  );
}
