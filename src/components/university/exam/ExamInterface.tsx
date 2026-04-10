'use client';
import React, { useState, useEffect } from 'react';
import { Timer, AlertTriangle, CheckCircle, HelpCircle, ChevronRight, Flag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ExamInterface() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      text: 'في تصحيح الألوان، ما هو الفرق الرئيسي بين Lift و Gamma؟',
      options: [
         'Lift يتحكم في المناطق الساطعة (Highlights)',
         'Lift يتحكم في الظلال (Shadows) و Gamma في الوسط (Midtones)',
         'كلاهما يؤدي نفس الوظيفة',
         'Gamma تستخدم فقط في الفيديوهات الأبيض والأسود'
      ]
    },
    {
      id: 2,
      type: 'simulation',
      text: 'قم بترتيب طبقات العقد (Nodes) التالية للحصول على أفضل تدفق للإشارة (Signal Flow).',
      simulation: '[Interactive Node Graph Simulation Placeholder]'
    },
    {
      id: 3,
      type: 'multiple-choice',
      text: 'ما هو معدل البت (Bitrate) الموصى به لرفع فيديو 4K على يوتيوب؟',
      options: ['10 Mbps', '45 Mbps', '100 Mbps', '5 Mbps']
    }
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
       {/* Sidebar (Progress) */}
       <div className="w-64 bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="mb-6 text-center">
             <div className="text-xs text-slate-400 mb-1">الوقت المتبقي</div>
             <div className={`text-3xl font-black font-mono ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {formatTime(timeLeft)}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-2 content-start">
             {Array.from({length: 20}).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => i < questions.length && setCurrentQ(i)}
                  className={`aspect-square rounded flex items-center justify-center text-sm font-bold border transition-colors ${
                     i === currentQ ? 'bg-indigo-600 border-indigo-500 text-white' :
                     answers[i] ? 'bg-green-900/20 border-green-500/30 text-green-400' :
                     'bg-black/20 border-white/10 text-slate-500'
                  }`}
                >
                   {i + 1}
                </button>
             ))}
          </div>

          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[10px] text-yellow-200 flex gap-2">
             <AlertTriangle size={14} className="shrink-0" />
             <span>تحذير: مغادرة المتصفح ستؤدي لإنهاء الاختبار فوراً.</span>
          </div>
       </div>

       {/* Question Area */}
       <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl p-8 flex flex-col">
          <div className="flex justify-between items-start mb-8">
             <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 block">سؤال {currentQ + 1} من {questions.length}</span>
                <h2 className="text-2xl font-bold text-white leading-relaxed max-w-2xl">
                   {questions[currentQ].text}
                </h2>
             </div>
             <Button variant="outline" className="border-white/10 text-slate-400 hover:text-white gap-2">
                <Flag size={16} /> تمييز للمراجعة
             </Button>
          </div>

          <div className="flex-1">
             {questions[currentQ].type === 'multiple-choice' ? (
                <div className="space-y-4 max-w-xl">
                   {questions[currentQ].options?.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setAnswers({...answers, [currentQ]: opt})}
                        className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                           answers[currentQ] === opt 
                           ? 'bg-indigo-600/10 border-indigo-500 text-white' 
                           : 'bg-black/20 border-white/10 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                         <span>{opt}</span>
                         {answers[currentQ] === opt && <CheckCircle size={20} className="text-indigo-500" />}
                      </button>
                   ))}
                </div>
             ) : (
                <div className="w-full h-64 bg-black rounded-xl border border-dashed border-white/20 flex items-center justify-center text-slate-500">
                   {questions[currentQ].simulation}
                </div>
             )}
          </div>

          <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
             <Button 
               disabled={currentQ === 0}
               onClick={() => setCurrentQ(q => q - 1)}
               variant="outline" 
               className="border-white/10 text-white"
             >
                السابق
             </Button>
             <Button 
               onClick={() => currentQ < questions.length - 1 ? setCurrentQ(q => q + 1) : null}
               className="bg-indigo-600 text-white font-bold px-8"
             >
                {currentQ === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي'} <ChevronRight size={16} className="mr-1" />
             </Button>
          </div>
       </div>
    </div>
  );
}
