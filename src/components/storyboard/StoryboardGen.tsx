'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Wand2,
  RefreshCw,
  Image as ImageIcon,
  Download,
  Plus,
  CheckCircle2,
  LayoutGrid,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Scene = {
  id: number;
  text: string;
  img: string;
};

export function StoryboardGen() {
  const [selectedSceneId, setSelectedSceneId] = useState(1);

  const scenes: Scene[] = useMemo(
    () => [
      {
        id: 1,
        text: 'EXT. DESERT - DAY. A lone wanderer walks towards the horizon.',
        img: '/images/features/live.jpg',
      },
      {
        id: 2,
        text: 'CLOSE UP on his boots hitting the sand.',
        img: '/images/features/speed.jpg',
      },
      {
        id: 3,
        text: 'He stops and looks at a compass.',
        img: '/images/features/ai-brain.jpg',
      },
    ],
    []
  );

  const selectedScene =
    scenes.find((scene) => scene.id === selectedSceneId) ?? scenes[0];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-indigo-400" />
              تحليل السيناريو
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              تحويل الوصف النصي إلى لقطات بصرية قابلة للمعالجة والإخراج.
            </p>
          </div>

          <div className="text-[11px] text-slate-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            {scenes.length} مشاهد
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] text-slate-500 mb-1">اللقطات المولدة</div>
            <div className="text-lg font-black text-white">{scenes.length}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] text-slate-500 mb-1">المشهد النشط</div>
            <div className="text-lg font-black text-indigo-400">
              Shot {selectedScene.id}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {scenes.map((scene) => {
            const isActive = scene.id === selectedSceneId;

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => setSelectedSceneId(scene.id)}
                className={`w-full p-4 rounded-xl text-right transition-all border group ${
                  isActive
                    ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-black/30 border-white/5 hover:border-indigo-500/40'
                }`}
              >
                <div className="flex justify-between items-start mb-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded ${
                        isActive
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Shot {scene.id}
                    </span>

                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-2 py-1 rounded-full">
                        <CheckCircle2 size={11} />
                        محدد
                      </span>
                    )}
                  </div>

                  <span className="text-indigo-400 opacity-70 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1">
                    <Wand2 size={12} />
                    Re-Imagine
                  </span>
                </div>

                <p className="text-sm text-slate-300 font-mono leading-relaxed">
                  {scene.text}
                </p>
              </button>
            );
          })}

          <button
            type="button"
            className="w-full p-4 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-slate-500 text-sm hover:border-indigo-500/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Plus size={16} />
            Add new shot description
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <LayoutGrid size={18} className="text-indigo-400" />
              اللوحة البصرية
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              راجع الصور المرجعية، بدّل المشاهد، وصدّر الستوري بورد للعرض.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 gap-2">
              <Sparkles size={14} />
              تحسين الكل
            </Button>
            <Button size="sm" className="bg-indigo-600 text-white gap-2 hover:bg-indigo-700">
              <Download size={14} />
              تصدير للعرض
            </Button>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <div className="text-xs text-slate-400">المشهد المحدد حاليًا</div>
              <div className="text-sm font-bold text-white">
                Shot {selectedScene.id}
              </div>
            </div>
            <span className="text-[11px] text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 px-2.5 py-1 rounded-full">
              قابل للتجديد
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedScene.text}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scenes.map((scene) => {
            const isActive = scene.id === selectedSceneId;

            return (
              <article
                key={scene.id}
                className={`bg-black border rounded-lg overflow-hidden flex flex-col transition-all ${
                  isActive
                    ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'border-white/10'
                }`}
              >
                <div className="aspect-video relative group">
                  <Image
                    src={scene.img}
                    alt={`Storyboard shot ${scene.id}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/60 text-white border border-white/10 backdrop-blur">
                      Shot {scene.id}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-indigo-600 text-white">
                        نشط
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSceneId(scene.id)}
                      className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"
                      aria-label={`إعادة توليد المشهد ${scene.id}`}
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSceneId(scene.id)}
                      className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"
                      aria-label={`استبدال صورة المشهد ${scene.id}`}
                    >
                      <ImageIcon size={16} />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSceneId(scene.id)}
                  className="p-3 bg-slate-950 text-[11px] text-slate-400 h-16 overflow-hidden text-right hover:bg-slate-900 transition-colors"
                >
                  {scene.text}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
