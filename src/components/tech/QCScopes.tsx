'use client';

import React from 'react';
import { Activity, Radio, AlertTriangle, CheckCircle } from 'lucide-react';

const waveformBars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  height: `${(i * 11) % 80 + 20}%`,
}));

const audioChannels = [
  { id: 'L', safe: 70, warning: 20, danger: 0, level: '-6dB', healthy: true },
  { id: 'R', safe: 68, warning: 22, danger: 0, level: '-5.8dB', healthy: true },
];

export function QCScopes() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="md:col-span-2 bg-black border border-white/10 rounded-lg p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" />
              Quality Control Scopes
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              مراقبة الإضاءة، اللون، ومستويات الصوت قبل التسليم أو التصدير النهائي.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-[11px] font-bold">
              <CheckCircle size={12} />
              Broadcast Safe
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-bold">
              <AlertTriangle size={12} />
              Peak Watch Enabled
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[11px] font-bold">
              <Radio size={12} />
              Live Monitoring
            </span>
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-lg p-3 flex flex-col min-h-[220px]">
        <div className="flex justify-between items-center text-[10px] text-slate-500 mb-3">
          <span className="font-bold tracking-wide">LUMA WAVEFORM</span>
          <span className="text-green-500">IRE: 0–100</span>
        </div>

        <div className="flex-1 relative overflow-hidden opacity-90 rounded bg-[#050505]">
          <div className="absolute inset-0 flex items-end justify-between px-1">
            {waveformBars.map((bar) => (
              <div
                key={bar.id}
                className="w-1 bg-green-500/50 rounded-t-sm transition-all duration-300"
                style={{ height: bar.height }}
              />
            ))}
          </div>

          <div className="absolute top-[10%] left-0 w-full h-px bg-red-500/50" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
          <div className="absolute bottom-[10%] left-0 w-full h-px bg-red-500/50" />
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center relative min-h-[220px]">
        <div className="absolute top-3 left-3 text-[10px] text-slate-500 font-bold">
          VECTORSCOPE
        </div>

        <div className="w-40 h-40 rounded-full border border-white/20 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_65%)]" />
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-white/5" />

          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500/60 rounded-full" />
          <div className="absolute bottom-5 right-5 w-2 h-2 bg-blue-500/60 rounded-full" />
          <div className="absolute bottom-5 left-5 w-2 h-2 bg-green-500/60 rounded-full" />

          <div className="w-20 h-20 bg-white/20 blur-2xl rounded-full animate-pulse" />
        </div>

        <p className="text-[11px] text-slate-500 mt-4 text-center">
          الإشارة اللونية مستقرة ضمن الحدود الآمنة مع انتشار متوسط حول المركز.
        </p>
      </div>

      <div className="bg-black border border-white/10 rounded-lg p-3 md:col-span-2">
        <div className="flex justify-between items-center text-[10px] text-slate-500 mb-3">
          <span className="font-bold tracking-wide">AUDIO LEVELS (dBFS)</span>
          <span className="text-emerald-400">Stereo Linked</span>
        </div>

        <div className="space-y-3">
          {audioChannels.map((channel) => (
            <div key={channel.id} className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400 w-4 font-bold">
                {channel.id}
              </span>

              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-green-500" style={{ width: `${channel.safe}%` }} />
                <div className="h-full bg-yellow-500" style={{ width: `${channel.warning}%` }} />
                <div className="h-full bg-red-500 animate-pulse" style={{ width: `${channel.danger}%` }} />
              </div>

              <span className="text-[10px] text-green-400 w-10 text-right">
                {channel.level}
              </span>

              {channel.healthy ? (
                <CheckCircle size={12} className="text-emerald-400" />
              ) : (
                <AlertTriangle size={12} className="text-amber-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
