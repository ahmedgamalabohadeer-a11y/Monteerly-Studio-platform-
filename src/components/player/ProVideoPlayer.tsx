'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Settings,
  Monitor,
} from 'lucide-react';
import { VideoSyncEngine } from '@/lib/integration/VideoSyncEngine';
import { formatTimecode } from '@/lib/utils/timecode';
import { VideoAnnotation } from '@/components/workspace/VideoAnnotation';

export function ProVideoPlayer({ src }: { src?: string }) {
  const engineRef = useRef<VideoSyncEngine | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const duration = 185;
  const posterSrc = src || '/images/features/workspace.jpg';

  useEffect(() => {
    const engine = new VideoSyncEngine('demo_project_id');
    engineRef.current = engine;

    engine.enableSync((state) => {
      if (state.isPlaying !== undefined) {
        setPlaying(state.isPlaying);
      }

      if (typeof state.currentTime === 'number') {
        setCurrentTime(state.currentTime);
      }
    });

    return () => {
      engine.cleanup();
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.broadcastState({ isPlaying: playing, currentTime });
    }
  }, [playing, currentTime]);

  const stepFrame = (direction: 1 | -1) => {
    const frameTime = 1 / 24;
    setCurrentTime((prev) => Math.min(duration, Math.max(0, prev + direction * frameTime)));
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (playing) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 0.1));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, duration]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setHoverTime(pos * duration);
  };

  return (
    <div className="relative group bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none">
      <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
        <VideoAnnotation />

        <Image
          src={posterSrc}
          alt="معاينة محتوى الفيديو"
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity">
            <button
              onClick={() => setPlaying(true)}
              className="w-20 h-20 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-2xl"
            >
              <Play size={36} fill="currentColor" className="ml-2" />
            </button>
          </div>
        )}

        <div className="absolute top-6 right-6 font-mono text-xl font-bold text-white bg-black/60 px-3 py-1 rounded border border-white/10 backdrop-blur-md shadow-lg pointer-events-none">
          {formatTimecode(currentTime)}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          ref={progressBarRef}
          className="relative h-2 bg-white/20 rounded-full mb-4 cursor-pointer group/bar"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          onClick={(e) => {
            if (progressBarRef.current) {
              const rect = progressBarRef.current.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(pos * duration);
            }
          }}
        >
          <div className="absolute top-0 left-0 h-full bg-white/30 rounded-full w-[60%]" />

          <div
            className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
          </div>

          {hoverTime !== null && (
            <div
              className="absolute bottom-4 bg-black border border-white/20 text-white text-xs px-2 py-1 rounded -translate-x-1/2"
              style={{ left: `${(hoverTime / duration) * 100}%` }}
            >
              {formatTimecode(hoverTime).slice(0, 8)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-200">
            <button
              onClick={() => setPlaying(!playing)}
              className="hover:text-white hover:scale-110 transition-transform"
            >
              {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
              <button onClick={() => stepFrame(-1)} className="hover:text-white" title="Previous Frame (J)">
                <SkipBack size={18} />
              </button>
              <button onClick={() => stepFrame(1)} className="hover:text-white" title="Next Frame (L)">
                <SkipForward size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 group/vol ml-4">
              <button onClick={() => setVolume((v) => (v === 0 ? 0.8 : 0))}>
                <Volume2 size={20} />
              </button>
              <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-1 w-full accent-indigo-500"
                />
              </div>
            </div>

            <span className="text-xs font-mono text-slate-400 ml-2">
              {formatTimecode(currentTime).slice(0, 8)} <span className="text-slate-600">/</span>{' '}
              {formatTimecode(duration).slice(0, 8)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-200">
            <button className="flex items-center gap-1 text-xs font-bold bg-white/10 px-2 py-1 rounded border border-white/5 hover:bg-white/20">
              <Monitor size={14} /> 4K
            </button>
            <button className="hover:text-white hover:rotate-45 transition-transform">
              <Settings size={20} />
            </button>
            <button className="hover:text-white">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
