'use client';
import React from 'react';
import { Sparkles, PenTool, Layout, UserCog, Eye } from 'lucide-react';
import { ScriptGenerator } from '@/components/ai/ScriptGenerator';
import { StoryboardGenerator } from '@/components/ai/StoryboardGenerator';
import { DigitalTwinSetup } from '@/components/ai/digital-twin/DigitalTwinSetup';
import { FaceVault } from '@/components/ai/vision/FaceVault';

export default function AiStudioPage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      
      {/* Header - واجهة المستقبل */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Neural Engine v2.0</span>
          </div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="text-indigo-500" size={32} />
            استوديو المحتوى الذكي
          </h1>
          <p className="text-slate-400 mt-2 text-sm">استخدم قوة الذكاء الاصطناعي لتوليد السكربتات، الاستوريبورد، والهويات الرقمية.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* قطاع توليد المحتوى النصي */}
        <section className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-600/5 blur-[80px] group-hover:bg-indigo-600/10 transition-all" />
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
               <PenTool className="text-indigo-400" /> كاتب السيناريو الآلي
            </div>
            <ScriptGenerator />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
               <UserCog className="text-emerald-400" /> إعداد التوأم الرقمي (Digital Twin)
            </div>
            <DigitalTwinSetup />
          </div>
        </section>

        {/* قطاع التصور البصري والذكاء الرؤيوي */}
        <section className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/5 blur-[80px] group-hover:bg-purple-600/10 transition-all" />
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
               <Layout className="text-purple-400" /> مصمم الستوريبورد (Visualizer)
            </div>
            <StoryboardGenerator />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
               <Eye className="text-amber-400" /> مخزن الرؤية (Face Vault)
            </div>
            <FaceVault />
          </div>
        </section>

      </div>
    </div>
  );
}
