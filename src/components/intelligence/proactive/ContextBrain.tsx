'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

type BrainContext = 'studio' | 'finance' | 'idle';

type Scenario = {
  ctx: BrainContext;
  text: string;
};

const scenarios: Scenario[] = [
  {
    ctx: 'studio',
    text: 'لاحظت أن الإضاءة منخفضة في المشهد 3. هل تريد تطبيق فلتر "Brighten"؟',
  },
  {
    ctx: 'finance',
    text: 'مشروع "إعلان رمضان" اكتمل. هل أصدر الفاتورة النهائية الآن؟',
  },
  {
    ctx: 'idle',
    text: 'لديك 3 مهام معلقة. هل نبدأ بـ "مراجعة الصوت"؟',
  },
];

export function ContextBrain() {
  const [context, setContext] = useState<BrainContext>('idle');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [avatarSrc, setAvatarSrc] = useState('/logo-icon.png');

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      const scenario = scenarios[index];
      setContext(scenario.ctx);
      setSuggestion(scenario.text);
      index = (index + 1) % scenarios.length;
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence mode="wait">
        {suggestion && (
          <motion.div
            key={suggestion}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto max-w-xs cursor-pointer rounded-2xl rounded-br-none border border-indigo-100 bg-white p-4 text-black shadow-2xl transition-colors hover:bg-slate-50"
          >
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-600" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                {context === 'studio'
                  ? 'AI Assistant'
                  : context === 'finance'
                    ? 'FinBot'
                    : 'Manager'}
              </span>
            </div>

            <p className="text-sm font-medium leading-relaxed">{suggestion}</p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-black px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
              >
                <Zap size={12} />
                نفذ الآن
              </button>

              <button
                type="button"
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-200"
              >
                تجاهل
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="group pointer-events-auto relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-black shadow-lg transition-transform hover:scale-110">
        <div className="absolute inset-0 rounded-full bg-indigo-500/50 opacity-20 animate-ping" />

        <Image
          src={avatarSrc}
          alt="AI"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          onError={() =>
            setAvatarSrc(
              'https://cdn-icons-png.flaticon.com/512/4712/4712038.png'
            )
          }
        />

        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-black bg-red-500" />
      </div>
    </div>
  );
}
