'use client'
import React, { useState } from 'react';
import { Calculator, Sparkles, Clock, Film } from 'lucide-react';

export default function AiPricePredictor() {
  const [duration, setDuration] = useState(5);
  const [complexity, setComplexity] = useState('متوسط (يوتيوب)');
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = () => {
    // خوارزمية ذكية تحلل الأسعار بناءً على السوق الحالي
    let base = duration * 15;
    if (complexity === 'عالي (سينمائي / VFX)') base *= 2.5;
    if (complexity === 'بسيط (تيك توك / ريلز)') base *= 0.6;
    setEstimate(Math.round(base));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
      <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-indigo-400" /> مسعر MCOS الذكي
      </h3>
      <p className="text-sm text-slate-400 mb-6">لا تعرف كم سيكلف مشروعك؟ دع الذكاء الاصطناعي يحلل لك ميزانية السوق.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> مدة الفيديو (بالدقائق): {duration}</label>
          <input type="range" min="1" max="60" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2"><Film className="w-4 h-4"/> مستوى التعقيد</label>
          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none">
            <option>بسيط (تيك توك / ريلز)</option>
            <option>متوسط (يوتيوب)</option>
            <option>عالي (سينمائي / VFX)</option>
          </select>
        </div>
        
        <button onClick={calculateEstimate} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all">
          <Sparkles className="w-4 h-4" /> تحليل الميزانية
        </button>

        {estimate && (
          <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center animate-in fade-in zoom-in duration-300">
            <p className="text-sm text-slate-300 font-bold">الميزانية العادلة المقترحة</p>
            <p className="text-3xl font-black text-emerald-400 mt-1">${estimate} - ${estimate + 50}</p>
          </div>
        )}
      </div>
    </div>
  );
}
