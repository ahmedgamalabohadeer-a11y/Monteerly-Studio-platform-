'use client';
import React, { useState } from 'react';
import { Youtube, Instagram, Facebook, Share2, Crop, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PublishManager() {
  const [publishing, setPublishing] = useState(false);
  const [platforms, setPlatforms] = useState({ yt: true, insta: true, tiktok: true });

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => setPublishing(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Settings */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-white flex items-center gap-2 mb-6">
             <Share2 className="text-indigo-400" /> إعدادات النشر الموحد
          </h3>

          <div className="space-y-4 mb-8">
             <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:border-red-500/50" onClick={() => setPlatforms(p => ({...p, yt: !p.yt}))}>
                <div className="flex items-center gap-3">
                   <Youtube className={`text-red-500 ${!platforms.yt && 'grayscale opacity-50'}`} />
                   <div>
                      <div className="font-bold text-white text-sm">YouTube</div>
                      <div className="text-[10px] text-slate-500">Main Channel • 16:9 Landscape</div>
                   </div>
                </div>
                {platforms.yt && <CheckCircle size={16} className="text-green-500" />}
             </div>

             <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:border-pink-500/50" onClick={() => setPlatforms(p => ({...p, insta: !p.insta}))}>
                <div className="flex items-center gap-3">
                   <Instagram className={`text-pink-500 ${!platforms.insta && 'grayscale opacity-50'}`} />
                   <div>
                      <div className="font-bold text-white text-sm">Instagram Reels</div>
                      <div className="text-[10px] text-slate-500">Auto-Crop to 9:16 Vertical (AI)</div>
                   </div>
                </div>
                {platforms.insta && <CheckCircle size={16} className="text-green-500" />}
             </div>

             <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:border-purple-500/50" onClick={() => setPlatforms(p => ({...p, tiktok: !p.tiktok}))}>
                <div className="flex items-center gap-3">
                   <div className={`w-6 h-6 rounded bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center font-bold text-black text-[8px] ${!platforms.tiktok && 'grayscale opacity-50'}`}>TK</div>
                   <div>
                      <div className="font-bold text-white text-sm">TikTok</div>
                      <div className="text-[10px] text-slate-500">Auto-Crop to 9:16 Vertical (AI)</div>
                   </div>
                </div>
                {platforms.tiktok && <CheckCircle size={16} className="text-green-500" />}
             </div>
          </div>

          <Button 
            onClick={handlePublish}
            disabled={publishing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12"
          >
             {publishing ? 'جاري المعالجة والنشر...' : 'نشر على جميع المنصات 🚀'}
          </Button>
       </div>

       {/* Preview (AI Crop) */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
             <Crop size={12} /> AI Smart Crop Active
          </div>
          
          <div className="flex gap-4 items-end">
             {/* 16:9 Original */}
             <div className="w-48 aspect-video bg-black rounded-lg border border-slate-700 relative overflow-hidden opacity-50">
                <img src="/images/features/live.jpg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">Original (16:9)</div>
             </div>
             
             {/* 9:16 AI Crop */}
             <div className="w-32 aspect-[9/16] bg-black rounded-xl border-2 border-indigo-500 relative overflow-hidden shadow-2xl">
                <img src="/images/features/live.jpg" className="w-full h-full object-cover scale-[1.7]" /> {/* Simulated Zoom/Crop */}
                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[8px] font-bold px-1 rounded">AI Focus</div>
             </div>
          </div>
          
          <p className="text-xs text-slate-500 mt-6 text-center max-w-xs">
             سيقوم النظام تلقائياً بتتبع "المتحدث" أو "الحركة الرئيسية" وقص الفيديو ليناسب شاشات الهواتف.
          </p>
       </div>
    </div>
  );
}

################################################################################