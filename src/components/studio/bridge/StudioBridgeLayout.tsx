'use client';

import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Settings,
  Play,
  Scissors,
  MonitorPlay,
  SlidersHorizontal,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { AssetBrowser } from './AssetBrowser';

const timelineMarks = ['00:00:00', '00:01:00', '00:02:00', '00:03:00', '00:04:00', '00:05:00'];

const videoTracks = [
  {
    id: 1,
    label: 'V1',
    clip: 'Interview_CamA.mp4',
    clipClass: 'bg-blue-900/50 border-blue-500 text-blue-200',
    widthClass: 'w-40',
    leftClass: 'left-10',
  },
  {
    id: 2,
    label: 'V2',
    clip: 'B-Roll_City.mp4',
    clipClass: 'bg-green-900/50 border-green-500 text-green-200',
    widthClass: 'w-24',
    leftClass: 'left-20',
  },
];

const inspectorGroups = [
  { title: 'Position', value: 'X: 1280 • Y: 720' },
  { title: 'Scale', value: '100%' },
  { title: 'Blend', value: 'Normal' },
  { title: 'Opacity', value: '92%' },
];

export function StudioBridgeLayout() {
  const [selectedPanel, setSelectedPanel] = useState<'layers' | 'settings'>('layers');
  const [selectedTool, setSelectedTool] = useState<'select' | 'cut' | 'preview'>('select');

  const viewerStatus = useMemo(() => {
    if (selectedTool === 'cut') return 'أداة القص مفعلة';
    if (selectedTool === 'preview') return 'وضع المعاينة النشطة';
    return 'جاهز لإفلات الأصول';
  }, [selectedTool]);

  return (
    <div className="flex h-screen bg-black overflow-hidden text-white">
      <AssetBrowser />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/10 bg-[#0b0b0b] px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="الرجوع للخلف"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="الانتقال للأمام"
            >
              <ChevronRight size={16} />
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => setSelectedTool('select')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                selectedTool === 'select'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              تحديد
            </button>
            <button
              type="button"
              onClick={() => setSelectedTool('cut')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                selectedTool === 'cut'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Scissors size={13} />
              Cut
            </button>
            <button
              type="button"
              onClick={() => setSelectedTool('preview')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                selectedTool === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <MonitorPlay size={13} />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
              <Sparkles size={12} className="text-indigo-400" />
              {viewerStatus}
            </div>

            <button
              type="button"
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <Play size={13} />
              تشغيل
            </button>
          </div>
        </header>

        <section className="flex-1 bg-[#050505] relative flex items-center justify-center border-b border-white/10 p-6">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              Bridge Mode
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              Sequence 01
            </span>
          </div>

          <div className="w-full max-w-5xl aspect-video bg-black border border-white/10 rounded-xl relative shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

            <div className="absolute top-4 right-4 text-[11px] font-bold bg-black/70 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur">
              Viewer • 1920×1080
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <MonitorPlay size={24} className="text-slate-400" />
              </div>
              <div className="text-slate-300 text-sm font-bold mb-2">
                Main Viewer
              </div>
              <p className="text-slate-500 text-xs max-w-md leading-relaxed">
                اسحب الأصول من المتجر إلى هذه المنطقة لبناء مشهدك، ثم راجع النتيجة
                مباشرة من نافذة المعاينة.
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-dashed border-indigo-500/50 opacity-0 hover:opacity-100 bg-indigo-500/10 flex items-center justify-center transition-opacity pointer-events-none">
              <span className="text-indigo-300 font-bold text-sm">
                Drop Asset Here
              </span>
            </div>
          </div>
        </section>

        <section className="h-72 bg-[#111] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">الـ Timeline</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                إدارة المقاطع، الصوت، وترتيب المشاهد داخل التسلسل.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                24 fps
              </span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                Auto Save On
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-3 text-[11px] text-slate-500">
            {timelineMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>

          <div className="space-y-3 flex-1">
            {videoTracks.map((track) => (
              <div
                key={track.id}
                className="h-10 bg-[#1a1a1a] rounded border border-white/5 relative overflow-hidden"
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-bold">
                  {track.label}
                </div>
                <div
                  className={`absolute ${track.leftClass} ${track.widthClass} h-full ${track.clipClass} border-l border-r rounded flex items-center px-2 text-[10px] font-medium`}
                >
                  {track.clip}
                </div>
              </div>
            ))}

            <div className="h-9 bg-[#1a1a1a] rounded border border-white/5 relative overflow-hidden">
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-bold">
                A1
              </div>
              <div className="absolute left-0 w-full h-full flex items-center justify-center text-[10px] text-slate-600 border-2 border-dashed border-slate-700">
                Drag Audio Here
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="w-72 bg-[#111] border-l border-white/10 hidden xl:flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Inspector
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedPanel('layers')}
              className={`p-2 rounded-lg transition-colors ${
                selectedPanel === 'layers'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
              aria-label="عرض الطبقات"
            >
              <Layers size={15} />
            </button>
            <button
              type="button"
              onClick={() => setSelectedPanel('settings')}
              className={`p-2 rounded-lg transition-colors ${
                selectedPanel === 'settings'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
              aria-label="عرض الإعدادات"
            >
              <Settings size={15} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {selectedPanel === 'layers' ? (
            <>
              <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4">
                <div className="text-xs text-slate-500 mb-2">Active Layer</div>
                <div className="text-sm font-bold text-white">
                  Interview_CamA.mp4
                </div>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  طبقة الفيديو الرئيسية المحددة حاليًا داخل نافذة التحرير.
                </p>
              </div>

              <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4">
                <div className="text-xs text-slate-500 mb-3">Layers Stack</div>
                <div className="space-y-2 text-xs">
                  <div className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-300">
                    V2 • B-Roll_City.mp4
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300">
                    V1 • Interview_CamA.mp4
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-300">
                    A1 • Voiceover Track
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4">
                <div className="text-xs text-slate-500 mb-3">Transform</div>
                <div className="space-y-3">
                  {inspectorGroups.map((item) => (
                    <div key={item.title} className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{item.title}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#1a1a1a] border border-white/5 p-4">
                <div className="text-xs text-slate-500 mb-3">Quick Controls</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 text-xs flex items-center justify-center gap-2"
                  >
                    <SlidersHorizontal size={13} />
                    FX
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 text-xs flex items-center justify-center gap-2"
                  >
                    <Volume2 size={13} />
                    Audio
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
