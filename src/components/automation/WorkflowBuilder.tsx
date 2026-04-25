'use client';
import React from 'react';
import { Upload, ArrowRight, Video, Mail, HardDrive, Check, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WorkflowBuilder() {
  return (
    <div className="bg-[#111] h-[600px] rounded-xl border border-white/10 relative overflow-hidden flex">
       {/* Sidebar Nodes */}
       <div className="w-64 bg-slate-900 border-r border-white/10 p-4 flex flex-col gap-4 z-10">
          <h4 className="text-xs font-bold text-slate-400 uppercase">Triggers</h4>
          <div className="p-3 bg-slate-800 rounded border border-white/5 cursor-grab hover:bg-slate-700 flex items-center gap-2 text-sm text-white">
             <Upload size={16} className="text-blue-400" /> New File Uploaded
          </div>
          <div className="p-3 bg-slate-800 rounded border border-white/5 cursor-grab hover:bg-slate-700 flex items-center gap-2 text-sm text-white">
             <Check size={16} className="text-green-400" /> Client Approved
          </div>

          <h4 className="text-xs font-bold text-slate-400 uppercase mt-4">Actions</h4>
          <div className="p-3 bg-slate-800 rounded border border-white/5 cursor-grab hover:bg-slate-700 flex items-center gap-2 text-sm text-white">
             <Video size={16} className="text-purple-400" /> Transcode (Proxy)
          </div>
          <div className="p-3 bg-slate-800 rounded border border-white/5 cursor-grab hover:bg-slate-700 flex items-center gap-2 text-sm text-white">
             <Mail size={16} className="text-yellow-400" /> Send Email
          </div>
          <div className="p-3 bg-slate-800 rounded border border-white/5 cursor-grab hover:bg-slate-700 flex items-center gap-2 text-sm text-white">
             <HardDrive size={16} className="text-cyan-400" /> Archive to Cold Storage
          </div>
       </div>

       {/* Canvas Area */}
       <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-black/50 p-12">
          {/* Node 1: Trigger */}
          <div className="absolute top-20 left-20 w-64 bg-slate-800 rounded-xl border-2 border-blue-500 shadow-2xl p-4">
             <div className="flex items-center gap-2 mb-2">
                <Upload size={18} className="text-blue-400" />
                <span className="font-bold text-white text-sm">On File Upload</span>
             </div>
             <div className="text-[10px] text-slate-400">Folder: /Raw_Footage</div>
             <div className="absolute right-[-10px] top-1/2 w-4 h-4 bg-white rounded-full border-4 border-slate-800" />
          </div>

          {/* Connection Line */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 0 }}>
             <path d="M330 110 C 400 110, 400 110, 450 110" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
             <path d="M700 110 C 750 110, 750 250, 800 250" stroke="#64748b" strokeWidth="2" fill="none" />
          </svg>

          {/* Node 2: Transcode */}
          <div className="absolute top-20 left-[450px] w-64 bg-slate-800 rounded-xl border border-white/10 shadow-xl p-4">
             <div className="absolute left-[-10px] top-1/2 w-4 h-4 bg-slate-500 rounded-full border-4 border-slate-800" />
             <div className="flex items-center gap-2 mb-2">
                <Video size={18} className="text-purple-400" />
                <span className="font-bold text-white text-sm">Create Proxy</span>
             </div>
             <div className="text-[10px] text-slate-400">Format: ProRes 422 Proxy (1080p)</div>
             <div className="absolute right-[-10px] top-1/2 w-4 h-4 bg-white rounded-full border-4 border-slate-800" />
          </div>

          {/* Node 3: Email */}
          <div className="absolute top-52 left-[800px] w-64 bg-slate-800 rounded-xl border border-white/10 shadow-xl p-4">
             <div className="absolute left-[-10px] top-1/2 w-4 h-4 bg-slate-500 rounded-full border-4 border-slate-800" />
             <div className="flex items-center gap-2 mb-2">
                <Mail size={18} className="text-yellow-400" />
                <span className="font-bold text-white text-sm">Notify Editor</span>
             </div>
             <div className="text-[10px] text-slate-400">To: editors@monteerly.com</div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 right-8 flex gap-4">
             <Button variant="outline" className="border-white/10 text-white">Test Run</Button>
             <Button className="bg-green-600 hover:bg-green-700 text-white font-bold gap-2">
                <Play size={16} /> Activate Workflow
             </Button>
          </div>
       </div>
    </div>
  );
}

################################################################################