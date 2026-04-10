'use client';
import React from 'react';
import { ScanSearch, Upload } from 'lucide-react';

export function VisualSearch() {
  return (
    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group">
       <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 group-hover:text-primary">
          <ScanSearch size={24} />
       </div>
       <h4 className="font-bold text-sm">البحث المرئي (Visual Search)</h4>
       <p className="text-xs text-muted-foreground mt-1">ارفع صورة للبحث عن لقطات مشابهة في مكتبتك</p>
    </div>
  );
}
