'use client';
import React, { useState } from 'react';
import { Type, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FontManager() {
  const [fonts, setFonts] = useState([
    { id: 1, name: 'Cairo Bold', type: 'TTF' },
    { id: 2, name: 'Almarai Regular', type: 'WOFF2' },
    { id: 3, name: 'DIN Next LT Arabic', type: 'OTF' },
  ]);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
             <h3 className="font-bold text-lg flex items-center gap-2">
                <Type size={20} className="text-primary" /> مكتبة الخطوط
             </h3>
             <p className="text-sm text-muted-foreground">ارفع خطوط الهوية البصرية لاستخدامها في المحرر.</p>
          </div>
          <Button variant="outline" icon={<Upload size={16} />}>رفع خط جديد</Button>
       </div>

       <div className="grid gap-4">
          {fonts.map((font) => (
             <div key={font.id} className="flex items-center justify-between p-4 border border-border rounded-xl bg-card hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-serif text-xl font-bold text-muted-foreground">
                      Aa
                   </div>
                   <div>
                      <h4 className="font-bold">{font.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase">{font.type} File</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-4">
                   {/* Preview Text */}
                   <div className="hidden md:block text-2xl px-4 text-muted-foreground/50 select-none">
                      بسم الله الرحمن الرحيم
                   </div>
                   <button className="text-muted-foreground hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
