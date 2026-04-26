'use client';
import React from 'react';
import { Zap, Monitor, Layers } from 'lucide-react';
import { VideoAnnotator } from '@/components/workspace/VideoAnnotator';
import { NeuralDock } from '@/components/dock/NeuralDock';
import { FileConflictModal } from '@/components/files/FileConflictModal';

export default function WorkspacePage() {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-slate-950 overflow-hidden relative" dir="rtl">
      
      {/* Workspace Header */}
      <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
            <Monitor className="text-indigo-400" size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">مساحة العمل السينمائي</h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">Project: Monteerly_Ad_V2.mp4</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> نمط العمل الجماعي نشط
           </div>
        </div>
      </div>

      {/* Main Production Area */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
         <div className="w-full max-w-5xl shadow-2xl shadow-indigo-500/10">
            <VideoAnnotator />
         </div>
         
         {/* Neural Dock - شريط الأدوات الذكي أسفل الشاشة */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
            <NeuralDock />
         </div>
      </div>

      {/* نظام حماية التضارب (مختفي حتى يحدث تعارض) */}
      <FileConflictModal isOpen={false} onClose={() => {}} />

      <div className="absolute bottom-4 left-6 text-[10px] text-slate-700 font-mono">
         CORE_ENGINE: NEURAL_RENDER_v4.2
      </div>
    </div>
  );
}
