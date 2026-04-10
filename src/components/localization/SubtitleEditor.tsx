'use client';
import React from 'react';
import { Languages, Mic, Clock, Check, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SubtitleEditor() {
  const segments = [
    { id: 1, start: '00:00:05', end: '00:00:08', original: 'Welcome to the future of editing.', translated: 'مرحباً بكم في مستقبل المونتاج.', status: 'approved' },
    { id: 2, start: '00:00:09', end: '00:00:12', original: 'Everything is cloud-based now.', translated: 'كل شيء أصبح سحابياً الآن.', status: 'approved' },
    { id: 3, start: '00:00:14', end: '00:00:18', original: 'No more expensive hardware needed.', translated: '', status: 'draft' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
       {/* Video Preview */}
       <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-black aspect-video rounded-xl border border-white/10 relative overflow-hidden">
             <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-60" />
             <div className="absolute bottom-8 left-0 w-full text-center px-4">
                <span className="bg-black/60 text-white px-2 py-1 rounded text-lg font-bold shadow-lg">
                   مرحباً بكم في مستقبل المونتاج.
                </span>
             </div>
          </div>
          
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
             <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Mic size={16} /> الدبلجة الآلية (AI Dubbing)
             </h4>
             <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-slate-300">
                   <span>اللغة المصدر:</span> <span className="font-bold text-white">English (US)</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                   <span>اللغة الهدف:</span> 
                   <select className="bg-black border border-white/10 rounded px-2 py-1 text-white text-xs">
                      <option>Arabic (SA)</option>
                      <option>Spanish (ES)</option>
                      <option>French (FR)</option>
                   </select>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                   <span>الصوت:</span> <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Cloned (Original)</span>
                </div>
                <Button className="w-full mt-2 bg-indigo-600 text-white font-bold text-xs">توليد الدبلجة</Button>
             </div>
          </div>
       </div>

       {/* Subtitle List */}
       <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
             <h3 className="font-bold text-white flex items-center gap-2">
                <Languages className="text-green-400" /> محرر الترجمة (SRT Editor)
             </h3>
             <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 text-white text-xs">استيراد SRT</Button>
                <Button variant="outline" className="border-white/10 text-white text-xs">تصدير SRT</Button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {segments.map((seg) => (
                <div key={seg.id} className={`p-4 rounded-xl border transition-all ${seg.status === 'approved' ? 'bg-black/20 border-white/5' : 'bg-indigo-900/10 border-indigo-500/30'}`}>
                   <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-black/40 px-2 py-1 rounded">
                         <Clock size={12} /> {seg.start} <span className="text-slate-700">➜</span> {seg.end}
                      </div>
                      <div className="flex gap-2">
                         <button className="text-slate-400 hover:text-white"><PlayCircle size={16}/></button>
                         {seg.status === 'approved' && <Check size={16} className="text-green-500" />}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <div className="text-[10px] text-slate-500 mb-1 uppercase">Original</div>
                         <div className="text-slate-300 text-sm leading-relaxed">{seg.original}</div>
                      </div>
                      <div>
                         <div className="text-[10px] text-indigo-400 mb-1 uppercase">Translation</div>
                         {seg.status === 'approved' ? (
                            <div className="text-white text-sm font-bold leading-relaxed">{seg.translated}</div>
                         ) : (
                            <textarea 
                              className="w-full bg-black/40 border border-white/10 rounded p-2 text-white text-sm focus:border-indigo-500 outline-none" 
                              placeholder="اكتب الترجمة هنا..."
                              rows={2}
                            />
                         )}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
