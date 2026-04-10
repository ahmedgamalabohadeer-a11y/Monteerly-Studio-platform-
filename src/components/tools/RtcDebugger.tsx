'use client';
import React, { useEffect, useState } from 'react';
import { Activity, Server, Shield, CheckCircle, XCircle, Terminal } from 'lucide-react';

export function RtcDebugger() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');

  useEffect(() => {
    const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    // Simulation of WebRTC connection steps
    setTimeout(() => addLog('Initializing WebRTC PeerConnection...'), 500);
    setTimeout(() => addLog('Signaling Server: Connected (wss://signal.monteerly.com)'), 1000);
    setTimeout(() => addLog('Gathering ICE Candidates...'), 1500);
    setTimeout(() => addLog('STUN Server: stun.l.google.com:19302 (Found)'), 2000);
    setTimeout(() => {
        addLog('DTLS Handshake: Successful');
        addLog('Media Stream: Received (Video: H.264, Audio: Opus)');
        setStatus('connected');
    }, 3000);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono text-xs rounded-xl overflow-hidden border border-slate-800 w-full max-w-lg shadow-2xl">
       <div className="bg-slate-900 p-3 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Terminal size={14} />
             <span className="font-bold">تشخيص الاتصال (System Diagnostics)</span>
          </div>
          <div className="flex items-center gap-2">
             {status === 'connecting' && <Activity size={14} className="animate-pulse text-yellow-500" />}
             {status === 'connected' && <CheckCircle size={14} className="text-emerald-500" />}
             <span className="uppercase">{status}</span>
          </div>
       </div>

       <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4 border-b border-slate-800 pb-4">
             <Metric icon={Server} label="Signaling" value="12ms" />
             <Metric icon={Activity} label="Bitrate" value="2.4 Mbps" />
             <Metric icon={Shield} label="Encryption" value="AES-128" />
          </div>

          <div className="h-48 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
             {logs.map((log, i) => (
                <div key={i} className="opacity-80 hover:opacity-100 hover:bg-slate-900/50 px-1 rounded cursor-text">
                   {log}
                </div>
             ))}
             {status === 'connected' && (
                <div className="text-emerald-500 font-bold animate-pulse">_ Connection stable. Ready for streaming.</div>
             )}
          </div>
       </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: any) {
    return (
        <div className="flex flex-col items-center gap-1 text-slate-400">
           <Icon size={16} />
           <span className="text-[10px] uppercase">{label}</span>
           <span className="text-white font-bold">{value}</span>
        </div>
    )
}
