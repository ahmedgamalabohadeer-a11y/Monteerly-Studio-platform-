'use client';
import React, { useState } from 'react';
import { Type, Layout, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GraphicsGen() {
  const [headline, setHeadline] = useState('خبر عاجل: إطلاق منصة Monteerly رسمياً');
  const [subhead, setSubhead] = useState('ثورة في عالم الإنتاج الإعلامي السحابي');
  const [style, setStyle] = useState<'breaking' | 'standard' | 'exclusive'>('breaking');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Controls */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="font-bold text-white mb-6">مولد الجرافيك (CG Generator)</h3>
          
          <div className="space-y-4">
             <div>
                <label className="text-xs text-slate-300 font-bold mb-2 block">العنوان الرئيسي</label>
                <input 
                  type="text" value={headline} onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white"
                />
             </div>
             <div>
                <label className="text-xs text-slate-300 font-bold mb-2 block">العنوان الفرعي</label>
                <input 
                  type="text" value={subhead} onChange={(e) => setSubhead(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white"
                />
             </div>
             
             <div>
                <label className="text-xs text-slate-300 font-bold mb-2 block">النمط (Style)</label>
                <div className="flex gap-2">
                   <button onClick={() => setStyle('breaking')} className={`flex-1 py-2 rounded border text-xs font-bold ${style === 'breaking' ? 'bg-red-600 border-red-500 text-white' : 'bg-black/20 border-white/10 text-slate-400'}`}>عاجل</button>
                   <button onClick={() => setStyle('standard')} className={`flex-1 py-2 rounded border text-xs font-bold ${style === 'standard' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-black/20 border-white/10 text-slate-400'}`}>قياسي</button>
                   <button onClick={() => setStyle('exclusive')} className={`flex-1 py-2 rounded border text-xs font-bold ${style === 'exclusive' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/20 border-white/10 text-slate-400'}`}>حصري</button>
                </div>
             </div>

             <Button className="w-full mt-4 bg-white text-black font-bold gap-2">
                <Download size={16} /> تحميل كملف شفاف (.PNG)
             </Button>
          </div>
       </div>

       {/* Preview */}
       <div className="bg-black rounded-xl overflow-hidden relative border border-white/10 aspect-video flex items-end">
          <img src="/images/features/live.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          
          <div className="relative z-10 w-full p-8 pb-12">
             {style === 'breaking' && (
                <div className="animate-in slide-in-from-bottom-4">
                   <div className="bg-red-600 text-white text-xs font-bold inline-block px-3 py-1 uppercase tracking-widest mb-0.5">Breaking News</div>
                   <div className="bg-white/90 backdrop-blur text-black font-black text-2xl px-4 py-2 w-fit">{headline}</div>
                   <div className="bg-black/80 backdrop-blur text-white text-sm font-bold px-4 py-1 w-fit border-l-4 border-red-600">{subhead}</div>
                </div>
             )}

             {style === 'standard' && (
                <div className="animate-in slide-in-from-left-4">
                   <div className="bg-blue-600 text-white text-sm font-bold px-6 py-2 w-full max-w-2xl rounded-tr-xl">{headline}</div>
                   <div className="bg-slate-900/90 text-slate-200 text-xs px-6 py-1 w-full max-w-xl rounded-br-xl border-l-4 border-blue-400">{subhead}</div>
                </div>
             )}

             {style === 'exclusive' && (
                <div className="animate-in zoom-in-95 text-center w-full flex flex-col items-center">
                   <div className="bg-purple-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full mb-2 uppercase tracking-widest border border-purple-400">Exclusive Coverage</div>
                   <div className="text-white font-black text-3xl drop-shadow-lg shadow-black">{headline}</div>
                   <div className="text-purple-200 font-bold text-sm drop-shadow-md">{subhead}</div>
                </div>
             )}
          </div>
       </div>
    </div>
  );
}

