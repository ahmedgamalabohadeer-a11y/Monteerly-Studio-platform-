'use client';
import React, { useState, useEffect } from 'react';
import { HardDrive, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function BitrateCalculator() {
  const [duration, setDuration] = useState(60); // Seconds
  const [bitrate, setBitrate] = useState(10); // Mbps
  const [size, setSize] = useState(0);

  useEffect(() => {
    // Formula: (Bitrate (Mbps) * Duration (s)) / 8 = Size (MB)
    const result = (bitrate * duration) / 8;
    setSize(result);
  }, [duration, bitrate]);

  return (
    <div className="bg-card border border-border rounded-xl p-6 max-w-sm">
       <div className="flex items-center gap-2 mb-6 text-primary">
          <Calculator size={20} />
          <h3 className="font-bold text-foreground">حاسبة حجم الملف (Bitrate)</h3>
       </div>

       <div className="space-y-4">
          <Input 
             label="المدة (ثانية)" 
             type="number" 
             value={duration}
             onChange={(e: any) => setDuration(Number(e.target.value))}
          />
          <Input 
             label="معدل البيانات (Mbps)" 
             type="number" 
             value={bitrate}
             onChange={(e: any) => setBitrate(Number(e.target.value))}
          />

          <div className="bg-slate-900 text-white p-4 rounded-xl text-center mt-4 border border-slate-700">
             <div className="flex justify-center mb-2 text-slate-400"><HardDrive size={24} /></div>
             <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">الحجم التقديري</p>
             <div className="text-3xl font-black font-mono">
                {size < 1000 ? `${size.toFixed(1)} MB` : `${(size/1024).toFixed(2)} GB`}
             </div>
          </div>
          
          <p className="text-[10px] text-muted-foreground text-center">
             * الحجم تقريبي ولا يشمل حجم ملف الصوت.
          </p>
       </div>
    </div>
  );
}

