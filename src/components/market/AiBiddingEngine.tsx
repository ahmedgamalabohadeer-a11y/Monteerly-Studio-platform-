'use client'
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, FileText } from 'lucide-react';

export default function AiBiddingEngine({ jobTitle, budget }: { jobTitle: string, budget: number }) {
  const [proposal, setProposal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProposal = () => {
    setIsGenerating(true);
    // محاكاة الاتصال بـ Gemini API لكتابة العرض
    setTimeout(() => {
      setProposal(`أهلاً بك، بصفتي خبيراً في المونتاج عبر منصة MCOS، اطلعت على تفاصيل مشروعك "${jobTitle}". 
أنا جاهز لتنفيذ العمل باحترافية تامة وضمن الميزانية المطروحة (${budget}$). سأضمن لك:
1. تسليم بجودة 4K.
2. تلوين سينمائي (Color Grading).
3. تعديلات غير محدودة حتى الرضا التام.
أتطلع للعمل معك عبر نظام الضمان الآمن.`);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 mt-6">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
        <div className="bg-indigo-500/10 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h4 className="font-black text-white">الكاتب الذكي (Gemini AI)</h4>
          <p className="text-xs text-slate-400">توليد مقترح عمل احترافي مخصص لهذا المشروع</p>
        </div>
      </div>

      {proposal ? (
        <div className="space-y-4">
          <textarea 
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 focus:border-indigo-500 outline-none resize-none leading-relaxed"
          />
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all">
            <Send className="w-4 h-4" /> إرسال العرض رسمياً
          </button>
        </div>
      ) : (
        <button 
          onClick={generateProposal}
          disabled={isGenerating}
          className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><FileText className="w-5 h-5" /> كتابة العرض بالذكاء الاصطناعي</>}
        </button>
      )}
    </div>
  );
}
