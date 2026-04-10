'use client';
import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { FileCard } from './FileCard';
import { ChevronRight, Home, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DriveBrowser() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const files = [
    { name: 'Rushes_Day01', type: 'folder', date: 'Jan 15', size: '12 items' },
    { name: 'Audio_Effects', type: 'folder', date: 'Jan 12', size: '5 items' },
    { name: 'Interview_CamA.mp4', type: 'video', date: 'Jan 10', size: '2.4 GB', thumbnail: '/images/features/live.jpg' },
    { name: 'Interview_CamB.mp4', type: 'video', date: 'Jan 10', size: '2.4 GB', thumbnail: '/images/features/ai-brain.jpg' },
    { name: 'Logo_Transparent.png', type: 'image', date: 'Jan 05', size: '2MB' },
    { name: 'Background_Music.wav', type: 'audio', date: 'Jan 08', size: '45MB' },
  ];

  return (
    <div className="flex flex-col h-full">
       {/* Toolbar & Breadcrumbs */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
             <Home size={16} className="text-indigo-400 cursor-pointer hover:text-white" />
             <ChevronRight size={14} />
             <span className="cursor-pointer hover:text-white">المشاريع</span>
             <ChevronRight size={14} />
             <span className="cursor-pointer hover:text-white">إعلان رمضان 2026</span>
             <ChevronRight size={14} />
             <span className="text-white font-bold">Footage</span>
          </div>

          <div className="flex gap-2">
             <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}><Grid size={16}/></button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}><List size={16}/></button>
             </div>
             <Button variant="outline" size="sm" className="border-white/10 text-slate-300 gap-2"><Filter size={14}/> تصفية</Button>
          </div>
       </div>

       {/* Upload Area */}
       <UploadZone />

       {/* Files Grid */}
       <h3 className="font-bold text-white mb-4">الملفات ({files.length})</h3>
       <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'}`}>
          {files.map((file, i) => (
             // @ts-ignore
             <FileCard key={i} {...file} />
          ))}
       </div>
    </div>
  );
}
