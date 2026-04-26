'use client';
import React, { useState } from 'react';
import { Wand2, Image as ImageIcon, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StoryboardGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const generate = () => {
    setGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setImages([
        '/images/features/workspace.jpg',
        '/images/features/ai-brain.jpg',
        '/images/features/live.jpg',
        '/images/features/speed.jpg'
      ]);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 h-full flex flex-col">
       <div className="mb-6">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
             <Wand2 className="text-purple-500" /> AI Storyboard Artist
          </h3>
          <p className="text-slate-400 text-sm">وصف المشهد وسيقوم الذكاء الاصطناعي برسمه لك.</p>
       </div>

       <div className="relative mb-6">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: لقطة واسعة لمدينة الرياض في المستقبل، سيارات طائرة، إضاءة نيون زرقاء، سينمائي..."
            className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none resize-none"
          />
          <Button 
            onClick={generate}
            disabled={!prompt || generating}
            className="absolute bottom-3 left-3 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          >
             {generating ? <RefreshCw size={16} className="animate-spin" /> : 'توليد المشهد'}
          </Button>
       </div>

       <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto min-h-[300px]">
          {images.length > 0 ? images.map((img, i) => (
             <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10">
                <img src={img} alt={`Scene ${i}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button className="p-2 bg-white/20 rounded-full hover:bg-white/40 text-white"><Download size={16} /></button>
                   <button className="p-2 bg-white/20 rounded-full hover:bg-white/40 text-white"><ImageIcon size={16} /></button>
                </div>
             </div>
          )) : (
             <div className="col-span-2 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-xl h-full">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p>لم يتم توليد أي صور بعد</p>
             </div>
          )}
       </div>
    </div>
  );
}

