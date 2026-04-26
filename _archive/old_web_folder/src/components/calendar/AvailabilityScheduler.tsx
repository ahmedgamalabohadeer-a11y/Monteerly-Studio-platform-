'use client';
import React, { useState } from 'react';
import { Clock, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AvailabilityScheduler() {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    'الأحد': ['09:00 - 17:00'],
    'الإثنين': ['09:00 - 17:00'],
    'الخميس': ['10:00 - 14:00', '16:00 - 20:00']
  });

  const addSlot = (day: string) => {
    const slots = schedule[day] || [];
    setSchedule({ ...schedule, [day]: [...slots, '09:00 - 17:00'] });
  };

  const removeSlot = (day: string, index: number) => {
    const slots = schedule[day].filter((_, i) => i !== index);
    setSchedule({ ...schedule, [day]: slots });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-lg"><Clock size={24} /></div>
          <div>
             <h3 className="font-bold text-lg">ساعات العمل والتوفر</h3>
             <p className="text-sm text-muted-foreground">حدد الأوقات التي تكون فيها متاحاً للاجتماعات.</p>
          </div>
       </div>

       <div className="space-y-6">
          {days.map((day) => (
             <div key={day} className="flex flex-col md:flex-row md:items-start gap-4 border-b border-border/50 pb-4 last:border-0">
                <div className="w-24 font-bold pt-2">{day}</div>
                
                <div className="flex-1 space-y-2">
                   {(schedule[day] || []).map((slot, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                         <select className="bg-background border border-input rounded-lg px-3 py-2 text-sm outline-none">
                            <option>09:00</option>
                            <option>10:00</option>
                            {/* ... more times */}
                         </select>
                         <span className="text-muted-foreground">-</span>
                         <select className="bg-background border border-input rounded-lg px-3 py-2 text-sm outline-none">
                            <option>17:00</option>
                            <option>18:00</option>
                         </select>
                         <button onClick={() => removeSlot(day, idx)} className="text-muted-foreground hover:text-red-500 p-2"><X size={16} /></button>
                      </div>
                   ))}
                   
                   {(schedule[day] || []).length === 0 && (
                      <div className="text-sm text-muted-foreground pt-2 italic">غير متاح</div>
                   )}
                </div>

                <Button size="sm" variant="ghost" onClick={() => addSlot(day)} icon={<Plus size={16} />} />
             </div>
          ))}
       </div>

       <div className="flex justify-end mt-6 pt-4 border-t border-border">
          <Button variant="primary" icon={<Save size={18} />}>حفظ الجدول الزمني</Button>
       </div>
    </div>
  );
}

