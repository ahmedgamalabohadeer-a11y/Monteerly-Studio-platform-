'use client'
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

import { MonitorPlay, Settings, Layers, Cpu } from 'lucide-react';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';

export default function DynamicStudioPage({ params }: { params: { projectId: string } }) {
  // Mock Data للمشروع الديناميكي
  const mockVideoUrl = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4";
  const [realVideoUrl, setRealVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectVideo = async () => {
      // في بيئة الإنتاج: استبدل هذا باستعلام حقيقي لجدول jobs أو الملفات المرفوعة
      const { data, error } = await supabase.from('jobs').select('snapshot').eq('id', params.projectId).single();
      if (data?.snapshot?.videoUrl) {
        setRealVideoUrl(data.snapshot.videoUrl);
      }
    };
    fetchProjectVideo();
  }, [params.projectId]);

  const displayUrl = realVideoUrl || mockVideoUrl;

  const [activeVersion, setActiveVersion] = useState(1);
  const versions = [
    { id: 1, label: 'النسخة الأولية (V1)', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4' },
    { id: 2, label: 'تعديلات الألوان (V2)', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
  ];

  const currentVideoUrl = versions.find(v => v.id === activeVersion)?.url || displayUrl;

  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex font-sans" dir="rtl">
      {/* Sidebar: AI Tools */}
      <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
        <h2 className="text-xl font-black mb-8 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-indigo-500" />
          ترسانة الـ AI
        </h2>
        <div className="space-y-4 flex-1">
          <button className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-right hover:border-indigo-500 transition-colors">
            <span className="block text-indigo-400 font-bold mb-1">Color Grading</span>
            <span className="text-slate-500 text-xs">تصحيح ألوان سينمائي تلقائي</span>
          </button>
          <button className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-right hover:border-emerald-500 transition-colors">
            <span className="block text-emerald-400 font-bold mb-1">Audio Master</span>
            <span className="text-slate-500 text-xs">تنقية الصوت وعزل الضوضاء</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-3xl border border-white/5">
          <div>
            <h1 className="text-2xl font-black text-white">مشروع: {params.projectId}</h1>
            <p className="text-slate-400 text-sm">مزامنة سحابية نشطة عبر R2 Storage</p>
          </div>
          <div className="flex bg-slate-950 border border-white/10 rounded-full p-1 mr-4">
              {versions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVersion(v.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeVersion === v.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
            <button className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-2 rounded-full font-bold text-sm">
              طلب مراجعة العميل
            </button>
          </div>
        </header>

        {/* Video Player Component */}
        <ReviewPlayer url={currentVideoUrl} activeVersion={activeVersion} orderId={params.projectId} ar={{ system: { loading: 'تحميل...' }, legal: { vault: 'مشفر' } }} />
      </main>
    </div>
  );
}
