'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Share2, Crop, CheckCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PublishManager() {
  const [publishing, setPublishing] = useState(false);
  const [platforms, setPlatforms] = useState({ yt: true, insta: true, tiktok: true });

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => setPublishing(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-slate-900 p-6">
        <h3 className="mb-6 flex items-center gap-2 font-bold text-white">
          <Share2 className="text-indigo-400" />
          إعدادات النشر الموحد
        </h3>

        <div className="mb-8 space-y-4">
          <div
            className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4 hover:border-red-500/50"
            onClick={() => setPlatforms((p) => ({ ...p, yt: !p.yt }))}
          >
            <div className="flex items-center gap-3">
              <Video className={`text-red-500 ${!platforms.yt ? 'grayscale opacity-50' : ''}`} />
              <div>
                <div className="text-sm font-bold text-white">YouTube</div>
                <div className="text-[10px] text-slate-500">Main Channel • 16:9 Landscape</div>
              </div>
            </div>
            {platforms.yt && <CheckCircle size={16} className="text-green-500" />}
          </div>

          <div
            className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4 hover:border-pink-500/50"
            onClick={() => setPlatforms((p) => ({ ...p, insta: !p.insta }))}
          >
            <div className="flex items-center gap-3">
              <Video className={`text-pink-500 ${!platforms.insta ? 'grayscale opacity-50' : ''}`} />
              <div>
                <div className="text-sm font-bold text-white">Instagram Reels</div>
                <div className="text-[10px] text-slate-500">Auto-Crop to 9:16 Vertical (AI)</div>
              </div>
            </div>
            {platforms.insta && <CheckCircle size={16} className="text-green-500" />}
          </div>

          <div
            className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4 hover:border-purple-500/50"
            onClick={() => setPlatforms((p) => ({ ...p, tiktok: !p.tiktok }))}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded bg-gradient-to-tr from-cyan-400 to-pink-500 text-[8px] font-bold text-black ${
                  !platforms.tiktok ? 'grayscale opacity-50' : ''
                }`}
              >
                TK
              </div>
              <div>
                <div className="text-sm font-bold text-white">TikTok</div>
                <div className="text-[10px] text-slate-500">Auto-Crop to 9:16 Vertical (AI)</div>
              </div>
            </div>
            {platforms.tiktok && <CheckCircle size={16} className="text-green-500" />}
          </div>
        </div>

        <Button
          onClick={handlePublish}
          disabled={publishing}
          className="h-12 w-full bg-indigo-600 font-bold text-white hover:bg-indigo-700"
        >
          {publishing ? 'جاري المعالجة والنشر...' : 'نشر على جميع المنصات 🚀'}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
          <Crop size={12} />
          AI Smart Crop Active
        </div>

        <div className="flex items-end gap-4">
          <div className="relative aspect-video w-48 overflow-hidden rounded-lg border border-slate-700 bg-black opacity-50">
            <Image
              src="/images/features/live.jpg"
              alt=""
              fill
              sizes="192px"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              Original (16:9)
            </div>
          </div>

          <div className="relative aspect-[9/16] w-32 overflow-hidden rounded-xl border-2 border-indigo-500 bg-black shadow-2xl">
            <Image
              src="/images/features/live.jpg"
              alt=""
              fill
              sizes="128px"
              className="object-cover scale-[1.7]"
            />
            <div className="absolute right-2 top-2 rounded bg-indigo-600 px-1 text-[8px] font-bold text-white">
              AI Focus
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-xs text-center text-xs text-slate-500">
          سيقوم النظام تلقائياً بتتبع &quot;المتحدث&quot; أو &quot;الحركة الرئيسية&quot; وقص الفيديو ليناسب شاشات الهواتف.
        </p>
      </div>
    </div>
  );
}
