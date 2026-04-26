'use client';
import React from 'react';
import { Plus, Image as ImageIcon, Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PortfolioManager() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">أعمالي السابقة</h3>
          <Button size="sm" variant="primary" icon={<Plus size={16} />}>إضافة عمل جديد</Button>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Add New Placeholder */}
          <div className="aspect-video bg-muted/30 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors group">
             <div className="p-3 bg-background rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Plus className="text-muted-foreground" />
             </div>
             <span className="text-sm font-bold text-muted-foreground">رفع فيديو / صورة</span>
          </div>

          {/* Existing Item */}
          {[1, 2].map((i) => (
             <div key={i} className="group relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl">WORK {i}</div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <Button size="sm" variant="secondary" icon={<Edit2 size={14} />}>تعديل</Button>
                   <Button size="sm" variant="danger" icon={<Trash2 size={14} />}>حذف</Button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                   <p className="text-white text-sm font-bold truncate">إعلان سيارات 2025</p>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

