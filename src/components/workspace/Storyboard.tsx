'use client';
import React from 'react';
import { Plus, Image as ImageIcon, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Storyboard() {
  const scenes = [1, 2, 3, 4];

  return (
    <div className="p-6 bg-slate-50 min-h-full">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">لوحة القصة (Storyboard)</h3>
          <Button size="sm" variant="primary" icon={<Plus size={16} />}>إضافة مشهد</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
             <div key={scene} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-2 border-b border-border flex justify-between items-center bg-muted/10">
                   <div className="flex items-center gap-2">
                      <GripVertical size={16} className="text-muted-foreground cursor-grab" />
                      <span className="font-bold text-sm">مشهد #{scene}</span>
                   </div>
                   <span className="text-xs text-muted-foreground">00:15s</span>
                </div>

                {/* Visual Placeholder */}
                <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors relative group/img">
                   <ImageIcon className="text-slate-300 mb-2" size={32} />
                   <p className="text-xs text-slate-400">اضغط لرفع رسم تخطيطي</p>
                </div>

                {/* Description */}
                <div className="p-3">
                   <textarea 
                      className="w-full text-sm bg-transparent outline-none resize-none h-16 placeholder:text-muted-foreground/50"
                      placeholder="وصف المشهد: لقطة واسعة للكاميرا وهي تتحرك نحو البطل..."
                   />
                </div>
             </div>
          ))}

          {/* Add New Card */}
          <button className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all h-full min-h-[250px]">
             <Plus size={40} />
             <span className="font-bold mt-2">مشهد جديد</span>
          </button>
       </div>
    </div>
  );
}
