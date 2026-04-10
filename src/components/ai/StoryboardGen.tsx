'use client';
import React, { useState } from 'react';
import { Image as ImageIcon, Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StoryboardGen() {
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const generateScenes = () => {
    setGenerating(true);
    // محاكاة
    setTimeout(() => {
      setImages([
        '/images/features/live.jpg',
        '/images/features/ai-brain.jpg',
        '/images/features/speed.jpg',
        '/images/features/workspace.jpg'
      ]);
      setGenerating(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
       {/* Prompt Bar */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
             <label className="text-xs text-slate-400 mb-1 block">وصف المشهد (Prompt)</label>
             <input type="text" placeholder="رجل يقف فوق ناطحة سحاب ينظر لمدينة سايبر بانك ليلاً، إضاءة نيون، سينمائي..." className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" />
          </div>
          <div className="w-full md:w-48">
             <label className="text-xs text-slate-400 mb-1 block">النمط (Style)</label>
             <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none">
                <option>Cinematic Realistic</option>
                <option>Anime / Manga</option>
                <option>3D Pixar Style</option>
                <option>Sketch / Drawing</option>
             </select>
          </div>
          <Button onClick={generateScenes} disabled={generating} className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold h-[46px] px-8">
             {generating ? 'جاري الرسم...' : 'تخيل المشهد 🎨'}
          </Button>
       </div>

       {/* Gallery Grid */}
       {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4">
             {images.map((img, i) => (
                <div key={i} className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                   <img src={img} alt={`Scene ${i}`} className="w-full h-full object-cover" />
                   <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">Scene {i+1}</div>
                   
                   {/* Overlay Actions */}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white" title="تحميل"><Download size={16}/></button>
                      <button className="p-2 bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white" title="تكبير"><Maximize2 size={16}/></button>
                   </div>
                </div>
             ))}
          </div>
       ) : (
          <div className="border-2 border-dashed border-white/10 rounded-xl p-16 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-slate-500" />
             </div>
             <h3 className="text-lg font-bold text-white">لم يتم توليد مشاهد بعد</h3>
             <p className="text-slate-400 max-w-sm">اكتب وصفاً للمشهد بالأعلى واضغط على "تخيل المشهد" لرؤية سحر الذكاء الاصطناعي.</p>
          </div>
       )}
    </div>
  );
}
