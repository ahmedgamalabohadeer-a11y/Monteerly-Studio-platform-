'use client';
import React from 'react';
import { Globe } from 'lucide-react';

export function TimezoneSelect() {
  return (
    <div className="space-y-2">
       <label className="text-sm font-medium flex items-center gap-2">
          <Globe size={16} className="text-muted-foreground" /> المنطقة الزمنية
       </label>
       <div className="relative">
          <select className="w-full appearance-none bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none">
             <option value="GMT+2">(GMT+02:00) Cairo, Egypt</option>
             <option value="GMT+3">(GMT+03:00) Riyadh, KSA</option>
             <option value="GMT+4">(GMT+04:00) Dubai, UAE</option>
             <option value="GMT+0">(GMT+00:00) London, UK</option>
             <option value="GMT-5">(GMT-05:00) New York, USA</option>
          </select>
          <div className="absolute left-3 top-3 text-xs text-muted-foreground pointer-events-none">
             ▼
          </div>
       </div>
       <p className="text-[10px] text-muted-foreground">سيتم استخدام هذا التوقيت في جميع الإشعارات والمواعيد.</p>
    </div>
  );
}

