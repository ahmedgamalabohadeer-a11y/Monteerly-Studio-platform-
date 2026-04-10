'use client';
import React, { useState } from 'react';
import { Trash2, RefreshCcw, AlertTriangle, FileVideo, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function RecycleBin() {
  const [items, setItems] = useState([
    { id: 1, name: 'Intro_Draft_v1.mp4', size: '150 MB', deletedAt: '2 days ago', type: 'video' },
    { id: 2, name: 'Old_Logo.png', size: '2 MB', deletedAt: '5 days ago', type: 'image' },
  ]);

  const restoreItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    // Logic to restore API call
  };

  const deleteForever = (id: number) => {
    if (confirm('هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col">
       <div className="p-4 border-b border-border bg-red-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-700">
             <Trash2 size={20} />
             <h3 className="font-bold">سلة المحذوفات</h3>
          </div>
          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-100 border-red-200">
             إفراغ السلة
          </Button>
       </div>

       {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
             <Trash2 size={48} className="mb-4 opacity-20" />
             <p>السلة فارغة</p>
          </div>
       ) : (
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             <div className="text-xs text-center text-muted-foreground py-2 flex items-center justify-center gap-1">
                <AlertTriangle size={12} />
                يتم حذف الملفات نهائياً بعد 30 يوماً تلقائياً.
             </div>
             
             {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background hover:bg-muted/30 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                         {item.type === 'video' ? <FileVideo size={16} /> : <FileImage size={16} />}
                      </div>
                      <div>
                         <p className="font-bold text-sm">{item.name}</p>
                         <p className="text-xs text-muted-foreground">{item.size} • حذف {item.deletedAt}</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => restoreItem(item.id)} title="استعادة">
                         <RefreshCcw size={16} className="text-emerald-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteForever(item.id)} title="حذف نهائي">
                         <Trash2 size={16} className="text-red-600" />
                      </Button>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
}
