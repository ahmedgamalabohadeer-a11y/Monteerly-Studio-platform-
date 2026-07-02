'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Command, Plus, UserPlus, Film, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SuggestionItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  shortcut: string;
}

export function MagicCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const suggestions: SuggestionItem[] = useMemo(
    () => [
      { icon: Plus, text: 'إنشاء مشروع جديد...', shortcut: 'N' },
      { icon: UserPlus, text: 'دعوة عضو للفريق...', shortcut: 'I' },
      { icon: Film, text: 'البحث في الأرشيف...', shortcut: 'S' },
    ],
    []
  );

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-8 left-8 text-slate-500 text-xs font-mono bg-black/50 px-3 py-1 rounded border border-white/10 hidden md:block">
          Press <span className="bg-white/10 px-1 rounded text-white">⌘ K</span> for Magic
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="magic-command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-[20vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="flex items-center px-4 py-4 border-b border-white/10">
                <Command className="text-slate-400 mr-3" />
                <input
                  autoFocus
                  placeholder="ماذا تريد أن تفعل؟ (مثال: أنشئ مجلد لعميل جديد)"
                  className="flex-1 bg-transparent text-xl text-white outline-none placeholder-slate-600"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs bg-white/10 px-2 py-1 rounded text-slate-400 hover:text-white transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="p-2">
                {query ? (
                  <div className="p-3">
                    <div className="text-xs font-bold text-indigo-400 uppercase mb-2">
                      AI Interpretation
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-lg text-white">
                      <Sparkles size={16} className="text-indigo-400 shrink-0" />
                      <span>
                        هل تقصد:{' '}
                        <span className="font-bold">
                          إنشاء مجلد باسم &ldquo;{query}&rdquo;
                        </span>
                        ؟
                      </span>
                      <button
                        type="button"
                        className="ml-auto bg-indigo-600 px-3 py-1 rounded text-xs font-bold hover:bg-indigo-500 transition-colors"
                      >
                        نفذ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-500 px-3 py-2 uppercase">
                      مقترحات
                    </div>
                    {suggestions.map((item) => (
                      <button
                        key={item.text}
                        type="button"
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition-colors group text-right"
                      >
                        <item.icon
                          size={18}
                          className="text-slate-500 group-hover:text-white shrink-0"
                        />
                        <span>{item.text}</span>
                        <span className="ml-auto text-xs bg-black/40 px-2 py-1 rounded font-mono text-slate-500">
                          {item.shortcut}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-black/30 px-4 py-2 text-[10px] text-slate-500 border-t border-white/5 flex justify-between gap-4">
                <span>
                  Pro Tip: You can type natural language like &ldquo;Email Sarah regarding
                  the edit&rdquo;.
                </span>
                <span>Monteerly AI v2.0</span>
              </div>
            </motion.div>

            <button
              type="button"
              aria-label="إغلاق نافذة الأوامر"
              className="absolute inset-0 cursor-default"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
