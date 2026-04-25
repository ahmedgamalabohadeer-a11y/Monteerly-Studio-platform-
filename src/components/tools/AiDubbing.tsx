'use client';
import React, { useState } from 'react';
import { Mic, Globe, Play, Download, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AiDubbing() {
  const [processing, setProcessing] = useState(false);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
       <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><Wand2 size={24} /></div>
          <div>
             <h3 className="font-bold text-white text-lg">الدبلجة الذكية (AI Dubbing)</h3>
             <p className="text-slate-400 text-xs">ترجم فيديوهاتك وحول الصوت إلى لغات أخرى بنفس نبرة صوتك.</p>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
             <label className="text-xs text-slate-500 mb-2 block">اللغة الأصلية</label>
             <div className="flex items-center justify-between text-white font-bold">
                <span className="flex items-center gap-2"><Globe size={16} /> العربية (Saudi Arabia)</span>
             </div>
          </div>
          <div className="p-4 bg-black/40 border border-white/5 rounded-xl relative">
             <label className="text-xs text-slate-500 mb-2 block">اللغة المستهدفة</label>
             <select className="w-full bg-transparent text-white font-bold focus:outline-none appearance-none cursor-pointer">
                <option>English (US)</option>
                <option>French (France)</option>
                <option>Spanish (Spain)</option>
             </select>
             <div className="absolute top-4 left-4 text-purple-400 text-xs font-bold">PRO</div>
          </div>
       </div>

       <div className="h-24 bg-black/60 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
          {/* Waveform Visualization Simulation */}
          <div className="flex items-center gap-1 h-full w-full px-4 opacity-50">
             {[...Array(40)].map((_, i) => (
                <div key={i} className="flex-1 bg-indigo-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 80 + 20}%`, animationDelay: `${i * 0.05}s` }} />
             ))}
          </div>
          
          <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" />
             </div>
          </button>
       </div>

       <Button 
         onClick={() => setProcessing(!processing)}
         className={`w-full py-4 text-lg font-bold shadow-lg ${processing ? 'bg-slate-700 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'}`}
       >
          {processing ? 'جاري المعالجة (Estimating 2m)...' : 'بدء الدبلجة الآن'} <Mic className="ml-2" size={20} />
       </Button>
    </div>
  );
}

################################################################################