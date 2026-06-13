'use client';
import React from 'react';
import { Library, FileImage, FileAudio, FileVideo, Download, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GlobalAssetLibrary() {
  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-purple-100 text-purple-700 rounded-lg"><Library size={24} /></div>
             <div>
                <h1 className="text-2xl font-bold">مكتبة الأصول العالمية</h1>
                <p className="text-muted-foreground text-sm">ملفات مشتركة متاحة لجميع مشاريع الفريق.</p>
             </div>
          </div>
          <Button variant="primary">رفع أصول جديدة</Button>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AssetCard name="Official_Logo.png" type="image" size="2 MB" />
          <AssetCard name="Brand_Intro_4K.mp4" type="video" size="150 MB" />
          <AssetCard name="Background_Music.wav" type="audio" size="45 MB" />
          <AssetCard name="Watermark_White.png" type="image" size="1 MB" />
          <AssetCard name="Lower_Thirds_Template.mogrt" type="video" size="12 MB" />
       </div>
    </div>
  );
}

function AssetCard({ name, type, size }: unknown) {
    const icons: unknown = { image: FileImage, video: FileVideo, audio: FileAudio };
    const Icon = icons[type] || FileImage;

    return (
        <div className="group border border-border rounded-xl p-4 hover:shadow-md transition-all bg-card relative">
           <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Icon size={32} />
           </div>
           <h4 className="font-bold text-sm truncate mb-1">{name}</h4>
           <p className="text-xs text-muted-foreground">{size}</p>
           
           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button className="p-1 bg-white shadow rounded hover:text-primary"><Download size={14} /></button>
              <button className="p-1 bg-white shadow rounded hover:text-primary"><MoreVertical size={14} /></button>
           </div>
        </div>
    )
}

