'use client';
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProductTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen tour
    if (!localStorage.getItem('tour_completed')) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const steps = [
    { title: "مرحباً بك في Monteerly 👋", desc: "دعنا نأخذك في جولة سريعة لنعرفك على أدوات النظام." },
    { title: "السوق (Marketplace)", desc: "هنا تجد لقطات فيديو، موسيقى، وقوالب جاهزة لمشاريعك." },
    { title: "مساحة العمل", desc: "أدر مشاريعك، تواصل مع فريقك، وراجع الفيديوهات لحظة بلحظة." },
  ];

  const handleComplete = () => {
    localStorage.setItem('tour_completed', 'true');
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-80 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-10">
       <button onClick={handleComplete} className="absolute top-4 left-4 text-slate-400 hover:text-white"><X size={16} /></button>
       
       <div className="mb-4">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">خطوة {step + 1} من {steps.length}</span>
          <h3 className="text-xl font-bold mt-2">{steps[step].title}</h3>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">{steps[step].desc}</p>
       </div>

       <div className="flex justify-between items-center mt-6">
          <div className="flex gap-1">
             {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-slate-700'}`} />
             ))}
          </div>
          <div className="flex gap-2">
             {step > 0 && <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setStep(step - 1)}><ArrowRight size={16} /></Button>}
             <Button size="sm" variant="primary" onClick={() => step < steps.length - 1 ? setStep(step + 1) : handleComplete()}>
                {step < steps.length - 1 ? 'التالي' : 'ابدأ الآن'} {step < steps.length - 1 && <ArrowLeft size={16} className="mr-1" />}
             </Button>
          </div>
       </div>
    </div>
  );
}
