'use client';
import React from 'react';
import { Archive, Box, Lock } from 'lucide-react';

export function ArchiveVault() {
  return (
    <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group">
       <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Archive size={32} />
       </div>
       <h3 className="font-bold text-lg">أرشيف المشاريع (Vault)</h3>
       <p className="text-sm text-muted-foreground max-w-xs mt-2">
          انقل المشاريع المكتملة هنا لتوفير المساحة. يتم تخزينها بأمان بتكلفة أقل.
       </p>
       <div className="flex gap-4 mt-6 text-xs font-bold text-muted-foreground">
          <span className="flex items-center gap-1"><Box size={14} /> 12 مؤرشف</span>
          <span className="flex items-center gap-1"><Lock size={14} /> مشفر</span>
       </div>
    </div>
  );
}

