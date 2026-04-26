'use client';
import React from 'react';
import { HardDrive, FileVideo, Music, Image as ImageIcon, File } from 'lucide-react';

export function StorageAnalysis() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"><HardDrive size={24} /></div>
          <div>
             <h3 className="font-bold text-lg">تفاصيل التخزين</h3>
             <p className="text-sm text-muted-foreground">استخدام المساحة حسب نوع الملفات.</p>
          </div>
          <div className="mr-auto text-right">
             <div className="text-2xl font-bold">75.5 GB</div>
             <div className="text-xs text-muted-foreground">من 100 GB</div>
          </div>
       </div>

       {/* Visual Bar */}
       <div className="h-4 w-full bg-muted rounded-full overflow-hidden flex mb-6">
          <div className="h-full bg-blue-500 w-[60%]" /> {/* Video */}
          <div className="h-full bg-purple-500 w-[20%]" /> {/* Audio */}
          <div className="h-full bg-emerald-500 w-[10%]" /> {/* Images */}
          <div className="h-full bg-slate-400 w-[10%]" /> {/* Others */}
       </div>

       {/* Legend Grid */}
       <div className="grid grid-cols-2 gap-4">
          <StorageItem label="Video Footage" size="45.2 GB" color="bg-blue-500" icon={FileVideo} />
          <StorageItem label="Audio & SFX" size="15.1 GB" color="bg-purple-500" icon={Music} />
          <StorageItem label="Images & Assets" size="7.5 GB" color="bg-emerald-500" icon={ImageIcon} />
          <StorageItem label="Project Files & Cache" size="7.7 GB" color="bg-slate-400" icon={File} />
       </div>
    </div>
  );
}

function StorageItem({ label, size, color, icon: Icon }: any) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
            <div className={`p-2 rounded-lg text-white ${color}`}>
                <Icon size={16} />
            </div>
            <div>
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-muted-foreground">{size}</p>
            </div>
        </div>
    )
}

