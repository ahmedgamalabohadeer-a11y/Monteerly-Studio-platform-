'use client'
import React, { useState } from 'react';
import { Mic, User, Sparkles, Play, Loader2, FileAudio } from 'lucide-react';

export default function DigitalTwinSetup() {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  
  // حالات الصوت الجديدة
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateScript = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setAudioUrl(null); // مسح الصوت القديم عند توليد نص جديد
    try {
      const res = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'voice_script' })
      });
      const data = await res.json();
      if (data.result) setScript(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // دالة تحويل النص إلى صوت (استدعاء التوأم)
  const generateVoice = async () => {
    if (!script) return;
    setIsSpeaking(true);
    setAudioUrl(null);
    try {
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: script })
      });
      const data = await res.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        alert(data.error || 'حدث خطأ في توليد الصوت');
      }
    } catch (err) {
      console.error(err);
      alert('فشل الاتصال بخادم الصوت السيادي');
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 flex items-center gap-4">
          <div className="bg-rose-500/10 p-4 rounded-full">
            <Mic className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">إعداد التوأم الرقمي (صوت / صورة)</h1>
            <p className="text-slate-400">استنساخ معزز بـ Gemini و ElevenLabs لإنتاج Voice-Overs فورية.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> بصمة التوأم
            </h2>
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-rose-500/50 transition-all cursor-pointer mb-6 group">
              <FileAudio className="w-12 h-12 text-slate-500 mx-auto mb-4 group-hover:text-rose-400 transition-colors" />
              <p className="font-bold text-white mb-1">ارفع عينة صوتية (30 ثانية)</p>
              <p className="text-xs text-slate-500">صيغة WAV أو MP3 لتوليد البصمة الصوتية</p>
            </div>
            <button
              onClick={() => { setIsCloning(true); setTimeout(() => setIsCloning(false), 3000); }}
              className="w-full bg-slate-950 hover:bg-rose-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
            >
              {isCloning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              {isCloning ? 'جاري تحليل البصمة وإنشاء التوأم...' : 'إنشاء التوأم الرقمي الآن'}
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] flex flex-col">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> مساعد Gemini الإخراجي
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب فكرة الفيديو هنا (مثال: إعلان قصير لمنتج قهوة يركز على النشاط الصباحي)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 resize-none h-32 mb-4"
            />
            <button
              onClick={generateScript}
              disabled={isGenerating || !prompt}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-950 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all mb-6"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'توليد السكريبت الاحترافي'}
            </button>

            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto relative min-h-[200px]">
              {script ? (
                <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed pb-24">{script}</div>
              ) : (
                <p className="text-slate-600 text-sm text-center mt-10">السكريبت المولد سيظهر هنا...</p>
              )}

              {/* المشغل الصوتي الجديد */}
              {audioUrl && (
                <div className="absolute bottom-16 left-4 right-4 bg-slate-900 p-2 rounded-xl border border-white/10 shadow-xl">
                  <audio src={audioUrl} controls autoPlay className="w-full h-10 outline-none" />
                </div>
              )}

              {script && (
                <button 
                  onClick={generateVoice}
                  disabled={isSpeaking}
                  className="absolute bottom-4 left-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-50 px-6 py-2 rounded-lg font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {isSpeaking ? <Loader2 className="w-4 h-4 fill-slate-900 animate-spin" /> : <Play className="w-4 h-4 fill-slate-900" />}
                  {isSpeaking ? 'جاري المعالجة وتوليد الصوت...' : 'تحدث بالتوأم الرقمي'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
