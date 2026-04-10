'use client';
import React, { useState } from 'react';
import { Wand2, Youtube, Instagram, Music, Type, Video, Download, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AutoReelsGen() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
       setLoading(false);
       setStep(2);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
       {/* Control Panel */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="mb-6">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Wand2 className="text-pink-500" /> صانع المحتوى الآلي
             </h3>
             <p className="text-sm text-slate-400">حول أفكارك إلى فيديو TikTok/Reels جاهز في ثوانٍ.</p>
          </div>

          {step === 1 ? (
             <div className="space-y-6 flex-1">
                <div>
                   <label className="text-xs text-slate-300 font-bold mb-2 block">عن ماذا يتحدث الفيديو؟</label>
                   <textarea 
                     value={topic}
                     onChange={(e) => setTopic(e.target.value)}
                     className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-pink-500 outline-none h-32 resize-none"
                     placeholder="مثال: 5 حقائق غريبة عن الفضاء، أو نصائح لزيادة الإنتاجية..."
                   />
                </div>

                <div>
                   <label className="text-xs text-slate-300 font-bold mb-2 block">النمط (Style)</label>
                   <div className="grid grid-cols-3 gap-3">
                      <button className="p-3 rounded-lg border border-pink-500/50 bg-pink-500/10 text-pink-400 text-xs font-bold text-center">Fast Paced</button>
                      <button className="p-3 rounded-lg border border-white/10 bg-black/20 text-slate-400 hover:text-white text-xs font-bold text-center">Minimal</button>
                      <button className="p-3 rounded-lg border border-white/10 bg-black/20 text-slate-400 hover:text-white text-xs font-bold text-center">Cinematic</button>
                   </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!topic || loading}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-lg shadow-pink-500/20"
                >
                   {loading ? 'جاري السحر... ✨' : 'توليد الفيديو 🚀'}
                </Button>
             </div>
          ) : (
             <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-bold">
                   <Wand2 size={16} /> تم إنشاء الفيديو بنجاح!
                </div>
                
                <div className="space-y-2 flex-1 overflow-y-auto">
                   <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/5">
                      <span className="flex items-center gap-2 text-xs text-slate-300"><Type size={14}/> تم توليد السكريبت</span>
                      <span className="text-green-400 text-[10px]">تم</span>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/5">
                      <span className="flex items-center gap-2 text-xs text-slate-300"><Music size={14}/> موسيقى خلفية (Copyright Free)</span>
                      <span className="text-green-400 text-[10px]">تم</span>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/5">
                      <span className="flex items-center gap-2 text-xs text-slate-300"><Video size={14}/> لقطات B-Roll ذكية</span>
                      <span className="text-green-400 text-[10px]">تم</span>
                   </div>
                </div>

                <div className="flex gap-3">
                   <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-white/10 text-white">تعديل</Button>
                   <Button className="flex-1 bg-white text-black font-bold gap-2"><Download size={16}/> تحميل</Button>
                </div>
             </div>
          )}
       </div>

       {/* Phone Preview */}
       <div className="flex items-center justify-center bg-black/50 rounded-xl border border-white/5 p-8">
          <div className="w-[280px] h-[500px] bg-black rounded-[2rem] border-4 border-slate-800 relative overflow-hidden shadow-2xl">
             {/* Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-xl z-20" />
             
             {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center p-6">
                   <Wand2 size={48} className="text-pink-500 animate-spin-slow mb-4" />
                   <p className="text-white font-bold text-sm">الذكاء الاصطناعي يكتب السيناريو...</p>
                </div>
             ) : step === 2 ? (
                <div className="absolute inset-0 bg-slate-800">
                   <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-80" />
                   {/* TikTok UI Overlay */}
                   <div className="absolute inset-0 flex flex-col justify-end p-4 pb-12 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white font-bold mb-1 drop-shadow-md">5 حقائق عن الفضاء 🪐</h4>
                      <p className="text-white/80 text-xs mb-4">#space #facts #ai</p>
                      <div className="flex gap-2 text-white">
                         <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center backdrop-blur"><Heart size={14} /></div>
                         <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center backdrop-blur"><MessageCircle size={14} /></div>
                         <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center backdrop-blur"><Share2 size={14} /></div>
                      </div>
                   </div>
                </div>
             ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-600">
                   <span className="text-xs">Preview Area</span>
                </div>
             )}
          </div>
       </div>
    </div>
  );
}
