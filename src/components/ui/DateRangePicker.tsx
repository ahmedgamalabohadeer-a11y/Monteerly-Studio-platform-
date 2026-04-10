'use client';
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function DateRangePicker() {
  return (
    <div className="flex items-center gap-2 p-1 bg-card border border-border rounded-lg shadow-sm">
       <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
             <CalendarIcon size={14} />
          </div>
          <input 
            type="date" 
            className="pl-9 pr-3 py-2 bg-transparent text-sm outline-none cursor-pointer text-muted-foreground focus:text-foreground"
          />
       </div>
       <span className="text-muted-foreground">-</span>
       <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
             <CalendarIcon size={14} />
          </div>
          <input 
            type="date" 
            className="pl-9 pr-3 py-2 bg-transparent text-sm outline-none cursor-pointer text-muted-foreground focus:text-foreground"
          />
       </div>
    </div>
  );
}
