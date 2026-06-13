'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ColorBlindFilter() {
  const [mode, setMode] = useState<string>('normal');

  // في التطبيق الحقيقي، هذا يطبق CSS Filter على الـ Body أو حاوية الفيديو
  // style={{ filter: 'url(#protanopia)' }}
  
  return (
    <div className="bg-card border border-border rounded-xl p-4 w-64">
       <div className="flex items-center gap-2 mb-4">
          <Eye size={18} className="text-primary" />
          <h3 className="font-bold text-sm">محاكاة الرؤية</h3>
       </div>

       <div className="space-y-2">
          <FilterBtn 
             label="رؤية طبيعية" 
             value="normal" 
             active={mode === 'normal'} 
             onClick={setMode} 
          />
          <FilterBtn 
             label="Protanopia (Red-Blind)" 
             value="protanopia" 
             active={mode === 'protanopia'} 
             onClick={setMode} 
          />
          <FilterBtn 
             label="Deuteranopia (Green-Blind)" 
             value="deuteranopia" 
             active={mode === 'deuteranopia'} 
             onClick={setMode} 
          />
          <FilterBtn 
             label="Grayscale (Monochromacy)" 
             value="grayscale" 
             active={mode === 'grayscale'} 
             onClick={setMode} 
          />
       </div>

       {mode !== 'normal' && (
          <div className="mt-4 p-2 bg-yellow-50 text-yellow-800 text-[10px] rounded border border-yellow-100 flex items-center gap-2">
             <EyeOff size={12} />
             <span>أنت تشاهد الوضع المحاكى الآن.</span>
          </div>
       )}
    </div>
  );
}

function FilterBtn({ label, value, active, onClick }: unknown) {
    return (
        <button 
           onClick={() => onClick(value)}
           className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors border ${active ? 'bg-primary text-white border-primary' : 'bg-background border-border hover:bg-muted'}`}
        >
           {label}
        </button>
    )
}

