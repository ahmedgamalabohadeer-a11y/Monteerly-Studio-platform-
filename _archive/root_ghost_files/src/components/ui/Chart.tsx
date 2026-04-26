'use client';
import React from 'react';

interface ChartProps {
  data: number[];
  labels: string[];
  type?: 'line' | 'bar';
  color?: string;
  height?: number;
}

export function SimpleChart({ data, labels, type = 'line', color = '#3b82f6', height = 200 }: ChartProps) {
  // ملاحظة: هذا تمثيل بصري بسيط باستخدام CSS Flexbox لتجنب الاعتماد على مكتبات خارجية ثقيلة الآن.
  // في الإنتاج يمكن استبدال هذا بـ Recharts أو Chart.js.
  
  const max = Math.max(...data);

  return (
    <div className="w-full flex items-end gap-2" style={{ height: `${height}px` }}>
       {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
             <div className="relative w-full flex items-end justify-center h-full">
                <div 
                  className={`w-full max-w-[30px] rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${type === 'line' ? 'rounded-full' : ''}`}
                  style={{ 
                     height: `${(value / max) * 100}%`, 
                     backgroundColor: color,
                     minHeight: '4px'
                  }}
                >
                   {/* Tooltip */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                   </div>
                </div>
             </div>
             <span className="text-[10px] text-muted-foreground truncate w-full text-center">{labels[i]}</span>
          </div>
       ))}
    </div>
  );
}

################################################################################