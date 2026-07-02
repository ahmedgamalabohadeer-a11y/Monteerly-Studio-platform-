'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FlipHorizontal, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WebPrompter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [fontSize, setFontSize] = useState(48);
  const [mirror, setMirror] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += speed;
        }
      }, 20);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed]);

  const reset = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setIsPlaying(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64 bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col gap-6">
        <h3 className="font-bold text-white mb-2">إعدادات الملقن</h3>

        <div>
          <label className="text-xs text-slate-400 mb-2 block">سرعة التمرير ({speed})</label>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-2 block">حجم الخط ({fontSize}px)</label>
          <input
            type="range"
            min="24"
            max="96"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setMirror(!mirror)}
            variant="outline"
            className={`flex-1 ${
              mirror ? 'bg-indigo-600 border-transparent text-white' : 'border-white/10 text-slate-300'
            }`}
          >
            <FlipHorizontal size={18} /> Mirror
          </Button>
        </div>

        <div className="mt-auto space-y-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full font-bold py-6 text-lg ${
              isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isPlaying ? 'إيقاف' : 'بدء'}
          </Button>
          <Button onClick={reset} variant="outline" className="w-full border-white/10 text-white">
            <RefreshCcw size={16} className="mr-2" /> إعادة
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-xl border-4 border-slate-800 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/50 z-20 pointer-events-none flex items-center">
          <div className="bg-red-500/50 text-white text-[9px] px-1">Eye Level</div>
        </div>

        <div
          ref={scrollRef}
          className={`w-full h-full overflow-y-auto px-12 py-[40vh] text-white font-bold leading-relaxed text-center scrollbar-hide ${
            mirror ? 'scale-x-[-1]' : ''
          }`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <p>
            أهلاً بكم في نشرة الأخبار من Monteerly.
            <br />
            <br />
            في أهم عناوين اليوم: إطلاق أكبر تحديث لمنصة المونتاج السحابي،
            والذي يتضمن أدوات الذكاء الاصطناعي الثورية.
            <br />
            <br />
            أكد المدير التنفيذي أن المنصة ستغير طريقة عمل القنوات الإخبارية للأبد.
            <br />
            <br />
            وفي الشأن التقني، تراجع ملحوظ في استخدام البرامج التقليدية
            لصالح الحلول السحابية.
            <br />
            <br />
            (توقف قليل للمراسل)
            <br />
            <br />
            ننتقل الآن إلى مراسلنا في الميدان...
          </p>
        </div>
      </div>
    </div>
  );
}
