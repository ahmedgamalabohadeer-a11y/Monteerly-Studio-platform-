'use client';
import React, { useState } from 'react';
import { Save, Settings, Trash2, Plus, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ExportPresets() {
  const [presets, setPresets] = useState([
    { id: 1, name: 'YouTube 4K High', format: 'H.264', res: '3840x2160', bitrate: '40 Mbps' },
    { id: 2, name: 'Instagram Reel', format: 'H.264', res: '1080x1920', bitrate: '15 Mbps' },
    { id: 3, name: 'Client Draft (Low)', format: 'H.264', res: '1280x720', bitrate: '5 Mbps' },
  ]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col">
       <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center">
          <h3 className="font-bold text-sm">إعدادات التصدير الجاهزة</h3>
          <Button size="sm" variant="outline" icon={<Plus size={14} />}>جديد</Button>
       </div>

       <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {presets.map((preset) => (
             <div key={preset.id} className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/20 transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                   <div className="flex items-center gap-2">
                      <MonitorPlay size={16} className="text-primary" />
                      <span className="font-bold text-sm">{preset.name}</span>
                   </div>
                   <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <button className="p-1 hover:text-primary"><Settings size={14} /></button>
                      <button className="p-1 hover:text-red-500"><Trash2 size={14} /></button>
                   </div>
                </div>
                <div className="flex gap-2 text-[10px] text-muted-foreground font-mono">
                   <span className="bg-muted px-1.5 py-0.5 rounded">{preset.format}</span>
                   <span className="bg-muted px-1.5 py-0.5 rounded">{preset.res}</span>
                   <span className="bg-muted px-1.5 py-0.5 rounded">{preset.bitrate}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################