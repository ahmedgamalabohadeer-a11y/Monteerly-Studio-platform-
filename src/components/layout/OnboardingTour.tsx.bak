'use client';
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check local storage if tour already seen
    const seen = localStorage.getItem('monteerly_tour_seen');
    if (!seen) setShow(true);
  }, []);

  const steps = [
    { title: 'مرحباً بك في الاستوديو 👋', desc: 'لنأخذ جولة سريعة في مساحة العمل الجديدة الخاصة بك.' },
    { title: 'مكتبة الوسائط 📁', desc: 'هنا تجد جميع ملفات الفيديو والصوت والصور الخاصة بالمشروع.' },
    { title: 'التايم لاين الذكي 🎬', desc: 'اسحب الملفات هنا للبدء في المونتاج والقص والترتيب.' },
    { title: 'أدوات التعاون 💬', desc: 'اترك تعليقات دقيقة وارسم على الفيديو للتواصل مع فريقك.' },
  ];

  const handleFinish = () => {
    setShow(false);
    localStorage.setItem('monteerly_tour_seen', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10001] bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
       <div className="bg-card max-w-md w-full rounded-2xl p-8 shadow-2xl border border-border relative animate-in zoom-in-95">
          <button onClick={handleFinish} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
             <X size={20} />
          </button>

          <div className="mb-6">
             <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                جولة تعريفية {step + 1}/{steps.length}
             </div>
             <h2 className="text-2xl font-bold mb-3">{steps[step].title}</h2>
             <p className="text-muted-foreground leading-relaxed">
                {steps[step].desc}
             </p>
          </div>

          <div className="flex justify-between items-center">
             <div className="flex gap-1">
                {steps.map((_, i) => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} />
                ))}
             </div>
             
             <div className="flex gap-2">
                {step > 0 && (
                   <Button variant="ghost" onClick={() => setStep(step - 1)} icon={<ArrowRight size={16} />}>السابق</Button>
                )}
                {step < steps.length - 1 ? (
                   <Button variant="primary" onClick={() => setStep(step + 1)}>التالي <ArrowLeft size={16} className="mr-2" /></Button>
                ) : (
                   <Button variant="primary" onClick={handleFinish}>ابدأ العمل 🚀</Button>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}

