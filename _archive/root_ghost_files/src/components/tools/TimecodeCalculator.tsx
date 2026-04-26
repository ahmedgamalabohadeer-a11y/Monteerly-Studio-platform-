'use client';
import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function TimecodeCalculator() {
  const [fps, setFps] = useState(24);
  const [tc1, setTc1] = useState('00:00:00:00');
  const [tc2, setTc2] = useState('00:00:00:00');
  const [result, setResult] = useState('00:00:00:00');

  // ملاحظة: المنطق الفعلي لحساب التايم كود معقد ويتطلب مكتبة، هنا محاكاة للواجهة
  const calculate = (op: '+' | '-') => {
     // Mock logic for UI demonstration
     setResult('01:05:12:14'); 
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 max-w-sm">
       <div className="flex items-center gap-2 mb-6">
          <Calculator className="text-primary" size={20} />
          <h3 className="font-bold">حاسبة التايم كود (Timecode)</h3>
       </div>

       <div className="space-y-4">
          <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg">
             <span className="text-xs font-bold text-muted-foreground">Frame Rate</span>
             <select 
               value={fps} 
               onChange={(e) => setFps(Number(e.target.value))}
               className="bg-transparent text-sm font-mono font-bold outline-none text-right"
             >
                <option value={24}>24 fps (Film)</option>
                <option value={25}>25 fps (PAL)</option>
                <option value={30}>30 fps (NTSC)</option>
                <option value={60}>60 fps (HFR)</option>
             </select>
          </div>

          <div className="space-y-2">
             <input value={tc1} onChange={(e) => setTc1(e.target.value)} className="w-full bg-background border border-input rounded-lg p-3 font-mono text-center text-lg tracking-widest outline-none focus:border-primary" />
             <input value={tc2} onChange={(e) => setTc2(e.target.value)} className="w-full bg-background border border-input rounded-lg p-3 font-mono text-center text-lg tracking-widest outline-none focus:border-primary" />
          </div>

          <div className="grid grid-cols-2 gap-2">
             <Button variant="outline" onClick={() => calculate('+')}>جمع (+)</Button>
             <Button variant="outline" onClick={() => calculate('-')}>طرح (-)</Button>
          </div>

          <div className="pt-4 border-t border-border text-center">
             <p className="text-xs text-muted-foreground mb-1">النتيجة</p>
             <div className="text-3xl font-black font-mono text-primary tracking-widest">{result}</div>
          </div>
          
          <Button size="sm" variant="ghost" className="w-full text-xs text-muted-foreground" icon={<RotateCcw size={12} />}>تصفير</Button>
       </div>
    </div>
  );
}

################################################################################