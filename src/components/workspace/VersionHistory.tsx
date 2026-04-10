'use client';
import React from 'react';
import { History, Play, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function VersionHistory() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col">
       <div className="p-4 border-b border-border bg-muted/10 flex items-center gap-2">
          <History size={18} className="text-primary" />
          <h3 className="font-bold text-sm">سجل النسخ (Versioning)</h3>
       </div>

       <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {/* Active Version */}
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
             <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-primary">V3.0 (Current)</span>
                <Badge variant="success">معتمد</Badge>
             </div>
             <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <Clock size={12} /> اليوم، 10:30 ص
             </p>
             <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-7 text-xs flex-1 bg-white/50">مشاهدة</Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Download size={14} /></Button>
             </div>
          </div>

          {/* Older Version */}
          <div className="p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors opacity-70 hover:opacity-100">
             <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">V2.0</span>
                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">تعديلات ألوان</span>
             </div>
             <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <Clock size={12} /> أمس، 04:15 م
             </p>
             <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-7 text-xs flex-1">استعادة</Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Play size={14} /></Button>
             </div>
          </div>

          {/* Oldest Version */}
          <div className="p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors opacity-60 hover:opacity-100">
             <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm">V1.0</span>
                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">Draft</span>
             </div>
             <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <Clock size={12} /> 10 Jan, 09:00 ص
             </p>
          </div>
       </div>
    </div>
  );
}
