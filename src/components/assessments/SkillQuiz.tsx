'use client';
import React, { useState } from 'react';
import { Timer, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SkillQuiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = {
    text: "في Adobe Premiere Pro، ما هو الاختصار الافتراضي لأداة القطع (Razor Tool)؟",
    options: ["V", "C", "R", "X"],
    correct: 1 // Index of "C"
  };

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
       {/* Header */}
       <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
          <div>
             <h2 className="font-bold text-xl">اختبار مهارات Premiere Pro</h2>
             <p className="text-slate-400 text-sm">السؤال 5 من 20</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
             <Timer size={18} className="text-yellow-400" />
             <span className="font-mono font-bold">14:30</span>
          </div>
       </div>

       {/* Question */}
       <div className="p-8">
          <h3 className="text-lg font-bold mb-6 leading-relaxed">{question.text}</h3>

          <div className="space-y-3">
             {question.options.map((opt, idx) => (
                <div 
                   key={idx}
                   onClick={() => setSelected(idx)}
                   className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between group ${
                      selected === idx 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                      : 'border-border hover:bg-muted'
                   }`}
                >
                   <span className="font-medium">{opt}</span>
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === idx ? 'border-primary' : 'border-muted-foreground'}`}>
                      {selected === idx && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Footer */}
       <div className="p-6 border-t border-border bg-muted/10 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <AlertCircle size={14} />
             <span>لا يمكنك العودة للسؤال السابق.</span>
          </div>
          <Button 
             variant="primary" 
             size="lg" 
             disabled={selected === null}
             onClick={() => setStep(step + 1)}
          >
             التالي
          </Button>
       </div>
    </div>
  );
}
