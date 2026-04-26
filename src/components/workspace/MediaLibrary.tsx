'use client';
import React from 'react';
import { Folder, FileVideo, FileImage, MoreVertical, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export function MediaLibrary() {
  return (
    <div className="bg-card border border-border rounded-xl h-[600px] flex flex-col">
       {/* Header */}
       <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Cloud className="text-primary" />
             <h3 className="font-bold">مكتبة الوسائط</h3>
          </div>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
             تم استخدام 45GB من 100GB
          </div>
       </div>
       {/* Toolbar */}
       <div className="p-2 border-b border-border flex gap-2 bg-muted/10">
          <Button size="sm" variant="primary">رفع ملفات</Button>
          <Button size="sm" variant="ghost">مجلد جديد</Button>
       </div>
       {/* Content */}
       <div className="flex-1 p-4 overflow-y-auto">
          <h4 className="text-xs font-bold text-muted-foreground mb-3">المجلدات</h4>
          <div className="grid grid-cols-4 gap-4 mb-6">
             <FolderItem name="Music Assets" count={12} />
             <FolderItem name="Stock Footage" count={45} />
             <FolderItem name="Project A Renders" count={3} />
             <FolderItem name="Logos & Brand" count={8} />
          </div>
          <h4 className="text-xs font-bold text-muted-foreground mb-3">الملفات الحديثة</h4>
          <div className="space-y-2">
             <FileItem name="Intro_Animation_v3.mp4" size="120 MB" type="video" date="Today" />
             <FileItem name="Background_Music.wav" size="15 MB" type="audio" date="Yesterday" />
             <FileItem name="Thumbnail_Design.psd" size="45 MB" type="image" date="2 days ago" />
          </div>
       </div>
    </div>
  );
}
function FolderItem({ name, count }: any) {
   return (
      <div className="p-3 border border-border rounded-xl bg-muted/5 hover:bg-primary/5 hover:border-primary cursor-pointer transition-colors text-center">
         <Folder size={32} className="mx-auto text-yellow-500 mb-2" fill="currentColor" />
         <p className="text-xs font-bold truncate">{name}</p>
         <p className="text-[10px] text-muted-foreground">{count} items</p>
      </div>
   );
}
function FileItem({ name, size, type, date }: any) {
   return (
      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors group">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded">
               {type === 'video' ? <FileVideo size={16} /> : <FileImage size={16} />}
            </div>
            <div>
               <p className="text-sm font-medium truncate max-w-[200px]">{name}</p>
               <p className="text-[10px] text-muted-foreground">{size} • {date}</p>
            </div>
         </div>
         <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded"><MoreVertical size={16} /></button>
      </div>
   );
}
