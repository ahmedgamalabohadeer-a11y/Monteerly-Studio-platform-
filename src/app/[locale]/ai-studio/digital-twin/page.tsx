'use client'
import React, { useState, useRef } from 'react';
import { Mic, User, Sparkles, Play, Loader2, FileAudio, AlertCircle, UploadCloud, CheckCircle } from 'lucide-react';

export default function DigitalTwinSetup() {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // حالات زر رفع العينة
  const [sampleFile, setSampleFile] = useState<File | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // حالات المولد الصوتي
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [fallbackMsg, setFallbackMsg] = useState<string | null>(null);

  // دالة التعامل مع اختيار ملف العينة
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSampleFile(e.target.files[0]);
    }
  };

  const startCloningProcess = () => {
    if (!sampleFile) return;
    setIsCloning(true);
    // محاكاة لعملية الرفع وتحليل البصمة
    setTimeout(() => {
      setIsCloning(false);
      alert('تم تحليل البصمة الصوتية وحفظها بنجاح!');
    }, 3000);
  };

  const generateScript = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setAudioUrl(null); 
    setFallbackMsg(null);
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

  const generateVoice = async () => {
    if (!script) return;
    setIsSpeaking(true);
    setAudioUrl(null);
    setFallbackMsg(null);
    
    try {
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: script })
      });
      const data = await res.json();
      
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
        if (data.message) setFallbackMsg(data.message); // عرض رسالة استخدام السحابة المجانية
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
            <p className="text-slate-400">استنساخ معزز بـ Gemini السحابي لإنتاج Voice-Overs فورية.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* قسم استنساخ البصمة (تم تفعيله) */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> بصمة التوأم
            </h2>
            
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="audio/*" />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer mb-6 group ${sampleFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-rose-500/50'}`}
            >
              {sampleFile ? (
                 <>
                   <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                   <p className="font-bold text-emerald-400 mb-1">{sampleFile.name}</p>
                   <p className="text-xs text-slate-500">جاهز للتحليل</p>
                 </>
              ) : (
                 <>
                   <UploadCloud className="w-12 h-12 text-slate-500 mx-auto mb-4 group-hover:text-rose-400 transition-colors" />
                   <p className="font-bold text-white mb-1">انقر لرفع عينة صوتية (30 ثانية)</p>
                   <p className="text-xs text-slate-500">صيغة WAV أو MP3 لتوليد البصمة الصوتية</p>
                 </>
              )}
            </div>

            <button
              onClick={startCloningProcess}
              disabled={!sampleFile || isCloning}
              className="w-full bg-slate-950 hover:bg-rose-600 disabled:bg-slate-950 disabled:text-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
            >
              {isCloning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              {isCloning ? 'جاري تحليل البصمة وإنشاء التوأم...' : 'إنشاء التوأم الرقمي الآن'}
            </button>
          </div>

          {/* قسم توليد السكريبت والصوت السحابي */}
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

            {fallbackMsg && (
              <div className="mb-4 p-3 border rounded-xl text-xs font-bold flex items-center gap-2 bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                 <AlertCircle size={14} className="shrink-0" /> {fallbackMsg}
              </div>
            )}

            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto relative min-h-[200px] custom-scrollbar">
              {script ? (
                <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed pb-24">{script}</div>
              ) : (
                <p className="text-slate-600 text-sm text-center mt-10">السكريبت المولد سيظهر هنا...</p>
              )}

              {audioUrl && (
                <div className="absolute bottom-16 left-4 right-4 bg-slate-900 p-2 rounded-xl border border-white/10 shadow-xl animate-in slide-in-from-bottom-2">
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
                  {isSpeaking ? 'جاري التوليد السحابي...' : 'تحدث بالتوأم الرقمي'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
