'use client'
import React, { useState } from 'react';
import { Sparkles, Loader2, Target, Cpu } from 'lucide-react';

export default function AiMatcher({ onMatchComplete }: { onMatchComplete: (result: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const analyzeRequirement = async () => {
    if (!prompt) return;
    setIsScanning(true);
    try {
      // نستخدم محرك Gemini الذي بنيناه سابقاً لتحليل الطلب
      const res = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `حلل هذا الطلب واستخرج 3 كلمات مفتاحية فقط للمهارات المطلوبة للمونتير (مثال: 3D, VFX, Color Grading). الطلب: ${prompt}`, 
          type: 'matcher' 
        })
      });
      const data = await res.json();
      
      // إرسال النتيجة للواجهة الرئيسية لفلترة المستقلين
      onMatchComplete(data.result || "تم التحليل: مهارات إبداعية متقدمة");
    } catch (error) {
      console.error(error);
      onMatchComplete("فشل الاتصال بالمحرك، يرجى المحاولة لاحقاً.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-[2rem] shadow-2xl shadow-indigo-900/20 mb-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-indigo-400" /> محرك المطابقة السيادي (AI Matcher)
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          لا تبحث يدوياً. صف مشروعك بدقة، وسيقوم ذكاء MCOS باستخراج البصمة الفنية المطلوبة وترشيح النخب المطابقة فوراً.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: أحتاج فيديو إعلاني لمنتج تجميل يركز على تصحيح الألوان والانتقالات الناعمة..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
          <button 
            onClick={analyzeRequirement}
            disabled={isScanning || !prompt}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all min-w-[200px]"
          >
            {isScanning ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> جاري المسح الجيني...</>
            ) : (
              <><Target className="w-5 h-5" /> ابحث عن النخب</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
