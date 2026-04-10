'use client';
import React from 'react';
import { Loader2, CheckCircle, AlertOctagon, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function RenderQueue() {
  return (
    <div className="w-80 bg-card border border-border rounded-xl overflow-hidden shadow-lg">
       <div className="p-3 bg-muted/30 border-b border-border flex justify-between items-center">
          <h4 className="font-bold text-sm">عمليات التصدير (Renders)</h4>
          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">1 نشط</span>
       </div>

       <div className="max-h-64 overflow-y-auto divide-y divide-border">
          {/* Active Render */}
          <div className="p-3 bg-muted/5">
             <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-xs truncate max-w-[150px]">Final_Cut_v3.mp4</span>
                <span className="text-[10px] text-blue-500 flex items-center gap-1">
                   <Loader2 size={10} className="animate-spin" /> جاري المعالجة
                </span>
             </div>
             <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-1">
                <div className="h-full bg-blue-500 w-[45%] animate-pulse" />
             </div>
             <p className="text-[10px] text-muted-foreground text-right">45% • متبقي 2 دقيقة</p>
          </div>

          {/* Completed Render */}
          <div className="p-3 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
             <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded">
                <FileVideo size={16} />
             </div>
             <div className="flex-1">
                <p className="text-xs font-bold">Social_Teaser.mov</p>
                <p className="text-[10px] text-muted-foreground">120 MB • H.264</p>
             </div>
             <CheckCircle size={16} className="text-emerald-500" />
          </div>

          {/* Failed Render */}
          <div className="p-3 flex items-center gap-3 bg-red-50/50">
             <div className="p-1.5 bg-red-100 text-red-600 rounded">
                <AlertOctagon size={16} />
             </div>
             <div className="flex-1">
                <p className="text-xs font-bold text-red-900">4K_Master_Export.mxf</p>
                <p className="text-[10px] text-red-700">فشل التصدير (Error #502)</p>
             </div>
             <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]">إعادة</Button>
          </div>
       </div>
    </div>
  );
}
