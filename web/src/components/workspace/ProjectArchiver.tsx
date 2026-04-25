'use client';
import React, { useState } from 'react';
import { Archive, Download, FileCode, Film, Music } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export function ProjectArchiver() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['final']);
  const toggleFormat = (id: string) => {
    setSelectedFormats(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };
  return (
    <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 text-yellow-700 rounded-lg"><Archive size={24} /></div>
          <div>
             <h3 className="font-bold text-lg">أرشفة وتصدير المشروع</h3>
             <p className="text-sm text-muted-foreground">قم بتحميل حزمة كاملة لجميع ملفات المشروع.</p>
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ExportOption 
             id="final" 
             title="النسخة النهائية (Final Cut)" 
             size="250 MB" 
             icon={Film} 
             selected={selectedFormats.includes('final')}
             onToggle={() => toggleFormat('final')}
          />
          <ExportOption 
             id="raw" 
             title="الملفات الخام (Raw Footage)" 
             size="12 GB" 
             icon={Film} 
             selected={selectedFormats.includes('raw')}
             onToggle={() => toggleFormat('raw')}
          />
          <ExportOption 
             id="xml" 
             title="ملفات المشروع (XML/EDL)" 
             size="5 MB" 
             icon={FileCode} 
             selected={selectedFormats.includes('xml')}
             onToggle={() => toggleFormat('xml')}
          />
          <ExportOption 
             id="stems" 
             title="المسارات الصوتية (Audio Stems)" 
             size="450 MB" 
             icon={Music} 
             selected={selectedFormats.includes('stems')}
             onToggle={() => toggleFormat('stems')}
          />
       </div>
       <div className="bg-muted/30 p-4 rounded-xl flex justify-between items-center border border-border">
          <div>
             <span className="text-sm font-bold block">الحجم التقديري</span>
             <span className="text-xs text-muted-foreground">بناءً على اختيارك</span>
          </div>
          <div className="font-mono font-bold text-xl">12.7 GB</div>
       </div>
       <div className="flex justify-end mt-6">
          <Button variant="primary" size="lg" icon={<Download size={18} />}>
             بدء التجهيز والتحميل
          </Button>
       </div>
    </div>
  );
}
function ExportOption({ id, title, size, icon: Icon, selected, onToggle }: any) {
    return (
        <div 
           onClick={onToggle}
           className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between ${selected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
        >
           <div className="flex items-center gap-3">
              <Icon size={20} className={selected ? 'text-primary' : 'text-muted-foreground'} />
              <div>
                 <p className="font-bold text-sm">{title}</p>
                 <p className="text-xs text-muted-foreground">{size}</p>
              </div>
           </div>
           <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
              {selected && <div className="w-2 h-2 bg-white rounded-full" />}
           </div>
        </div>
    )
}
