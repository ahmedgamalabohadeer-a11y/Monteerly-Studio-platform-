'use client';
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export function CostCalculator() {
  const [duration, setDuration] = useState(1);
  const [quality, setQuality] = useState(1);
  
  const estimatedCost = duration * 100 * quality;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center gap-2 mb-4 text-primary">
          <Calculator size={20} />
          <h3 className="font-bold">حاسبة التكلفة التقديرية</h3>
       </div>
       
       <div className="space-y-4 mb-6">
          <div>
             <label className="text-xs font-bold block mb-2">مدة الفيديو (دقائق): {duration}</label>
             <input type="range" min="1" max="10" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full" />
          </div>
          <div>
             <label className="text-xs font-bold block mb-2">مستوى الجودة (1-3): {quality}</label>
             <input type="range" min="1" max="3" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full" />
          </div>
       </div>

       <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-xs text-muted-foreground">التكلفة المتوقعة</div>
          <div className="text-2xl font-black text-primary">${estimatedCost} - ${estimatedCost + 200}</div>
       </div>
    </div>
  );
}
