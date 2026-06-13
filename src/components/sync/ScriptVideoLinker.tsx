'use client';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { Play, Pause, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ScriptVideoLinker() {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const script = [
    { id: 1, type: 'scene', text: 'EXT. CAFE - DAY', time: '00:00:00' },
    { id: 2, type: 'action', text: 'Camera pans down to reveal AHMED holding a cup.', time: '00:00:05' },
    { id: 3, type: 'dialogue', text: 'AHMED: I told you, I’m not going back.', time: '00:00:12' },
    { id: 4, type: 'dialogue', text: 'SARA: It’s not about the past anymore.', time: '00:00:18' },
    { id: 5, type: 'action', text: 'Ahmed slams the cup on the table.', time: '00:00:24' },
  ];

  const waveformHeights = useMemo(
    () => Array.from({ length: 60 }, (_, i) => 20 + ((i * 37) % 80)),
    []
  );

  const handleLineClick = (id: number, time: string) => {
    setActiveLine(id);
    console.log(`Seeking video to ${time}`);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 rounded-xl border border-white/10 bg-black p-4">
      <div className="w-1/2 overflow-y-auto rounded-lg border-r border-white/10 bg-[#111] p-8 font-mono text-sm">
        <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-widest text-slate-500">
          <span>Interactive Script</span>
          <span className="flex items-center gap-1 text-green-400">
            <LinkIcon size={12} />
            Synced
          </span>
        </div>

        <div className="space-y-6">
          {script.map((line) => (
            <motion.div
              key={line.id}
              onClick={() => handleLineClick(line.id, line.time)}
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: activeLine === line.id ? 1 : 0.6,
                x: activeLine === line.id ? 10 : 0,
              }}
              className={`cursor-pointer rounded border-l-2 p-2 transition-all ${
                activeLine === line.id
                  ? 'border-indigo-500 bg-white/5 text-white'
                  : 'border-transparent hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              {line.type === 'scene' && (
                <div className="mb-2 font-bold uppercase text-slate-200">{line.text}</div>
              )}
              {line.type === 'action' && <div className="text-slate-400">{line.text}</div>}
              {line.type === 'dialogue' && (
                <div className="mx-auto w-3/4 text-center">
                  <div className="mb-1 font-bold text-slate-300">{line.text.split(':')[0]}</div>
                  <div className="text-white">{line.text.split(':').slice(1).join(':').trim()}</div>
                </div>
              )}
              <div className="mt-1 text-right font-mono text-[9px] text-slate-600">{line.time}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex w-1/2 flex-col gap-4">
        <div className="group relative flex-1 overflow-hidden rounded-lg border border-white/10 bg-black">
          <Image
            src="/images/features/live.jpg"
            alt="Script-linked video preview"
            fill
            sizes="50vw"
            className="object-cover opacity-80"
          />

          <div className="absolute bottom-12 left-0 w-full px-8 text-center">
            <span className="rounded-lg bg-black/70 px-4 py-2 text-lg font-bold text-white shadow-lg">
              {script.find((l) => l.id === activeLine)?.text || '...'}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform hover:scale-110"
            >
              {isPlaying ? (
                <Pause size={32} fill="white" />
              ) : (
                <Play size={32} fill="white" className="ml-1" />
              )}
            </button>
          </div>
        </div>

        <div className="flex h-32 flex-col justify-center rounded-lg border border-white/5 bg-[#1a1a1a] p-4">
          <div className="mb-2 text-xs text-slate-500">Waveform Match</div>
          <div className="flex h-16 items-end gap-0.5 opacity-50">
            {waveformHeights.map((height, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm ${
                  activeLine && i > activeLine * 5 && i < activeLine * 5 + 10
                    ? 'bg-indigo-500'
                    : 'bg-slate-600'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
